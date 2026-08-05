"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { SALES_DATA } from "@/lib/data";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Reports() {
  const { customers, invoices, expenses, inventory } = useAppContext();
  const [showExportModal, setShowExportModal] = useState(false);
  
  const paid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
  const profit = paid - totalExp;
  
  const exportData = (type) => {
    let headers, rows, filename;
    if (type === 'invoices') {
      headers = ["ID", "Customer", "Amount", "Method", "Status", "Date"];
      rows = invoices.map(i => [i.id, i.customer, i.amount, i.method, i.status, i.date]);
      filename = "invoices";
    } else if (type === 'customers') {
      headers = ["ID", "Name", "Phone", "Type", "Udhar", "Visits", "Points"];
      rows = customers.map(c => [c.id, c.name, c.phone, c.type, c.udhar, c.visits, c.points]);
      filename = "customers";
    } else if (type === 'inventory') {
      headers = ["ID", "Name", "Category", "Stock", "MinStock", "Cost", "Price"];
      rows = inventory.map(i => [i.id, i.name, i.category, i.stock, i.minStock, i.cost, i.price]);
      filename = "inventory";
    }

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `celine_${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportModal(false);
  };

  const exportGoogleSheets = () => {
    alert("Exporting to Google Sheets... (This will open a new tab to authenticate with Google Drive once OAuth is configured in Settings)");
  };
  
  return (
    <div className="page">
      {showExportModal && (
        <div className="modal-bg" onClick={() => setShowExportModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">Export Data (CSV)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <button className="btn btn-o" onClick={() => exportData('invoices')}>📄 Export Invoices</button>
              <button className="btn btn-o" onClick={() => exportData('customers')}>👥 Export Customers</button>
              <button className="btn btn-o" onClick={() => exportData('inventory')}>📦 Export Inventory</button>
            </div>
            <div className="modal-footer" style={{ marginTop: "1rem" }}>
              <button className="btn btn-ghost" onClick={() => setShowExportModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="ph">
        <div><div className="pt">Daily Report</div><div className="ps">Summary for {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div></div>
        <div className="ph-actions">
          <button className="btn btn-o" onClick={() => setShowExportModal(true)}>📄 Export CSV</button>
          <button className="btn btn-o" onClick={exportGoogleSheets} style={{ background: "var(--green)" }}>📊 Google Sheets</button>
          <button className="btn btn-ghost">📧 Email Report</button>
        </div>
      </div>
      <div className="rp-grid">
        {[
          { l: "Revenue", v: fmt(paid), c: "var(--green)" },
          { l: "Expenses", v: fmt(totalExp), c: "var(--red)" },
          { l: "Net Profit", v: fmt(profit), c: profit > 0 ? "var(--gold)" : "var(--red)" },
          { l: "Customers Served", v: invoices.length, c: "var(--blue)" },
          { l: "Udhar Given", v: fmt(customers.reduce((s, c) => s + c.udhar, 0)), c: "var(--gold)" },
          { l: "Low Stock Items", v: inventory.filter(i => i.stock < i.minStock).length, c: "var(--red)" },
        ].map(r => (
          <div key={r.l} className="rp-card">
            <div className="rp-lbl">{r.l}</div>
            <div className="rp-val" style={{ color: r.c }}>{r.v}</div>
          </div>
        ))}
      </div>
      <div className="g2">
        <div className="card">
          <div className="st">Transactions Today</div>
          <div className="tw">
            <table>
              <thead><tr><th>Customer</th><th>Amount</th><th>Method</th><th>Status</th></tr></thead>
              <tbody>
                {invoices.map(i => (
                  <tr key={i.id}>
                    <td>{i.customer}</td>
                    <td>{fmt(i.amount)}</td>
                    <td><span className="badge bm">{i.method}</span></td>
                    <td><span className={`badge ${i.status === "Paid" ? "bg" : i.status === "Overdue" ? "br" : "bo"}`}>{i.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="st">Weekly Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={SALES_DATA}>
              <XAxis dataKey="day" tick={{ fill: "#5A5A72", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: "#141420", border: "1px solid rgba(201,168,76,.15)", borderRadius: 8, fontSize: 11 }} formatter={v => [fmt(v)]} />
              <Line type="monotone" dataKey="sales" stroke="#C9A84C" strokeWidth={2} dot={{ fill: "#C9A84C", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
