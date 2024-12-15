import { useNavigate, Outlet } from 'react-router';
import { useUser } from "../Store/store";
import { Navbar, Button, Dropdown, Container, Nav } from 'react-bootstrap';
import SearchField from './SearchField';

export default function Navigation(){
  const {userName, token, logout } = useUser();

  let navigate = useNavigate();

    return(
      <div>
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">  
          <Container>
            <Navbar.Brand className='pointer-on-hover' onClick ={() => navigate("/")}>Portfolio Logo</Navbar.Brand>
            <SearchField/>
            {token !== null && 
            <div className='user-menu'>
              <Nav.Item>
                <Navbar.Text>
                  <p className='user-menu' style={{color:"white", display: "inline !important", width: "100px"}}>hello {userName} </p>
                  <Dropdown style={{display: "inline-block"}}>
                      <Dropdown.Toggle className='advanced-dropdown' variant="success" id="dropdown-basic">
                        <i className="bi bi-list" style={{color: "white"}}></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick = { () => navigate("/profile")}> Profile</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/watchlist")}>Watchlist</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/rating")}>Rating</Dropdown.Item>
                        <Dropdown.Item onClick = { () => navigate("/settings")}>Settings</Dropdown.Item>
                        <Dropdown.Item onClick = { () => logout()}>Sign out</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Text>
              </Nav.Item>
            </div>}

            {token === null && 
            <div> 
              <Button onClick ={() => navigate("/login")}>Login</Button> 
              <Button onClick ={() => navigate("/signup")} variant="success">Signup</Button>
            </div>}
          </Container>
         
        </Navbar>    
        <Outlet/>       
      </div>
  );
}
