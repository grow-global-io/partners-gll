"use client";

import React from 'react';

const Features: React.FC = () => {
    return (
        <section id="services">
            <div className="container wow fadeIn">
                <div className="section-header">
                    <h3 className="section-title" style={{ color: 'rgb(0, 0, 0)' }}>Why Partner's Sell on</h3>
                    <h3 className="section-title" style={{ color: 'blueviolet' }}>GrowGlobal.io</h3>
                    <p className="section-description">
                        Thousands of verified buyers across India trust GrowGLoabl.io as their go-to platform for quality products.
                        A growing number of Partners rely on us to showcase their goods 24×7, expanding their reach to international
                        markets effortlessly.
                    </p>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box">
                            <div className="icon"><i className="bi bi-globe-central-south-asia" aria-hidden="true"></i></div>
                            <h4 className="title"><a href="#services">Reach Thousands of Verified Buyers Globally</a></h4>
                            <p className="description">
                                Expand your business by connecting with a wide network of B2B buyers in India and across the globe.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="box">
                            <div className="icon"><a href="#services"><i className="bi bi-rocket-takeoff" aria-hidden="true"></i></a></div>
                            <h4 className="title"><a href="#services">Empowering Indian Brands for Global Recognition</a></h4>
                            <p className="description">
                                Showcase your products to international markets and establish your brand as a global player with zero hassle.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <div className="box">
                            <div className="icon"><a href="#services"><i className="bi bi-box-seam"></i></a></div>
                            <h4 className="title"><a href="#services">No Inventory? No Problem!</a></h4>
                            <p className="description">
                                Operate on a 'No Inventory Business Model' by listing your products with Production TAT and fulfill orders efficiently.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
                        <div className="box">
                            <div className="icon"><a href="#services"><i className="bi bi-patch-check-fill" aria-hidden="true"></i></a></div>
                            <h4 className="title"><a href="#services">Transparent and Trusted Ecosystem</a></h4>
                            <p className="description">
                                Enjoy secure transactions, verified buyers, and transparent processes designed to build trust and accountability.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
                        <div className="box">
                            <div className="icon"><a href="#team"><i className="bi bi-truck" aria-hidden="true"></i></a></div>
                            <h4 className="title"><a href="#team">Full-Service Supply Chain</a></h4>
                            <p className="description">
                                Ant Mascot handles logistics, from order management to last-mile delivery across India and beyond. Focus on production
                                while we take care of the rest.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <div className="box">
                            <div className="icon"><a href="#services"><i className="bi bi-bar-chart-line-fill" aria-hidden="true"></i></a></div>
                            <h4 className="title"><a href="#services">Comprehensive Account Management</a></h4>
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