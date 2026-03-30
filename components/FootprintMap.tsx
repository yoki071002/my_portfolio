"use client";

import React, { useState } from "react";
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker, 
  Line, 
  ZoomableGroup 
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const HUBS = [
  { name: "Beijing", coordinates: [116.4074, 39.9042] },
  { name: "London", coordinates: [-0.1276, 51.5074] },
  { name: "Boston", coordinates: [-71.0589, 42.3601] }
];

export default function FootprintMap({ data }: { data: any[] }) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  
  const [position, setPosition] = useState({ coordinates: [20, 30], zoom: 1 });

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    setPosition(newPosition);
  };

  return (
    <div className="relative w-full h-full bg-xuan overflow-hidden cursor-crosshair">
      
      {/* (1) Tooltip */}
      {tooltip && (
        <div 
          className="fixed pointer-events-none z-100 flex items-center gap-2 transition-all duration-75"
          style={{ left: tooltip.x + 15, top: tooltip.y + 15 }}
        >
          <div className="w-4 h-px bg-zhusha"></div>
          <span className="text-[10px] tracking-[0.2em] font-sans uppercase text-xuan bg-zhusha px-2 py-1 shadow-2xl border border-zhusha/20">
            {tooltip.text}
          </span>
        </div>
      )}

      {/* (2) Map Function */}
      <ComposableMap 
        projection="geoMercator" 
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup 
          center={position.coordinates as [number, number]} 
          zoom={position.zoom} 
          onMoveEnd={handleMoveEnd}
          maxZoom={12}
        >
          
          {/* A. Map Layer */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="rgba(0,0,0,0.025)"
                  stroke="var(--color-xuanblack)"
                  strokeWidth={0.6 / position.zoom}
                  style={{
                    default: { 
                      outline: "none", 
                      opacity: 0.3,
                      transition: "all 300ms ease" 
                    },
                    hover: { 
                      outline: "none", 
                      opacity: 0.7, 
                      fill: "rgba(178, 34, 34, 0.08)",
                      strokeWidth: 1.5 / position.zoom,
                      transition: "all 200ms ease"
                    },
                    pressed: { outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>

          {/* B. Golden threads */}
          <Line 
            from={HUBS[0].coordinates as [number, number]} 
            to={HUBS[1].coordinates as [number, number]} 
            stroke="#C5A059" 
            strokeWidth={1.5 / position.zoom}
            opacity={0.8}
          />
          <Line 
            from={HUBS[1].coordinates as [number, number]} 
            to={HUBS[2].coordinates as [number, number]} 
            stroke="#C5A059" 
            strokeWidth={1.5 / position.zoom} 
            opacity={0.8} 
          />

          {/* C. Nodes */}
          {data.map((stamp, index) => {
            if (!stamp.coordinates || stamp.coordinates.length !== 2) return null;
            const year = stamp.startTime ? stamp.startTime.split('-')[0] : "";
            
            return (
              <Marker 
                key={`${stamp.id}-${index}`} 
                coordinates={stamp.coordinates as [number, number]}
              >
                <circle
                  r={10 / position.zoom}
                  fill="transparent"
                  onMouseEnter={(e) => {
                    setTooltip({ 
                      text: `${stamp.city}, ${stamp.country} | ${year}`, 
                      x: e.clientX, 
                      y: e.clientY 
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
                <circle 
                  r={Math.max(0.8, 2.8 / Math.sqrt(position.zoom))} 
                  fill="var(--color-zhusha)" 
                  opacity={0.8}
                  className="pointer-events-none"
                />
              </Marker>
            );
          })}

          {/* D. Hubs */}
          {HUBS.map((hub) => (
            <Marker key={`hub-${hub.name}`} coordinates={hub.coordinates as [number, number]}>
              <circle r={5 / position.zoom} fill="transparent" stroke="#C5A059" strokeWidth={1.5 / position.zoom} />
              <circle r={2 / position.zoom} fill="#C5A059" />
            </Marker>
          ))}
          
        </ZoomableGroup>
      </ComposableMap>

      {/* (3) Label */}
      <div className="absolute bottom-6 left-12 flex flex-col gap-1 pointer-events-none">
        <span className="text-[8px] tracking-[0.4em] opacity-20 uppercase font-sans">Scroll to zoom in/out</span>
        <span className="text-[8px] tracking-[0.4em] opacity-20 uppercase font-sans">Drag to explore coordinates</span>
      </div>
    </div>
  );
}