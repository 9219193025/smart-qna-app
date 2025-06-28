import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const qRes = await API.get(`/questions/user/${user.id}`);
        setQuestions(qRes.data);

        const aRes = await API.get(`/answers/user/${user.id}`);
        setAnswers(aRes.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Your Questions</h3>
        {questions.length === 0 ? (
          <p>You haven’t asked any questions yet.</p>
        ) : (
          questions.map((q) => (
            <div key={q._id} className="border p-4 my-2 rounded bg-gray-50">
              <p className="font-medium">{q.title}</p>
              <p className="text-sm">{q.body}</p>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold">Your Answers</h3>
        {answers.length === 0 ? (
          <p>You haven’t answered any questions yet.</p>
        ) : (
          answers.map((a) => (
            <div key={a._id} className="border p-4 my-2 rounded bg-gray-50">
              <p className="text-sm">{a.answerText}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
