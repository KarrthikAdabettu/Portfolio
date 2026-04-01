import { useState, useEffect } from 'react';

// Reusable hook to apply localized cursor magnetism and 3D tilts to UI panels
export const useMagneticHover = (ref, options = {}) => {
    const {
        attraction = 0.3, // How strongly it pulls toward cursor (0 to 1)
        tiltMax = 10,     // Max degrees of 3D rotation
        perspective = 1000 // Depth perspective
    } = options;

    const [tiltStyles, setTiltStyles] = useState({});

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let mouseX = 0;
        let mouseY = 0;
        let rafId;

        const handleMouseMove = (e) => {
            const rect = el.getBoundingClientRect();
            // Calculate cursor position relative to the center of the element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mouseX = e.clientX - centerX;
            mouseY = e.clientY - centerY;

            // Apply magnetic translation (pull towards cursor)
            const translateX = mouseX * attraction;
            const translateY = mouseY * attraction;

            // Apply 3D tilt (rotate away from cursor based on quadrant)
            const rotateX = (mouseY / (rect.height / 2)) * -tiltMax;
            const rotateY = (mouseX / (rect.width / 2)) * tiltMax;

            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setTiltStyles({
                    transform: `perspective(${perspective}px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                    transition: 'transform 0.1s ease-out' // fast response during hover
                });
            });
        };

        const handleMouseLeave = () => {
            cancelAnimationFrame(rafId);
            // Snap back to zero with a satisfying easing
            setTiltStyles({
                transform: `perspective(${perspective}px) translate3d(0px, 0px, 0) rotateX(0deg) rotateY(0deg)`,
                transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' 
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, [ref, attraction, tiltMax, perspective]);

    return tiltStyles;
};
