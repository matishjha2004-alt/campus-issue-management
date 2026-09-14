import { useState } from "react";

import { createIssue } from "../services/api";

import StudentNavbar from "../components/StudentNavbar";
import "../styles/ReportIssue.css";

function ReportIssue() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Internet");
    const [priority, setPriority] = useState("Medium");
    const [location, setLocation] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        const data = await createIssue({
            title,
            description,
            category,
            priority,
            location
        });

        if (data.issue) {
            setMessage(
                "Issue reported successfully!"
            );

            setTitle("");
            setDescription("");
            setCategory("Internet");
            setPriority("Medium");
            setLocation("");
        } else {
            setError(
                data.message || "Failed to report issue"
            );
        }
    };

    return (
        <>
            <StudentNavbar />

            <div className="report-page">

                <div className="report-container">

                    <div className="report-header">

                        <h1>
                            Report a Campus Issue
                        </h1>

                        <p>
                            Provide the details below so the
                            issue can be reviewed and resolved.
                        </p>

                    </div>

                    <div className="report-card">

                        {message && (
                            <div className="success-message">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <form
                            className="report-form"
                            onSubmit={handleSubmit}
                        >

                            <div className="form-group">

                                <label>
                                    Issue Title
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Wi-Fi not working in Lab 2"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    placeholder="Describe the issue in detail..."
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Category
                                    </label>

                                    <select
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Internet">
                                            Internet
                                        </option>

                                        <option value="Electrical">
                                            Electrical
                                        </option>

                                        <option value="Maintenance">
                                            Maintenance
                                        </option>

                                        <option value="Cleanliness">
                                            Cleanliness
                                        </option>

                                        <option value="Infrastructure">
                                            Infrastructure
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                <div className="form-group">

                                    <label>
                                        Priority
                                    </label>

                                    <select
                                        value={priority}
                                        onChange={(e) =>
                                            setPriority(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className="form-group">

                                <label>
                                    Location
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Block A - Computer Lab 2"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <button
                                type="submit"
                                className="report-button"
                            >
                                Submit Issue
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}

export default ReportIssue;