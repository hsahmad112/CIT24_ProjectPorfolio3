const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>\/?]).{8,}$/ //we did not make this    (match at least one digit, special character and upper cased character, minimum length of 8 characters)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validatePassword = (password, confirmPassword, setErrorMessage, setLegalFormatBool) => {
    const errorKey = "invalidPasswordFormat";
    const invalidPasswordFormatMessage = "Wrong format: Match at least one digit, special character, uppercase letter, and 8+ characters." 
    if(!password || !confirmPassword) return;
    if(!doesFieldPassRegex(password, passwordRegex, setLegalFormatBool, setErrorMessage, errorKey, invalidPasswordFormatMessage)){
        return;
    }
    else {
        clearErrorMessage(setLegalFormatBool, setErrorMessage, errorKey);
    }
  };

export const comparePasswords = (password, confirmPassword, setErrorMessage, setLegalFormatBool) => {
    if(!password || !confirmPassword) return;
  
    if(password !== confirmPassword){
        setLegalFormatBool(true);
        setErrorMessage(prevState => ({
            ...prevState,
            passwordMismatch: "Password fields do not match." ,
        }));}
      
      
        else{
            setLegalFormatBool(false);
            setErrorMessage(prevState => ({
                ...prevState,
                passwordMismatch: "", //needless as the setLegalFormatBool hides the message
            }));
        }
}



export const validateEmail = (email, setErrorMessage, setLegalFormatBool) => {
    const errorKey = "invalidEmailFormat";
    const invalidEmailFormatMessage = "The format of the email is not correct. Please insert a valid email address" 
    if(isFieldEmpty(email, setLegalFormatBool, setErrorMessage, errorKey)){
        return;
    }
    if(!doesFieldPassRegex(email, emailRegex, setLegalFormatBool, setErrorMessage, errorKey, invalidEmailFormatMessage)){
        return;
    }
    else{
        clearErrorMessage(setLegalFormatBool, setErrorMessage, errorKey);
    }
}


export const validateName = (firstname, setErrorMessage, setLegalFormatBool) => {
    const errorKey = "invalidFirstNameFormat";
    const invalidFirstNameFormatMessage = "The minimum required lenght for a name is 8 characters. Idk why tho.."

    if(isFieldEmpty(firstname, setLegalFormatBool, setErrorMessage, errorKey)){
        return;
    }
    if(firstname === "" || firstname.length < 8){
        setError(setLegalFormatBool, setErrorMessage, errorKey, invalidFirstNameFormatMessage)
    }
    else{
        clearErrorMessage(setLegalFormatBool, setErrorMessage, errorKey);
    }

    
}




//Meta helpers (Helperfunctions for the helpers)

function isFieldEmpty(field, setLegalFormatBool, setErrorMessage, errorKey){
    if(field === ""){
        setLegalFormatBool(true); //should not be able to pass empty fields
        setErrorMessage((prevState) => ({
            ...prevState,
            [errorKey]: ""
        }));
        return true; //field empty, remove error message
    }
        return false; //not empty
}



function setError(setLegalFormatBool, setErrorMessage, errorKey, errorMessage){
        setLegalFormatBool(true);
        setErrorMessage((prevState) => ({
            ...prevState,
            [errorKey]: errorMessage
        }));
        return true; //field empty, remove error message
}


function doesFieldPassRegex(field, regex, setLegalFormatBool, setErrorMessage, errorKey, errorMessage){
    if(!regex.test(field)){
        setLegalFormatBool(true);
        setErrorMessage((prevState) => ({
            ...prevState,
            [errorKey]: errorMessage
        }));
        return false;
    }
    return true;
}

function clearErrorMessage(setLegalFormatBool, setErrorMessage, errorKey){
    setLegalFormatBool(false);
    setErrorMessage((prevState) => ({
        ...prevState,
        [errorKey]: ""
    }));
}
