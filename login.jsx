import React, { useState } from "react";
import "./login.css";
import Nav from "./nav";

const Login = () => {
  const [formData, setFormData] = useState({
    role: "customer",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/login";

    const payload = isSignup
      ? { role: formData.role, name, email: formData.email, password: formData.password, phone }
      : formData;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Server Error");
    }
  };

  return (
    <div className="login-wrapper">
    <Nav />
      <div className="login-container">
        <h1 className="login-title">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="login-subtitle">
          {isSignup ? "Sign up to get started" : "Login to your account"}
        </p>

        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="login-select"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          )}

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

          <button type="submit" className="login-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="signup-text">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <a href="#" onClick={() => setIsSignup(false)}>
                Login
              </a>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <a href="#" onClick={() => setIsSignup(true)}>
                Sign up
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
