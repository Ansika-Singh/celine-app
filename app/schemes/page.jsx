"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { SCHEMES } from "@/lib/schemes";

export default function Schemes() {
  const { user } = useAppContext();
  const [turnover, setTurnover] = useState("");
  const [checked, setChecked] = useState(false);

  const matchedSchemes = SCHEMES.filter(s => {
    const isTypeMatch = s.eligibility.types.includes(user?.bizType);
    const isTurnoverMatch = turnover ? Number(turnover) <= s.eligibility.maxTurnover : true;
    return isTypeMatch && isTurnoverMatch;
  });

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="pt">Yojana Sahayak</div>
          <div className="ps">Government Scheme Assistant</div>
        </div>
      </div>

      <div style={{ padding: "1rem", background: "rgba(255, 193, 7, 0.1)", borderLeft: "4px solid var(--gold)", color: "var(--cream)", marginBottom: "1.5rem", borderRadius: "0 4px 4px 0", fontSize: "0.85rem" }}>
        <strong>Note:</strong> Scheme eligibility criteria and subsidy amounts may change. Please verify all details on the official government portals before applying.
      </div>

      <div className="g2-3">
        <div>
          <div className="card mb">
            <div className="st">Eligibility Checker</div>
            <div className="fg">
              <div className="fl">Business Type</div>
              <input className="fi" value={user?.bizType || ""} readOnly style={{ opacity: .7 }} />
            </div>
            <div className="fg">
              <div className="fl">Estimated Annual Turnover (₹)</div>
              <input className="fi" type="number" placeholder="e.g. 500000" value={turnover} onChange={e => setTurnover(e.target.value)} />
            </div>
            <button className="btn btn-g" style={{ width: "100%", marginTop: "1rem" }} onClick={() => setChecked(true)}>
              Check Eligibility
            </button>
          </div>
        </div>
        
        <div>
          {checked ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="st" style={{ marginBottom: 0 }}>Eligible Schemes ({matchedSchemes.length})</div>
              {matchedSchemes.length === 0 ? (
                <div style={{ padding: "1.5rem", textAlign: "center", background: "var(--card2)", borderRadius: 8, color: "var(--muted2)" }}>
                  No schemes found matching your profile.
                </div>
              ) : (
                matchedSchemes.map(s => (
                  <div key={s.id} className="card" style={{ borderLeft: "4px solid var(--gold)" }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--cream)", marginBottom: ".25rem" }}>{s.name}</div>
                    <div style={{ fontSize: ".8rem", color: "var(--muted2)", marginBottom: ".75rem" }}>{s.description}</div>
                    <div style={{ fontSize: ".85rem", color: "var(--green)", marginBottom: "1rem", padding: ".5rem", background: "var(--green-bg)", borderRadius: 4 }}>
                      <span style={{ fontWeight: 600 }}>Benefits:</span> {s.benefits}
                    </div>
                    <a href={s.url} target="_blank" rel="noreferrer" className="btn btn-o" style={{ display: "inline-block", textDecoration: "none", fontSize: ".8rem" }}>
                      Apply Now ↗
                    </a>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ padding: "3rem", textAlign: "center", background: "var(--card)", borderRadius: 8, border: "1px dashed var(--border)", color: "var(--muted2)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📋</div>
              Fill out the form and check eligibility to discover government schemes and subsidies tailored for your business.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
