"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, FileText, FileCode, Image as ImageIcon, Lock, RefreshCw, Terminal, Globe } from "lucide-react";
import * as THREE from "three";

// ============================================================================
// PHASE 1: Worm Propagation (3D Network Topology)
// ============================================================================

function NetworkNode({ position, infected, delay }: { position: [number, number, number], infected: boolean, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isInfected, setIsInfected] = useState(false);

  useEffect(() => {
    if (infected) {
      const t = setTimeout(() => setIsInfected(true), delay);
      return () => clearTimeout(t);
    } else {
      setIsInfected(false);
    }
  }, [infected, delay]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.3, 16, 16]} position={position}>
      <meshStandardMaterial 
        color={isInfected ? "#ff0000" : "#4ade80"} 
        emissive={isInfected ? "#ff0000" : "#22c55e"}
        emissiveIntensity={isInfected ? 2 : 0.5}
        toneMapped={false} 
      />
    </Sphere>
  );
}

function NetworkConnections({ nodes, infected }: { nodes: [number, number, number][], infected: boolean }) {
  return (
    <>
      {nodes.map((n1, i) => 
        nodes.slice(i + 1).map((n2, j) => {
          const dist = Math.sqrt(Math.pow(n1[0]-n2[0], 2) + Math.pow(n1[1]-n2[1], 2) + Math.pow(n1[2]-n2[2], 2));
          if (dist > 4) return null; // Only connect close nodes
          
          return (
            <Line 
              key={`${i}-${j}`} 
              points={[n1, n2]} 
              color={infected ? "#550000" : "#005500"} 
              lineWidth={1} 
              transparent 
              opacity={0.3} 
            />
          );
        })
      )}
    </>
  );
}

