"use client";

import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Facts from '@/components/Facts';
import VideoSection from '@/components/VideoSection';
import Features from '@/components/Features';
import SneakPeek from '@/components/SneakPeek';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <main id="main">
        <Facts />
        <VideoSection />
        <Features />
        <SneakPeek />
      </main>
      <Footer />
    </>
  );
}
