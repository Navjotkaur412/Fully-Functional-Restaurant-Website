import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root1234", // change if needed
  database: "restaurant_db",
});

// ✅ Check DB Connection
db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// ========================
// ✅ BOOK TABLE API
// ========================
app.post("/book-table", (req, res) => {
  const { name, email, date_time, people, request } = req.body;

  if (!name || !email || !date_time || !people) {
    return res.status(400).json({ message: "❌ All fields are required!" });
  }

  const sql =
    "INSERT INTO bookings (name, email, date_time, people, request) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, date_time, people, request], (err) => {
    if (err) {
      console.error("❌ Error inserting booking:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "✅ Table booked successfully!" });
  });
});

// ========================
// ✅ SIGNUP API
// ========================
app.post("/signup", (req, res) => {
  const { role, name, email, password, phone } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: "❌ Missing required fields" });
  }

  const sql =
    "INSERT INTO users (role, name, email, password, phone) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [role, name, email, password, phone], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "⚠️ Email already exists!" });
      }
      console.error("❌ Error inserting user:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "✅ User created successfully!" });
  });
});

// ========================
// ✅ LOGIN API
// ========================
app.post("/login", (req, res) => {
  const { role, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "❌ Email and password required!" });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND role = ?";
  db.query(sql, [email, role], (err, results) => {
    if (err) {
      console.error("❌ Error fetching user:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "❌ User not found!" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "❌ Invalid password!" });
    }

    res.status(200).json({
      message: `✅ ${role} login successful!`,
      user: { id: user.id, name: user.name, role: user.role, email: user.email },
    });
  });
});

// ========================
// ✅ CART ROUTES
// ========================

// ➕ ADD item to cart
app.post("/api/cart/add", (req, res) => {
  const { user_id, item_name, item_price, quantity } = req.body;

  if (!user_id || !item_name || !item_price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO cart (user_id, item_name, item_price, quantity) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, item_name, item_price, quantity || 1], (err, result) => {
    if (err) {
      console.error("❌ Error inserting into cart:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({
      message: "✅ Item added to cart successfully!",
      cart_id: result.insertId,
    });
  });
});

// 📦 GET user’s cart items
app.get("/api/cart/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const sql = "SELECT * FROM cart WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("❌ Error fetching cart:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

// ❌ DELETE item from cart
app.delete("/api/cart/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM cart WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("❌ Error deleting item:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "✅ Item removed from cart successfully!" });
  });
});

// ========================
// ✅ ROOT TEST ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("🚀 Server running successfully!");
});

// ========================
// ✅ START SERVER
// ========================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
