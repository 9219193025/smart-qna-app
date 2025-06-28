// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
app.use("/api/questions", questionRoutes);
const answerRoutes = require("./routes/answers");
app.use("/api/answers", answerRoutes);



// Mount routes (only once with full base path)
app.use("/api/auth", authRoutes);

// Root test route
app.get("/", (req, res) => {
  res.send("Welcome to Smart Q&A API!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");

  // Start server after DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("DB Connection failed:", err.message);
});
