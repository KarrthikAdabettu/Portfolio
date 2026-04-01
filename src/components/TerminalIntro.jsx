import React, { useEffect, useRef } from 'react';
import anime from "animejs";
import { useMagneticHover } from '../hooks/useMagneticHover';
import './TerminalIntro.css';

const TerminalIntro = () => {
    const terminalRef = useRef(null);
    const containerRef = useRef(null);
    
    // Applying magnetic tilt only to the core workstation panel
    const magneticStyles = useMagneticHover(containerRef, {
        attraction: 0.05, // very subtle pull
        tiltMax: 4,      // slight 3D rotation
        perspective: 1500
    });

    const lines = [
        "[SYSTEM] Boot sequence initiated...",
        "[AUTH] Bypassing mainframe security protocols...",
        "[STATUS] Neural link established.",
        "> KARRTHIK_ADABETTU [ONLINE]",
        "> SPECIALTY: SOC | GRC | THREAT_HUNTING"
    ];

    useEffect(() => {
        if (!terminalRef.current) return;
        if (!containerRef.current) return;
        
        const targets = terminalRef.current.querySelectorAll('.term-letter');
        if (targets.length === 0) return;
        
        anime({
            targets: targets,
            opacity: [0, 1],
            duration: 10, 
            delay: anime.stagger(40, {start: 600}),
            easing: 'linear',
            update: function() {
                if (terminalRef.current) {
                    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
                }
            }
        });

    }, []);

    return (
        <section className="terminal-section" id="about">
            <div 
                className="terminal-container" 
                ref={containerRef}
                style={magneticStyles}
            >
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <div className="btn close magnetic-btn"></div>
                        <div className="btn minimize magnetic-btn"></div>
                        <div className="btn maximize magnetic-btn"></div>
                    </div>
                    <div className="terminal-title">~/cyber-deck/root <span style={{ marginLeft: '10px', color: 'var(--neon-pink)' }}>端末</span></div>
                </div>
                
                <div className="terminal-body" ref={terminalRef}>
                    {lines.map((line, lineIndex) => (
                        <div key={lineIndex} className="terminal-line">
                            {line.split('').map((char, charIndex) => (
                                <span 
                                    key={charIndex} 
                                    className="term-letter"
                                    style={{ opacity: 0 }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    ))}
                    <div className="terminal-line">
                        <span className="prompt-symbol">&gt;</span>
                        <span className="cursor-block blink"></span>
                    </div>
                </div>
            </div>
            
            <div className="cyber-label" style={{ position: 'absolute', bottom: '5vh', right: '5vw' }}>技術</div>
        </section>
    );
};

export default TerminalIntro;
