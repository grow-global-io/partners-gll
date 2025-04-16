"use client";

import React from 'react';

const Features: React.FC = () => {
    return (
        <section id="services" className="py-5">
            <div className="container wow fadeIn px-4">
                <div className="section-header text-center mb-5">
                    <h3 className="section-title fs-2 mb-2" style={{ color: 'rgb(0, 0, 0)' }}>Why Partner&apos;s Sell on</h3>
                    <h3 className="section-title fs-2 mb-3" style={{ color: 'blueviolet' }}>GrowGlobal.io</h3>
                    <p className="section-description mx-auto" style={{ maxWidth: '900px' }}>
                        Thousands of verified buyers across India trust GrowGLoabl.io as their go-to platform for quality products.
                        A growing number of Partners rely on us to showcase their goods 24×7, expanding their reach to international
                        markets effortlessly.
                    </p>
                </div>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><i className="bi bi-globe-central-south-asia fs-3" aria-hidden="true"></i></div>
                            <h4 className="title mb-3"><a href="#services">Reach Thousands of Verified Buyers Globally</a></h4>
                            <p className="description">
                                Expand your business by connecting with a wide network of B2B buyers in India and across the globe.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><a href="#services"><i className="bi bi-rocket-takeoff fs-3" aria-hidden="true"></i></a></div>
                            <h4 className="title mb-3"><a href="#services">Empowering Indian Brands for Global Recognition</a></h4>
                            <p className="description">
                                Showcase your products to international markets and establish your brand as a global player with zero hassle.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><a href="#services"><i className="bi bi-box-seam fs-3"></i></a></div>
                            <h4 className="title mb-3"><a href="#services">No Inventory? No Problem!</a></h4>
                            <p className="description">
                                Operate on a &apos;No Inventory Business Model&apos; by listing your products with Production TAT and fulfill orders efficiently.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><a href="#services"><i className="bi bi-patch-check-fill fs-3" aria-hidden="true"></i></a></div>
                            <h4 className="title mb-3"><a href="#services">Transparent and Trusted Ecosystem</a></h4>
                            <p className="description">
                                Enjoy secure transactions, verified buyers, and transparent processes designed to build trust and accountability.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><a href="#team"><i className="bi bi-truck fs-3" aria-hidden="true"></i></a></div>
                            <h4 className="title mb-3"><a href="#team">Full-Service Supply Chain</a></h4>
                            <p className="description">
                                Ant Mascot handles logistics, from order management to last-mile delivery across India and beyond. Focus on production
                                while we take care of the rest.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.6s">
                        <div className="box p-4 h-100 rounded shadow-sm">
                            <div className="icon mb-3"><a href="#services"><i className="bi bi-bar-chart-line-fill fs-3" aria-hidden="true"></i></a></div>
                            <h4 className="title mb-3"><a href="#services">Comprehensive Account Management</a></h4>
                            <p className="description">
                                Get AI-powered dashboards with real-time insights on sales, buyer behavior, and trends to optimize your business
                                strategy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features; 