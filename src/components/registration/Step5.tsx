"use client";

import React, { useState, useEffect } from 'react';
import RegistrationProgress from './RegistrationProgress';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

interface Step5Props {
    formData: any;
    onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ formData, onBack }) => {
    const [emailOtp, setEmailOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else {
            setShowResend(true);
        }
    }, [timeLeft]);

    const handleResendOtp = () => {
        setTimeLeft(30);
        setShowResend(false);
        // Simulate OTP resend
        alert('New OTPs have been sent to your email and phone');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            window.location.href = "/registration/complete";
        }, 1500);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-content">
                    <h1 className="mb-4">Verify Your Account</h1>
                    <p className="mb-4">We've sent OTPs to your email and phone number.</p>
                    <ul className="mb-4">
                        <li>Check your email inbox for 6-digit code</li>
                        <li>Check your phone for SMS with 6-digit code</li>
                        <li>Enter both codes to verify your account</li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <RegistrationProgress currentStep={5} />

                    <h2 className="mb-3">Enter Verification Codes</h2>

                    <form id="otpForm" onSubmit={handleSubmit} className="w-100">
                        <div className="form-group mb-4">
                            <label>Email OTP</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    maxLength={6}
                                    className="form-control w-100"
                                    value={emailOtp}
                                    onChange={(e) => setEmailOtp(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <div className="countdown mt-3" style={{ display: showResend ? 'none' : 'block' }}>
                                Resend OTP in <span id="timer">{timeLeft}</span> seconds
                            </div>
                            <div className="text-center resend-otp" style={{ display: showResend ? 'block' : 'none' }}>
                                <button
                                    type="button"
                                    className="btn btn-link"
                                    onClick={handleResendOtp}
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>

                        <div className="form-navigation">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onBack}
                                disabled={isSubmitting}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Verifying...' : 'Verify Account'}
                            </button>
                        </div>
                    </form>

                    {/* Points Counter */}
                    <div className="points-counter">
                        Points: <span id="points">100</span>/100
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step5; 