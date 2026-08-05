"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { queueMutation, flushQueue } from "@/lib/offline";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({ bizName: "Celine Demo Store", ownerName: "Demo User", bizType: "Retail", language: "English", role: "Owner" });
  
  const [customers, setCustomers] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [toast, showToast] = useState(null);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [printingInvoice, setPrintingInvoice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, invRes, invcRes, expRes, stfRes, leadsRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/inventory'),
          fetch('/api/invoices'),
          fetch('/api/expenses'),
          fetch('/api/staff'),
          fetch('/api/leads')
        ]);
        
        setCustomers(await custRes.json());
        setInventory(await invRes.json());
        setInvoices(await invcRes.json());
        setExpenses(await expRes.json());
        setStaff(await stfRes.json());
        setLeads(await leadsRes.json());
      } catch (err) {
        console.error("Failed to load initial data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Offline Sync Queue Logic
  useEffect(() => {
    const handleOnline = async () => {
      console.log("Back online! Syncing background queue...");
      await flushQueue();
      // Re-fetch data after sync
      window.location.reload(); 
    };

    window.addEventListener('online', handleOnline);
    
    // Trigger on mount in case app was closed offline and reopened online
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      flushQueue().then(updateSyncCount);
    } else {
      updateSyncCount();
    }
    
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const updateSyncCount = async () => {
    try {
      const q = await import('@/lib/offline').then(m => m.getQueuedMutations());
      setPendingSyncCount(q.length);
    } catch(e) {}
  };

  // Custom fetch wrapper for offline support
  const apiFetch = async (url, options) => {
    if (!navigator.onLine) {
      console.log("Offline: Queueing request", url);
      await queueMutation({
        type: `API_${options.method.toUpperCase()}`,
        payload: { url, body: options.body ? JSON.parse(options.body) : null }
      });
      updateSyncCount();
      showToast("Offline: Change saved to sync later", "info");
      return { ok: true, offline: true, json: async () => ({}) };
    }
    
    const res = await fetch(url, options);
    if (!res.ok) {
      try {
        const data = await res.json();
        if (data.error) showToast(data.error, "error");
        else showToast("Request failed", "error");
      } catch (e) {
        showToast("Request failed", "error");
      }
    }
    return res;
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      customers, setCustomers,
      inventory, setInventory,
      invoices, setInvoices,
      expenses, setExpenses,
      staff, setStaff,
      leads, setLeads,
      loading,
      toast, showToast,
      pendingSyncCount,
      printingInvoice, setPrintingInvoice,
      apiFetch
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
