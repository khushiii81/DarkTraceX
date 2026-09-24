"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Play, RefreshCw, Cpu } from "lucide-react";

type Phase = "idle" | "alloc" | "write" | "inject" | "execute" | "done";

const PHASE_LABELS: Record<Phase, string> = {
  idle: "Ready to simulate",
  alloc: "VirtualAllocEx — Allocating RWX memory in target process",
  write: "WriteProcessMemory — Writing shellcode to allocated region",
  inject: "CreateRemoteThread — Creating thread pointing to shellcode",
  execute: "Shellcode executing under svchost.exe context!",
  done: "Injection complete — malware hidden inside legitimate process",
};

const PHASES: Phase[] = ["alloc", "write", "inject", "execute", "done"];

const PHASE_COLORS: Record<Phase, string> = {
  idle: "#6b7280",
  alloc: "#f59e0b",
  write: "#f97316",
  inject: "#dc143c",
  execute: "#dc143c",
  done: "#dc143c",
};

const SHELLCODE_BYTES = [
  "FC", "48", "83", "E4", "F0", "E8", "C8", "00", "00", "00", "41", "51",
  "41", "50", "52", "51", "56", "48", "31", "D2", "65", "48", "8B", "52",
  "60", "48", "8B", "52", "18", "48", "8B", "52", "20", "48", "8F", "B7",
  "4A", "4A", "4D", "31", "C9", "48", "31", "C0", "AC", "3C", "61", "7C",
];

