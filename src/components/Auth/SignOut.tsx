import React from "react";
import { auth } from "../../../firebase";
import { SignOutProps } from "../../types/interfaces";

const SignOut: React.FC<SignOutProps> = ({ onSignOutSuccess }: { onSignOutSuccess: () => void }) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      onSignOutSuccess();
    } catch (error: any) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;