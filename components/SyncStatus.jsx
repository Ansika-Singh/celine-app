"use client";
import { useAppContext } from "@/context/AppContext";

export default function SyncStatus() {
  const { pendingSyncCount } = useAppContext();
  
  if (pendingSyncCount === 0) return null;
  
  return (
    <div style={{ position: "fixed", bottom: "1rem", left: "1rem", background: "var(--card)", padding: ".5rem 1rem", borderRadius: "20px", fontSize: ".75rem", display: "flex", alignItems: "center", gap: ".5rem", border: "1px solid var(--border)", zIndex: 9999, color: "var(--muted2)" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", animation: "pulse 2s infinite" }} />
      {pendingSyncCount} change{pendingSyncCount > 1 ? "s" : ""} waiting to sync
    </div>
  );
}
