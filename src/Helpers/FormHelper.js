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
        removeError(setLegalFormatBool, setErrorMessage, errorKey);
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
        removeError(setLegalFormatBool, setErrorMessage, errorKey);
    }
}



//Meta helpers (Helperfunctions for the helpers)

function isFieldEmpty(field, setLegalFormatBool, setErrorMessage, errorKey){
    if(field === ""){
        setLegalFormatBool(false);
        setErrorMessage((prevState) => ({
            ...prevState,
            [errorKey]: ""
        }));
        return true; //field empty, remove error message
    }
        return false; //not empty
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

function removeError(setLegalFormatBool, setErrorMessage, errorKey){
    setLegalFormatBool(false);
    setErrorMessage((prevState) => ({
        ...prevState,
        [errorKey]: ""
    }));
}

function doesFieldsMatch(fieldA, fieldB, setLegalFormatBool, setErrorMessage, errorkey, errorMessage){
    
    if(fieldA !== fieldB){
        setLegalFormatBool(true);
        setErrorMessage(prevState => ({
            ...prevState,
            [errorkey]: errorMessage,
        }));}
      
      
        else{
            setLegalFormatBool(false);
            setErrorMessage(prevState => ({
                ...prevState,
                [errorkey]: "", //needless as the setLegalFormatBool hides the message
            }));
        }
}