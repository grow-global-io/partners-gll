"use client";

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                </div>
            </div>

            <div className="container">
                <div className="row footer-contact-info">
                    <div className="col-md-4 contact-col">
                        <h4>Contact Us</h4>
                        <ul className="list-unstyled contact-info">
                            <li><i className="fa fa-envelope"></i> operations@growglobal.io</li>
                            <li><i className="fa fa-map-marker"></i> Grow Global Strategies, Durgapur</li>
                            <li><i className="fa fa-phone"></i> +91 9874767678</li>
                            <li><i className="fa fa-clock"></i> Office Timing Mon-Fri: 10AM-7PM</li>
                            <li><i className="fa fa-globe"></i> <a href="https://www.growglobal.io">www.growglobal.io</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4 social-col">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                            <a href="#"><i className="fa fa-instagram"></i></a>
                        </div>
                    </div>

                    <div className="col-md-4 newsletter-col">
                        <h4>Quick Contact</h4>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your Email" required />
                            <textarea placeholder="Your Message"></textarea>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
                <div className="copyright">
                    &copy; Copyright <strong>GrowGlobal Strategies</strong> All Rights Reserved {new Date().getFullYear()}
                </div>
                <div className="credits">
                    Designed by <a href="https://www.growglobal.io">GrowGlobal Team</a>
                </div>
            </div>

            <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
        </footer>
    );
};

export default Footer; 