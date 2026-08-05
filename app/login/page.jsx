"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

export default function Login() {
  const [pin, setPin] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { setUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // Initial check to see if we are already locked out on load (optional, but good UX)
    // We can do a dummy auth check with empty pin to get state if we wanted, 
    // but the API will just return the status on the first attempt anyway.
  }, []);

  // Update error message when lockout changes
  useEffect(() => {
    if (lockoutUntil) {
      const interval = setInterval(() => {
        const remaining = lockoutUntil - Date.now();
        if (remaining <= 0) {
          setLockoutUntil(null);
          setLockoutUntil(null);
          setErrorMsg("");
          clearInterval(interval);
          setErrorMsg("");
          clearInterval(interval);
        } else {
          const mins = Math.floor(remaining / 60000);
          const secs = Math.floor((remaining % 60000) / 1000);
          setErrorMsg(`Too many attempts. Try again in ${mins}:${secs < 10 ? '0' : ''}${secs}`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutUntil]);

  const handleLogin = async (role) => {
    if (role === "Owner") {
      if (lockoutUntil) return;
      
      try {
        const res = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin })
        });
        const data = await res.json();
        
        if (!res.ok) {
          if (data.error === "locked_out") {
            setLockoutUntil(data.lockoutUntil);
          } else if (data.error === "invalid_pin") {
            setErrorMsg(`Invalid PIN. ${data.attemptsRemaining} attempts remaining.`);
          } else {
            setErrorMsg("Authentication failed.");
          }
          return;
        }
        
        // Success
        setLockoutUntil(null);
        setErrorMsg("");
      } catch (err) {
        setErrorMsg("Network error. Try again.");
        return;
      }
    }
    
    setUser({ bizName: "Celine Demo Store", ownerName: role === "Owner" ? "Demo User" : "Cashier Staff", bizType: "Retail", language: "English", role });
    router.push("/");
  };

  return (
    <div className="modal-bg" style={{ alignItems: "center", justifyContent: "center", display: "flex", background: "var(--bg)" }}>
      <div className="modal" style={{ width: 400, padding: "2.5rem" }}>
        <div style={{ fontSize: "2rem", color: "var(--gold)", textAlign: "center", marginBottom: ".5rem" }}>⬡ Celine</div>
        <div style={{ textAlign: "center", color: "var(--muted2)", marginBottom: "2rem" }}>Select your profile to continue</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ padding: "1.25rem", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: "var(--cream)", marginBottom: ".5rem" }}>Owner Login</div>
            <input 
              type="password" 
              placeholder="Enter PIN (1234)" 
              className="fi" 
              value={pin} 
              onChange={e => setPin(e.target.value)} 
              disabled={!!lockoutUntil}
              style={{ marginBottom: ".5rem", opacity: lockoutUntil ? 0.5 : 1 }} 
            />
            {errorMsg && <div style={{ color: "var(--red)", fontSize: ".8rem", marginBottom: ".5rem", textAlign: "center" }}>{errorMsg}</div>}
            <button className="btn btn-g" style={{ width: "100%", opacity: lockoutUntil ? 0.5 : 1 }} disabled={!!lockoutUntil} onClick={() => handleLogin("Owner")}>Login as Owner</button>
          </div>
          
          <div style={{ padding: "1.25rem", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 8 }}>
            <div style={{ fontWeight: 600, color: "var(--cream)", marginBottom: ".5rem" }}>Staff / Cashier Login</div>
            <button className="btn btn-o" style={{ width: "100%" }} onClick={() => handleLogin("Cashier")}>Login as Cashier</button>
          </div>
        </div>
      </div>
    </div>
  );
}
