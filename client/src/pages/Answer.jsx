import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import AnswerForm from "../components/AnswerForm";

const Answer = () => {
  const { id } = useParams(); // questionId from URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qRes = await API.get(`/questions/${id}`);
        setQuestion(qRes.data);

        const aRes = await API.get(`/answers/${id}`);
        setAnswers(aRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {question && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{question.title}</h2>
          <p className="mt-2">{question.body}</p>
        </div>
      )}

      <AnswerForm questionId={id} onAnswerSubmitted={() => {
        // Refresh the answers list after new answer submitted
        API.get(`/answers/${id}`).then((res) => setAnswers(res.data));
      }} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Answers:</h3>
        {answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          answers.map((answer) => (
            <div key={answer._id} className="bg-gray-100 p-4 rounded mb-3">
              {answer.answerText}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Answer;
