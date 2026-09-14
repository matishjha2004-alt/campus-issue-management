import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../styles/Register.css";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentId, setStudentId] = useState("");
    const [department, setDepartment] = useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        const data = await registerUser({
            name,
            email,
            password,
            studentId,
            department
        });

        if (data.user) {
            setMessage(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } else {
            setMessage(
                data.message || "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">

            {/* Left branding */}

            <div className="register-brand">

                <div className="register-brand-content">

                    <div className="register-logo">
                        CI
                    </div>

                    <h1>
                        Join Campus Issue
                        <br />
                        Management
                    </h1>

                    <p>
                        Create your student account and
                        start reporting campus issues,
                        tracking their progress, and
                        communicating with administrators.
                    </p>

                </div>

            </div>

            {/* Registration form */}

            <div className="register-section">

                <div className="register-card">

                    <h2>
                        Create your account
                    </h2>

                    <p className="register-subtitle">
                        Register as a student to report
                        and track campus issues.
                    </p>

                    <form
                        className="register-form"
                        onSubmit={handleSubmit}
                    >

                        <label>
                            Full name

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                            />
                        </label>

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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />
                        </label>

                        <label>
                            Student ID

                            <input
                                type="text"
                                placeholder="e.g. BCA002"
                                value={studentId}
                                onChange={(e) =>
                                    setStudentId(e.target.value)
                                }
                                required
                            />
                        </label>

                        <label>
                            Department

                            <input
                                type="text"
                                placeholder="e.g. BCA"
                                value={department}
                                onChange={(e) =>
                                    setDepartment(e.target.value)
                                }
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="register-button"
                        >
                            Create Account
                        </button>

                    </form>

                    {message && (
                        <p className="register-message">
                            {message}
                        </p>
                    )}

                    <p className="login-link">
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign in
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;