import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Terminal, Briefcase, FolderKanban, Mail } from 'lucide-react';
import anime from 'animejs';
import './Navbar.css';

const navItems = [
    { icon: Home,          label: 'Home',       id: 'home',       kanji: 'ホーム' },
    { icon: Terminal,      label: 'Terminal',   id: 'terminal',   kanji: '端末' },
    { icon: Briefcase,     label: 'Experience', id: 'experience', kanji: '経験' },
    { icon: FolderKanban,  label: 'Projects',   id: 'projects',   kanji: '計画' },
    { icon: Mail,          label: 'Contact',    id: 'contact',    kanji: '連絡' },
];

const floatingAnimation = {
    initial: { y: 0 },
    animate: {
        y: [-3, 3, -3],
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
    },
};

const Navbar = () => {
    const dockRef = useRef(null);
    const navigate  = useNavigate();
    const location  = useLocation();

    // Fade-in orchestrated with IntroSequence (slides down from above)
    useEffect(() => {
        if (dockRef.current) {
            const el = dockRef.current;
            anime({
                targets: el,
                translateY: [-60, 0],
                opacity: [0, 1],
                duration: 1400,
                delay: 2600,
                easing: 'easeOutExpo',
                complete: () => { el.style.pointerEvents = 'auto'; },
            });
        }
    }, []);

    // Handle cross-page scroll
    useEffect(() => {
        if (location.pathname === '/' && location.state?.scrollTo) {
            setTimeout(() => {
                const el = document.getElementById(location.state.scrollTo);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    const handleScrollTo = (id) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav ref={dockRef} className="cyber-dock-nav" aria-label="Main navigation">
            <motion.div
                initial="initial"
                animate="animate"
                variants={floatingAnimation}
                className="cyber-dock"
            >
                {navItems.map(({ icon: Icon, label, id, kanji }) => (
                    <motion.button
                        key={id}
                        whileHover={{ scale: 1.15, y: -4 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleScrollTo(id)}
                        className="dock-item"
                        aria-label={label}
                    >
                        <Icon className="dock-icon" size={20} strokeWidth={1.6} />
                        <span className="dock-tooltip">
                            {label}
                            <span className="dock-kanji">{kanji}</span>
                        </span>
                    </motion.button>
                ))}
            </motion.div>
        </nav>
    );
};

export default Navbar;
