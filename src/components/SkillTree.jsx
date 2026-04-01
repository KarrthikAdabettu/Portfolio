import React from 'react';

const SkillTree = () => {
    return (
        <section className="skills-section nav-section" id="skills">
            <div className="kanji-watermark">参</div>
            <div className="glass-panel large-panel reveal-on-scroll delay-1" data-speed="1.08">
                <div className="panel-header jp-font">
                    <div className="header-prefix pixel-font highlight-pink">参</div>
                    <div className="header-glitch">
                        <span className="dot highlight-pink"></span> スキルツリー // SKILL_TREE.exe
                    </div>
                </div>

                <div className="skills-container">
                    <div className="skill-category">
                        <h4 className="category-title">
                            Offensive <span className="highlight-pink pixel-font">Arts</span>
                        </h4>

                        <div className="skill-row">
                            <div className="skill-info">
                                <span className="skill-name">Penetration Testing</span>
                                <span className="skill-level pixel-font">LV 85</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill pink-fill" data-width="85%"></div>
                            </div>
                        </div>

                        <div className="skill-row">
                            <div className="skill-info">
                                <span className="skill-name">Reverse Engineering</span>
                                <span className="skill-level pixel-font">LV 70</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill pink-fill" data-width="70%"></div>
                            </div>
                        </div>
                    </div>

                    <div className="skill-category focus-right">
                        <h4 className="category-title text-right" style={{ textAlign: 'right' }}>
                            Defensive <span className="highlight-cyan pixel-font">Protocols</span>
                        </h4>

                        <div className="skill-row mt-4" style={{ marginTop: '2rem' }}>
                            <div className="skill-info">
                                <span className="skill-level pixel-font" style={{ textAlign: 'left' }}>LV 90</span>
                                <span className="skill-name" style={{ textAlign: 'right' }}>Network Security</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill cyan-fill" data-width="90%" style={{ float: 'right' }}></div>
                            </div>
                        </div>

                        <div className="skill-row" style={{ marginTop: '4rem' }}>
                            <div className="skill-info">
                                <span className="skill-level pixel-font" style={{ textAlign: 'left' }}>LV 75</span>
                                <span className="skill-name" style={{ textAlign: 'right' }}>Cryptography</span>
                            </div>
                            <div className="skill-bar">
                                <div className="skill-fill cyan-fill" data-width="75%" style={{ float: 'right' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillTree;
