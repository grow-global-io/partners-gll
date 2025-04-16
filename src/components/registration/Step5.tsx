"use client";

import React, { useState, useEffect } from 'react';
import RegistrationProgress from './RegistrationProgress';
import { useRouter } from 'next/navigation';

interface Step5Props {
    formData: any;
    onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ formData, onBack }) => {
    const router = useRouter();
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedProgress = JSON.parse(localStorage.getItem('formProgress') || '{"completed":0,"percent":0}');

            let filledFields = 0;
            if (emailOtp) filledFields++;

            const totalFields = 16;
            const filledFieldsTotal = (savedProgress.page1 || 0) +
                (savedProgress.page2 || 0) +
                (savedProgress.page3 || 0) +
                (savedProgress.page4 || 0) +
                filledFields;

            const percent = Math.round((filledFieldsTotal / totalFields) * 100);

            localStorage.setItem('formProgress', JSON.stringify({
                completed: filledFieldsTotal,
                percent: percent,
                page1: savedProgress.page1 || 0,
                page2: savedProgress.page2 || 0,
                page3: savedProgress.page3 || 0,
                page4: savedProgress.page4 || 0,
                page5: filledFields
            }));
        }
    }, [emailOtp]);

    const handleResendOtp = () => {
        setTimeLeft(30);
        setShowResend(false);
        alert('New OTP has been sent to your email');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailOtp || emailOtp.length !== 6) {
            alert('Please enter a valid 6-digit OTP');
            return;
        }

        setIsSubmitting(true);

        try {
            // Create FormData instead of JSON
            const formData = new FormData();

            // Add all necessary data to the FormData
            // formData.append('email', formData.email);
            // formData.append('name', formData.name);
            // formData.append('password', formData.password);
            // formData.append('otpCode', formData.emailOtp);

            formData.append('email', 'test@example.com');
            formData.append('name', 'Test User');
            formData.append('password', 'Password123');
            formData.append('otpCode', emailOtp);

            console.log('Sending data as FormData');

            // Send request with FormData
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                // No Content-Type header as browser will set it with boundary for FormData
                body: formData
            });

            console.log('Response status:', response.status);

            // Get the response as text first to inspect it
            const responseText = await response.text();
            console.log('Response text:', responseText);

            // Try to parse as JSON if possible
            let data;
            try {
                if (responseText) {
                    data = JSON.parse(responseText);
                    console.log('Parsed response data:', data);
                }
            } catch (parseError) {
                console.error('Error parsing response as JSON:', parseError);
            }

            // Handle the response
            if (response.ok) {
                // Clear localStorage after successful submission
                localStorage.removeItem('formData');
                localStorage.removeItem('formProgress');

                alert("Your Data is Saved and Secure with us");
            } else {
                // Show error details
                const errorDetails = data ?
                    `Error: ${data.message || 'Unknown error'}` :
                    `Error ${response.status}: ${response.statusText}`;
                console.error('Server error details:', errorDetails);

                // Show a friendlier message to the user
                alert("Your Data is Not Saved");
            }

            // Redirect to home page
            router.push('/');
        } catch (error) {
            console.error('Network or other error:', error);
            alert('Registration failed. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero d-none d-md-block">
                <div className="hero-content px-4 py-5">
                    <h1 className="fs-2 fs-md-1 mb-4">Verify Your Account</h1>
                    <p className="mb-4">We've sent OTPs to your email and phone number.</p>
                    <ul className="mb-4 ps-3 ps-md-4">
                        <li className="mb-2">Check your email inbox for 6-digit code</li>
                        <li className="mb-2">Check your phone for SMS with 6-digit code</li>
                        <li className="mb-2">Enter both codes to verify your account</li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container px-4 py-4 py-md-5 mx-auto" style={{ maxWidth: '500px' }}>
                    <RegistrationProgress currentStep={5} />

                    <h2 className="text-center mb-3 fs-3 fs-md-2">Enter Verification Codes</h2>

                    {/* Points Counter */}
                    <div className="points-counter mb-4 d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <span>Points: <span id="points" className="fw-bold">100</span>/100</span>
                            <span className="text-muted small">Complete registration to claim rewards</span>
                        </div>
                        <div className="progress-container w-100">
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                        <a href="/" className="mt-2 w-100">
                            <button type="button" className="btn btn-success w-100">Claim GLL ion</button>
                        </a>
                    </div>

                    <div className="progress-container mb-4">
                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}></div>
                        </div>
                        <small className="progress-text">0% Complete</small>
                    </div>

                    <form id="otpForm" onSubmit={handleSubmit} className="w-100">
                        <div className="form-group mb-4">
                            <label className="mb-2">Email OTP</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    maxLength={6}
                                    className="form-control form-control-lg"
                                    value={emailOtp}
                                    onChange={(e) => setEmailOtp(e.target.value)}
                                    required
                                    placeholder="Enter 6-digit code"
                                />
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <div className="countdown mt-3 text-center" style={{ display: showResend ? 'none' : 'block' }}>
                                Resend OTP in <span id="timer" className="fw-bold">{timeLeft}</span> seconds
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
                                type="submit"
                                className="btn btn-primary btn-lg w-100 py-2 py-md-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Verifying...
                                    </>
                                ) : (
                                    'Verify Account'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step5; 