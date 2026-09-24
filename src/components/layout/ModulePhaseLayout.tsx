"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface Phase {
  title: string;
  description: string;
  component: ReactNode;
}

interface ModulePhaseLayoutProps {
  moduleNumber: number;
  moduleTitle: string;
  moduleThreat: string;
  phases: Phase[];
  currentPhase: number;
  setPhase: (phase: number) => void;
}

export function ModulePhaseLayout({
  moduleNumber,
  moduleTitle,
  moduleThreat,
  phases,
  currentPhase,
  setPhase,
}: ModulePhaseLayoutProps) {
  
  // Emil Kowalski inspired spring physics
  const transitionSpring = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 1,
  };

  const nextPhase = () => {
    if (currentPhase < phases.length - 1) setPhase(currentPhase + 1);
  };

  const prevPhase = () => {
    if (currentPhase > 0) setPhase(currentPhase - 1);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Breadcrumb & Threat Level */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-600">
            <Link href="/dashboard" className="hover:text-red-400 transition-colors">
              dashboard
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-red-400">module-{String(moduleNumber).padStart(2, '0')}</span>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full border border-red-900/50 bg-red-950/20 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
            {moduleThreat}
          </span>
        </div>

        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
              {moduleTitle.split(' ')[0]} <span className="text-red-500">{moduleTitle.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              {phases[currentPhase].description}
            </p>
          </div>

          {/* Phase Stepper */}
          <div className="flex items-center gap-2">
            {phases.map((phase, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <button
                  onClick={() => setPhase(idx)}
                  className={`flex flex-col gap-1 transition-all group ${idx === currentPhase ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
                >
                  <div className={`h-1 w-12 rounded-full transition-colors ${idx <= currentPhase ? "bg-red-500" : "bg-white/10 group-hover:bg-white/30"}`} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-left">
                    Phase {idx + 1}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Content Area (Phase specific) */}
        <div className="flex-1 relative bg-black/20 border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPhase}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
              transition={transitionSpring}
              className="flex-1 flex flex-col relative w-full h-full min-h-[600px]"
            >
              {phases[currentPhase].component}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevPhase}
            disabled={currentPhase === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm font-bold text-white hover:bg-white/5 disabled:opacity-20 disabled:hover:bg-transparent transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Phase
          </button>
          
          <div className="text-center">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Phase {currentPhase + 1} of {phases.length}
            </span>
            <div className="font-bold text-red-400">
              {phases[currentPhase].title}
            </div>
          </div>

          <button
            onClick={nextPhase}
            disabled={currentPhase === phases.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 border border-red-500 text-sm font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:opacity-20 disabled:hover:bg-red-600 disabled:shadow-none transition-all"
          >
            Next Phase
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
