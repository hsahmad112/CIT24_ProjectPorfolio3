import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router';
import { useContext, useEffect, useState} from 'react';
import { UserContext } from "../Store/store";
import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';

export default function Navigation(){

  const {userName, login, logout, getCookieValue} = useUser();
  const [cookie, setCookie] = useState(getCookieValue("FirstName"));
  const location = useLocation();
  useEffect(() => {
    // const cookies = document.cookie.split(';');
    // const userNameCookie = cookies.find(cookie => cookie.startsWith('FirstName')); //What if more cookies with same name, with different paths?


    console.log(`cookie er: ${cookie}`);
    login(cookie); 
    if(cookie){
      console.log("jaaa ikke undefined");
      //login(cookie);
      //setUserName(firstName) 
    }
    console.log(`Route changed: ${location.pathname}`);
    console.log(`brugernavn: ${userName}`);
  }, [location.pathname]);

  
  
  console.log(`Hello from Navigation, username is: ${userName}`);
  //const userName = useContext(UserContext);
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
        type
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/title">Title</Dropdown.Item>
        <Dropdown.Item href="#/person">Person</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          <Form.Control
            placeholder="search.."
            aria-label="Search Term"
            aria-describedby="nav-bar-search"
          />
        </InputGroup>
        </Col>
        </Row>
      </Form>
      {userName !== null && <div><p style={{color:"white"}}>hello {userName}</p><Button variant='danger'>burger menu</Button> </div>  }
      {userName === null && <div> <Button onClick ={() => navigate("/login")}>Login</Button> <Button variant="success">Signup</Button></div>}
        </Container>
      </Navbar>

      <Outlet/>            
      </div>
      );
}

