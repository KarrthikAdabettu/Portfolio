import React, { useEffect, useState, useRef } from 'react';
import anime from "animejs";
import Stack from './Stack';
import Lantern from './Lantern';
import './Hero.css';

const Hero = () => {
    const titleText = "Karrthik Adabettu";
    const heroContentRef = useRef(null);

    useEffect(() => {
        const letters = document.querySelectorAll('.hero-letter');
        if (letters.length === 0) return;
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        // Timeline Orchestration for Hero
        const tl = anime.timeline({
            easing: 'easeOutExpo'
        });

        // 0. Katakana Stagger
        tl.add({
            targets: '.katakana-letter',
            translateY: [20, 0],
            opacity: [0, 0.9],
            textShadow: '0 0 10px rgba(0, 245, 212, 0.5)',
            duration: 800,
            delay: anime.stagger(50)
        })
        // 1. Initial Stagger of Letters
        .add({
            targets: letters,
            translateY: [60, 0],
            opacity: [0, 1],
            textShadow: [
                '0 0 0px transparent', 
                '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #f72585, 0 0 40px #f72585, 0 0 80px rgba(247, 37, 133, 0.6)'
            ],
            duration: 1800, 
            delay: anime.stagger(100) 
        }, '-=200')
        // 2. Glitch Jitter on all letters right as they finish
        .add({
            targets: letters,
            translateX: () => anime.random(-6, 6),
            skewX: () => anime.random(-10, 10),
            duration: 150,
            direction: 'alternate',
            loop: 2,
            easing: 'steps(2)'
        })
        // 3. Reveal Subtitle Wrapper
        .add({
            targets: subtitle,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutQuart'
        }, '-=600');

    }, []);    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <section className="hero-section">
            <div 
                className="hero-parallax-bg"
            />

            <div 
                className="sakura-branch branch-top-left"
            />
            
            <div 
                className="sakura-branch branch-top-right"
            />

            {/* Parallax Lanterns - now stationary */}
            <div className="lanterns-container">
                <div className="lantern lantern-left" style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
                    <Lantern kanji="光" style={{ top: '-20px', left: 0 }} />
                </div>
                <div className="lantern lantern-right" style={{ background: 'transparent', boxShadow: 'none', border: 'none' }}>
                    <Lantern kanji="道" style={{ top: '-20px', left: 0 }} swingDelay="1s" />
                </div>
                
                {/* Additional large decorative lanterns on the edges */}
                <Lantern kanji="電" style={{ top: '20vh', left: '10vw', transform: 'scale(1.5)', zIndex: 1, opacity: 0.5 }} swingDelay="2s" />
                <Lantern kanji="網" style={{ top: '60vh', right: '12vw', transform: 'scale(1.2)', zIndex: 1, opacity: 0.6 }} swingDelay="3s" />
            </div>

            <div 
                className="hero-content"
                ref={heroContentRef}
            >
                <div className="hero-katakana">
                    {"カルティック・アダベットゥ".split('').map((char, index) => (
                        <span key={index} className="katakana-letter" style={{ opacity: 0 }}>{char}</span>
                    ))}
                </div>
                <h1 className="hero-name cyber-text-pink">
                    {titleText.split('').map((char, index) => (
                        <span 
                            key={index} 
                            className="hero-letter"
                            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                
                <div className="hero-subtitle">
                    <span className="typing-text">System.Cybersecurity_Specialist()</span>
                    <div className="subtitle-brackets">
                        <span className="bracket-left">[</span>
                        <span className="subtitle-roles">SOC | GRC | Threat Detection</span>
                        <span className="bracket-right">]</span>
                    </div>
                    <div className="cyber-label subtitle-kanji">未来をハックする</div>
                </div>
            </div>

            <div className="scroll-indicator" onClick={handleScroll}>
                <span className="scroll-text">SYSTEM_SCROLL</span>
                <div className="mouse-line"></div>
            </div>

            <div className="hero-stack-container">
                <Stack
                    randomRotation={true}
                    sensitivity={200}
                    sendToBackOnClick={true}
                    cards={[
                        <img src="https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" alt="card-1" className="card-image" />,
                        <img src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" alt="card-2" className="card-image" />,
                        <img src="https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" alt="card-3" className="card-image" />,
                        <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" alt="card-4" className="card-image" />
                    ]}
                    autoplay={false}
                    pauseOnHover={false}
                />
            </div>
        </section>
    );
};

export default Hero;
