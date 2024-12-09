import { createContext, useContext } from 'react';
import { useState } from "react";
import {useNavigate} from 'react-router';


export function getCookieValue(name) {
  const cookies = document.cookie.split(';'); //Splits cookie string from document, into substrings seperated by ";", and returns array
  for (let cookie of cookies) {
    cookie = cookie.trim(); //removing whitespace

    if (cookie.startsWith(`${name}=`)) { //true if substring equals specified name, e.g. "FirstName"
      
      return cookie.substring(name.length + 1); //Returns substring, from index at length of name +1. E.g. Cookie name string is FirstName, we say +1, aka get string from = sign onways.
                                                //If string is FirstName=Jacob, then returned string is Jacob
    }
  }
  return null;
}

// it HAS to be named "headers" to work when inserting it into the fetch call
export function GetHeader(){
  let cookie = getCookieValue("Authorization");
  if(cookie != null){
    return ({
      "Content-Type": "application/json",
      "Authorization" : cookie
    });
  }
  else 
    return {};
}

const UserContext = createContext();

export const UserProvider = ({ children }) => {
      const [searchType, setSearchType] = useState("everything");
      const [userName, setUserName] = useState(getCookieValue("FirstName"));  
      const [token, setToken] = useState(getCookieValue("Authorization"));
      const [searchResult, setSearchResult] = useState([{
        persons: [],
        titles: []
        }]);

      let navigate = useNavigate();

      const login = (userData) => {
        console.log(`Setting userName: ${userData}`);
          setUserName(userData);
      };

      const logout = () => {
          setUserName(null);
          setToken(null);
          console.log("Logging out");
          document.cookie = "FirstName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          navigate("/")
      };

      return (
        <UserContext.Provider value={{userName, token, searchType, searchResult, setSearchResult, setSearchType, login, logout}}>
          {children}         
        </UserContext.Provider>
      );
}
export const useUser = () => useContext(UserContext);
