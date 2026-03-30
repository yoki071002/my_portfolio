// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[80vh] px-12 md:px-24 max-w-5xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-sm tracking-widest text-zhusha uppercase font-semibold">
          Hello, World / 你好
        </h2>
        
        <h1 className="text-4xl md:text-6xl font-serif text-xuanblack leading-tight">
          NAME <br />
          <span className="opacity-40 text-3xl md:text-5xl">SUB title</span>
        </h1>
        
        <p className="max-w-xl text-sm leading-relaxed opacity-70 mt-6 font-sans">
        </p>
      </div>

      <div className="flex gap-6 mt-12">
        <Link href="/projects" 
              className="px-6 py-3 border border-xuanblack text-xuanblack text-xs uppercase tracking-widest hover:bg-xuanblack hover:text-xuan transition-colors">
          View Projects
        </Link>
        <Link href="/about" 
              className="px-6 py-3 border border-transparent text-zhusha text-xs uppercase tracking-widest hover:border-zhusha/30 transition-colors">
          About Me →
        </Link>
      </div>
    </div>
  );
}