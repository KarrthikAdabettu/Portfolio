import React from 'react';
import { useScrollReveal } from '../utils/ScrollReveal';
import './Experience.css';

const Experience = () => {
    useScrollReveal();

    const experiences = [
        {
            duration: "Jun 2025 \u2013 Jul 2025",
            role: "Cyber Security Intern",
            company: "Techvanto",
            bullets: [
                "Developed SmartNetIDS, a machine learning-based Network Intrusion Detection System.",
                "Conducted security assessments and penetration testing using Nmap, Wireshark, Metasploit.",
                "Completed 60+ TryHackMe labs applying techniques to real-world attacks."
            ]
        },
        {
            duration: "Jun 2025 \u2013 Jun 2025",
            role: "Cyber Security Intern",
            company: "Redynox-TheRedUsers",
            bullets: [
                "Exploited web application vulnerabilities (SQLi, CSRF, Clickjacking) using OWASP ZAP.",
                "Performed manual penetration testing to extract data and analyze anomalies.",
                "Strengthened expertise in OWASP Top 10 risks."
            ]
        }
    ];

    return (
        <section className="experience-section reveal" id="experience">
            <h2 className="section-title">
                Experience <span className="section-kanji-subtitle" style={{ color: 'var(--neon-pink)', opacity: 0.7, fontSize: '0.7em', marginLeft: '12px' }}>経験</span>
            </h2>
            
            <div className="timeline-container">
                {experiences.map((exp, idx) => (
                    <div 
                        key={idx} 
                        className="timeline-item reveal"
                        style={{ transitionDelay: `${idx * 0.15}s` }}
                    >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                            <div className="timeline-date">{exp.duration}</div>
                            <h3 className="timeline-role">{exp.role}</h3>
                            <div className="timeline-company">{exp.company}</div>
                            <ul className="timeline-bullets">
                                {exp.bullets.map((bullet, bIdx) => (
                                    <li key={bIdx}>
                                        <span className="bullet-arrow">→</span> {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
