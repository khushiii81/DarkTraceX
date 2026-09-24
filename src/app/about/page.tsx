"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Terminal, Lock, ChevronRight } from "lucide-react";

const TECH = [
  { name: "Next.js 14", cat: "Framework", color: "text-white" },
  { name: "TypeScript", cat: "Language", color: "text-blue-400" },
  { name: "Framer Motion", cat: "Animation", color: "text-purple-400" },
  { name: "Tailwind CSS", cat: "Styling", color: "text-cyan-400" },
  { name: "Canvas API", cat: "Graphics", color: "text-orange-400" },
  { name: "View Transitions", cat: "UX", color: "text-red-400" },
];

const TIMELINE = [
  { step: "01", title: "Static Analysis Phase", desc: "Examine the PE structure, calculate hashes, and extract strings without executing the file." },
  { step: "02", title: "Dynamic Analysis Phase", desc: "Run in an isolated sandbox and observe runtime behavior: processes, files, network, registry." },
  { step: "03", title: "Memory Analysis Phase", desc: "Inspect process memory for injection artifacts, shellcode regions, and anomalous threads." },
  { step: "04", title: "Reporting Phase", desc: "Consolidate findings into an Indicators of Compromise (IoC) report." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <div className="relative inline-block mb-6">
            <span className="watermark text-[10rem] opacity-20">DTX</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
            About <span className="text-red-500">DarkTraceX</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            An interactive educational platform for cybersecurity students and analysts, built to demystify malware mechanics through guided simulations — safely, without real malware.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-red-900/30 rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 hex-grid opacity-50" />
          <div className="relative">
            <Shield className="w-8 h-8 text-red-400 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Mission Statement</h2>
            <p className="text-gray-400 leading-relaxed">
              DarkTraceX was created to bridge the gap between theory and practice in cybersecurity education. By providing interactive, animated simulations of real-world attack techniques, students gain intuitive understanding of PE file formats, malware obfuscation, dynamic analysis, and process injection — all in a 100% safe, sandboxed environment.
            </p>
          </div>
        </motion.div>

        {/* Malware Analysis Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Malware Analysis Workflow</h2>
          <div className="space-y-3">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 bg-[#111] border border-white/5 rounded-xl p-5 hover:border-red-900/30 transition-colors"
              >
                <div className="text-4xl font-black text-red-900/40 font-mono shrink-0 w-12">{item.step}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TECH.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#111] border border-white/5 rounded-xl p-4"
              >
                <div className={`font-semibold text-sm ${t.color}`}>{t.name}</div>
                <div className="text-xs text-gray-600 mt-0.5 font-mono">{t.cat}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security notice */}
        <div className="bg-red-950/20 border border-red-900/40 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-red-400">Security &amp; Ethics Notice</h3>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            All simulations are purely educational. No real malware is used, no actual system calls are made, and no network connections to malicious infrastructure occur. All code is client-side JavaScript running in your browser&apos;s sandbox. DarkTraceX promotes responsible disclosure and ethical security research practices.
          </p>
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/dashboard" className="flex items-center gap-2 px-8 py-4 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-xl transition-all glow-red">
            <Terminal className="w-4 h-4" />
            Start Simulating
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
