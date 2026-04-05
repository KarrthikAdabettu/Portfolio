import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Color from 'color-bits';
import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

/* ───────────── Color helpers (ported from flickering-footer) ───────────── */
const getRGBA = (cssColor, fallback = 'rgba(180,180,180,1)') => {
    if (typeof window === 'undefined' || !cssColor) return fallback;
    try {
        if (typeof cssColor === 'string' && cssColor.startsWith('var(')) {
            const el = document.createElement('div');
            el.style.color = cssColor;
            document.body.appendChild(el);
            const computed = window.getComputedStyle(el).color;
            document.body.removeChild(el);
            return Color.formatRGBA(Color.parse(computed));
        }
        return Color.formatRGBA(Color.parse(cssColor));
    } catch {
        return fallback;
    }
};

const colorWithOpacity = (color, opacity) => {
    if (!color.startsWith('rgb')) return color;
    try {
        return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
    } catch {
        return color;
    }
};

/* ───────────────────────── FlickeringGrid canvas ───────────────────────── */
const FlickeringGrid = ({
    squareSize = 3,
    gridGap = 3,
    flickerChance = 0.1,
    color = '#00f5d4',
    maxOpacity = 0.18,
    text = '',
    fontSize = 90,
    fontWeight = 700,
    className = '',
    width,
    height,
    ...rest
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const memoizedColor = useMemo(() => getRGBA(color), [color]);

    const drawGrid = useCallback((ctx, w, h, cols, rows, squares, dpr) => {
        ctx.clearRect(0, 0, w, h);

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = w;
        maskCanvas.height = h;
        const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true });
        if (!maskCtx) return;

        if (text) {
            maskCtx.save();
            maskCtx.scale(dpr, dpr);
            maskCtx.fillStyle = 'white';
            maskCtx.font = `${fontWeight} ${fontSize}px "Rajdhani", "Inter", sans-serif`;
            maskCtx.textAlign = 'center';
            maskCtx.textBaseline = 'middle';
            maskCtx.fillText(text, w / (2 * dpr), h / (2 * dpr));
            maskCtx.restore();
        }

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * (squareSize + gridGap) * dpr;
                const y = j * (squareSize + gridGap) * dpr;
                const sw = squareSize * dpr;
                const sh = squareSize * dpr;

                const maskData = maskCtx.getImageData(x, y, sw, sh).data;
                const hasText = maskData.some((v, idx) => idx % 4 === 0 && v > 0);

                const opacity = squares[i * rows + j];
                const finalOpacity = hasText ? Math.min(1, opacity * 3 + 0.5) : opacity;

                ctx.fillStyle = colorWithOpacity(memoizedColor, finalOpacity);
                ctx.fillRect(x, y, sw, sh);
            }
        }
    }, [memoizedColor, squareSize, gridGap, text, fontSize, fontWeight]);

    const setupCanvas = useCallback((canvas, w, h) => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        const cols = Math.ceil(w / (squareSize + gridGap));
        const rows = Math.ceil(h / (squareSize + gridGap));
        const squares = new Float32Array(cols * rows);
        for (let i = 0; i < squares.length; i++) squares[i] = Math.random() * maxOpacity;
        return { cols, rows, squares, dpr };
    }, [squareSize, gridGap, maxOpacity]);

    const updateSquares = useCallback((squares, dt) => {
        for (let i = 0; i < squares.length; i++) {
            if (Math.random() < flickerChance * dt) {
                squares[i] = Math.random() * maxOpacity;
            }
        }
    }, [flickerChance, maxOpacity]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId;
        let gridParams;

        const updateSize = () => {
            const nw = width || container.clientWidth;
            const nh = height || container.clientHeight;
            setCanvasSize({ width: nw, height: nh });
            gridParams = setupCanvas(canvas, nw, nh);
        };

        updateSize();

        let lastTime = 0;
        const animate = (time) => {
            if (!isInView) return;
            const dt = (time - lastTime) / 1000;
            lastTime = time;
            updateSquares(gridParams.squares, dt);
            drawGrid(ctx, canvas.width, canvas.height, gridParams.cols, gridParams.rows, gridParams.squares, gridParams.dpr);
            animId = requestAnimationFrame(animate);
        };

        const ro = new ResizeObserver(updateSize);
        ro.observe(container);

        const io = new IntersectionObserver(([e]) => setIsInView(e.isIntersecting), { threshold: 0 });
        io.observe(canvas);

        if (isInView) animId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            io.disconnect();
        };
    }, [setupCanvas, updateSquares, drawGrid, width, height, isInView]);

    return (
        <div ref={containerRef} className={`flickering-grid-wrapper ${className}`} {...rest}>
            <canvas ref={canvasRef} className="flickering-grid-canvas"
                style={{ width: canvasSize.width, height: canvasSize.height }} />
        </div>
    );
};

