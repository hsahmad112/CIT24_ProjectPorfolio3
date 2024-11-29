import React, { createContext, useState, useContext } from 'react';

//export const User = React.createContext('none');

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("none");

  const login = (userData) => {
    console.log(userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);