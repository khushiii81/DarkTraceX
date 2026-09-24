"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start offscreen randomly
    }

    let animId: number;
    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; // Fade effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(255, 30, 39, 0.4)"; // Inferno Red text
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.08]" />;
}


function PacketSniffer() {
  const [packets, setPackets] = useState<string[]>([]);

  useEffect(() => {
    const generateIP = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    const interval = setInterval(() => {
      setPackets((prev) => {
        const type = Math.random() > 0.8 ? "TCP/RST" : (Math.random() > 0.5 ? "UDP/FLOOD" : "TLSv1.3");
        const newLog = `[${new Date().toISOString().substring(11, 23)}] SRC: ${generateIP()} -> DST: ${generateIP()} | PROTOCOL: ${type} | LEN: ${Math.floor(Math.random() * 1500)}`;
        const next = [...prev, newLog];
        if (next.length > 15) next.shift();
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 right-4 w-96 h-48 bg-black/60 border border-red-900/50 rounded p-2 overflow-hidden font-mono text-[10px] text-red-500/70 shadow-lg">
      <div className="border-b border-red-900/50 mb-1 pb-1 font-bold flex items-center justify-between">
        <span>INTERFACE: eth0 (PROMISC)</span>
        <span className="animate-pulse bg-red-500 text-black px-1 rounded">SNIFFING</span>
      </div>
      <div className="flex flex-col justify-end h-[calc(100%-20px)]">
        {packets.map((p, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="truncate">
            {p}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function HackingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
      {/* Real-time Canvas Effects */}
      <MatrixRain />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(255, 30, 39, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 30, 39, 0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: 'center center'
      }} />

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />

      {/* Vignette Overlay */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />

      {/* HUD Elements */}
      <PacketSniffer />
    </div>
  );
}
