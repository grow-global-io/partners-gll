"use client";

import React from 'react';

const Hero: React.FC = () => {
    return (
        <section id="hero">
            <div className="hero-container text-center px-4">
                <h1 className="mb-4 display-4 fw-bold">Welcome to GrowLimitLess</h1>
                <h2 className="mb-5 fs-5 fw-light">&quot;Journey of a thousand miles begins with a single step.&quot;</h2>
                <a href="#youtube-video" className="btn-get-started rounded-pill px-4 py-3 fw-medium">Watch How It Works</a>
            </div>
        </section>
    );
};

export default Hero; 