import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          Welcome to Smart Q&A! 💡
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Ask intelligent questions and get answers from our growing community.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-500 border border-blue-500 px-6 py-2 rounded-md hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            to="/dashboard"
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
          >
            Explore Questions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

