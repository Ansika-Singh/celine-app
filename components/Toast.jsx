"use client";

import { useEffect } from "react";

export default function Toast({ msg, type = "success", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, type === "error" ? 4000 : 2500);
    return () => clearTimeout(t);
  }, [onDone, type]);

  const bg = type === "error" ? "var(--red)" : type === "info" ? "var(--blue)" : "var(--green)";
  const icon = type === "error" ? "✕" : type === "info" ? "ℹ" : "✓";

  return <div className="toast" style={{ background: bg }}>{icon} {msg}</div>;
}
