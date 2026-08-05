"use client";

import { useState, useRef, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { GEMINI_KEY } from "@/lib/data";

export default function AIAssistant() {
  const { user, customers, inventory, invoices, expenses, showToast } = useAppContext();
  
  const [msgs, setMsgs] = useState([{ role: "ai", text: `Namaste! I'm Celine AI for ${user?.bizName}. Ask me anything — "Who owes me money?", "What should I restock?", "How's my profit this month?" — I'll answer instantly.` }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) }, [msgs]);
  
  const CONTEXT = `You are Celine AI, assistant for ${user?.bizName} (${user?.bizType}) owned by ${user?.ownerName}.
Data:
Customers: ${JSON.stringify(customers)}
Inventory: ${JSON.stringify(inventory)}
Invoices: ${JSON.stringify(invoices)}
Expenses: ${JSON.stringify(expenses)}
Answer concisely (2-4 sentences or a short list). Use ₹. Language preference: ${user?.language}.`;
  
  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim(); setInput("");
    setMsgs(p => [...p, { role: "user", text: q }]);
    
    // OFFLINE TIER (Tier 2/3)
    if (!navigator.onLine) {
      setLoading(true);
      setTimeout(() => {
        let response = "I am currently offline, but here is what I found in your local data: ";
        const ql = q.toLowerCase();
        
        if (ql.includes("owes") || ql.includes("udhar") || ql.includes("credit")) {
          const udhar = customers.filter(c => c.udhar > 0);
          response += udhar.length ? `${udhar.length} customers owe you money. The highest is ${udhar.sort((a,b)=>b.udhar-a.udhar)[0].name}.` : "Nobody owes you money!";
        } else if (ql.includes("stock") || ql.includes("low") || ql.includes("inventory")) {
          const low = inventory.filter(i => i.stock < i.minStock);
          response += low.length ? `You have ${low.length} items running low on stock (e.g. ${low[0].name}).` : "All your inventory is well stocked.";
        } else if (ql.includes("profit") || ql.includes("revenue")) {
          const rev = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
          const exp = expenses.reduce((s, e) => s + e.amount, 0);
          response += `Your revenue is ₹${rev} and expenses are ₹${exp}, leaving a net profit of ₹${rev - exp}.`;
        } else {
          response = "You're currently offline. I can only answer basic queries about udhar, stock, and profit until connection is restored.";
        }
        
        setMsgs(p => [...p, { role: "ai", text: response }]);
        setLoading(false);
      }, 600);
      return;
    }

    // ONLINE TIER (Tier 1 - Gemini)
    setLoading(true);
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: CONTEXT + "\n\nQuestion: " + q }] }], generationConfig: { maxOutputTokens: 400, temperature: .7 } })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || "Unknown error");
      const t = d?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't get a response.";
      setMsgs(p => [...p, { role: "ai", text: t }]);
    } catch (err) {
      showToast("Gemini is currently unavailable. Check your connection or API key.", "error");
    }
    setLoading(false);
  };
  
  const SUGGESTIONS = ["Who owes me money?", "What's low in stock?", "What's my profit this month?", "Who's my best customer?", "Send udhar reminders?", "Which items have best margin?"];
  
  return (
    <div className="page" style={{ paddingBottom: 0, height: "calc(100vh - 2rem)", display: "flex", flexDirection: "column" }}>
      <div className="ph" style={{ flexShrink: 0 }}><div><div className="pt">AI Assistant</div><div className="ps">Powered by Gemini 1.5 Flash · Free tier</div></div></div>
      <div className="card chat-wrap" style={{ padding: 0, flex: 1 }}>
        <div className="chat-msgs">
          {msgs.map((m, i) => (
            <div key={i} className={`cm ${m.role}`}>
              <div className="cs">{m.role === "ai" ? "✦ Celine AI" : "You"}</div>
              <div className="cb">{m.text}</div>
            </div>
          ))}
          {loading && <div className="cm ai"><div className="cs">✦ Celine AI</div><div className="cb"><div className="typing"><div className="dot" /><div className="dot" /><div className="dot" /></div></div></div>}
          <div ref={bottomRef} />
        </div>
        {msgs.length === 1 && (
          <div style={{ padding: "0 1.25rem .75rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {SUGGESTIONS.map(s => <button key={s} onClick={() => setInput(s)} style={{ background: "var(--card2)", border: "1px solid var(--border2)", color: "var(--muted2)", borderRadius: 20, padding: ".3rem .8rem", fontSize: ".72rem", cursor: "pointer" }}>{s}</button>)}
          </div>
        )}
        <div className="ci-row">
          <input className="ci" placeholder="Ask about your business..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
          <button className="btn btn-g" onClick={send} disabled={loading || !input.trim()}>Send</button>
        </div>
      </div>
    </div>
  );
}
