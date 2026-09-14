import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        const data = await loginUser({
            email,
            password
        });

        if (data.token) {
            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            if (data.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }
        } else {
            setMessage(
                data.message || "Login failed"
            );
        }
    };

    return (
        <div className="login-page">

            {/* Left Section */}

            <div className="login-brand">

                <div className="brand-content">

                    <div className="brand-logo">
                        CI
                    </div>

                    <h1>
                        Campus Issue
                        <br />
                        Management
                    </h1>

                    <p>
                        A simple and efficient platform
                        for reporting, tracking, and
                        resolving campus issues.
                    </p>

                    <div className="brand-features">

                        <div className="brand-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <p>
                                Report campus problems easily
                            </p>

                        </div>

                        <div className="brand-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <p>
                                Track issue status in real time
                            </p>

                        </div>

                        <div className="brand-feature">

                            <div className="feature-icon">
                                ✓
                            </div>

                            <p>
                                Manage and resolve issues efficiently
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right Section */}

            <div className="login-section">

                <div className="login-card">

                    <h2>
                        Welcome back
                    </h2>

                    <p className="login-subtitle">
                        Sign in to continue to your dashboard
                    </p>

                    <form
                        className="login-form"
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Email address

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                required
                            />
                        </label>

                        <label>
                            Password

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Sign In
                        </button>

                    </form>

                    {message && (
                        <p className="login-message">
                            {message}
                        </p>
                    )}

                    <p className="register-link">
                        Don't have an account?{" "}
                        <Link to="/register">
                            Create an account
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;