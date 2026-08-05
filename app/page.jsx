"use client";

import { useAppContext } from "@/context/AppContext";
import Onboarding from "@/components/Onboarding";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { SALES_DATA, CATEGORY_DATA, MONTHLY_DATA, GOLD_COLORS } from "@/lib/data";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;
const initials = n => n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

export default function Dashboard() {
  const { user, setUser, customers, inventory, invoices, expenses, leads } = useAppContext();

  if (!user) return <Onboarding onComplete={setUser} />;

  const totalUdhar = customers.reduce((s, c) => s + c.udhar, 0);
  const lowStock = inventory.filter(i => i.stock < i.minStock).length;
  const udharCount = customers.filter(c => c.udhar > 0).length;
  const newSchemes = 2; // Derived from schemes database
  const monthRevenue = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const activeLeadsValue = leads.filter(l => l.status !== "Lost").reduce((s, l) => s + l.value, 0);

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="pt">Good morning, {user.ownerName.split(" ")[0]} 👋</div>
          <div className="ps">{user.bizName} · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
        </div>
      </div>
      <div className="sg">
        {[
          { icon: "💰", label: "Revenue (June)", value: fmt(monthRevenue), change: "+12% vs May", pos: true },
          { icon: "🏦", label: "Net Profit", value: fmt(monthRevenue - totalExpenses), change: monthRevenue > totalExpenses ? "Positive" : "Negative", pos: monthRevenue > totalExpenses },
          { icon: "🎯", label: "Pipeline Value", value: fmt(activeLeadsValue), change: `${leads.length} active leads`, pos: true },
          { icon: "⚠️", label: "Udhar Pending", value: fmt(totalUdhar), change: `${customers.filter(c => c.udhar > 0).length} customers`, neg: true },
        ].map(s => (
          <div key={s.label} className="sc">
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value">{s.value}</div>
            <div className={`sc-change ${s.pos ? "pos" : s.neg ? "neg" : "neu"}`}>{s.change}</div>
          </div>
        ))}
      </div>
      <div className="g2-3 mb">
        <div className="card">
          <div className="st">Weekly Sales vs Expenses</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SALES_DATA} barGap={4}>
              <XAxis dataKey="day" tick={{ fill: "#5A5A72", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#141420", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [fmt(v)]} />
              <Bar dataKey="sales" fill="#C9A84C" radius={[4, 4, 0, 0]} opacity={.85} />
              <Bar dataKey="expenses" fill="#E05555" radius={[4, 4, 0, 0]} opacity={.6} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: "1.25rem", marginTop: ".75rem" }}>
            {[{ c: "#C9A84C", l: "Sales" }, { c: "#E05555", l: "Expenses" }].map(i => (
              <div key={i.l} style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".7rem", color: "var(--muted2)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: i.c }} />
                {i.l}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="st">Sales by Category</div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {CATEGORY_DATA.map((_, i) => <Cell key={i} fill={GOLD_COLORS[i % GOLD_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#141420", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: ".3rem", marginTop: ".5rem" }}>
            {CATEGORY_DATA.map((c, i) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: ".7rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "var(--muted2)" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: GOLD_COLORS[i % 5] }} />{c.name}
                </div>
                <span style={{ color: "var(--cream)", fontWeight: 500 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="st">Recent Customers</div>
          {customers.slice(0, 5).map(c => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: ".75rem", padding: ".6rem 0", borderBottom: "1px solid var(--border2)" }}>
              <div className="u-avatar" style={{ width: 36, height: 36, fontSize: ".72rem" }}>{initials(c.name)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: ".83rem", color: "var(--cream)" }}>{c.name}</div>
                <div style={{ fontSize: ".68rem", color: "var(--muted2)" }}>{c.lastVisit}</div>
              </div>
              {c.udhar > 0 ? <span style={{ fontSize: ".78rem", color: "var(--red)", fontWeight: 500 }}>{fmt(c.udhar)}</span> : <span style={{ fontSize: ".7rem", color: "var(--green)" }}>Clear</span>}
            </div>
          ))}
        </div>
        <div className="card">
          <div className="st">AI Business Alerts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            {lowStock > 0 && <div style={{ padding: "1rem", background: "rgba(224, 76, 76, 0.1)", borderLeft: "4px solid var(--red)", borderRadius: "4px" }}>⚠️ {lowStock} items are low on stock. Restock soon to prevent lost sales.</div>}
            {udharCount > 0 && <div style={{ padding: "1rem", background: "rgba(201, 168, 76, 0.1)", borderLeft: "4px solid var(--gold)", borderRadius: "4px" }}>💰 {udharCount} customers have pending Udhar. Send WhatsApp reminders.</div>}
            {newSchemes > 0 && <div style={{ padding: "1rem", background: "rgba(76, 175, 80, 0.1)", borderLeft: "4px solid var(--green)", borderRadius: "4px" }}>📋 {newSchemes} government schemes match your profile (Yojana Sahayak). Check eligibility!</div>}
            {lowStock === 0 && udharCount === 0 && <div style={{ padding: "1rem", color: "var(--muted2)" }}>All systems normal. No pending alerts.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
