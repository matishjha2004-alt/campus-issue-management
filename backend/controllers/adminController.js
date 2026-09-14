const Issue = require("../models/Issue");
const User = require("../models/User");

// Get all issues
const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find()
            .populate("reportedBy", "name email studentId department")
            .populate("assignedTo", "name email studentId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "All issues fetched successfully",
            issues
        });
    } catch (error) {
        console.error("Get all issues error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Update issue status
const updateIssueStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "OPEN",
            "ASSIGNED",
            "IN_PROGRESS",
            "RESOLVED"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        issue.status = status;

        await issue.save();

        res.status(200).json({
            message: "Issue status updated successfully",
            issue
        });
    } catch (error) {
        console.error("Update status error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Assign an issue to a user
const assignIssue = async (req, res) => {
    try {
        const { assignedTo } = req.body;

        if (!assignedTo) {
            return res.status(400).json({
                message: "assignedTo is required"
            });
        }

        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found"
            });
        }

        issue.assignedTo = assignedTo;

        // Automatically move issue to ASSIGNED
        issue.status = "ASSIGNED";

        await issue.save();

        res.status(200).json({
            message: "Issue assigned successfully",
            issue
        });
    } catch (error) {
        console.error("Assign issue error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Get dashboard statistics
const getStats = async (req, res) => {
    try {
        const totalIssues = await Issue.countDocuments();

        const openIssues = await Issue.countDocuments({
            status: "OPEN"
        });

        const assignedIssues = await Issue.countDocuments({
            status: "ASSIGNED"
        });

        const inProgressIssues = await Issue.countDocuments({
            status: "IN_PROGRESS"
        });

        const resolvedIssues = await Issue.countDocuments({
            status: "RESOLVED"
        });

        res.status(200).json({
            totalIssues,
            openIssues,
            assignedIssues,
            inProgressIssues,
            resolvedIssues
        });
    } catch (error) {
        console.error("Get stats error:", error.message);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("_id name email studentId role department");

        res.status(200).json({
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

module.exports = {
    getAllIssues,
    updateIssueStatus,
    assignIssue,
    getStats,
    getUsers
};