"use client";

import { useState } from "react";
import { BUSINESS_TYPES, LANGUAGES } from "@/lib/data";

export default function Onboarding({ onComplete }) {
  const [f, setF] = useState({ bizName: "", ownerName: "", bizType: "", language: "English" });
  const set = k => v => setF(p => ({ ...p, [k]: v }));

  return (
    <div className="ob">
      <div className="ob-logo">Celine</div>
      <div className="ob-sub">AI CRM for Indian Businesses</div>
      <div className="ob-card">
        <div className="ob-title">Set up your business</div>
        <div className="fg">
          <div className="fl">Your Name</div>
          <input className="fi" placeholder="Ramesh Kumar" value={f.ownerName} onChange={e => set("ownerName")(e.target.value)} />
        </div>
        <div className="fg">
          <div className="fl">Business Name</div>
          <input className="fi" placeholder="Kumar General Store" value={f.bizName} onChange={e => set("bizName")(e.target.value)} />
        </div>
        <div className="fg">
          <div className="fl">Business Type</div>
          <div className="gs-grid">
            {BUSINESS_TYPES.map(t => (
              <button key={t} className={`gs ${f.bizType === t ? "active" : ""}`} onClick={() => set("bizType")(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="fg">
          <div className="fl">Language</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".5rem" }}>
            {LANGUAGES.map(l => (
              <button key={l} className={`gs ${f.language === l ? "active" : ""}`} onClick={() => set("language")(l)}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <button className="btn btn-g btn-full" disabled={!f.bizName || !f.ownerName || !f.bizType} onClick={() => onComplete(f)}>
          Enter Celine →
        </button>
      </div>
    </div>
  );
}
