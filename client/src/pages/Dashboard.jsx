import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions");
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">All Questions</h1>

      {questions.length === 0 ? (
        <p className="text-center text-gray-500">No questions posted yet.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q._id} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-gray-800">{q.title}</h2>
              <p className="text-gray-600 mt-2 mb-4">{q.description}</p>
              <Link
                to={`/questions/${q._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
