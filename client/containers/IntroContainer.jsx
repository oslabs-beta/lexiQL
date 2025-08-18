import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/orbit-logo-black.png';

export default function IntroContainer() {
  return (
    <section id="hero" className="hero dotted-bg">
      <div className="hero__content">
        <img src={Logo} alt="Orbit" className="hero__logo" />
        <div className="hero__text">
          <h1 className="hero__title">Visualize your database instantly</h1>
          <p className="hero__subtitle">
            Auto-generate schema diagrams and GraphQL boilerplate directly from your PostgreSQL
            database.
          </p>
          <div className="hero__ctas">
            <Link to="/data" className="btn btn--primary">
              Use Sample Database
            </Link>
            <a href="https://github.com/oslabs-beta/Orbit" className="btn btn--ghost">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
