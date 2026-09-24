"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, ChevronRight, Activity, BarChart2, Bug, Cpu, Lock, Network, AlertTriangle, Radio, Smartphone, FileWarning, Key, Skull } from "lucide-react";

const MODULES = [
  {
    id: 1,
    icon: Network,
    title: "Phishing & Dropper",
    description: "Simulate a weaponized email macro dropping a PowerShell stager and C2 payload.",
    threat: "HIGH",
    threatColor: "threat-high",
    tags: ["Phishing", "Macros", "C2 Drop"],
    stats: { simulations: "1.2K", complexity: "Medium" },
  },
  {
    id: 2,
    icon: Cpu,
    title: "Obfuscation & Unpacking Lab",
    description: "Analyze packed executables, control-flow flattening, and in-memory IAT rebuilding.",
    threat: "ADVANCED",
    threatColor: "text-purple-500",
    tags: ["Obfuscation", "UPX", "IAT Rebuild"],
    stats: { simulations: "3.4K", complexity: "Advanced" },
  },
  {
    id: 3,
    icon: BarChart2,
    title: "Sandbox Evasion",
    description: "Deploy evasion mechanics, execution throttling, and contrast sandbox vs VM telemetry.",
    threat: "HIGH",
    threatColor: "threat-high",
    tags: ["Sandbox", "Evasion", "Telemetry"],
    stats: { simulations: "2.8K", complexity: "Advanced" },
  },
  {
    id: 4,
    icon: Lock,
    title: "Multi-Vector Persistence",
    description: "Establish persistence via Registry Run keys, WMI triggers, and Windows Service hijacking.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Persistence", "Registry", "Services"],
    stats: { simulations: "940", complexity: "Advanced" },
  },
  {
    id: 5,
    icon: Activity,
    title: "Dynamic Behavior & Registry Tracker",
    description: "Simulate dynamic analysis with process timelines, file system mods, and Registry persistence.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Registry", "Persistence", "Dynamic"],
    stats: { simulations: "2.1K", complexity: "Advanced" },
  },
  {
    id: 6,
    icon: Bug,
    title: "Memory & Process Injection",
    description: "Animate shellcode injection into a legitimate process — executing in its memory space.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Injection", "Memory", "Shellcode"],
    stats: { simulations: "1.7K", complexity: "Expert" },
  },
  {
    id: 7,
    icon: AlertTriangle,
    title: "WannaCry Ransomware Simulator",
    description: "Experience the mechanics of a real ransomware attack. Watch file encryption spread and interact with the infamous ransom note.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Ransomware", "Encryption", "WannaCry"],
    stats: { simulations: "5.1K", complexity: "Advanced" },
  },
  {
    id: 8,
    icon: Radio,
    title: "Stuxnet ICS/SCADA Sabotage",
    description: "Simulate the world's first cyberweapon. Observe the malicious PLC override that destroyed nuclear centrifuges.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Stuxnet", "SCADA", "ICS"],
    stats: { simulations: "3.2K", complexity: "Expert" },
  },
  {
    id: 9,
    icon: Smartphone,
    title: "Pegasus Zero-Click Spyware",
    description: "Understand mobile exploitation. Animate an invisible zero-click payload silently extracting encrypted device data.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Spyware", "Zero-Click", "Mobile"],
    stats: { simulations: "2.5K", complexity: "Expert" },
  },
  {
    id: 10,
    icon: FileWarning,
    title: "Emotet / TrickBot Dropper",
    description: "Analyze how a malicious macro document downloads a fileless payload into memory and establishes C2 beaconing.",
    threat: "HIGH",
    threatColor: "threat-high",
    tags: ["Trojan", "Macro", "C2"],
    stats: { simulations: "4.2K", complexity: "Advanced" },
  },
  {
    id: 11,
    icon: Key,
    title: "Zeus / RedLine Stealer",
    description: "Watch process injection into explorer.exe, registry persistence, and active memory scraping for browser credentials.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Stealer", "Injection", "Scraping"],
    stats: { simulations: "3.8K", complexity: "Expert" },
  },
  {
    id: 12,
    icon: Skull,
    title: "NotPetya Destructive Wiper",
    description: "Simulate a fake ransomware attack that actually wipes the Master Boot Record (MBR) and destroys the Master File Table.",
    threat: "CRITICAL",
    threatColor: "threat-critical",
    tags: ["Wiper", "MBR", "Destructive"],
    stats: { simulations: "6.1K", complexity: "Expert" },
  },
];

const threatBadge: Record<string, string> = {
  LOW: "bg-yellow-900/30 border-yellow-700/50 text-yellow-400",
  MEDIUM: "bg-orange-900/30 border-orange-700/50 text-orange-400",
  HIGH: "bg-red-900/30 border-red-700/50 text-red-400",
  CRITICAL: "bg-red-950/50 border-red-600/60 text-red-300",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-4">
            <span>darktracex</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-red-400">dashboard</span>
          </div>

          <div className="relative">
            <span className="watermark absolute -top-4 -left-4 text-[8rem] opacity-40">
              SIM
            </span>
            <h1 className="relative text-4xl sm:text-5xl font-black text-white mb-3">
              Simulation <span className="text-red-500">Dashboard</span>
            </h1>
          </div>
          <p className="text-gray-500 max-w-xl">
            Select a module below to launch an interactive malware mechanics simulation. All environments are sandboxed and educational.
          </p>

          {/* Status bar */}
          <div className="flex items-center gap-6 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 font-mono">12 modules online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-gray-500 font-mono">simulation engine active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs text-gray-500 font-mono">no real malware</span>
            </div>
          </div>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 400 } }}
              >
                <Link
                  href={`/module/${mod.id}`}
                  id={`dashboard-module-${mod.id}`}
                  className="module-card group relative flex flex-col rounded-2xl p-6 h-full neon-border overflow-hidden"
                >
                  {/* Module number watermark */}
                  <span className="absolute bottom-2 right-4 text-8xl font-black text-white/[0.03] font-mono select-none">
                    {String(mod.id).padStart(2, "0")}
                  </span>

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-red-400" />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                        threatBadge[mod.threat]
                      }`}
                    >
                      {mod.threat}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-white mb-2 leading-snug">
                      {mod.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {mod.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4 text-xs text-gray-600 font-mono">
                      <span>{mod.stats.simulations} runs</span>
                      <span className="text-gray-700">|</span>
                      <span>{mod.stats.complexity}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500 text-xs font-semibold group-hover:gap-2 transition-all">
                      <Terminal className="w-3 h-3" />
                      Run
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
