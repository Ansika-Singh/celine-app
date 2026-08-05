"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { SALES_DATA, MONTHLY_DATA, CATEGORY_DATA } from "@/lib/data";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Analytics() {
  const currentMonth = new Date().getMonth();
  const isMonsoon = currentMonth >= 5 && currentMonth <= 8;
  const isFestivalSeason = currentMonth >= 8 && currentMonth <= 10;
  
  return (
    <div className="page">
      <div className="ph"><div><div className="pt">Analytics</div><div className="ps">Business performance overview</div></div></div>
      <div className="sg" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {[
          { label: "Avg Daily Sales", value: "₹5,757", change: "+8% vs last week", pos: true },
          { label: "Best Day", value: "Saturday", change: "₹7,800 avg", pos: true },
          { label: "Gross Margin", value: "18.4%", change: "+2.1% vs May", pos: true },
        ].map(s => (
          <div key={s.label} className="sc">
            <div className="sc-label">{s.label}</div>
            <div className="sc-value">{s.value}</div>
            <div className="sc-change pos">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="card mb">
        <div className="st">Local Demand Spotter</div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {isMonsoon && (
            <div style={{ flex: 1, minWidth: 250, padding: "1rem", background: "rgba(76, 175, 201, 0.1)", border: "1px solid rgba(76, 175, 201, 0.3)", borderRadius: 8 }}>
              <div style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>🌧️ Monsoon Season Detected</div>
              <div style={{ fontSize: ".85rem", color: "var(--cream)" }}>Historical data shows a 40% spike in umbrellas, raincoats, and instant noodles during this time.</div>
              <button className="btn btn-o" style={{ marginTop: ".75rem", fontSize: ".75rem", padding: ".3rem .6rem" }}>Check Inventory</button>
            </div>
          )}
          {isFestivalSeason && (
            <div style={{ flex: 1, minWidth: 250, padding: "1rem", background: "rgba(201, 168, 76, 0.1)", border: "1px solid rgba(201, 168, 76, 0.3)", borderRadius: 8 }}>
              <div style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>🎇 Upcoming Festivals (Diwali/Dussehra)</div>
              <div style={{ fontSize: ".85rem", color: "var(--cream)" }}>Expect high demand for sweets, dry fruits, and decorative items. Order stock now to avoid supplier shortages.</div>
              <button className="btn btn-o" style={{ marginTop: ".75rem", fontSize: ".75rem", padding: ".3rem .6rem" }}>Review Suppliers</button>
            </div>
          )}
          {!isMonsoon && !isFestivalSeason && (
            <div style={{ flex: 1, minWidth: 250, padding: "1rem", background: "var(--card2)", borderRadius: 8 }}>
              <div style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>☀️ Standard Season</div>
              <div style={{ fontSize: ".85rem", color: "var(--muted2)" }}>No major seasonal spikes predicted for the next 2 weeks. Focus on clearing slow-moving inventory.</div>
            </div>
          )}
        </div>
      </div>

      <div className="card mb">
        <div className="st">Monthly Revenue Trend</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={MONTHLY_DATA}>
            <XAxis dataKey="month" tick={{ fill: "#5A5A72", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#5A5A72", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "#141420", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, fontSize: 12 }} formatter={v => [fmt(v)]} />
            <Line type="monotone" dataKey="sales" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: "#C9A84C", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="g2">
        <div className="card">
          <div className="st">Daily Breakdown This Week</div>
          <div className="tw">
            <table>
              <thead><tr><th>Day</th><th>Sales</th><th>Expenses</th><th>Profit</th></tr></thead>
              <tbody>
                {SALES_DATA.map(d => (
                  <tr key={d.day}>
                    <td>{d.day}</td>
                    <td style={{ color: "var(--green)" }}>{fmt(d.sales)}</td>
                    <td style={{ color: "var(--red)" }}>{fmt(d.expenses)}</td>
                    <td style={{ color: "var(--gold)", fontWeight: 500 }}>{fmt(d.sales - d.expenses)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="st">Top Selling Categories</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={CATEGORY_DATA} layout="vertical">
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" tick={{ fill: "#7A7A95", fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ background: "#141420", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}%`]} />
              <Bar dataKey="value" fill="#C9A84C" radius={[0, 4, 4, 0]} opacity={.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
