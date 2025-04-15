"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
    const [isFixed, setIsFixed] = useState(false);

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

    return (
        <header id="header" className={isFixed ? 'header-fixed' : ''}>
            <div className="container">
                <div id="logo" className="pull-left">
                    <div className="head-head-1">
                        <Image src="/img/GLL Logo.png" alt="GLL Logo" width={60} height={60} />
                    </div>
                    <div className="head-head-2">
                        <h1><a href="#hero">Partners.GLL</a></h1>
                    </div>
                </div>

                <nav id="nav-menu-container">
                    <ul className="nav-menu">
                        <li className="menu-active"><a href="#hero">Home</a></li>
                        <li><a href="#services">Features</a></li>
                        <li><a href="#Partners">Partners</a></li>
                        <li><Link href="/login">Log in</Link></li>
                        <li><Link href="/registration">Register Here</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 