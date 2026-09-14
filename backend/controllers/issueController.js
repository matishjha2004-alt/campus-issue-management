const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

// Create a new issue
const createIssue = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            priority,
            location
        } = req.body;

        // Check required fields
        if (!title || !description || !category || !location) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Create issue
        const issue = await Issue.create({
            title,
            description,
            category,
            priority,
            location,
            reportedBy: req.user.userId
        });

        res.status(201).json({
            message: "Issue reported successfully",
            issue
        });
    } catch (error) {
        console.error("Create issue error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get issues reported by the logged-in student
const getMyIssues = async (req, res) => {
    try {
        const issues = await Issue.find({
            reportedBy: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Issues fetched successfully",
            issues
        });
    } catch (error) {
        console.error("Get my issues error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get a single issue by ID
const getIssueById = async (req, res) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        // Student can only view their own issue
        if (
            issue.reportedBy.toString() !== req.user.userId
        ) {
            return res.status(403).json({
                message: "Not authorized to view this issue"
            });
        }

        res.status(200).json({
            message: "Issue fetched successfully",
            issue
        });
    } catch (error) {
        console.error("Get issue error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Add a comment to an issue
const addComment = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Comment message is required"
            });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        // Only the student who reported the issue can comment
        if (
            issue.reportedBy.toString() !== req.user.userId
        ) {
            return res.status(403).json({
                message: "Not authorized to comment on this issue"
            });
        }

        const comment = await Comment.create({
            issueId: issue._id,
            userId: req.user.userId,
            message
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });
    } catch (error) {
        console.error("Add comment error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            issueId: req.params.id
        })
            .populate("userId", "name role")
            .sort({ createdAt: 1 });

        res.status(200).json({
            comments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch comments",
            error: error.message
        });
    }
};

module.exports = {
    createIssue,
    getMyIssues,
    getIssueById,
    addComment,
    getComments
};