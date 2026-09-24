"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Shield,
  Terminal,
  Cpu,
  Activity,
  Bug,
  Network,
  Lock,
  ChevronRight,
  Zap,
} from "lucide-react";
import { ThreatGlobeCanvas } from "@/components/ui/ThreatGlobe";

// ─── Animated Canvas Background ────────────────────────────────────────────
// ─── Typing Terminal ─────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  "$ darktracex --init simulation",
  "> Loading malware analysis modules...",
  "> PE Header Inspector: READY",
  "> Hash Analyzer (MD5/SHA256): READY",
  "> Process Injection Simulator: READY",
  "> Dynamic Behavior Tracker: READY",
  "> ALL 6 MODULES ONLINE",
  "$ _",
];

function TerminalTyper() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= TERMINAL_LINES.length) return;
    const line = TERMINAL_LINES[currentLine];

    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  const activeLine =
    currentLine < TERMINAL_LINES.length
      ? TERMINAL_LINES[currentLine].slice(0, currentChar)
      : "";

  return (
    <div className="code-block rounded-xl text-sm space-y-1 h-52 overflow-hidden">
      {displayedLines.map((line, i) => (
        <div
          key={i}
          className={
            line.startsWith(">")
              ? "text-green-400/70"
              : line.startsWith("$")
              ? "text-red-400"
              : "text-gray-400"
          }
        >
          {line}
        </div>
      ))}
      {currentLine < TERMINAL_LINES.length && (
        <div
          className={
            activeLine.startsWith(">")
              ? "text-green-400/70"
              : "text-red-400"
          }
        >
          {activeLine}
          <span className="inline-block w-2 h-4 bg-red-500 ml-0.5 cursor-blink align-middle" />
        </div>
      )}
    </div>
  );
}

// ─── Feature Cards ───────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Network,
    title: "Virus vs Worm Simulation",
    description:
      "3D animated network topology contrasting virus file-attachment with worm self-propagation.",
    color: "from-red-900/30 to-red-950/10",
    border: "border-red-900/40",
    href: "/module/1",
    module: "01",
  },
  {
    icon: Cpu,
    title: "PE Structure Inspector",
    description:
      "Interactive Portable Executable visualizer with DOS Header, PE Signature, and Section Table tabs.",
    color: "from-orange-900/30 to-orange-950/10",
    border: "border-orange-900/40",
    href: "/module/2",
    module: "02",
  },
  {
    icon: Shield,
    title: "Hash & Static Analyzer",
    description:
      "Visualize MD5, SHA-1, SHA-256 generation and extract suspicious API strings.",
    color: "from-rose-900/30 to-rose-950/10",
    border: "border-rose-900/40",
    href: "/module/3",
    module: "03",
  },
  {
    icon: Lock,
    title: "Packer Obfuscation Lab",
    description:
      "See how UPX compresses executables to reduce size and evade static detection.",
    color: "from-red-900/30 to-red-950/10",
    border: "border-red-900/40",
    href: "/module/4",
    module: "04",
  },
  {
    icon: Activity,
    title: "Dynamic Behavior Tracker",
    description:
      "Simulate runtime analysis: process creation, file mods, registry Run keys.",
    color: "from-orange-900/30 to-orange-950/10",
    border: "border-orange-900/40",
    href: "/module/5",
    module: "05",
  },
  {
    icon: Bug,
    title: "Process Injection Lab",
    description:
      "Animate shellcode injection into a legitimate process, executing under its context.",
    color: "from-rose-900/30 to-rose-950/10",
    border: "border-rose-900/40",
    href: "/module/6",
    module: "06",
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "6", label: "Attack Modules", suffix: "" },
  { value: "100", label: "Safe Sandbox", suffix: "%" },
  { value: "0", label: "Real Malware", suffix: "" },
  { value: "24", label: "Live Simulations", suffix: "/7" },
];

// ─── Main Homepage ─────────────────────────────────────────────────────────
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 z-0">
          <ThreatGlobeCanvas />
        </div>

        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,20,60,0.12),rgba(255,255,255,0))]" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/50 bg-red-950/20 text-red-400 text-xs font-mono font-semibold uppercase tracking-widest mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-ring" />
            Educational Simulation Platform
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Watermark */}
            <div className="watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
              DTX
            </div>
            <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
              <span className="glitch text-white" data-text="Dark">
                Dark
              </span>
              <span
                className="glitch glow-text-red"
                style={{ color: "#dc143c" }}
                data-text="Trace"
              >
                Trace
              </span>
              <span className="text-red-400">X</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            An interactive{" "}
            <span className="text-red-400 font-semibold">
              Malware Mechanics
            </span>{" "}
            &amp;{" "}
            <span className="text-orange-400 font-semibold">
              Attack Vector Simulator
            </span>
            . Explore PE structures, process injection, obfuscation, and more
            — safely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/dashboard"
              id="hero-launch-btn"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-300 glow-red"
            >
              <Terminal className="w-5 h-5" />
              Launch Simulator
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              id="hero-learn-btn"
              className="flex items-center gap-2 px-8 py-4 border border-white/10 hover:border-red-900/50 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="max-w-xl mx-auto"
          >
            <TerminalTyper />
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-600 font-mono">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="w-0.5 h-8 bg-gradient-to-b from-red-800 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-black text-red-500 font-mono">
                  {stat.value}
                  <span className="text-red-700">{stat.suffix}</span>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ──────────────────────────────── */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-gray-500 text-xs font-mono uppercase tracking-widest mb-4">
            <Zap className="w-3 h-3 text-red-500" />
            Simulation Modules
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            6 Core Attack{" "}
            <span className="text-red-500">Vectors</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Each module is an interactive simulation backed by real malware
            analysis concepts — safely sandboxed for educational exploration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 100 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={feat.href}
                  id={`feature-module-${feat.module}`}
                  className={`module-card group block relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${feat.color} border ${feat.border} h-full`}
                >
                  {/* Module number watermark */}
                  <span className="absolute top-2 right-4 text-7xl font-black text-white/4 font-mono">
                    {feat.module}
                  </span>

                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-900/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg">
                      {feat.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {feat.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-red-500 text-sm font-semibold">
                      Launch Module
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-3xl border border-red-900/30 bg-gradient-to-br from-red-950/30 to-black p-16"
        >
          <div className="absolute inset-0 hex-grid opacity-50" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Ready to <span className="text-red-500">Simulate</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Dive into the malware analysis modules. No setup, no risk —
              pure interactive education.
            </p>
            <Link
              href="/dashboard"
              id="cta-dashboard-btn"
              className="inline-flex items-center gap-2 px-10 py-4 bg-red-700 hover:bg-red-600 text-white font-bold rounded-xl text-lg transition-all duration-300 glow-red"
            >
              <Terminal className="w-5 h-5" />
              Open Dashboard
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
