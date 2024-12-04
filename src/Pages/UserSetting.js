import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function UserSetting(){

    //implement handleSubmit

    return(
        <div>
        <Container>
        <Form onSubmit="">
            <Row md={4}>
            <Col>
             <Form.Group className="mb-1" controlId="ChangeEmailForm">
             <Form.Label>Change email</Form.Label> 
                    <Form.Control
                    type = "email"
                    placeholder = "Insert new email"
                    name = "newEmail"
                    // value = {}
                    // onChange ={}
                    />
            </Form.Group>
            </Col>
            <Col>
            <Button variant="primary" type="submit"> 
                Change email
            </Button>
            </Col>
            </Row>
        </Form>
        </Container>

{/* Too many br tags, use bootstrap to manage spacing */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div>
           <Form>     
        <Form.Group className="mb-1" controlId="ChangePasswordForm">
            <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password"
                    placeholder="Password"
                    name="password"
                    // value={jsonBody.password}
                    // onChange={handleChange}
                />
        </Form.Group>
        
        <Form.Group className="mb-1" controlId="ConfirmChangePasswordForm">
            <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                // value={jsonBody.confirmPassword}
                // onChange={handleChange}
            />   
            </Form.Group>
            <Col>
            <Button variant="primary" type="submit"> 
            Change Password
            </Button>
            </Col>
        </Form>
    </div>
    </div>
        
    );
}