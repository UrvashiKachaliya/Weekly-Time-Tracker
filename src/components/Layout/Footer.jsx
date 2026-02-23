import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container"> 
        <div className="footer-section">
          <h2 className="footer-logo">MyApp</h2>
          <p>Tanstack demo application</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: support@myapp.com</p>
          <p style={{ lineHeight: "2" }}>Phone: +11111111111</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