function Phase1Worm() {
  const [propagating, setPropagating] = useState(false);
  
  const nodes = useMemo(() => {
    const arr: [number, number, number][] = [];
    for(let i=0; i<30; i++) {
      arr.push([
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 10
      ]);
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 bg-[#050505] flex flex-col">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => setPropagating(true)}
          disabled={propagating}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-mono text-sm border border-red-700 rounded-lg flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          {propagating ? "Exploiting MS17-010..." : "Launch EternalBlue Payload"}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-10 font-mono text-xs text-red-500 bg-black/80 p-4 border border-red-900/50 rounded-lg max-w-sm">
        <h3 className="font-bold text-white mb-2 border-b border-red-900/50 pb-1">SMBv1 SCANNER (PORT 445)</h3>
        {propagating ? (
          <div className="flex flex-col gap-1 h-24 overflow-hidden justify-end">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}}>&gt; Scanning local subnet 192.168.1.0/24...</motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>&gt; Vulnerable host found at 192.168.1.45</motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}}>&gt; DoublePulsar backdoor installed.</motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.5}}>&gt; Payload executing on remote host.</motion.div>
          </div>
        ) : (
          <div className="text-gray-500">&gt; Waiting for payload execution...</div>
        )}
      </div>

      <Canvas camera={{ position: [0, 0, 12] }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <NetworkConnections nodes={nodes} infected={propagating} />
        {nodes.map((pos, i) => (
          <NetworkNode key={i} position={pos} infected={propagating} delay={i * 150 + Math.random() * 500} />
        ))}
        <OrbitControls enableZoom={false} autoRotate={!propagating} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

// ============================================================================
// PHASE 2: File System Encryption (Ransomware)
// ============================================================================

type TargetFile = { id: string; name: string; type: "doc" | "img" | "code"; status: "clean" | "encrypting" | "encrypted" };

function Phase2FileSystem() {
  const [files, setFiles] = useState<TargetFile[]>([
    { id: "f1", name: "Q4_Financial_Report.pdf", type: "doc", status: "clean" },
    { id: "f2", name: "Family_Vacation_2023.jpg", type: "img", status: "clean" },
    { id: "f3", name: "source_code_v2.ts", type: "code", status: "clean" },
    { id: "f4", name: "Passwords_Backup.txt", type: "doc", status: "clean" },
    { id: "f5", name: "Bitcoin_Wallet_Keys.dat", type: "code", status: "clean" },
    { id: "f6", name: "Client_Database.sql", type: "code", status: "clean" },
    { id: "f7", name: "Wedding_Photos.png", type: "img", status: "clean" },
    { id: "f8", name: "Confidential_Strategy.docx", type: "doc", status: "clean" },
  ]);
  const [isRansom, setIsRansom] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 23, minutes: 59, seconds: 50 });

  const runEncryption = async () => {
    for (let i = 0; i < files.length; i++) {
      await new Promise(r => setTimeout(r, 300));
      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "encrypting" } : f));
      await new Promise(r => setTimeout(r, 400));
      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: "encrypted", name: f.name + ".WNCRY" } : f));
    }
    await new Promise(r => setTimeout(r, 1000));
    setIsRansom(true);
  };

  useEffect(() => {
    if (!isRansom) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else { minutes = 59; if (hours > 0) hours--; else { hours = 23; if (days > 0) days--; } }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRansom]);

  const getIcon = (f: TargetFile) => {
    if (f.status === "encrypted") return <Lock className="w-8 h-8 text-red-500" />;
    if (f.status === "encrypting") return <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />;
    if (f.type === "doc") return <FileText className="w-8 h-8 text-blue-400" />;
    if (f.type === "img") return <ImageIcon className="w-8 h-8 text-purple-400" />;
    return <FileCode className="w-8 h-8 text-green-400" />;
  };

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-6 flex flex-col">
      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <h2 className="text-lg font-mono font-bold text-gray-300">C:\Users\Target\Documents\</h2>
        <button 
          onClick={runEncryption}
          disabled={files[0].status !== "clean"}
          className="px-4 py-2 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-mono text-xs rounded border border-red-700"
        >
          INITIATE ENCRYPTION ROUTINE
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {files.map(file => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: file.status === "encrypted" ? "rgba(220, 20, 60, 0.1)" : "rgba(255, 255, 255, 0.02)",
                borderColor: file.status === "encrypted" ? "rgba(220, 20, 60, 0.3)" : "rgba(255, 255, 255, 0.05)",
              }}
              className="flex flex-col items-center gap-3 p-4 border rounded-xl relative overflow-hidden"
            >
              {getIcon(file)}
              <span className={`text-xs font-mono text-center break-all ${file.status === "encrypted" ? "text-red-400" : "text-gray-400"}`}>
                {file.name}
              </span>
              {file.status === "encrypting" && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                  <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.4 }} className="h-full bg-orange-500" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isRansom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-4 z-50 bg-[#9e0b0f] border-4 border-[#ff0000] shadow-[0_0_50px_rgba(255,0,0,0.5)] flex flex-col md:flex-row overflow-hidden"
          >
            <div className="bg-[#6b0306] w-full md:w-64 p-4 flex flex-col items-center border-r-2 border-[#9e0b0f]">
              <ShieldAlert className="w-20 h-20 text-white mb-4 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
              <div className="w-full bg-[#3d0102] p-3 text-center border border-white/10 mb-4">
                <div className="text-white text-xs font-bold mb-1">Payment will be raised on</div>
                <div className="text-yellow-400 font-mono text-sm">5/15/2026 14:00:00</div>
                <div className="text-white text-xs mt-2">Time Left</div>
                <div className="text-3xl font-mono text-white font-bold mt-1">
                  {String(timeLeft.days).padStart(2,'0')}:{String(timeLeft.hours).padStart(2,'0')}:{String(timeLeft.minutes).padStart(2,'0')}:{String(timeLeft.seconds).padStart(2,'0')}
                </div>
              </div>
            </div>
            <div className="flex-1 p-6 relative z-10 bg-[#9e0b0f]">
              <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Ooops, your files have been encrypted!</h2>
              <div className="bg-white text-black p-4 h-48 overflow-y-auto font-sans text-sm border-2 border-gray-400 mb-4 leading-relaxed shadow-inner">
                <h3 className="font-bold text-lg mb-2">What Happened to My Computer?</h3>
                <p className="mb-2">Your important files are encrypted.</p>
                <p>Many of your documents, photos, videos, databases and other files are no longer accessible because they have been encrypted. Maybe you are busy looking for a way to recover your files, but do not waste your time. Nobody can recover your files without our decryption service.</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-[#6b0306] text-white border border-white/20 font-bold w-1/2">Check Payment</button>
                <button className="px-6 py-2 bg-[#6b0306] text-white border border-white/20 font-bold w-1/2">Decrypt</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// PHASE 3: The Killswitch (DNS Sinkhole)
// ============================================================================

function Phase3Killswitch() {
  const [logs, setLogs] = useState<string[]>([]);
  const [status, setStatus] = useState<"checking" | "failed" | "sinkholed">("checking");

  const runKillswitch = async () => {
    setLogs(["[SYSTEM] Initializing WannaCry payload..."]);
    await new Promise(r => setTimeout(r, 1000));
    setLogs(p => [...p, "[WCRY] Generating HTTP GET request to killswitch domain..."]);
    await new Promise(r => setTimeout(r, 800));
    setLogs(p => [...p, "[WCRY] Resolving: iuqerfsodp9ifjaposdfjhgosurijfaewrwergwea.com"]);
    await new Promise(r => setTimeout(r, 1500));
    setLogs(p => [...p, "[DNS] Query returned IP: 104.17.20.14 (Sinkhole Active)"]);
    await new Promise(r => setTimeout(r, 800));
    setLogs(p => [...p, "[WCRY] HTTP 200 OK received from domain."]);
    await new Promise(r => setTimeout(r, 1000));
    setLogs(p => [...p, "[WCRY] Domain is LIVE. Aborting encryption routine."]);
    setLogs(p => [...p, "[WCRY] Exiting process gracefully..."]);
    setStatus("sinkholed");
  };

  return (
    <div className="absolute inset-0 bg-[#000] p-6 flex flex-col font-mono">
      <div className="flex-1 border border-green-900/30 bg-[#051005] rounded-xl p-4 overflow-y-auto shadow-[inset_0_0_20px_rgba(0,255,0,0.05)]">
        <div className="text-green-500 mb-4 opacity-50">
          DarkTraceX Network Analyzer v2.4.1 (Sandbox Mode)<br />
          Monitoring process: wnry.exe (PID: 8492)
        </div>
        
        {logs.map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className={`mb-2 ${log.includes("Aborting") || log.includes("Exiting") ? "text-red-400 font-bold" : "text-green-400"}`}
          >
            {log}
          </motion.div>
        ))}

        {status === "checking" && logs.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <button 
              onClick={runKillswitch}
              className="px-6 py-3 bg-green-950 hover:bg-green-900 text-green-400 border border-green-700 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all flex items-center gap-2"
            >
              <Terminal className="w-5 h-5" /> Execute Payload in Monitored Env
            </button>
          </div>
        )}

        {status === "sinkholed" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="mt-8 p-6 bg-black border-2 border-red-900 rounded-lg max-w-lg mx-auto text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-red-500 font-bold text-xl mb-2">INFECTION NEUTRALIZED</h3>
            <p className="text-gray-400 text-sm">
              Because the malware successfully connected to the hardcoded domain (which was registered by a security researcher as a sinkhole), the encryption routine completely bypassed itself.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module7Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Worm Propagation",
      description: "WannaCry spreads laterally via the EternalBlue SMBv1 exploit, compromising vulnerable Windows systems on the same network segment.",
      component: <Phase1Worm />,
    },
    {
      title: "File System Attack",
      description: "Once inside, it rapidly iterates through the file system, encrypting critical documents with military-grade AES-128 and appending .WNCRY extensions.",
      component: <Phase2FileSystem />,
    },
    {
      title: "The Killswitch",
      description: "Before encrypting, WannaCry inexplicably queries a hardcoded, unregistered domain. If the domain is live (sinkholed), the malware completely aborts.",
      component: <Phase3Killswitch />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={7}
      moduleTitle="WannaCry Simulator"
      moduleThreat="CRITICAL"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
