"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Lock, Zap, BarChart, Cloud, Folder, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text font-sans overflow-hidden selection:bg-primary selection:text-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]" />
        
        {/* Mouse Spotlight */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 backdrop-blur-md bg-surface/50">
        <div className="flex items-center gap-2 text-2xl font-bold font-display tracking-tight">
          Celine <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-textMuted hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register">
            <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white transition-all rounded-full bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(109,94,245,0.4)]">
              Get Started <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[90vh] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-semibold tracking-wider uppercase border rounded-full text-primary border-primary/30 bg-primary/10 backdrop-blur-sm"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-primary"></span>
            </span>
            Introducing Celine 2.0
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-[1.1] mb-6 max-w-4xl"
          >
            The Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Intelligent Conversations
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-2xl mb-10 text-lg md:text-xl text-textMuted leading-relaxed"
          >
            Celine helps you communicate, automate, and create faster with secure AI-powered workflows designed for the modern enterprise.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/register">
              <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 text-base font-semibold text-white transition-all rounded-full bg-primary hover:bg-primary/90 hover:scale-105 hover:shadow-[0_0_30px_rgba(109,94,245,0.5)]">
                Start Free Trial <ArrowRight size={18} />
              </button>
            </Link>
            <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-4 text-base font-semibold transition-all border rounded-full text-text border-white/10 bg-surfaceLight/50 backdrop-blur-md hover:bg-white/5 hover:scale-105">
              Watch Demo
            </button>
          </motion.div>
        </section>

        {/* Trusted By */}
        <section className="py-12 border-y border-white/5 bg-surface/30 backdrop-blur-sm overflow-hidden">
          <p className="mb-6 text-sm font-medium text-center uppercase tracking-widest text-textMuted">Trusted by innovative teams worldwide</p>
          <div className="flex w-[200%] animate-[marquee_20s_linear_infinite]">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex justify-around flex-1 items-center gap-12 px-8">
                {["OpenAI", "Google", "Microsoft", "GitHub", "Vercel", "AWS", "Stripe"].map((logo) => (
                  <div key={logo} className="text-xl font-display font-bold text-white/20 hover:text-white transition-colors cursor-default">
                    {logo}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-32 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Everything you need to scale</h2>
            <p className="text-lg text-textMuted max-w-2xl mx-auto">Enterprise-grade infrastructure packed into a beautiful, intuitive interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Bot className="text-primary" />, title: "Smart AI", desc: "Context-aware agents that learn from your interactions." },
              { icon: <Lock className="text-danger" />, title: "Secure Auth", desc: "AES-256 encryption with OAuth 2.0 and JWT sessions." },
              { icon: <Zap className="text-accent" />, title: "Lightning Fast", desc: "Built on Edge infrastructure for sub-50ms responses." },
              { icon: <BarChart className="text-secondary" />, title: "Analytics", desc: "Real-time insights into your team's usage and ROI." },
              { icon: <Cloud className="text-primary" />, title: "Cloud Sync", desc: "Seamless state synchronization across all your devices." },
              { icon: <Folder className="text-accent" />, title: "Workspace", desc: "Collaborative folders for sharing prompts and assets." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="p-8 border rounded-2xl border-white/10 bg-surfaceLight/40 backdrop-blur-md hover:bg-surfaceLight/80 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-surface mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display relative z-10">{f.title}</h3>
                <p className="text-textMuted relative z-10">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Security Section */}
        <section className="py-32 px-4 bg-surface/50 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danger/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Bank-grade security. <br/>By default.</h2>
              <p className="text-lg text-textMuted mb-8 leading-relaxed">
                Your data is encrypted at rest and in transit. We employ industry-standard protocols to ensure your intellectual property remains yours.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {["AES-256 Encryption", "OAuth 2.0", "JWT Sessions", "Role-Based Access", "Secure HTTP Cookies", "Rate Limiting"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-textMuted">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-full aspect-square max-w-md mx-auto rounded-full border border-white/10 bg-surfaceLight/50 flex items-center justify-center relative backdrop-blur-sm"
              >
                <div className="absolute inset-10 rounded-full border border-danger/30 border-dashed animate-[spin_30s_linear_infinite]" />
                <Lock size={80} className="text-danger drop-shadow-[0_0_15px_rgba(255,92,122,0.5)]" />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
