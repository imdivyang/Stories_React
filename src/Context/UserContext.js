import React, { useState } from "react";
import { createContext } from "react";

const UserContext = createContext("Default Value");

export const UserProvider = ({ children }) => {
  const [currentUserDetail, setCurrentUserDetail] = useState({});

  const setCurrentUser = (data) => {
    if (data) {
      setCurrentUserDetail(data);
    }
  };

  return (
    <UserContext.Provider value={{ currentUserDetail, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
