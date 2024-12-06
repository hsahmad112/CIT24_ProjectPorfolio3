import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState} from 'react';
import { useUser } from "../Store/store";
import { useNavigate } from 'react-router';
import  {fetchData}  from '../Pages/SearchResult';

export default function Navigation(){
  const {userName, searchType, setSearchType, login, logout } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Everything");
  const [placeholderText, setPlaceholderText] = useState("Search for Everything");
  const [result, setResult] = useState({}); //Search result state, to be parsed to SearchResult component
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
      pageSize: searchCategory === 'everything' ? '5' :'10' 
    };
 
    try {

      const result = await fetchData(searchType, body);

      // ideally we want result to be a state
      // const fetchedData = await fetchData(searchType, body);
      // setResult(fetchedData)

      
      //when we navigate to search, we "bring along" the current states result (search result list).
      // inspiration -> https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
      //unsure if best option as url below informs to use redirect in actions and loaders instead but works.
      //https://api.reactrouter.com/v7/functions/react_router.useNavigate.html
      navigate('/search', {
        state: {result, searchType },
      });

    } catch (error) {
      console.error("Error in fetching of data, in Navigation.js", error);
      //throw new Error (error); --Do we want to throw error here on in SearchResult?
    }
    //const result = await fetchData(searchType, body);
 
  }

  useEffect(() => {  
    if(userName){
      login(userName); 
    }

  }, [userName, login]);
  
  
    return(
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">  
          <Container>
            <Navbar.Brand className='pointer-on-hover' onClick ={() => navigate("/")}>React-Bootstrap</Navbar.Brand>
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
                    <Button type='submit'> Search</Button>
                  </InputGroup>
                </Col>
              </Row>
            </Form>
            
            {userName !== null && <div><p style={{color:"white"}}>hello {userName}</p><Button variant='danger'>burger menu</Button> <Button onClick ={() => logout()} variant="danger">Sign out</Button></div>  }
            {userName === null && <div> <Button onClick ={() => navigate("/login")}>Login</Button> <Button onClick ={() => navigate("/signup")} variant="success">Signup</Button></div>}
      
          </Container>
         
        </Navbar>    
        <Outlet />       
      </div>
  );
}


