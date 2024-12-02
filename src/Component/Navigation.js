import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, useLocation } from 'react-router';
import { useContext, useEffect, useState} from 'react';
import { User, useUser } from "../Store/store";
import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';

export default function Navigation(){
  const {userName, login, logout} = useUser();

  const location = useLocation();
  
  useEffect(() => {  
    if(userName){
      login(userName); 
    }

  }, [location, userName]);

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
      {userName !== null && <div><p style={{color:"white"}}>hello {userName}</p><Button variant='danger'>burger menu</Button> <Button onClick ={() => logout()} variant="danger">Sign out</Button></div>  }
      {userName === null && <div> <Button onClick ={() => navigate("/login")}>Login</Button> <Button onClick ={() => navigate("/signup")} variant="success">Signup</Button></div>}

        </Container>
      </Navbar>

      <Outlet/>            
      </div>
      );
}

