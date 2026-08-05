"use client";

import { INIT_STAFF } from "@/lib/data";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export default function Staff() {
  const staff = INIT_STAFF;
  return (
    <div className="page">
      <div className="ph">
        <div><div className="pt">Staff</div><div className="ps">{staff.length} employees · {fmt(staff.reduce((s, e) => s + e.salary, 0))} monthly payroll</div></div>
        <button className="btn btn-g">+ Add Staff</button>
      </div>
      <div className="g3 mb">
        {staff.map(s => (
          <div key={s.id} className="card" style={{ textAlign: "center" }}>
            <div className="u-avatar" style={{ width: 52, height: 52, margin: "0 auto .85rem", fontSize: "1rem" }}>{initials(s.name)}</div>
            <div style={{ fontSize: ".9rem", color: "var(--cream)", fontWeight: 500, marginBottom: ".2rem" }}>{s.name}</div>
            <div style={{ fontSize: ".72rem", color: "var(--gold)", marginBottom: ".6rem" }}>{s.role}</div>
            <span className={`badge ${s.status === "Active" ? "bg" : "bo"}`}>{s.status}</span>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: ".3rem" }}>
              {[["Phone", s.phone], ["Shift", s.shift], ["Salary", fmt(s.salary)], ["Joined", s.joined]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", padding: ".3rem 0", borderTop: "1px solid var(--border2)" }}>
                  <span style={{ color: "var(--muted2)" }}>{k}</span>
                  <span style={{ color: "var(--cream)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
