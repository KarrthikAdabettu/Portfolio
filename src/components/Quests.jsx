import React from 'react';

const Quests = () => {
    return (
        <section className="quests-section nav-section" id="quests">
            <div className="kanji-watermark">四</div>
            <div className="glass-panel large-panel full-width reveal-on-scroll" data-speed="1.12">
                <div className="panel-header jp-font">
                    <div className="header-prefix pixel-font text-white">四</div>
                    <div className="header-glitch">
                        <span className="dot"></span> 完了した任務 // COMPLETED_QUESTS.log
                    </div>
                </div>

                <div className="quest-grid">
                    {/* Quest Card 1 */}
                    <div className="quest-card hover-tilt">
                        <div className="quest-image-placeholder">
                            <span className="quest-icon">🏴‍☠️</span>
                        </div>
                        <div className="quest-content">
                            <div className="quest-meta">
                                <span className="quest-rank highlight-pink pixel-font">Rank A</span>
                                <span className="quest-date pixel-font">2025</span>
                            </div>
                            <h3 className="quest-title pixel-font">CTF Takedown</h3>
                            <p className="quest-desc">
                                Secured first blood on multiple advanced reverse engineering challenges in a recent global CTF event.
                            </p>
                            <div className="quest-tags">
                                <span className="tag">RevEng</span>
                                <span className="tag">Pwn</span>
                            </div>
                        </div>
                    </div>

                    {/* Quest Card 2 */}
                    <div className="quest-card hover-tilt delay-1">
                        <div className="quest-image-placeholder">
                            <span className="quest-icon">🕸️</span>
                        </div>
                        <div className="quest-content">
                            <div className="quest-meta">
                                <span className="quest-rank highlight-cyan pixel-font">Rank S</span>
                                <span className="quest-date pixel-font">2024</span>
                            </div>
                            <h3 className="quest-title pixel-font">Web Exploit Nexus</h3>
                            <p className="quest-desc">
                                Discovered and responsibly disclosed critical vulnerabilities in a popular open-source web application.
                            </p>
                            <div className="quest-tags">
                                <span className="tag">Web</span>
                                <span className="tag">BugBounty</span>
                            </div>
                        </div>
                    </div>

                    {/* Quest Card 3 */}
                    <div className="quest-card hover-tilt delay-2">
                        <div className="quest-image-placeholder">
                            <span className="quest-icon">📡</span>
                        </div>
                        <div className="quest-content">
                            <div className="quest-meta">
                                <span className="quest-rank text-white pixel-font">Rank B</span>
                                <span className="quest-date pixel-font">2023</span>
                            </div>
                            <h3 className="quest-title pixel-font">Network Infiltration Lab</h3>
                            <p className="quest-desc">
                                Built a comprehensive automated lab environment for simulating realistic active directory attack paths.
                            </p>
                            <div className="quest-tags">
                                <span className="tag">Infra</span>
                                <span className="tag">AD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Quests;
