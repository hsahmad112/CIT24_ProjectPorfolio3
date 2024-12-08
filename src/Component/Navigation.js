import { useEffect, useState} from 'react';
import { useNavigate, Outlet } from 'react-router';
import  {FetchData}  from '../Pages/SearchResult';
import { useUser } from "../Store/store";
import { Navbar, Button, Form, InputGroup, Dropdown, Container, Col, Row} from 'react-bootstrap';

export default function Navigation(){
  const {userName, searchType, setSearchType, login, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Everything");
  const [placeholderText, setPlaceholderText] = useState("Search for Everything");
  //const [result, setResult] = useState({}); //Search result state, to be parsed to SearchResult component
  let navigate = useNavigate();

  function handleQuery(e){
    setSearchQuery(e.target.value);
  }

  function handleType(e){
      const newSelectedCategory = e.target.getAttribute('name');
      const newSelectedType = e.target.getAttribute('str');
      setSearchType(newSelectedType);
      setSearchCategory(newSelectedCategory);
      setPlaceholderText("Search for "+ newSelectedCategory); 
    }

  async function handleSubmit(e){
    e.preventDefault();
    const body = 
    { id: null, 
      searchTerm: searchQuery, 
      page: '0', 
      pageSize: searchType === 'everything' ? '5' : '10' 
    };
 
    try {

      const result = await FetchData(searchType, body);

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
   
    return(
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">  
          <Container>
            <Navbar.Brand className='pointer-on-hover' onClick ={() => navigate("/")}>Portfolio Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Form inline="true" onSubmit={handleSubmit}>
              <Row>
                <Col md="auto"> 
                  <Button>Advanced Search</Button>
                </Col>
                <Col>
                  <InputGroup>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {searchCategory}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick = {handleType} str="everything" name= "Everything" >Everything</Dropdown.Item>
                        <Dropdown.Item onClick = {handleType} str= "titles" name= "Titles" >Title</Dropdown.Item>
                        <Dropdown.Item onClick = {handleType} str= "persons"  name="Persons">Person</Dropdown.Item>
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
            <div>
              <p style={{color:"white"}}>hello {userName}</p>
                    <Form>
                    <Form.Group className="mb-3">
                    <Dropdown>
                    
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Burgermenu
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick = { () => navigate("/profile")}> Profile NOT IMPLEMENETED!</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/watchlist")}>Watchlist</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/settings")}>Settings</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/rating")}>Rating</Dropdown.Item>
                        <Dropdown.Item onClick = { () => logout()} >Sign out</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </Form.Group>

                    </Form>
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


