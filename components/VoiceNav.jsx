"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";

export default function VoiceNav() {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const router = useRouter();
  const { user, showToast } = useAppContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        setSupported(false);
      }
    }
  }, []);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = user?.language === "Hindi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.speak(ut);
  };

  const startListening = () => {
    if (!supported) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRec();
    
    recognition.lang = user?.language === "Hindi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setListening(true);
      speak("Listening...");
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Heard:", transcript);
      
      // Basic routing commands
      if (transcript.includes("dashboard") || transcript.includes("home")) {
        speak("Going to Dashboard");
        router.push("/dashboard");
      } else if (transcript.includes("customer")) {
        speak("Opening Customers");
        router.push("/customers");
      } else if (transcript.includes("inventory") || transcript.includes("stock")) {
        speak("Opening Inventory");
        router.push("/inventory");
      } else if (transcript.includes("calculator") || transcript.includes("bill")) {
        speak("Opening Calculator");
        router.push("/calculator");
      } else if (transcript.includes("udhar")) {
        speak("Opening Customers to check Udhar");
        router.push("/customers");
      } else {
        speak("Sorry, I didn't catch that command.");
        showToast("Sorry, I didn't catch that command", "error");
      }
    };
    
    recognition.onerror = (e) => {
      console.error(e);
      speak("Error connecting to microphone.");
      showToast("Couldn't hear that, please try again.", "error");
      setListening(false);
    };
    
    recognition.onend = () => {
      setListening(false);
    };
    
    recognition.start();
  };

  if (!supported) return null;

  return (
    <button 
      onClick={startListening}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: listening ? "var(--red)" : "var(--gold)",
        color: "var(--bg)",
        border: "none",
        fontSize: "1.5rem",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: listening ? "pulse 1.5s infinite" : "none"
      }}
    >
      🎙️
    </button>
  );
}
