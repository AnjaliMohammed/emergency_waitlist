import React from "react";
import styles from "../styles/popupInput.module.css";

const PopupInput = ({ inputType }) => {
  return (
    <div className={styles.containerDiv}>
      <input
        className={styles.inputBox}
        id={`${inputType}Input`}
        type={inputType}
        name={inputType}
        placeholder={inputType.charAt(0).toUpperCase() + inputType.slice(1)}
      />
      <label className={styles.label} htmlFor={inputType}>
        {inputType.charAt(0).toUpperCase() + inputType.slice(1)}
      </label>
    </div>
  );
};

export default PopupInput;
