import React, { useState } from "react";
import "./booktable.css";

const BookTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_time: "",
    people: "",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/book-table", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);

      // Reset the form
      setFormData({
        name: "",
        email: "",
        date_time: "",
        people: "",
        request: "",
      });
    } catch (err) {
      alert("❌ Failed to book table");
      console.error(err);
    }
  };

  return (
    <div className="booktable-wrapper">
      {/* ===== LEFT IMAGE SECTION ===== */}
      <div className="booktable-image">
        <img
          src="https://as1.ftcdn.net/v2/jpg/03/20/60/36/1000_F_320603617_WIq1FcqRhZ0MoxSGwDKkva5o4K1HsjwF.jpg"
          alt="Dining experience"
        />
        <div className="play-button">▶</div>
      </div>

      {/* ===== RIGHT FORM SECTION ===== */}
      <div className="booktable-form">
        <h4 className="subheading">Reservation</h4>
        <h1>Book A Table Online</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="datetime-local"
              name="date_time"
              required
              value={formData.date_time}
              onChange={handleChange}
            />
            <select
              name="people"
              required
              value={formData.people}
              onChange={handleChange}
            >
              <option value="">No Of People</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 or more</option>
            </select>
          </div>

          <textarea
            name="request"
            placeholder="Special Request"
            value={formData.request}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="submit-btn">
            BOOK NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTable;
