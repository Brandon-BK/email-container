import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();

  const passwordInputRef = useRef();
  const provider = new GoogleAuthProvider()

  const authCtx = useContext(AuthContext);
  const {isFederated, setIsFederated} = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const handleGoogle = ()=>{
    const auth = getAuth()
    signInWithPopup(auth, provider).then(res => {
      const GoogleUser = res.user
      setIsFederated(true)
      history.replace('/')
    })
  }



  const submiitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-GaM4yXaTPIgrnr5TJ4EUh8uJXvAaA4k";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-GaM4yXaTPIgrnr5TJ4EUh8uJXvAaA4k";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = `Authentication failed!!`;
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submiitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">User Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">User Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>

        
         
            <button
            onClick={handleGoogle}
              style={{
                border: "none",
                outLine: "none",
                padding: "10px",
                cursor: "pointer",
                borderRadius: 8,
                marginTop: 13,
              }}
            >
              Google sign in
            </button>
         
        

        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Your Request.....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
