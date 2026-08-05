"use client";

import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

const fmt = n => `₹${Number(n).toLocaleString("en-IN")}`;

export default function Receipt({ invoice, onPrinted }) {
  const { user } = useAppContext();

  useEffect(() => {
    const handleAfterPrint = () => {
      onPrinted();
    };
    window.addEventListener('afterprint', handleAfterPrint);
    
    // Trigger print after mounting
    window.print();
    
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [onPrinted]);

  if (!invoice) return null;

  return (
    <div className="print-only" style={{
      fontFamily: "'Courier New', Courier, monospace",
      color: "#000",
      background: "#fff",
      width: "100%",
      maxWidth: "300px", // Approximate 80mm effective width
      margin: "0 auto",
      padding: "10px",
      fontSize: "12px",
      lineHeight: "1.4"
    }}>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h2 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{user?.bizName || "Store"}</h2>
        <div>Receipt #{invoice.id}</div>
        <div>Date: {invoice.date || new Date().toISOString().split("T")[0]}</div>
      </div>

      <div style={{ borderBottom: "1px dashed #000", marginBottom: "10px", paddingBottom: "10px" }}>
        <strong>Customer:</strong> {invoice.customer || "Walk-in"}
      </div>

      <table style={{ width: "100%", marginBottom: "15px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #000" }}>
            <th style={{ textAlign: "left", paddingBottom: "5px" }}>Item</th>
            <th style={{ textAlign: "right", paddingBottom: "5px" }}>Qty</th>
            <th style={{ textAlign: "right", paddingBottom: "5px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items?.map((item, idx) => (
            <tr key={idx}>
              <td style={{ padding: "3px 0" }}>{item.name}</td>
              <td style={{ textAlign: "right", padding: "3px 0" }}>{item.qty}</td>
              <td style={{ textAlign: "right", padding: "3px 0" }}>{fmt(item.price * item.qty)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ borderTop: "1px dashed #000", paddingTop: "10px", display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "14px" }}>
        <span>TOTAL:</span>
        <span>{fmt(invoice.amount)}</span>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "11px" }}>
        <div>Thank you for your business!</div>
        <div>Powered by Celine</div>
      </div>
    </div>
  );
}
