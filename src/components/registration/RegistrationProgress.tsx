"use client";

import React from 'react';
import { FaUser, FaBuilding, FaUniversity, FaLock, FaShieldAlt } from 'react-icons/fa';

interface RegistrationProgressProps {
    currentStep: number;
}

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ currentStep }) => {
    const steps = [
        { number: 1, icon: <FaUser />, label: 'Personal Details' },
        { number: 2, icon: <FaBuilding />, label: 'Business Setup' },
        { number: 3, icon: <FaUniversity />, label: 'Banking Info' },
        { number: 4, icon: <FaLock />, label: 'Login Details' },
        { number: 5, icon: <FaShieldAlt />, label: 'Identity Check' },
    ];

    return (
        <div className="steps-progress mb-4">
            {steps.map((step) => (
                <div
                    key={step.number}
                    className={`step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                >
                    <div className="step-icon">
                        {step.icon}
                    </div>
                    <div className="step-label">{step.label}</div>
                </div>
            ))}
        </div>
    );
};

export default RegistrationProgress; 