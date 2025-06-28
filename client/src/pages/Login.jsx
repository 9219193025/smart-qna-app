import React, { useState } from "react";
import API from "../api/api";

const Login = () => {
  const [formData,setFormData]=useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);
      

      alert("Login successful!");

      // Redirect or update UI
      window.location.href = "/dashboard"; // or navigate programmatically
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-md"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
