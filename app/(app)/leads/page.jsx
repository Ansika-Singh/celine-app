"use client";

import { useState } from "react";
import { List } from "react-window";
import { useAppContext } from "@/context/AppContext";
import useSearch from "@/hooks/useSearch";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

const STATUSES = ["New", "Contacted", "Negotiating", "Won", "Lost"];

export default function Leads() {
  const { leads, setLeads } = useAppContext();
  const [dragged, setDragged] = useState(null);
  const { query, setQuery, filteredItems } = useSearch(leads, ["name", "phone"]);

  const updateStatus = async (id, status) => {
    // Optimistic UI update
    setLeads(p => p.map(l => l.id === id ? { ...l, status } : l));
    
    // API Call
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page">
      <div className="ph">
        <div>
          <div className="pt">Sales Pipeline</div>
          <div className="ps">{leads.length} total leads · {fmt(leads.reduce((s, l) => s + l.value, 0))} potential value</div>
        </div>
        <div className="ph-actions">
          <input type="text" className="input" placeholder="Search leads..." value={query} onChange={e => setQuery(e.target.value)} style={{ width: "200px", padding: ".4rem .8rem", fontSize: ".85rem", height: "auto" }} />
          <button className="btn btn-g">+ Add Lead</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "1rem", flex: 1 }}>
        {STATUSES.map(status => {
          const colLeads = filteredItems.filter(l => l.status === status);
          
          const LeadRow = ({ index, style }) => {
            const lead = colLeads[index];
            return (
              <div style={{ ...style, paddingBottom: ".75rem" }}>
                <div 
                  draggable 
                  onDragStart={() => setDragged(lead.id)}
                  style={{ background: "var(--bg)", border: "1px solid var(--border2)", padding: ".85rem", borderRadius: 6, cursor: "grab", height: "100%", boxSizing: "border-box" }}
                >
                  <div style={{ fontSize: ".85rem", color: "var(--cream)", fontWeight: 500, marginBottom: ".25rem" }}>{lead.name}</div>
                  <div style={{ fontSize: ".75rem", color: "var(--gold)", marginBottom: ".5rem" }}>{fmt(lead.value)}</div>
                  <div style={{ fontSize: ".7rem", color: "var(--muted2)" }}>📞 {lead.phone}</div>
                  <div style={{ fontSize: ".7rem", color: "var(--muted)", marginTop: ".5rem", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.notes}</div>
                </div>
              </div>
            );
          };

          return (
          <div 
            key={status} 
            style={{ flex: "0 0 260px", background: "var(--card)", borderRadius: 8, padding: "1rem", border: "1px solid var(--border)" }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              if (dragged) updateStatus(dragged, status);
            }}
          >
            <div style={{ fontSize: ".85rem", fontWeight: 600, color: "var(--cream)", marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
              <span>{status}</span>
              <span className="badge">{leads.filter(l => l.status === status).length}</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", minHeight: 200, flex: 1 }}>
              <List
                height={typeof window !== 'undefined' ? window.innerHeight - 220 : 600}
                rowCount={colLeads.length}
                rowHeight={130}
                width="100%"
                style={{ overflowX: "hidden" }}
                rowComponent={LeadRow}
                rowProps={{}}
              />
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
