"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, MessageSquare, FolderKanban, Bot, BarChart2, Settings, LogOut } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { user, setUser } = useAppContext();

  if (!user) {
    // In real app, NextJS middleware handles this.
    // For now, render children so they can redirect or we can let them hit the mock login.
    return <div className="bg-background text-text min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  const nav = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Chats", href: "/chats", icon: <MessageSquare size={20} /> },
    { name: "Projects", href: "/projects", icon: <FolderKanban size={20} /> },
    { name: "AI Agents", href: "/agents", icon: <Bot size={20} /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background text-text font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-surface/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-xl font-bold font-display tracking-tight">
            Celine <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {nav.map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? "bg-primary text-white" : "text-textMuted hover:text-white hover:bg-white/5"}`}>
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${pathname === "/settings" ? "bg-primary text-white" : "text-textMuted hover:text-white hover:bg-white/5"}`}>
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <button 
            onClick={() => {
              setUser(null);
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-surfaceLight/20">
        {children}
      </main>

    </div>
  );
}
