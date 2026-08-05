"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Expenses() {
  const { expenses, setExpenses, showToast } = useAppContext();

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="page">
      <div className="ph">
        <div><div className="pt">Expenses</div><div className="ps">{expenses.length} records · {fmt(total)} total</div></div>
        <button className="btn btn-g" onClick={() => showToast("Add Expense clicked (Modal not implemented)", "info")}>+ Add Expense</button>
      </div>
      <div className="card">
        <div className="tw">
          <table>
            <thead><tr><th>ID</th><th>Category</th><th>Note</th><th>Amount</th><th>Date</th><th>Attachment</th></tr></thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td style={{ color: "var(--muted2)" }}>{e.id}</td>
                  <td><span className="exp-cat">{e.category}</span></td>
                  <td style={{ color: "var(--cream)" }}>{e.note}</td>
                  <td style={{ color: "var(--red)", fontWeight: 500 }}>{fmt(e.amount)}</td>
                  <td style={{ color: "var(--muted2)" }}>{e.date}</td>
                  <td><button className="btn btn-ghost" style={{ fontSize: ".7rem", padding: ".2rem .5rem" }}>📎 Attach</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
