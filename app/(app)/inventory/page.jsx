"use client";

import { useState } from "react";
import { List } from "react-window";
import { useAppContext } from "@/context/AppContext";
import useSearch from "@/hooks/useSearch";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Inventory() {
  const { inventory, setInventory, showToast } = useAppContext();
  const [view, setView] = useState("table");
  
  const { query, setQuery, filteredItems } = useSearch(inventory, ["name", "category"]);
  const low = inventory.filter(i => i.stock < i.minStock);
  
  const Row = ({ index, style }) => {
    const item = filteredItems[index];
    const pct = Math.min(100, (item.stock / (item.minStock * 2)) * 100);
    const isLow = item.stock < item.minStock;
    const margin = ((item.price - item.cost) / item.price * 100).toFixed(0);

    return (
      <div style={{ ...style, display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr", alignItems: "center", padding: "0 1rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}><span style={{ fontSize: "1.1rem" }}>{item.image}</span>{item.name}</div>
        <div style={{ color: "var(--muted2)", fontSize: ".85rem" }}>{item.category}</div>
        <div><div style={{ display: "flex", alignItems: "center", gap: ".65rem" }}><div className="sbw"><div className="sb" style={{ width: `${pct}%`, background: isLow ? "var(--red)" : "var(--green)" }} /></div>{item.stock}</div></div>
        <div style={{ color: "var(--muted2)", fontSize: ".85rem" }}>{item.minStock}</div>
        <div style={{ color: "var(--muted2)", fontSize: ".85rem" }}>{fmt(item.cost)}</div>
        <div style={{ fontSize: ".85rem" }}>{fmt(item.price)}</div>
        <div style={{ color: "var(--green)", fontSize: ".85rem" }}>{margin}%</div>
        <div><span className={`badge ${isLow ? "br" : "bg"}`}>{isLow ? "Low" : "OK"}</span></div>
        <div><button className="btn btn-ghost" style={{ padding: ".3rem .65rem", fontSize: ".7rem" }} onClick={() => { setInventory(p => p.map(x => x.id === item.id ? { ...x, stock: x.stock + 10 } : x)); showToast(`${item.name} restocked!`, "success"); }}>+10</button></div>
      </div>
    );
  };
  
  return (
    <div className="page" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="ph" style={{ flexShrink: 0 }}>
        <div><div className="pt">Inventory</div><div className="ps">{inventory.length} items · {low.length} low stock</div></div>
        <div className="ph-actions">
          <input type="text" className="input" placeholder="Search inventory..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: "200px", padding: ".4rem .8rem", fontSize: ".85rem", height: "auto" }} />
          <button className={`btn ${view === "table" ? "btn-o" : "btn-ghost"}`} onClick={() => setView("table")}>Table</button>
          <button className={`btn ${view === "catalog" ? "btn-o" : "btn-ghost"}`} onClick={() => setView("catalog")}>Catalog</button>
          <button className="btn btn-g">+ Add Item</button>
        </div>
      </div>
      
      {low.length > 0 && (
        <div style={{ flexShrink: 0, background: "var(--red-bg)", border: "1px solid rgba(224,85,85,.3)", borderRadius: 8, padding: ".85rem 1rem", marginBottom: "1.25rem", fontSize: ".82rem", color: "var(--red)" }}>
          ⚠️ {low.length} items need restocking: {low.map(i => i.name).join(", ")}
        </div>
      )}

      {view === "catalog" ? (
        <div className="pc-grid" style={{ overflowY: "auto", flex: 1, paddingBottom: "2rem" }}>
          {filteredItems.map(item => (
            <div key={item.id} className="pc-card">
              <div className="pc-emoji">{item.image}</div>
              <div className="pc-name">{item.name}</div>
              <div className="pc-price">{fmt(item.price)}</div>
              <div className={`pc-stock ${item.stock < item.minStock ? "neg" : "pos"}`} style={{ fontSize: ".7rem" }}>{item.stock} in stock</div>
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: ".75rem", padding: ".4rem", fontSize: ".72rem" }} onClick={() => { setInventory(p => p.map(x => x.id === item.id ? { ...x, stock: x.stock + 10 } : x)); showToast(`${item.name} restocked!`, "success"); }}>Restock +10</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr", padding: "1rem", borderBottom: "1px solid var(--border)", fontWeight: "600", color: "var(--muted2)", fontSize: ".82rem", flexShrink: 0 }}>
            <div>Item</div>
            <div>Category</div>
            <div>Stock</div>
            <div>Min</div>
            <div>Cost</div>
            <div>Price</div>
            <div>Margin</div>
            <div>Status</div>
            <div>Action</div>
          </div>
          <div style={{ flex: 1 }}>
            {/* Hardcoded height for now since react-window needs a number, typically AutoSizer is used but this is a quick pass */}
            <List
              height={typeof window !== 'undefined' ? window.innerHeight - 250 : 600} 
              rowCount={filteredItems.length}
              rowHeight={60}
              width="100%"
              style={{ overflowX: "hidden" }}
              rowComponent={Row}
              rowProps={{}}
            />
          </div>
        </div>
      )}
    </div>
  );
}
