import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassoword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  let formIsValid = false;

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredPasswordIsValid = enteredPassword.length > 6;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const toggleAuthModeHandler = () => {
    setIsLogin((prevLogin) => !prevLogin);
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassoword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    try {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUyVPmsToqJAdMEhn-VpGQK-DVKujAP5Q";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUyVPmsToqJAdMEhn-VpGQK-DVKujAP5Q";
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      if (!response.ok) {
        setAuthError("Authentication Failed");
        throw new Error("Authentication Failed");
      }
      const responseData = await response.json();
      authCtx.login(responseData.idToken, responseData.email);
      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      history.replace("/menu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className={classes.title}>{isLogin ? "Login" : "Sign Up"}</h1>
      {isLoading && <LoadingSpinner />}
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              required
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              required
              minLength={6}
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
          </div>

          <div className={classes.actions}>
            {!isLoading && (
              <button disabled={!formIsValid}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
            )}

            <button type="button" onClick={toggleAuthModeHandler}>
              {isLogin ? "Create an account" : "Login With existing account"}
            </button>

            {authError && (
              <p style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}>
                {authError}
              </p>
            )}
          </div>
        </form>
      </Card>
    </>
  );
};

export default AuthForm;
