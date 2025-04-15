"use client";

import React from 'react';
import Link from 'next/link';

const SneakPeek: React.FC = () => {
    return (
        <div className="container">
            <section className="sneak-peek-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="section-title">Take a sneak peek into our platform</h1>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="feature-card">
                                <div className="feature-icon">
                                    <i className="fa fa-chart-line"></i>
                                </div>
                                <h3 className="feature-title">Get your Global Value Chain certificate</h3>
                                <div className="checkbox-item">
                                    <label htmlFor="analytics-check" className="checkbox-label">
                                        Showcase your business readiness for international trade. Build trust with global
                                        buyers, unlock new growth avenues, and position your brand as a credible player in the
                                        global marketplace.
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="feature-card d-flex flex-column justify-content-center align-items-center">
                                <div className="feature-icon">
                                    <i className="fa fa-box-open"></i>
                                </div>
                                <h3 className="feature-title text-center">Ready to Get Started?</h3>
                                <p className="feature-description text-center">
                                    Join hundreds of sellers growing their business with our platform
                                </p>
                                <Link href="/registration" className="cta-button">
                                    List Your Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SneakPeek; 