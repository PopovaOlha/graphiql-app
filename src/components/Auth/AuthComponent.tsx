import React, { useState } from "react";
import { auth } from "../../../firebase";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import WelcomePage from "../../pages/WelcomePage";

const AuthComponent: React.FC = () => {
  const [user, setUser] = useState<any | null>(auth.currentUser);

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
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <SignOut onSignOutSuccess={handleSignOutSuccess} />
          <WelcomePage />
        </>
      ) : (
        <>
          <SignIn onSignInSuccess={handleSignInSuccess} />
          <SignUp onSignUpSuccess={handleSignUpSuccess} />
        </>
      )}
    </div>
  );
};

export default AuthComponent;