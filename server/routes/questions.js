const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const verifyToken = require("../middleware/auth");

// Ask a question (POST /api/questions)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = new Question({
      title,
      description,
      user: req.user.id,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Question posted successfully", question: newQuestion });
  } catch (error) {
    console.error("Error posting question:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit an answer (POST /api/questions/:id/answer)
router.post("/:id/answer", verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const answer = new Answer({
      content,
      user: req.user.id,
      questionId: req.params.id,
    });

    await answer.save();
    res.status(201).json({ message: "Answer submitted successfully", answer });
  } catch (error) {
    console.error("Error submitting answer:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
