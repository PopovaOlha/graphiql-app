import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import WelcomePage from "../../pages/WelcomePage";
import { auth } from "../../../firebase";
import { AuthComponentProps } from "../../types/interfaces";

const AuthComponent: React.FC<AuthComponentProps> = ({ user, setUser }) => {
  const handleSignInSuccess = () => {
    setUser(auth.currentUser);
  };

  const handleSignOutSuccess = () => {
    setUser(null);
  };

  const handleSignUpSuccess = () => {
    setUser(auth.currentUser);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/">
            {user ? (
              <>
                <p>Welcome, {user.email}</p>
                <SignOut onSignOutSuccess={handleSignOutSuccess} />
              </>
            ) : (
              <>
               <SignIn onSignInSuccess={handleSignInSuccess} />
               <SignUp onSignUpSuccess={handleSignUpSuccess} />
              </>
            )}
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default AuthComponent;