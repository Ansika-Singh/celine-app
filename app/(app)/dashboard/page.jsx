"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { BarChart, Users, DollarSign, Activity, FileText, Bell } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAppContext();

  if (!user) return null; // In real app, middleware handles redirect

  const stats = [
    { label: "Total Revenue", value: "₹24,500", icon: <DollarSign size={20} className="text-accent" />, trend: "+12%" },
    { label: "Active Customers", value: "142", icon: <Users size={20} className="text-secondary" />, trend: "+5%" },
    { label: "System Health", value: "99.9%", icon: <Activity size={20} className="text-primary" />, trend: "Stable" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto w-full min-h-screen bg-background text-text selection:bg-primary selection:text-white">
      
      <header className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-display font-bold mb-2">Welcome back, {user.ownerName}</h1>
          <p className="text-textMuted">Here's what's happening with {user.bizName} today.</p>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
          <button className="p-3 rounded-full bg-surface border border-white/10 hover:bg-surfaceLight transition-colors">
            <Bell size={20} className="text-textMuted" />
          </button>
          <Link href="/settings">
            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/30 transition-colors">
              {user.ownerName.charAt(0)}
            </div>
          </Link>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-surfaceLight/40 backdrop-blur-xl border border-white/10"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-white/5">
                {s.icon}
              </div>
              <div className="text-xs font-semibold px-2 py-1 rounded-md bg-white/5 text-textMuted">
                {s.trend}
              </div>
            </div>
            <div className="text-3xl font-bold font-display mb-1">{s.value}</div>
            <div className="text-sm text-textMuted">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-6 rounded-2xl bg-surfaceLight/40 backdrop-blur-xl border border-white/10 min-h-[400px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-display">Revenue Overview</h2>
            <button className="text-sm text-primary hover:underline">View Report</button>
          </div>
          
          <div className="flex-1 border border-white/5 border-dashed rounded-xl flex items-center justify-center bg-surface/30">
            <BarChart size={48} className="text-textMuted/30" />
            <span className="ml-4 text-textMuted font-medium">Recharts Integration Pending</span>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl bg-surfaceLight/40 backdrop-blur-xl border border-white/10"
        >
          <h2 className="text-xl font-bold font-display mb-6">Recent Files</h2>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-white/5">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Q3_Analysis_v{i}.pdf</div>
                  <div className="text-xs text-textMuted">2 hours ago</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
