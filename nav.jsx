import { Link } from "react-router-dom";

import "../App.css";
const Nav =()=>{
return(
      <header className="navbar">
            <div className="logo">
              <i className="fa fa-utensils"></i> <span>Restoran</span>
            </div>
            <nav>
              <ul>
                <li><Link to="/">Home</Link></li>
<li><Link to="/menu">Menu</Link></li>
<li><Link to="/about">About</Link></li>
<li><Link to="/contact">Contact</Link></li>
  <li><a href="/cart">🛒 Cart</a></li>

<li>
  <Link to="/login">
    <button className="book-btn">Login</button>
  </Link>
</li>
              </ul>
            </nav>
          </header>
)
}
export default Nav;