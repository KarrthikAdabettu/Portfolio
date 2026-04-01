import React, { useEffect, useRef, useState } from 'react';
import './CursorGlow.css';

const CursorGlow = () => {
    const cursorRef = useRef(null);
    const trailContainerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    // Performance limiting refs
    const lastTrailTime = useRef(0);

    useEffect(() => {
        const updatePosition = (e) => {
            if (!isVisible) setIsVisible(true);
            
            // Core Glow Spotlight following
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX - 100}px, ${e.clientY - 100}px)`;
            }

            // High-End Particle Trail Deployment
            const now = performance.now();
            if (now - lastTrailTime.current > 40 && trailContainerRef.current) { // Throttle trail spawns
                lastTrailTime.current = now;
                
                const particle = document.createElement('div');
                particle.className = 'cursor-trail-particle';
                // Alternate colors for cyber feel
                particle.classList.add(Math.random() > 0.5 ? 'cyan' : 'pink');
                
                // Position exactly at cursor tip
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                
                trailContainerRef.current.appendChild(particle);
                
                // Self destruct after animation completes
                setTimeout(() => {
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 800);
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', updatePosition, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* The primary soft spotlight */}
            <div className="cursor-spotlight" ref={cursorRef} />
            {/* The container for trailing particles */}
            <div className="cursor-trails-container" ref={trailContainerRef} />
        </>
    );
};

export default CursorGlow;
