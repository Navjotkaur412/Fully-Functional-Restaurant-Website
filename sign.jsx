import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    role: "customer",
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, name, email, password, phone } = formData;

    if (!email || !password || !name) {
      alert("❌ Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setFormData({
          role: "customer",
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      } else {
        alert(`⚠️ ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Signup failed:", err);
      alert("❌ Server error. Try again later.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join Restoran — book tables easily 🍽️</p>

        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="signup-select"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
