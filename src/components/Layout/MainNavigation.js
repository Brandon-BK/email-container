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
      <Link to="/">
        <div className={classes.logo}>Contact App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn || isFederated ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ): ''}
          {isLoggedIn || isFederated ?  (
            <li>
              <NavLink to="/" activeClassName={classes.active}>
                About
              </NavLink>
            </li>
          ) : ''}
          {isLoggedIn || isFederated  ? (
            <li>
              <NavLink to="/" activeClassName={classes.active}>
                Add Contact
              </NavLink>
            </li>
          ) : ''}
          {isLoggedIn || isFederated ? (
            <li>
              <button onClick={loginOutHandler}>Logout</button>
            </li>
          ) : ''}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
