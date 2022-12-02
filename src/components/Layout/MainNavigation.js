import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const {isFederated, setIsFederated} = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const loginOutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <div style={{display:'flex', alignItems:'center'}}>
        <img src="../phone.png" alt="logo" height='auto' width='60px' />
        <div className={classes.logo}>Contact <span style={{color:'black', fontSize:'1.3rem'}}>App</span></div>
      </div>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn || isFederated ? (
            <li>
              <Link to="/contacts">All Contacts</Link>
            </li>
          ): ''}
          {isLoggedIn || isFederated ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ): ''}
          {isLoggedIn || isFederated  ? (
            <li>
              <NavLink to="/add" activeClassName={classes.active}>
                Add Contact
              </NavLink>
            </li>
          ) : ''}
          {isLoggedIn || isFederated ? (
            <li>
              <Link to="/auth" onClick={loginOutHandler}>Logout</Link>
            </li>
          ) : ''}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
