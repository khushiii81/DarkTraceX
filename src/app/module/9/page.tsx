"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Play, RefreshCw, Smartphone, MessageSquare, Database, Wifi } from "lucide-react";

type PhoneState = "safe" | "receiving" | "exploiting" | "exfiltrating";

export default function Module9Page() {
  const [phase, setPhase] = useState<PhoneState>("safe");
  const [exfilData, setExfilData] = useState<string[]>([]);

  const runPegasus = async () => {
    if (phase !== "safe") return;

    // Phase 1: Zero-click malicious iMessage delivery
    setPhase("receiving");
    await new Promise((r) => setTimeout(r, 2000));

    // Phase 2: Exploitation (Invisible to user)
    setPhase("exploiting");
    await new Promise((r) => setTimeout(r, 2500));

    // Phase 3: Exfiltration
    setPhase("exfiltrating");
    
    const dataTypes = [
      "Target Contacts.vcf (1.2MB)", 
      "WhatsApp_Backup.crypt14 (45MB)", 
      "GPS_Location_Log.json", 
      "Microphone_Audio_01.aac", 
      "Camera_Snapshot.jpg", 
      "Email_Inbox_Dump.pst"
    ];

    for (let i = 0; i < dataTypes.length; i++) {
      await new Promise((r) => setTimeout(r, 800));
      setExfilData((prev) => [...prev, dataTypes[i]]);
    }
  };

  const reset = () => {
    setPhase("safe");
    setExfilData([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-600 mb-6">
          <Link href="/dashboard" className="hover:text-red-400">dashboard</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-red-400">module-09</span>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-900/50 bg-red-950/20 text-red-400 text-xs font-mono mb-3">MODULE 09 — ZERO-CLICK SPYWARE</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">
            Pegasus <span className="text-red-500">Exploit</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-xl text-sm">
            Experience the stealth of NSO Group&apos;s Pegasus. This simulates a zero-click exploit where a maliciously crafted message silently roots the device without any user interaction, enabling complete data exfiltration.
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={runPegasus}
            disabled={phase !== "safe"}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-900 hover:bg-red-800 disabled:opacity-50 border border-red-700 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Play className="w-4 h-4" />
            {phase === "safe" ? "Send Zero-Click Payload" : "Exploit Active..."}
          </button>
          <button onClick={reset} className="p-2.5 border border-white/10 rounded-xl text-gray-500 hover:text-white">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          
          {/* Target Smartphone */}
          <div className="relative w-72 h-[600px] bg-black border-[12px] border-[#222] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-[#222] w-32 mx-auto rounded-b-3xl z-20" />

            {/* Screen Content */}
            <div className="flex-1 bg-gradient-to-b from-gray-800 to-black relative">
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-2 pb-1 text-[10px] text-white z-10 relative">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <Wifi className="w-3 h-3" />
                  <div className="w-5 h-2.5 border border-white/50 rounded-sm relative">
                    <div className="absolute inset-0.5 bg-white rounded-[1px] w-3/4" />
                  </div>
                </div>
              </div>

              {/* Wallpaper / Home Screen apps */}
              <div className="grid grid-cols-4 gap-4 p-6 pt-10 relative z-10">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="w-12 h-12 rounded-2xl bg-white/10" />
                  </div>
                ))}
              </div>

              {/* Fake Zero-Click Message Arrival */}
              <AnimatePresence>
                {(phase === "receiving" || phase === "exploiting") && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="absolute top-8 left-4 right-4 bg-gray-900/90 backdrop-blur rounded-2xl p-4 shadow-xl z-30 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Unknown Sender</div>
                        <div className="text-xs text-gray-400">iMessage (Silent Delivery)</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Spyware Active Indicators (Invisible to normal user, but visualized here for education) */}
              <AnimatePresence>
                {phase === "exfiltrating" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-red-950/40 z-20 pointer-events-none flex flex-col items-center justify-center"
                  >
                    <div className="absolute inset-0 scan-line" />
                    <div className="absolute top-4 right-16 flex gap-2">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                    </div>
                    <Smartphone className="w-16 h-16 text-red-500 mb-4 opacity-50" />
                    <span className="text-red-500 font-mono text-sm font-bold tracking-widest bg-black/50 px-3 py-1 rounded">DEVICE COMPROMISED</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Attacker C2 Server Terminal */}
          <div className="flex-1 w-full max-w-lg bg-[#050505] border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[600px]">
            <div className="bg-[#111] border-b border-white/5 p-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-red-500" />
              <span className="text-xs font-mono text-gray-400">PEGASUS_C2_SERVER</span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="text-gray-500 mb-4">Listening for incoming connections on port 443...</div>
              
              {phase === "receiving" && (
                <div className="text-blue-400 mb-1">&gt; Sending specially crafted PDF/GIF to target +1 (555) 019-3824...</div>
              )}
              
              {phase === "exploiting" && (
                <>
                  <div className="text-blue-400 mb-1">&gt; Payload delivered. Exploiting iOS ImageIO vulnerability (CVE-2023-41064)...</div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-green-400 mb-1">&gt; Kernel memory corrupted. Gaining root privileges...</motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="text-green-400 mb-4">&gt; Root achieved. Disabling security mitigations. Establishing persistence.</motion.div>
                </>
              )}

              {phase === "exfiltrating" && (
                <>
                  <div className="text-red-400 mb-4">&gt; Connection established with compromised device. Beginning exfiltration...</div>
                  <div className="space-y-2">
                    {exfilData.map((data, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-orange-300"
                      >
                        <span className="text-gray-600">[+]</span> Downloading: {data}
                        <span className="text-green-500 ml-auto">OK</span>
                      </motion.div>
                    ))}
                  </div>
                  {exfilData.length === 6 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-red-500 mt-4 font-bold">
                      &gt; Exfiltration complete. Switching to live microphone monitoring mode.
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

        </div>

        <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
          <Link href="/module/8" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Module 08 — Stuxnet SCADA
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-500 hover:text-white group">
            Back to Dashboard <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
