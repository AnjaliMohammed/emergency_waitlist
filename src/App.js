import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingPage';
import AdminPage from './components/adminPage';
import PatientPage from './components/patientPage';

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState('');

  const handleAdminLogin = (name) => {
    setIsAdminLoggedIn(true);
    setAdminName(name);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={isAdminLoggedIn ? <AdminPage adminName={adminName} /> : <LandingPage />} />
        <Route path="/patient" element={<PatientPage />} />
      </Routes>
    </Router>
  );
};

export default App;
