"use client";

import React, { useEffect, useRef } from 'react';

const Facts: React.FC = () => {
    const counterRefs = useRef<HTMLSpanElement[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    startCounters();
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const section = document.getElementById('facts');
        if (section) {
            observer.observe(section);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const startCounters = () => {
        const counterElements = document.querySelectorAll('[data-toggle="counter-up"]');

        counterElements.forEach((element) => {
            const target = parseInt(element.textContent || '0', 10);
            let count = 0;
            const duration = 2000; // ms
            const step = Math.ceil(target / (duration / 16));

            const updateCount = () => {
                if (count < target) {
                    count = Math.min(count + step, target);
                    element.textContent = count.toString();
                    requestAnimationFrame(updateCount);
                }
            };

            updateCount();
        });
    };

    return (
        <section id="facts">
            <div className="container wow fadeIn">
                <div className="section-header">
                    <h3 className="section-title">Our Network</h3>
                    <p className="section-description">People and Emotions that are attached with us..</p>
                </div>
                <div className="row counters">
                    <div className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up">877</span>
                        <p>Seller Community</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                        <span>24x7</span>
                        <p>Online Businesses</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up">17883</span>
                        <p>Orders Delivered</p>
                    </div>

                    <div className="col-lg-3 col-6 text-center">
                        <span data-toggle="counter-up">349</span>
                        <p>Categories in Consumer Product</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Facts; 