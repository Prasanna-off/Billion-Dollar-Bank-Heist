import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Shield, Flame, Skull, X } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { DifficultyLevel } from '../../types/game';
import { audioManager } from '../../audio/AudioManager';

export const DifficultySelectModal: React.FC = () => {
  const { showDifficultyModal, setShowDifficultyModal, startHeist, difficulty } = useGame();
  const [sliderIndex, setSliderIndex] = useState<number>(
    difficulty === 'EASY' ? 0 : difficulty === 'MEDIUM' ? 1 : 2
  );

  if (!showDifficultyModal) return null;

  const levels: { level: DifficultyLevel; name: string; emoji: string; color: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      level: 'EASY',
      name: 'EASY HEIST',
      emoji: '😎',
      color: 'from-emerald-400 to-teal-500',
      desc: 'Simple math expressions for entrance door pin and well-known 5-6 letter words.',
      icon: Shield,
    },
    {
      level: 'MEDIUM',
      name: 'CHALLENGING HEIST',
      emoji: '🔥',
      color: 'from-amber-400 to-orange-500',
      desc: 'Medium math squares/multiplication & intellectual 7-8 letter vault passwords.',
      icon: Flame,
    },
    {
      level: 'HARD',
      name: 'NIGHTMARE HEIST',
      emoji: '💀',
      color: 'from-rose-500 to-red-700',
      desc: 'Multi-step arithmetic expressions & elite 9-10 letter high-security passwords.',
      icon: Skull,
    },
  ];

  const currentLevel = levels[sliderIndex];
  const Icon = currentLevel.icon;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    setSliderIndex(idx);
    audioManager.playSfx('hover');
  };

  const handleConfirm = () => {
    audioManager.playSfx('click');
    setShowDifficultyModal(false);
    startHeist(currentLevel.level);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md select-none overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm sm:max-w-lg bg-slate-950 border-2 border-sky-400/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-[0_0_60px_rgba(2,132,199,0.4)] text-white text-center relative overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-mono font-bold tracking-widest text-sky-400 uppercase mb-1.5 sm:mb-2">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
          <span>DIFFICULTY SELECTOR</span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
        </div>

        <h2 className="text-xl sm:text-3xl font-cinematic font-black text-white tracking-wide">
          SECURITY LEVEL
        </h2>

        {/* Dynamic Emoji & Icon Visual */}
        <div className="my-3 sm:my-6 flex flex-col items-center">
          <motion.div
            key={currentLevel.level}
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-5xl sm:text-8xl select-none mb-2 sm:mb-3 drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
          >
            {currentLevel.emoji}
          </motion.div>

          <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${currentLevel.color} text-slate-950 font-cinematic font-black text-xs sm:text-sm tracking-widest uppercase shadow-lg flex items-center space-x-1.5 sm:space-x-2`}>
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{currentLevel.name}</span>
          </div>

          <p className="text-[11px] sm:text-sm font-mono text-gray-300 mt-2 sm:mt-3 max-w-md min-h-[2.5rem] flex items-center justify-center leading-relaxed">
            {currentLevel.desc}
          </p>
        </div>

        {/* Sliding Bar with Visual Steps */}
        <div className="my-3 sm:my-6 px-2 sm:px-4">
          <div className="flex justify-between text-[10px] sm:text-xs font-mono font-bold text-gray-400 mb-1.5 sm:mb-2">
            <span className={sliderIndex === 0 ? 'text-emerald-400' : ''}>EASY 😎</span>
            <span className={sliderIndex === 1 ? 'text-amber-400' : ''}>MEDIUM 🔥</span>
            <span className={sliderIndex === 2 ? 'text-red-400' : ''}>HARD 💀</span>
          </div>

          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={sliderIndex}
            onChange={handleSliderChange}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400 shadow-inner"
          />

          <div className="flex justify-between px-1 mt-1">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${sliderIndex >= 0 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${sliderIndex >= 1 ? 'bg-amber-400' : 'bg-slate-700'}`} />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${sliderIndex >= 2 ? 'bg-red-400' : 'bg-slate-700'}`} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
          <button
            onClick={() => setShowDifficultyModal(false)}
            className="flex-1 py-2.5 sm:py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm text-gray-300 transition-colors cursor-pointer"
          >
            CANCEL
          </button>

          <button
            onClick={handleConfirm}
            className="flex-2 py-2.5 sm:py-3.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-cinematic font-black text-sm sm:text-base tracking-wider rounded-xl sm:rounded-2xl shadow-[0_4px_25px_rgba(234,179,8,0.5)] transition-all transform hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5 sm:space-x-2"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950" />
            <span>COMMENCE</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
