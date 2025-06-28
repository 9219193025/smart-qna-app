// pages/QuestionDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import AnswerForm from "../components/AnswerForm";

const QuestionDetail = () => {
  const { id } = useParams(); // get the question ID from URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const res = await API.get(`/questions/${id}`);
        setQuestion(res.data.question);
        setAnswers(res.data.answers);
      } catch (error) {
        console.error("Error fetching question details:", error);
      }
    };

    fetchQuestionDetails();
  }, [id]);

  const handleAnswerSubmit = (newAnswer) => {
    setAnswers([newAnswer, ...answers]);
  };

  if (!question) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-2">{question.title}</h2>
      <p className="text-gray-700 mb-6">{question.description}</p>

      <AnswerForm questionId={id} onAnswerSubmit={handleAnswerSubmit} />

      <h3 className="text-xl font-semibold mt-6">Answers</h3>
      <ul className="mt-4 space-y-4">
        {answers.length > 0 ? (
          answers.map((answer) => (
            <li key={answer._id} className="bg-gray-100 p-4 rounded shadow">
              <p>{answer.content}</p>
              <p className="text-xs text-gray-500 mt-2">— {answer.user}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No answers yet. Be the first to answer!</p>
        )}
      </ul>
    </div>
  );
};

export default QuestionDetail;
