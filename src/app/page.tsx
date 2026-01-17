import { Converter } from '@/components/Converter';

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 w-full">
        <Converter />
      </div>

      <footer className="absolute bottom-4 text-zinc-500 text-sm font-medium flex items-center gap-1.5 animate-pulse hover:text-zinc-300 transition-colors">
        Made with <span className="text-red-500">♥</span> by <a href="mailto:belalabukhadija97@gmail.com" className="hover:text-emerald-400 hover:underline transition-all">Belal</a>
      </footer>
    </main>
  );
}
