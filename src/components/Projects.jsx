import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularGallery from './CircularGallery';
import './Projects.css';

const Projects = () => {
    const navigate = useNavigate();

    // Map existing project data to CircularGallery format { image, text, id }
    // We add an id field for mapping to the detailed project pages
    const galleryItems = [
        {
            id: "threat-intel-platform",
            text: "Threat Intel Platform",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "automated-grc-auditor",
            text: "Automated GRC Auditor",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "soc-playbook-auto",
            text: "SOC Playbook Auto",
            image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "zero-trust-network",
            text: "Zero Trust Network",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: "malware-sandbox-pipeline",
            text: "Malware Sandbox Pipeline",
            image: "https://images.unsplash.com/photo-1526374865314-756e4e5bc019?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    const handleItemClick = (item) => {
        if (item && item.id) {
            navigate(`/projects/${item.id}`);
        }
    };

    return (
        <section className="projects-section" id="projects">
            <h2 className="section-title reveal">
                Network <span className="cyber-text-pink">Manifest</span> <span className="section-kanji-subtitle" style={{ color: 'var(--neon-pink)', opacity: 0.7, fontSize: '0.7em', marginLeft: '12px' }}>計画</span>
            </h2>
            <div className="cyber-label reveal" style={{ position: 'absolute', top: '12vh', right: '10vw' }}>プロジェクト</div>
            
            <div className="projects-gallery-container reveal">
                <CircularGallery 
                    items={galleryItems} 
                    bend={3} 
                    textColor="#ffffff" 
                    borderRadius={0.05} 
                    scrollEase={0.05} 
                    onItemClick={handleItemClick}
                />
            </div>
            
            <div className="gallery-instructions">
                <span className="cursor-blink">_</span> Drag to Browse | Click to Access File
            </div>
        </section>
    );
};

export default Projects;
