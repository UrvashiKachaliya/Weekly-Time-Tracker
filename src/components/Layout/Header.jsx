import React from "react";
import { Link } from "react-router-dom";
import '../../../src/app.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Tanstack Demo App</div>

      <nav className="nav">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* <button className="login-btn"><Link to="/login">Login</Link></button> */}
    </header>
  );
};

export default Header;
