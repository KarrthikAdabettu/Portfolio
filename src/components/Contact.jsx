import React from 'react';
import { useScrollReveal } from '../utils/ScrollReveal';
import './Contact.css';

const Contact = () => {
    useScrollReveal();

    return (
        <section className="contact-section" id="contact">
            <h2 className="section-title reveal cyber-text">Initiate<span className="text-white">_Contact</span> <span className="section-kanji-subtitle" style={{ color: 'var(--neon-pink)', opacity: 0.7, fontSize: '0.7em', marginLeft: '12px' }}>連絡</span></h2>
            
            <div className="contact-card reveal glass-panel">
                <div className="contact-header">
                    <div className="status-dot"></div>
                    <span>SYSTEM.ONLINE</span>
                </div>
                
                <div className="contact-body">
                    <p className="contact-desc">Ready to collaborate or network? Secure channels are open.</p>
                    
                    <div className="contact-links">
                        <a href="https://linkedin.com/in/karrthik" target="_blank" rel="noreferrer" className="cyber-btn contact-btn">
                            <span className="btn-text">LinkedIn Network</span>
                            <span className="btn-glitch" aria-hidden>_LINKEDIN</span>
                        </a>
                        
                        <a href="https://github.com/karrthik" target="_blank" rel="noreferrer" className="cyber-btn contact-btn">
                            <span className="btn-text">GitHub Repositories</span>
                            <span className="btn-glitch" aria-hidden>_GITHUB</span>
                        </a>
                    </div>
                    
                    <a href="mailto:karrthik@example.com" className="cyber-btn connect-btn-main mt-4">
                        <span className="btn-text">SEND MESSAGE</span>
                        <span className="btn-glitch" aria-hidden>_CONNECT</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
