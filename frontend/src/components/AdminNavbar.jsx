import { useNavigate } from "react-router-dom";
import "../styles/AdminNavbar.css";

function AdminNavbar() {
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
        <nav className="admin-navbar">

            <div className="admin-navbar-container">

                <div
                    className="admin-navbar-brand"
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                >
                    <div className="admin-navbar-logo">
                        CI
                    </div>

                    <span>
                        Campus Issue Management
                    </span>
                </div>

                <div className="admin-navbar-links">

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                    >
                        Admin Dashboard
                    </button>

                    <span className="admin-navbar-user">
                        {user?.name}
                    </span>

                    <button
                        className="admin-navbar-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default AdminNavbar;