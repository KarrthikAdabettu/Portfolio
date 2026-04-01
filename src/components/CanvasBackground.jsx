import React, { useRef, useEffect } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true }); // Need true alpha to see ParticlesBackground
        let animationFrameId;

        // Configuration
        const config = {
            gridSpacing: 60,
            gridSpeed: 0.3,
            gridGlow: '#9d4edd', // Subtle Purple Glow mapped to grid
            gridGlowIntensity: 12,
            gridLineColor: 'rgba(0, 245, 212, 0.15)', // Neon Cyan
            
            nodeCount: 50,
            nodeColor: '#00f5d4', // Neon Cyan nodes
            nodeGlowIntensity: 15,
            connectionDistance: 150,
            
            mouseRadius: 200, // Interaction radius
            mouseRippleForce: 25,
        };

        let width = window.innerWidth;
        let height = window.innerHeight;

        let timeOffset = 0;

        // Store precise pixel mouse position
        const mouse = { x: -1000, y: -1000 };

        // State objects
        const nodes = [];
        const initEntities = () => {
            nodes.length = 0;

            for (let i = 0; i < config.nodeCount; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    baseX: Math.random() * width,
                    baseY: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 2 + 1.5
                });
            }
        };

        // Resize handler
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initEntities(); // Re-scatter elements on resize
        };

        // Mouse tracker
        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const drawGrid = (mouseX, mouseY) => {
            ctx.save();
            ctx.strokeStyle = config.gridLineColor; // Subtle Cyan grid lines
            ctx.lineWidth = 1;
            ctx.shadowBlur = config.gridGlowIntensity;
            ctx.shadowColor = config.gridGlow; // Purple glow override

            const xOffset = timeOffset % config.gridSpacing;
            const yOffset = (timeOffset * 0.5) % config.gridSpacing;

            ctx.beginPath();
            
            // Vertical lines
            for (let x = -config.gridSpacing + xOffset; x < width + config.gridSpacing; x += config.gridSpacing) {
                for (let y = 0; y < height; y += 15) { 
                     let drawX = x;                     
                     const dx = drawX - mouseX;
                     const dy = y - mouseY;
                     const dist = Math.sqrt(dx * dx + dy * dy);
                     
                     if (dist < config.mouseRadius) {
                         const force = (config.mouseRadius - dist) / config.mouseRadius;
                         drawX += (dx / dist) * force * config.mouseRippleForce;
                     }
                     
                     if (y === 0) ctx.moveTo(drawX, y);
                     else ctx.lineTo(drawX, y);
                }
            }

            // Horizontal lines
            for (let y = -config.gridSpacing + yOffset; y < height + config.gridSpacing; y += config.gridSpacing) {
                for (let x = 0; x < width; x += 15) {
                     let drawY = y;
                     const dx = x - mouseX;
                     const dy = drawY - mouseY;
                     const dist = Math.sqrt(dx * dx + dy * dy);
                     
                     if (dist < config.mouseRadius) {
                         const force = (config.mouseRadius - dist) / config.mouseRadius;
                         drawY += (dy / dist) * force * config.mouseRippleForce;
                     }
                     
                     if (x === 0) ctx.moveTo(x, drawY);
                     else ctx.lineTo(x, drawY);
                }
            }
            
            ctx.stroke();
            ctx.restore();
        };

        const updateAndDrawNodes = (mouseX, mouseY) => {
            ctx.save();
            
            nodes.forEach(node => {
                // Ambient coordinate drift
                node.baseX += node.vx;
                node.baseY += node.vy;

                // Screen wrap for base positions
                if (node.baseX < 0) node.baseX = width;
                if (node.baseX > width) node.baseX = 0;
                if (node.baseY < 0) node.baseY = height;
                if (node.baseY > height) node.baseY = 0;

                let targetX = node.baseX;
                let targetY = node.baseY;
                let targetGlow = config.nodeGlowIntensity;

                const dx = node.baseX - mouseX;
                const dy = node.baseY - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.mouseRadius) {
                    const force = (config.mouseRadius - dist) / config.mouseRadius;
                    // Expand outward from cursor significantly
                    targetX += (dx / dist) * force * config.mouseRippleForce * 3.0;
                    targetY += (dy / dist) * force * config.mouseRippleForce * 3.0;
                    // Increase glow locally
                    targetGlow = config.nodeGlowIntensity + (force * 30);
                }

                // Smooth interpolation to target position and glow
                node.x += (targetX - node.x) * 0.08;
                node.y += (targetY - node.y) * 0.08;
                node.glow = (node.glow || config.nodeGlowIntensity) + (targetGlow - (node.glow || config.nodeGlowIntensity)) * 0.1;
            });

            // Draw network connections
            ctx.lineWidth = 0.6;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];
                    const dx = n1.x - n2.x;
                    const dy = n1.y - n2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < config.connectionDistance) {
                        const opacity = 1 - (dist / config.connectionDistance);
                        ctx.strokeStyle = `rgba(157, 78, 221, ${opacity * 0.35})`; // Purple web connection
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // Draw node anchor points
            nodes.forEach(node => {
                ctx.fillStyle = config.nodeColor;
                ctx.shadowBlur = node.glow;
                ctx.shadowColor = config.nodeColor;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
        };

        const render = () => {
            // Clear entire canvas instead of fillRect to allow ParticlesBackground to show through
            ctx.clearRect(0, 0, width, height);

            timeOffset += config.gridSpeed;

            drawGrid(mouse.x, mouse.y);
            updateAndDrawNodes(mouse.x, mouse.y);

            animationFrameId = requestAnimationFrame(render);
        };

        // Boot
        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []); // Empty dependency array ensures we only set up the canvas once

    return (
        <canvas 
            ref={canvasRef} 
            className="canvas-background-layer"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, 
                pointerEvents: 'none', 
            }} 
        />
    );
};

export default CanvasBackground;
