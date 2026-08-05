import Sidebar from "@/components/Sidebar";
import VoiceNav from "@/components/VoiceNav";

export default function AppLayout({ children }) {
  return (
    <>
      <div className="grain" />
      <div className="app">
        <Sidebar />
        <div className="main">
          {children}
        </div>
      </div>
      <VoiceNav />
    </>
  );
}
