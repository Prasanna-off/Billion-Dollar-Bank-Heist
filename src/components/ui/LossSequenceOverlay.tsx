import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Skull, RotateCcw, Home, Siren, AlertOctagon } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ExplosionVideoPlayer } from './ExplosionVideoPlayer';

export const LossSequenceOverlay: React.FC = () => {
  const { currentScene, currentChallengeIndex, restartGame, setScene } = useGame();

  const [phase, setPhase] = useState<'SIREN_COUNTDOWN' | 'VIDEO_BLAST' | 'RESULT'>('SIREN_COUNTDOWN');
  const [countdown, setCountdown] = useState<number>(3);
  const isLoss = currentScene === 'LOSS_SEQUENCE';

  useEffect(() => {
    if (isLoss) {
      setPhase('SIREN_COUNTDOWN');
      setCountdown(3);
      audioManager.playSfx('alarm'); // Plays siren audio

      // 3-second siren countdown before video blast
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Trigger green screen video explosion after 3 seconds
      const blastTimer = setTimeout(() => {
        setPhase('VIDEO_BLAST');
        audioManager.playSfx('explosion'); // Plays massive explosion sound
      }, 3000);

      // Transition to WASTED result screen after explosion video
      const resultTimer = setTimeout(() => {
        setPhase('RESULT');
      }, 6200);

      return () => {
        clearInterval(interval);
        clearTimeout(blastTimer);
        clearTimeout(resultTimer);
      };
    }
  }, [isLoss]);

  if (!isLoss) return null;

  const handleRestart = () => {
    audioManager.playSfx('click');
    restartGame(true);
  };

  const handleHome = () => {
    audioManager.playSfx('click');
    setScene('MAIN_MENU');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-auto select-none p-3 sm:p-4">
      {/* PHASE 1: 3-Second Siren Countdown with Flashing Warning Screen */}
      {phase === 'SIREN_COUNTDOWN' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-sm p-3 sm:p-4 text-center"
        >
          <div className="absolute inset-0 border-4 sm:border-8 border-red-600 animate-pulse pointer-events-none" />

          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-red-600/30 text-red-500 mb-3 sm:mb-4 border border-red-500"
          >
            <Siren className="w-10 h-10 sm:w-16 sm:h-16 animate-spin text-red-400" />
          </motion.div>

          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold font-cinematic text-red-400 tracking-wider">
            SECURITY BREACH!
          </h1>
          <p className="text-[10px] sm:text-sm md:text-base font-mono text-red-200 mt-1.5 sm:mt-2 tracking-widest uppercase font-bold">
            SELF-DESTRUCT INITIATED
          </p>

          <div className="my-4 sm:my-6 text-5xl sm:text-7xl md:text-9xl font-cinematic font-black text-white drop-shadow-[0_0_40px_rgba(239,68,68,1)]">
            0{countdown}
          </div>

          <div className="bg-black/70 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-red-500/50 text-[9px] sm:text-xs font-mono text-red-300">
            ⚠ DETONATION IMMINENT
          </div>
        </motion.div>
      )}

      {/* PHASE 2: Realtime Chroma-Key Green Screen Video Explosion Overlay */}
      {phase === 'VIDEO_BLAST' && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          {/* Green Screen Video Chroma-Key Player */}
          <ExplosionVideoPlayer />

          {/* Additional fiery screen rumble overlay */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 bg-red-600/30 pointer-events-none"
          />
        </div>
      )}

      {/* PHASE 3: WASTED Result Screen */}
      {phase === 'RESULT' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm sm:max-w-lg bg-black/95 border-2 border-red-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_0_100px_rgba(239,68,68,0.8)] text-center text-white relative z-50 my-auto"
        >
          {/* Skull Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className="mx-auto w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-red-600 to-rose-900 p-0.5 shadow-[0_0_40px_rgba(239,68,68,0.9)] flex items-center justify-center mb-3 sm:mb-4"
          >
            <div className="w-full h-full bg-slate-950 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <Skull className="w-7 h-7 sm:w-10 sm:h-10 text-red-500 animate-pulse" />
            </div>
          </motion.div>

          {/* WASTED Title Banner */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-red-950/80 border border-red-500/50 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-mono font-bold text-red-300 mb-2 sm:mb-3">
            <AlertOctagon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            <span>FBI VAULT DETONATED // HEIST FAILED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-cinematic text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-rose-500 to-red-700 tracking-wider drop-shadow-[0_0_35px_rgba(239,68,68,0.8)]">
            WASTED
          </h1>

          <p className="text-sm sm:text-lg font-mono text-gray-300 font-bold mt-1.5 sm:mt-2">
            BETTER LUCK NEXT TIME
          </p>

          <p className="text-[10px] sm:text-xs font-mono text-gray-400 mt-1">
            All 3 chances exhausted. The vault has locked down.
          </p>

          {/* Prize 0 Box */}
          <div className="my-4 sm:my-6 bg-gradient-to-b from-red-950/40 to-black border border-red-600/40 rounded-xl sm:rounded-2xl p-3 sm:p-4">
            <span className="text-[9px] sm:text-xs font-mono text-red-400 tracking-widest uppercase block font-bold">
              LOOT SECURED
            </span>
            <div className="text-2xl sm:text-4xl font-cinematic font-extrabold text-gray-400 mt-1">
              ₹0
            </div>
            <span className="text-[9px] sm:text-[11px] font-mono text-red-400/80 mt-1 block">
              Infiltration team neutralized.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 sm:py-3.5 px-4 sm:px-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-cinematic font-bold rounded-lg sm:rounded-xl shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:scale-102 active:scale-98 text-xs sm:text-base"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>RESTART (CHALLENGE #{((currentChallengeIndex + 1) % 3) + 1})</span>
            </button>

            <button
              onClick={handleHome}
              className="py-3 sm:py-3.5 px-4 sm:px-5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white font-mono text-xs sm:text-sm rounded-lg sm:rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>MAIN MENU</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
