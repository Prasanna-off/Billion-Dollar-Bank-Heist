import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Volume2, VolumeX, Maximize, Minimize, Pause, Shield } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { FORMAT_CURRENCY } from '../../constants/challenges';
import { audioManager } from '../../audio/AudioManager';

export const HUD: React.FC = () => {
  const {
    currentScene,
    currentPrize,
    remainingChances,
    currentChallengeIndex,
    settings,
    updateSettings,
    toggleFullscreen,
    setIsPaused,
  } = useGame();

  // Only render HUD during active gameplay scenes
  const isGameplayScene =
    currentScene === 'BANK_EXTERIOR' ||
    currentScene === 'BANK_ENTRY' ||
    currentScene === 'BANK_INTERIOR' ||
    currentScene === 'SECURITY_CORRIDOR' ||
    currentScene === 'VAULT_ROOM' ||
    currentScene === 'PASSWORD_TERMINAL';

  if (!isGameplayScene) return null;

  const getSceneName = () => {
    switch (currentScene) {
      case 'BANK_EXTERIOR':
        return 'EXTERIOR // ENTRANCE PLAZA';
      case 'BANK_ENTRY':
        return 'SECURITY PORTAL // SCANNING';
      case 'BANK_INTERIOR':
        return 'MAIN BANK LOBBY // SECTOR A';
      case 'SECURITY_CORRIDOR':
        return 'HIGH-SECURITY CORRIDOR // SECTOR B';
      case 'VAULT_ROOM':
        return 'CENTRAL VAULT SANCTUM // SECTOR C';
      case 'PASSWORD_TERMINAL':
        return 'VAULT ACCESS TERMINAL // LOCKDOWN ACTIVE';
      default:
        return 'FACILITY INFILTRATION';
    }
  };

  const toggleSound = () => {
    const nextState = !settings.musicEnabled;
    updateSettings({
      musicEnabled: nextState,
      sfxEnabled: nextState,
    });
    audioManager.playSfx('click');
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-4 sm:p-6">
      {/* Top HUD Row */}
      <div className="flex items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Mission & Location Status */}
        <div className="flex items-center space-x-3 bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-cyan-500/30 text-xs sm:text-sm font-mono shadow-[0_0_15px_rgba(0,229,255,0.2)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <div>
            <span className="text-gray-400 block text-[10px]">LOCATION:</span>
            <span className="text-cyan-300 font-bold tracking-wider">{getSceneName()}</span>
          </div>
          <div className="border-l border-cyan-500/30 pl-3 ml-2">
            <span className="text-gray-400 block text-[10px]">CHALLENGE:</span>
            <span className="text-yellow-400 font-bold">#{currentChallengeIndex + 1}</span>
          </div>
        </div>

        {/* Center/Right: Prize & Chances Tracker */}
        <div className="flex items-center space-x-4">
          {/* Current Prize Pot */}
          <div className="bg-black/70 backdrop-blur-md px-5 py-2 rounded-xl border border-yellow-500/40 text-right shadow-[0_0_20px_rgba(234,179,8,0.25)]">
            <span className="text-[10px] font-mono text-yellow-400/80 block uppercase tracking-widest font-bold">
              LOOT VALUE
            </span>
            <motion.span
              key={currentPrize}
              initial={{ scale: 1.15, color: '#fde047' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-xl font-cinematic font-extrabold text-white tracking-wider block"
            >
              {FORMAT_CURRENCY(currentPrize)}
            </motion.span>
          </div>

          {/* Chances Hearts */}
          <div className="bg-black/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-red-500/40 flex items-center space-x-1.5 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            {[1, 2, 3].map((heartIndex) => {
              const active = heartIndex <= remainingChances;
              return (
                <Heart
                  key={heartIndex}
                  className={`w-5 h-5 transition-all duration-300 ${
                    active
                      ? 'text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                      : 'text-gray-600 fill-transparent opacity-40'
                  }`}
                />
              );
            })}
          </div>

          {/* Utility Buttons (Sound, Fullscreen, Pause) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleSound}
              aria-label="Toggle Sound"
              className="p-2.5 bg-black/70 hover:bg-slate-800 border border-slate-700 rounded-xl text-cyan-400 transition-all cursor-pointer backdrop-blur-md"
            >
              {settings.musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="p-2.5 bg-black/70 hover:bg-slate-800 border border-slate-700 rounded-xl text-cyan-400 transition-all cursor-pointer backdrop-blur-md"
            >
              {settings.fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                audioManager.playSfx('click');
                setIsPaused(true);
              }}
              aria-label="Pause"
              className="p-2.5 bg-black/70 hover:bg-slate-800 border border-slate-700 rounded-xl text-yellow-400 transition-all cursor-pointer backdrop-blur-md"
            >
              <Pause className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Hint / Action Bar for ease of navigation */}
      <div className="flex items-center justify-center pointer-events-auto">
        {/* Handled by InteractionTooltip */}
      </div>
    </div>
  );
};
