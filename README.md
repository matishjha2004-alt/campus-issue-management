# Campus Issue Management System

A full-stack web application for reporting, tracking, assigning, and resolving campus-related issues.

## Features

### Student

- Student registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected student routes
- Report new campus issues
- View reported issues
- View issue details
- Track issue status
- Add comments to reported issues

### Admin

- Admin login
- Protected admin routes
- Admin dashboard
- View all campus issues
- Filter issues by status, category, and priority
- Assign issues to students
- Update issue status
- View reporter information
- Dashboard statistics

## Technologies Used

### Frontend

- React
- React Router
- JavaScript ES6+
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
campus-issue-management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── issueController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Issue.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── issueRoutes.js
│   │   └── adminRoutes.js
│   ├── .env
│   ├── .gitignore
│   ├── createAdmin.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminNavbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── StudentNavbar.jsx
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── IssueDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyIssues.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── styles/
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md