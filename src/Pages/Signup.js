import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';
import {useEffect, useState} from 'react';
import { prettyDOM } from '@testing-library/react';
import { toBePartiallyChecked } from '@testing-library/jest-dom/matchers';

export default function(){

  const [legalFormatBool, SetLegalFormatBool] = useState();
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
      passwordNotMatching: '',
      emailIncorrectFormat: '',
      generalError: '',
      passwordIncorrectFormat: ''

    });
    const formIsValid = !legalFormatBool && !errorMessage.passwordNotMatching && !errorMessage.emailIncorrectFormat; //tracking validity for whole form 


    const validatePassword = () => {
      if (!jsonBody.password || !jsonBody.confirmPassword) return; //dont do anything if pwd field empty
      if(!isLegitPasswordRegex.test(jsonBody.password)){
        SetLegalFormatBool(true);
        setErrorMessage((prevState) => ({
          ...prevState,
          passwordIncorrectFormat: 'Wrong format: Match at least one digit, special character and upper cased character, minimum length of 8 characters',
        }));
      }
      else{
        SetLegalFormatBool(false);
        setErrorMessage((prevState) => ({
          ...prevState,
          passwordIncorrectFormat: '',
        }));
      }
    }

    const comparePwds = () => {
      if (!jsonBody.password || !jsonBody.confirmPassword) return;
      if(jsonBody.password !== jsonBody.confirmPassword){
        SetLegalFormatBool(true);
        setErrorMessage((prevState) => ({
          ...prevState,
          passwordNotMatching: "Password fields do not match!",
        }));      }
      else{
        SetLegalFormatBool(false);
        setErrorMessage((prevState) => ({
          ...prevState,
          passwordNotMatching: "",
        }));
      }
    }
    
    const emailChecker = () =>{
      if(!errorMessage.emailIncorrectFormat) return;
      if (!emailRegex.test(jsonBody.email)) {
        SetLegalFormatBool(true);
        setErrorMessage((prevState) => ({
          ...prevState,
          emailIncorrectFormat: "The format of the email is not correct!"
        }));
      }
      else{
        SetLegalFormatBool(false);
        setErrorMessage((prevState) => ({
          ...prevState,
          emailIncorrectFormat: ""
        }));
      }
    } 

    function handleChange(e){
        //console.log("live input:", jsonBody); //the most cursed console log
        const  {name, value} = e.target;
        SetJsonBody((prevData) => ({
            ...prevData, 
            [name]:value,
        }));
    };

    useEffect(()=>{
      emailChecker();
      comparePwds();
      validatePassword();
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
          generalError: 'An error occurred. Please try again later.'
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
      disabled = {legalFormatBool}> {errorMessage.emailIncorrectFormat}</Form.Text>
    </Form.Group>


    <Form.Group className='mb-1' controlId='PwdNotMatching'>
      <Form.Text className ='mt-3 text-danger'
      disabled = {legalFormatBool}> {errorMessage.passwordNotMatching}</Form.Text>
    </Form.Group>

    <Form.Group className='mb-1' controlId='PwdIncorrectFormat'>
      <Form.Text className ='mt-3 text-danger'
      disabled = {legalFormatBool}> 
      {errorMessage.passwordIncorrectFormat}
      </Form.Text>
    </Form.Group>


    <Button variant="primary" type="submit" disabled = {!formIsValid}> 
      Sign Up
    </Button>

  </Form>
</div>
    );
}