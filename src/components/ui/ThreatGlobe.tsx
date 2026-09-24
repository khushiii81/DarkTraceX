"use client";

import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Convert Lat/Lon to 3D Cartesian coordinates
function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Generates a curved path between two points on the sphere
function getCurve(p1: THREE.Vector3, p2: THREE.Vector3): THREE.Vector3[] {
  const distance = p1.distanceTo(p2);
  const midPoint = p1.clone().lerp(p2, 0.5);
  
  // Elevate the midpoint to create an arc
  const elevation = distance * 0.3; // Higher distance = higher arc
  midPoint.normalize().multiplyScalar(2 + elevation); 

  const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
  return curve.getPoints(50);
}

// A single Attack Line component
function AttackLine({ startLat, startLon, endLat, endLon }: { startLat: number, startLon: number, endLat: number, endLon: number }) {
  const [progress, setProgress] = useState(0);

  const points = useMemo(() => {
    const p1 = latLongToVector3(startLat, startLon, 2.02); // Slightly above the surface
    const p2 = latLongToVector3(endLat, endLon, 2.02);
    return getCurve(p1, p2);
  }, [startLat, startLon, endLat, endLon]);

  useFrame((state, delta) => {
    setProgress((p) => (p + delta * 0.5) % 1); // Speed of the attack animation
  });

  const visiblePoints = useMemo(() => {
    const endIdx = Math.floor(progress * points.length);
    const startIdx = Math.max(0, endIdx - 15); // Trail length
    
    // Only return the slice if it has at least 2 points
    const slice = points.slice(startIdx, endIdx);
    return slice.length > 1 ? slice : [points[0], points[1]]; 
  }, [progress, points]);

  return (
    <group>
      {/* Background trace (faint) */}
      <Line points={points} color="#440000" lineWidth={1} transparent opacity={0.2} />
      
      {/* Active Attack Bolt */}
      {progress > 0 && progress < 0.95 && (
        <Line points={visiblePoints} color="#ff1e27" lineWidth={3} transparent opacity={0.9} />
      )}
      
      {/* Target Impact Bloom */}
      {progress > 0.9 && (
        <mesh position={points[points.length - 1]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ff1e27" />
        </mesh>
      )}
    </group>
  );
}

// Generates random major city coordinates roughly
const CITIES = [
  { lat: 40.7128, lon: -74.0060 }, // NYC
  { lat: 51.5074, lon: -0.1278 },  // London
  { lat: 39.9042, lon: 116.4074 }, // Beijing
  { lat: 35.6762, lon: 139.6503 }, // Tokyo
  { lat: 55.7558, lon: 37.6173 },  // Moscow
  { lat: -23.5505, lon: -46.6333 },// Sao Paulo
  { lat: 37.7749, lon: -122.4194 },// SF
  { lat: -33.8688, lon: 151.2093 },// Sydney
  { lat: 19.0760, lon: 72.8777 },  // Mumbai
  { lat: 25.2048, lon: 55.2708 },  // Dubai
];

function EarthSphere() {
  const globeRef = useRef<THREE.Group>(null);
  
  // Load the downloaded earth texture
  const colorMap = useTexture("/earth-dark.jpg");

  // Slowly rotate the Earth
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  const [attacks, setAttacks] = useState<{id: number, startLat: number, startLon: number, endLat: number, endLon: number}[]>([]);

  // Generate new random attacks
  useEffect(() => {
    const interval = setInterval(() => {
      const src = CITIES[Math.floor(Math.random() * CITIES.length)];
      let tgt = CITIES[Math.floor(Math.random() * CITIES.length)];
      while (src === tgt) {
        tgt = CITIES[Math.floor(Math.random() * CITIES.length)];
      }
      
      const newAttack = {
        id: Date.now() + Math.random(),
        startLat: src.lat,
        startLon: src.lon,
        endLat: tgt.lat,
        endLon: tgt.lon
      };
      
      setAttacks(prev => {
        const next = [...prev, newAttack];
        if (next.length > 20) return next.slice(next.length - 20); // Keep max 20 lines
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={globeRef}>
      {/* Realistic Textured Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          map={colorMap}
          color="#aa0000" // Tint the earth slightly red
          emissive="#220000"
          emissiveIntensity={0.5}
          roughness={0.8}
        />
      </Sphere>

      {/* Atmospheric Glow */}
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial 
          color="#ff1e27"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* City Markers */}
      {CITIES.map((city, i) => {
        const pos = latLongToVector3(city.lat, city.lon, 2.01);
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}

      {/* Live Attacks */}
      {attacks.map((attack) => (
        <AttackLine key={attack.id} {...attack} />
      ))}
    </group>
  );
}

export function ThreatGlobe() {
  return (
    <Suspense fallback={null}>
      <EarthSphere />
    </Suspense>
  );
}

// ─── Sweeping Radar UI ───────────────────────────────────────────────────────
function RadarSweep() {
  return (
    <div className="absolute bottom-8 left-8 w-48 h-48 rounded-full border border-red-900/50 bg-black/40 overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.1)] pointer-events-none">
      {/* Concentric Circles */}
      <div className="absolute inset-0 border border-red-900/30 rounded-full m-4" />
      <div className="absolute inset-0 border border-red-900/30 rounded-full m-10" />
      <div className="absolute inset-0 border border-red-900/30 rounded-full m-16" />
      
      {/* Crosshairs */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-900/50" />
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-red-900/50" />
      
      {/* Sweeper */}
      <div className="absolute inset-0 origin-center animate-[spin_4s_linear_infinite]">
        <div className="w-1/2 h-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,30,39,0.4)_90deg)] rounded-tl-full origin-bottom-right" />
      </div>

      {/* Blips */}
      <div className="absolute top-12 left-16 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red] animate-pulse" />
      <div className="absolute bottom-16 right-10 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red] animate-ping" />
      <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_5px_red] animate-pulse" />
    </div>
  );
}

export function ThreatGlobeCanvas() {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffdddd" />
        <ThreatGlobe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Live Threat Feed Overlay */}
      <div className="absolute top-8 left-8 bg-black/80 border border-red-900/50 p-4 rounded-lg font-mono text-xs text-red-500 shadow-[0_0_20px_rgba(255,0,0,0.2)]">
        <div className="flex items-center gap-2 mb-2 font-bold border-b border-red-900/50 pb-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> LIVE GLOBAL THREAT TELEMETRY
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex justify-between w-64"><span>Active Botnets:</span><span className="text-white">1,402</span></div>
          <div className="flex justify-between w-64"><span>DDoS Volume:</span><span className="text-white">4.2 Tbps</span></div>
          <div className="flex justify-between w-64"><span>Malware Hashes:</span><span className="text-white">84,912</span></div>
          <div className="flex justify-between w-64"><span>Global DEFCON:</span><span className="text-red-400 font-bold animate-pulse">LEVEL 3</span></div>
        </div>
      </div>

      <RadarSweep />
    </div>
  );
}
