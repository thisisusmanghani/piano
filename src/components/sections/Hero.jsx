import React from 'react';
import Guitar from '../tools/Guitar';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span></span> Cloud Studio V2
          </div>
          <h1>Your <span className="highlight">Digital Studio</span>.<br />Anywhere, Anytime.</h1>
          <p className="hero-description">
            The ultimate browser-based production suite for artists.
            Sketch ideas, record demos, and master your sound using our suite of professional instruments.
          </p>
          <div className="hero-buttons">
            <a href="#digital-studio" className="btn-primary">
              Open Studio →
            </a>
            <a href="#tools" className="btn-secondary">
              Explore Tools
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">5k+</div>
              <div className="stat-label">Users/Artists</div>
            </div>
            <div className="stat">
              <div className="stat-value">12+</div>
              <div className="stat-label">Instruments</div>
            </div>
            <div className="stat">
              <div className="stat-value">Studio</div>
              <div className="stat-label">Grade Audio</div>
            </div>
          </div>
        </div>

        {/* Embedded Guitar Component */}
        <Guitar />

      </div>
    </section>
  );
};

export default Hero;
