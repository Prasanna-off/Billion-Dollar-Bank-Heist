import React from 'react';
import { motion } from 'framer-motion';
import { Play, HelpCircle, Settings as SettingsIcon, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const MainMenu: React.FC = () => {
  const { startHeist, setScene, currentChallengeIndex } = useGame();

  const handleStart = () => {
    audioManager.playSfx('click');
    startHeist();
  };

  const handleOpenHowToPlay = () => {
    audioManager.playSfx('click');
    setScene('HOW_TO_PLAY');
  };

  const handleOpenSettings = () => {
    audioManager.playSfx('click');
    setScene('SETTINGS');
  };

  const handleOpenAdmin = () => {
    audioManager.playSfx('click');
    setScene('ADMIN_LOGIN');
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-4 sm:p-8 pointer-events-none z-20">
      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-sky-400/40 text-xs sm:text-sm text-sky-300 font-mono pointer-events-auto shadow-[0_4px_20px_rgba(2,132,199,0.3)]"
      >
        <Building2 className="w-4 h-4 text-yellow-400 animate-pulse" />
        <span className="tracking-widest uppercase font-bold text-white">FBI — FEDERAL BANK OF INDIA</span>
        <span className="text-gray-400">|</span>
        <span className="text-yellow-400 font-bold">CHALLENGE #{currentChallengeIndex + 1}</span>
      </motion.div>

      {/* Main Title Centerpiece */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-3xl my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.3em] text-yellow-300 uppercase font-bold mb-2 flex items-center justify-center space-x-2 bg-black/40 backdrop-blur-md py-1 px-4 rounded-full border border-yellow-400/30">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
            <span>DAYTIME INFILTRATION CHALLENGE</span>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-cinematic tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            BILLION DOLLAR
            <br />
            BANK HEIST
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-yellow-300 font-bold tracking-wider mt-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            "CAN YOU CRACK THE FBI VAULT?"
          </p>

          <div className="mt-3 inline-block bg-slate-900/85 backdrop-blur-md border border-sky-400/40 px-4 py-1.5 rounded-xl text-xs font-mono text-sky-200 shadow-lg">
            ⚡ Exactly 3 attempts. ₹1,000,000,000 prize. Solve clues & math expressions to win!
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto w-full max-w-md sm:max-w-2xl justify-center mb-2"
      >
        {/* START HEIST BUTTON */}
        <button
          onClick={handleStart}
          onMouseEnter={() => audioManager.playSfx('hover')}
          className="group relative flex-1 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 hover:from-yellow-300 hover:to-amber-400 rounded-2xl text-slate-950 font-cinematic font-extrabold text-lg sm:text-xl tracking-wider shadow-[0_8px_30px_rgba(234,179,8,0.5)] transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <Play className="w-6 h-6 fill-slate-950 group-hover:scale-110 transition-transform" />
          <span>START HEIST</span>
        </button>

        {/* SECONDARY BUTTONS */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
          <button
            onClick={handleOpenHowToPlay}
            onMouseEnter={() => audioManager.playSfx('hover')}
            className="px-4 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-sky-400/30 hover:border-sky-400 rounded-xl font-mono text-xs sm:text-sm text-sky-200 flex items-center space-x-1.5 transition-all duration-200 cursor-pointer backdrop-blur-md shadow-md"
          >
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>HOW TO PLAY</span>
          </button>

          <button
            onClick={handleOpenSettings}
            onMouseEnter={() => audioManager.playSfx('hover')}
            className="px-4 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-sky-400/30 hover:border-sky-400 rounded-xl font-mono text-xs sm:text-sm text-sky-200 flex items-center space-x-1.5 transition-all duration-200 cursor-pointer backdrop-blur-md shadow-md"
          >
            <SettingsIcon className="w-4 h-4 text-sky-400" />
            <span>SETTINGS</span>
          </button>

          <button
            onClick={handleOpenAdmin}
            onMouseEnter={() => audioManager.playSfx('hover')}
            className="px-4 py-3.5 bg-slate-900/90 hover:bg-slate-800 border border-yellow-500/40 hover:border-yellow-400 rounded-xl font-mono text-xs sm:text-sm text-yellow-300 flex items-center space-x-1.5 transition-all duration-200 cursor-pointer backdrop-blur-md shadow-md"
          >
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>ADMIN</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
