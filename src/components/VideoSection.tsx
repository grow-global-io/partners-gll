"use client";

import React from 'react';

const VideoSection: React.FC = () => {
    return (
        <section id="youtube-video" className="text-center py-5" style={{ backgroundColor: 'rgb(91, 91, 91)' }}>
            <div className="container px-4">
                <h3 className="fs-2 mb-4 text-white">Our Introduction</h3>
                <div className="ratio ratio-16x9 mx-auto" style={{ maxWidth: '900px' }}>
                    <iframe
                        src="https://www.youtube.com/embed/7pwe2mvbRc0"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default VideoSection; 