/* ─────────────────────────── Portfolio Footer ──────────────────────────── */
const portfolioLinks = [
    {
        title: 'Navigate',
        links: [
            { label: 'Home',       id: 'home' },
            { label: 'Terminal',   id: 'terminal' },
            { label: 'Experience', id: 'experience' },
            { label: 'Projects',   id: 'projects' },
            { label: 'Contact',    id: 'contact' },
        ],
    },
    {
        title: 'Connect',
        links: [
            { label: 'GitHub',    href: 'https://github.com/karrthik' },
            { label: 'LinkedIn',  href: 'https://linkedin.com/in/karrthik' },
        ],
    },
];

const Footer = () => {
    const handleScrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="cyber-footer" id="footer">
            {/* Neon divider */}
            <div className="footer-divider" />

            {/* Main content row */}
            <div className="footer-body">
                {/* Left: brand block */}
                <div className="footer-brand">
                    <div className="footer-logo-row">
                        <span className="footer-logo-k">K</span>
                        <span className="footer-logo-dot">.</span>
                        <span className="footer-logo-name">Karrthik Adabettu</span>
                    </div>
                    <p className="footer-tagline">
                        SOC&nbsp;|&nbsp;GRC&nbsp;|&nbsp;Threat Detection &amp; Response
                    </p>
                    <div className="footer-socials">
                        <a href="https://github.com/karrthik" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="GitHub">
                            <Github size={18} strokeWidth={1.5} />
                        </a>
                        <a href="https://linkedin.com/in/karrthik" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                            <Linkedin size={18} strokeWidth={1.5} />
                        </a>
                        <a href="mailto:karrthik@example.com" className="footer-social-icon" aria-label="Email">
                            <Mail size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>

                {/* Right: link columns */}
                <div className="footer-links-grid">
                    {portfolioLinks.map((col) => (
                        <ul key={col.title} className="footer-link-col">
                            <li className="footer-col-title">{col.title}</li>
                            {col.links.map((link) => (
                                <li key={link.label} className="footer-link-item">
                                    {link.id ? (
                                        <button className="footer-link-btn" onClick={() => handleScrollTo(link.id)}>
                                            {link.label}
                                        </button>
                                    ) : (
                                        <a href={link.href} target="_blank" rel="noreferrer" className="footer-link-btn">
                                            {link.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>

            {/* Flickering grid banner */}
            <div className="footer-grid-wrap">
                {/* fade from transparent at top to bg-dark at bottom */}
                <div className="footer-grid-fade" />
                <FlickeringGrid
                    text="KARRTHIK ADABETTU"
                    fontSize={72}
                    fontWeight={800}
                    color="var(--neon-cyan)"
                    maxOpacity={0.22}
                    flickerChance={0.08}
                    squareSize={2}
                    gridGap={3}
                    className="footer-flickering-grid"
                />
            </div>

            {/* Copyright bar */}
            <div className="footer-copyright">
                <span>© {new Date().getFullYear()} Karrthik Adabettu. All rights reserved.</span>
                <span className="footer-copyright-sep">·</span>
                <span className="footer-mono">SYSTEM.STATUS: ONLINE</span>
            </div>
        </footer>
    );
};

export default Footer;
