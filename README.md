1.Description
This project is a Hospital Management System web application built with React (frontend) and Node.js / Express (backend).
It allows administrators to log in securely, manage personnel records (add, edit, delete), and manage job roles within the hospital.

The backend uses JWT-based authentication stored in HTTP cookies to secure admin sessions. The app supports uploading personnel's information and images and displays summary statistics on the dashboard.

2.Features
Secure admin login with JWT stored in cookies

CRUD operations for personnel records (including image upload)

Manage hospital job roles

Dashboard displaying counts and admin list

Responsive UI built with React and Bootstrap

3.Technologies
Frontend: React, React Router, Axios, Bootstrap

Backend: Node.js, Express, MySQL, Multer (file upload), bcrypt (password hashing), JSON Web Tokens (JWT)

Database: MySQL

4.Installation
Clone the repo

-Backend setup:

 Navigate to the backend folder

 Install dependencies: npm install

 Configure your MySQL database and update connection settings in Server/utils/db.js

 Start the server: npm start

-Frontend setup:

 Navigate to the frontend folder

 Install dependencies: npm install

 Start the React app: npm start

5.Usage
Open your browser at http://localhost:5173

Server port: 3000

Login with your admin credentials

Navigate the dashboard to manage personnel and job roles

Add/edit/delete personnel and upload profile images

Logout securely to clear your session cookie

6.API Endpoints
POST /auth/adminlogin : Admin login with email & password, returns JWT cookie

GET /auth/personnel : Get personnel list

POST /auth/add_personnel : Add a new personnel with image upload

PUT /auth/edit_personnel/:id : Edit a personnel data

DELETE /auth/delete_personnel/:id : Delete a personnel

GET /auth/job : Get list of jobs

POST /auth/add_job : Add new job role

GET /auth/logout : Logout and clear JWT cookie

7.Notes
Passwords are hashed with bcrypt before storing

JWT tokens are signed and stored in HTTP-only cookies

Multer middleware handles image uploads on the backend

Ensure you have MySQL installed and running for the database