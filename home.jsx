import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Nav from "./nav";

const Home = () => {
  return (
    <div className="home-container">
      {/* ===== Navbar ===== */}
      <Nav />
      
      <section className="hero">
        <div className="hero-content">
          <h1>Enjoy Our Delicious Meals</h1>
          <p>
            Discover a world of flavors crafted by our master chefs. Fresh
            ingredients, bold tastes, and warm hospitality await you.
          </p>
          <div className="hero-buttons">
          <Link to="/menu">
            <button className="primary-btn">Explore Menu</button>
           </Link>
            <Link to="/book-table">
    <button className="secondary-btn">Book a Table</button>
  </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://tse1.mm.bing.net/th/id/OIP.jUfCu2A6ilKJAdybISEMgwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Delicious Food" />
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section className="features">
        <div className="feature">
          <i className="fa fa-user-tie"></i>
          <h3>Master Chefs</h3>
          <p>Our chefs bring creativity and passion to every plate.</p>
        </div>
        <div className="feature">
          <i className="fa fa-utensils"></i>
          <h3>Quality Food</h3>
          <p>We use only the freshest ingredients, cooked to perfection.</p>
        </div>
        <div className="feature">
          <i className="fa fa-cart-plus"></i>
          <h3>Online Orders</h3>
          <p>Order from home and enjoy the taste of excellence anywhere.</p>
        </div>
        <div className="feature">
          <i className="fa fa-headset"></i>
          <h3>24/7 Support</h3>
          <p>Our team is always here to make your dining experience perfect.</p>
        </div>
      </section>

      {/* ===== About Section ===== */}
      <section className="about">
        <div className="about-image">
          <img src="https://residencestyles.com/wp-content/uploads/2024/07/Contemporary-Restaurant-Interior-Design_6.jpg" alt="Restaurant Interior" />
        </div>
        <div className="about-text">
          <h2>Welcome to Restoran</h2>
          <p>
            We blend tradition and innovation in every dish. From the cozy
            atmosphere to our world-class menu, we make every meal unforgettable.
          </p>
          <button className="primary-btn">Read More</button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© 2025 Restoran — by Navjot Kaur</p>
      </footer>
    </div>
  );
};

export default Home;
