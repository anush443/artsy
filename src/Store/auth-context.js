import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  id: null,
  email: "",
  userName: "",
  isAdmin: null,
  isLoggedIn: false,
  login: (token, id) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrievedStoredToken = () => {
  const retrievedObject = localStorage.getItem("userInfo");
  //console.log(retrievedObject);
  if (retrievedObject) {
    const storedToken = JSON.parse(retrievedObject).token;
    const storedId = JSON.parse(retrievedObject).id;
    const storedEmail = JSON.parse(retrievedObject).email;
    const storedUserName = JSON.parse(retrievedObject).userName;
    const storedisAdmin = JSON.parse(retrievedObject).isAdmin;
    const storedExpirationDate = JSON.parse(retrievedObject).expirationTime;

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 60000) {
      localStorage.removeItem("userInfo");
      return null;
    }

    return {
      token: storedToken,
      id: storedId,
      email: storedEmail,
      userName: storedUserName,
      isAdmin: storedisAdmin,
      duration: remainingTime,
    };
  }
};

export const AuthContextProvider = (props) => {
  const tokenData = retrievedStoredToken();

  //console.log("retrievedObject: ", JSON.parse(retrievedObject));

  let intialToken;
  let initalId;
  let initalEmail;
  let intialUserName;
  let intialisAdmin;

  if (tokenData) {
    intialToken = tokenData.token;
    initalId = tokenData.id;
    initalEmail = tokenData.email;
    intialUserName = tokenData.userName;
    intialisAdmin = tokenData.isAdmin;
  }

  const [token, setToken] = useState(intialToken);
  const [id, setId] = useState(initalId);
  const [email, setEmail] = useState(initalEmail);
  const [userName, setUserName] = useState(intialUserName);
  const [isAdmin, setisAdmin] = useState(intialisAdmin);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    setEmail(null);
    setUserName(null);
    setisAdmin(null);
    localStorage.removeItem("userInfo");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      localStorage.removeItem("cart");
      localStorage.removeItem("exhibition");
    }
  });

  const loginHandler = (
    token,
    id,
    email,
    userName,
    isAdmin,
    expirationTime
  ) => {
    //console.log(expirationTime);
    setToken(token);
    setId(id);
    setEmail(email);
    setUserName(userName);
    setisAdmin(isAdmin);
    const userInfo = {
      token: token,
      id: id,
      email: email,
      userName: userName,
      isAdmin: isAdmin,
      expirationTime: expirationTime,
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    const remainingTime = calculateRemainingTime(expirationTime);
    //console.log("remainingTime " + remainingTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      //console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    id: id,
    email: email,
    userName: userName,
    isAdmin: isAdmin,
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
