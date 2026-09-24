"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Play, Activity, FolderOpen, Settings, Clock } from "lucide-react";

type EventType = "process" | "file" | "registry" | "network" | "persistence";

interface SimEvent {
  time: string;
  type: EventType;
  action: string;
  target: string;
  detail: string;
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const EVENTS: SimEvent[] = [
  { time: "T+0.0s", type: "process", action: "CreateProcess", target: "malware.exe (PID 4412)", detail: "Parent: explorer.exe (PID 2984)", risk: "MEDIUM" },
  { time: "T+0.2s", type: "process", action: "CreateProcess", target: "cmd.exe (PID 4416)", detail: "Spawned as child process — suspicious", risk: "HIGH" },
  { time: "T+0.4s", type: "network", action: "DNS Query", target: "malicious-c2.ru", detail: "Resolves to 185.220.101.47", risk: "CRITICAL" },
  { time: "T+0.7s", type: "network", action: "HTTPConnect", target: "185.220.101.47:443", detail: "TLS handshake — C2 beacon", risk: "CRITICAL" },
  { time: "T+1.1s", type: "file", action: "WriteFile", target: "%TEMP%\\svchost32.exe", detail: "Drops secondary payload (37KB)", risk: "CRITICAL" },
  { time: "T+1.4s", type: "registry", action: "RegSetValue", target: "HKLM\\...\\Run\\WindowsUpdate", detail: "Value: %TEMP%\\svchost32.exe", risk: "CRITICAL" },
  { time: "T+1.6s", type: "persistence", action: "SchTask Create", target: "\\Microsoft\\Windows\\svchost-updater", detail: "Trigger: On Logon, every 10 min", risk: "CRITICAL" },
  { time: "T+1.9s", type: "file", action: "SetFileAttributes", target: "%TEMP%\\svchost32.exe", detail: "Setting: HIDDEN | SYSTEM", risk: "HIGH" },
  { time: "T+2.2s", type: "process", action: "CreateRemoteThread", target: "svchost.exe (PID 876)", detail: "Injecting shellcode into system process", risk: "CRITICAL" },
  { time: "T+2.5s", type: "network", action: "SendData", target: "185.220.101.47:443", detail: "Exfiltrating credentials (2.1KB)", risk: "CRITICAL" },
];

const EVENT_ICONS: Record<EventType, React.ElementType> = {
  process: Activity,
  file: FolderOpen,
  registry: Settings,
  network: Activity,
  persistence: Clock,
};

const EVENT_COLORS: Record<EventType, string> = {
  process: "text-blue-400 bg-blue-900/20 border-blue-900/40",
  file: "text-orange-400 bg-orange-900/20 border-orange-900/40",
  registry: "text-purple-400 bg-purple-900/20 border-purple-900/40",
  network: "text-red-400 bg-red-900/20 border-red-900/40",
  persistence: "text-yellow-400 bg-yellow-900/20 border-yellow-900/40",
};

const RISK_COLOR: Record<string, string> = {
  CRITICAL: "text-red-300 border-red-600/50 bg-red-950/50",
  HIGH: "text-orange-400 border-orange-700/50 bg-orange-950/30",
  MEDIUM: "text-yellow-500 border-yellow-700/40 bg-yellow-950/30",
  LOW: "text-gray-400 border-gray-700/40 bg-gray-900/40",
};

export default function Module5Page() {
  const [revealed, setRevealed] = useState(0);
  const [running, setRunning] = useState(false);

  const runAnalysis = () => {
    if (running) return;
    setRevealed(0);
    setRunning(true);
    EVENTS.forEach((_, i) => {
      setTimeout(() => {
        setRevealed(i + 1);
        if (i === EVENTS.length - 1) setRunning(false);
      }, i * 600);
    });
  };

  const criticalCount = EVENTS.slice(0, revealed).filter(e => e.risk === "CRITICAL").length;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-6">
          <Link href="/dashboard" className="hover:text-red-400">dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-red-400">module-05</span>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/50 bg-red-950/20 text-red-400 text-xs font-mono mb-3">MODULE 05 — DYNAMIC ANALYSIS</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Behavior <span className="text-red-500">Tracker</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl text-sm">Simulate dynamic analysis inside an isolated sandbox. Watch as malware creates processes, modifies files, establishes C2 connections, and installs persistence mechanisms in real-time.</p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <button
            id="run-dynamic-btn"
            onClick={runAnalysis}
            disabled={running}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 border border-red-700 text-white text-sm font-semibold rounded-xl transition-all"
          >
            {running ? <Activity className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4" />}
            {running ? "Executing..." : "Run Dynamic Analysis"}
          </button>
          <button onClick={() => { setRevealed(0); setRunning(false); }} className="text-xs text-gray-600 hover:text-gray-400 font-mono">Reset</button>

          {revealed > 0 && (
            <div className="ml-auto flex items-center gap-4 text-xs font-mono">
              <span className="text-gray-600">Events: <span className="text-white">{revealed}</span></span>
              {criticalCount > 0 && (
                <span className="text-red-400 border border-red-900/50 bg-red-950/30 px-2 py-0.5 rounded">
                  ⚠ {criticalCount} CRITICAL
                </span>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <AnimatePresence>
            {EVENTS.slice(0, revealed).map((event, i) => {
              const Icon = EVENT_ICONS[event.type];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex gap-4 items-start bg-[#0d0d0d] border border-white/5 rounded-xl p-4 hover:border-red-900/20 transition-colors"
                >
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${EVENT_COLORS[event.type]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {i < revealed - 1 && <div className="w-0.5 h-4 bg-white/5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="text-xs font-mono text-gray-600">{event.time}</span>
                      <span className="text-xs font-mono font-bold text-white">{event.action}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${RISK_COLOR[event.risk]}`}>{event.risk}</span>
                    </div>
                    <div className="font-mono text-sm text-orange-300 truncate">{event.target}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{event.detail}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {revealed === 0 && (
            <div className="flex items-center justify-center h-40 border border-dashed border-white/10 rounded-2xl">
              <span className="text-sm text-gray-600 font-mono">Click &quot;Run Dynamic Analysis&quot; to begin simulation</span>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
          <Link href="/module/4" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Module 04 — Packer Lab
          </Link>
          <Link href="/module/6" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            Module 06 — Process Injection <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
