import React from 'react';
import footprintsData from '@/data/footprints.json'; 
import FootprintMap from '@/components/FootprintMap';

export default function FootprintsPage() {
  // Data processing (passport)
  const uniqueNations = new Set(footprintsData.map((item: any) => item.country)).size;
  const uniqueCities = new Set(footprintsData.map((item: any) => item.city)).size;
  
  // JSON with notes
  const fragments = footprintsData.filter((item: any) => item.note && item.note.length > 0);

  // Newest first
  const sortedStamps = [...footprintsData].sort((a: any, b: any) => 
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* (1) Interactive Map */}
      <section className="relative w-full h-[55vh] border-b border-xuanblack/10">
        <FootprintMap data={footprintsData} />
      </section>


      {/* (2) Passport */}
      <section className="w-full grid grid-cols-1 md:grid-cols-12 border-b border-xuanblack/10">
        
        {/* Left: Status Card */}
        <div className="md:col-span-4 border-r border-xuanblack/10 p-12 md:p-16 flex flex-col justify-between bg-xuan">
          <div>
            <h3 className="text-[10px] tracking-[0.5em] text-zhusha mb-8 uppercase">
              IDENTITY // LEDGER
            </h3>
            <div className="space-y-6 font-serif text-sm tracking-widest uppercase text-xuanblack">
              <div className="flex justify-between border-b border-xuanblack/5 pb-2 hover:border-zhusha/30 transition-colors">
                <span className="opacity-40 font-sans text-xs mt-1">Holder</span>
                <span>Yutong Qin</span>
              </div>
              <div className="flex justify-between border-b border-xuanblack/5 pb-2 hover:border-zhusha/30 transition-colors">
                <span className="opacity-40 font-sans text-xs mt-1">Status</span>
                <span className="text-zhusha italic">Active Explorer</span>
              </div>
              <div className="flex justify-between border-b border-xuanblack/5 pb-2 hover:border-zhusha/30 transition-colors">
                <span className="opacity-40 font-sans text-xs mt-1">Nations</span>
                <span>{uniqueNations}</span>
              </div>
              <div className="flex justify-between border-b border-xuanblack/5 pb-2 hover:border-zhusha/30 transition-colors">
                <span className="opacity-40 font-sans text-xs mt-1">Urban</span>
                <span>{uniqueCities}+</span>
              </div>
              <div className="flex justify-between border-b border-xuanblack/5 pb-2 hover:border-zhusha/30 transition-colors">
                <span className="opacity-40 font-sans text-xs mt-1">Artifacts</span>
                <span>Incalculable</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-[9px] tracking-[0.3em] opacity-30 uppercase font-sans">
            Data Synchronized via JSON Database
          </div>
        </div>

        {/* Right: Scrolling Stamps */}
        <div className="md:col-span-8 h-[60vh] overflow-y-auto px-12 pb-12 pt-0 md:px-16 md:pb-16 md:pt-0 bg-xuan custom-scrollbar relative">
          <div className="sticky top-0 bg-xuan/95 pt-12 pb-4 md:pt-16 backdrop-blur-md z-10 mb-8 border-b border-xuanblack/5">
             <h3 className="text-[10px] tracking-[0.5em] text-zhusha uppercase">
              CHRONOLOGICAL STAMPS
            </h3>
          </div>
          
          <ul className="space-y-4">
            {sortedStamps.map((stamp: any) => {
              const year = stamp.startTime ? stamp.startTime.split('-')[0] : "----";
              return (
                <li key={stamp.id} className="group flex items-center gap-6 cursor-crosshair transition-all duration-300 hover:pl-4">
                  <span className="text-zhusha font-serif text-sm tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                    [{year}]
                  </span>
                  <span className="font-serif text-lg tracking-widest text-xuanblack group-hover:italic transition-all">
                    {stamp.city.toUpperCase()}, {stamp.country.toUpperCase()}
                  </span>
                  {stamp.note && (
                    <span className="ml-auto text-[9px] tracking-widest border border-zhusha/20 px-2 py-1 text-zhusha rounded-sm opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                      RECORDED
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>


      {/* (3) Memory Fragments */}
      <section className="p-12 md:p-16 bg-xuan">
        <h3 className="text-[10px] tracking-[0.5em] text-zhusha mb-12 text-center uppercase">
          Travel Notes
        </h3>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {fragments.map((frag: any) => {
            const year = frag.startTime ? frag.startTime.split('-')[0] : "";
            return (
              <div key={`note-${frag.id}`} className="break-inside-avoid relative bg-white border border-xuanblack/10 p-8 shadow-sm hover:shadow-md transition-shadow">
                {/* ID Tag */}
                <div className="absolute -top-3 left-4 bg-zhusha text-white text-[8px] tracking-[0.2em] px-2 py-1 uppercase">
                  #{frag.id.split('-')[0]}-{year}
                </div>
                
                {/* Header */}
                <h4 className="font-serif text-xl tracking-wider mb-2 mt-2">
                  {frag.city} <span className="text-sm italic opacity-40">| {frag.country}</span>
                </h4>
                
                {/* Note Content */}
                <p className="text-sm leading-relaxed text-xuanblack/80 font-sans">
                  {frag.note}
                </p>
                
                {/* Bottom Metadata */}
                <div className="mt-6 flex justify-between items-center text-[9px] tracking-widest opacity-30 border-t border-xuanblack/10 pt-4 uppercase">
                  <span>Log: {frag.startTime}</span>
                  {frag.isHub && <span>Major Hub</span>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}