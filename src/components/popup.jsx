import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/popup.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import PopupInput from "./popupInput";

const Popup = ({ closePopup }) => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState([]);

  const handleMainButtonClick = async () => {
    const emailInput = document.getElementById("emailInput").value;
    const passwordInput = document.getElementById("passwordInput").value;

    try {
      const response = await fetch("http://localhost:8000/validateAdmin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const result = await response.json();

      if (result.success) {
        closePopup();
        navigate("/admin", {
          state: { adminName: result.email },
        });
      } else {
        setErrorMessages(result.errors);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessages([
        "An unexpected error occurred. Please try again later.",
      ]);
    }
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
        {errorMessages.length > 0 && (
          <div className={styles.errorMessagesDiv}>
            <RiErrorWarningFill className={styles.errorIcon} />
            <div className={styles.errorMessages}>
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
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
