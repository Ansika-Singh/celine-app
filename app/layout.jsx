import { AppProvider } from "@/context/AppContext";
import GlobalToast from "@/components/GlobalToast";
import SyncStatus from "@/components/SyncStatus";
import GlobalPrint from "@/components/GlobalPrint";
import Script from "next/script";
import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata = {
  title: "Celine | Premium AI SaaS",
  description: "The future of intelligent conversations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#070B14" />
      </head>
      <body className="font-sans bg-background text-text">
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
