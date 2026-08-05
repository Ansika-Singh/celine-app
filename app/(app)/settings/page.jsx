"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Toast from "@/components/Toast";
import { LANGUAGES } from "@/lib/data";

export default function Settings() {
  const { user, setUser, showToast } = useAppContext();
  const [s, setS] = useState({ notifications: true, whatsapp: true, lowStockAlert: true, darkMode: true, language: user?.language || "English", currency: "INR", bizName: user?.bizName || "", cloudBackup: false });
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const handleDownloadBackup = async () => {
    try {
      const res = await fetch('/api/backup');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `celine-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      showToast("Failed to download backup", "error");
    }
  };

  const handleUploadBackup = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const confirmRestore = window.confirm("WARNING: This will replace all your current business data with the uploaded file. Are you absolutely sure?");
    if (!confirmRestore) {
      e.target.value = null;
      return;
    }

    setIsUploading(true);
    
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      
      // Strict Schema Check
      const requiredKeys = ['customers', 'inventory', 'invoices', 'expenses', 'staff', 'leads'];
      const isValid = requiredKeys.every(key => Array.isArray(payload[key]));
      if (!isValid) {
        showToast("Invalid backup file: Missing required data collections.", "error");
        setIsUploading(false);
        e.target.value = null;
        return;
      }

      showToast("Creating pre-restore snapshot...", "info");
      // Pre-restore snapshot: auto-download current state just in case
      try {
        const currentRes = await fetch('/api/backup');
        const currentData = await currentRes.json();
        const snapBlob = new Blob([JSON.stringify(currentData, null, 2)], { type: 'application/json' });
        const snapUrl = URL.createObjectURL(snapBlob);
        const snapA = document.createElement('a');
        snapA.href = snapUrl;
        snapA.download = `celine-prerestore-snapshot-${Date.now()}.json`;
        snapA.click();
      } catch (snapErr) {
        console.warn("Could not create pre-restore snapshot", snapErr);
      }
      
      const res = await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        showToast("Backup restored successfully! Reloading...", "success");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        showToast("Failed to restore backup on server.", "error");
      }
    } catch (err) {
      showToast("Error reading or restoring backup.", "error");
    } finally {
      setIsUploading(false);
      e.target.value = null; // reset input
    }
  };

  if (!user) return null;
  
  return (
    <div className="page">
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      <div className="ph"><div><div className="pt">Settings</div><div className="ps">Manage your business profile and preferences</div></div><button className="btn btn-g" onClick={() => { setUser(p => ({ ...p, bizName: s.bizName, language: s.language })); setToast("Settings saved!"); }}>Save Changes</button></div>
      <div className="g2">
        <div>
          <div className="card mb">
            <div className="st">Business Profile</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="fg"><div className="fl">Business Name</div><input className="fi" value={s.bizName} onChange={e => setS(p => ({ ...p, bizName: e.target.value }))} /></div>
              <div className="fg"><div className="fl">Owner Name</div><input className="fi" value={user.ownerName} readOnly style={{ opacity: .6 }} /></div>
              <div className="fg"><div className="fl">Business Type</div>
                <select className="fi" value={user.bizType} readOnly><option>{user.bizType}</option></select>
              </div>
              <div className="fg"><div className="fl">Language</div>
                <select className="fi" value={s.language} onChange={e => setS(p => ({ ...p, language: e.target.value }))}>
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card mb">
            <div className="st">Notifications</div>
            {[
              { k: "notifications", l: "Push Notifications", sub: "Get alerts for new activity" },
              { k: "whatsapp", l: "WhatsApp Reminders", sub: "Auto-send payment reminders" },
              { k: "lowStockAlert", l: "Low Stock Alerts", sub: "Alert when items run low" },
              { k: "darkMode", l: "Dark Mode", sub: "Always dark (recommended)" },
            ].map(r => (
              <div key={r.k} className="set-row">
                <div><div className="set-label">{r.l}</div><div className="set-sub">{r.sub}</div></div>
                <button className={`toggle ${s[r.k] ? "on" : "off"}`} onClick={() => setS(p => ({ ...p, [r.k]: !p[r.k] }))} />
              </div>
            ))}
          </div>
          <div className="card mb">
            <div className="st">Data Backup & Restore</div>
            
            <div className="set-row">
              <div><div className="set-label">Download Local Backup</div><div className="set-sub">Export all business data to a JSON file</div></div>
              <button className="btn btn-g" style={{ fontSize: ".75rem", padding: ".4rem .8rem" }} onClick={handleDownloadBackup}>Download</button>
            </div>
            
            <div className="set-row">
              <div><div className="set-label">Restore from Backup</div><div className="set-sub">Upload a previously downloaded JSON backup</div></div>
              <div>
                <input type="file" id="backup-upload" accept=".json" style={{ display: 'none' }} onChange={handleUploadBackup} disabled={isUploading} />
                <button className="btn btn-ghost" style={{ fontSize: ".75rem", padding: ".4rem .8rem" }} onClick={() => document.getElementById('backup-upload').click()} disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            <div className="set-row" style={{ borderBottom: "none" }}>
              <div>
                <div className="set-label" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12l-6-6v4h-6v4h6v4l6-6zM2 12c0 5.52 4.48 10 10 10s10-4.48 10-10H2c0 5.52 4.48 10 10 10z" style={{display:'none'}}/></svg>
                  Connect Google Drive
                </div>
                <div className="set-sub">Automatically backup data daily to your Google Drive</div>
              </div>
              <button className={`toggle ${s.cloudBackup ? "on" : "off"}`} onClick={() => {
                if (!s.cloudBackup) setToast("Redirecting to Google OAuth... (Stub)");
                setS(p => ({ ...p, cloudBackup: !p.cloudBackup }));
              }} />
            </div>
          </div>
          <div className="card">
            <div className="st">Danger Zone</div>
            <div className="set-row">
              <div><div className="set-label" style={{ color: "var(--red)" }}>Export All Data</div><div className="set-sub">Download CSV backup</div></div>
              <button className="btn btn-ghost" style={{ fontSize: ".75rem", padding: ".4rem .8rem" }}>Export</button>
            </div>
            <div className="set-row" style={{ borderBottom: "none" }}>
              <div><div className="set-label" style={{ color: "var(--red)" }}>Reset Business Data</div><div className="set-sub">Clear all records</div></div>
              <button className="btn btn-r" style={{ fontSize: ".75rem", padding: ".4rem .8rem" }}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
