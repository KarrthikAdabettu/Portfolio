import React, { useEffect, useState } from 'react';
import anime from "animejs";
import './IntroSequence.css';

const IntroSequence = ({ onComplete }) => {
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        // Generate particles dynamically
        const container = document.querySelector('.intro-particles');
        if (!container) return;
        const particleCount = 60;
        
        for (let i = 0; i < particleCount; i++) {
            const el = document.createElement('div');
            el.classList.add('intro-particle');
            // Randomly assign pink or cyan
            if (Math.random() > 0.5) el.classList.add('cyan');
            
            // Start scattered around the edges
            const startAngle = Math.random() * Math.PI * 2;
            const startRadius = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
            
            const startX = Math.cos(startAngle) * startRadius;
            const startY = Math.sin(startAngle) * startRadius;
            
            el.style.transform = `translate(${startX}px, ${startY}px)`;
            container.appendChild(el);
        }

        const particles = document.querySelectorAll('.intro-particle');
        if (particles.length === 0) return;
        const flash = document.querySelector('.intro-flash');
        if (!flash) return;

        const tl = anime.timeline({
            easing: 'easeOutExpo',
        });

        // Step 1: Particles converge to center
        tl.add({
            targets: particles,
            translateX: 0,
            translateY: 0,
            scale: [0, 1.5],
            opacity: [0, 1],
            duration: 1500,
            delay: anime.stagger(10, {from: 'center'}),
            easing: 'cubicBezier(0.2, 0.8, 0.2, 1)'
        })
        // Step 2: Brief pause at center (flash)
        .add({
            targets: flash,
            opacity: [0, 1, 0],
            duration: 400,
            easing: 'linear'
        }, '-=400')
        // Step 3: Particles explosively disperse
        .add({
            targets: particles,
            translateX: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
            translateY: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
            scale: 0,
            opacity: 0,
            duration: 1200,
            easing: 'easeInExpo',
            complete: () => {
                setIsDone(true);
                if (onComplete) onComplete();
            }
        });

    }, [onComplete]);

    if (isDone) return null;

    return (
        <div className="intro-sequence-container">
            <div className="intro-flash"></div>
            <div className="intro-particles"></div>
        </div>
    );
};

export default IntroSequence;
