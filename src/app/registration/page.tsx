"use client";

import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import RegistrationStep1 from '@/components/registration/Step1';
import RegistrationStep2 from '@/components/registration/Step2';
import RegistrationStep3 from '@/components/registration/Step3';
import RegistrationStep4 from '@/components/registration/Step4';
import RegistrationStep5 from '@/components/registration/Step5';
import RegistrationLayout from '@/components/registration/RegistrationLayout';
import PointsCounter from '@/components/registration/PointsCounter';
import '@/styles/registration.css';

// Define form data interface
interface FormData {
    // Personal details (Step 1)
    name: string;
    email: string;
    designation: string;
    phone: string;
    international: boolean;
    terms: boolean;

    // Company details (Step 2)
    gstNumber: string;
    companyName: string;
    companyAddress: string;
    companyType: string;
    msmeCertificate: File | null;
    oemCertificate: File | null;
    fy2324Data: File | null;
    fy2425Data: File | null;

    // Bank details (Step 3)
    wantPaymentGateway: boolean;
    ifscCode: string;
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankBranch: string;
    businessType: string;
    monthlyTurnover: string;

    // Password (Step 4)
    password: string;
    confirmPassword: string;

    // OTP (Step 5)
    emailOtp: string;

    // Additional fields for Step3
    categories: string[];
    productCount: string;
    productionCapacity: string;
    inventoryManagement: string;
    exportExperience: boolean;
    exportDestinations: string[];

    // Allow additional string indexed properties
    [key: string]: unknown;
}

export default function RegistrationPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        // Personal details (Step 1)
        name: '',
        email: '',
        designation: '',
        phone: '',
        international: false,
        terms: false,

        // Company details (Step 2)
        gstNumber: '',
        companyName: '',
        companyAddress: '',
        companyType: '',
        msmeCertificate: null,
        oemCertificate: null,
        fy2324Data: null,
        fy2425Data: null,

        // Bank details (Step 3)
        wantPaymentGateway: false,
        ifscCode: '',
        accountName: '',
        accountNumber: '',
        bankName: '',
        bankBranch: '',
        businessType: '',
        monthlyTurnover: '',

        // Password (Step 4)
        password: '',
        confirmPassword: '',

        // OTP (Step 5)
        emailOtp: '',

        // Additional fields for Step3
        categories: [],
        productCount: '',
        productionCapacity: '',
        inventoryManagement: '',
        exportExperience: false,
        exportDestinations: []
    });

    // Update localStorage when formData changes
    useEffect(() => {
        localStorage.setItem('registrationFormData', JSON.stringify(formData));
    }, [formData]);

    // Load data from localStorage on initial render
    useEffect(() => {
        const savedData = localStorage.getItem('registrationFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const getPointsForStep = (step: number): number => {
        const pointsMap: Record<number, number> = {
            1: 20,
            2: 50,
            3: 100
        };
        return pointsMap[step] || 0;
    };

    const handleNext = (stepData: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <RegistrationStep1
                    formData={formData}
                    onNext={handleNext}
                />;
            case 2:
                return <RegistrationStep2
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                />;
            case 3:
                return <RegistrationStep3
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                />;
            case 4:
                return <RegistrationStep4
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                />;
            case 5:
                return <RegistrationStep5
                    formData={formData}
                    onBack={handleBack}
                />;
            default:
                return <RegistrationStep1
                    formData={formData}
                    onNext={handleNext}
                />;
        }
    };

    return (
        <>
            <RegistrationLayout>
                {renderCurrentStep()}
            </RegistrationLayout>
            <PointsCounter points={getPointsForStep(currentStep)} />
            <Footer />
        </>
    );
} 