export default function Module6Page() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [byteProgress, setByteProgress] = useState(0);
  const [memBlock, setMemBlock] = useState<boolean[]>(new Array(64).fill(false));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runInjection = async () => {
    if (phase !== "idle" && phase !== "done") return;
    setPhase("idle");
    setByteProgress(0);
    setMemBlock(new Array(64).fill(false));
    await new Promise(r => setTimeout(r, 400));

    setPhase("alloc");
    await new Promise(r => setTimeout(r, 1800));

    setPhase("write");
    // Animate byte writing
    for (let i = 0; i < 64; i++) {
      await new Promise(r => setTimeout(r, 40));
      setByteProgress(i + 1);
      setMemBlock(prev => { const n = [...prev]; n[i] = true; return n; });
    }
    await new Promise(r => setTimeout(r, 500));

    setPhase("inject");
    await new Promise(r => setTimeout(r, 1800));

    setPhase("execute");
    await new Promise(r => setTimeout(r, 1500));

    setPhase("done");
  };

  // Draw process diagram
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const boxW = Math.min(200, w * 0.25);
    const boxH = 80;
    const y = h / 2 - boxH / 2;

    // malware.exe box
    ctx.fillStyle = phase === "idle" ? "rgba(220,20,60,0.1)" : "rgba(220,20,60,0.25)";
    ctx.strokeStyle = "#dc143c";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(20, y, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("malware.exe", 20 + boxW / 2, y + 28);
    ctx.fillStyle = "#dc2626";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillText("PID 4412", 20 + boxW / 2, y + 46);
    ctx.fillStyle = "#6b7280";
    ctx.font = "9px monospace";
    ctx.fillText("ATTACKER", 20 + boxW / 2, y + 62);

    // Arrow
    const arrowColor = PHASE_COLORS[phase];
    const arrowStart = 20 + boxW + 10;
    const arrowEnd = w - 20 - boxW - 10;
    const arrowY = h / 2;

    if (phase !== "idle") {
      // Animated dashes
      ctx.beginPath();
      ctx.strokeStyle = arrowColor;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 6]);
      ctx.moveTo(arrowStart, arrowY);
      ctx.lineTo(arrowEnd, arrowY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arrowhead
      ctx.beginPath();
      ctx.fillStyle = arrowColor;
      ctx.moveTo(arrowEnd, arrowY);
      ctx.lineTo(arrowEnd - 10, arrowY - 6);
      ctx.lineTo(arrowEnd - 10, arrowY + 6);
      ctx.fill();
    }

    // API label
    if (phase !== "idle") {
      const label = phase === "alloc" ? "VirtualAllocEx()" : phase === "write" ? "WriteProcessMemory()" : phase === "inject" ? "CreateRemoteThread()" : phase === "execute" || phase === "done" ? "EXECUTING" : "";
      ctx.fillStyle = arrowColor;
      ctx.font = "bold 10px 'JetBrains Mono', monospace";
      ctx.textAlign = "center";
      ctx.fillText(label, (arrowStart + arrowEnd) / 2, arrowY - 12);
    }

    // svchost.exe box
    const targetColor = (phase === "execute" || phase === "done") ? "rgba(220,20,60,0.3)" : "rgba(34,197,94,0.1)";
    const targetBorder = (phase === "execute" || phase === "done") ? "#dc143c" : "#22c55e";
    ctx.fillStyle = targetColor;
    ctx.strokeStyle = targetBorder;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(w - 20 - boxW, y, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = targetBorder;
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("svchost.exe", w - 20 - boxW / 2, y + 28);
    ctx.fillStyle = "#6b7280";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.fillText("PID 876", w - 20 - boxW / 2, y + 46);
    ctx.fillStyle = "#6b7280";
    ctx.font = "9px monospace";
    ctx.fillText("SYSTEM", w - 20 - boxW / 2, y + 62);

    // Memory block in svchost box
    if (phase === "write" || phase === "inject" || phase === "execute" || phase === "done") {
      ctx.fillStyle = (phase === "execute" || phase === "done") ? "rgba(220,20,60,0.6)" : "rgba(255,69,0,0.4)";
      ctx.fillRect(w - 20 - boxW + 10, y + 10, Math.min(boxW - 20, byteProgress * 2.8), 20);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "8px monospace";
      ctx.textAlign = "left";
      ctx.fillText("shellcode", w - 20 - boxW + 12, y + 24);
      ctx.textAlign = "center";
    }

  }, [phase, byteProgress]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-6">
          <Link href="/dashboard" className="hover:text-red-400">dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-red-400">module-06</span>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/50 bg-red-950/20 text-red-400 text-xs font-mono mb-3">MODULE 06 — MEMORY ANALYSIS</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Process <span className="text-red-500">Injection</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl text-sm">Animate how malware injects shellcode into a legitimate system process using classic Windows API techniques: VirtualAllocEx → WriteProcessMemory → CreateRemoteThread.</p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-6">
          <button
            id="run-injection-btn"
            onClick={runInjection}
            disabled={phase !== "idle" && phase !== "done"}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 border border-red-700 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Play className="w-4 h-4" />
            {phase === "done" ? "Re-run Injection" : phase === "idle" ? "Simulate Injection" : "Injecting..."}
          </button>
          <button onClick={() => { setPhase("idle"); setByteProgress(0); setMemBlock(new Array(64).fill(false)); }} className="p-2.5 border border-white/10 rounded-xl text-gray-500 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Status */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 px-4 py-3 rounded-xl border font-mono text-sm flex items-center gap-3 ${
              phase === "done" ? "border-red-700 bg-red-950/30 text-red-300" :
              phase === "idle" ? "border-white/10 bg-white/5 text-gray-500" :
              "border-orange-800 bg-orange-950/20 text-orange-300"
            }`}
          >
            {phase !== "idle" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />}
            {PHASE_LABELS[phase]}
          </motion.div>
        </AnimatePresence>

        {/* Process Diagram Canvas */}
        <div className="bg-[#0d0d0d] border border-white/5 rounded-2xl mb-6 overflow-hidden" style={{ height: 180 }}>
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Memory Grid */}
        <div className="bg-[#111] border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-red-400" />
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">svchost.exe Memory Space — Allocated Region</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {memBlock.map((filled, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: filled
                    ? (phase === "execute" || phase === "done" ? "#dc143c" : "#ff4500")
                    : "rgba(255,255,255,0.04)",
                }}
                className="w-5 h-5 rounded-sm font-mono text-[6px] flex items-center justify-center"
                title={filled ? SHELLCODE_BYTES[i % SHELLCODE_BYTES.length] : "00"}
              >
                <span className={filled ? "text-white/60" : "text-white/10"}>
                  {filled ? SHELLCODE_BYTES[i % SHELLCODE_BYTES.length] : "··"}
                </span>
              </motion.div>
            ))}
          </div>
          {byteProgress > 0 && (
            <div className="mt-3 text-xs font-mono text-gray-600">
              {byteProgress} / 64 bytes written — {SHELLCODE_BYTES.slice(0, Math.min(6, byteProgress)).join(" ")}...
            </div>
          )}
        </div>

        {/* API sequence */}
        <div className="space-y-2">
          {(["alloc", "write", "inject", "execute"] as Phase[]).map((p, i) => (
            <div key={p} className={`flex items-start gap-4 p-3 rounded-xl border transition-all ${
              phase === p ? "border-red-700 bg-red-950/20" :
              PHASES.indexOf(phase) > PHASES.indexOf(p) ? "border-white/5 bg-white/[0.02] opacity-60" :
              "border-white/5 opacity-30"
            }`}>
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono shrink-0 ${
                PHASES.indexOf(phase) > i ? "bg-red-900 border-red-700 text-red-200" :
                phase === p ? "border-red-500 text-red-400" : "border-white/10 text-gray-600"
              }`}>
                {PHASES.indexOf(phase) > i ? "✓" : i + 1}
              </div>
              <div>
                <div className="font-mono text-sm text-white">
                  {["VirtualAllocEx()", "WriteProcessMemory()", "CreateRemoteThread()", "Shellcode Execution"][i]}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {[
                    "Reserve RWX memory region in target process address space",
                    "Copy shellcode bytes into the allocated memory region",
                    "Spawn new thread at shellcode entry point in target process",
                    "Shellcode runs with svchost.exe privileges and identity"
                  ][i]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
          <Link href="/module/5" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Module 05 — Behavior Tracker
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            Back to Dashboard <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
