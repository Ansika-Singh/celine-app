"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Calculator() {
  const { inventory, apiFetch, setInvoices, setPrintingInvoice, showToast } = useAppContext();
  const [items, setItems] = useState([]);
  const [cash, setCash] = useState("");
  const [search, setSearch] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const total = items.reduce((s, i) => s + (i.price * i.qty), 0);
  const change = cash ? Number(cash) - total : null;
  const filtered = inventory.filter(i => i.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5);
  
  const addItem = item => {
    setItems(p => {
      const ex = p.find(x => x.id === item.id);
      return ex ? p.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x) : [...p, { ...item, qty: 1 }];
    });
    setSearch("");
  };
  
  const handlePrintBill = async () => {
    setIsProcessing(true);
    
    // 1. Create a safe temporary ID for offline use and receipt printing (collision-resistant)
    const tempId = `INV-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newInvoice = {
      id: tempId,
      customer: "Walk-in",
      items,
      amount: total,
      date: new Date().toISOString().split("T")[0],
      method: "Cash",
      status: "Paid"
    };

    // 2. Queue for save (works offline or online via our unified apiFetch)
    try {
      await apiFetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(newInvoice)
      });
      // 3. Update local state instantly so it's reflected in the UI
      setInvoices(p => [newInvoice, ...p]);
      showToast("Sale completed!", "success");
      
      // 4. Trigger print
      setPrintingInvoice(newInvoice);
      
      // 5. Clear cart
      setItems([]);
      setCash("");
    } catch (e) {
      showToast("Failed to process sale", "error");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="page">
      <div className="ph"><div><div className="pt">Billing Calculator</div><div className="ps">Quick billing with change calculator</div></div></div>
      <div className="g2-3">
        <div>
          <div className="card mb">
            <div className="st">Add Items</div>
            <div className="search-bar" style={{ position: "relative", marginBottom: search && filtered.length ? 0 : "1rem" }}>
              <span className="search-icon">🔍</span>
              <input className="fi" placeholder="Search product to add..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "2.25rem" }} />
            </div>
            {search && filtered.length > 0 && (
              <div style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: 8, marginBottom: "1rem", overflow: "hidden" }}>
                {filtered.map(item => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".65rem 1rem", borderBottom: "1px solid var(--border2)", cursor: "pointer" }} onClick={() => addItem(item)}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                      <span>{item.image}</span>
                      <span style={{ fontSize: ".82rem", color: "var(--cream)" }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: ".78rem", color: "var(--gold)" }}>{fmt(item.price)}</span>
                  </div>
                ))}
              </div>
            )}
            {items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem", color: "var(--muted2)", fontSize: ".83rem" }}>Search and add items above</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {items.map(item => (
                  <div key={item.id} className="item-row">
                    <span style={{ fontSize: "1.1rem" }}>{item.image}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: ".83rem", color: "var(--cream)" }}>{item.name}</div>
                      <div style={{ fontSize: ".72rem", color: "var(--muted2)" }}>{fmt(item.price)} each</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <button className="btn btn-ghost" style={{ padding: ".2rem .6rem", fontSize: ".85rem" }} onClick={() => setItems(p => p.map(x => x.id === item.id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))}>−</button>
                      <span style={{ width: 24, textAlign: "center", fontSize: ".85rem", color: "var(--cream)" }}>{item.qty}</span>
                      <button className="btn btn-ghost" style={{ padding: ".2rem .6rem", fontSize: ".85rem" }} onClick={() => setItems(p => p.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x))}>+</button>
                    </div>
                    <span style={{ color: "var(--gold)", fontWeight: 500, minWidth: 60, textAlign: "right" }}>{fmt(item.price * item.qty)}</span>
                    <button className="btn btn-r" style={{ padding: ".25rem .5rem", fontSize: ".75rem" }} onClick={() => setItems(p => p.filter(x => x.id !== item.id))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="card">
            <div className="calc-display">
              <div style={{ fontSize: ".65rem", color: "var(--muted2)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".35rem" }}>Total Bill</div>
              <div className="calc-total">{fmt(total)}</div>
              <div style={{ fontSize: ".72rem", color: "var(--muted2)", marginTop: ".3rem" }}>{items.length} items · {items.reduce((s, i) => s + i.qty, 0)} units</div>
            </div>
            <div className="fg mb" style={{ marginBottom: "1rem" }}>
              <div className="fl">Cash Received (₹)</div>
              <input className="fi" type="number" placeholder="Enter amount given by customer" value={cash} onChange={e => setCash(e.target.value)} style={{ fontSize: "1.1rem" }} />
            </div>
            {cash && (
              <div style={{ padding: "1.25rem", background: change >= 0 ? "var(--green-bg)" : "var(--red-bg)", border: `1px solid ${change >= 0 ? "rgba(79, 168, 143,.3)" : "rgba(224,85,85,.3)"}`, borderRadius: 8, textAlign: "center", marginBottom: "1rem" }}>
                <div style={{ fontSize: ".65rem", color: "var(--muted2)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".3rem" }}>{change >= 0 ? "Change to Return" : "Amount Short"}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "2.5rem", color: change >= 0 ? "var(--green)" : "var(--red)", fontWeight: 600 }}>{fmt(Math.abs(change))}</div>
                {change < 0 && <div style={{ fontSize: ".72rem", color: "var(--red)", marginTop: ".25rem" }}>Customer needs {fmt(Math.abs(change))} more</div>}
              </div>
            )}
            <div style={{ display: "flex", gap: ".6rem" }}>
              <button className="btn btn-g" style={{ flex: 1 }} disabled={items.length === 0 || isProcessing} onClick={handlePrintBill}>
                {isProcessing ? "Processing..." : "Print Bill"}
              </button>
              <button className="btn btn-ghost" onClick={() => { setItems([]); setCash(""); }}>Clear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
