import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, Auth } from "firebase/auth";
import { auth } from "../../../firebase";

const AuthComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      setUser(auth.currentUser);
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      setError(error.message || "An unknown error occurred");
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth as Auth, email, password);
      setError(null);
      setUser(auth.currentUser);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message || "An unknown error occurred");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth as Auth, email);
      setError(null);
      console.log("Password reset email sent.");
    } catch (error: any) {
      console.error("Error sending password reset email:", error.message);
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handlePasswordReset}>Forgot Password?</button>
        </>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default AuthComponent;