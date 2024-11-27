import { Navbar, Button, Form, InputGroup, Dropdown} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet } from 'react-router';

export default function Navigation(){
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
        </Container>
      </Navbar>

      <Outlet/>            
      </div>
      );
}

