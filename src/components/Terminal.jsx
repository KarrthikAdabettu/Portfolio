import React from 'react';

const Terminal = () => {
    return (
        <section className="summon-section nav-section" id="contact">
            <div className="kanji-watermark">五</div>
            <div className="terminal-panel glass-panel reveal-on-scroll">
                {/* Cinematic Hoodie Character Background */}
                <div className="hoodie-silhouette-container" id="hoodie-container">
                    <div className="hoodie-image" id="hoodie-parallax"></div>
                    <div className="hoodie-mask-gradient"></div>
                </div>

                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="t-btn close"></span>
                        <span className="t-btn min"></span>
                        <span className="t-btn max"></span>
                    </div>
                    <span className="terminal-title">root@karrthik:~</span>
                </div>
                <div className="terminal-body jp-terminal">
                    <p className="command"><span className="prompt">root@karrthik:~#</span> ./summon_protocol.sh</p>
                    <p className="output blink-fast">System Initializing...</p>
                    <p className="output text-success">[ Access Granted ] Encryption Key Exchange Complete.</p>
                    <p className="output">Select Communication Vector:</p>

                    <div className="contact-links">
                        <a href="#" className="cyber-link">
                            <span className="link-bracket">[</span> <span className="link-text">GITHUB</span> <span className="link-bracket">]</span>
                        </a>
                        <a href="#" className="cyber-link">
                            <span className="link-bracket">[</span> <span className="link-text">LINKEDIN</span> <span className="link-bracket">]</span>
                        </a>
                        <a href="#" className="cyber-link">
                            <span className="link-bracket">[</span> <span className="link-text">EMAIL</span> <span className="link-bracket">]</span>
                        </a>
                    </div>
                    <p className="command mt-4"><span className="prompt">root@karrthik:~#</span> <span className="typing-cursor">_</span></p>
                </div>
            </div>
        </section>
    );
};

export default Terminal;
