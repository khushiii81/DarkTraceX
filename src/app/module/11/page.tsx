"use client";

import { useState } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileCode, AlertTriangle, FolderOpen } from "lucide-react";

// ============================================================================
// PHASE 1: Process Injection (Zeus)
// ============================================================================

function Phase1Injection() {
  const [step, setStep] = useState(0);

  const runInjection = async () => {
    setStep(1); // OpenProcess
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // VirtualAllocEx
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // WriteProcessMemory
    await new Promise(r => setTimeout(r, 1500));
    setStep(4); // CreateRemoteThread
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-12">
          <div className="text-xl font-bold text-white">Process Injection <span className="text-gray-500 font-normal text-sm">(Zeus Payload)</span></div>
          <button 
            onClick={runInjection}
            disabled={step > 0}
            className="px-6 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-bold rounded-lg transition-colors"
          >
            Inject Payload
          </button>
        </div>

        <div className="flex justify-between items-center relative">
          
          {/* Malicious Process */}
          <div className="w-64 bg-red-950/30 border-2 border-red-900 rounded-xl p-6 relative z-10">
            <div className="text-red-400 font-mono font-bold text-lg mb-2">invoice.exe</div>
            <div className="text-gray-500 text-xs font-mono mb-4">PID: 4920 (Malware)</div>
            <div className="bg-black/50 p-3 rounded font-mono text-xs text-red-300 border border-red-900/50">
              [SHELLCODE PAYLOAD]<br/>
              0x4D 0x5A 0x90 0x00<br/>
              0x03 0x00 0x00 0x00<br/>
              ...
            </div>
          </div>

          {/* The Pipeline (API Calls) */}
          <div className="flex-1 h-2 bg-gray-800 relative mx-4">
            {step >= 1 && (
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.5 }} className="absolute top-0 left-0 h-full bg-blue-500" />
            )}
            
            <AnimatePresence>
              {step === 1 && <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-blue-400 text-sm font-bold bg-black px-2">OpenProcess()</motion.div>}
              {step === 2 && <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-blue-400 text-sm font-bold bg-black px-2">VirtualAllocEx()</motion.div>}
              {step === 3 && <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-orange-400 text-sm font-bold bg-black px-2">WriteProcessMemory()</motion.div>}
              {step === 4 && <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}} className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono text-red-500 text-sm font-bold bg-black px-2">CreateRemoteThread()</motion.div>}
            </AnimatePresence>

            {/* Moving payload animation during step 3 */}
            <AnimatePresence>
              {step >= 3 && step < 4 && (
                <motion.div 
                  initial={{ x: 0, opacity: 1 }} 
                  animate={{ x: 300, opacity: 0 }} 
                  transition={{ duration: 1.5 }}
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Legitimate Target Process */}
          <div className={`w-64 bg-gray-900 border-2 rounded-xl p-6 relative z-10 transition-colors duration-1000 ${step === 4 ? "border-red-600 bg-red-950/20" : "border-gray-600"}`}>
            <div className="text-gray-300 font-mono font-bold text-lg mb-2">explorer.exe</div>
            <div className="text-gray-500 text-xs font-mono mb-4">PID: 1404 (Windows GUI)</div>
            
            <div className="bg-black/50 p-3 rounded font-mono text-xs text-gray-500 border border-gray-700 min-h-[100px] flex flex-col justify-end">
              {step >= 2 && <div className="text-blue-400 mb-1">0x00A10000: ALLOCATED</div>}
              {step >= 3 && <div className="text-orange-400 mb-1">0x00A10000: [SHELLCODE]</div>}
              {step === 4 && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-red-500 font-bold bg-red-900/30 px-2 py-1 border border-red-900/50">
                  THREAD ACTIVE. MALWARE INJECTED.
                </motion.div>
              )}
            </div>
          </div>

        </div>
        
        <div className="mt-16 text-center text-gray-500 text-sm">
          By injecting into a legitimate process like <code className="text-gray-300 bg-white/5 px-1 rounded">explorer.exe</code>, the malware bypasses personal firewalls and hides from the Task Manager. The malicious <code className="text-gray-300 bg-white/5 px-1 rounded">invoice.exe</code> can now terminate itself.
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: Registry Persistence
// ============================================================================

function Phase2Persistence() {
  const [persisted, setPersisted] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#f0f0f0] p-4 flex flex-col font-sans text-black">
      
      {/* Fake RegEdit UI */}
      <div className="flex-1 bg-white border border-gray-300 shadow-xl rounded flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-yellow-500" />
            <span>Registry Editor</span>
          </div>
          <button 
            onClick={() => setPersisted(true)}
            className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 rounded hover:bg-blue-200"
          >
            Simulate Reboot/Persistence
          </button>
        </div>

        {/* Address Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-2 py-1 text-xs text-gray-600 flex items-center gap-2">
          Computer\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
        </div>

        <div className="flex-1 flex text-sm">
          {/* Left Tree */}
          <div className="w-1/3 border-r border-gray-200 p-2 overflow-y-auto">
            <ul className="list-none pl-4 space-y-1">
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> HKEY_CLASSES_ROOT</li>
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> HKEY_CURRENT_USER
                <ul className="pl-4 mt-1 border-l border-dotted border-gray-300 space-y-1">
                  <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> Software
                    <ul className="pl-4 mt-1 border-l border-dotted border-gray-300 space-y-1">
                      <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> Microsoft
                        <ul className="pl-4 mt-1 border-l border-dotted border-gray-300 space-y-1">
                          <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> Windows
                            <ul className="pl-4 mt-1 border-l border-dotted border-gray-300 space-y-1">
                              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> CurrentVersion
                                <ul className="pl-4 mt-1 border-l border-dotted border-gray-300 space-y-1">
                                  <li className="flex items-center gap-1 font-bold bg-blue-100 px-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> Run</li>
                                  <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> RunOnce</li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-yellow-500" /> HKEY_LOCAL_MACHINE</li>
            </ul>
          </div>

          {/* Right Values */}
          <div className="flex-1 p-2 bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="font-normal text-gray-500 pb-1 w-1/3">Name</th>
                  <th className="font-normal text-gray-500 pb-1 w-1/4">Type</th>
                  <th className="font-normal text-gray-500 pb-1">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-1 flex items-center gap-1"><FileCode className="w-4 h-4 text-blue-500" /> (Default)</td>
                  <td className="py-1">REG_SZ</td>
                  <td className="py-1 text-gray-400">(value not set)</td>
                </tr>
                <tr>
                  <td className="py-1 flex items-center gap-1"><FileCode className="w-4 h-4 text-blue-500" /> OneDrive</td>
                  <td className="py-1">REG_SZ</td>
                  <td className="py-1">&quot;C:\Users\Target\AppData\Local\Microsoft\OneDrive\OneDrive.exe&quot; /background</td>
                </tr>
                <AnimatePresence>
                  {persisted && (
                    <motion.tr 
                      initial={{ backgroundColor: "#ff0000", opacity: 0 }}
                      animate={{ backgroundColor: "#ffffff", opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <td className="py-1 flex items-center gap-1"><FileCode className="w-4 h-4 text-blue-500" /> WindowsUpdateCheck</td>
                      <td className="py-1">REG_SZ</td>
                      <td className="py-1 text-red-600 font-bold">&quot;C:\Users\Target\AppData\Roaming\winupdate.exe&quot;</td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Explanation */}
        <div className="bg-gray-800 text-white p-4 text-sm border-t-4 border-red-500">
          <strong>Persistence Mechanism:</strong> By adding a value to the `HKCU\...\Run` registry key, the malware ensures that its payload (`winupdate.exe`) is automatically executed every time the infected user logs into Windows.
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: Memory Scraping (Volatile RAM hex-viewer)
// ============================================================================

function Phase3Scraping() {
  const [scraping, setScraping] = useState(false);

  // Hex dump generator
  const hexLines = Array.from({ length: 15 }, (_, i) => {
    const addr = (0x00D3A000 + (i * 16)).toString(16).toUpperCase();
    let hex = "";
    let ascii = "";
    
    // Inject the payload at line 7
    if (scraping && i === 7) {
      hex = "75 73 65 72 3D 61 64 6D 69 6E 26 70 61 73 73 3D";
      ascii = "user=admin&pass=";
    } else if (scraping && i === 8) {
      hex = "53 75 70 65 72 53 65 63 72 65 74 31 32 33 21 00";
      ascii = "SuperSecret123!.";
    } else {
      for (let j = 0; j < 16; j++) {
        const val = Math.floor(Math.random() * 256);
        hex += val.toString(16).padStart(2, '0').toUpperCase() + " ";
        ascii += (val > 32 && val < 127) ? String.fromCharCode(val) : ".";
      }
    }
    return { addr, hex: hex.trim(), ascii, highlight: scraping && (i === 7 || i === 8) };
  });

  return (
    <div className="absolute inset-0 bg-[#050505] p-6 flex flex-col font-mono text-sm">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-3 py-1 rounded text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            chrome.exe (PID: 2844)
          </div>
          <span className="text-gray-500">Live Memory Analysis (RAM)</span>
        </div>
        <button 
          onClick={() => setScraping(true)}
          disabled={scraping}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white rounded border border-red-700 transition-colors"
        >
          Initiate Memory Scrape (RedLine)
        </button>
      </div>

      <div className="flex-1 bg-black border border-gray-800 rounded p-4 overflow-hidden relative shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
        
        {/* Hex Header */}
        <div className="flex text-gray-500 mb-2 border-b border-gray-800 pb-1">
          <div className="w-24">Address</div>
          <div className="flex-1">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</div>
          <div className="w-48 text-right">ASCII</div>
        </div>

        {/* Hex Lines */}
        <div className="flex flex-col">
          {hexLines.map((line, i) => (
            <div key={i} className={`flex transition-colors duration-1000 ${line.highlight ? "bg-red-900/40 text-red-400" : "text-gray-400 hover:bg-gray-900"}`}>
              <div className="w-24 text-gray-600">{line.addr}</div>
              <div className="flex-1 tracking-widest">{line.hex}</div>
              <div className={`w-48 text-right ${line.highlight ? "text-white font-bold bg-red-600 px-1" : ""}`}>
                {line.ascii}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {scraping && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="absolute bottom-4 right-4 bg-red-950 border border-red-500 p-4 rounded shadow-2xl"
            >
              <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                <AlertTriangle className="w-5 h-5" /> CREDENTIALS HARVESTED
              </div>
              <div className="text-white">
                The malware successfully scanned the browser&apos;s volatile memory and extracted unencrypted POST request parameters before they were sent over HTTPS.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module11Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Process Injection",
      description: "Zeus (and modern stealers like RedLine) inject their malicious shellcode directly into legitimate Windows processes (like explorer.exe) to evade firewall detection and hide from Task Manager.",
      component: <Phase1Injection />,
    },
    {
      title: "Registry Persistence",
      description: "To survive a system reboot, the malware adds a string value pointing to its executable in the HKCU\\...\\Run registry key, ensuring Windows automatically launches it upon user login.",
      component: <Phase2Persistence />,
    },
    {
      title: "In-Memory Scraping",
      description: "The stealer continuously scans the memory space of target applications (like Chrome or Firefox) to harvest plaintext passwords, cookies, and crypto-wallet seeds before they are encrypted for network transmission.",
      component: <Phase3Scraping />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={11}
      moduleTitle="Zeus / RedLine Stealer"
      moduleThreat="CRITICAL"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
