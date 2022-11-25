import { useContext, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AddEdit from "./pages/AddEdit";
import AuthContext from "./components/store/auth-context";
import LoadingSpinner from "./components/Animation/LoadingSpinner";
import Landing from "./pages/LandingPage";
import About from "./pages/About";
import View from "./pages/View"

function App() {
  const authCtx = useContext(AuthContext);
  

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          <Route path="/profile">
            {authCtx.isLoggedIn && <UserProfile />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/add">
            {authCtx.isLoggedIn && <AddEdit />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/contacts">
            {authCtx.isLoggedIn && <Landing />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/view/:id">
            {authCtx.isLoggedIn && <View />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/update/:id">
            {authCtx.isLoggedIn && <AddEdit />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
