"use client";

import React, { useState } from 'react';
import RegistrationProgress from './RegistrationProgress';
// import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface Step1Props {
    formData: {
        name: string;
        email: string;
        designation: string;
        phone: string;
        international: boolean;
        terms: boolean;
    };
    onNext: (data: Record<string, unknown>) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, onNext }) => {
    const [form, setForm] = useState({
        name: formData.name || '',
        email: formData.email || '',
        designation: formData.designation || '',
        phone: formData.phone || '',
        international: formData.international || false,
        terms: formData.terms || false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleTermCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
        Swal.fire({
            title: "Terms and Conditions",
            icon: "success",
            confirmButtonText: "I Agree"
        });
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        // Form validation
        if (!form.name || !form.email || !form.designation || !form.phone) {
            alert('Please fill in all required fields');
            return;
        }

        if (!form.terms) {
            alert('You must agree to the terms and services');
            return;
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/personal-details`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });
        

        onNext(form);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero d-none d-md-block">
                <div className="hero-content px-4 py-5">
                    <h1 className="display-5 mb-4 fs-2 fs-md-1">GrowGlobal Welcomes You to a Global Ecosystem!</h1>
                    <p className="lead mb-4">
                        GrowGlobal has built a powerful platform designed for businesses like yours.
                        Whether you&apos;re an emerging trader or a seasoned manufacturer, your next big opportunity starts here.
                    </p>
                    <ul className="mb-4 ps-3 ps-md-4">
                        <li className="mb-2">Share your details and gain access to a global marketplace</li>
                        <li className="mb-2">Connect with high-value buyers and sellers instantly</li>
                        <li className="mb-2">Step into a world where businesses grow beyond borders</li>
                        <li className="mb-2">Share your details to gain Rewards</li>
                    </ul>
                    <blockquote className="blockquote border-start ps-3 border-4">
                        &quot;Your success is our mission&quot;
                    </blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container px-4 py-4 py-md-5 mx-auto" style={{ maxWidth: '500px' }}>
                    <RegistrationProgress currentStep={1} />

                    <h2 className="mb-4 text-center fs-3 fs-md-2">Get Started Now</h2>

                    {/* Points Counter */}
                    {/* <div className="points-counter mb-4 d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <span>Points: <span id="points" className="fw-bold">20</span>/100</span>
                            <span className="text-muted small">Complete registration to earn all points</span>
                        </div>
                        <div className="progress-container w-100">
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                    </div> */}

                    <p className="mb-3 text-center">Enter your details</p>

                    <form id="registrationForm" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="designation"
                                name="designation"
                                placeholder="Enter your designation"
                                value={form.designation}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                className="form-control form-control-lg"
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="international"
                                name="international"
                                checked={form.international}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="international">Do you trade internationally?</label>
                        </div>
                        <div className="mb-4 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms"
                                name="terms"
                                checked={form.terms}
                                onChange={handleTermCheck}
                                required
                            />
                            <label className="form-check-label" htmlFor="terms">I agree to the terms and services</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 py-2 py-md-3">Next →</button>
                    </form>
                    <div className="mt-4 text-center">
                        Already have an account? <a href="/login" className="fw-bold">Sign in</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step1; 