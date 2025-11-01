import React, { useState } from "react";
import "./menu.css";
import Nav from "./nav.jsx";

const Menu = () => {
  const [cart, setCart] = useState([]);

  const menuItems = [
    {
      id: 1,
      name: "Grilled Chicken",
      price: 12.99,
      category: "Main Course",
      img: "https://tse2.mm.bing.net/th/id/OIP.Ow_TG1jIT5O2d7nMcXm_QwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc: "Juicy grilled chicken served with seasonal vegetables and signature sauce.",
    },
    {
      id: 2,
      name: "Cheese Pizza",
      price: 9.49,
      category: "Fast Food",
      img: "https://tse1.mm.bing.net/th/id/OIP.tQHQ1U2uUdAZXyMv6oSydgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc: "Classic cheese pizza baked to perfection with a crispy crust and rich flavor.",
    },
    {
      id: 3,
      name: "Veggie Burger",
      price: 8.99,
      category: "Fast Food",
      img: "https://tse4.mm.bing.net/th/id/OIP.s07UsAo90pfNbIUBM-OTbAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc: "Healthy and tasty burger made with fresh veggies, herbs, and a tangy sauce.",
    },
    {
      id: 4,
      name: "Pasta Alfredo",
      price: 10.5,
      category: "Main Course",
      img: "https://www.cookingclassy.com/wp-content/uploads/2019/09/alfredo-sauce-15.jpg",
      desc: "Creamy Alfredo pasta with parmesan cheese, garlic, and fresh parsley.",
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      price: 6.5,
      category: "Dessert",
      img: "https://tse2.mm.bing.net/th/id/OIP.mD9uvqMGLhaAxor-MWFSiQHaKX?rs=1&pid=ImgDetMain&o=7&rm=3",
      desc: "Molten chocolate cake served warm with vanilla ice cream and cocoa drizzle.",
    },
    {
      id: 6,
      name: "Strawberry Shake",
      price: 5.2,
      category: "Beverage",
      img: "https://www.unicornsinthekitchen.com/wp-content/uploads/2021/07/Strawberry-Milkshake-2.1200px-1-of-1-720x1080.jpg",
      desc: "Refreshing strawberry milkshake blended with real fruit and whipped cream.",
    },
  ];

  // ✅ Add to Cart Function — connects to backend
  const addToCart = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1, // static abhi ke liye; later replace with logged-in user id
          item_name: item.name,
          item_price: item.price,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCart([...cart, item]);
        alert(`${item.name} added to cart 🛒`);
      } else {
        alert("Failed to add item to cart: " + data.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Something went wrong while adding item to cart.");
    }
  };

  return (
    <>
      <Nav />
      <div className="menu-container">
        {/* Header Section */}
        <header className="menu-header">
          <h1>🍽️ Our Signature Menu</h1>
          <p>
            From sizzling starters to delightful desserts — experience culinary
            perfection crafted by our master chefs.
          </p>
        </header>

        {/* Menu Grid */}
        <section className="menu-grid">
          {menuItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <div className="menu-img">
                <img src={item.img} alt={item.name} />
                <div className="menu-overlay">
                  <p>{item.desc}</p>
                </div>
              </div>
              <div className="menu-details">
                <div className="menu-title">
                  <h3>{item.name}</h3>
                  <span className="price">₹{item.price}</span>
                </div>
                <p className="category">{item.category}</p>

                {/* Add to Cart Button */}
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="menu-footer-bottom">
          <p>© 2025 Restoran | Crafted with ❤️ by Navjot Kaur</p>
        </footer>
      </div>
    </>
  );
};

export default Menu;
