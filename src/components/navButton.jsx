import React from "react";
import styles from "../styles/navButton.module.css";

const NavButton = ({ buttonText, onClickFunction }) => {
  const getButtonStyleClass = (buttonText) => {
    switch (buttonText) {
      case "Admin Login":
        return "authenticationButton";
      default:
        return "navigationButton";
    }
  };

  return (
    <button
      className={styles[getButtonStyleClass(buttonText)]}
      onClick={onClickFunction}
    >
      {buttonText}
    </button>
  );
};

export default NavButton;
