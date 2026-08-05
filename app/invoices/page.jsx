"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Invoices() {
  const { invoices, setInvoices, setPrintingInvoice } = useAppContext();
  const [filter, setFilter] = useState("All");
  
  const filtered = filter === "All" ? invoices : invoices.filter(i => i.status === filter);
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  
  return (
    <div className="page">
      <div className="ph">
        <div><div className="pt">Invoices</div><div className="ps">{invoices.length} invoices · {fmt(paid)} collected</div></div>
        <button className="btn btn-g">+ New Invoice</button>
      </div>
      <div className="sg" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        {[
          { label: "Total Billed", value: fmt(total), icon: "📄" },
          { label: "Collected", value: fmt(paid), icon: "✅" },
          { label: "Pending", value: fmt(total - paid), icon: "⏳" },
        ].map(s => (
          <div key={s.label} className="sc">
            <div className="sc-icon">{s.icon}</div>
            <div className="sc-label">{s.label}</div>
            <div className="sc-value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          {["All", "Paid", "Pending", "Overdue"].map(f => (
            <button key={f} className={`btn ${filter === f ? "btn-o" : "btn-ghost"}`} style={{ padding: ".4rem .85rem", fontSize: ".78rem" }} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>Invoice</th><th>Customer</th><th>Items</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id}>
                  <td style={{ color: "var(--gold)", fontWeight: 500 }}>{inv.id}</td>
                  <td>{inv.customer}</td>
                  <td style={{ color: "var(--muted2)", fontSize: ".75rem" }}>{inv.items.map(i => `${i.name}×${i.qty}`).join(", ")}</td>
                  <td style={{ fontWeight: 500 }}>{fmt(inv.amount)}</td>
                  <td style={{ color: "var(--muted2)" }}>{inv.date}</td>
                  <td><span className="badge bm">{inv.method}</span></td>
                  <td><span className={`badge ${inv.status === "Paid" ? "bg" : inv.status === "Overdue" ? "br" : "bo"}`}>{inv.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: ".4rem" }}>
                      <button className="btn btn-ghost" style={{ padding: ".3rem .6rem", fontSize: ".7rem" }} onClick={() => setPrintingInvoice(inv)}>Print</button>
                      {inv.status !== "Paid" && <button className="btn btn-g" style={{ padding: ".3rem .6rem", fontSize: ".7rem" }} onClick={() => { setInvoices(p => p.map(x => x.id === inv.id ? { ...x, status: "Paid" } : x)); }}>Mark Paid</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
