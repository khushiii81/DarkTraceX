"use client";

import { useState, useEffect, useRef } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Server, HardDrive, MousePointerClick, Clock, Activity, FileWarning, EyeOff } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus } from "@react-three/drei";
import * as THREE from "three";

// ============================================================================
// PHASE 1: Evasion Mechanics (Environmental Checks)
// ============================================================================

function RadarSweep() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      <Torus args={[2, 0.05, 16, 100]}>
        <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
      </Torus>
      <Torus args={[1, 0.05, 16, 100]}>
        <meshBasicMaterial color="#00ff00" transparent opacity={0.4} />
      </Torus>
      {/* Sweep Line */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 0.1]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
        <mesh position={[1, 0, 0]} />
      </mesh>
    </group>
  );
}

function Phase1Evasion() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "detected" | "clean">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const runScan = async (isVM: boolean) => {
    setScanState("scanning");
    setLogs(["[EVASION] Initiating Environmental Checks..."]);
    
    await new Promise(r => setTimeout(r, 1000));
    setLogs(p => [...p, "> CPU Core Count: 2 (Suspicious)"]);
    
    await new Promise(r => setTimeout(r, 1000));
    setLogs(p => [...p, "> Checking MAC OUI..."]);
    if (isVM) {
      setLogs(p => [...p, "  ! MAC matches VMWare (00:50:56)"]);
    } else {
      setLogs(p => [...p, "  ✓ MAC matches Physical Dell (F8:B1:56)"]);
    }

    await new Promise(r => setTimeout(r, 1500));
    setLogs(p => [...p, "> Checking Drivers..."]);
    if (isVM) {
      setLogs(p => [...p, "  ! Found vmmouse.sys, VBoxGuest.sys"]);
      await new Promise(r => setTimeout(r, 1000));
      setLogs(p => [...p, "[ALERT] Virtual Environment Detected!"]);
      setLogs(p => [...p, "[ACTION] Exiting silently to evade Sandbox."]);
      setScanState("detected");
    } else {
      setLogs(p => [...p, "  ✓ No VM drivers found."]);
      await new Promise(r => setTimeout(r, 1000));
      setLogs(p => [...p, "[STATUS] Environment is Physical (Victim)."]);
      setLogs(p => [...p, "[ACTION] Proceeding with malicious payload..."]);
      setScanState("clean");
    }
  };

  return (
    <div className="absolute inset-0 bg-[#020502] flex flex-col font-mono">
      <div className="absolute inset-x-0 top-8 flex justify-center gap-6 z-10">
        <button 
          onClick={() => runScan(true)}
          disabled={scanState !== "idle"}
          className="px-6 py-2 bg-green-950 hover:bg-green-900 border border-green-700 text-green-400 rounded-lg shadow-lg"
        >
          Simulate Execution in Sandbox
        </button>
        <button 
          onClick={() => runScan(false)}
          disabled={scanState !== "idle"}
          className="px-6 py-2 bg-red-950 hover:bg-red-900 border border-red-700 text-red-400 rounded-lg shadow-lg"
        >
          Simulate Execution on Real PC
        </button>
      </div>

      <div className="flex-1 relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={1} />
          {scanState === "scanning" && <RadarSweep />}
        </Canvas>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-black/80 border border-green-900/50 rounded-lg p-4 backdrop-blur shadow-[0_0_20px_rgba(0,255,0,0.1)] h-48 overflow-y-auto">
          <div className="flex items-center gap-2 text-green-500 mb-2 font-bold border-b border-green-900/50 pb-2">
            <Activity className="w-4 h-4" /> Malware Sensor Telemetry
          </div>
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className={`text-xs my-1 ${log.includes("!") || log.includes("ALERT") ? "text-yellow-400 font-bold" : log.includes("ACTION") ? "text-red-400 font-bold" : "text-green-400"}`}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: Execution Throttling (Human Interaction Gate)
// ============================================================================

function Phase2Throttling() {
  const [clicks, setClicks] = useState(0);
  const [active, setActive] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (active && timer > 0 && clicks < 5) {
      const t = setInterval(() => setTimer(p => p - 1), 1000);
      return () => clearInterval(t);
    }
  }, [active, timer, clicks]);

  const handleStart = () => {
    setActive(true);
    setClicks(0);
    setTimer(60);
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-8 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        
        <div className="text-center text-gray-400 max-w-lg mb-4">
          Automated sandboxes only analyze files for a few minutes. Malware bypasses this by sleeping or waiting for genuine human interaction (like 5 mouse clicks) before executing.
        </div>

        {!active ? (
          <button onClick={handleStart} className="px-8 py-4 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded shadow-2xl border border-blue-500 transition-colors">
            Deploy Payload into Sandbox (60s Limit)
          </button>
        ) : (
          <div className="flex gap-8 w-full">
            
            {/* Sandbox Timer */}
            <div className={`flex-1 p-6 rounded-xl border-2 flex flex-col items-center justify-center ${timer === 0 && clicks < 5 ? "bg-green-950/40 border-green-500" : "bg-gray-900 border-gray-700"}`}>
              <Clock className={`w-12 h-12 mb-4 ${timer === 0 && clicks < 5 ? "text-green-500" : "text-gray-500"}`} />
              <div className="text-xl text-white font-bold mb-2">Sandbox Timer</div>
              <div className={`text-4xl font-black ${timer === 0 ? "text-green-500" : "text-blue-500"}`}>
                00:{String(timer).padStart(2, '0')}
              </div>
              {timer === 0 && clicks < 5 && (
                <div className="mt-4 text-green-400 text-center text-sm font-bold bg-green-900/30 p-2 rounded">
                  ANALYSIS COMPLETE.<br/>NO MALICIOUS ACTIVITY DETECTED.
                </div>
              )}
            </div>

            {/* Human Interaction Gate */}
            <div className={`flex-1 p-6 rounded-xl border-2 flex flex-col items-center justify-center relative overflow-hidden ${clicks >= 5 ? "bg-red-950/40 border-red-500 shadow-[0_0_50px_rgba(255,0,0,0.4)]" : "bg-gray-900 border-gray-700"}`}>
              <MousePointerClick className={`w-12 h-12 mb-4 ${clicks >= 5 ? "text-red-500" : "text-gray-500"}`} />
              <div className="text-xl text-white font-bold mb-2">Malware Sleep Hook</div>
              
              {clicks < 5 ? (
                <>
                  <div className="text-gray-400 mb-4 text-center text-sm">
                    Waiting for Human...<br/>
                    (Click anywhere inside this box)
                  </div>
                  <button 
                    onClick={() => setClicks(p => p + 1)} 
                    disabled={timer === 0}
                    className="absolute inset-0 w-full h-full cursor-crosshair focus:outline-none" 
                  />
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-4 rounded-full border ${i < clicks ? "bg-yellow-500 border-yellow-400" : "bg-gray-800 border-gray-600"}`} />
                    ))}
                  </div>
                </>
              ) : (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-red-500 font-bold text-center">
                  <FileWarning className="w-8 h-8 mx-auto mb-2" />
                  HUMAN INTERACTION CONFIRMED.<br/>
                  EXECUTING MALICIOUS PAYLOAD.
                </motion.div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: Analyst Telemetry Contrast
// ============================================================================

function Phase3Contrast() {
  const [comparing, setComparing] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#050505] p-6 flex flex-col font-sans">
      
      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        <div className="text-gray-300 font-bold flex items-center gap-2">
          <EyeOff className="w-5 h-5" /> Threat Analyst Dashboard: Execution Discrepancy
        </div>
        <button 
          onClick={() => setComparing(true)}
          disabled={comparing}
          className="px-6 py-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-bold rounded transition-colors"
        >
          Compare Telemetry Reports
        </button>
      </div>

      <div className="flex-1 flex gap-8">
        
        {/* Sandbox Report */}
        <div className="flex-1 bg-[#f5f5f5] rounded-lg border border-gray-300 shadow-xl flex flex-col overflow-hidden">
          <div className="bg-green-600 p-3 text-white font-bold flex items-center justify-between">
            <div className="flex items-center gap-2"><Server className="w-4 h-4" /> Automated Sandbox (Cuckoo)</div>
            <span className="text-xs bg-black/20 px-2 py-1 rounded">BENIGN</span>
          </div>
          <div className="p-4 flex-1 flex flex-col font-mono text-xs text-gray-800 bg-white">
            <div className="border-b pb-2 mb-2">Duration: 120 seconds</div>
            <AnimatePresence>
              {comparing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
                  <div className="text-gray-500">[00:00] Process setup.exe started.</div>
                  <div className="text-gray-500">[00:01] Loaded KERNEL32.dll, USER32.dll.</div>
                  <div className="text-gray-500">[00:05] Calling Sleep(1000000).</div>
                  <div className="text-gray-500">[01:59] No network activity.</div>
                  <div className="text-gray-500">[02:00] Sandbox timeout reached.</div>
                  <div className="mt-4 p-2 bg-green-100 text-green-800 border border-green-300 font-bold rounded">
                    Verdict: SAFE. File allowed to enter network.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Real VM Report */}
        <div className="flex-1 bg-[#f5f5f5] rounded-lg border border-gray-300 shadow-xl flex flex-col overflow-hidden">
          <div className="bg-red-700 p-3 text-white font-bold flex items-center justify-between">
            <div className="flex items-center gap-2"><HardDrive className="w-4 h-4" /> Employee Workstation (Endpoint)</div>
            <span className="text-xs bg-black/20 px-2 py-1 rounded">COMPROMISED</span>
          </div>
          <div className="p-4 flex-1 flex flex-col font-mono text-xs text-gray-800 bg-white">
            <div className="border-b pb-2 mb-2">Duration: 30 minutes (Live)</div>
            <AnimatePresence>
              {comparing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col gap-2">
                  <div className="text-gray-500">[00:00] Process setup.exe started.</div>
                  <div className="text-gray-500">[00:01] Loaded KERNEL32.dll, USER32.dll.</div>
                  <div className="text-gray-500">[02:15] User moved mouse 450px.</div>
                  <div className="text-gray-500">[02:16] User clicked left mouse button.</div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-red-600 font-bold bg-red-100 p-1 border-l-2 border-red-500">
                    [02:16] Suspicious VirtualAlloc() execution.
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="text-red-600 font-bold bg-red-100 p-1 border-l-2 border-red-500">
                    [02:17] Outbound connection to 198.51.100.45.
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="text-red-600 font-bold bg-red-100 p-1 border-l-2 border-red-500">
                    [02:20] Ransomware encryption routine started.
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 4 }} className="mt-4 p-2 bg-red-900 text-white font-bold rounded shadow-lg text-center text-sm">
                    CRITICAL INCIDENT DECLARED
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
// MAIN PAGE EXPORT
// ============================================================================

export default function Module3Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Environmental Checks",
      description: "Advanced malware checks MAC addresses, CPU cores, and loaded drivers to detect if it's running inside an automated analysis sandbox (like VMWare or Cuckoo). If detected, it exits silently.",
      component: <Phase1Evasion />,
    },
    {
      title: "Execution Throttling",
      description: "Automated sandboxes only run for a few minutes. Malware can bypass this by sleeping, or by waiting for genuine human interaction (like 5 mouse clicks) before detonating the payload.",
      component: <Phase2Throttling />,
    },
    {
      title: "Telemetry Contrast",
      description: "When analysts compare the automated sandbox report (which marked the file as SAFE) with the live endpoint telemetry, the evasion discrepancy becomes completely obvious.",
      component: <Phase3Contrast />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={3}
      moduleTitle="Sandbox Evasion"
      moduleThreat="HIGH"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
