import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  email: "",
  isLoggedIn: false,
  login: (token, email) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  let initialToken = null;
  let initialEmail = "";

  const retrivedToken = localStorage.getItem("token");
  const retrivedEmail = localStorage.getItem("email");

  if (retrivedEmail && retrivedToken) {
    initialToken = retrivedToken;
    initialEmail = retrivedEmail;
  }

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const userLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const context = {
    token,
    email,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
