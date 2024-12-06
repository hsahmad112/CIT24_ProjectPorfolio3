import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import {getCookieValue } from "../Store/store";


export default function UserSetting(){
    const baseUrl = process.env.REACT_APP_BASE_API_LINK;    
        const [updateEmailBody, setUpdateEmailBody] = useState({
        "email": "",
        "firstName": "",
        "password": "" 
    })

  const headers =  {    
    "Content-Type": "application/json",
    "Authorization" : getCookieValue('Authorization')
}


    function handleEmailChange(e){
        const  {name, value} = e.target;

        setUpdateEmailBody((prevData) => ({
            ...prevData, 
            [name]:value,
        }));
    }

    console.log(updateEmailBody)

    async function handleSubmitEmail(e){
        e.preventDefault();
        console.log(headers.Authorization);
        const res = await fetch(baseUrl+ 'user', {method: "PUT", headers: headers, body: JSON.stringify(updateEmailBody)})
        console.log(res);
        if(res.ok){
            console.log("updated! Status code: ", res.status);
        }
        else{
            console.warn("Update did not happen. Status code: ", res.status);
        }
        
    }

  
    return(

       <div>
        <h3> Settings </h3>
        
        <div class= "d-grid gap-3">
         <div class="row justify-content-start"> 
        <Container class="col-4" className = "mt-5"> 
        <Form onSubmit={handleSubmitEmail}>
            <h5>Change Email</h5>
            <Row className="align-items-end">
            <Col md= {3}>
             <Form.Group controlId="ChangeEmailForm">
                    <Form.Control
                    type = "email"
                    placeholder = "Insert new email"
                    name = "email"
                    onChange ={handleEmailChange}
                    />
            </Form.Group>
            </Col>
            <Col md={2}>
            <Button variant="primary" type="submit"> 
                Change email
            </Button>
            </Col>
            </Row>
        </Form>
        </Container>
        </div>  

        <div>
           <Form>     
           <h5>Change Password</h5>
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
    </div>
    );
}