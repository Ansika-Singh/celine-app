"use client";

import { motion } from "framer-motion";

export function CelineLogo({ size = 32 }) {
  return (
    <div className="flex items-center gap-2">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D5EF5" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#00FFB3" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50"
          stroke="url(#logoGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx="70"
          cy="30"
          r="8"
          fill="#00FFB3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        />
      </motion.svg>
      <motion.span 
        className="font-display font-bold tracking-tight text-white"
        style={{ fontSize: size * 0.8 }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Celine<span className="text-primary">.</span>
      </motion.span>
    </div>
  );
}
