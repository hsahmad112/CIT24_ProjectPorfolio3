import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router';
import { useEffect, useState} from 'react';
import { useUser } from "../Store/store";
import { useNavigate } from 'react-router';
import { Search } from '../Pages/SearchResult';

export default function Navigation(){
  const {userName, token, searchType, setSearchType, login, logout } = useUser();
  const location = useLocation();
  const [searchCategory, setSearchCategory] = useState("Everything");
  //const [searchType, setSearchType] = useState("everything");
  const [placeholderText, setPlaceholderText] = useState("Search for Everything");
  const [result, setResult] = useState([]);
  const [everythingResult, setEverythingResult] = useState({
    persons: [],
    titles: []
  });
  let navigate = useNavigate();
  

  const [body, setBody] = useState({
        id : null,
        searchTerm : '',
        page : '1',
        pageSize : '10'
  })

  function handleQuery(e){
  
    const  {name, value} = e.target;
    setBody((prevData) => ({
        ...prevData, 
        searchTerm: value
      }));
    }

  function handleType(e){
      const newSelectedCategory = e.target.getAttribute('name');
      const newSelectedType = e.target.getAttribute('str');
      setSearchType(newSelectedType);
      console.log('Selected type:', newSelectedType);

      setSearchCategory(newSelectedCategory);
      console.log('Selected category:', newSelectedCategory);
      
      setPlaceholderText("Search for "+ newSelectedCategory);
      console.log('placeholder:', newSelectedCategory);

      
    }

  async function handleSubmit(e){
    Search(e, body.searchTerm);
    navigate('/search');
  }

  useEffect(() => {  
    if(userName){
      login(userName); 
    }

  }, [location, userName, body, login, searchType]);
  
  
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
                        <Dropdown.Item onClick = {handleType}  str= "titles" name= "Titles" >Title</Dropdown.Item>
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
        <Outlet/>            
      </div>
  );
}


