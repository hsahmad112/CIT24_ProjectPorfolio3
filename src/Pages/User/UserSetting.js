import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import {getCookieValue, useUser, GetHeader} from "../../Store/store";
import { comparePasswords, validateEmail, validatePassword } from '../../Helpers/FormValidation';
import { useNavigate } from 'react-router';

export default function UserSetting(){
    const baseUrl = process.env.REACT_APP_BASE_API_LINK;  
    
    const {logout} = useUser();
    const navigate = useNavigate();
    
    const headers =  {    
        "Content-Type": "application/json",
        "Authorization" : getCookieValue('Authorization')
    }

    const [showAccountDeletionModal, setShowAccountDeletionModal] = useState(false);
   
    const [errorMessage, setErrorMessage] = useState({
        passwordMismatch: '',
        invalidEmailFormat: '',
        genericError: '',
        invalidPasswordFormat: '',
        invalidFirstNameFormat: ''
    });     
    const [legalFormatBool, setLegalFormatBool] = useState(false);

    const [formValues, setFormValues] = useState({
        "email": "",
        "password": "",
        "confirmPassword": ""
    })

    function handleChange(e){
        const {name, value} = e.target;
        setFormValues((prevData) => ({
            ...prevData, 
            [name]:value,
        }));
    }

    async function handleSubmitEmail(e){ //you'd want a user to input their password to confirm their identitiy, no?
        e.preventDefault();

        const newEmailBody =({ 
            email: formValues.email,
            firstName: '',  
            password: '', 
        });

        const res = await fetch(baseUrl+ 'user', {method: "PUT", headers: headers, body: JSON.stringify(newEmailBody)})
        console.log("updating email");
        if(res.ok){
            console.log("updated! Status code: ", res.status);
        }
        else{
            console.warn("Update did not happen. Status code: ", res.status);
        }   
    }


    async function handlePasswordSubmit(e){
        e.preventDefault();

        const newPasswordBody = {
            password: formValues.password,
        };
  
        const res = await fetch(baseUrl + 'user/password-reset/', {method: "PUT", headers: headers, body: JSON.stringify(newPasswordBody)});
        console.log("updating password");

        if(res.ok){
            console.log("password Update successfull");
        }
        else{
            console.warn("Update did not happen. Status code: ", res.status);
        }  
    }

    //logout function could have a warning modal popping up with a password field (to confirm identity) a Proceed button and Cancel button to opt out.
    async function handleDeleteAccount(e){ 
        e.preventDefault();
        const res = await fetch(baseUrl + 'user/', {method: "DELETE", headers});
        console.log("deleting user");
        logout();
        
    }

    useEffect(() => {
        validateEmail(formValues.email, setErrorMessage, setLegalFormatBool);
        validatePassword(formValues.password, setErrorMessage, setLegalFormatBool)
        comparePasswords(formValues.password, formValues.confirmPassword, setErrorMessage, setLegalFormatBool);
    }, [formValues.email, formValues.password, formValues.confirmPassword])


    return(
        <div>
            <h3> Settings </h3>
            <Container className="mt-5"> 
                <Form onSubmit={handleSubmitEmail}>
                    <h5>Change Email</h5>
                    <Row className="align-items-end">
                        <Col md= {3}>
                            <Form.Group controlId="ChangeEmailForm">
                                <Form.Control
                                    type = "email"
                                    placeholder = "Insert new email"
                                    name = "email"
                                    value={formValues.email}
                                    onChange ={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Button variant="primary" type="submit"> 
                                Change email
                            </Button>
                        </Col>
                        <Form.Group className='mb-1' controlId='SignupFormEmailFormat'>
                            <Form.Text className ='mt-3 text-danger'
                            disabled = {legalFormatBool}> {errorMessage.invalidEmailFormat}</Form.Text>
                        </Form.Group>
                    </Row>
                </Form >
            </Container>

            <Form onSubmit={handlePasswordSubmit} className='= mt-5'>
                <h5>Change Password</h5>
                <Form.Group className="mb-1" controlId="ChangePasswordForm">
                    <Form.Control 
                        type="password"
                        placeholder="New password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                </Form.Group>
            
                <Form.Group className="mb-1" controlId="ConfirmChangePasswordForm">
                    <Form.Control 
                        type="password"
                        placeholder="Confirm new password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />   
                </Form.Group>

                <Col>
                    <Button variant="primary" type="submit" disabled ={legalFormatBool}> 
                        Change Password
                    </Button>
                </Col>

                <Form.Group className='mb-1' controlId='PwdIncorrectFormat'>
                    <Form.Text className ='mt-3 text-danger' disabled = {legalFormatBool}> 
                        {errorMessage.invalidPasswordFormat}
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-1' controlId='PwdNotMatching'>
                    <Form.Text className ='mt-3 text-danger' disabled = {legalFormatBool}>
                        {errorMessage.passwordMismatch}
                    </Form.Text>
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mt-5">
                    <Button variant="danger" onClick={() => setShowAccountDeletionModal(true)}> 
                        Delete Account
                    </Button>
                </Form.Group>

                {showAccountDeletionModal &&      
                    <div className="modal show" style={{ display: 'block', position: 'fixed', marginTop: "300px" }}>
                        <Modal.Dialog >
                            <Modal.Header>
                                <Modal.Title>Delete Account</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                Pressing "Proceed" will permanently delete your account together with bookmarks, rating and search history.
                                Are you certain you wish to proceed?
                            </Modal.Body>
                    
                            <Modal.Footer>
                                <Button onClick={() => setShowAccountDeletionModal(false)}> Cancel </Button>
                                <Button type= 'submit' variant='danger' onClick={handleDeleteAccount}> Proceed </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                }

            </Form>
        </div>
    );
}