import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getIssueById,
    getComments,
    addComment
} from "../services/api";

import StudentNavbar from "../components/StudentNavbar";
import "../styles/IssueDetails.css";

function IssueDetails() {
    const { id } = useParams();

    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);

    const [message, setMessage] = useState("");
    const [newComment, setNewComment] = useState("");
    const [commentMessage, setCommentMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const issueData = await getIssueById(id);

            if (issueData.issue) {
                setIssue(issueData.issue);
            } else {
                setMessage(
                    issueData.message || "Failed to fetch issue"
                );
                return;
            }

            const commentData = await getComments(id);

            if (commentData.comments) {
                setComments(commentData.comments);
            }
        };

        fetchData();
    }, [id]);

    const handleAddComment = async (e) => {
        e.preventDefault();

        setCommentMessage("");

        if (!newComment.trim()) {
            setCommentMessage("Please enter a comment");
            return;
        }

        const data = await addComment(id, newComment);

        if (data.comment) {
            setComments((previousComments) => [
                ...previousComments,
                data.comment
            ]);

            setNewComment("");
            setCommentMessage(
                "Comment added successfully"
            );
        } else {
            setCommentMessage(
                data.message || "Failed to add comment"
            );
        }
    };

    const getPriorityClass = (priority) => {
        if (priority === "High") {
            return "priority-high";
        }

        if (priority === "Low") {
            return "priority-low";
        }

        return "priority-medium";
    };

    if (message) {
        return (
            <>
                <StudentNavbar />

                <div className="issue-error">
                    {message}
                </div>
            </>
        );
    }

    if (!issue) {
        return (
            <>
                <StudentNavbar />

                <div className="issue-loading">
                    Loading issue...
                </div>
            </>
        );
    }

    return (
        <>
            <StudentNavbar />

            <div className="issue-details-page">

                <div className="issue-details-container">

                    {/* Header */}

                    <div className="issue-details-header">

                        <h1>
                            Issue Details
                        </h1>

                        <p>
                            View the details and discussion
                            related to your reported issue.
                        </p>

                    </div>

                    {/* Issue Details */}

                    <div className="issue-details-card">

                        <h2 className="issue-details-title">
                            {issue.title}
                        </h2>

                        <p className="issue-details-description">
                            {issue.description}
                        </p>

                        <div className="issue-info-grid">

                            <div className="issue-info-item">

                                <span className="issue-info-label">
                                    Category
                                </span>

                                <span className="issue-info-value">
                                    {issue.category}
                                </span>

                            </div>

                            <div className="issue-info-item">

                                <span className="issue-info-label">
                                    Priority
                                </span>

                                <span
                                    className={`issue-info-value ${getPriorityClass(
                                        issue.priority
                                    )}`}
                                >
                                    {issue.priority}
                                </span>

                            </div>

                            <div className="issue-info-item">

                                <span className="issue-info-label">
                                    Location
                                </span>

                                <span className="issue-info-value">
                                    📍 {issue.location}
                                </span>

                            </div>

                            <div className="issue-info-item">

                                <span className="issue-info-label">
                                    Status
                                </span>

                                <span className="issue-status">
                                    {issue.status}
                                </span>

                            </div>

                            <div className="issue-info-item">

                                <span className="issue-info-label">
                                    Reported On
                                </span>

                                <span className="issue-info-value">
                                    {new Date(
                                        issue.createdAt
                                    ).toLocaleString()}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Comments */}

                    <div className="comments-card">

                        <div className="comments-header">

                            <h2>
                                Comments
                            </h2>

                            <p>
                                Communicate with the campus
                                administration about this issue.
                            </p>

                        </div>

                        {/* Add Comment */}

                        <form
                            className="comment-form"
                            onSubmit={handleAddComment}
                        >

                            <textarea
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) =>
                                    setNewComment(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="submit"
                                className="comment-button"
                            >
                                Add Comment
                            </button>

                            {commentMessage && (
                                <p className="comment-message">
                                    {commentMessage}
                                </p>
                            )}

                        </form>

                        {/* Comment List */}

                        {comments.length === 0 ? (

                            <div className="no-comments">
                                No comments yet.
                            </div>

                        ) : (

                            <div className="comments-list">

                                {comments.map((comment) => (

                                    <div
                                        className="comment-item"
                                        key={comment._id}
                                    >

                                        <p className="comment-author">

                                            <strong>
                                                {comment.userId?.name ||
                                                    "User"}
                                            </strong>

                                            {comment.userId?.role && (
                                                <>
                                                    {" "}
                                                    ·{" "}
                                                    {
                                                        comment.userId
                                                            .role
                                                    }
                                                </>
                                            )}

                                        </p>

                                        <p className="comment-text">
                                            {comment.message}
                                        </p>

                                        <span className="comment-date">
                                            {new Date(
                                                comment.createdAt
                                            ).toLocaleString()}
                                        </span>

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

export default IssueDetails;