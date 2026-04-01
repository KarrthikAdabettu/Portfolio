import React, { useEffect, useState } from 'react';
import anime from "animejs";
import CanvasBackground from './CanvasBackground';
import Particles from './Particles';
import './Atmosphere.css';

const Atmosphere = () => {
    const [sakuraPetals, setSakuraPetals] = useState([]);
    const [dataFragments, setDataFragments] = useState([]);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Pre-generate static sakura petals
        const petals = Array.from({ length: 45 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 120}vw`, // wider start to allow diagonal tracking
            size: `${Math.random() * 0.7 + 0.3}vw`, 
            opacity: Math.random() * 0.4 + 0.15,
        }));
        setSakuraPetals(petals);

        // Pre-generate data fragments (hex, binary, bars)
        const fragments = Array.from({ length: 40 }).map((_, i) => {
            const types = ['01', '10', 'HEX', '■', '—', 'node'];
            return {
                id: i,
                type: types[Math.floor(Math.random() * types.length)],
                left: `${Math.random() * 100}vw`,
                top: `${Math.random() * 100}vh`,
                size: `${Math.random() * 0.8 + 0.5}rem`,
                opacity: Math.random() * 0.3 + 0.05
            };
        });
        setDataFragments(fragments);
    }, []);

    useEffect(() => {
        if (sakuraPetals.length === 0) return;
        const petalsEls = document.querySelectorAll('.sakura-petal');
        if (petalsEls.length === 0) return;
        const kanjiEls = document.querySelectorAll('.kanji');
        if (kanjiEls.length === 0) return;
        const fragmentEls = document.querySelectorAll('.data-fragment');
        if (fragmentEls.length === 0) return;

        // 1. Swirling Sakura Physics via Anime.js (Enhanced)
        anime({
            targets: petalsEls,
            translateX: () => [
                { value: `${anime.random(-15, -30)}vw`, duration: anime.random(5000, 8000), easing: 'easeInOutSine' },
                { value: `${anime.random(-30, -60)}vw`, duration: anime.random(5000, 8000), easing: 'easeInOutSine' }
            ],
            translateY: ['-10vh', '115vh'],
            rotateZ: () => [anime.random(0, 360), anime.random(720, 1440)],
            rotateX: () => [0, anime.random(360, 720)],
            rotateY: () => [0, anime.random(360, 720)],
            duration: () => anime.random(15000, 22000),
            delay: () => anime.random(0, 15000), 
            easing: 'linear',
            loop: true
        });

        // 2. Random Neon Kanji Electrical Flicker
        anime({
            targets: kanjiEls,
            opacity: [
                { value: () => anime.random(0.15, 0.4), duration: () => anime.random(20, 100) },
                { value: () => anime.random(0.01, 0.05), duration: () => anime.random(20, 100) },
                { value: () => anime.random(0.1, 0.2), duration: () => anime.random(20, 100) },
                { value: () => anime.random(0.05, 0.1), duration: () => anime.random(3000, 8000) } 
            ],
            easing: 'steps(1)',
            loop: true,
            delay: () => anime.random(0, 5000) 
        });

        // 3. Floating Data Fragments
        anime({
            targets: fragmentEls,
            translateY: () => [anime.random(-20, 20), anime.random(-100, -250)], // drift upwards
            translateX: () => [anime.random(-10, 10), anime.random(-30, 30)], // slight drift lateral
            opacity: [
                { value: 0, duration: 200 },
                { value: () => anime.random(0.1, 0.5), duration: 1500 },
                { value: 0, duration: 1500, delay: () => anime.random(4000, 15000) }
            ],
            duration: () => anime.random(20000, 35000),
            delay: () => anime.random(0, 20000),
            loop: true,
            easing: 'linear'
        });

        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sakuraPetals, dataFragments]);

    // Independent layer parallax depth scaling based purely on scroll
    const layerMid = `translateY(${scrollY * -0.1}px)`;

    return (
        <div className="atmosphere-container">
            {/* Deep Cyberpunk Night Sky (Base dark void) */}
            <div className="atmosphere-sky" />
            
            {/* ReactBits-style Interactive Particles */}
            <Particles
                particleColors={["#00f5d4", "#9d4edd", "#ff99c8"]}
                particleCount={250}
                particleSpread={10}
                speed={0.15}
                particleBaseSize={120}
                moveParticlesOnHover={true}
                particleHoverFactor={2}
                alphaParticles={true}
                disableRotation={false}
                pixelRatio={window.devicePixelRatio || 1}
            />

            {/* 
                HTML Canvas Cyberpunk Interactive Background 
                Replaces the static CSS grid and heavy WebGL with a living, reactive 2D canvas.
            */}
            <CanvasBackground />

            {/* Slow moving ambient fog (horizontal tracking for depth) */}
            <div className="ambient-fog layer-1" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
            <div className="ambient-fog layer-2" style={{ transform: `translateY(${scrollY * 0.08}px) scaleX(-1)` }} />
            
            {/* Expanded Neon Kanji Signage (Background layer) */}
            <div className="kanji-signs" style={{ transform: layerMid }}>
                <div className="kanji sign-1">電脳</div>
                <div className="kanji sign-2">東京</div>
                <div className="kanji sign-3">未来</div>
                <div className="kanji sign-4">サイバー</div>
                <div className="kanji sign-5">システム</div>
                {/* New thematic kanji */}
                <div className="kanji sign-6">電</div>
                <div className="kanji sign-7">光</div>
                <div className="kanji sign-8">網</div>
                <div className="kanji sign-9">闇</div>
            </div>

            {/* Faint Torii/Cityscape Silhouettes at horizon */}
            <div className="city-silhouettes" style={{ transform: layerMid }} />

            {/* Glowing Paper Lanterns in deep background */}
            <div className="bg-lanterns">
                <div className="bg-lantern bgl-1"><div className="bg-lantern-glow"></div></div>
                <div className="bg-lantern bgl-2"><div className="bg-lantern-glow"></div></div>
                <div className="bg-lantern bgl-3"><div className="bg-lantern-glow"></div></div>
            </div>

            {/* Subtle CSS Noise Texture for film grain */}
            <div className="atmosphere-noise" />

            {/* Cyberpunk Floating Data Fragments */}
            <div className="data-container">
                {dataFragments.map(frag => (
                    <div 
                        key={`frag-${frag.id}`} 
                        className={`data-fragment ${frag.type === 'node' ? 'wireframe-node' : ''}`}
                        style={{
                            left: frag.left,
                            top: frag.top,
                            fontSize: frag.size,
                            opacity: 0 // Anime JS handles true opacity
                        }}
                    >
                        {frag.type !== 'node' ? frag.type : ''}
                    </div>
                ))}
            </div>

            {/* Falling Sakura Petals controlled by AnimeJS */}
            <div className="sakura-container">
                {sakuraPetals.map(petal => (
                    <div 
                        key={`sakura-${petal.id}`}
                        className="sakura-petal"
                        style={{
                            left: petal.left,
                            width: petal.size,
                            height: petal.size,
                            opacity: petal.opacity
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Atmosphere;
