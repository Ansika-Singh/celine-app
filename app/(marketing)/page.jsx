"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ShaderAnimation } from '@/components/ui/shader-lines';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter">Celine<span className="text-blue-500">.</span></div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">Sign In</Link>
          <Link href="/login" className="px-4 py-2 text-sm bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
        <ShaderAnimation />
        <motion.div style={{ y }} className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          initial="hidden" animate="visible" variants={fadeUp}
          className="z-10 max-w-4xl"
        >
          <span className="px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 bg-blue-400/10 rounded-full mb-6 inline-block border border-blue-400/20">
            INTRODUCING CELINE 2.0
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-pulse">
              Intelligent Conversations
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Celine helps you communicate, automate, and create faster with secure AI-powered workflows designed for the modern enterprise.
          </p>
          <Link href="/login">
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] cursor-pointer"
            >
              Start Building
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Security & Features Bento Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Bank-grade security. By default.</h2>
          <p className="text-gray-400">Your data is encrypted at rest and in transit. Industry-standard protocols ensure your IP remains yours.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Security Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            <h3 className="text-2xl font-semibold mb-6">Secure Auth Architecture</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"/> AES-256 Encryption</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"/> OAuth 2.0 Integration</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"/> JWT Sessions</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full"/> Role-Based Access</div>
            </div>
          </motion.div>

          {/* Speed Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#111] border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-400">Built on Edge infrastructure for sub-50ms responses.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
