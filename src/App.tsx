import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Cpu, Zap, Activity, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-0 relative bg-black selection:bg-magenta-500 selection:text-white">
      {/* CRT & Noise Effects */}
      <div className="crt-overlay" />
      <div className="scanline" />
      <div className="noise" />

      {/* Main Container - Brutalist Grid */}
      <div className="w-full max-w-[1400px] min-h-screen border-x-4 border-cyan-400 grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Column 01: System Status */}
        <aside className="lg:col-span-2 border-r-4 border-cyan-400 flex flex-col">
          <div className="p-4 border-b-4 border-cyan-400 bg-cyan-400 text-black font-bold flex justify-between items-center">
            <span>01_STATUS</span>
            <Shield className="w-4 h-4" />
          </div>
          <div className="p-6 flex-1 space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-700 block">Kernel_Load</label>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className={`h-4 w-2 ${i < 6 ? 'bg-cyan-400' : 'bg-cyan-900'}`} />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-700 block">Memory_Map</label>
              <div className="grid grid-cols-4 gap-1">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className={`h-2 w-full ${Math.random() > 0.7 ? 'bg-magenta-500 animate-pulse' : 'bg-cyan-900'}`} />
                ))}
              </div>
            </div>
            <div className="pt-8 border-t border-cyan-900">
              <p className="text-[10px] text-cyan-800 leading-relaxed">
                SYSTEM_READY_FOR_INPUT. 
                NO_ERRORS_DETECTED_IN_SECTOR_7.
                ENCRYPTION_ACTIVE.
              </p>
            </div>
          </div>
          <div className="p-4 border-t-4 border-cyan-400 bg-black text-[10px] text-cyan-600">
            LOC: ASIA_EAST_1
          </div>
        </aside>

        {/* Column 02: Main Terminal */}
        <main className="lg:col-span-7 flex flex-col">
          <header className="p-8 border-b-4 border-cyan-400 flex justify-between items-end">
            <div>
              <h1 className="text-6xl font-black tracking-tighter neon-text glitch" data-text="NEON_SNAKE_OS">
                NEON_SNAKE_OS
              </h1>
              <p className="text-xs mt-2 text-cyan-700 uppercase tracking-[0.5em]">Terminal_Session_0x7F2A9B1C</p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-2 text-magenta-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold">UNAUTHORIZED_ACCESS_DETECTED</span>
              </div>
            </div>
          </header>

          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t-4 border-l-4 border-magenta-500" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-t-4 border-r-4 border-magenta-500" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-4 border-l-4 border-magenta-500" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-4 border-r-4 border-magenta-500" />
              <SnakeGame />
            </motion.div>
          </div>

          <footer className="p-4 border-t-4 border-cyan-400 bg-cyan-900/10 flex justify-between items-center text-[10px] tracking-widest text-cyan-700">
            <span>[SYSTEM_LOG: IDLE]</span>
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> 42%</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> STABLE</span>
              <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> 12MS</span>
            </div>
          </footer>
        </main>

        {/* Column 03: Media & Comms */}
        <aside className="lg:col-span-3 border-l-4 border-cyan-400 flex flex-col bg-black">
          <div className="p-4 border-b-4 border-cyan-400 bg-magenta-500 text-black font-bold flex justify-between items-center">
            <span>03_MEDIA_SYNC</span>
            <Activity className="w-4 h-4" />
          </div>
          
          <div className="p-6 space-y-8 flex-1">
            <MusicPlayer />
            
            <div className="p-4 border-2 border-cyan-900 bg-cyan-900/5 space-y-4">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Signal_Visualizer</h4>
              <div className="flex items-end gap-1 h-16">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [10, 40, 20, 60, 15] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.3 + Math.random() * 0.5,
                      ease: "linear"
                    }}
                    className="flex-1 bg-magenta-500/50"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-cyan-700 block">Network_Traffic</label>
              <div className="text-[10px] font-mono text-cyan-900 space-y-1">
                <p>RX: 102.4 KB/S</p>
                <p>TX: 12.8 KB/S</p>
                <p>PACKETS: 4092</p>
              </div>
            </div>
          </div>

          <div className="p-8 border-t-4 border-cyan-400">
            <button className="w-full py-4 border-2 border-magenta-500 text-magenta-500 font-black hover:bg-magenta-500 hover:text-black transition-all uppercase tracking-[0.3em] screen-tear">
              Emergency_Abort
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-4 right-4 z-50 pointer-events-none opacity-20">
        <div className="text-[8px] text-cyan-400 font-mono leading-none">
          {Array(20).fill(0).map((_, i) => (
            <p key={i}>{Math.random().toString(16).substring(2, 10)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
