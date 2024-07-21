import React, { useState } from "react";
import styles from "../styles/popup.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import PopupInput from "./popupInput";

const Popup = ({ closePopup }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);

  const handleMainButtonClick = () => {
    const emailInputField = document.getElementById("emailInput");
    const passwordInputField = document.getElementById("passwordInput");

    const emailInput = emailInputField.value;
    const passwordInput = passwordInputField.value;

    // To Do: Add validation for email and password using PHP and then retrieve the error message
    // from the server and display it in the popup

    // After, check data against database to display admin information
  };

  const handleExitButtonClick = () => {
    closePopup();
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupWindow}>
        <div className={styles.closeButtonDiv} onClick={handleExitButtonClick}>
          <AiOutlineClose className={styles.closeButton} />
        </div>
        <h1 className={styles.header}>Admin Login</h1>

        <PopupInput inputType="email" />
        <PopupInput inputType="password" />
        {errorVisible && (
          <div className={styles.errorMessagesDiv}>
            <RiErrorWarningFill className={styles.errorIcon} />
            <p className={styles.errorMessages}>{errorMessage}</p>
          </div>
        )}

        <button className={styles.mainButton} onClick={handleMainButtonClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Popup;
