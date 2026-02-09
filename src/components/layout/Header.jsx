import React, { useState } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav>
            <div className="nav-container">
                <a href="#" className="logo">
                    <div className="logo-icon">♪</div>
                    StringMaster
                </a>
                <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#pricing">Pricing</a></li>
                    <li><a href="#instructors">Instructors</a></li>
                    <li><a href="#testimonials">Reviews</a></li>
                </ul>
                <a href="#pricing" className={`nav-cta ${isMobileMenuOpen ? 'active' : ''}`}><span>Start Dummy Trial</span></a>

                {/* Mobile Menu Button - Kept for functionality relevance */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            </div>
        </nav>
    );
};

export default Header;
