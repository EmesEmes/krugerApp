# Kruger App

## Overview
Kruger PowerMap is a web application that shows in real time the sectors with power outages and allows users to log in to find out their current location and the energy status of their sector.

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for routing in React applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **PrimeReact**: A collection of rich UI components for React.

## Features
- **User Management**:
  - Create new users with unique IDs.
  - Edit user details including names, email, and coordinates.
  - Delete users from the system.
- **Sector Management**:
  - Create new sectors with specific coordinates and power outage schedules.
  - Edit sector details.
  - Delete sectors from the system.
- **Real-time Notifications**:
  - Display success and error messages using PrimeReact Toast notifications.

## Project Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager) or yarn

### Installation
1. Clone the repository:
  ```bash
  git clone https://github.com/EmesEmes/krugerApp.git
  ```
2. Navigate to the project directory:
  ```bash
  cd kruger-app
  ```
3. Install the dependencies:
  ```bash
  npm install
  ```
### Running the project
To start the development server, run:
  ```bash
  npm run dev
  ```
The application will be available at `http://localhost:3000`.

### Admin User
To start creating users and sectors, log in with the following credentials:

Username: `admin`
Password: `admin`
