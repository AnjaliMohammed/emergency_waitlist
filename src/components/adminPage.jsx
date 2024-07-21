import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/adminPage.module.css";
import NavigationBar from "./navBar";

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    adminName: "",
    patients: [],
  });

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/validateAdmin.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result.success) {
          setAdminInfo(result.state);
        } else {
          console.log("Admin not logged in");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <div className={styles.adminPageContainer}>
      <NavigationBar name={adminInfo.adminName} />
      <div className={styles.content}>
        <h1>Patient List</h1>
        <table className={styles.patientTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Injury Description</th>
              <th>Approximate Wait Time</th>
            </tr>
          </thead>
          <tbody>
            {adminInfo.patients.map((patient, index) => (
              <tr key={index}>
                <td>{patient.name}</td>
                <td>{patient.code}</td>
                <td>{patient.injuryDescription}</td>
                <td>{patient.waitTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
