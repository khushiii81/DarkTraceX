"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Terminal, ChevronRight, Activity, BarChart2, Bug, Cpu, Lock, Network, AlertTriangle, Radio, Smartphone, FileWarning, Key, Skull, Filter } from "lucide-react";

type Category = "All" | "Ransomware" | "Stealth & Evasion" | "Persistence & C2" | "Real-World Threats";

interface ModuleData {
  id: number;
  icon: any;
  title: string;
  description: string;
  threat: string;
  threatColor: string;
  tags: string[];
  stats: { simulations: string; complexity: string };
  category: Category[];
}

const MODULES: ModuleData[] = [
  {
    id: 1,
    icon: Network,
    title: "Phishing & Dropper",
    description: "Simulate a weaponized email macro dropping a PowerShell stager and C2 payload.",
    threat: "HIGH",
    threatColor: "threat-high",
    tags: ["Phishing", "Macros", "C2 Drop"],
    stats: { simulations: "1.2K", complexity: "Medium" },
    category: ["Persistence & C2"]
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
    category: ["Stealth & Evasion"]
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
    category: ["Stealth & Evasion"]
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
    category: ["Persistence & C2"]
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
    category: ["Stealth & Evasion"]
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
    category: ["Stealth & Evasion"]
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
    category: ["Ransomware", "Real-World Threats"]
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
    category: ["Real-World Threats"]
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
    category: ["Stealth & Evasion", "Real-World Threats"]
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
    category: ["Persistence & C2", "Real-World Threats"]
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
    category: ["Real-World Threats"]
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
    category: ["Ransomware", "Real-World Threats"]
  },
];

const threatBadge: Record<string, string> = {
  LOW: "bg-yellow-900/30 border-yellow-700/50 text-yellow-400",
  MEDIUM: "bg-orange-900/30 border-orange-700/50 text-orange-400",
  HIGH: "bg-red-900/30 border-red-700/50 text-red-400",
  CRITICAL: "bg-red-950/50 border-red-600/60 text-red-300",
};

const TABS: Category[] = ["All", "Ransomware", "Stealth & Evasion", "Persistence & C2", "Real-World Threats"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Category>("All");

  const filteredModules = MODULES.filter((mod) => activeTab === "All" || mod.category.includes(activeTab));

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - No initial animations to prevent lag */}
        <div className="mb-8">
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
          <p className="text-gray-400 max-w-xl text-lg">
            Select a module category below to launch a highly interactive malware mechanics simulation. All environments are sandboxed.
          </p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide border-b border-red-900/20">
          <Filter className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-900/30 border border-red-700/50 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Link
                    href={`/module/${mod.id}`}
                    className="module-card group relative flex flex-col rounded-2xl p-6 h-full border border-red-900/20 bg-[#0a0a0a]/80 backdrop-blur shadow-lg hover:shadow-red-900/20 hover:border-red-500/50 transition-all overflow-hidden"
                  >
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/5 group-hover:to-red-500/10 transition-colors" />

                    {/* Top row */}
                    <div className="relative z-10 flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center group-hover:border-red-500/50 transition-colors">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-red-400 transition-colors" />
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${
                          threatBadge[mod.threat]
                        }`}
                      >
                        {mod.threat}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1">
                      <h2 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-red-50 transition-colors">
                        {mod.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {mod.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {mod.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-1 rounded-md bg-white/5 text-gray-400 font-mono border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" /> {mod.stats.simulations}
                        </div>
                        <div className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{mod.stats.complexity}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-500 text-xs font-bold group-hover:gap-2 transition-all">
                        <Terminal className="w-3 h-3" />
                        RUN
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
