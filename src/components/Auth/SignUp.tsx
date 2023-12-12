import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase/auth";
import { auth } from "../../../firebase";
import { SignUpProps } from "../../types/interfaces";

const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth as Auth, email, password);
      setError(null);
      onSignUpSuccess();
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message || "An unknown error occurred");
    }
  };

  return (
    <div>
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
      <button onClick={handleSignUp}>Sign Up</button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default SignUp;