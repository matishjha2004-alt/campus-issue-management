import { useNavigate } from "react-router-dom";

import StudentNavbar from "../components/StudentNavbar";
import "../styles/StudentDashboard.css";

function StudentDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <>
            <StudentNavbar />

            <div className="student-dashboard">

                <div className="dashboard-container">

                    {/* Dashboard Header */}

                    <div className="dashboard-header">

                        <h1>
                            Student Dashboard
                        </h1>

                        <h2>
                            Welcome, {user?.name}
                        </h2>

                        <div className="user-info">

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {user?.email}
                            </p>

                            <p>
                                <strong>
                                    Student ID:
                                </strong>{" "}
                                {user?.studentId}
                            </p>

                            <p>
                                <strong>
                                    Department:
                                </strong>{" "}
                                {user?.department}
                            </p>

                            <p>
                                <strong>
                                    Role:
                                </strong>{" "}
                                {user?.role}
                            </p>

                        </div>

                    </div>

                    {/* Campus Issue Management */}

                    <div className="dashboard-section">

                        <h3>
                            Campus Issue Management
                        </h3>

                        <div className="dashboard-actions">

                            <button
                                className="dashboard-button"
                                onClick={() =>
                                    navigate(
                                        "/student/report-issue"
                                    )
                                }
                            >
                                Report New Issue
                            </button>

                            <button
                                className="dashboard-button"
                                onClick={() =>
                                    navigate(
                                        "/student/my-issues"
                                    )
                                }
                            >
                                My Issues
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default StudentDashboard;