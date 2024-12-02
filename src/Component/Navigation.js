import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router';
import { useContext, useEffect, useState} from 'react';
import { User, useUser } from "../Store/store";
import { useNavigate } from 'react-router';

export default function Navigation(){
  const {userName, login, logout} = useUser();
  const location = useLocation();
  const [searchCategory, setSearchCategory] = useState("Everything");
  const [searchType, setSearchType] = useState("");
  const [placeholderText, setPlaceholderText] = useState("Search for Everything");
  const [result, setResult] = useState([]);

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
    e.preventDefault();
    
    console.log("searching for", searchType);
    console.log("sending body", body);
    const response = await fetch(process.env.REACT_APP_BASE_API_LINK + searchType + "/search?searchTerm=" + body.searchTerm + "&page=" + body.page + "&pageSize=" + body.pageSize);

      const data = await response.json();
      setResult(data);
    console.log("printer", result); //implement this into a SearchResultPage
  }

  useEffect(() => {  
    if(userName){
      login(userName); 
    }

  }, [location, userName, body, login, searchType]);
  //const user = useContext(User);
  let navigate = useNavigate();
    return(
      <div>
    <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">  
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Form inline="true">
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
          <Button onClick={handleSubmit}> Search</Button>
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

