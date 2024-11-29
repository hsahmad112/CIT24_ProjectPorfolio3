import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext, UserProvider } from "../Store/store";
import {useState} from 'react';
import { useNavigate } from 'react-router';
import {useUser} from '../Store/store';

export default function Login(){
  const [user, setUser] = useState(null);

  const {userName, login, logout} = useUser();

  let navigate = useNavigate();
    const [formData, setFormData] = useState({ //Need of state?
        email: '',
        password: '',
    });



    async function handleSubmit(e){
        e.preventDefault();
   
        try{
       const response = await axios.post('https://localhost:7154/api/user/login', formData,
        {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
       )

       const expireTime = new Date();
       expireTime.setMonth(expireTime.getMonth()+1)
      
       const {token, firstName} = response.data;
    
       document.cookie = `Authorization=Bearer ${token}; expires=${expireTime.toUTCString()}; Path=/`;
       document.cookie = `FirstName=${firstName}; expires=${expireTime.toUTCString()}; Path=/`;
       //UserContext.Provider.value = {firstName};

       console.log("login success");
       navigate("/watchlist");
       //login(firstName);
       
    } catch(error){
        console.log('login failed')
        
    }
 
     
    }
   

    return (
        <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-1" controlId="LoginFormEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="email@domain.com" onChange={ (e) => setFormData( (fD) => ({...fD, email: e.target.value}) ) } />
          </Form.Group>
    
          <Form.Group className="mb-1" controlId="LoginFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={ (e) => setFormData( (fD) => ({...fD, password: e.target.value}) ) } />
          </Form.Group>
          <Form.Group className="mb-1" controlId="LoginFormCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="success" type="submit">
            Login
          </Button>
        </Form>
        </div>

      );
}