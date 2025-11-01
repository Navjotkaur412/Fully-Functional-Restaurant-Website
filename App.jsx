import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home.jsx";
import Menu from "./components/menu.jsx";
import BookTable from "./components/BookTable.jsx"; // ✅ NEW IMPORT
import Login from "./components/login.jsx";
import Sign from "./components/sign.jsx";
import Cart from "./components/Cart";

function App() {


  return (
    <Router>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      <Route path="/book-table" element={<BookTable />} /> {/* ✅ NEW ROUTE */}
      <Route path="/login" element={<Login />} /> 
      <Route path="/sign" element ={<Sign/>}/>
      <Route path="/Cart" element ={<Cart/>}/>
      

      </Routes>
    </Router>
  )
}

export default App
