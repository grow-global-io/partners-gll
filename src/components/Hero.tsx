"use client";

import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="hero">
            <div className="hero-container">
                <h1>Welcome to GrowLimitLess</h1>
                <h2 style={{ fontSize: '20px' }}>"Journey of a thousand miles begins with a single step."</h2>
                <a href="#youtube-video" className="btn-get-started">Watch How It Works</a>
            </div>
        </section>
    );
};

export default Hero; 