import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import {useUser} from '../../Store/Store';
import {PostLogin} from '../../Service/UserService';

export default function Login(){

  const {login, token, checkToken} = useUser();
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
      email: '',
      password: '',
  });

  useEffect(() => {
    checkToken(); //Calls checkToken, which sets token state to null if it is expired or not present. When null, login/signup appear on navbar     
  }, [token]);
    

  function formResetter(){ //helper function - clears fields
    setFormData({
      email: '',
      password: '',
    }); 
  }

  async function handleSubmit(e){
    e.preventDefault();
  
    try{
      const response = await PostLogin(formData);
      login(response.data);
    } 
    catch(error){
      console.error('login failed ' + error.data)

      switch(error.status){
        case 401: 
          setErrorMessage('Invalid username or password, please try again');
          break;

        default:
            setErrorMessage('Unknown error happened, try again');
      }
      formResetter();

    }
  }

  return (
      <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="LoginFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="email@domain.com" onChange={ (e) => setFormData( (fD) => ({...fD, email: e.target.value}) ) } value={formData.email} autoFocus/> {/*Added form input as controlled, such that input now is reflected by state*/}
          </Form.Group>
    
          <Form.Group className="mb-1" controlId="LoginFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={ (e) => setFormData( (fD) => ({...fD, password: e.target.value}) ) } value={formData.password} />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
          {errorMessage && 
            (<div className ='mt-3 text-danger'> 
              <p className = 'fw-bold'>{errorMessage}</p>
            </div>)
          }
        </Form>
      </div>

  );
}