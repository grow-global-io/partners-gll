"use client";

import React, { ReactNode } from 'react';
import '../../styles/registration.css';

interface RegistrationLayoutProps {
    children: ReactNode;
}

const RegistrationLayout: React.FC<RegistrationLayoutProps> = ({ children }) => {
    return (
        <div className="registration-container">
            <div className="container-fluid">
                <div className="row">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default RegistrationLayout; 