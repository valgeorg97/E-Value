import React from 'react';
import './Footer.css';

/**
 * Footer component renders the website's footer, displaying the site's name, links to main pages, and copyright information.
 *
 */

const Footer: React.FC = () => {
  return (
    <footer className="evalue-footer">
      <div className="footer-content">
        <div className="footer-logo">E-Value</div>
        <div className="footer-links">
          <a href="/">All Products</a>
          <a href="/favorites">Favorites</a>
          <a href="/cart">Cart</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 E-Value. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
