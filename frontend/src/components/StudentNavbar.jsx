import { useNavigate } from "react-router-dom";
import "../styles/StudentNavbar.css";

function StudentNavbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="student-navbar">

            <div className="student-navbar-container">

                <div
                    className="student-navbar-brand"
                    onClick={() =>
                        navigate("/student/dashboard")
                    }
                >
                    <div className="student-navbar-logo">
                        CI
                    </div>

                    <span>
                        Campus Issue Management
                    </span>
                </div>

                <div className="student-navbar-links">

                    <button
                        onClick={() =>
                            navigate("/student/dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/student/report-issue")
                        }
                    >
                        Report Issue
                    </button>

                    <button
                        onClick={() =>
                            navigate("/student/my-issues")
                        }
                    >
                        My Issues
                    </button>

                    <span className="student-navbar-user">
                        {user?.name}
                    </span>

                    <button
                        className="student-navbar-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default StudentNavbar;