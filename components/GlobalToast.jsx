"use client";

import { useAppContext } from "@/context/AppContext";
import Toast from "./Toast";

export default function GlobalToast() {
  const { toast, showToast } = useAppContext();
  if (!toast) return null;
  return <Toast msg={toast.msg} type={toast.type} onDone={() => showToast(null)} />;
}
