import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import anime from "animejs";
import { useMagneticHover } from '../hooks/useMagneticHover';
import './Navbar.css';

const Navbar = () => {
    const navRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { name: "Home", id: "home", kanji: "ホーム" },
        { name: "Terminal", id: "terminal", kanji: "端末" },
        { name: "Experience", id: "experience", kanji: "経験" },
        { name: "Projects", id: "projects", kanji: "計画" },
        { name: "Contact", id: "contact", kanji: "連絡" }
    ];

    useEffect(() => {
        // Fade in on load (orchestrated closely with IntroSequence)
        if (navRef.current) {
            anime({
                targets: navRef.current,
                translateY: [-50, 0],
                opacity: [0, 1],
                duration: 1500,
                delay: 2500, // Waits for particle intro
                easing: 'easeOutExpo'
            });
        }

        // Scroll highlight listener
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            setTimeout(() => {
                const el = document.getElementById(location.state.scrollTo);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
                // Clear state
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    const handleScrollTo = (id) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav ref={navRef} className={`cyber-navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo" onClick={() => handleScrollTo('home')}>
                <span className="logo-j">K</span><span className="logo-glow">.</span>
            </div>

            <ul className="nav-links">
                {navItems.map((item, i) => (
                    <li key={i} className="nav-item">
                        <button 
                            className="nav-btn magnetic-text"
                            onClick={() => handleScrollTo(item.id)}
                            data-text={item.name}
                        >
                            {item.name} <span className="nav-kanji-subtitle" aria-hidden="true" style={{ fontSize: '0.65em', opacity: 0.6, marginLeft: '6px' }}>{item.kanji}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
