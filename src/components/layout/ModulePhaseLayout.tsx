"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
}: ModulePhaseLayoutProps) {
  
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
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {moduleTitle.split(' ')[0]} <span className="text-red-500">{moduleTitle.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Interactive simulation and visual analysis of the attack vector.
          </p>
        </div>

        {/* Single Phase Simulation Layout (All phases stacked) */}
        <div className="flex flex-col gap-8 flex-1">
          {phases.map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col relative w-full min-h-[500px] border border-white/10 rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur shadow-2xl p-6 lg:p-8"
            >
              {/* Phase Info */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <h2 className="text-2xl font-bold text-white mb-2">
                  <span className="text-red-500 mr-2 font-mono">0{idx + 1}</span>
                  {phase.title}
                </h2>
                <p className="text-gray-400 text-sm max-w-3xl leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Simulation Component */}
              <div className="flex-1 relative rounded-xl overflow-hidden bg-black/50 border border-white/5">
                {phase.component}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
