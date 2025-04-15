"use client";

import React, { useState, useRef } from 'react';
import RegistrationProgress from './RegistrationProgress';

interface Step2Props {
    formData: {
        gstNumber: string;
        companyName: string;
        companyAddress: string;
        companyType: string;
        msmeCertificate: any;
        oemCertificate: any;
        fy2324Data: any;
        fy2425Data: any;
    };
    onNext: (data: any) => void;
    onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ formData, onNext, onBack }) => {
    const [form, setForm] = useState({
        gstNumber: formData.gstNumber || '',
        companyName: formData.companyName || '',
        companyAddress: formData.companyAddress || '',
        companyType: formData.companyType || '',
        msmeCertificate: formData.msmeCertificate || null,
        oemCertificate: formData.oemCertificate || null,
        fy2324Data: formData.fy2324Data || null,
        fy2425Data: formData.fy2425Data || null
    });

    const [showCertificates, setShowCertificates] = useState(!!form.companyType);
    const [companyDetails, setCompanyDetails] = useState<{ display: boolean, name?: string, address?: string }>({
        display: false
    });

    const msmeFileRef = useRef<HTMLInputElement>(null);
    const oemFileRef = useRef<HTMLInputElement>(null);
    const fy2324Ref = useRef<HTMLInputElement>(null);
    const fy2425Ref = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            console.log('File name:', file.name);
            console.log('File size:', file.size);
            console.log('File type:', file.type);
        } else {
            console.log('No file selected.');
        }
        // if (files && files.length > 0) {
        //     setForm({
        //         ...form,
        //         [name]: files[0]
        //     });
        // }

    };

    const selectCompanyType = (type: string) => {
        setForm({
            ...form,
            companyType: type
        });
        setShowCertificates(true);
    };

    const verifyGST = async () => {
        const gstNumber = form.gstNumber.trim();

        if (gstNumber.length !== 15) {
            alert('GST number must be 15 characters long');
            return;
        }

        try {
            // This is a mock verification - in a real app, you would call an actual GST API
            // const response = await fetch(`http://sheet.gstincheck.co.in/check/262500cc3be01c84505a267d44d49d58/${gstNumber}`);
            // const data = await response.json();

            // For demo purposes, we'll just set some mock data
            const mockCompanyName = "Demo Company Pvt Ltd";
            const mockAddress = "123 Business Street, Business City";

            setCompanyDetails({
                display: true,
                name: mockCompanyName,
                address: mockAddress
            });

            // Auto-fill company name and address fields
            setForm({
                ...form,
                companyName: mockCompanyName,
                companyAddress: mockAddress
            });

        } catch (error) {
            alert('Error verifying GST: ' + (error as Error).message);
            setCompanyDetails({ display: false });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Form validation
        if (!form.gstNumber || !form.companyName || !form.companyAddress) {
            alert('Please fill in all required fields');
            return;
        }

        if (!form.companyType) {
            alert('Please select your company type');
            return;
        }

        // Validate required certificates based on company type
        if (form.companyType === 'trader' && !form.msmeCertificate) {
            alert('Please upload MSME Certificate');
            return;
        }

        if (form.companyType === 'manufacturer' && !form.oemCertificate) {
            alert('Please upload OEM Certificate');
            return;
        }

        onNext(form);
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero">
                <div className="hero-content">
                    <h1>Your Business Deserves a Bigger Stage!</h1>
                    <p>We understand your business is unique, and so are your needs.</p>
                    <ul>
                        <li>Tell us who you are—whether you're a Trader or an OEM.</li>
                        <li>Get featured in an ecosystem designed for growth</li>
                        <li>No inventory? No problem. Sell smarter with Anti Mascot</li>
                    </ul>
                    <blockquote>Your success is our mission</blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <RegistrationProgress currentStep={2} />

                    <h2 className="text-center mb-4">Company Details</h2>
                    <p className="text-center mb-4">Enter your company information</p>

                    <form id="companyForm" onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="gst-number">Enter GST number</label>
                            <div className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    id="gst-number"
                                    name="gstNumber"
                                    className="form-control"
                                    placeholder="GST number"
                                    value={form.gstNumber}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary verify-btn"
                                    onClick={verifyGST}
                                >
                                    Verify
                                </button>
                            </div>
                            {companyDetails.display && (
                                <div id="company-details" className="company-details">
                                    <div><strong>Company Name:</strong> <span id="company-name">{companyDetails.name}</span></div>
                                    <div><strong>Address:</strong> <span id="company-address">{companyDetails.address}</span></div>
                                </div>
                            )}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="company-name-input">Enter company name</label>
                            <input
                                type="text"
                                id="company-name-input"
                                name="companyName"
                                className="form-control"
                                placeholder="Company name"
                                value={form.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="company-address-input">Enter company address</label>
                            <input
                                type="text"
                                id="company-address-input"
                                name="companyAddress"
                                className="form-control"
                                placeholder="Company address"
                                value={form.companyAddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label>Company Type</label>
                            <div className="company-type">
                                <div
                                    className={`type-option ${form.companyType === 'trader' ? 'selected' : ''}`}
                                    id="trader-option"
                                    onClick={() => selectCompanyType('trader')}
                                >
                                    <h3>I am a Trader</h3>
                                </div>
                                <div
                                    className={`type-option ${form.companyType === 'manufacturer' ? 'selected' : ''}`}
                                    id="manufacturer-option"
                                    onClick={() => selectCompanyType('manufacturer')}
                                >
                                    <h3>I am a Manufacturer / OEM</h3>
                                </div>
                            </div>
                        </div>
                        {showCertificates && (
                            <div className="certificate-upload">
                                {form.companyType === 'trader' && (
                                    <div className="form-group mb-3" id="msme-upload-container">
                                        <label htmlFor="msme-certificate">Upload MSME Certificate (PDF/Image)</label>
                                        <input
                                            type="file"
                                            id="msme-certificate"
                                            name="msmeCertificate"
                                            className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            ref={msmeFileRef}
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-muted">Required for Traders</small>
                                    </div>
                                )}
                                {form.companyType === 'manufacturer' && (
                                    <div className="form-group mb-3" id="oem-upload-container">
                                        <label htmlFor="oem-certificate">Upload OEM Certificate (PDF/Image)</label>
                                        <input
                                            type="file"
                                            id="oem-certificate"
                                            name="oemCertificate"
                                            className="form-control"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            ref={oemFileRef}
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-muted">Required for Manufacturers</small>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="certificate-upload">
                            <div className="form-group mb-3">
                                <label htmlFor="fy24-25-data">Upload FY 24-25 Data (Optional)</label>
                                <input
                                    type="file"
                                    id="fy24-25-data"
                                    name="fy2425Data"
                                    className="form-control"
                                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                                    ref={fy2425Ref}
                                    onChange={handleFileChange}
                                />
                                <small className="text-muted">PDF, Excel, Word or Image files</small>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="fy23-24-data">Upload FY 23-24 Data (Optional)</label>
                                <input
                                    type="file"
                                    id="fy23-24-data"
                                    name="fy2324Data"
                                    className="form-control"
                                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                                    ref={fy2324Ref}
                                    onChange={handleFileChange}
                                />
                                <small className="text-muted">PDF, Excel, Word or Image files</small>
                            </div>
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

export default Step2; 