import React from 'react';
import { useScrollReveal } from '../utils/ScrollReveal';
import './Skills.css';

const Skills = () => {
    useScrollReveal();

    const skillCategories = [
        {
            title: "Security",
            color: "var(--neon-blue)",
            skills: ["Wireshark", "Splunk", "Burp Suite", "Nmap", "Metasploit", "Nessus"]
        },
        {
            title: "Programming",
            color: "var(--neon-pink)",
            skills: ["Python", "Go", "Bash", "PowerShell", "JavaScript", "C++"]
        },
        {
            title: "Tools",
            color: "var(--terminal-green)",
            skills: ["Docker", "Git", "Terraform", "Ansible", "Jenkins", "Sysinternals"]
        },
        {
            title: "Platforms",
            color: "var(--neon-purple)",
            skills: ["AWS", "Azure", "Linux", "Kubernetes", "Active Directory", "Windows Server"]
        }
    ];

    return (
        <section className="skills-section" id="skills">
            <h2 className="section-title reveal">Core <span className="highlight-cyan" style={{color: 'var(--neon-blue)'}}>Competencies</span></h2>
            
            <div className="skills-grid">
                {skillCategories.map((category, idx) => (
                    <div 
                        key={idx} 
                        className={`skill-category reveal glass-panel`}
                        style={{ '--category-color': category.color, transitionDelay: `${idx * 0.15}s` }}
                    >
                        <h3 className="category-title">{category.title}</h3>
                        <div className="skills-list">
                            {category.skills.map((skill, sIdx) => (
                                <div key={sIdx} className="skill-item">
                                    <span className="skill-bracket">[</span>
                                    <span className="skill-name">{skill}</span>
                                    <span className="skill-bracket">]</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
