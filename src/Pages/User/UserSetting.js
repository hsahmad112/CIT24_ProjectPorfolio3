import {Button, Modal,Row, Form, Col, Container} from 'react-bootstrap';
import Toaster from '../../Component/Toaster';
import {useEffect, useState} from 'react';
import {useUser} from "../../Store/store";
import {comparePasswords, validateEmail, validatePassword} from '../../Helpers/FormValidation';
import {PutPassword, PutEmail, DeleteUser} from '../../Service/UserService';

export default function UserSetting(){ 
    const {logout} = useUser();

    const [showAccountDeletionModal, setShowAccountDeletionModal] = useState(false);
    const [toastInfo, setToastInfo] = useState({
        header: "",
        body: "",
        color: ""
    });
   
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
    });

    useEffect(()=>{

    },[toastInfo]);

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

        // really should just have one function that handles all fetching try catch
        // so you don't do it every single place you have to fetch data
        try {            
            const response = await PutEmail(newEmailBody);
            console.log("updating email");
            if(response.status === 200){  
                setToastInfo({header: "Success", body: "Your email was updated", color: "success"});
                SetUpdatedCredentials(true);
                setTimeout(() => {
                    SetUpdatedCredentials(false);
                }, 2500);
                console.log("updated! Status code: ", response.status);
            }
            else{
                console.warn("Update did not happen. Status code: ", response.status);
            }   
        } catch (error) {
            console.log("Could not update email, it problably already exist");
        }

    }
    const [UpdatedCredentials, SetUpdatedCredentials] = useState();

    async function handlePasswordSubmit(e){
        e.preventDefault();

        const newPasswordBody = {
            password: formValues.password,
        };
  
        const response = await PutPassword(newPasswordBody);

        if(response.status === 200){ // can't get response.ok to work
            setToastInfo({header: "Success", body: "Your password was updated", color: "success"});
            SetUpdatedCredentials(true);
            setTimeout(() => {
                SetUpdatedCredentials(false);
            }, 2500);
        }
        else{
            console.warn("Update did not happen. Status code: ", response.status);
        }  
    }

    //logout function could have a warning modal popping up with a password field (to confirm identity) a Proceed button and Cancel button to opt out.
    async function handleDeleteAccount(e){ 
        e.preventDefault();

        const response = await DeleteUser();
        if(response.status === 204){ // can't get response.ok to work
            console.log("deleting user");
            logout();
        }
        else{
            console.warn("Delete did not happen. Status code: ", response.status);
        }    
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
            <Toaster header={toastInfo.header} body={toastInfo.body} show={UpdatedCredentials} color={toastInfo.color}></Toaster>
        </div>
    );
}