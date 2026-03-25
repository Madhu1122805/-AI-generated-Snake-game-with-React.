import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
import { motion } from 'motion/react';

const TRACKS = [
  {
    id: 1,
    title: "CYBER_PUNK_2077_DREAM",
    artist: "NEON_GHOST",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    color: "#00ffff"
  },
  {
    id: 2,
    title: "SYNTH_WAVE_VIBES",
    artist: "RETRO_BOT",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    color: "#ff00ff"
  },
  {
    id: 3,
    title: "GLITCH_IN_THE_MATRIX",
    artist: "ERROR_404",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    color: "#39ff14"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-black/80 p-6 neon-border-magenta backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-magenta-500/20 animate-pulse" />
      
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={handleNext}
      />
      
      <div className="flex items-center gap-6 mb-8">
        <div className="w-20 h-20 bg-magenta-900/20 border-2 border-magenta-500 flex items-center justify-center relative overflow-hidden group">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="z-10"
          >
            <Music className="w-10 h-10 text-magenta-500" />
          </motion.div>
          {isPlaying && (
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,0,255,0.1)_5px,rgba(255,0,255,0.1)_10px)] animate-[pulse_0.1s_infinite]" />
          )}
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-2xl font-black text-magenta-500 truncate glitch leading-none" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-cyan-600 text-sm truncate mt-1 tracking-widest">{currentTrack.artist}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-2 w-full bg-cyan-900/30 relative border border-cyan-900">
          <motion.div 
            className="h-full bg-magenta-500 shadow-[0_0_15px_#ff00ff]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-cyan-800 font-bold tracking-widest">
          <span>00:00:00</span>
          <span className="animate-pulse">STREAMING_DATA...</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <button onClick={handlePrev} className="text-cyan-400 hover:text-magenta-500 transition-all transform hover:scale-125">
          <SkipBack className="w-8 h-8" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-16 h-16 border-4 border-magenta-500 flex items-center justify-center text-magenta-500 hover:bg-magenta-500 hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,255,0.3)]"
        >
          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button onClick={handleNext} className="text-cyan-400 hover:text-magenta-500 transition-all transform hover:scale-125">
          <SkipForward className="w-8 h-8" />
        </button>
      </div>

      <div className="mt-8 flex items-center gap-3 text-cyan-900 text-xs font-bold uppercase tracking-tighter">
        <Volume2 className="w-4 h-4" />
        <div className="flex-1 h-[4px] bg-cyan-900/20 border border-cyan-900">
          <div className="w-3/4 h-full bg-cyan-800" />
        </div>
      </div>
    </div>
  );
}
