import React from 'react';
import './Footer.css';

const Footer = () => {

    return (
        <footer className="cyber-footer">
            <div className="neon-divider"></div>
            <div className="footer-content glass-panel">
                
                <div className="footer-socials">
                    <a href="https://github.com/karrthik" target="_blank" rel="noreferrer" className="social-icon">GitHub</a>
                    <span className="separator">||</span>
                    <a href="https://linkedin.com/in/karrthik" target="_blank" rel="noreferrer" className="social-icon">LinkedIn</a>
                </div>
                
                <div className="footer-copyright">
                    <p className="cyber-text-dim">SYSTEM.COPYRIGHT © {new Date().getFullYear()} Karrthik Adabettu.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
