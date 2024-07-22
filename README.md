# Hospital Triage Application

## Overview

Welcome to the Hospital Triage Application! This web-based application helps staff and patients better understand wait times while in the emergency room. It provides a platform for patients to sign in and check their approximate wait times and for admin users to manage patient data.

## How to Use

### For Patients

Patients can sign in with their name and a 3-character code to view their approximate wait time in the emergency room. The wait time is based on the severity of injuries and the length of time already in the queue.

### For Admins

Admin users can log in to manage patient data, including adding new patients, editing existing patient wait times, and deleting patients from the system.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed
- PHP installed
- MySQL installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hospital-triage.git
cd hospital-triage
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Start the PHP server:

```bash
cd PHP/
php -S localhost:8000
```

5. Open your browser and navigate to http://localhost:3000. Ensure cookies are enabled so PHP can communicate correctly with the display.


# Features

- **Patient Sign-In**: Patients can sign in to check their approximate wait times and access various hospital resources.
- **Admin Management**: Admin users can add, edit, and delete patient data.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

# Implementation

## Technology Stack

- HTML, CSS, JavaScript (React.js), PHP, MySQL

## React Components

### LandingPage Component

- Manages the patient sign-in process.
- Handles patient data and communication with the backend.

### AdminPage Component

- Displays a list of patients.
- Allows admin users to add, edit, and delete patient data.

### PatientPage Component

- Displays patient information.
- Allows patients to view hospital map, see various services, etc.


## Design System

This repository documents the design system for the Hospital Triage website.

[Design System](./src/docs/design_system.md)

## State Management

The user information is managed using the PHP session:

#### Admin Session
- `adminName`: Name of administrator using application.
- `patients`: Full list of patients currently in queue.

#### Admin Session
- `patientName`: Name of patient using application.
- `patientCode`: Three character code associated with the patient.
- `waitTime`: String describing the amount of remaining before the patient will be treated.


## Examples of Perspectives:

<br>

- Landing Page
  
  <img width="1671" alt="landingPage" src="https://github.com/user-attachments/assets/7fc3dc05-83d7-4280-a5f5-83fbe1a803b3">
  <br>
  <br>
  <br>
  <br>

- Patient Page
  
  <img width="1649" alt="patientPage" src="https://github.com/user-attachments/assets/22ca677e-7412-44f1-8e3c-03158d884a0d">
  <br>
  <br>
  <br>
  <br>

- Admin Page
  
  <img width="1666" alt="adminPage" src="https://github.com/user-attachments/assets/61fc2cfb-b6fe-48b1-b493-dbcf85b378ad">
  <br>
  <br>

  

# Collaborators

Group 41: Mohamad Kassas and Anjali Mohammed
