"use client";

import { useState } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, Search, AlertTriangle, ShieldOff, PowerOff } from "lucide-react";

// ============================================================================
// PHASE 1: Static Analysis Triage (PE Header & Hash)
// ============================================================================

function Phase1Triage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const runAnalysis = async () => {
    setAnalyzing(true);
    await new Promise(r => setTimeout(r, 2500));
    setAnalyzing(false);
    setResults(true);
  };

  return (
    <div className="absolute inset-0 bg-[#000] p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px]">
        
        <div className="bg-gray-800 p-3 border-b border-gray-700 flex justify-between items-center">
          <div className="text-gray-300 font-mono text-sm flex items-center gap-2">
            <Search className="w-4 h-4" /> Static File Analyzer
          </div>
          <button 
            onClick={runAnalysis}
            disabled={analyzing || results}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded font-bold text-sm"
          >
            {analyzing ? "Computing Hashes..." : "Analyze unknown_file.exe"}
          </button>
        </div>

        <div className="flex-1 flex font-mono text-sm">
          {/* File Structure */}
          <div className="w-1/3 border-r border-gray-700 p-4 bg-gray-950 flex flex-col gap-2">
            <div className="text-white font-bold mb-2 pb-2 border-b border-gray-800">PE Structure</div>
            <div className="flex items-center gap-2 text-gray-400"><FileCode className="w-4 h-4"/> DOS Header (MZ)</div>
            <div className="flex items-center gap-2 text-gray-400"><FileCode className="w-4 h-4"/> NT Headers (PE\0\0)</div>
            <div className="flex items-center gap-2 text-gray-400 ml-4">.text (Code)</div>
            <div className="flex items-center gap-2 text-gray-400 ml-4">.data (Variables)</div>
            <div className="flex items-center gap-2 text-gray-400 ml-4">.rsrc (Resources)</div>
          </div>

          {/* Results Area */}
          <div className="flex-1 p-6 relative">
            {!results && !analyzing && (
              <div className="h-full flex items-center justify-center text-gray-600">Waiting for analysis...</div>
            )}
            
            {analyzing && (
              <div className="h-full flex flex-col items-center justify-center text-blue-400 gap-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                Extracting strings and computing cryptographic hashes...
              </div>
            )}

            <AnimatePresence>
              {results && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full gap-6">
                  
                  <div>
                    <div className="text-gray-500 mb-1">MD5 Hash:</div>
                    <div className="text-white bg-black p-2 rounded border border-gray-700">71b6a493388e7d0b40c83ce903bc6b04</div>
                  </div>

                  <div>
                    <div className="text-gray-500 mb-1">SHA-256 Hash:</div>
                    <div className="text-white bg-black p-2 rounded border border-gray-700">027cc450ef5f8c5f653329641ec1fed91f694e0d229928963b30f6b0d7d3a745</div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="mt-auto bg-red-950 border border-red-500 p-4 rounded-lg flex items-start gap-4"
                  >
                    <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
                    <div>
                      <div className="text-red-500 font-bold mb-1">THREAT INTELLIGENCE MATCH</div>
                      <div className="text-red-200">
                        The computed SHA-256 hash matches <span className="font-bold">NotPetya</span> (Win32/Petya.C). 
                        Despite appearing as ransomware, it is a destructive wiper.
                      </div>
                    </div>
                  </motion.div>

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
// PHASE 2: Privilege Escalation & Reboot Trigger
// ============================================================================

function Phase2Escalation() {
  const [step, setStep] = useState(0);

  const runEscalation = async () => {
    setStep(1); // AdjustTokenPrivileges
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // Overwrite MBR
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // ExitWindowsEx
  };

  return (
    <div className="absolute inset-0 bg-[#1a1a2e] p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        <div className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
          <ShieldOff className="w-8 h-8 text-red-500" /> Kernel-Level Subversion
        </div>

        <div className="flex flex-col gap-4">
          <div className={`p-4 rounded-xl border-2 transition-all ${step >= 1 ? "bg-red-950/40 border-red-500" : "bg-gray-900 border-gray-700"}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-mono font-bold ${step >= 1 ? "text-red-400" : "text-gray-400"}`}>1. AdjustTokenPrivileges()</span>
              {step === 1 && <span className="text-red-500 animate-pulse text-xs font-mono">EXECUTING</span>}
            </div>
            <div className="text-gray-400 text-sm">Elevates malware process privileges to SE_SHUTDOWN_NAME, allowing it to force a system restart.</div>
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all ${step >= 2 ? "bg-red-950/40 border-red-500" : "bg-gray-900 border-gray-700"}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-mono font-bold ${step >= 2 ? "text-red-400" : "text-gray-400"}`}>2. DeviceIoControl(\.\PhysicalDrive0)</span>
              {step === 2 && <span className="text-red-500 animate-pulse text-xs font-mono">EXECUTING</span>}
            </div>
            <div className="text-gray-400 text-sm">Gains raw disk access to overwrite the Master Boot Record (MBR) with its own custom bootloader.</div>
          </div>

          <div className={`p-4 rounded-xl border-2 transition-all ${step >= 3 ? "bg-red-950/40 border-red-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]" : "bg-gray-900 border-gray-700"}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-mono font-bold ${step >= 3 ? "text-red-400" : "text-gray-400"}`}>3. ExitWindowsEx(EWX_REBOOT)</span>
            </div>
            <div className="text-gray-400 text-sm">Forces an immediate Windows blue screen or restart, triggering the corrupted MBR on the next boot sequence.</div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={runEscalation}
            disabled={step > 0}
            className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <PowerOff className="w-5 h-5" /> Execute Escalation Sequence
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: MBR Destruction (Fake CHKDSK)
// ============================================================================

function Phase3Destruction() {
  const [glitching, setGlitching] = useState(false);
  const [screen, setScreen] = useState<"normal" | "bsod" | "chkdsk" | "skull">("normal");
  const [percent, setPercent] = useState(0);

  const runDestruction = async () => {
    setGlitching(true);
    await new Promise(r => setTimeout(r, 2000));
    setScreen("bsod");
    setGlitching(false);
    await new Promise(r => setTimeout(r, 3000));
    setScreen("chkdsk");
    
    // Fake chkdsk percentage
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 10) + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setScreen("skull"), 1000);
      }
      setPercent(p);
    }, 400);
  };

  return (
    <div className="absolute inset-0 bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* Glitch Overlay */}
      {glitching && (
        <div className="absolute inset-0 z-50 pointer-events-none mix-blend-difference bg-[url('/noise.svg')] opacity-50" style={{ animation: "pulse 0.1s infinite" }} />
      )}

      {/* Screen States */}
      {screen === "normal" && (
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
          <button 
            onClick={runDestruction}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded shadow-lg hover:bg-red-500 transition-colors"
          >
            Trigger Forced Reboot
          </button>
        </div>
      )}

      {screen === "bsod" && (
        <div className="absolute inset-0 bg-[#0000AA] p-10 font-mono text-white text-lg flex flex-col">
          <div className="mb-8 font-bold">A problem has been detected and Windows has been shut down to prevent damage to your computer.</div>
          <div className="mb-8">DRIVER_IRQL_NOT_LESS_OR_EQUAL</div>
          <div className="mb-8">If this is the first time you&apos;ve seen this stop error screen, restart your computer. If this screen appears again, follow these steps:</div>
          <div className="mt-auto text-sm">*** STOP: 0x000000D1 (0x00000000, 0x00000002, 0x00000000, 0xF96C4E10)</div>
        </div>
      )}

      {screen === "chkdsk" && (
        <div className="absolute inset-0 bg-black p-8 font-mono text-gray-300 text-lg">
          <div>Repairing file system on C:</div>
          <div className="mt-4">The type of the file system is NTFS.</div>
          <div className="mt-4">One of your disks needs to be checked for consistency. You may cancel the disk check, but it is strongly recommended that you continue.</div>
          <div className="mt-8">CHKDSK is repairing sectors.</div>
          <div className="mt-4 font-bold text-white">{percent}% completed.</div>
          <div className="mt-8 text-red-500 opacity-50 text-sm">(Simulating Master File Table destruction...)</div>
        </div>
      )}

      {screen === "skull" && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4">
          <pre className="text-red-600 font-mono text-sm sm:text-base leading-tight font-bold text-center mb-8 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
{`
       .o oOOOOOOOo                                            OOOo
       Ob.OOOOOOOo  OOOo.      oOOo.                      .adOOOOOOO
       OboO"""""""""""".OOo. .oOOOOOo.    OOOo.oOOOOOo.."""""""""'OO
       OOP.oOOOOOOOOOOO "POOOOOOOOOOOo.   \`"OOOOOOOOOP,OOOOOOOOOOOB'
       \`O'OOOO'     \`OOOOo"OOOOOOOOOOO\` .adOOOOOOOOO"oOOO'    \`OOOOo
       .OOOO'            \`OOOOOOOOOOOOOOOOOOOOOOOOOO'            \`OO
       OOOOO                 '"OOOOOOOOOOOOOOOO"\`                oOO
      oOOOOOba.                .adOOOOOOOOOOba               .adOOOOo.
     oOOOOOOOOOOOOOba.    .adOOOOOOOOOO@^OOOOOOOba.     .adOOOOOOOOOOOO
    OOOOOOOOOOOOOOOOO.OOOOOOOOOOOOOO"\`  '"OOOOOOOOOOOOO.OOOOOOOOOOOOOO
    "OOOO"       "YOoOOOOMOIONODOO"\`  .   '"OOROAOPOEOOOoOY"     "OOO"
       Y           'OOOOOOOOOOOOOO: .oOOo. :OOOOOOOOOOO?'         :\`
       :            .oO%OOOOOOOOOOo.OOOOOO.oOOOOOOOOOOOO?         .
       .            oOOP"%OOOOOOOOoOOOOOOO?oOOOOO?OOOO"OOo
                    '%o  OOOO"%OOOO%"%OOOOO"OOOOOO"OOO':
                         \`$"  \`OOOO' \`O"Y ' \`OOOO'  o             .
       .                  .     OP"          : o     .
`}
          </pre>
          
          <div className="bg-red-950 border border-red-600 p-6 max-w-2xl w-full text-center shadow-[0_0_30px_rgba(255,0,0,0.5)]">
            <h2 className="text-2xl font-bold text-white mb-4">Ooops, your important files are encrypted.</h2>
            <p className="text-gray-300 text-sm font-mono mb-4">
              If you see this text, then your files are no longer accessible, because they have been encrypted.
              Perhaps you are busy looking for a way to recover your files, but don&apos;t waste your time. Nobody can recover your files without our decryption service.
            </p>
            <p className="text-red-400 font-bold mt-6">
              (Unlike WannaCry, this is a WIPER. It generated random AES keys and threw them away. Paying the ransom is useless. The disk is destroyed.)
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module12Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Static Triage",
      description: "During incident response, analysts examine the binary's PE structure and calculate its cryptographic hashes (MD5, SHA-256) to match it against threat intelligence databases.",
      component: <Phase1Triage />,
    },
    {
      title: "System Subversion",
      description: "NotPetya escalates its privileges to gain raw disk access, overwrites the Master Boot Record (MBR), and forces an abrupt system reboot.",
      component: <Phase2Escalation />,
    },
    {
      title: "Destructive Wiper",
      description: "Upon rebooting, the custom MBR executes. It fakes a 'CHKDSK' screen while actually encrypting the Master File Table (MFT) and permanently destroying the disk.",
      component: <Phase3Destruction />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={12}
      moduleTitle="NotPetya Destructive Wiper"
      moduleThreat="CRITICAL"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
