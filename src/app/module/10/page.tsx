"use client";

import { useState, useRef } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Terminal, ShieldAlert, FileWarning, ArrowRight } from "lucide-react";
import * as THREE from "three";

// ============================================================================
// PHASE 1: Delivery (Phishing & Macros)
// ============================================================================

function Phase1Delivery() {
  const [clicked, setClicked] = useState(false);
  const [macroExecuted, setMacroExecuted] = useState(false);

  const enableContent = async () => {
    setClicked(true);
    await new Promise(r => setTimeout(r, 1000));
    setMacroExecuted(true);
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col h-[500px]">
        {/* Fake Word Header */}
        <div className="bg-[#2b579a] text-white p-2 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span className="text-sm font-sans">INVOICE_89432.doc [Protected View] - Word</span>
        </div>
        
        {/* Security Warning Ribbon */}
        {!clicked ? (
          <div className="bg-[#fff3cd] border-b border-[#ffeeba] p-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#856404] text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span><strong>SECURITY WARNING</strong> Macros have been disabled.</span>
            </div>
            <button 
              onClick={enableContent}
              className="px-4 py-1 bg-white border border-[#ffeeba] text-[#856404] text-sm hover:bg-gray-50 transition-colors"
            >
              Enable Content
            </button>
          </div>
        ) : (
          <div className="bg-[#f8d7da] border-b border-[#f5c6cb] p-2 px-4 flex items-center gap-2 text-[#721c24] text-sm">
            <FileWarning className="w-4 h-4" />
            <span>Macros Enabled. Executing VBScript...</span>
          </div>
        )}

        {/* Document Body & Process Tree */}
        <div className="flex-1 flex bg-gray-100 p-8 gap-8 relative">
          
          <div className="flex-1 bg-white shadow p-8 border border-gray-200">
            <div className="w-3/4 h-8 bg-gray-200 mb-6 rounded" />
            <div className="w-full h-4 bg-gray-100 mb-2 rounded" />
            <div className="w-full h-4 bg-gray-100 mb-2 rounded" />
            <div className="w-5/6 h-4 bg-gray-100 mb-8 rounded" />
            
            <div className="border-2 border-dashed border-gray-300 p-8 text-center text-gray-500 font-bold">
              DOCUMENT PROTECTED BY RSA SECURE ID
              <br/><br/>
              <span className="text-sm font-normal">Click &quot;Enable Content&quot; to decrypt and view this document.</span>
            </div>
          </div>

          <AnimatePresence>
            {macroExecuted && (
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-72 bg-black rounded-lg p-4 font-mono text-xs text-green-400 shadow-[0_0_30px_rgba(255,0,0,0.2)] border border-red-900/50"
              >
                <div className="text-red-500 mb-4 font-bold pb-2 border-b border-red-900/50">PROCESS TREE ANOMALY DETECTED</div>
                
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">WINWORD.EXE</span>
                </div>
                
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="ml-2 pl-4 border-l-2 border-red-500/50">
                  <div className="flex items-center gap-2 mt-2">
                    <Terminal className="w-4 h-4 text-gray-400" />
                    <span className="text-white font-bold">cmd.exe</span>
                  </div>
                  
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ delay: 1 }} className="ml-2 pl-4 border-l-2 border-red-500/50 mt-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-blue-500" />
                      <span className="text-red-400 font-bold">powershell.exe</span>
                    </div>
                    <div className="mt-2 text-gray-500 text-[10px] break-all">
                      -WindowStyle Hidden -EncodedCommand JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB5AFMAdAByAGUAYQBtACgAWwBDAG8AbgB2AGUAcgB0AF0AOgA6AEYAcgBvAG0AQgBhAHMAZQA2ADQAUwB0AHIAaQBuAGcAKAAiAEgA...
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: API Sandbox & Dynamic Obfuscation
// ============================================================================

function Phase2API() {
  const [step, setStep] = useState(0);

  const runPayload = async () => {
    setStep(1); // Call URLDownloadToFile
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // Call VirtualAlloc
    await new Promise(r => setTimeout(r, 1500));
    setStep(3); // Copy Memory
    await new Promise(r => setTimeout(r, 1500));
    setStep(4); // Execute
  };

  return (
    <div className="absolute inset-0 bg-[#000] p-8 flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="text-red-500 font-mono text-sm border border-red-900/50 bg-red-950/20 px-4 py-2 rounded">
          WIN32 API MONITOR // powershell.exe (PID: 9021)
        </div>
        <button 
          onClick={runPayload}
          disabled={step > 0}
          className="px-6 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-mono text-sm rounded border border-red-700"
        >
          EXECUTE SCRIPT
        </button>
      </div>

      <div className="flex-1 flex gap-8">
        {/* Memory View */}
        <div className="flex-1 border border-gray-800 rounded-xl bg-gray-950 p-6 flex flex-col">
          <h3 className="text-gray-400 font-mono text-xs mb-4">SYSTEM MEMORY MAP (RAM)</h3>
          <div className="flex-1 flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`flex-1 rounded-lg border flex items-center justify-center font-mono text-xs transition-colors ${
                i === 2 && step >= 2 ? "border-green-500 bg-green-950/30 text-green-400" : 
                i === 2 && step === 1 ? "border-yellow-500 bg-yellow-950/30 text-yellow-400" : 
                "border-gray-800 bg-gray-900 text-gray-600"
              }`}>
                {i === 2 && step >= 2 ? "0x004A0000 [ALLOCATED - RWX]" : `0x004${i}0000 [RESERVED]`}
              </div>
            ))}
          </div>
        </div>

        {/* Execution Flow */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className={`p-4 border rounded-xl transition-all ${step >= 1 ? "border-blue-500 bg-blue-950/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]" : "border-gray-800 bg-gray-900 opacity-50"}`}>
            <div className="text-blue-400 font-mono text-sm mb-2">1. URLDownloadToFileA()</div>
            <div className="text-xs text-gray-400 font-mono">
              Fetching encrypted payload from compromised WordPress site.<br/>
              <span className={step >= 1 ? "text-white" : ""}>URL: http://vintage-cars-blog.net/wp-content/uploads/payload.bin</span>
            </div>
          </div>

          <div className="flex justify-center text-gray-600"><ArrowRight className="rotate-90 w-6 h-6" /></div>

          <div className={`p-4 border rounded-xl transition-all ${step >= 2 ? "border-green-500 bg-green-950/30 shadow-[0_0_20px_rgba(34,197,94,0.2)]" : "border-gray-800 bg-gray-900 opacity-50"}`}>
            <div className="text-green-400 font-mono text-sm mb-2">2. VirtualAlloc()</div>
            <div className="text-xs text-gray-400 font-mono">
              Allocating contiguous memory block in RAM.<br/>
              <span className={step >= 2 ? "text-white" : ""}>Protection: PAGE_EXECUTE_READWRITE (RWX)</span>
            </div>
          </div>

          <div className="flex justify-center text-gray-600"><ArrowRight className="rotate-90 w-6 h-6" /></div>

          <div className={`p-4 border rounded-xl transition-all ${step >= 4 ? "border-red-500 bg-red-950/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-gray-800 bg-gray-900 opacity-50"}`}>
            <div className="text-red-400 font-mono text-sm mb-2">3. CreateThread()</div>
            <div className="text-xs text-gray-400 font-mono">
              Executing the decrypted TrickBot payload entirely in memory (fileless).<br/>
              <span className={step >= 4 ? "text-red-300 font-bold" : ""}>Status: MALWARE RUNNING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: C2 Beaconing (3D Globe)
// ============================================================================

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += 0.002; });
  
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial color="#0a2a4a" wireframe wireframeLinewidth={0.5} transparent opacity={0.3} />
      <Sphere args={[1.98, 32, 32]}>
        <meshBasicMaterial color="#000" />
      </Sphere>
    </Sphere>
  );
}

function Beacon({ start, end, active }: { start: [number,number,number], end: [number,number,number], active: boolean }) {
  if (!active) return null;

  const points = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    // Arc interpolation
    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 1.5;
    const z = start[2] + (end[2] - start[2]) * t;
    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial attach="material" color="#ff0000" linewidth={2} transparent opacity={0.8} />
    </line>
  );
}

function Phase3Beaconing() {
  const [beaconing, setBeaconing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startBeacon = () => {
    setBeaconing(true);
    setLogs(p => [...p, "[EMOTET] Collecting host system information..."]);
    setTimeout(() => setLogs(p => [...p, "[EMOTET] Encrypting data (RSA-1024)..."]), 1000);
    setTimeout(() => setLogs(p => [...p, "[NETWORK] Initiating outbound HTTP POST to 198.51.100.45:8080 (C2 Server 1)"]), 2000);
    setTimeout(() => setLogs(p => [...p, "[NETWORK] Payload received. HTTP 200 OK."]), 3500);
    setTimeout(() => setLogs(p => [...p, "[NETWORK] Secondary beacon to 203.0.113.88:443 (C2 Server 2)"]), 4500);
  };

  const infectedHost: [number,number,number] = [-1, 1, 1.5];
  const c2_1: [number,number,number] = [1.5, 0.5, -1];
  const c2_2: [number,number,number] = [0.5, 1.8, 0.5];

  return (
    <div className="absolute inset-0 bg-[#020202] flex flex-col">
      <div className="absolute top-6 left-6 z-10 w-80 bg-black/80 border border-gray-800 rounded-lg p-4 font-mono text-xs backdrop-blur">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-800">
          <span className="text-gray-400 font-bold">NETWORK TRAFFIC</span>
          <button 
            onClick={startBeacon}
            disabled={beaconing}
            className="px-3 py-1 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white rounded transition-colors"
          >
            Start C2 Beacon
          </button>
        </div>
        <div className="flex flex-col gap-2 h-48 overflow-y-auto">
          {logs.map((log, i) => (
            <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className={log.includes("NETWORK") ? "text-red-400" : "text-green-400"}>
              {log}
            </motion.div>
          ))}
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={1} />
        <Earth />
        
        {/* Infected Host */}
        <Sphere args={[0.05, 16, 16]} position={infectedHost}>
          <meshBasicMaterial color="#00ff00" />
        </Sphere>
        
        {/* C2 Servers */}
        {beaconing && (
          <>
            <Sphere args={[0.05, 16, 16]} position={c2_1}>
              <meshBasicMaterial color="#ff0000" />
            </Sphere>
            <Sphere args={[0.05, 16, 16]} position={c2_2}>
              <meshBasicMaterial color="#ff0000" />
            </Sphere>
            <Beacon start={infectedHost} end={c2_1} active={logs.length >= 3} />
            <Beacon start={infectedHost} end={c2_2} active={logs.length >= 5} />
          </>
        )}
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module10Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Malicious Delivery (Macro)",
      description: "Emotet is typically delivered via phishing emails containing macro-enabled Word documents. When a user is tricked into 'Enabling Content', a hidden VBScript spawns PowerShell.",
      component: <Phase1Delivery />,
    },
    {
      title: "Fileless API Execution",
      description: "The PowerShell script reaches out to the internet, downloads the encrypted TrickBot payload, allocates memory using VirtualAlloc(), and executes it directly in RAM, leaving no footprint on the hard drive.",
      component: <Phase2API />,
    },
    {
      title: "C2 Beaconing",
      description: "Once active, the malware encrypts host data and begins 'beaconing'—sending regular outbound HTTP/HTTPS requests to external Command and Control (C2) servers to receive further instructions.",
      component: <Phase3Beaconing />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={10}
      moduleTitle="Emotet / TrickBot"
      moduleThreat="HIGH"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
