import React, { useRef } from 'react';
import { useMagneticHover } from '../hooks/useMagneticHover';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    
    // Deeper perspective and tighter tilt on cards
    const magneticStyles = useMagneticHover(cardRef, {
        attraction: 0.1, // Stronger pull toward cursor
        tiltMax: 8,      // Deeper 3D rotation
        perspective: 800
    });

    return (
        <div 
            className="project-card" 
            ref={cardRef}
            style={magneticStyles}
        >
            <div className="card-border-gradient"></div>
            <div className="card-shimmer"></div>
            
            <div className="card-image-container">
                <img src={project.image} alt={project.title} className="card-image" />
                <div className="card-image-overlay"></div>
            </div>
            
            <div className="card-content">
                <div className="card-category">{project.category}</div>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>
                
                <div className="card-tech">
                    {project.tech.map((tech, index) => (
                        <span key={index} className="tech-badge">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
