import React, { useState } from "react";
import styles from "../styles/landingPage.module.css";
import NavigationBar from "./navBar";
import Popup from "./popup";

const LandingPage = () => {
  const [seen, setSeen] = useState(false);

  const toggleAdminLoginPopup = () => {
    setSeen(!seen);
  };

  return (
    <div className={styles.landingPageContainer}>
      <NavigationBar toggleAdminLoginPopup={toggleAdminLoginPopup} />
      <div className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h1>Welcome to the Hospital Triage Application</h1>
          <p>
            Our application helps staff and patients better understand wait
            times while in the emergency room.
          </p>
        </section>
        <section className={styles.explanationSection}>
          <h2>How It Works</h2>
          <p>
            The application allows patients to understand their approximate wait
            times in the emergency room based on severity of injuries and length
            of time already in the queue. By signing in with your name and a
            3-letter code, you can view your estimated wait time, which is
            continually updated as patients are treated.
          </p>
        </section>
        <section className={styles.signInSection}>
          <h2>Sign In</h2>
          <p>
            Enter your name and 3-letter code to see your approximate wait time.
          </p>
          <form className={styles.signInForm}>
            <input
              id="nameInput"
              type="text"
              placeholder="Name"
              className={styles.inputField}
            />
            <input
              id="codeInput"
              type="text"
              placeholder="3-Letter Code"
              className={styles.inputField}
            />
            <button type="submit" className={styles.signInButton}>
              Sign In
            </button>
          </form>
        </section>
      </div>
      {seen && <Popup closePopup={toggleAdminLoginPopup} />}
    </div>
  );
};

export default LandingPage;
