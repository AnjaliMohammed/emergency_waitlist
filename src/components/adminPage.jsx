import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/adminPage.module.css";
import NavigationBar from "./navBar";

const AdminPage = () => {
  const location = useLocation();
  const { adminName } = location.state || {};
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      // TODO: Implement fetching data from the database
      // Simulate fetching data from a database for now
      const data = [
        {
          name: "John Doe",
          code: "ABC",
          injuryDescription: "Fracture",
          waitTime: "2 hours",
        },
        {
          name: "Jane Smith",
          code: "DEF",
          injuryDescription: "Burn",
          waitTime: "1 hour",
        },
      ];
      setPatients(data);
    };

    fetchPatients();
  }, []);

  return (
    <div className={styles.adminPageContainer}>
      <NavigationBar name={adminName} />
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
            {patients.map((patient, index) => (
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
