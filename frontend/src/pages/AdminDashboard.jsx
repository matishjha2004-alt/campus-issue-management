import { useEffect, useState } from "react";
import {
    getAdminIssues,
    getAdminStats,
    getAdminUsers,
    updateIssueStatus,
    assignIssue
} from "../services/api";

import AdminNavbar from "../components/AdminNavbar";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        const issueData = await getAdminIssues();
        const statsData = await getAdminStats();
        const userData = await getAdminUsers();

        if (issueData.issues) {
            setIssues(issueData.issues);
        } else {
            setMessage(issueData.message || "Failed to fetch issues");
        }

        if (statsData) {
            setStats(statsData);
        }

        if (userData.users) {
            setUsers(userData.users);
        }
    };

    const handleStatusChange = async (issueId, status) => {
        const data = await updateIssueStatus(issueId, status);

        if (data.issue) {
            setMessage("Issue status updated successfully");
            fetchDashboardData();
        } else {
            setMessage(data.message || "Failed to update status");
        }
    };

    const handleAssignment = async (issueId, userId) => {
        if (!userId) return;

        const data = await assignIssue(issueId, userId);

        if (data.issue) {
            setMessage("Issue assigned successfully");
            fetchDashboardData();
        } else {
            setMessage(data.message || "Failed to assign issue");
        }
    };

    const filteredIssues = issues.filter((issue) => {
        const matchesStatus =
            statusFilter === "ALL" ||
            issue.status === statusFilter;

        const matchesCategory =
            categoryFilter === "ALL" ||
            issue.category === categoryFilter;

        const matchesPriority =
            priorityFilter === "ALL" ||
            issue.priority === priorityFilter;

        return (
            matchesStatus &&
            matchesCategory &&
            matchesPriority
        );
    });

    return (
        <>
            <AdminNavbar />

            <div className="admin-dashboard">
                <div className="admin-dashboard-container">

                    <div className="admin-dashboard-header">
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>
                                Monitor, assign, and manage campus issues.
                            </p>
                        </div>
                    </div>

                    {message && (
                        <div className="admin-message">
                            {message}
                        </div>
                    )}

                    {stats && (
                        <div className="admin-stats-grid">

                            <div className="admin-stat-card">
                                <span className="admin-stat-label">
                                    Total Issues
                                </span>
                                <strong>
                                    {stats.totalIssues}
                                </strong>
                            </div>

                            <div className="admin-stat-card">
                                <span className="admin-stat-label">
                                    Open
                                </span>
                                <strong>
                                    {stats.openIssues}
                                </strong>
                            </div>

                            <div className="admin-stat-card">
                                <span className="admin-stat-label">
                                    Assigned
                                </span>
                                <strong>
                                    {stats.assignedIssues}
                                </strong>
                            </div>

                            <div className="admin-stat-card">
                                <span className="admin-stat-label">
                                    In Progress
                                </span>
                                <strong>
                                    {stats.inProgressIssues}
                                </strong>
                            </div>

                            <div className="admin-stat-card">
                                <span className="admin-stat-label">
                                    Resolved
                                </span>
                                <strong>
                                    {stats.resolvedIssues}
                                </strong>
                            </div>

                        </div>
                    )}

                    <div className="admin-issues-section">

                        <div className="admin-section-header">

                            <div>
                                <h2>Campus Issues</h2>
                                <p>
                                    Review and manage reported issues.
                                </p>
                            </div>

                            <div className="admin-filter">

                                <label htmlFor="status-filter">
                                    Status
                                </label>

                                <select
                                    id="status-filter"
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                >
                                    <option value="ALL">
                                        All Statuses
                                    </option>

                                    <option value="OPEN">
                                        Open
                                    </option>

                                    <option value="ASSIGNED">
                                        Assigned
                                    </option>

                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>

                                    <option value="RESOLVED">
                                        Resolved
                                    </option>
                                </select>

                                <label htmlFor="category-filter">
                                    Category
                                </label>

                                <select
                                    id="category-filter"
                                    value={categoryFilter}
                                    onChange={(e) =>
                                        setCategoryFilter(e.target.value)
                                    }
                                >
                                    <option value="ALL">
                                        All Categories
                                    </option>

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

                                <label htmlFor="priority-filter">
                                    Priority
                                </label>

                                <select
                                    id="priority-filter"
                                    value={priorityFilter}
                                    onChange={(e) =>
                                        setPriorityFilter(e.target.value)
                                    }
                                >
                                    <option value="ALL">
                                        All Priorities
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="Low">
                                        Low
                                    </option>
                                </select>

                            </div>

                        </div>

                        {filteredIssues.length === 0 ? (

                            <div className="admin-no-issues">
                                <h3>
                                    No issues found
                                </h3>

                                <p>
                                    There are no issues matching
                                    the selected filters.
                                </p>
                            </div>

                        ) : (

                            <div className="admin-issues-list">

                                {filteredIssues.map((issue) => (

                                    <div
                                        className="admin-issue-card"
                                        key={issue._id}
                                    >

                                        <div className="admin-issue-top">

                                            <div>
                                                <h3>
                                                    {issue.title}
                                                </h3>

                                                <p className="admin-issue-description">
                                                    {issue.description}
                                                </p>
                                            </div>

                                            <span className="admin-status-badge">
                                                {issue.status}
                                            </span>

                                        </div>

                                        <div className="admin-issue-meta">

                                            <span>
                                                <strong>
                                                    Category:
                                                </strong>{" "}
                                                {issue.category}
                                            </span>

                                            <span>
                                                <strong>
                                                    Priority:
                                                </strong>{" "}
                                                {issue.priority}
                                            </span>

                                            <span>
                                                <strong>
                                                    Location:
                                                </strong>{" "}
                                                {issue.location}
                                            </span>

                                        </div>

                                        <div className="admin-reporter">

                                            <h4>
                                                Reported By
                                            </h4>

                                            <p>
                                                <strong>
                                                    {issue.reportedBy?.name}
                                                </strong>
                                            </p>

                                            <p>
                                                {issue.reportedBy?.email}
                                            </p>

                                            <p>
                                                Student ID:{" "}
                                                {issue.reportedBy?.studentId}
                                            </p>

                                            <p>
                                                Department:{" "}
                                                {issue.reportedBy?.department}
                                            </p>

                                        </div>

                                        <div className="admin-controls">

                                            <div className="admin-control-group">

                                                <label>
                                                    Update Status
                                                </label>

                                                <select
                                                    value={issue.status}
                                                    onChange={(e) =>
                                                        handleStatusChange(
                                                            issue._id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="OPEN">
                                                        Open
                                                    </option>

                                                    <option value="ASSIGNED">
                                                        Assigned
                                                    </option>

                                                    <option value="IN_PROGRESS">
                                                        In Progress
                                                    </option>

                                                    <option value="RESOLVED">
                                                        Resolved
                                                    </option>
                                                </select>

                                            </div>

                                            <div className="admin-control-group">

                                                <label>
                                                    Assign To
                                                </label>

                                                <select
                                                    value={
                                                        issue.assignedTo?._id ||
                                                        ""
                                                    }
                                                    onChange={(e) =>
                                                        handleAssignment(
                                                            issue._id,
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Select user
                                                    </option>

                                                    {users
                                                        .filter(
                                                            (user) =>
                                                                user.role ===
                                                                "student"
                                                        )
                                                        .map((user) => (
                                                            <option
                                                                key={user._id}
                                                                value={
                                                                    user._id
                                                                }
                                                            >
                                                                {user.name} (
                                                                {
                                                                    user.studentId
                                                                }
                                                                )
                                                            </option>
                                                        ))}
                                                </select>

                                            </div>

                                        </div>

                                        <div className="admin-issue-footer">

                                            <span>
                                                Reported on{" "}
                                                {new Date(
                                                    issue.createdAt
                                                ).toLocaleString()}
                                            </span>

                                            {issue.assignedTo && (
                                                <span>
                                                    Assigned to{" "}
                                                    <strong>
                                                        {
                                                            issue.assignedTo
                                                                .name
                                                        }
                                                    </strong>
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>
            </div>
        </>
    );
}

export default AdminDashboard;