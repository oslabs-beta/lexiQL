import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/orbit-logo-white.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <a
            href="#"
            className="footer-brand-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo(0, 0);
            }}
          >
            <img src={Logo} alt="Orbit" className="footer-logo" />
          </a>
        </div>

        <div className="footer-center">
          <span>© 2021–{currentYear}</span>
          <span aria-hidden="true" className="footer-divider">
            •
          </span>
          <span>MIT License</span>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/oslabs-beta/Orbit"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Open Orbit on GitHub"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="footer-divider">
            •
          </span>
          <a href="#faq" className="footer-link" aria-label="Go to Frequently Asked Questions">
            FAQ
          </a>
          <span aria-hidden="true" className="footer-divider">
            •
          </span>
          <Link to="/data" className="footer-link" aria-label="Go to Orbit Playground">
            Playground
          </Link>
        </div>
      </div>
    </footer>
  );
}
