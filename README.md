# TUC E-Shop

## Overview
TUC E-Shop is a full-stack e-commerce application built using React, Node.js, and PostgreSQL. It demonstrates modern web application architecture and includes features like user authentication with Keycloak and message brokering with Kafka.

## Features
- **Frontend**: Built with React for a dynamic user interface.
- **Backend**: Node.js and Express handle API requests.
- **Database**: PostgreSQL for robust data storage.
- **Authentication**: Secure user management using Keycloak.
- **Containerization**: Docker for easy deployment and management.

## Getting Started

### Prerequisites
- Docker
- Node.js
- PostgreSQL

### Running the Application

1. **Clone the repository:**
   ```bash
   git clone https://github.com/npapoutsakis/eshop-app.git
   cd eshop-app
   ```

2. **Start the backend:**
   Navigate to the backend directory and run:
   ```bash
   cd backend
   docker-compose up
   ```

3. **Start the frontend:**
   Open another terminal, navigate to the frontend directory and run:
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application:**
   Open your browser and visit `http://localhost:3000` to view the application.

## License
This project is licensed under the MIT License.

## Acknowledgments
Thanks to all contributors and the open-source community.
