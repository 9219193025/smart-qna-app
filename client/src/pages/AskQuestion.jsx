import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/questions",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Question posted:", res.data);


      alert("Question posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error posting question:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Ask a Question
        </h2>

        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter a clear title"
          required
          className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your question in detail..."
          required
          rows="6"
          className="w-full border border-gray-300 p-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
