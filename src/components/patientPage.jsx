import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/patientPage.module.css";
import NavigationBar from "./navBar";
import HospitalMap from "../images/map.png";

const resourcesInfo = {
  Map: "Here is the hospital map. You can find various departments and facilities.",
  "Available Services": [
    "<strong>Emergency Care:</strong> Immediate treatment for critical conditions.",
    "<strong>Outpatient Services:</strong> Routine check-ups, diagnostics, and minor procedures.",
    "<strong>Inpatient Services:</strong> Comprehensive care for patients who need to stay overnight.",
    "<strong>Surgical Services:</strong> Scheduled and emergency surgeries with advanced technology.",
    "<strong>Maternity Services:</strong> Comprehensive care for mothers and newborns.",
    "<strong>Pediatric Care:</strong> Specialized care for infants, children, and adolescents.",
    "<strong>Cardiology:</strong> Treatment and care for heart-related conditions.",
    "<strong>Oncology:</strong> Comprehensive cancer treatment and support services.",
    "<strong>Radiology:</strong> Advanced imaging services including X-rays, CT scans, and MRIs.",
    "<strong>Physical Therapy:</strong> Rehabilitation services to help patients recover mobility and function.",
    "<strong>Mental Health Services:</strong> Counseling, therapy, and psychiatric care.",
    "<strong>Pharmacy:</strong> On-site pharmacy services for prescriptions and consultations.",
    "<strong>Laboratory Services:</strong> Diagnostic testing and blood work.",
  ],
  "Contact Information":
    "For any inquiries, please contact us at (555) 123-4567 or email us at info@hospital.com.",
  "Health Tips":
    "Stay hydrated, get plenty of rest, and follow a balanced diet to maintain good health.",
  "Visiting Hours":
    "Visiting hours are from 9 AM to 9 PM. Please adhere to the hospital's regulations for a smooth visit.",
};

const PatientPage = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState({
    patientName: "",
    patientCode: "",
    waitTime: "",
  });
  const [selectedResource, setSelectedResource] = useState("");

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

  useEffect(() => {
    // Fetch patient information from PHP session
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/validatePatient.php",
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await response.json();

        if (result.success) {
          setPatientInfo(result.state);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };

    fetchPatientInfo();
  }, []);

  return (
    <div className={styles.patientInfoPageContainer}>
      <NavigationBar name={patientInfo.patientName} />
      <div className={styles.content}>
        <div className={styles.patientInfo}>
          <h1>Patient Information</h1>
          <p>
            <strong>Name:</strong> {patientInfo.patientName}
          </p>
          <p>
            <strong>Code:</strong> {patientInfo.patientCode}
          </p>
          <p>
            <strong>Approximate Wait Time:</strong> {patientInfo.waitTime}
          </p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
        <div className={styles.resources}>
          <h2>Hospital Resources</h2>
          <ul>
            <li>
              <a href="#" onClick={() => setSelectedResource("Map")}>
                Hospital Map
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setSelectedResource("Available Services")}
              >
                Available Services
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setSelectedResource("Contact Information")}
              >
                Contact Information
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setSelectedResource("Health Tips")}>
                Health Tips
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setSelectedResource("Visiting Hours")}>
                Visiting Hours and Regulations
              </a>
            </li>
          </ul>
          {selectedResource && (
            <div className={styles.resourceInfo}>
              <h3>{selectedResource}</h3>

              {selectedResource === "Map" ? (
                <div>
                  <p>{resourcesInfo[selectedResource]}</p>
                  <img
                    src={HospitalMap}
                    alt="Hospital Map"
                    className={styles.mapImage}
                  />
                </div>
              ) : selectedResource === "Available Services" ? (
                <ul className={styles.serviceList}>
                  {resourcesInfo[selectedResource].map((service, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: service }}
                    ></li>
                  ))}
                </ul>
              ) : (
                <p>{resourcesInfo[selectedResource]}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
