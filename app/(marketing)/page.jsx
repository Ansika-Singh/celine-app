"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { ShaderAnimation } from '@/components/ui/shader-lines';
import { CelineLogo } from '@/components/ui/Logo';
import { 
  ShieldCheck, Zap, Cloud, Bot, Code, Users, 
  ChevronRight, Sparkles, Workflow, ArrowRight 
} from 'lucide-react';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-primary selection:text-white">
      
      {/* Floating Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-[#050505]/40 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
        <CelineLogo size={24} />
        <div className="hidden md:flex gap-8 text-sm font-medium text-textMuted">
          <Link href="#features" className="hover:text-white transition">Features</Link>
          <Link href="#workflow" className="hover:text-white transition">Workflow</Link>
          <Link href="#security" className="hover:text-white transition">Security</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition font-medium">Sign In</Link>
          <Link href="/login" className="px-6 py-2.5 text-sm bg-white text-black rounded-full font-bold hover:bg-gray-200 transition transform hover:scale-105">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-4 text-center">
        <ShaderAnimation />
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-[#050505]/80 to-[#050505] pointer-events-none" />
        
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-primary bg-primary/10 rounded-full mb-8 border border-primary/20 shadow-[0_0_20px_rgba(109,94,245,0.2)]">
            <Sparkles size={14} /> CELINE 2.0 IS LIVE
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 font-display leading-[1.1]">
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-pulse">
              Intelligent Conversations
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-textMuted max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Celine helps enterprise teams communicate, automate, and build faster with secure, edge-native AI workflows.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
            <Link href="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2"
              >
                Start Building <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link href="#features">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-surface text-white border border-white/10 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-white/5 transition"
              >
                Explore Platform
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Marquee */}
        <div className="absolute bottom-10 w-full overflow-hidden border-y border-white/5 bg-[#050505]/50 backdrop-blur-md py-6 z-10">
          <p className="text-center text-xs font-bold tracking-widest text-textMuted mb-4 uppercase">Trusted by innovative teams worldwide</p>
          <div className="flex gap-16 whitespace-nowrap animate-[marquee_30s_linear_infinite] opacity-50 hover:opacity-100 transition-opacity duration-500">
            {['Acme Corp', 'GlobalTech', 'Nexus Industries', 'Quantum AI', 'Stark Enterprise', 'Acme Corp', 'GlobalTech', 'Nexus Industries', 'Quantum AI', 'Stark Enterprise'].map((logo, i) => (
              <span key={i} className="text-xl font-display font-bold text-white">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Everything you need.<br/>Nothing you don't.</h2>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">A unified platform that replaces a dozen scattered tools with one elegant, high-performance workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-surface border border-white/10 rounded-[2rem] p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
            <Bot size={48} className="text-primary mb-6" />
            <h3 className="text-3xl font-display font-bold mb-4">Autonomous Agents</h3>
            <p className="text-lg text-textMuted max-w-md">Deploy custom AI agents that understand your business logic and communicate securely with your database.</p>
          </motion.div>

          {/* Card 2: Speed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-surface border border-white/10 rounded-[2rem] p-10 relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
            <Zap size={48} className="text-secondary mb-6" />
            <h3 className="text-2xl font-display font-bold mb-4">Edge Native</h3>
            <p className="text-textMuted">Sub-50ms latency worldwide with advanced edge routing.</p>
          </motion.div>

          {/* Card 3: Cloud Sync */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-surface border border-white/10 rounded-[2rem] p-10 relative overflow-hidden group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
            <Cloud size={48} className="text-accent mb-6" />
            <h3 className="text-2xl font-display font-bold mb-4">Real-time Sync</h3>
            <p className="text-textMuted">Changes instantly propagate across all your devices.</p>
          </motion.div>

          {/* Card 4: Dev DX */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-surface border border-white/10 rounded-[2rem] p-10 relative overflow-hidden group flex flex-col md:flex-row items-center gap-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-danger/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-700" />
            <div className="flex-1">
              <Code size={48} className="text-danger mb-6" />
              <h3 className="text-3xl font-display font-bold mb-4">Developer First</h3>
              <p className="text-lg text-textMuted">Integrate Celine into your existing stack with our REST API, Webhooks, and typed SDKs.</p>
            </div>
            <div className="w-full md:w-1/2 h-48 bg-[#050505] rounded-xl border border-white/10 p-4 font-mono text-xs text-textMuted flex flex-col justify-center">
              <span className="text-primary">import</span> &#123; CelineClient &#125; <span className="text-primary">from</span> '@celine/sdk';<br/><br/>
              <span className="text-secondary">const</span> client = <span className="text-primary">new</span> CelineClient('api_key');<br/><br/>
              <span className="text-secondary">await</span> client.agents.<span className="text-accent">deploy</span>(&#123;<br/>
              &nbsp;&nbsp;name: 'SalesBot',<br/>
              &nbsp;&nbsp;model: 'gpt-4'<br/>
              &#125;);
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 px-6 bg-surfaceLight/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="flex-1"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-900/20 border border-green-500/30 flex items-center justify-center mb-8">
              <ShieldCheck size={40} className="text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Bank-grade security. <br/>By default.</h2>
            <p className="text-xl text-textMuted mb-8">Your intellectual property is encrypted at rest and in transit. Industry-standard protocols ensure your data remains strictly yours.</p>
            
            <div className="space-y-4">
              {[
                "AES-256 Encryption at Rest",
                "OAuth 2.0 & JWT Sessions",
                "Strict Role-Based Access Control",
                "SOC2 Type II Certified Architecture"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
            <div className="aspect-square max-w-md mx-auto rounded-full border border-white/10 relative flex items-center justify-center">
              <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-white/5 border-dashed animate-[spin_15s_linear_infinite_reverse]" />
              <div className="w-32 h-32 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                <ShieldCheck size={48} className="text-secondary" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-[#050505] to-[#050505] pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <CelineLogo size={48} />
          <h2 className="text-5xl font-display font-bold mt-8 mb-6">Ready to scale?</h2>
          <p className="text-xl text-textMuted mb-10">Join thousands of enterprise teams building the future on Celine.</p>
          <Link href="/login">
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
              Get Started for Free
            </button>
          </Link>
        </motion.div>
        
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-textMuted max-w-7xl mx-auto relative z-10">
          <p>© 2026 Celine Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Twitter</Link>
            <Link href="#" className="hover:text-white transition">GitHub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
