import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Reliable public royalty-free sitar/flute wedding audio url
const MUSIC_URL = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'; // fallback/temporary short instrumental loop
const AMBIENT_LOOP_URL = '/bg-music.mp3'; // local youtube-extracted background music

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    const audio = new Audio(AMBIENT_LOOP_URL);
    audio.loop = false; // looping handled manually to preserve the 20s offset
    audio.volume = 0.55;
    audio.currentTime = 20; // Skip first 20 seconds!

    // Handle loop manually so it resets to the 20s offset
    const handleEnded = () => {
      audio.currentTime = 20;
      audio.play().catch(err => console.warn('Audio play failed on loop ended', err));
    };

    audio.addEventListener('ended', handleEnded);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Audio auto-play blocked by browser. User interaction required first.', err);
      });
      setIsPlaying(true);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9999,
      }}
    >
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-dark) 100%)',
          border: '1.5px solid var(--gold-shine)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
          outline: 'none',
        }}
        aria-label="Toggle background music"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Volume2 size={18} strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VolumeX size={18} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Dynamic soundwaves pulsing when playing */}
      {isPlaying && (
        <div
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '1px solid var(--gold)',
            animation: 'pulseGold 1.5s ease-out infinite',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
}
