import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-xuan p-8 md:p-20 font-sans text-xuanblack overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        
        {/* ID Card */}
        <div className="absolute -left-4 top-0 z-20 hidden md:block group">
          <div className="relative w-64 h-96 bg-white shadow-2xl rounded-sm border border-gray-200 rotate-[-4deg] transition-transform hover:rotate-0 duration-500">
            
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-10 bg-linear-to-b from-gray-400 to-gray-600 rounded-t-lg shadow-md z-30">
              <div className="w-full h-1 bg-white/20 mt-2"></div>
            </div>

            <div className="p-6 flex flex-col h-full items-center text-center">
              <div className="mt-8 w-32 h-40 bg-gray-100 border border-gray-200 relative overflow-hidden group-hover:border-zhusha/30 transition-colors">
                 <Image 
                    src="/avatar.JPG" 
                    alt="Yutong Qin"
                    fill
                    className="object-cover transition-all duration-700"
                    priority
                 />
                 <div className="absolute inset-0 bg-zhusha/5 mix-blend-multiply pointer-events-none"></div>
              </div>

              <div className="mt-8 space-y-2">
                <h2 className="text-lg font-serif font-bold tracking-tighter italic">YUTONG QIN</h2>
                <p className="text-[9px] tracking-[0.3em] text-zhusha font-bold">SENIOR</p>
              </div>

              <div className="mt-auto w-full border-t border-dashed border-gray-200 pt-4 text-left space-y-1">
                <p className="text-[8px] opacity-40 uppercase">D.O.B: <span className="text-xuanblack opacity-100 ml-2">2005.03.04</span></p>
                <p className="text-[8px] opacity-40 uppercase">Class: <span className="text-xuanblack opacity-100 ml-2">May 2027</span></p>
                <p className="text-[8px] opacity-40 uppercase font-mono">Location: <span className="text-xuanblack opacity-100 ml-2">Boston, MA</span></p>
              </div>

              <div className="mt-4 flex gap-0.5 h-6 w-full opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="bg-black grow" style={{ width: `${Math.random() * 4}px` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Details */}
        <div className="relative z-10 md:ml-48 bg-white/80 backdrop-blur-sm p-10 md:p-16 shadow-sm border border-zhusha/5 rotate-[0.5deg]">
          
          <div className="flex justify-between items-start border-b border-zhusha/10 pb-8 mb-12">
            <div>
              <p className="text-[10px] font-mono text-zhusha mb-1">FILE_NAME: YUTONG_QIN</p>
              <h1 className="text-4xl font-serif italic tracking-tight">Personal Narrative</h1>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-[9px] opacity-30 leading-relaxed uppercase tracking-widest">
                Confidential Archive <br />
                Subject: #050304 <br />
                Access: Unrestricted
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <div className="lg:col-span-2 space-y-12">
              <section className="space-y-6">
                <p className="text-sm leading-relaxed opacity-80 first-letter:text-4xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-zhusha">
                  I am a Senior at Boston University pursuing a double major in Applied Mathematics and CS & Economics. 
                  My academic pursuit is centered on the intersection of mathematical rigor, computing systems, and machine learning. 
                  With a solid foundation in algorithms, statistical modeling, and numerical analysis, I am currently exploring scalable AI systems, RAG architectures, and NLP. 
                  I aim to pursue graduate studies in Computer Science, building practical and robust computational tools to tackle complex real-world problems.
                </p>
                <p className="text-sm leading-relaxed opacity-80 italic border-l-2 border-zhusha/20 pl-6">
                  "Bridging the gap between ancient history and modern AI through the lens of mathematical stability."
                </p>
              </section>

              <section className="space-y-10">
                <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-zhusha">Academic Credentials</h3>
                <div className="space-y-6 font-serif">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-lg tracking-tight">Boston University</span>
                    <span className="italic opacity-60">Class of 2027</span>
                  </div>
                  <div className="relative pl-4 border-l-2 border-zhusha/10">
                    <div className="text-xs flex flex-col gap-1">
                      <span className="text-xuanblack font-bold uppercase tracking-wider text-[11px]">B.A. in Applied Mathematics</span>
                      <span className="text-zhusha font-bold tracking-widest uppercase text-[9px]">GPA: 3.93 / 4.00 | Dean's List</span>
                    </div>
                  </div>
                  <div className="relative pl-4 border-l-2 border-zhusha/10">
                    <div className="text-xs flex flex-col gap-1">
                      <span className="text-xuanblack font-bold uppercase tracking-wider text-[11px]">B.A. in Computer Science & Economics (Joint)</span>
                      <span className="text-zhusha font-bold tracking-widest uppercase text-[9px]">GPA: 3.93 / 4.00 | Dean's List</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-dashed border-gray-100 font-sans">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-4 text-xuanblack">Technical Coursework Archive</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {[
                        { code: "CS 330", name: "Algorithms" },
                        { code: "CS 542", name: "Machine Learning" },
                        { code: "MA 416", name: "Analysis of Variance" },
                        { code: "MA 539", name: "Scientific Computing" },
                        { code: "MA 586", name: "Stochastic Methods" },
                        { code: "EC 224", name: "Econometric Analysis" },
                        { code: "CS 210", name: "Computer Systems" },
                        { code: "MA 416", name: "Analysis of Variance" }
                      ].map((course) => (
                        <div key={course.code} className="flex justify-between items-end border-b border-gray-50 pb-1 group">
                          <span className="font-mono text-[9px] text-zhusha/50 group-hover:text-zhusha transition-colors tracking-tighter">
                            {course.code}
                          </span>
                          <span className="text-[10px] opacity-60 text-right truncate pl-2">{course.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 font-serif">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-lg tracking-tight">Beijing World Youth Academy</span>
                    <span className="italic opacity-60">Class of 2023</span>
                  </div>
                  <div className="relative pl-4 border-l-2 border-zhusha/10">
                    <div className="text-xs flex flex-col gap-1">
                      <span className="text-xuanblack font-bold uppercase tracking-wider text-[11px]">IB Diploma</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12 border-l border-zhusha/5 pl-8 md:pl-12">
              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.4em] uppercase opacity-40">Connectivity</h3>
                <ul className="text-[10px] space-y-4 font-mono uppercase">
                  <li className="flex justify-between items-center group cursor-pointer">
                    <span className="opacity-40">Email</span>
                    <a href="mailto:yutongq@bu.edu" className="group-hover:text-zhusha transition-colors">yutongq@bu.edu</a>
                  </li>
                  <li className="flex justify-between items-center group cursor-pointer">
                    <span className="opacity-40">GitHub</span>
                    <a href="https://github.com/yoki071002" className="group-hover:text-zhusha transition-colors">@yoki071002</a>
                  </li>
                  <li className="flex justify-between items-center group cursor-pointer">
                    <span className="opacity-40">LinkedIn</span>
                    <a href="https://www.linkedin.com/in/yoki071002/" className="group-hover:text-zhusha transition-colors">Connect ↗</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.4em] uppercase opacity-40">Technical DNA</h3>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "Scikit-learn", "Hugging Face", "PySpark", "Statistical Inference", "Optimization", "Regression", "TypeScript"].map(skill => (
                    <span key={skill} className="text-[9px] border border-gray-200 px-2 py-0.5 rounded-sm opacity-60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-12">
                <div className="w-24 h-24 border-4 border-zhusha/20 rounded-full flex items-center justify-center -rotate-12 select-none">
                  <p className="text-zhusha/30 text-[10px] font-bold text-center leading-tight uppercase tracking-tighter">
                    Verified <br /> Researcher <br /> 2005
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}