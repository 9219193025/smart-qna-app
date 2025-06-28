const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const verifyToken = require("../middleware/auth");

// POST /api/answers/:questionId
router.post("/:questionId", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId } = req.params;

    const answer = new Answer({
      content,
      author: req.user.id,
      question: questionId,
    });

    await answer.save();

    res.status(201).json({ message: "Answer posted successfully", answer });
  } catch (err) {
    console.error("Error posting answer:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get all answers for a specific question
router.get("/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const answers = await Answer.find({ questionId: req.params.id });
    res.status(200).json({ question, answers });
  } catch (error) {
    console.error("Error fetching question details:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
