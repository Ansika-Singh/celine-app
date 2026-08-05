"use client";

import { useAppContext } from "@/context/AppContext";
import Receipt from "./Receipt";

export default function GlobalPrint() {
  const { printingInvoice, setPrintingInvoice } = useAppContext();
  
  if (!printingInvoice) return null;
  
  return <Receipt invoice={printingInvoice} onPrinted={() => setPrintingInvoice(null)} />;
}
