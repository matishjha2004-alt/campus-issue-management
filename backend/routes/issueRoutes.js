const express = require("express");

const {
    createIssue,
    getMyIssues,
    getIssueById,
    addComment,
    getComments
} = require("../controllers/issueController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIssue);
router.get("/my", protect, getMyIssues);
router.get("/:id", protect, getIssueById);
router.post("/:id/comments", protect, addComment)
router.get("/:id/comments", protect, getComments);;

module.exports = router;