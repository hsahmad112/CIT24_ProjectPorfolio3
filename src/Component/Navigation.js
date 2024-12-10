import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { FetchData, AdvancedSearch }  from '../Pages/SearchResult';
import { useUser } from "../Store/store";
import { Navbar, Button, Form, InputGroup, Dropdown, Container, Col, Row, Nav } from 'react-bootstrap';
import { GetGenres } from '../Service/GenreService';

export default function Navigation(){
  const {userName, searchType, setSearchType, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Everything");
  const [placeholderText, setPlaceholderText] = useState("Search for Everything");
  const [genres, setGenres] = useState([]);
  //const [result, setResult] = useState({}); //Search result state, to be parsed to SearchResult component
  let navigate = useNavigate();

  function handleQuery(e){
    setSearchQuery(e.target.value);
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setGenres(await GetGenres());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  function handleType(e){
      const newSelectedCategory = e.target.getAttribute('name');
      const newSelectedType = e.target.getAttribute('str');
      setSearchType(newSelectedType);
      setSearchCategory(newSelectedCategory);
      setPlaceholderText("Search for " + newSelectedCategory); 
    }

    const DoAdvancedSearch = true;

  async function handleSubmit(e){
    e.preventDefault();
    const body = 
    { id: null, 
      searchTerm: searchQuery, 
      page: '0', 
      pageSize: searchType === 'everything' ? '5' : '10',
      genreId: chosenGenre
    };
 
    try {

      // let result;
      // if(DoAdvancedSearch){
      //   console.log("Doing advanced search");
      //   result = await AdvancedSearch(body);
      //   console.log("my advanced search result");
      //   console.log(result);
      //   navigate('/search', {
      //     state: {result, searchType, body },
      //   });
      // }
      // else{

      // }
      let result = await FetchData(searchType, body); 

      // ideally we want result to be a state
      // const fetchedData = await fetchData(searchType, body);
      // setResult(fetchedData)
      
      //when we navigate to search, we "bring along" the current states result (search result list).
      // inspiration -> https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
      //unsure if best option as url below informs to use redirect in actions and loaders instead but works.
      //https://api.reactrouter.com/v7/functions/react_router.useNavigate.html
      navigate('/search', {
        state: {result, searchType, body },
      });

    } catch (error) {
      console.error("Error in fetching of data, in Navigation.js", error);
      //throw new Error (error); --Do we want to throw error here on in SearchResult?
    }
    //const result = await fetchData(searchType, body);
 
  }

  const [chosenGenre, setChosenGenre] = useState("none");
   
    return(
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">  
          <Container>
            <Navbar.Brand className='pointer-on-hover' onClick ={() => navigate("/")}>Portfolio Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Form inline="true" onSubmit={handleSubmit}>
              <Row>
                <Col md="auto"> 
                  <Dropdown style={{display: "inline-block"}}>
                      <Dropdown.Toggle className='advanced-dropdown' variant="success">
                        <div style={{color: "white"}}>Advanced Search</div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <label for="cars">Genres</label>
                        <select name="genres" id="genres" onChange={(e) => setChosenGenre(e.target.value)}>
                          {genres?.map((item, index) =>
                            <option value={index + 1} key={item.name}>{item.name}</option>
                          )}
                        </select> 
                      </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <InputGroup>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {searchCategory}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick = {handleType} str="everything" name= "Everything" >Everything</Dropdown.Item>
                        <Dropdown.Item onClick = {handleType} str="titles" name= "Titles" >Title</Dropdown.Item>
                        <Dropdown.Item onClick = {handleType} str="persons" name="Persons">Person</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      placeholder={placeholderText}
                      aria-label="Search Term"
                      aria-describedby="nav-bar-search"     
                      onChange= {handleQuery}
                    />
                    <Button type='submit'><i className="bi bi-search"></i></Button>
                  </InputGroup>
                </Col>
              </Row>
            </Form>
            
            {userName !== null && 
            <div className='user-menu'>
              <Nav.Item>
                <Navbar.Text>
                  <p className='user-menu' style={{color:"white", display: "inline !important", width: "100px"}}>hello {userName} </p>
                  <Dropdown style={{display: "inline-block"}}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i className="bi bi-list" style={{color: "white"}}></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick = { () => navigate("/profile")}> Profile</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/watchlist")}>Watchlist</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/settings")}>Settings</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/rating")}>Rating</Dropdown.Item>
                        <Dropdown.Item onClick = { () => logout()}>Sign out</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Text>
              </Nav.Item>
            </div>}

            {userName === null && 
            <div> 
              <Button onClick ={() => navigate("/login")}>Login</Button> 
              <Button onClick ={() => navigate("/signup")} variant="success">Signup</Button>
            </div>}
       </Container>
         
        </Navbar>    
        <Outlet />       
      </div>
  );
}


