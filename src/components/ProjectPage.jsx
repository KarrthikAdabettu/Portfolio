import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectPage.css';

const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();

    // In a real app, this would be fetched from an API or a shared data file.
    const projectData = {
        "threat-intel-platform": {
            title: "Threat Intel Platform",
            category: "Threat Detection",
            description: "A comprehensive platform for correlating threat intelligence feeds with local SIEM alerts to trace adversarial motion across enterprise networks. Developed with a focus on real-time data ingestion and automated threat hunting workflows.",
            tech: ["Python", "STIX/TAXII", "React", "Elasticsearch"],
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            github: "https://github.com",
            demo: "#"
        },
        "automated-grc-auditor": {
            title: "Automated GRC Auditor",
            category: "Governance",
            description: "Automated compliance checking against CIS benchmarks across AWS and Azure cloud architectures. The tool continuously authenticates, scans, and auto-remediates IAM and configurations drift.",
            tech: ["Go", "AWS", "Azure", "Terraform"],
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            github: "https://github.com",
            demo: "#"
        },
        "soc-playbook-auto": {
            title: "SOC Playbook Auto",
            category: "Automation",
            description: "SOAR integration playbooks utilizing webhooks mapping to MITRE ATT&CK. Decreased MTTR by 45% through auto-containment sequences targeting endpoint isolation.",
            tech: ["Splunk", "Python", "Cortex XSOAR"],
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            github: "https://github.com",
            demo: "#"
        },
        "zero-trust-network": {
            title: "Zero Trust Network",
            category: "Architecture",
            description: "Implementing identity-aware proxying and continuous micro-segmentation. This project removed perimeter-based access in favor of context-aware continuous authentication over mTLS tunnels.",
            tech: ["BeyondCorp", "Kubernetes", "Envoy"],
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            github: "https://github.com",
            demo: "#"
        },
        "malware-sandbox-pipeline": {
            title: "Malware Sandbox Pipeline",
            category: "Analysis",
            description: "Automated static and dynamic analysis environment capturing evasive binaries. Deploys honeypots globally, hooking system calls and analyzing packed executables in safe, volatile containers.",
            tech: ["Cuckoo", "Docker", "Volatility"],
            image: "https://images.unsplash.com/photo-1526374865314-756e4e5bc019?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            github: "https://github.com",
            demo: "#"
        }
    };

    const project = projectData[projectId];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="project-page-container not-found">
                <h1 className="cyber-text-pink">404 - FILE NOT FOUND</h1>
                <button className="cyber-btn" onClick={() => navigate('/')}>RETURN TO ORIGIN</button>
            </div>
        );
    }

    return (
        <div className="project-page-container">
            <button className="back-btn cyber-btn" onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}>
                ← Back to Home
            </button>
            
            <div className="project-hero">
                <div className="project-hero-overlay"></div>
                <img src={project.image} alt={project.title} className="project-hero-image" />
                <div className="project-hero-content">
                    <span className="cyber-label">{project.category}</span>
                    <h1 className="project-title neon-text">{project.title}</h1>
                </div>
            </div>

            <div className="project-details glass-panel">
                <div className="project-main-info">
                    <h3 className="cyber-text">_EXECUTION_SUMMARY</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <h3 className="cyber-text mt-4">_TECHNOLOGY_STACK</h3>
                    <div className="tech-tags">
                        {project.tech.map((t, i) => (
                            <span key={i} className="tech-tag">[{t}]</span>
                        ))}
                    </div>
                </div>
                
                <div className="project-actions">
                    <a href={project.github} target="_blank" rel="noreferrer" className="cyber-btn action-btn">
                        <span className="btn-text">REPOSITORY</span>
                        <span className="btn-glitch" aria-hidden>_GITHUB</span>
                    </a>
                    <a href={project.demo} target="_blank" rel="noreferrer" className="cyber-btn action-btn secondary">
                        <span className="btn-text">LIVE_DEMO</span>
                        <span className="btn-glitch" aria-hidden>_DEPLOY</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;
