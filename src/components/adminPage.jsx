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
  const [editingPatient, setEditingPatient] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/clearSession.php", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleDelete = async (patientCode) => {
    try {
      const response = await fetch("http://localhost:8000/deletePatient.php", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ code: patientCode }),
      });
      const result = await response.json();

      if (result.success) {
        setAdminInfo((prev) => ({
          ...prev,
          patients: prev.patients.filter(
            (patient) => patient.code !== patientCode
          ),
        }));
      } else {
        alert("Error deleting patient.");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = () => {
    setEditingPatient(true);
  };

  const handleConfirmEdit = async (patientCode, newWaitTime) => {
    try {
      const response = await fetch("http://localhost:8000/editPatient.php", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: patientCode, wait_time: newWaitTime }),
      });
      const result = await response.json();

      if (result.success) {
        setAdminInfo((prev) => ({
          ...prev,
          patients: prev.patients.map((patient) =>
            patient.code === patientCode
              ? { ...patient, wait_time: newWaitTime }
              : patient
          ),
        }));
        setEditingPatient(false);
      } else {
        alert("Error editing patient.");
      }
    } catch (error) {
      console.error("Error editing patient:", error);
    }
  };

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
            {adminInfo.patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.code}</td>
                <td>{patient.injury_description}</td>
                <td>
                  {editingPatient ? (
                    <input
                      type="text"
                      className={styles.inputField}
                      defaultValue={patient.wait_time}
                      onChange={(e) =>
                        setAdminInfo((prev) => ({
                          ...prev,
                          patients: prev.patients.map((p) =>
                            p.code === patient.code
                              ? { ...p, wait_time: e.target.value }
                              : p
                          ),
                        }))
                      }
                    />
                  ) : (
                    patient.wait_time
                  )}
                </td>
                <td>
                  {editingPatient ? (
                    <button
                      className={styles.confirmButton}
                      onClick={() =>
                        handleConfirmEdit(patient.code, patient.wait_time)
                      }
                    >
                      Confirm
                    </button>
                  ) : (
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit()}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(patient.code)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
