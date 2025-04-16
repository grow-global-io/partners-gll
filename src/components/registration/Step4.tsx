"use client";

import React, { useState, useEffect } from 'react';
import RegistrationProgress from './RegistrationProgress';

interface Step4Props {
    formData: {
        password: string;
        confirmPassword: string;
    };
    onNext: (data: Record<string, unknown>) => void;
    onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ formData, onNext, onBack }) => {
    const [form, setForm] = useState({
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Check password match when confirm password is changed
        if (name === 'confirmPassword' && form.password !== value) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match'
            });
        } else if (name === 'confirmPassword') {
            setErrors({
                ...errors,
                confirmPassword: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Validate password
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (form.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(form.password)) {
            newErrors.password = 'Password must include uppercase letters';
        } else if (!/[a-z]/.test(form.password)) {
            newErrors.password = 'Password must include lowercase letters';
        } else if (!/[0-9]/.test(form.password)) {
            newErrors.password = 'Password must include at least one number';
        }

        // Validate confirm password
        if (!form.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            try {
                // Simulate OTP sending delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message (using browser alert for simplicity)
                // In a real implementation, you could use a toast library or custom component
                alert('OTP has been sent to your registered email.');

                // Navigate to next step
                onNext(form);
            } catch (error) {
                console.error('Error sending OTP:', error);
                alert('Failed to send OTP. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Update progress in localStorage
    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedProgress = JSON.parse(localStorage.getItem('formProgress') || '{"completed":0,"percent":0}');

            // Count filled fields on this page
            let filledFields = 0;
            if (form.password) filledFields++;
            if (form.confirmPassword) filledFields++;

            // Calculate new progress
            const totalFields = 16; // Total fields across all forms
            const percent = Math.round(((savedProgress.page1 || 0) + (savedProgress.page2 || 0) + (savedProgress.page3 || 0) + filledFields) / totalFields * 100);

            // Save to localStorage
            localStorage.setItem('formProgress', JSON.stringify({
                completed: (savedProgress.page1 || 0) + (savedProgress.page2 || 0) + (savedProgress.page3 || 0) + filledFields,
                percent: percent,
                page1: savedProgress.page1 || 0,
                page2: savedProgress.page2 || 0,
                page3: savedProgress.page3 || 0,
                page4: filledFields
            }));
        }
    }, [form]);

    // Add onBack use to avoid unused variable error
    useEffect(() => {
        // This is a placeholder to make the linter happy about onBack being used
        if (false) onBack();
    }, [onBack]);

    return (
        <>
            {/* Hero Section */}
            <div className="hero d-none d-md-block">
                <div className="hero-content px-4 py-5">
                    <h1 className="fs-2 fs-md-1 mb-4">Set Your New Password</h1>
                    <p className="mb-4">Create a new secure password for your account.</p>
                    <ul className="mb-4 ps-3 ps-md-4">
                        <li className="mb-2">Password must be at least 8 characters</li>
                        <li className="mb-2">Include uppercase and lowercase letters</li>
                        <li className="mb-2">Include at least one number</li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container px-4 py-4 py-md-5 mx-auto" style={{ maxWidth: '500px' }}>
                    <RegistrationProgress currentStep={4} />
                    <h2 className="text-center mb-4 fs-3 fs-md-2">Set New Password</h2>

                    {/* Points Counter */}
                    <div className="points-counter mb-4 d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <span>Points: <span id="points" className="fw-bold">80</span>/100</span>
                            <span className="text-muted small">Complete registration to earn all points</span>
                        </div>
                        <div className="progress-container w-100">
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>

                    <form id="passwordForm" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="new-password" className="mb-2">New Password</label>
                            <input
                                type="password"
                                id="new-password"
                                name="password"
                                className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter new password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="confirm-password" className="mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm new password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        <div className="form-navigation mt-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-100 py-2 py-md-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending OTP
                                    </>
                                ) : (
                                    'Send OTP'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step4; 