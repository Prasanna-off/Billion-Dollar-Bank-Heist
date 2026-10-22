import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Settings as SettingsIcon, Home, AlertTriangle } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const PauseModal: React.FC = () => {
  const { isPaused, setIsPaused, resetCurrentHeist, setScene } = useGame();
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);

  if (!isPaused) return null;

  const handleResume = () => {
    audioManager.playSfx('click');
    setIsPaused(false);
  };

  const handleOpenSettings = () => {
    audioManager.playSfx('click');
    setIsPaused(false);
    setScene('SETTINGS');
  };

  const handleConfirmRestart = () => {
    setShowRestartConfirm(false);
    setIsPaused(false);
    resetCurrentHeist();
  };

  const handleMainMenu = () => {
    audioManager.playSfx('click');
    setIsPaused(false);
    setScene('MAIN_MENU');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.3)] text-center text-white"
      >
        <h2 className="text-2xl font-cinematic font-bold text-yellow-400 tracking-wider mb-1">
          HEIST PAUSED
        </h2>
        <p className="text-xs font-mono text-gray-400 mb-6">Operations on Standby</p>

        <div className="space-y-3">
          <button
            onClick={handleResume}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-cinematic font-bold rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center space-x-2 cursor-pointer transition-all"
          >
            <Play className="w-5 h-5 fill-black" />
            <span>RESUME HEIST</span>
          </button>

          <button
            onClick={handleOpenSettings}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-200 font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <SettingsIcon className="w-4 h-4 text-cyan-400" />
            <span>SETTINGS</span>
          </button>

          <button
            onClick={() => setShowRestartConfirm(true)}
            className="w-full py-3 bg-slate-900 hover:bg-red-950/40 border border-red-500/30 text-red-400 font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART CURRENT HEIST</span>
          </button>

          <button
            onClick={handleMainMenu}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-400 hover:text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>ABANDON TO MAIN MENU</span>
          </button>
        </div>

        {/* Restart Confirmation Sub-modal */}
        {showRestartConfirm && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-slate-900 border border-red-500 rounded-2xl p-6 text-center text-white">
              <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2 animate-bounce" />
              <h3 className="text-base font-cinematic font-bold text-red-400">RESTART CURRENT HEIST?</h3>
              <p className="text-xs font-mono text-gray-300 mt-2">
                This will reset your attempts and loot value to ₹1B without skipping your challenge.
              </p>
              <div className="flex gap-2 justify-center mt-5">
                <button
                  onClick={handleConfirmRestart}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold rounded-xl cursor-pointer"
                >
                  YES, RESTART
                </button>
                <button
                  onClick={() => setShowRestartConfirm(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono text-xs rounded-xl cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
