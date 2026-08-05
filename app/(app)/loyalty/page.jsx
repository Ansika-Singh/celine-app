"use client";

import { useAppContext } from "@/context/AppContext";

const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export default function Loyalty() {
  const { customers } = useAppContext();
  
  const tierLabel = pts => pts >= 500 ? "Gold" : pts >= 200 ? "Silver" : "Bronze";
  const tierColor = pts => pts >= 500 ? "var(--gold)" : pts >= 200 ? "#A8A8C8" : "#CD7F32";
  const nextTier = pts => pts >= 500 ? 1000 : pts >= 200 ? 500 : 200;
  
  return (
    <div className="page">
      <div className="ph"><div><div className="pt">Loyalty Program</div><div className="ps">Reward your best customers</div></div><button className="btn btn-g">Configure Rewards</button></div>
      <div className="g3 mb">
        {[
          { tier: "Bronze", range: "0–199 pts", reward: "5% discount", customers: customers.filter(c => c.points < 200).length },
          { tier: "Silver", range: "200–499 pts", reward: "10% discount + free item", customers: customers.filter(c => c.points >= 200 && c.points < 500).length },
          { tier: "Gold", range: "500+ pts", reward: "15% discount + priority service", customers: customers.filter(c => c.points >= 500).length },
        ].map(t => (
          <div key={t.tier} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: ".5rem" }}>{t.tier === "Gold" ? "🥇" : t.tier === "Silver" ? "🥈" : "🥉"}</div>
            <div style={{ fontSize: ".9rem", color: "var(--cream)", fontWeight: 500 }}>{t.tier}</div>
            <div style={{ fontSize: ".72rem", color: "var(--muted2)", margin: ".3rem 0 .75rem" }}>{t.range}</div>
            <div style={{ fontSize: ".8rem", color: "var(--gold)", marginBottom: ".75rem" }}>{t.reward}</div>
            <div style={{ fontSize: "1.6rem", fontFamily: "'Cormorant Garamond',serif", color: "var(--cream)" }}>{t.customers}</div>
            <div style={{ fontSize: ".68rem", color: "var(--muted2)" }}>customers</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="st">Customer Points Tracker</div>
        <div className="tw">
          <table>
            <thead><tr><th>Customer</th><th>Points</th><th>Tier</th><th>Progress</th><th>Next Reward At</th><th>Award Points</th></tr></thead>
            <tbody>
              {[...customers].sort((a, b) => b.points - a.points).map(c => {
                const next = nextTier(c.points);
                const pct = Math.min(100, (c.points / next) * 100);
                return (
                  <tr key={c.id}>
                    <td><div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}><div className="u-avatar" style={{ width: 30, height: 30, fontSize: ".65rem" }}>{initials(c.name)}</div>{c.name}</div></td>
                    <td style={{ color: "var(--gold)", fontWeight: 500 }}>{c.points}</td>
                    <td><span className="badge" style={{ background: `${tierColor(c.points)}22`, color: tierColor(c.points) }}>{tierLabel(c.points)}</span></td>
                    <td><div style={{ width: 100 }}>
                      <div style={{ height: 5, background: "var(--border2)", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${pct}%`, background: tierColor(c.points), borderRadius: 3 }} /></div>
                      <div style={{ fontSize: ".62rem", color: "var(--muted2)", marginTop: ".2rem" }}>{c.points}/{next}</div>
                    </div></td>
                    <td style={{ color: "var(--muted2)", fontSize: ".78rem" }}>{next} pts</td>
                    <td><button className="btn btn-o" style={{ padding: ".3rem .7rem", fontSize: ".72rem" }}>+10 pts</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
