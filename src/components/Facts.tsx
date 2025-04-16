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
        <section id="facts" className="py-5">
            <div className="container wow fadeIn">
                <div className="section-header text-center mb-5">
                    <h3 className="section-title fs-2 mb-3">Our Network</h3>
                    <p className="section-description px-3 mx-auto" style={{ maxWidth: '800px' }}>People and Emotions that are attached with us..</p>
                </div>
                <div className="row counters g-4">
                    <div className="col-6 col-md-3 text-center">
                        <span data-toggle="counter-up" className="fs-1 fw-bold d-block mb-2">877</span>
                        <p className="mb-0">Seller Community</p>
                    </div>

                    <div className="col-6 col-md-3 text-center">
                        <span className="fs-1 fw-bold d-block mb-2">24x7</span>
                        <p className="mb-0">Online Businesses</p>
                    </div>

                    <div className="col-6 col-md-3 text-center">
                        <span data-toggle="counter-up" className="fs-1 fw-bold d-block mb-2">17883</span>
                        <p className="mb-0">Orders Delivered</p>
                    </div>

                    <div className="col-6 col-md-3 text-center">
                        <span data-toggle="counter-up" className="fs-1 fw-bold d-block mb-2">349</span>
                        <p className="mb-0">Categories in Consumer Product</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Facts; 