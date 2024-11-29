import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';
import {useState} from 'react';


export default function(){

  let navigate = useNavigate();
    const [jsonBody, SetJsonBody] = useState({ //might not need a state
        email: '',
        firstname: '',
        password: '',
//        confirmPassword: '', // not here, but still need to do string comparision with password
    });

    const {login} = useUser(); //Get login state, from store.js (UserContext)
    const [errorMessage, setErrorMessage] = useState('');

    function formResetter(){
      SetJsonBody({
        email: '',
        firstname: '',
        password: '',
      });
      
    }
    
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

        try{
          
        const response = await fetch(process.env.REACT_APP_BASE_API_LINK + "user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonBody)
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
     

        const expireTime = new Date();
        expireTime.setMonth(expireTime.getMonth()+1)
       
        const {token, firstName} = response.data;
     
        document.cookie = `Authorization=Bearer ${token}; expires=${expireTime.toUTCString()}; Path=/`;
        document.cookie = `FirstName=${firstName}; expires=${expireTime.toUTCString()}; Path=/`;

        console.log("signup success")

        navigate("/");
        login(firstName);
    
      }
      
      catch(error){
        console.error(error.message); 
        if (error.message){
          console.log("yaay det virker");
        }
        switch(error.message){
          
          case "400": //prop not good to get error message as string?
            setErrorMessage('email is already taken or password is not set');
            console.log("status 400 in switch");
            
            break;
          default:
            setErrorMessage( 'Unknown error happened, try again');
              console.log("defaultgttt");
        }
      
        {formResetter()}

      }

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
    {errorMessage && (<div className ='mt-3 text-danger'> {/* Currently buggy,expands the form when error message shown*/}
            <p className = 'fw-bold'>{errorMessage}</p>
          </div>)}
  </Form>
</div>
    );
}