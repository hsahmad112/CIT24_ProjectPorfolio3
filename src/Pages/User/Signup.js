import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router';
import {useUser} from '../../Store/store';
import {useEffect, useState} from 'react';
import { comparePasswords, validatePassword, validateEmail, validateName} from '../../Helpers/FormValidation';

export default function Signup(){

  const [isFieldValid, setIsFieldValid] = useState(false);

  let navigate = useNavigate();

  const [jsonBody, setJsonBody] = useState({
      email: '',
      firstname: '',
      password: '',
      confirmPassword: '',
  });

  const {login} = useUser(); //Gets the login state, from store.js (UserContext)
    
  const [errorMessage, setErrorMessage] = useState({
    passwordMismatch: '',
    invalidEmailFormat: '',
    genericError: '',
    invalidPasswordFormat: '',
    invalidFirstNameFormat: ''
  });
  
  const formIsValid = !isFieldValid && !errorMessage.passwordMismatch && !errorMessage.invalidEmailFormat; //tracking validity for whole form 

  function handleChange(e){
    const  {name, value} = e.target;
    setJsonBody((prevData) => ({
        ...prevData, 
        [name]:value,
    }));
  };

  useEffect(()=>{
    validateEmail(jsonBody.email, setErrorMessage, setIsFieldValid);
    comparePasswords(jsonBody.password, jsonBody.confirmPassword, setErrorMessage, setIsFieldValid);
    validatePassword(jsonBody.password, setErrorMessage, setIsFieldValid);
    validateName(jsonBody.firstname, setErrorMessage, setIsFieldValid);
  }, [jsonBody])

  async function handleSubmit(e){
    e.preventDefault();
    const { email, firstname, password } = jsonBody;

    try{    
      const response = await fetch(process.env.REACT_APP_BASE_API_LINK + "user", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({email, firstname, password })
      });
    

      if(response.ok){

        const data = await response.json();
        login(data);
      }
      else{
        console.error("credentials passed the form check, but got error. Email might be taken");
      }

    }
  
    catch (error) {
      console.error(`error er ${error.message}`);

      setErrorMessage((prevState) => ({
        ...prevState,
        genericError: 'An error occurred. Please try again later.'
      }));
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
          defaultValue={jsonBody.firstname}
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
        disabled = {isFieldValid}> {errorMessage.invalidEmailFormat}</Form.Text>
      </Form.Group>


      <Form.Group className='mb-1' controlId='PwdNotMatching'>
        <Form.Text className ='mt-3 text-danger'
        disabled = {isFieldValid}> {errorMessage.passwordMismatch}</Form.Text>
      </Form.Group>

      <Form.Group className='mb-1' controlId='PwdIncorrectFormat'>
        <Form.Text className ='mt-3 text-danger'
        disabled = {isFieldValid}> 
        {errorMessage.invalidPasswordFormat}
        </Form.Text>
      </Form.Group>


      <Form.Group className='mb-1' controlId='firstNameIncorrectFormat'>
        <Form.Text className ='mt-3 text-danger'
        disabled = {isFieldValid}> 
        {errorMessage.invalidFirstNameFormat}
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit" disabled = {!formIsValid}> 
        Sign Up
      </Button>

    </Form>
  </div>
  );
}