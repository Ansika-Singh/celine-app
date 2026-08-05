"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export default function WhatsApp() {
  const { customers, user } = useAppContext();
  const [selected, setSelected] = useState("udhar");
  const [msg, setMsg] = useState("");
  
  const udharCustomers = customers.filter(c => c.udhar > 0);
  const templates = {
    udhar: { label: "Udhar Reminder", icon: "💳", desc: "Send payment reminders to customers with pending balance", preview: (c) => `Namaste ${c.name} ji 🙏\n\nYeh message ${user?.bizName?.split(" ")[0]} Store ki taraf se hai.\n\nAapka udhar balance: *${fmt(c.udhar)}* pending hai.\n\nKripya jald se jald payment kar dein.\n\nUPI: 9876543210@paytm\n\nShukriya! 🙏` },
    promo: { label: "Promotion", icon: "🎉", desc: "Send offers and discounts to all customers", preview: (c) => `Namaste ${c.name} ji! 🎊\n\nSpecial offer sirf aaj ke liye:\n*10% OFF* sabhi groceries par!\n\nStore timings: 8AM – 9PM\n\nAaj hi aaiye! 🛒` },
    loyalty: { label: "Loyalty Reward", icon: "⭐", desc: "Notify customers about their loyalty points", preview: (c) => `Namaste ${c.name} ji! ⭐\n\nAapke paas *${c.points} loyalty points* hain!\n\nInhe redeem karein aur paayein:\n• 200 pts = 5% discount\n• 500 pts = Free item!\n\nAaj hi store aaiye! 🎁` },
  };
  
  const tpl = templates[selected];
  const previewCustomer = selected === "udhar" ? udharCustomers[0] || customers[0] : customers[0];
  
  return (
    <div className="page">
      <div className="ph"><div><div className="pt">WhatsApp Reminders</div><div className="ps">Send bulk messages to customers</div></div></div>
      <div className="g3 mb">
        {Object.entries(templates).map(([key, t]) => (
          <div key={key} className={`card`} style={{ cursor: "pointer", border: selected === key ? "1px solid var(--gold)" : "1px solid var(--border)", background: selected === key ? "var(--gold-glow)" : "var(--card)" }} onClick={() => setSelected(key)}>
            <div style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>{t.icon}</div>
            <div style={{ fontSize: ".85rem", color: "var(--cream)", fontWeight: 500, marginBottom: ".25rem" }}>{t.label}</div>
            <div style={{ fontSize: ".72rem", color: "var(--muted2)" }}>{t.desc}</div>
          </div>
        ))}
      </div>
      <div className="g2-3">
        <div>
          <div className="wa-card">
            <div className="wa-header">
              <div className="wa-icon">💬</div>
              <div><div className="wa-title">Message Preview</div><div className="wa-sub">WhatsApp Business Template</div></div>
            </div>
            <div className="wa-preview" style={{ whiteSpace: "pre-wrap" }}>{msg || (previewCustomer ? tpl.preview(previewCustomer) : "No customers found")}</div>
            <div className="wa-actions">
              <button className="btn-wa">📤 Send to {selected === "udhar" ? udharCustomers.length : customers.length} customers</button>
              <button className="btn btn-ghost">✏️ Edit Template</button>
            </div>
          </div>
          <div className="card mt">
            <div className="st">Quick Templates</div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button className="btn btn-o" onClick={() => setMsg("Namaste! Aapka udhar amount due hai. Kripya jaldi payment karein.")}>Udhar Reminder</button>
              <button className="btn btn-o" onClick={() => setMsg("Special Offer! Visit our store today for a 10% discount on all items.")}>Promo Offer</button>
              <button className="btn btn-o" onClick={() => setMsg("PM SVANidhi Scheme Alert: You may be eligible for a ₹10,000 working capital loan. Reply to start application.")}>Scheme Guidance</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="st">Target Customers</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem", maxHeight: 300, overflowY: "auto" }}>
            {(selected === "udhar" ? udharCustomers : customers).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: ".65rem", padding: ".6rem", background: "var(--card2)", borderRadius: 8 }}>
                <div className="u-avatar" style={{ width: 30, height: 30, fontSize: ".62rem" }}>{initials(c.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: ".8rem", color: "var(--cream)" }}>{c.name}</div>
                  <div style={{ fontSize: ".68rem", color: "var(--muted2)" }}>{c.phone}</div>
                </div>
                {selected === "udhar" && <span style={{ fontSize: ".75rem", color: "var(--red)", fontWeight: 500 }}>{fmt(c.udhar)}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
