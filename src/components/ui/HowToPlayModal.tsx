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
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="w-full max-w-3xl bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.2)] text-white overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-cinematic font-bold text-cyan-400">
              MISSION BRIEFING // HOW TO PLAY
            </h2>
            <p className="text-sm font-mono text-gray-400">High Stakes Infiltration Protocol</p>
          </div>
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl flex items-start space-x-3"
              >
                <div className={`p-2.5 rounded-lg bg-slate-900 border border-slate-700 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{s.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Prize & Chances Ladder */}
        <div className="bg-black/50 border border-yellow-500/30 rounded-xl p-4 sm:p-5 my-4">
          <h3 className="text-sm font-mono font-bold text-yellow-400 tracking-wider uppercase mb-3 flex items-center space-x-2">
            <span>3 ATTEMPTS // PRIZE DECAY SYSTEM</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg">
              <span className="text-xs text-emerald-400 block font-bold">ATTEMPT 1 (3 CHANCES)</span>
              <span className="text-sm sm:text-lg font-bold text-white mt-1 block">₹1,000,000,000</span>
              <span className="text-[10px] text-gray-400">100% MAXIMUM LOOT</span>
            </div>

            <div className="p-3 bg-yellow-950/40 border border-yellow-500/30 rounded-lg">
              <span className="text-xs text-yellow-400 block font-bold">ATTEMPT 2 (2 CHANCES)</span>
              <span className="text-sm sm:text-lg font-bold text-white mt-1 block">₹500,000,000</span>
              <span className="text-[10px] text-gray-400">50% PENALTY REDUCTION</span>
            </div>

            <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg">
              <span className="text-xs text-red-400 block font-bold">ATTEMPT 3 (1 CHANCE)</span>
              <span className="text-sm sm:text-lg font-bold text-white mt-1 block">₹250,000,000</span>
              <span className="text-[10px] text-gray-400">FINAL EMERGENCY CHANCE</span>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-red-400 font-mono">
            ⚠ Failing all 3 attempts triggers an immediate facility lockdown, emergency siren & blast sequence (Prize ₹0).
          </div>
        </div>

        {/* Controls Guide */}
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 flex flex-wrap gap-4 justify-between items-center text-xs font-mono text-gray-300">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              CLICK / E
            </kbd>
            <span>Interact / Advance Scene</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              ESC
            </kbd>
            <span>Pause Heist</span>
          </div>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-slate-900 border border-slate-600 rounded text-cyan-400 font-bold">
              ENTER
            </kbd>
            <span>Submit Vault Code</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-cinematic font-bold rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            RETURN TO MENU
          </button>
        </div>
      </motion.div>
    </div>
  );
};
