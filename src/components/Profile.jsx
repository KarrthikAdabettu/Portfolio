import React from 'react';

const Profile = () => {
    return (
        <section className="profile-section nav-section" id="profile">
            <div className="kanji-watermark">弐</div>
            <div className="glass-panel large-panel reveal-on-scroll" data-speed="1.15">
                <div className="panel-header jp-font">
                    <div className="header-prefix pixel-font">弐</div>
                    <div className="header-glitch">
                        <span className="dot blink"></span> キャラクタープロフィール // PROFILE.sys
                    </div>
                </div>

                <div className="profile-grid">
                    <div className="profile-avatar-container">
                        <div className="avatar-ring"></div>
                        <div className="avatar-placeholder">
                            <span className="avatar-text">AVATAR<br />// UPLOAD PHOTO</span>
                        </div>
                    </div>

                    <div className="profile-details">
                        <h3 className="system-heading highlight-cyan pixel-font">Karrthik Adabettu</h3>
                        <p className="profile-bio">
                            Passionate cybersecurity student specializing in offensive security, penetration testing,
                            and reverse engineering. Dedicated to exploring complex systems, finding vulnerabilities,
                            and contributing to a safer digital frontier.
                        </p>

                        <div className="stats-grid mt-4">
                            <div className="stat-box">
                                <span className="stat-label">LV</span>
                                <span className="stat-value highlight-cyan pixel-font">21</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">CLASS</span>
                                <span className="stat-value highlight-pink">Cyber Sec</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">FACTION</span>
                                <span className="stat-value text-white">Red Team</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label">STATUS</span>
                                <span className="stat-value highlight-cyan">Online</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
