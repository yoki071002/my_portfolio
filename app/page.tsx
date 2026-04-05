"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import GenerativeScroll from "../components/homepage/GenerativeScroll";

export default function Home() {
  return (
    <div className="absolute inset-0 z-0 w-full h-screen overflow-hidden">
      
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        
        <GenerativeScroll />
      </Canvas>

      <div className="relative z-10 w-full h-full pointer-events-none">
        {/* Placeholder for the Kintsugi Signature component */}
      </div>

    </div>
  );
}