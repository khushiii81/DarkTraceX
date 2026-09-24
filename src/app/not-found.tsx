"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Terminal, Home } from "lucide-react";

const GLITCH_CHARS = "!@#$%^&*()_+{}|:<>?[]\\;',./`~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char) =>
          Math.random() < 0.3
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : char
        ).join("")
      );
      count++;
      if (count > 20) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{display}</span>;
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Scan line */}
      <div className="scan-line absolute inset-0 pointer-events-none" />

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span className="text-[20rem] font-black text-red-600 font-mono">404</span>
      </div>

      {/* Red grid */}
      <div className="absolute inset-0 hex-grid pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-lg"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/60 bg-red-950/30 text-red-400 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          SYSTEM BREACH DETECTED
        </div>

        <h1 className="text-7xl sm:text-9xl font-black text-red-600 font-mono mb-4 glow-text-red">
          <GlitchText text="404" />
        </h1>

        <div className="code-block mb-8 text-left text-sm">
          <div className="text-red-500">[ERROR] Page not found</div>
          <div className="text-orange-400">[WARN]  Access denied: unauthorized path</div>
          <div className="text-gray-500">[INFO]  Redirecting to safe zone...</div>
          <div className="text-green-400/60 mt-2">$ darktracex --recover --safe-mode<span className="cursor-blink">_</span></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-xl transition-all glow-red">
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <Link href="/dashboard" className="flex items-center justify-center gap-2 px-6 py-3 border border-white/10 hover:border-red-900/40 text-gray-400 hover:text-white font-semibold rounded-xl transition-all">
            <Terminal className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
