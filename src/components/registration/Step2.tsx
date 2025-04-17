"use client";

import React, { useState, useRef } from 'react';
import RegistrationProgress from './RegistrationProgress';


interface Step2Props {
    formData: {
        gstNumber: string;
        companyName: string;
        companyAddress: string;
        companyType: string;
        msmeCertificate: File | null;
        oemCertificate: File | null;
        fy2324Data: File | null;
        fy2425Data: File | null;
    };
    onNext: (data: Record<string, unknown>) => void;
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

    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files && files.length > 0) {
            const file = files[0];
            console.log('File name:', file.name);
            console.log('File size:', file.size);
            console.log('File type:', file.type);

            
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "unsigned_pdf_upload"); // your preset name

            fetch("https://api.cloudinary.com/v1_1/dgbbx9lhj/raw/upload", {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Uploaded URL:', data.secure_url);
                    setForm({
                        ...form,
                        [name]: data.secure_url
                    });
                
                })
                .catch(err => console.log("Upload failed", err));
            
            
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

        // Upload certificate files
        const uploadCertificate = async () => {
            try {
                const formData = new FormData();

                // Add the appropriate certificate based on company type
                if (form.companyType === 'trader' && form.msmeCertificate) {
                    formData.append('file', form.msmeCertificate);
                    formData.append('type', 'msme');
                } else if (form.companyType === 'manufacturer' && form.oemCertificate) {
                    formData.append('file', form.oemCertificate);
                    formData.append('type', 'oem');
                }

                // Add business details as JSON
                const metadata = {
                    companyName: form.companyName,
                    gstNumber: form.gstNumber,
                    companyType: form.companyType,
                    companyAddress: form.companyAddress
                };

                formData.append('metadata', JSON.stringify(metadata));

                // Additional files if available
                if (form.fy2324Data) {
                    formData.append('additionalFiles', form.fy2324Data);
                    formData.append('additionalFilesType', 'fy2324');
                }

                if (form.fy2425Data) {
                    formData.append('additionalFiles', form.fy2425Data);
                    formData.append('additionalFilesType', 'fy2425');
                }

                console.log('Attempting to upload to HOST_URL:8000/upload...');
                console.log('FormData entries:');
                for (const pair of formData.entries()) {
                    console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
                }

                try {
                    // Send to the upload endpoint with timeout
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
                        method: 'POST',
                        body: formData,
                        signal: controller.signal,
                        // Don't set Content-Type header, the browser will set it automatically with boundary
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(`Upload failed: ${response.status} ${response.statusText}. Details: ${errorText}`);
                    }

                    const result = await response.json();
                    console.log('Upload successful:', result);
                } catch (fetchError: unknown) {
                    if (fetchError instanceof Error && fetchError.name === 'AbortError') {
                        console.error('Request timed out');
                        throw new Error('Connection to upload server timed out. Please try again or proceed without uploading.');
                    } else {
                        console.error('Fetch error:', fetchError);
                        const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown fetch error';
                        throw new Error(`Connection error: ${errorMessage}. The server might be offline.`);
                    }
                }

                // If we reached here, either upload was successful or we're ignoring errors
                // Continue with the normal flow
                

            } catch (error) {
                console.error('Error uploading certificate:', error);

                const errorMessage = (error as Error).message || 'Unknown error occurred';
                console.log('Full error details:', error);

                // Ask user if they want to continue despite the upload error
                if (confirm(`${errorMessage}\n\nDo you want to continue with registration anyway?`)) {
                    onNext(form);
                }
            }
        };
       
        debugger
        onNext(form);
        // Start the upload process
        // uploadCertificate();
    };

    return (
        <>
            {/* Hero Section */}
            <div className="hero d-none d-md-block">
                <div className="hero-content px-4 py-5">
                    <h1 className="fs-2 fs-md-1 mb-4">Your Business Deserves a Bigger Stage!</h1>
                    <p className="mb-4">We understand your business is unique, and so are your needs.</p>
                    <ul className="mb-4 ps-3 ps-md-4">
                        <li className="mb-2">Tell us who you are—whether you&apos;re a Trader or an OEM.</li>
                        <li className="mb-2">Get featured in an ecosystem designed for growth</li>
                        <li className="mb-2">No inventory? No problem. Sell smarter with Anti Mascot</li>
                    </ul>
                    <blockquote className="border-start ps-3 border-4">Your success is our mission</blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container px-4 py-4 py-md-5 mx-auto" style={{ maxWidth: '600px' }}>
                    <RegistrationProgress currentStep={2} />
                    <h2 className="text-center mb-4 fs-3 fs-md-2">Company Details</h2>

                    {/* Points Counter */}
                    {/* <div className="points-counter mb-4 d-flex flex-column align-items-center">
                        <div className="d-flex justify-content-between w-100 mb-1">
                            <span>Points: <span id="points" className="fw-bold">40</span>/100</span>
                            <span className="text-muted small">Complete registration to earn all points</span>
                        </div>
                        <div className="progress-container w-100">
                            <div className="progress" style={{ height: '8px' }}>
                                <div className="progress-bar" style={{ width: '40%' }}></div>
                            </div>
                        </div>
                    </div> */}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="gst-number">GST Number</label>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    id="gst-number"
                                    name="gstNumber"
                                    className="form-control"
                                    placeholder="Enter GST"
                                    value={form.gstNumber}
                                    onChange={handleChange}
                                />
                                <button type="button" className="btn btn-primary ms-2" onClick={verifyGST}>Verify</button>
                            </div>
                            {companyDetails.display && (
                                <div className="mt-2 small">
                                    <div><strong>Company Name:</strong> {companyDetails.name}</div>
                                    <div><strong>Address:</strong> {companyDetails.address}</div>
                                </div>
                            )}
                        </div>

                        <div className="form-group mb-3">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                className="form-control"
                                value={form.companyName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Company Address</label>
                            <input
                                type="text"
                                name="companyAddress"
                                className="form-control"
                                value={form.companyAddress}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label>Company Type</label>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <div
                                    className={`type-option p-3 border rounded text-center flex-grow-1 ${form.companyType === 'trader' ? 'selected border-primary bg-light' : ''}`}
                                    onClick={() => selectCompanyType('trader')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h5 className="m-0">I am a Trader</h5>
                                </div>
                                <div
                                    className={`type-option p-3 border rounded text-center flex-grow-1 ${form.companyType === 'manufacturer' ? 'selected border-primary bg-light' : ''}`}
                                    onClick={() => selectCompanyType('manufacturer')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h5 className="m-0">I am a Manufacturer</h5>
                                </div>
                            </div>
                        </div>

                        {showCertificates && (
                            <>
                                {form.companyType === 'trader' && (
                                    <div className="form-group mb-3">
                                        <label>Upload MSME Certificate</label>
                                        <input
                                            type="file"
                                            name="msmeCertificate"
                                            accept='application/image/*'
                                            className="form-control"
                                            ref={msmeFileRef}
                                            onChange={handleFileChange}
                                        />
                                        <div className="form-text">Upload your MSME certificate in PDF or image format</div>
                                    </div>
                                )}
                                {form.companyType === 'manufacturer' && (
                                    <div className="form-group mb-3">
                                        <label>Upload OEM Certificate</label>
                                        <input
                                            type="file"
                                            name="oemCertificate"
                                            className="form-control"
                                            ref={oemFileRef}
                                            onChange={handleFileChange}
                                        />
                                        <div className="form-text">Upload your OEM certificate in PDF or image format</div>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="form-group mb-3">
                            <label>Upload FY 24-25 Data (Optional)</label>
                            <input
                                type="file"
                                name="fy2425Data"
                                className="form-control"
                                ref={fy2425Ref}
                                onChange={handleFileChange}
                            />
                            <div className="form-text">Upload financial data in PDF, Excel or CSV format</div>
                        </div>

                        <div className="form-group mb-3">
                            <label>Upload FY 23-24 Data (Optional)</label>
                            <input
                                type="file"
                                name="fy2324Data"
                                className="form-control"
                                ref={fy2324Ref}
                                onChange={handleFileChange}
                            />
                            <div className="form-text">Upload financial data in PDF, Excel or CSV format</div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
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