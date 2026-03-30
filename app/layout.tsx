// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <nav className="flex justify-between items-center px-16 py-12 border-b border-zhusha/5">
          <div className="group cursor-pointer">
            <h1 className="text-2xl font-bold tracking-[0.2em] text-zhusha italic">
              YUTONG QIN (YOKI)
            </h1>
            <div className="h-px bg-zhusha w-0 group-hover:w-full transition-all duration-700"></div>
          </div>
          
          <div className="flex gap-12 text-[11px] uppercase tracking-[0.3em] font-medium opacity-60">
            <Link href="/" className="hover:text-zhusha hover:opacity-100 transition-all">Home</Link>
            <Link href="/archive" className="hover:text-zhusha hover:opacity-100 transition-all">Archive</Link>
            <Link href="/curriculum" className="hover:text-zhusha hover:opacity-100 transition-all">Curriculum</Link>
            <Link href="/footprints" className="hover:text-zhusha hover:opacity-100 transition-all">Footprints</Link>
            <Link href="/about" className="hover:text-zhusha hover:opacity-100 transition-all">About</Link>
          </div>
        </nav>

        <main className="grow">
          {children}
        </main>

        <footer className="py-16 text-center text-[9px] tracking-[0.4em] opacity-30 uppercase">
          Computer Science / Applied Math / Archaeology / 2005-03-04
        </footer>
      </body>
    </html>
  );
}