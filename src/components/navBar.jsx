import React from "react";
import styles from "../styles/navBar.module.css";
import Logo from "./logo";
import NavButton from "./navButton";

const NavigationBar = ({ toggleAdminLoginPopup, name }) => {
  const homeButtonOnClick = () => {
    console.log("Home button clicked");
  };

  const aboutUsButtonOnClick = () => {
    console.log("About Us button clicked");
  };

  const contactUsButtonOnClick = () => {
    console.log("Contact Us button clicked");
  };

  return (
    <div className={styles.navigationBarContainer}>
      <Logo />
      <div className={styles.navigationButtonsContainer}>
        <NavButton buttonText="Home" onClickFunction={homeButtonOnClick} />
        <NavButton
          buttonText="About Us"
          onClickFunction={aboutUsButtonOnClick}
        />
        <NavButton
          buttonText="Contact Us"
          onClickFunction={contactUsButtonOnClick}
        />
      </div>
      <div className={styles.authenticationButtonsContainer}>
        {name ? (
          <span className={styles.name}>{name.toUpperCase()}</span>
        ) : (
          <NavButton
            buttonText="Admin Login"
            onClickFunction={toggleAdminLoginPopup}
          />
        )}
      </div>
    </div>
  );
};

export default NavigationBar;
