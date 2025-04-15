"use client";

import React, { useState } from 'react';
import RegistrationProgress from './RegistrationProgress';

interface Step4Props {
    formData: {
        categories: string[];
        productCount: string;
        productionCapacity: string;
        inventoryManagement: string;
        exportExperience: boolean;
        exportDestinations: string[];
    };
    onNext: (data: any) => void;
    onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ formData, onNext, onBack }) => {
    const [form, setForm] = useState({
        categories: formData.categories || [],
        productCount: formData.productCount || '',
        productionCapacity: formData.productionCapacity || '',
        inventoryManagement: formData.inventoryManagement || '',
        exportExperience: formData.exportExperience || false,
        exportDestinations: formData.exportDestinations || []
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Available categories for selection
    const categoryOptions = [
        'Apparel & Clothing',
        'Beauty & Personal Care',
        'Electronics & Appliances',
        'Food & Beverages',
        'Furniture & Home Decor',
        'Handicrafts & Artisanal Products',
        'Health & Wellness',
        'Jewelry & Accessories',
        'Leather Goods',
        'Organic & Eco-friendly Products',
        'Textiles & Fabrics',
        'Toys & Games',
        'Other'
    ];

    // Available export destinations for selection
    const destinationOptions = [
        'North America',
        'Europe',
        'Middle East',
        'Asia Pacific',
        'Africa',
        'South America',
        'Australia',
        'Other'
    ];

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

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setForm({
            ...form,
            [name]: checked
        });
    };

    const handleCategoryChange = (category: string) => {
        const updatedCategories = form.categories.includes(category)
            ? form.categories.filter(c => c !== category)
            : [...form.categories, category];

        setForm({
            ...form,
            categories: updatedCategories
        });

        // Clear category error if at least one is selected
        if (updatedCategories.length > 0 && errors.categories) {
            setErrors({
                ...errors,
                categories: ''
            });
        }
    };

    const handleDestinationChange = (destination: string) => {
        if (!form.exportExperience) return;

        const updatedDestinations = form.exportDestinations.includes(destination)
            ? form.exportDestinations.filter(d => d !== destination)
            : [...form.exportDestinations, destination];

        setForm({
            ...form,
            exportDestinations: updatedDestinations
        });

        // Clear destination error if at least one is selected (when export experience is true)
        if (updatedDestinations.length > 0 && errors.exportDestinations) {
            setErrors({
                ...errors,
                exportDestinations: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (form.categories.length === 0) {
            newErrors.categories = 'Please select at least one product category';
        }

        if (!form.productCount) {
            newErrors.productCount = 'Please select your approximate product count';
        }

        if (!form.productionCapacity) {
            newErrors.productionCapacity = 'Please select your monthly production capacity';
        }

        if (!form.inventoryManagement) {
            newErrors.inventoryManagement = 'Please select how you manage your inventory';
        }

        if (form.exportExperience && form.exportDestinations.length === 0) {
            newErrors.exportDestinations = 'Please select at least one export destination';
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
                    <h1>Product Information</h1>
                    <p>Tell us about the products you offer and your manufacturing capacity.</p>
                    <ul>
                        <li>This helps us match you with the right buyers</li>
                        <li>Be specific about your production capabilities</li>
                        <li>Your export experience can open new global opportunities</li>
                    </ul>
                    <blockquote>The more we know about your products, the better we can help you grow</blockquote>
                </div>
            </div>

            {/* Form Section */}
            <div className="form-section">
                <div className="form-container">
                    <RegistrationProgress currentStep={4} />

                    <h2 className="text-center mb-4">Product Details</h2>
                    <p className="text-center mb-4">Tell us about what you sell and produce</p>

                    <form id="productForm" onSubmit={handleSubmit}>
                        <div className="form-group mb-4">
                            <label>Product Categories <span className="text-danger">*</span></label>
                            <p className="small text-muted mb-2">Select all categories that apply to your products</p>

                            <div className="categories-container">
                                {categoryOptions.map(category => (
                                    <div className="form-check" key={category}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                                            checked={form.categories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                                        >
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.categories && <div className="text-danger mt-2 small">{errors.categories}</div>}
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="product-count">Number of Products</label>
                                    <select
                                        id="product-count"
                                        name="productCount"
                                        className={`form-select ${errors.productCount ? 'is-invalid' : ''}`}
                                        value={form.productCount}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select approximate number</option>
                                        <option value="1-10">1-10 products</option>
                                        <option value="11-50">11-50 products</option>
                                        <option value="51-100">51-100 products</option>
                                        <option value="101-500">101-500 products</option>
                                        <option value="501-1000">501-1000 products</option>
                                        <option value="1000+">More than 1000 products</option>
                                    </select>
                                    {errors.productCount && <div className="invalid-feedback">{errors.productCount}</div>}
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="production-capacity">Monthly Production Capacity</label>
                                    <select
                                        id="production-capacity"
                                        name="productionCapacity"
                                        className={`form-select ${errors.productionCapacity ? 'is-invalid' : ''}`}
                                        value={form.productionCapacity}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select production capacity</option>
                                        <option value="small-batch">Small Batch (Less than 100 units)</option>
                                        <option value="medium-batch">Medium Batch (100-500 units)</option>
                                        <option value="large-batch">Large Batch (501-1000 units)</option>
                                        <option value="mass-production">Mass Production (1000+ units)</option>
                                        <option value="custom">Custom/Made-to-Order only</option>
                                    </select>
                                    {errors.productionCapacity && <div className="invalid-feedback">{errors.productionCapacity}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="inventory-management">How do you manage inventory?</label>
                            <select
                                id="inventory-management"
                                name="inventoryManagement"
                                className={`form-select ${errors.inventoryManagement ? 'is-invalid' : ''}`}
                                value={form.inventoryManagement}
                                onChange={handleChange}
                            >
                                <option value="">Select inventory management method</option>
                                <option value="manual">Manual tracking (spreadsheets, paper records)</option>
                                <option value="basic-software">Basic inventory software</option>
                                <option value="erp">ERP system</option>
                                <option value="just-in-time">Just-in-time production (minimal inventory)</option>
                                <option value="third-party">Third-party logistics provider</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.inventoryManagement && <div className="invalid-feedback">{errors.inventoryManagement}</div>}
                        </div>

                        <div className="form-group mb-4">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="export-experience"
                                    name="exportExperience"
                                    checked={form.exportExperience}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="export-experience">
                                    Do you have experience exporting your products?
                                </label>
                            </div>
                        </div>

                        {form.exportExperience && (
                            <div className="form-group mb-4 export-destinations-section">
                                <label>Export Destinations <span className="text-danger">*</span></label>
                                <p className="small text-muted mb-2">Select regions where you currently export or have exported in the past</p>

                                <div className="destinations-container">
                                    {destinationOptions.map(destination => (
                                        <div className="form-check" key={destination}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`destination-${destination.toLowerCase().replace(/\s+/g, '-')}`}
                                                checked={form.exportDestinations.includes(destination)}
                                                onChange={() => handleDestinationChange(destination)}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={`destination-${destination.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                {destination}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.exportDestinations && <div className="text-danger mt-2 small">{errors.exportDestinations}</div>}
                            </div>
                        )}

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

export default Step4; 