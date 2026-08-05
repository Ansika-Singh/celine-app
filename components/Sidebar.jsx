"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import OfflineStamp from "@/components/OfflineStamp";

const NAV = [
  { id: "/", label: "Dashboard", icon: "⬡", group: "Overview" },
  { id: "/analytics", label: "Analytics", icon: "📊", group: "Overview" },
  { id: "/leads", label: "Pipeline", icon: "🎯", group: "Overview" },
  { id: "/customers", label: "Khata (Ledger)", icon: "👥", group: "Manage" },
  { id: "/inventory", label: "Inventory", icon: "📦", group: "Manage" },
  { id: "/invoices", label: "Invoices", icon: "🧾", group: "Manage" },
  { id: "/staff", label: "Staff", icon: "🏢", group: "Manage" },
  { id: "/expenses", label: "Expenses", icon: "💸", group: "Finance" },
  { id: "/loyalty", label: "Loyalty", icon: "⭐", group: "Finance" },
  { id: "/calculator", label: "Calculator", icon: "🧮", group: "Tools" },
  { id: "/schemes", label: "Yojana Sahayak", icon: "📋", group: "Tools" },
  { id: "/whatsapp", label: "WhatsApp", icon: "💬", group: "Tools" },
  { id: "/reports", label: "Reports", icon: "📋", group: "Tools" },
  { id: "/ai", label: "AI Assistant", icon: "✦", group: "AI" },
  { id: "/settings", label: "Settings", icon: "⚙️", group: "" },
];

const GROUPS = ["Overview", "Manage", "Finance", "Tools", "AI", ""];
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

export default function Sidebar() {
  const pathname = usePathname();
  const { user, inventory } = useAppContext();

  if (!user) return null;

  const lowStock = inventory.filter(i => i.stock < i.minStock).length;

  return (
    <div className="sidebar">
      <div className="s-logo">Celine <div className="s-logo-dot" /></div>
      <div className="s-biz">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="s-biz-name">{user.bizName}</div>
          <OfflineStamp />
        </div>
        <div className="s-biz-type">{user.bizType}</div>
      </div>
      {GROUPS.map(group => {
        const items = NAV.filter(n => n.group === group);
        if (!items.length) return null;
        
        // RBAC Check
        if (user.role !== "Owner" && (group === "Finance" || group === "Overview")) return null;
        
        return (
          <div key={group} className="nav-group">
            {group && <div className="nav-label">{group}</div>}
            {items.map(n => {
              const isActive = pathname === n.id || (pathname !== "/" && n.id !== "/" && pathname.startsWith(n.id));
              return (
                <Link key={n.id} href={n.id} style={{ textDecoration: "none" }}>
                  <div className={`nav-item ${isActive ? "active" : ""}`}>
                    <span className="nav-icon">{n.icon}</span>
                    <span>{n.label}</span>
                    {n.id === "/inventory" && lowStock > 0 && <span className="nav-badge">{lowStock}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
      <div className="s-bottom">
        <div className="u-chip">
          <div className="u-avatar">{initials(user.ownerName)}</div>
          <div>
            <div className="u-name">{user.ownerName}</div>
            <div className="u-role">Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
}
