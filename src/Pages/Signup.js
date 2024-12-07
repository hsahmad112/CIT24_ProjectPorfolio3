import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';
import {useEffect, useState} from 'react';
import { comparePasswords, validatePassword, validateEmail} from '../Helpers/FormHelper';

export default function(){

  const [legalFormatBool, setLegalFormatBool] = useState();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isLegitPasswordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>\/?]).{8,}$/ //we did not make this    (match at least one digit, special character and upper cased character, minimum length of 8 characters)


  let navigate = useNavigate();
    const [jsonBody, SetJsonBody] = useState({ //consider splitting up for readability
        email: '',
        firstName: '',
        password: '',
        confirmPassword: '',
    });

    const {login} = useUser(); //Get login state, from store.js (UserContext)
    
    const [errorMessage, setErrorMessage] = useState({
      passwordMismatch: '',
      invalidEmailFormat: '',
      genericError: '',
      invalidPasswordFormat: ''

    });
    const formIsValid = !legalFormatBool && !errorMessage.passwordMismatch && !errorMessage.invalidEmailFormat; //tracking validity for whole form 


    
    // const emailChecker = () =>{
    //   if(!errorMessage.invalidEmailFormat) return;
    //   if (!emailRegex.test(jsonBody.email)) {
    //     setLegalFormatBool(true);
    //     setErrorMessage((prevState) => ({
    //       ...prevState,
    //       invalidEmailFormat: "The format of the email is not correct!"
    //     }));
    //   }
    //   else{
    //     setLegalFormatBool(false);
    //     setErrorMessage((prevState) => ({
    //       ...prevState,
    //       invalidEmailFormat: ""
    //     }));
    //   }
    // } 

    function handleChange(e){
        //console.log("live input:", jsonBody); //the most cursed console log
        const  {name, value} = e.target;
        SetJsonBody((prevData) => ({
            ...prevData, 
            [name]:value,
        }));
    };

    useEffect(()=>{
      validateEmail(jsonBody.email, setErrorMessage, setLegalFormatBool);
      comparePasswords(jsonBody.password, jsonBody.confirmPassword, setErrorMessage, setLegalFormatBool);
      validatePassword(jsonBody.password, jsonBody.confirmPassword, setErrorMessage, setLegalFormatBool);
    }, [jsonBody], )

    

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
        const data = await response.json();

        const expireTime = new Date();
        expireTime.setMonth(expireTime.getMonth()+1)
       
        
        const {token, firstName} = data;
        console.log(`token: ${token} - firstname${firstName}`);
        document.cookie = `Authorization=Bearer ${token}; expires=${expireTime.toUTCString()}; Path=/`;
        document.cookie = `FirstName=${firstName}; expires=${expireTime.toUTCString()}; Path=/`;

        console.log("signup success")

        navigate("/");
        login(firstName);
    
      }
      
      catch (error) {
      console.error(`error er ${error.message}`);


        setErrorMessage((prevState) => ({
          ...prevState,
          genericError: 'An error occurred. Please try again later.'
        }));
    }
      //   }
      
      // }

      

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
        defaultValue={jsonBody.firstName}
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
        onChange={handleChange}
       />
    </Form.Group>

    <Form.Group className='mb-1' controlId='SignupFormEmailFormat'>
      <Form.Text className ='mt-3 text-danger'
      disabled = {legalFormatBool}> {errorMessage.invalidEmailFormat}</Form.Text>
    </Form.Group>


    <Form.Group className='mb-1' controlId='PwdNotMatching'>
      <Form.Text className ='mt-3 text-danger'
      disabled = {legalFormatBool}> {errorMessage.passwordMismatch}</Form.Text>
    </Form.Group>

    <Form.Group className='mb-1' controlId='PwdIncorrectFormat'>
      <Form.Text className ='mt-3 text-danger'
      disabled = {legalFormatBool}> 
      {errorMessage.invalidPasswordFormat}
      </Form.Text>
    </Form.Group>


    <Button variant="primary" type="submit" disabled = {!formIsValid}> 
      Sign Up
    </Button>

  </Form>
</div>
    );
}