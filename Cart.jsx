import React, { useEffect, useState } from "react";
import "./cart.css";
import Nav from "./nav";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = 1; // ✅ temporary (replace with logged-in user id later)

  // ✅ Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);
        const data = await response.json();
        console.log("Fetched cart data:", data);
        setCartItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="cart-wrapper">
      <Nav />
      <div className="cart-box">
        <h2 className="cart-title">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="empty-text">Your cart is empty 😔</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.item_name}</h3>
                <p>Price: ₹{item.item_price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={async () => {
                    try {
                      await fetch(`http://localhost:5000/api/cart/${item.id}`, {
                        method: "DELETE",
                      });
                      setCartItems(cartItems.filter((i) => i.id !== item.id));
                    } catch (err) {
                      console.error("Error removing item:", err);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
