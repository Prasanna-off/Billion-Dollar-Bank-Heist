import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, CheckCircle2, Sparkles } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { FORMAT_CURRENCY } from '../../constants/challenges';
import { audioManager } from '../../audio/AudioManager';

export const WinSequenceOverlay: React.FC = () => {
  const {
    currentScene,
    currentPrize,
    currentAttempt,
    currentChallengeIndex,
    restartGame,
    setScene,
  } = useGame();

  const isWin = currentScene === 'WIN_SEQUENCE';

  useEffect(() => {
    if (isWin) {
      // Fire celebratory confetti bursts
      const duration = 4.0 * 1000;
      const animationEnd = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#eab308', '#0284c7', '#10b981', '#ffffff'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#eab308', '#0284c7', '#10b981', '#ffffff'],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isWin]);

  if (!isWin) return null;

  const handleNextHeist = () => {
    audioManager.playSfx('click');
    restartGame(true);
  };

  const handleHome = () => {
    audioManager.playSfx('click');
    setScene('MAIN_MENU');
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="w-full max-w-xl bg-slate-950/95 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(16,185,129,0.6)] text-center text-white relative overflow-hidden"
      >
        {/* Glow ambient background badge */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Trophy Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-[0_0_30px_rgba(16,185,129,0.8)] flex items-center justify-center mb-4"
        >
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Header Badges */}
        <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/50 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-300 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>FBI VAULT BREACHED // HEIST SUCCESSFUL</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-cinematic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-100 to-yellow-300 tracking-wide drop-shadow-md">
          ACCESS GRANTED
        </h1>

        <p className="text-sm font-mono text-gray-300 mt-1">
          Federal Bank of India Vault unlocked on <span className="text-emerald-400 font-bold">Attempt #{currentAttempt}</span>!
        </p>

        {/* Prize Box */}
        <div className="my-6 bg-gradient-to-b from-slate-900 to-black border border-yellow-500/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <span className="text-xs font-mono text-yellow-400 tracking-widest uppercase block font-bold">
            TOTAL LOOT SECURED
          </span>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl font-cinematic font-extrabold text-yellow-400 mt-2 tracking-wider drop-shadow-[0_0_20px_rgba(234,179,8,0.6)]"
          >
            {FORMAT_CURRENCY(currentPrize)}
          </motion.div>
          <span className="text-[11px] font-mono text-gray-400 mt-2 block">
            Money bundles and gold bars extracted safely from FBI vault.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleNextHeist}
            className="flex-1 py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-cinematic font-bold rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center space-x-2 transition-all cursor-pointer transform hover:scale-102 active:scale-98"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY NEXT HEIST (CHALLENGE #{((currentChallengeIndex + 1) % 3) + 1})</span>
          </button>

          <button
            onClick={handleHome}
            className="py-3.5 px-5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white font-mono text-sm rounded-xl flex items-center justify-center space-x-2 transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>MAIN MENU</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
