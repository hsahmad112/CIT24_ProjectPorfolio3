import { createContext, useContext } from 'react';
    import { useState, useEffect} from "react";
    import {useLocation} from 'react-router';

    const UserContext = createContext();

    export const UserProvider = ({ children}) => {
        const [userName,setUserName] = useState(null);
        
        const login = (userData) => {
            setUserName(userData);
        };

        const logout = () => {
            setUserName(null);
        };

        //const [cookie, setCookie] = useState(getCookieValue("FirstName"));

  function getCookieValue(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim(); 
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1); 
      }
    }
    return null;
  }


        return (
          <UserContext.Provider value={{userName, login, logout, getCookieValue}}>
            {children}
            
          </UserContext.Provider>
        );
    }
export const useUser = () => useContext(UserContext);

