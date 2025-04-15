"use client";

import React from 'react';

const VideoSection: React.FC = () => {
    return (
        <section id="youtube-video" className="text-center" style={{ backgroundColor: 'rgb(91, 91, 91)' }}>
            <h3 style={{ color: 'rgb(255, 255, 255)' }}>Our Introduction</h3>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/7pwe2mvbRc0"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </section>
    );
};

export default VideoSection; 