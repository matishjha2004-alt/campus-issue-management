import { useEffect, useState } from "react";

import { getMyIssues } from "../services/api";

import StudentNavbar from "../components/StudentNavbar";
import "../styles/MyIssues.css";

function MyIssues() {
    const [issues, setIssues] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchIssues = async () => {
            const data = await getMyIssues();

            if (data.issues) {
                setIssues(data.issues);
            } else {
                setMessage(
                    data.message || "Failed to fetch issues"
                );
            }
        };

        fetchIssues();
    }, []);

    const getPriorityClass = (priority) => {
        if (priority === "High") {
            return "priority-high";
        }

        if (priority === "Low") {
            return "priority-low";
        }

        return "priority-medium";
    };

    return (
        <>
            <StudentNavbar />

            <div className="my-issues-page">

                <div className="my-issues-container">

                    <div className="my-issues-header">

                        <h1>
                            My Issues
                        </h1>

                        <p>
                            View and track the campus issues
                            you have reported.
                        </p>

                    </div>

                    {message && (
                        <div className="no-issues">
                            {message}
                        </div>
                    )}

                    {!message && issues.length === 0 && (
                        <div className="no-issues">

                            <h3>
                                No issues reported yet
                            </h3>

                            <p>
                                Issues you report will appear
                                here.
                            </p>

                        </div>
                    )}

                    <div className="issues-list">

                        {issues.map((issue) => (

                            <div
                                className="issue-card"
                                key={issue._id}
                            >

                                <h2 className="issue-title">

                                    <a
                                        href={`/student/issues/${issue._id}`}
                                    >
                                        {issue.title}
                                    </a>

                                </h2>

                                <p className="issue-description">
                                    {issue.description}
                                </p>

                                <div className="issue-meta">

                                    <span className="issue-badge category-badge">
                                        {issue.category}
                                    </span>

                                    <span
                                        className={`issue-badge ${getPriorityClass(
                                            issue.priority
                                        )}`}
                                    >
                                        {issue.priority} Priority
                                    </span>

                                    <span className="issue-badge status-badge">
                                        {issue.status}
                                    </span>

                                    <span className="issue-badge location-badge">
                                        📍 {issue.location}
                                    </span>

                                </div>

                                <div className="issue-footer">

                                    Reported on{" "}
                                    {new Date(
                                        issue.createdAt
                                    ).toLocaleString()}

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );
}

export default MyIssues;