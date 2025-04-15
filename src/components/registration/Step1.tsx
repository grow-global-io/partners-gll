"use client";

import React, { useState } from 'react';
import RegistrationProgress from './RegistrationProgress';
import { useRouter } from 'next/navigation';
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
    onNext: (data: any) => void;
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

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
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

        // Handle terms checkbox click
        if (form.terms) {
            Swal.fire({
                title: "Terms and Conditions",
                icon: "success",
                confirmButtonText: "I Agree"
            });
        }

        onNext(form);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-content">
                    <h1 className="display-5 mb-4">GrowGlobal Welcomes You to a Global Ecosystem!</h1>
                    <p className="lead mb-4">
                        GrowGlobal has built a powerful platform designed for businesses like yours.
                        Whether you're an emerging trader or a seasoned manufacturer, your next big opportunity starts here.
                    </p>
                    <ul className="mb-4">
                        <li className="mb-2">Share your details and gain access to a global marketplace</li>
                        <li className="mb-2">Connect with high-value buyers and sellers instantly</li>
                        <li className="mb-2">Step into a world where businesses grow beyond borders</li>
                        <li className="mb-2">Share your details to gain Rewards</li>
                    </ul>
                    <blockquote className="blockquote">"Your success is our mission"</blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <RegistrationProgress currentStep={1} />

                    <h2 className="mb-4">Get Started Now</h2>
                    <p className="mb-3">Enter your details</p>

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
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="terms">I agree to the terms and services</label>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100 py-3">Next →</button>
                    </form>
                    <div className="mt-4 text-center">
                        Already have an account? <a href="/login">Sign in</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step1; 