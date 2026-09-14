import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import AdminDashboard from "./pages/AdminDashboard";
import IssueDetails from "./pages/IssueDetails";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />


                {/* Student Routes */}

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute role="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/report-issue"
                    element={
                        <ProtectedRoute role="student">
                            <ReportIssue />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/my-issues"
                    element={
                        <ProtectedRoute role="student">
                            <MyIssues />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/issues/:id"
                    element={
                        <ProtectedRoute role="student">
                            <IssueDetails />
                        </ProtectedRoute>
                    }
                />


                {/* Admin Routes */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;