"use client";

import React from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaEnvelope, FaPhoneAlt, FaHeadset } from 'react-icons/fa';

interface RegistrationCompleteProps {
    userData?: {
        businessName?: string;
        contactPerson?: string;
        email?: string;
    };
}

const RegistrationComplete: React.FC<RegistrationCompleteProps> = ({ userData }) => {
    const businessName = userData?.businessName || 'your business';
    const contactPerson = userData?.contactPerson || 'there';
    const email = userData?.email;

    return (
        <div className="registration-complete-container">
            <div className="success-card">
                <div className="success-icon">
                    <FaCheckCircle size={80} color="#28a745" />
                </div>

                <h1>Registration Complete!</h1>
                <h2>Thank you for registering {businessName}</h2>

                <div className="message-container">
                    <p>Hi {contactPerson},</p>
                    <p>
                        Your registration has been successfully submitted. Our team will review your
                        application and documents within 2-3 business days.
                    </p>
                    {email && (
                        <p>
                            A confirmation email has been sent to <strong>{email}</strong>. Please check your inbox
                            (and spam folder) for further instructions.
                        </p>
                    )}
                    <p>
                        Once your account is approved, you'll receive access credentials to your seller dashboard
                        where you can start listing your products and managing your business on our marketplace.
                    </p>
                </div>

                <div className="next-steps">
                    <h3>What's Next?</h3>
                    <ol>
                        <li>Verification of your submitted documents (2-3 business days)</li>
                        <li>Account activation email with login credentials</li>
                        <li>Complete your seller profile and product catalog</li>
                        <li>Start selling on GrowLimitLess!</li>
                    </ol>
                </div>

                <div className="support-info">
                    <h3>Need Help?</h3>
                    <p>If you have any questions or need assistance, please contact our support team:</p>

                    <div className="contact-options">
                        <div className="contact-option">
                            <FaEnvelope />
                            <span>support@growlimitless.com</span>
                        </div>
                        <div className="contact-option">
                            <FaPhoneAlt />
                            <span>+91 123-456-7890</span>
                        </div>
                        <div className="contact-option">
                            <FaHeadset />
                            <span>Live Chat (9 AM - 6 PM, Monday-Friday)</span>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <Link href="/" className="btn btn-primary">
                        Return to Homepage
                    </Link>
                    <Link href="/login" className="btn btn-outline-secondary">
                        Go to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationComplete; 