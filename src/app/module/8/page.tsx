"use client";

import { useState, useRef } from "react";
import { ModulePhaseLayout } from "@/components/layout/ModulePhaseLayout";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Cylinder } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";
import * as THREE from "three";

// ============================================================================
// PHASE 1: Authenticode Verification
// ============================================================================

function Phase1Authenticode() {
  const [step, setStep] = useState(0);

  const runVerification = async () => {
    setStep(1); // checking Realtek
    await new Promise(r => setTimeout(r, 1500));
    setStep(2); // valid Realtek
    await new Promise(r => setTimeout(r, 2000));
    setStep(3); // checking JMicron
    await new Promise(r => setTimeout(r, 1500));
    setStep(4); // valid JMicron
    await new Promise(r => setTimeout(r, 2000));
    setStep(5); // Driver loaded
  };

  return (
    <div className="absolute inset-0 bg-[#000] p-6 flex flex-col md:flex-row gap-6">
      
      {/* OS Kernel Check UI */}
      <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl flex flex-col overflow-hidden">
        <div className="bg-gray-800 p-3 flex items-center justify-between border-b border-gray-700">
          <span className="text-gray-300 font-semibold text-sm">Windows Kernel Mode Code Signing</span>
          <ShieldCheck className="w-5 h-5 text-gray-400" />
        </div>
        <div className="p-6 flex flex-col gap-4 flex-1">
          <div className="text-gray-400 text-sm mb-4">
            Windows x64 strictly requires all kernel-mode drivers (`.sys`) to be digitally signed by a trusted Certificate Authority. Stuxnet bypassed this by stealing private keys from legitimate hardware manufacturers.
          </div>

          <div className={`p-4 border rounded-lg transition-colors ${step >= 2 ? "border-green-500/50 bg-green-900/20" : step === 1 ? "border-blue-500/50 bg-blue-900/20" : "border-gray-700 bg-gray-800"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold text-white">mrxnet.sys</span>
              {step === 1 && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
              {step >= 2 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Signer: Realtek Semiconductor Corp.<br/>
              Status: {step >= 2 ? <span className="text-green-400">Valid Signature</span> : step === 1 ? "Verifying..." : "Pending"}
            </div>
          </div>

          <div className={`p-4 border rounded-lg transition-colors ${step >= 4 ? "border-green-500/50 bg-green-900/20" : step === 3 ? "border-blue-500/50 bg-blue-900/20" : "border-gray-700 bg-gray-800"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-sm font-bold text-white">mrxcls.sys</span>
              {step === 3 && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
              {step >= 4 && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              Signer: JMicron Technology Corp.<br/>
              Status: {step >= 4 ? <span className="text-green-400">Valid Signature</span> : step === 3 ? "Verifying..." : "Pending"}
            </div>
          </div>

        </div>
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <button 
            onClick={runVerification}
            disabled={step > 0}
            className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors"
          >
            Load Drivers into Kernel
          </button>
        </div>
      </div>

      {/* Terminal logs */}
      <div className="flex-1 border border-red-900/30 bg-[#050000] rounded-xl p-4 overflow-y-auto font-mono text-xs">
        <div className="text-red-500 font-bold mb-4">ATTACKER TERMINAL // KERNEL ACCESS LOG</div>
        {step >= 1 && <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}>&gt; Injecting mrxnet.sys...</motion.div>}
        {step >= 2 && <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="text-green-400">&gt; Windows OS accepted Realtek signature. Ring 0 access granted.</motion.div>}
        {step >= 3 && <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="mt-2">&gt; Injecting mrxcls.sys...</motion.div>}
        {step >= 4 && <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="text-green-400">&gt; Windows OS accepted JMicron signature. Kernel hooks established.</motion.div>}
        {step >= 5 && <motion.div initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} className="mt-4 text-red-400 font-bold text-sm bg-red-900/20 p-2 border border-red-900/50">&gt; ROOTKIT SUCCESSFULLY DEPLOYED TO KERNEL SPACE.</motion.div>}
      </div>
    </div>
  );
}

// ============================================================================
// PHASE 2: Rootkit API Hooking
// ============================================================================

function Phase2Rootkit() {
  const [hooked, setHooked] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#050a0f] p-8 flex flex-col items-center justify-center">
      
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold text-white">Task Manager <span className="text-gray-500 font-normal text-sm">User Mode (Ring 3)</span></div>
          <button 
            onClick={() => setHooked(!hooked)}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${hooked ? "bg-red-900 text-red-200" : "bg-blue-600 text-white"}`}
          >
            {hooked ? "Disable Rootkit Hook" : "Enable Rootkit (Hook APIs)"}
          </button>
        </div>

        {/* API Diagram */}
        <div className="relative flex flex-col gap-12 mb-12">
          
          {/* User Mode App */}
          <div className="flex gap-4">
            <div className="w-48 bg-gray-800 border border-gray-600 rounded p-4 text-center text-sm text-gray-300">
              Explorer.exe (Query Files)
            </div>
            <div className="flex-1 border-b-2 border-dashed border-gray-600 relative">
              <div className="absolute top-[-10px] left-1/2 text-xs text-gray-500 font-mono">NtQueryDirectoryFile()</div>
            </div>
          </div>

          {/* The Hook Layer */}
          <div className="flex justify-center relative">
            <AnimatePresence>
              {hooked && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute z-10 w-64 bg-red-950 border-2 border-red-600 rounded-lg p-4 text-center shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                >
                  <div className="text-red-400 font-bold mb-1 font-mono text-sm">mrxnet.sys (Rootkit)</div>
                  <div className="text-red-200 text-xs">Intercepting API call.<br/>Filtering out files matching &quot;~WTR*.tmp&quot;.</div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="w-1 h-24 bg-gray-700" />
          </div>

          {/* Kernel Mode */}
          <div className="flex gap-4 justify-end">
             <div className="flex-1 border-b-2 border-solid border-gray-600 relative">
              <div className="absolute top-[-20px] left-1/4 text-xs text-gray-500 font-mono">NTDLL.DLL</div>
            </div>
            <div className="w-48 bg-gray-900 border-2 border-gray-600 rounded p-4 text-center text-sm text-white font-bold">
              Windows Kernel (Ring 0)
            </div>
          </div>
        </div>

        {/* Output Simulator */}
        <div className="bg-black border border-white/10 rounded-lg p-4 font-mono text-sm">
          <div className="text-gray-500 mb-2 border-b border-white/5 pb-2">Dir Output (USB Drive):</div>
          <div className="flex flex-col gap-1">
            <div className="text-white">report_2010.pdf</div>
            <div className="text-white">wincc_backup.bak</div>
            <AnimatePresence mode="popLayout">
              {!hooked && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 font-bold bg-red-950/30 px-2"
                >
                  ~WTR4141.tmp (Stuxnet Payload)
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {!hooked && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 font-bold bg-red-950/30 px-2"
                >
                  ~WTR4132.tmp (Stuxnet Hook)
                </motion.div>
              )}
            </AnimatePresence>
            <div className="text-white">autorun.inf</div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================================
// PHASE 3: Air-Gapped USB Propagation (3D)
// ============================================================================

function USBStick({ position, injected }: { position: [number,number,number], injected: boolean }) {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={mesh} position={position}>
      {/* USB Body */}
      <Box args={[1, 0.4, 2]}>
        <meshStandardMaterial color={injected ? "#660000" : "#222"} metalness={0.8} roughness={0.2} />
      </Box>
      {/* USB Connector */}
      <Box args={[0.8, 0.3, 0.6]} position={[0, 0, -1.3]}>
        <meshStandardMaterial color="#ccc" metalness={1} roughness={0} />
      </Box>
      {/* Light indicator */}
      <Box args={[0.2, 0.1, 0.2]} position={[0, 0.25, 0.5]}>
        <meshStandardMaterial color={injected ? "#ff0000" : "#00ff00"} emissive={injected ? "#ff0000" : "#00ff00"} emissiveIntensity={2} />
      </Box>
    </group>
  );
}

function AirGapNode({ position, isTarget, compromised }: { position: [number,number,number], isTarget?: boolean, compromised?: boolean }) {
  return (
    <group position={position}>
      <Box args={[3, 4, 3]}>
        <meshStandardMaterial color={compromised ? "#330000" : "#1a1a1a"} wireframe={!isTarget} />
      </Box>
      <Cylinder args={[1.6, 1.6, 0.2, 32]} position={[0, 2.1, 0]}>
         <meshStandardMaterial color={compromised ? "#ff0000" : "#0044ff"} emissive={compromised ? "#ff0000" : "#002288"} emissiveIntensity={compromised ? 1 : 0.5} />
      </Cylinder>
    </group>
  );
}

function Phase3AirGap() {
  const [usbPos, setUsbPos] = useState<[number,number,number]>([-6, 0, 0]);
  const [injected, setInjected] = useState(false);
  const [targetCompromised, setTargetCompromised] = useState(false);

  const simulateDrop = async () => {
    setInjected(true);
    
    // Animate USB moving from external to internal air-gapped node
    let x = -6;
    const i = setInterval(() => {
      x += 0.2;
      setUsbPos([x, 0, 0]);
      if (x >= 5) {
        clearInterval(i);
        setTargetCompromised(true);
      }
    }, 50);
  };

  return (
    <div className="absolute inset-0 bg-[#020202] flex flex-col">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <button 
          onClick={simulateDrop}
          disabled={injected}
          className="px-6 py-3 bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-bold rounded-xl border border-red-700 shadow-xl"
        >
          {injected ? "USB in transit across Air-Gap..." : "Simulate Infected USB Drop"}
        </button>
      </div>

      {targetCompromised && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-red-950/90 border border-red-600 text-red-200 px-6 py-4 rounded-xl text-center font-mono max-w-lg backdrop-blur">
          <h3 className="font-bold text-white text-lg mb-2">ISOLATED NETWORK COMPROMISED</h3>
          <p className="text-sm">
            The infected USB drive successfully jumped the physical air-gap. Stuxnet will now autonomously scan the isolated network for Siemens Step7 software and PLCs to sabotage.
          </p>
        </div>
      )}

      <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, -10]} intensity={1} color="#ff0000" />
        
        {/* Network Divide (Air Gap) */}
        <Box args={[0.2, 10, 20]} position={[0, -2, 0]}>
          <meshStandardMaterial color="#444" transparent opacity={0.3} />
        </Box>
        
        {/* Nodes */}
        <AirGapNode position={[-6, -2, 0]} />
        <AirGapNode position={[6, -2, 0]} isTarget compromised={targetCompromised} />

        {/* The Payload */}
        <USBStick position={usbPos} injected={injected} />

        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
      </Canvas>
    </div>
  );
}


// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function Module8Page() {
  const [phase, setPhase] = useState(0);

  const phases = [
    {
      title: "Authenticode Verification",
      description: "Stuxnet utilized stolen private keys from Realtek and JMicron to digitally sign its kernel drivers. This allowed the malware to silently bypass Windows Driver Signature Enforcement.",
      component: <Phase1Authenticode />,
    },
    {
      title: "Rootkit Stealth",
      description: "Once in the kernel (Ring 0), the malware hooked NTDLL APIs like NtQueryDirectoryFile, perfectly hiding its payload files (~WTR*.tmp) from the OS, antivirus, and users.",
      component: <Phase2Rootkit />,
    },
    {
      title: "Air-Gapped Propagation",
      description: "Since the target nuclear facility was physically disconnected from the internet (air-gapped), Stuxnet infected USB flash drives to physically cross the boundary.",
      component: <Phase3AirGap />,
    }
  ];

  return (
    <ModulePhaseLayout
      moduleNumber={8}
      moduleTitle="Stuxnet Sabotage"
      moduleThreat="CRITICAL"
      phases={phases}
      currentPhase={phase}
      setPhase={setPhase}
    />
  );
}
