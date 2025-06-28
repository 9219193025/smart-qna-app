// components/AnswerForm.jsx
import React, { useState } from "react";
import API from "../api/api";

const AnswerForm = ({ questionId, fetchQuestionDetails }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(`/questions/${questionId}/answer`, { content });
      console.log("Answer submitted:", response.data);
      setContent("");
      fetchQuestionDetails(); // to refresh answers list
    } catch (error) {
      console.error("Error submitting answer:", error.response?.data || error.message);
      alert("Failed to submit answer.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your Answer"
        rows="4"
        className="w-full border p-3 rounded-md"
        required
      />
      <button
        type="submit"
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Answer
      </button>
    </form>
  );
};

export default AnswerForm;
