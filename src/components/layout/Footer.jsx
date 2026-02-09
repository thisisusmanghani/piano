import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="footer-grid">
                <div className="footer-brand">
                    <a href="#" className="logo">
                        <div className="logo-icon">♪</div>
                        StringMaster
                    </a>
                    <p>The modern way to create music. Professional tools, intuitive interface, and powerful sound engines right
                        in your browser.
                    </p>
                </div>
                <div>
                    <h4 className="footer-title">Product</h4>
                    <ul className="footer-links">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                        <li><a href="#">Song Library</a></li>
                        <li><a href="#">Mobile App</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="footer-title">Company</h4>
                    <ul className="footer-links">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="footer-title">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <span>© 2026 StringMaster. All rights reserved.</span>
                <span>Developed by <a href="https://www.uzairnaseer.com" target="_blank" rel="nofollow noopener">Uzair
                    Naseer</a></span>
            </div>
        </footer>
    );
};

export default Footer;
