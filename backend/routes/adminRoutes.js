const express = require("express");

const {
    getAllIssues,
    updateIssueStatus,
    assignIssue,
    getStats,
    getUsers
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/issues", protect, admin, getAllIssues);

router.put(
    "/issues/:id/status",
    protect,
    admin,
    updateIssueStatus
);

router.put(
    "/issues/:id/assign",
    protect,
    admin,
    assignIssue
);

router.get(
    "/stats",
    protect,
    admin,
    getStats
);

router.get("/users", protect, admin, getUsers);

module.exports = router;