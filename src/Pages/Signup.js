import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {useState} from 'react';


export default function(){

    const [jsonBody, SetJsonBody] = useState({ //might not need a state
        email: '',
        firstname: '',
        password: '',
//        confirmPassword: '', // not here, but still need to do string comparision with password
    });

    
    function handleChange(e){
        //console.log("live input:", jsonBody); //the most cursed console log
        const  {name, value} = e.target;
        SetJsonBody((prevData) => ({
            ...prevData, 
            [name]:value,
        }));
    };

   async function handleSubmit(e){
        e.preventDefault();
        console.log("pressing the submit button", jsonBody);

        const response = await fetch(process.env.REACT_APP_BASE_API_LINK + "user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonBody)
        });

    }
   
return(

        <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
  <Form onSubmit={handleSubmit}> 
    <Form.Group className="mb-1" controlId="SignupFormEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="email@domain.com"
        name = "email"
        value = {jsonBody.email}
        onChange= {handleChange}
      />
    </Form.Group>
    
    <Form.Group className="mb-1" controlId="SignupFormFirstname">
      <Form.Label>First name</Form.Label>
      <Form.Control 
        type="firstname"
        placeholder="Firstname"
        name="firstname"
        value={jsonBody.firstname}
        onChange={handleChange}
      />
    </Form.Group>

    
    <Form.Group className="mb-1" controlId="SignupFormPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control 
        type="password"
        placeholder="Password"
        name="password"
        value={jsonBody.password}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-1" controlId="SignupFormConfirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control 
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        value={jsonBody.confirmPassword}
       // onChange={handleChange}
       />
    </Form.Group>

    <Button variant="primary" type="submit" >
      Sign Up
    </Button>
  </Form>
</div>
    );
}