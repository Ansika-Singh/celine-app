"use client";

import Link from "next/link";
import { ArrowRight, WifiOff, Mic, Receipt, ArrowUpRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="landing-page" style={{ backgroundColor: "#F3F1EC", minHeight: "100vh", color: "#14171F", fontFamily: "var(--font-inter), sans-serif" }}>
      
      {/* Navigation */}
      <nav style={{ padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(20, 23, 31, 0.1)" }}>
        <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Celine <div style={{ width: 6, height: 6, backgroundColor: "#E8A33D", borderRadius: "50%" }} />
        </div>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <button style={{ backgroundColor: "#14171F", color: "#F3F1EC", border: "none", padding: "0.5rem 1.25rem", borderRadius: "4px", fontSize: "0.875rem", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Open App <ArrowRight size={16} />
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", border: "1px solid #14171F", borderRadius: "50px", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2rem" }}>
          The Digital Khata for India 🇮🇳
        </div>
        
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          Run your business. <br />
          <span style={{ position: "relative" }}>
            Even offline.
            <svg style={{ position: "absolute", bottom: "-10px", left: 0, width: "100%", height: "12px", zIndex: 0 }} viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M2 9.5C48.5 3.5 120.5 -1.5 198 9.5" stroke="#E8A33D" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        
        <p style={{ fontSize: "1.25rem", color: "#4A4D59", maxWidth: "600px", margin: "0 auto 3rem auto", lineHeight: 1.6 }}>
          An AI-powered Point-of-Sale and CRM built specifically for Indian street vendors. Track Udhar, manage inventory, and print receipts—with zero network dependency.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button style={{ backgroundColor: "#E8A33D", color: "#14171F", border: "none", padding: "1rem 2rem", borderRadius: "4px", fontSize: "1rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", transition: "transform 0.1s" }} onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
              Launch Dashboard <ArrowUpRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: "4rem 2rem 6rem 2rem", maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid rgba(20, 23, 31, 0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          
          <FeatureCard 
            icon={<WifiOff size={24} color="#E8A33D" />}
            title="Bulletproof Offline"
            desc="Keep billing when the network drops. Celine queues every action locally and silently syncs to the cloud when you reconnect. No data lost."
          />
          
          <FeatureCard 
            icon={<Mic size={24} color="#E8A33D" />}
            title="Voice Navigation"
            desc="Hands full? Navigate your entire store using just your voice in English or Hindi. Simply say 'Open Khata' or 'Check Udhar'."
          />
          
          <FeatureCard 
            icon={<Receipt size={24} color="#E8A33D" />}
            title="Thermal Printing"
            desc="Print gorgeous, monospaced receipts natively via bluetooth thermal printers. Works flawlessly even when entirely offline."
          />

        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ backgroundColor: "#14171F", color: "#F3F1EC", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          Celine <div style={{ width: 6, height: 6, backgroundColor: "#E8A33D", borderRadius: "50%" }} />
        </div>
        <div style={{ color: "#8B8FA3", fontSize: "0.875rem" }}>
          Built for the streets of India.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div style={{ padding: "2rem", border: "1px solid #14171F", borderRadius: "8px", backgroundColor: "#F3F1EC" }}>
      <div style={{ width: "48px", height: "48px", border: "1px solid #14171F", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", backgroundColor: "#1B1F2A" }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.25rem", marginBottom: "0.75rem", fontWeight: 600 }}>{title}</h3>
      <p style={{ color: "#4A4D59", lineHeight: 1.6, fontSize: "0.9375rem" }}>{desc}</p>
    </div>
  );
}
