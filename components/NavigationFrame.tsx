"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinkStyle = (path: string) => 
    `text-[9px] tracking-[0.5em] uppercase font-light transition-all duration-500 pointer-events-auto ${
      pathname === path ? 'text-zhusha opacity-100' : 'text-xuanblack/40 hover:text-zhusha hover:opacity-100'
    }`;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-xuan">
      
      <main className="absolute inset-0 z-0 overflow-y-auto overflow-x-hidden">
        <div className="min-h-screen w-full p-24 md:p-40">
          {children}
        </div>
      </main>

      <div className="pointer-events-none fixed inset-0 z-50 p-6 md:p-10">

        {/* HOME */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col items-start group">
          <div className="absolute -top-2 -left-2 w-6 h-px bg-zhusha/40 transition-all duration-700 group-hover:w-16 group-hover:bg-zhusha"></div>
          <div className="absolute -top-2 -left-2 w-px h-6 bg-zhusha/40 transition-all duration-700 group-hover:h-16 group-hover:bg-zhusha"></div>
          
          <Link href="/" className="pointer-events-auto font-serif text-sm tracking-[0.3em] text-xuanblack/80 hover:text-zhusha transition-all duration-500 mt-1">
            YOKI QIN
          </Link>
          <span className="text-[7px] tracking-[0.8em] opacity-20 mt-1 uppercase">Home</span>
        </div>

        {/* ARCHIVE & CURRICULUM */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex flex-col items-end gap-3 group">
          <div className="absolute -top-2 -right-2 w-6 h-px bg-zhusha/40 transition-all duration-700 group-hover:w-16 group-hover:bg-zhusha"></div>
          <div className="absolute -top-2 -right-2 w-px h-6 bg-zhusha/40 transition-all duration-700 group-hover:h-16 group-hover:bg-zhusha"></div>
          
          <Link href="/archive" className={navLinkStyle('/archive')}>Archive</Link>
          <Link href="/curriculum" className={navLinkStyle('/curriculum')}>Curriculum</Link>
        </div>

        {/* FOOTPRINTS */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex flex-col items-start group">
          <div className="absolute -bottom-2 -left-2 w-6 h-px bg-zhusha/40 transition-all duration-700 group-hover:w-16 group-hover:bg-zhusha"></div>
          <div className="absolute -bottom-2 -left-2 w-px h-6 bg-zhusha/40 transition-all duration-700 group-hover:h-16 group-hover:bg-zhusha"></div>
          
          <Link href="/footprints" className={navLinkStyle('/footprints')}>Footprints</Link>
        </div>

        {/* ABOUT */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex flex-col items-end group">
          <div className="absolute -bottom-2 -right-2 w-6 h-px bg-zhusha/40 transition-all duration-700 group-hover:w-16 group-hover:bg-zhusha"></div>
          <div className="absolute -bottom-2 -right-2 w-px h-6 bg-zhusha/40 transition-all duration-700 group-hover:h-16 group-hover:bg-zhusha"></div>
          
          <Link href="/about" className={navLinkStyle('/about')}>About</Link>
        </div>

      </div>
    </div>
  );
}