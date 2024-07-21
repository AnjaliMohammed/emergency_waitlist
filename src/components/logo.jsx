import React from "react";
import logoImage from "../images/logo.png";
import styles from "../styles/logo.module.css";

const Logo = () => {
  return <img src={logoImage} alt="Logo" className={styles.logo} />;
};

export default Logo;
