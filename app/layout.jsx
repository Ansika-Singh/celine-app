import { AppProvider } from "@/context/AppContext";
import GlobalToast from "@/components/GlobalToast";
import SyncStatus from "@/components/SyncStatus";
import GlobalPrint from "@/components/GlobalPrint";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Celine CRM",
  description: "AI CRM for Indian Businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#14171F" />
      </head>
      <body>
        <AppProvider>
          {children}
          <GlobalToast />
          <SyncStatus />
          <GlobalPrint />
        </AppProvider>
        <Script id="sw-register" dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registration successful');
              }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
              });
            });
          }
        `}} />
      </body>
    </html>
  );
}
