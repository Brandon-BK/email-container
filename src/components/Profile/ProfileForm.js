import { useRef, useContext, useState } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/auth-context";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../Animation/LoadingSpinner";

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submiitHandler = (e) => {
    e.preventDefault();
    
    const newEnteredPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-GaM4yXaTPIgrnr5TJ4EUh8uJXvAaA4k",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newEnteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(res => {
      history.replace('/')
    })
    .catch(error => {

    })
  };

  return (
    <form className={classes.form} onSubmit={submiitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" minLength="7" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        {/* <button>Change Password</button> */}
        {isLoading ? LoadingSpinner: <button>Change Password</button>}

      </div>
    </form>
  );
};

export default ProfileForm;
