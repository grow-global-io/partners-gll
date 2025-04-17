"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RegistrationProgress from './RegistrationProgress';
import toast, { Toaster } from 'react-hot-toast';

interface Step3Props {
    formData: {
        ifscCode: string;
        accountName: string;
        accountNumber: string;
        wantPaymentGateway: boolean;
        bankName?: string;
        bankBranch?: string;
    };
    onNext: (data: Record<string, unknown>) => void;
    onBack: () => void;
}

const Step3: React.FC<Step3Props> = ({ formData, onBack }) => {
    const [form, setForm] = useState({
        ifscCode: formData.ifscCode || '',
        accountHolderName: formData.accountName || '',
        accountNumber: formData.accountNumber || '',
        paymentGateway: formData.wantPaymentGateway ? 'yes' : (formData.wantPaymentGateway === false ? 'no' : '')
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [ifscStatus, setIfscStatus] = useState<{ verified: boolean, bank?: string, branch?: string }>({
        verified: false
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

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

        if (ifscCode.length !== 11) {
            setErrors({
                ...errors,
                ifscCode: 'IFSC code must be 11 characters long'
            });
            return;
        }

        setIsVerifying(true);

        try {
            // Use the Razorpay IFSC API as mentioned in the reference code
            const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);

            if (!response.ok) {
                throw new Error('Invalid IFSC code');
            }

            const data = await response.json();

            setIfscStatus({
                verified: true,
                bank: data.BANK,
                branch: data.BRANCH
            });

        } catch (error) {
            setErrors({
                ...errors,
                ifscCode: 'Failed to verify IFSC code: ' + (error as Error).message
            });
            setIfscStatus({ verified: false });
        } finally {
            setIsVerifying(false);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!form.ifscCode) {
            newErrors.ifscCode = 'IFSC code is required';
        } else if (form.ifscCode.length !== 11) {
            newErrors.ifscCode = 'IFSC code must be 11 characters long';
        }

        if (!form.accountHolderName) {
            newErrors.accountHolderName = 'Account holder name is required';
        }

        if (!form.accountNumber) {
            newErrors.accountNumber = 'Account number is required';
        } else if (!/^\d{9,18}$/.test(form.accountNumber)) {
            newErrors.accountNumber = 'Please enter a valid account number (9-18 digits)';
        }

        if (!form.paymentGateway) {
            newErrors.paymentGateway = 'Please select an option';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Convert to the format expected by the parent component
            
            const payload = {
                ...formData,
                ifscCode: form.ifscCode,
                accountName: form.accountHolderName,
                accountNumber: form.accountNumber,
                wantPaymentGateway: form.paymentGateway === 'yes',
                bankName: ifscStatus.bank || '',
                bankBranch: ifscStatus.branch || ''
            };
            console.log('Sending data as JSON:', JSON.stringify(payload));
            debugger
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            toast.success("Partner Registration Successfully");
            router.push('/');
            // onNext(formattedData);
        }
    };

    // Update progress in localStorage
    useEffect(() => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const savedProgress = JSON.parse(localStorage.getItem('formProgress') || '{"completed":0,"percent":0}');

            // Count filled fields on this page
            let filledFields = 0;
            if (form.ifscCode) filledFields++;
            if (form.accountHolderName) filledFields++;
            if (form.accountNumber) filledFields++;
            if (form.paymentGateway) filledFields++;

            // Calculate new progress
            const totalFields = 16; // Total fields across all forms
            const percent = Math.round(((savedProgress.page1 || 0) + (savedProgress.page2 || 0) + filledFields) / totalFields * 100);

            // Save to localStorage
            localStorage.setItem('formProgress', JSON.stringify({
                completed: (savedProgress.page1 || 0) + (savedProgress.page2 || 0) + filledFields,
                percent: percent,
                page1: savedProgress.page1 || 0,
                page2: savedProgress.page2 || 0,
                page3: filledFields
            }));
        }
    }, [form]);

    return (
        <>
            {/* Hero Section */}

            <Toaster position='top-center' />
            <div className="hero d-none d-md-block">
                <div className="hero-content px-4 py-5">
                    <h1 className="fs-2 fs-md-1 mb-4">Complete Your Registration</h1>
                    <p className="mb-4">We need your bank details for payment processing.</p>
                    <ul className="mb-4 ps-3 ps-md-4">
                        <li className="mb-2">Secure and encrypted transmission</li>
                        <li className="mb-2">Required for payout processing</li>
                        <li className="mb-2">Your information is protected</li>
                    </ul>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container px-4 py-4 py-md-5 mx-auto" style={{ maxWidth: '600px' }}>
                    <RegistrationProgress currentStep={3} />
                    <h2 className="text-center mb-4 fs-3 fs-md-2">Bank Details</h2>

                    {/* Points Counter - Moved from bottom to here */}
                    {/* <div className="points-counter mb-4 d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <span>Points: <span id="points" className="fw-bold">60</span>/100</span>
                            <span className="text-muted small">Complete registration to earn all points</span>
                        </div>
                        <div className="progress-container w-100">
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div> */}

                    <form id="bankDetailsForm" onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label className="mb-2">Do you also want to sign up for your own payment gateway?</label>
                            <div className="d-flex flex-wrap gap-3 gap-md-4 mt-2">
                                <div className="form-check me-3 me-md-0">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentGateway"
                                        id="paymentGatewayYes"
                                        value="yes"
                                        checked={form.paymentGateway === 'yes'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="paymentGatewayYes">Yes</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="paymentGateway"
                                        id="paymentGatewayNo"
                                        value="no"
                                        checked={form.paymentGateway === 'no'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="paymentGatewayNo">No</label>
                                </div>
                            </div>
                            {errors.paymentGateway && <div className="invalid-feedback d-block">{errors.paymentGateway}</div>}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="ifsc-code" className="mb-2">Enter IFSC Code</label>
                            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-2 gap-2">
                                <input
                                    type="text"
                                    id="ifsc-code"
                                    name="ifscCode"
                                    className={`form-control ${errors.ifscCode ? 'is-invalid' : ''}`}
                                    placeholder="IFSC Code"
                                    value={form.ifscCode}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={verifyIFSC}
                                    disabled={isVerifying}
                                >
                                    {isVerifying ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Verifying...
                                        </>
                                    ) : (
                                        'Verify'
                                    )}
                                </button>
                            </div>
                            {errors.ifscCode && <div className="invalid-feedback d-block">{errors.ifscCode}</div>}
                            {ifscStatus.verified && (
                                <div id="bank-details-display" className="text-muted small mt-2 p-2 bg-light rounded">
                                    <div><strong>Bank Name:</strong> <span id="bank-name">{ifscStatus.bank}</span></div>
                                    <div><strong>Branch:</strong> <span id="bank-branch">{ifscStatus.branch}</span></div>
                                </div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="account-name" className="mb-2">Account Holder&apos;s Name</label>
                            <input
                                type="text"
                                id="account-name"
                                name="accountHolderName"
                                className={`form-control ${errors.accountHolderName ? 'is-invalid' : ''}`}
                                placeholder="Account Holder Name"
                                value={form.accountHolderName}
                                onChange={handleChange}
                                required
                            />
                            {errors.accountHolderName && <div className="invalid-feedback d-block">{errors.accountHolderName}</div>}
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="account-number" className="mb-2">Account Number</label>
                            <input
                                type="text"
                                id="account-number"
                                name="accountNumber"
                                className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
                                placeholder="Account Number"
                                value={form.accountNumber}
                                onChange={handleChange}
                                required
                            />
                            {errors.accountNumber && <div className="invalid-feedback d-block">{errors.accountNumber}</div>}
                        </div>

                        <div className="form-navigation d-flex justify-content-between mt-4">
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