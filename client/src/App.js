import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import AskQuestion from "./pages/AskQuestion";
import QuestionDetails from "./pages/QuestionDetails";
import Answer from "./pages/Answer";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/questions/:id" element={<QuestionDetails />} />
         <Route path="/answer" element={<Answer />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/question/:id" element={<PrivateRoute><QuestionDetails /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
