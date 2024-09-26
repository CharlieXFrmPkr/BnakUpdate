import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We provide reliable, secure banking services tailored to your needs. Visit us in person or online.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Customer Support: +9779876543210</p>
          <p>Email: siddarthasupport@yourbank.com</p>
        </div>
        <div className="footer-section social-media">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.linkedin.com/feed/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Bank. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
