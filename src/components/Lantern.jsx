import React from 'react';
import './Lantern.css';

const Lantern = ({ kanji, style, swingDelay = '0s' }) => {
    return (
        <div className="japanese-lantern" style={{ ...style, animationDelay: swingDelay }}>
            <div className="lantern-top"></div>
            <div className="lantern-body">
                <span className="lantern-text">{kanji}</span>
                <div className="lantern-flame"></div>
            </div>
            <div className="lantern-bottom"></div>
            <div className="lantern-tassel"></div>
        </div>
    );
};

export default Lantern;
