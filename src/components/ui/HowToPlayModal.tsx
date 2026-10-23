import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Key, ShieldAlert, Award, Footprints } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const HowToPlayModal: React.FC = () => {
  const { setScene } = useGame();

  const handleBack = () => {
    audioManager.playSfx('click');
    setScene('MAIN_MENU');
  };

  const steps = [
    {
      step: 'STAGE 1',
      title: 'Entrance Keypad PIN',
      desc: 'Solve the mathematical door clue to discover the 2-digit PIN and slide open the FBI bank doors.',
      icon: Footprints,
      color: 'text-sky-400',
    },
    {
      step: 'STAGE 2',
      title: 'Navigate Corridors',
      desc: 'Proceed through the lobby and safety deposit corridor to reach the primary vault sanctum.',
      icon: ShieldAlert,
      color: 'text-yellow-400',
    },
    {
      step: 'STAGE 3',
      title: 'Study Word Clues',
      desc: 'Access the vault terminal. A unique word clue is unlocked before each attempt.',
      icon: Key,
      color: 'text-purple-400',
    },
    {
      step: 'STAGE 4',
      title: 'Crack Master Word',
      desc: 'Enter the secret word (e.g., TIGER, PHOENIX) to open the vault and loot ₹1,000,000,000!',
      icon: Award,
      color: 'text-emerald-400',
    },
  ];

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)] text-white overflow-y-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-cyan-500/20">
          <div>
            <h2 className="text-xl sm:text-3xl font-cinematic font-bold text-cyan-400">
              MISSION BRIEFING // HOW TO PLAY
            </h2>
            <p className="text-xs sm:text-sm font-mono text-gray-400">High Stakes Infiltration Protocol</p>
          </div>
          <button
            onClick={handleBack}
            className="p-1.5 sm:p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 my-4 sm:my-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-3 sm:p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-start space-x-2.5 sm:space-x-3"
              >
                <div className={`p-2 sm:p-2.5 rounded-lg bg-slate-900 border border-slate-700 ${s.color}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 tracking-wider">
                    {s.step}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{s.title}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prize & Chances Ladder */}
        <div className="bg-black/50 border border-yellow-500/30 rounded-xl p-3 sm:p-5 my-3 sm:my-4">
          <h3 className="text-xs sm:text-sm font-mono font-bold text-yellow-400 tracking-wider uppercase mb-2 sm:mb-3 flex items-center space-x-2">
            <span>3 ATTEMPTS // PRIZE DECAY SYSTEM</span>
          </h3>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center font-mono">
            <div className="p-2 sm:p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
              <span className="text-[9px] sm:text-xs text-emerald-400 block font-bold">ATTEMPT 1</span>
              <span className="text-xs sm:text-lg font-bold text-white mt-0.5 sm:mt-1 block">₹1,000,000,000</span>
              <span className="text-[8px] sm:text-[10px] text-gray-400">100% LOOT</span>
            </div>

            <div className="p-2 sm:p-3 bg-yellow-950/40 border border-yellow-500/30 rounded-lg">
              <span className="text-[9px] sm:text-xs text-yellow-400 block font-bold">ATTEMPT 2</span>
              <span className="text-xs sm:text-lg font-bold text-white mt-0.5 sm:mt-1 block">₹500,000,000</span>
              <span className="text-[8px] sm:text-[10px] text-gray-400">50% PENALTY</span>
            </div>

            <div className="p-2 sm:p-3 bg-red-950/40 border border-red-500/30 rounded-lg">
              <span className="text-[9px] sm:text-xs text-red-400 block font-bold">ATTEMPT 3</span>
              <span className="text-xs sm:text-lg font-bold text-white mt-0.5 sm:mt-1 block">₹250,000,000</span>
              <span className="text-[8px] sm:text-[10px] text-gray-400">FINAL CHANCE</span>
            </div>
          </div>

          <div className="mt-2.5 text-center text-[10px] sm:text-xs text-red-400 font-mono">
            ⚠ Failing all 3 attempts triggers an immediate facility lockdown, emergency siren & blast sequence (Prize ₹0).
          </div>
        </div>

        {/* Controls Guide */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 sm:p-4 flex flex-wrap gap-2 sm:gap-4 justify-between items-center text-[10px] sm:text-xs font-mono text-gray-300">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              TAP / E
            </kbd>
            <span>Interact / Advance</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              ESC
            </kbd>
            <span>Pause Heist</span>
          </div>
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              ENTER
            </kbd>
            <span>Submit Code</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-4 sm:mt-6 flex justify-end">
          <button
            onClick={handleBack}
            className="w-full sm:w-auto px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-cinematic font-bold rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)] text-sm sm:text-base text-center"
          >
            RETURN TO MENU
          </button>
        </div>
      </motion.div>
    </div>
  );
};
