"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './login.css';

export default function LoginPage() {
    return (
        <>
            <Header />
            <main>
                <section className="login-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="login-card">
                                    <h2>Partner Login</h2>
                                    <p>Welcome back! Please log in to access your account.</p>

                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address</label>
                                            <input type="email" className="form-control" id="email" required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" required />
                                        </div>

                                        <div className="form-group form-check">
                                            <input type="checkbox" className="form-check-input" id="remember" />
                                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                                    </form>

                                    <div className="login-footer">
                                        <p>Forgot your password? <a href="#">Reset it here</a></p>
                                        <p>Don't have an account? <Link href="/registration">Register now</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
} 