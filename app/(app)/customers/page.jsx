"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

function AddCustomerModal({ onClose, onAdd }) {
  const [f, setF] = useState({ name: "", phone: "", email: "", type: "Regular" });
  const set = k => e => setF(p => ({ ...p, [k]: e.target.value }));
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Add Customer</div>
        <div className="mf">
          <div className="fg"><div className="fl">Full Name</div><input className="fi" placeholder="Ramesh Kumar" value={f.name} onChange={set("name")} /></div>
          <div className="fg"><div className="fl">Phone</div><input className="fi" placeholder="9876543210" value={f.phone} onChange={set("phone")} /></div>
          <div className="fg"><div className="fl">Email</div><input className="fi" placeholder="ramesh@gmail.com" value={f.email} onChange={set("email")} /></div>
          <div className="fg">
            <div className="fl">Type</div>
            <select className="fi" value={f.type} onChange={set("type")}>
              {["New", "Regular", "Premium"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-g" disabled={!f.name || !f.phone} onClick={() => { onAdd({ ...f, id: Date.now(), udhar: 0, visits: 0, lastVisit: "Just now", points: 0, joined: "Jun 2026" }); onClose(); }}>Add Customer</button>
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const { customers, setCustomers, showToast } = useAppContext();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));
  
  return (
    <div className="page">
      {showModal && <AddCustomerModal onClose={() => setShowModal(false)} onAdd={c => { setCustomers(p => [c, ...p]); showToast("Customer added!", "success"); }} />}
      <div className="ph">
        <div><div className="pt">Customers</div><div className="ps">{customers.length} customers · {fmt(customers.reduce((s, c) => s + c.udhar, 0))} total udhar</div></div>
        <div className="ph-actions"><button className="btn btn-o" onClick={() => setShowModal(true)}>+ Add Customer</button></div>
      </div>
      <div className="card">
        <div className="search-bar"><span className="search-icon">🔍</span><input className="fi" placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem" }} /></div>
        <div className="tw">
          <table>
            <thead><tr><th>Customer</th><th>Phone</th><th>Type</th><th>Points</th><th>Visits</th><th>Udhar</th><th>Last Visit</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}><div className="u-avatar" style={{ width: 32, height: 32, fontSize: ".68rem" }}>{initials(c.name)}</div>{c.name}</div></td>
                  <td style={{ color: "var(--muted2)" }}>{c.phone}</td>
                  <td><span className={`badge ${c.type === "Premium" ? "bo" : c.type === "New" ? "bg" : "bm"}`}>{c.type}</span></td>
                  <td style={{ color: "var(--gold)" }}>{c.points} pts</td>
                  <td style={{ color: "var(--muted2)" }}>{c.visits}</td>
                  <td>{c.udhar > 0 ? <span style={{ color: "var(--red)", fontWeight: 500 }}>{fmt(c.udhar)}</span> : <span style={{ color: "var(--green)" }}>Clear</span>}</td>
                  <td style={{ color: "var(--muted2)" }}>{c.lastVisit}</td>
                  <td>
                    <div style={{ display: "flex", gap: ".4rem" }}>
                      {c.udhar > 0 && <button className="btn btn-ghost" style={{ padding: ".3rem .6rem", fontSize: ".7rem" }} onClick={() => { setCustomers(p => p.map(x => x.id === c.id ? { ...x, udhar: 0 } : x)); showToast("Udhar cleared!", "success"); }}>Clear Udhar</button>}
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
