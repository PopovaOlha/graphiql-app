import React from "react";
import { Link } from "react-router-dom";
import styles from "./WelcomePage.module.css";

const WelcomePage: React.FC = () => {
  return (
    <div className={styles.container}>
       <Link to="/register">Sign In</Link>
    </div>
  );
};

export default WelcomePage;
