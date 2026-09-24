"use client";

import { useState } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, FileText, FileWarning, ShieldAlert, Terminal, Download, Server, HardDrive, Activity, Eye, Search, FileCode } from "lucide-react";

// ============================================================================
// PHASE 1: Attack Vector Flow (Phishing & Macros)
// ============================================================================

function Phase1Phishing() {
  const [step, setStep] = useState(0);

  const runAttack = async () => {
    setStep(1); // Open Email
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // Enable Content
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // Process Anomaly
  };

  return (
    <div className="absolute inset-0 bg-[#050505] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-5xl flex gap-8">
        
        {/* Victim Screen */}
        <div className="flex-1 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Fake Email Client Header */}
          <div className="bg-[#0078d4] text-white p-2 text-sm font-bold flex justify-between items-center">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> Outlook Web</div>
            <button 
              onClick={runAttack} 
              disabled={step > 0}
              className="px-4 py-1 bg-white/20 hover:bg-white/30 rounded transition-colors text-xs disabled:opacity-50"
            >
              Simulate Victim Click
            </button>
          </div>

          <div className="flex-1 flex bg-gray-100 p-6 relative">
            {step === 0 && (
              <div className="bg-white flex-1 p-6 border border-gray-300 shadow-sm flex flex-col">
                <div className="border-b pb-4 mb-4">
                  <div className="text-lg font-bold">URGENT: Outstanding Invoice #89432</div>
                  <div className="text-gray-500 text-sm">From: billing@trusted-vendor.com</div>
                </div>
                <div className="text-gray-700 text-sm mb-6 flex-1">
                  Dear Customer,<br/><br/>
                  Please find attached your outstanding invoice for the previous billing cycle. 
                  Failure to process this payment within 24 hours will result in service suspension.
                </div>
                <div className="border border-gray-300 rounded p-3 flex items-center gap-3 bg-gray-50 w-64 hover:bg-gray-100 cursor-pointer">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-sm font-bold">Invoice_89432.docm</div>
                    <div className="text-xs text-gray-500">142 KB</div>
                  </div>
                </div>
              </div>
            )}

            {step >= 1 && (
              <div className="bg-white flex-1 flex flex-col border border-gray-300 shadow-sm">
                <div className="bg-[#2b579a] text-white p-2 text-xs flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Invoice_89432.docm - Word
                </div>
                <div className="bg-[#fff3cd] border-b border-[#ffeeba] p-2 flex items-center justify-between text-xs text-[#856404]">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    <strong>PROTECTED VIEW</strong> This file originated from an internet location.
                  </div>
                  <button className={`px-3 py-1 border transition-colors ${step >= 2 ? "bg-gray-200 text-gray-500 border-gray-300" : "bg-white border-[#ffeeba] hover:bg-gray-50"}`}>
                    Enable Content
                  </button>
                </div>
                {step >= 2 && (
                  <div className="bg-[#f8d7da] border-b border-[#f5c6cb] p-2 flex items-center gap-2 text-xs text-[#721c24]">
                    <FileWarning className="w-4 h-4" /> Macros Enabled. Executing Document_Open()...
                  </div>
                )}
                <div className="flex-1 p-8 text-center text-gray-400 font-bold border-4 border-dashed border-gray-200 m-8">
                  DOCUMENT ENCRYPTED<br/><span className="text-sm font-normal">Click Enable Content to View</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Process Tree Monitor */}
        <div className="w-80 bg-[#0a0a0a] border border-gray-800 rounded-lg flex flex-col font-mono text-xs shadow-2xl relative overflow-hidden">
          
          <div className="bg-gray-900 border-b border-gray-800 p-3 text-gray-400 font-bold flex items-center gap-2">
            <Activity className="w-4 h-4" /> EDR Process Monitor
          </div>
          
          <div className="p-4 flex flex-col gap-2 relative z-10">
            <AnimatePresence>
              {step >= 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-gray-300">
                  <FileText className="w-4 h-4 text-blue-500" /> WINWORD.EXE <span className="text-gray-600">(PID: 4920)</span>
                </motion.div>
              )}
              {step >= 3 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="pl-6 border-l border-red-900/50 ml-2 mt-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <Terminal className="w-4 h-4 text-gray-500" /> cmd.exe <span className="text-gray-600 font-normal">(PID: 8102)</span>
                  </div>
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ delay: 0.5 }} className="pl-6 border-l border-red-900/50 ml-2 mt-2">
                    <div className="flex items-center gap-2 text-red-500 font-bold">
                      <Terminal className="w-4 h-4 text-blue-600" /> powershell.exe <span className="text-gray-600 font-normal">(PID: 9941)</span>
                    </div>
                    <div className="mt-2 text-gray-500 text-[10px] break-all bg-black/50 p-2 border border-red-900/30 rounded">
                      -w hidden -ep bypass -e JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB...
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="absolute bottom-0 inset-x-0 bg-red-950/80 border-t border-red-500 p-3 text-red-200 text-center font-bold backdrop-blur"
              >
                <ShieldAlert className="w-5 h-5 mx-auto mb-1 text-red-500" />
                PROCESS ANOMALY
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: Stager & C2 Drop
// ============================================================================

function Phase2Stager() {
  const [step, setStep] = useState(0);

  const runStager = async () => {
    setStep(1); // Resolve DNS
    await new Promise(r => setTimeout(r, 1000));
    setStep(2); // HTTP GET
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // Drop to disk
    await new Promise(r => setTimeout(r, 1000));
    setStep(4); // Execute Payload
  };

  return (
    <div className="absolute inset-0 bg-[#020202] flex items-center justify-center p-6">
      
      <div className="w-full max-w-5xl flex flex-col gap-12 relative">
        <button 
          onClick={runStager}
          disabled={step > 0}
          className="absolute -top-16 right-0 px-6 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-mono text-sm border border-red-700 rounded transition-colors"
        >
          EXECUTE STAGER SCRIPT
        </button>

        {/* Network Diagram */}
        <div className="flex justify-between items-center relative px-12">
          
          {/* Local Host */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className={`p-4 rounded-xl border-2 transition-all ${step >= 1 ? "bg-red-950/40 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.3)]" : "bg-gray-900 border-gray-700"}`}>
              <Terminal className={`w-12 h-12 ${step >= 1 ? "text-red-500" : "text-gray-500"}`} />
            </div>
            <span className="font-mono text-sm text-gray-400">powershell.exe</span>
          </div>

          {/* Connection Line */}
          <div className="flex-1 h-0.5 bg-gray-800 relative mx-8 flex items-center justify-center">
            <AnimatePresence>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute -top-8 font-mono text-xs text-blue-400 bg-black px-2 border border-blue-900/50 rounded">
                  InternetOpen() / InternetConnect()
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="absolute -top-8 font-mono text-xs text-green-400 bg-black px-2 border border-green-900/50 rounded flex items-center gap-2">
                  <Download className="w-3 h-3" /> URLDownloadToFileA()
                </motion.div>
              )}
              {step >= 2 && (
                <motion.div 
                  initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-1/4 h-full bg-gradient-to-r from-transparent via-red-500 to-transparent absolute top-0 left-0"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Remote C2 Server */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className={`p-4 rounded-xl border-2 transition-all ${step >= 1 ? "bg-blue-950/40 border-blue-500" : "bg-gray-900 border-gray-700"}`}>
              <Server className={`w-12 h-12 ${step >= 1 ? "text-blue-500" : "text-gray-500"}`} />
            </div>
            <span className="font-mono text-sm text-gray-400">198.51.100.45:443</span>
          </div>
        </div>

        {/* Disk Drop */}
        <div className="flex justify-center">
          <div className={`w-96 border-2 rounded-xl p-6 transition-all duration-1000 ${step >= 3 ? "bg-gray-900 border-gray-600 shadow-2xl" : "bg-black border-gray-900"}`}>
            <div className="flex items-center gap-3 mb-4 border-b border-gray-800 pb-2">
              <HardDrive className={`w-5 h-5 ${step >= 3 ? "text-gray-300" : "text-gray-700"}`} />
              <span className={`font-mono text-sm ${step >= 3 ? "text-gray-300" : "text-gray-700"}`}>Local Disk (C:) %TEMP%</span>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {step < 3 && <motion.div key="empty" className="text-gray-700 font-mono text-xs">Directory empty...</motion.div>}
                {step >= 3 && (
                  <motion.div key="dropped" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 bg-red-950/30 p-3 rounded border border-red-900/50 w-full">
                    <FileCode className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="font-mono text-sm font-bold text-red-400">svchost_update.exe</div>
                      <div className="font-mono text-xs text-gray-500">Dropped by PowerShell (Stager)</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {step >= 4 && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-green-400">Status: EXECUTING PAYLOAD</span>
                    <span className="text-gray-500">CreateProcessA()</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: Analyst Telemetry Panel
// ============================================================================

function Phase3Telemetry() {
  const [analyzing, setAnalyzing] = useState(false);

  const logs = [
    { time: "14:02:11", src: "WINWORD.EXE", event: "Process Create", tgt: "cmd.exe /c powershell.exe...", level: "high" },
    { time: "14:02:12", src: "powershell.exe", event: "DNS Resolution", tgt: "update.windows-services-auth.com", level: "med" },
    { time: "14:02:12", src: "powershell.exe", event: "Network Connect", tgt: "198.51.100.45:443", level: "high" },
    { time: "14:02:14", src: "powershell.exe", event: "File Create", tgt: "C:\\Users\\Bob\\AppData\\Local\\Temp\\svchost_update.exe", level: "critical" },
    { time: "14:02:15", src: "powershell.exe", event: "Process Create", tgt: "svchost_update.exe", level: "critical" },
  ];

  return (
    <div className="absolute inset-0 bg-[#050505] p-6 flex flex-col font-mono text-xs">
      
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3 text-gray-300 text-sm">
          <Eye className="w-5 h-5" /> SOC Telemetry & Event Viewer
        </div>
        <button 
          onClick={() => setAnalyzing(!analyzing)}
          className={`px-4 py-2 rounded font-bold border transition-colors ${analyzing ? "bg-red-900 border-red-500 text-white" : "bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700"}`}
        >
          {analyzing ? "Pause Live Stream" : "Analyze Endpoint Logs"}
        </button>
      </div>

      <div className="flex-1 bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* Table Header */}
        <div className="flex bg-gray-900 text-gray-500 p-3 border-b border-gray-800 font-bold">
          <div className="w-24">TIMESTAMP</div>
          <div className="w-48">SOURCE PROCESS</div>
          <div className="w-48">EVENT TYPE</div>
          <div className="flex-1">TARGET / ARTIFACT</div>
        </div>

        {/* Logs */}
        <div className="flex-1 p-2 overflow-y-auto">
          <AnimatePresence>
            {analyzing && logs.map((log, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.8 }}
                className={`flex p-3 mb-1 rounded border-l-2 ${
                  log.level === "critical" ? "bg-red-950/20 border-red-500 text-red-300" : 
                  log.level === "high" ? "bg-orange-950/20 border-orange-500 text-orange-300" : 
                  "bg-yellow-950/20 border-yellow-500 text-yellow-300"
                }`}
              >
                <div className="w-24 opacity-70">{log.time}</div>
                <div className="w-48 font-bold">{log.src}</div>
                <div className="w-48">{log.event}</div>
                <div className="flex-1 tracking-wider">{log.tgt}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {!analyzing && (
            <div className="h-full flex items-center justify-center text-gray-600">
              <div className="flex flex-col items-center gap-2">
                <Search className="w-8 h-8 opacity-50" />
                Click &apos;Analyze Endpoint Logs&apos; to reconstruct the attack timeline.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module1Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Attack Vector Flow",
      description: "A weaponized email attachment (.docm) uses malicious macros to spawn an abnormal process chain, secretly launching PowerShell hidden from the victim.",
      component: <Phase1Phishing />,
    },
    {
      title: "Stager & C2 Drop",
      description: "The lightweight PowerShell 'stager' reaches out to an external C2 server, downloads the much larger second-stage payload, and drops it into a hidden Temp directory.",
      component: <Phase2Stager />,
    },
    {
      title: "Analyst Telemetry",
      description: "SOC Analysts use Endpoint Detection and Response (EDR) tools to trace the attack timeline, correlating the initial Word document to the dropped payload and outbound IP connections.",
      component: <Phase3Telemetry />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={1}
      moduleTitle="Phishing & Dropper"
      moduleThreat="HIGH"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
