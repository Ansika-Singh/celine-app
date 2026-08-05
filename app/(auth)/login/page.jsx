"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ShaderAnimation } from '@/components/ui/shader-lines';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { setUser } = useAppContext();

  const handleAuth = (e) => {
    e.preventDefault();
    // Mocking auth for now
    setUser({ bizName: "Enterprise Client", ownerName: "Demo User", bizType: "SaaS", language: "English", role: "Owner" });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-[#050505] text-white font-sans relative">
      <ShaderAnimation />
      <div className="absolute inset-0 bg-[#050505]/60 pointer-events-none z-0" />

      {/* Left side: Animated Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center relative overflow-hidden border-r border-white/10 p-12 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-transparent to-transparent pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="relative z-10 max-w-md"
        >
          <div className="text-4xl font-bold tracking-tighter mb-4">Celine<span className="text-blue-500">.</span></div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-200">Scale your enterprise with intelligent, secure workflows.</h2>
          <div className="flex gap-4 items-center p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              SJ
            </div>
            <div>
              <p className="text-sm font-medium">"The most secure AI platform we've deployed."</p>
              <p className="text-xs text-gray-400">Sarah Jenkins, CTO</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div 
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Create your account'}</h2>
              <p className="text-gray-400 mb-8">
                {isLogin ? 'Enter your credentials to access your workspace.' : 'Start automating with secure AI today.'}
              </p>

              <form className="space-y-4" onSubmit={handleAuth}>
                {!isLogin && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                    <input type="text" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="Jane Doe" required />
                  </div>
                )}
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300">Work Email</label>
                  <input type="email" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="name@company.com" required />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <input type="password" className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition" placeholder="••••••••" required />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black font-semibold rounded-xl px-4 py-3 mt-4"
                  type="submit"
                >
                  {isLogin ? 'Sign In to Workspace' : 'Register Account'}
                </motion.button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-white hover:text-blue-400 font-medium transition">
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Protected by AES-256 Encryption & OAuth 2.0
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
