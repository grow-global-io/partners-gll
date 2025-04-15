"use client";

import React, { useState } from 'react';
import RegistrationProgress from './RegistrationProgress';

interface Step3Props {
    formData: {
        businessType: string;
        monthlyTurnover: string;
        bankName: string;
        accountNumber: string;
        ifscCode: string;
        bankBranch: string;
    };
    onNext: (data: any) => void;
    onBack: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, onNext, onBack }) => {
    const [form, setForm] = useState({
        businessType: formData.businessType || '',
        monthlyTurnover: formData.monthlyTurnover || '',
        bankName: formData.bankName || '',
        accountNumber: formData.accountNumber || '',
        ifscCode: formData.ifscCode || '',
        bankBranch: formData.bankBranch || ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [ifscStatus, setIfscStatus] = useState<{ verified: boolean, bank?: string, branch?: string }>({
        verified: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    };

    const verifyIFSC = async () => {
        const ifscCode = form.ifscCode.trim();

        if (!ifscCode) {
            setErrors({
                ...errors,
                ifscCode: 'IFSC code is required'
            });
            return;
        }

        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
            setErrors({
                ...errors,
                ifscCode: 'Invalid IFSC code format'
            });
            return;
        }

        try {
            // In a real implementation, you would call an IFSC API
            // For demo purposes, we'll simulate a response

            // Simulate API response delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock successful response
            const mockBankName = "DEMO NATIONAL BANK";
            const mockBranch = "DEMO BRANCH, NEW DELHI";

            setIfscStatus({
                verified: true,
                bank: mockBankName,
                branch: mockBranch
            });

            // Auto-fill bank name and branch
            setForm({
                ...form,
                bankName: mockBankName,
                bankBranch: mockBranch
            });

        } catch (error) {
            setErrors({
                ...errors,
                ifscCode: 'Failed to verify IFSC code: ' + (error as Error).message
            });
            setIfscStatus({ verified: false });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.businessType) {
            newErrors.businessType = 'Please select your business type';
        }

        if (!form.monthlyTurnover) {
            newErrors.monthlyTurnover = 'Please select your monthly turnover';
        }

        if (!form.bankName) {
            newErrors.bankName = 'Bank name is required';
        }

        if (!form.accountNumber) {
            newErrors.accountNumber = 'Account number is required';
        } else if (!/^\d{9,18}$/.test(form.accountNumber)) {
            newErrors.accountNumber = 'Please enter a valid account number (9-18 digits)';
        }

        if (!form.ifscCode) {
            newErrors.ifscCode = 'IFSC code is required';
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode)) {
            newErrors.ifscCode = 'Invalid IFSC code format';
        }

        if (!form.bankBranch) {
            newErrors.bankBranch = 'Bank branch is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onNext(form);
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-content">
                    <h1>Banking Details</h1>
                    <p>We'll need your banking information to set up payments and verify your business.</p>
                    <ul>
                        <li>Your banking details are crucial for receiving payments</li>
                        <li>All information is securely encrypted</li>
                        <li>You can update these details later if needed</li>
                    </ul>
                    <blockquote>Your financial details are safe with us</blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <RegistrationProgress currentStep={3} />

                    <h2 className="text-center mb-4">Banking Information</h2>
                    <p className="text-center mb-4">Please provide your business banking details</p>

                    <form id="bankingForm" onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="business-type">Business Type</label>
                                    <select
                                        id="business-type"
                                        name="businessType"
                                        className={`form-select ${errors.businessType ? 'is-invalid' : ''}`}
                                        value={form.businessType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select business type</option>
                                        <option value="sole-proprietorship">Sole Proprietorship</option>
                                        <option value="partnership">Partnership</option>
                                        <option value="llp">Limited Liability Partnership (LLP)</option>
                                        <option value="private-limited">Private Limited Company</option>
                                        <option value="public-limited">Public Limited Company</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.businessType && <div className="invalid-feedback">{errors.businessType}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="monthly-turnover">Monthly Turnover</label>
                                    <select
                                        id="monthly-turnover"
                                        name="monthlyTurnover"
                                        className={`form-select ${errors.monthlyTurnover ? 'is-invalid' : ''}`}
                                        value={form.monthlyTurnover}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select monthly turnover</option>
                                        <option value="less-than-1lakh">Less than ₹1 Lakh</option>
                                        <option value="1-5lakh">₹1 Lakh - ₹5 Lakh</option>
                                        <option value="5-10lakh">₹5 Lakh - ₹10 Lakh</option>
                                        <option value="10-25lakh">₹10 Lakh - ₹25 Lakh</option>
                                        <option value="25-50lakh">₹25 Lakh - ₹50 Lakh</option>
                                        <option value="50lakh-1cr">₹50 Lakh - ₹1 Crore</option>
                                        <option value="more-than-1cr">More than ₹1 Crore</option>
                                    </select>
                                    {errors.monthlyTurnover && <div className="invalid-feedback">{errors.monthlyTurnover}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="ifsc-code">IFSC Code</label>
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    id="ifsc-code"
                                    name="ifscCode"
                                    className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
                                    placeholder="IFSC Code"
                                    value={form.ifscCode}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary verify-btn"
                                    onClick={verifyIFSC}
                                >
                                    Verify
                                </button>
                            </div>
                            {errors.ifscCode && <div className="invalid-feedback">{errors.ifscCode}</div>}
                            {ifscStatus.verified && (
                                <div className="ifsc-details text-success mb-2">
                                    <div><strong>Bank:</strong> {ifscStatus.bank}</div>
                                    <div><strong>Branch:</strong> {ifscStatus.branch}</div>
                                </div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="bank-name">Bank Name</label>
                            <input
                                type="text"
                                id="bank-name"
                                name="bankName"
                                className={`form-control ${errors.bankName ? 'is-invalid' : ''}`}
                                placeholder="Bank name"
                                value={form.bankName}
                                onChange={handleChange}
                            />
                            {errors.bankName && <div className="invalid-feedback">{errors.bankName}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="account-number">Account Number</label>
                            <input
                                type="text"
                                id="account-number"
                                name="accountNumber"
                                className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                                placeholder="Account number"
                                value={form.accountNumber}
                                onChange={handleChange}
                            />
                            {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber}</div>}
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="bank-branch">Bank Branch</label>
                            <input
                                type="text"
                                id="bank-branch"
                                name="bankBranch"
                                className={`form-control ${errors.bankBranch ? 'is-invalid' : ''}`}
                                placeholder="Bank branch"
                                value={form.bankBranch}
                                onChange={handleChange}
                            />
                            {errors.bankBranch && <div className="invalid-feedback">{errors.bankBranch}</div>}
                        </div>

                        <div className="form-navigation d-flex justify-content-between">
                            <button type="button" className="btn btn-outline-secondary" onClick={onBack}>Back</button>
                            <button type="submit" className="btn btn-primary">Next →</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step3; 