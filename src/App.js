import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import AdminPage from './components/adminPage';
import PatientPage from './components/patientPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/patient" element={<PatientPage />} />
      </Routes>
    </Router>
  );
};

export default App;
