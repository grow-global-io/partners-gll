"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMobileNav = () => {
        setMobileNavActive(!mobileNavActive);
        document.body.classList.toggle('mobile-nav-active');
    };

    return (
        <>
            <header id="header" className={isFixed ? 'header-fixed' : ''}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div id="logo" className="d-flex align-items-center">
                        <div className="head-head-1">
                            <Image src="/img/GLL Logo.png" alt="GLL Logo" width={60} height={60} className="img-fluid" />
                        </div>
                        <div className="head-head-2 ms-2">
                            <h1 className="m-0"><a href="#hero">Partners.GLL</a></h1>
                        </div>
                    </div>

                    <nav id="nav-menu-container" className="d-none d-lg-block">
                        <ul className="nav-menu">
                            <li className="menu-active"><a href="#hero">Home</a></li>
                            <li><a href="#services">Features</a></li>
                            <li><a href="#Partners">Partners</a></li>
                            <li><Link href="/login">Log in</Link></li>
                            <li><Link href="/registration">Register Here</Link></li>
                        </ul>
                    </nav>

                    <div id="mobile-nav-toggle" className="d-block d-lg-none" onClick={toggleMobileNav}>
                        <i className={`bi ${mobileNavActive ? 'bi-x' : 'bi-list'}`}></i>
                    </div>
                </div>
            </header>

            <div id="mobile-nav" className={mobileNavActive ? 'active' : ''}>
                <ul>
                    <li className="menu-active"><a href="#hero" onClick={toggleMobileNav}>Home</a></li>
                    <li><a href="#services" onClick={toggleMobileNav}>Features</a></li>
                    <li><a href="#Partners" onClick={toggleMobileNav}>Partners</a></li>
                    <li><Link href="/login" onClick={toggleMobileNav}>Log in</Link></li>
                    <li><Link href="/registration" onClick={toggleMobileNav}>Register Here</Link></li>
                </ul>
            </div>
            <div id="mobile-body-overly" className={mobileNavActive ? 'active' : ''} onClick={toggleMobileNav}></div>
        </>
    );
};

export default Header; 