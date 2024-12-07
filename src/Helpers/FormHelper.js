const isLegitPasswordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-[\]{};':"\\|,.<>\/?]).{8,}$/ //we did not make this    (match at least one digit, special character and upper cased character, minimum length of 8 characters)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


export const validatePassword = (password, confirmPassword, setErrorMessage, setLegalFormatBool) => {
    if (!password && !confirmPassword) return; //return here, if no entry is made, without raising error.
    if (!isLegitPasswordRegex.test(password)) {
      setLegalFormatBool(true);
      setErrorMessage((prevState) => ({
        ...prevState,
        passwordIncorrectFormat: 'Wrong format: Match at least one digit, special character, uppercase letter, and 8+ characters.',
      }));
    } else {
      setLegalFormatBool(false);
      setErrorMessage((prevState) => ({
        ...prevState,
        passwordIncorrectFormat: '',
      }));
    }
  };