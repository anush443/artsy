import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  id: 0,
  isLoggedIn: false,
  login: (token, id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState();

  const userIsLoggedIn = !!token;

  const loginHandler = (token, id) => {
    setToken(token);
    setId(id);
  };

  const logoutHandler = () => {
    setToken(null);
    setId(id);
  };

  const contextValue = {
    token: token,
    id: id,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
