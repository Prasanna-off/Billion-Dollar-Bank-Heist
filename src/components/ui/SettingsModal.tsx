import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Monitor, Maximize, Minimize, ArrowLeft, Keyboard, Info } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { GraphicsQuality } from '../../types/game';
import { audioManager } from '../../audio/AudioManager';

export const SettingsModal: React.FC = () => {
  const { currentScene, setScene, settings, updateSettings, toggleFullscreen } = useGame();

  const isSettingsScene = currentScene === 'SETTINGS';
  if (!isSettingsScene) return null;

  const handleBack = () => {
    audioManager.playSfx('click');
    setScene('MAIN_MENU');
  };

  const handleQualitySelect = (quality: GraphicsQuality) => {
    audioManager.playSfx('click');
    updateSettings({ graphicsQuality: quality });
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,229,255,0.25)] text-white max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinematic font-bold text-cyan-400">
                SYSTEM SETTINGS
              </h2>
              <p className="text-xs font-mono text-gray-400">Audio, Graphics & Hardware Controls</p>
            </div>
          </div>
          <button
            onClick={handleBack}
            className="p-2 text-gray-400 hover:text-white rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Audio Section */}
          <div className="space-y-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>AUDIO CONTROLS</span>
            </h3>

            {/* Music Volume Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                <span>Music Volume</span>
                <span className="text-cyan-400 font-bold">{Math.round(settings.musicVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicVolume}
                onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* SFX Volume Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-gray-300 mb-1">
                <span>SFX Volume</span>
                <span className="text-cyan-400 font-bold">{Math.round(settings.sfxVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={(e) => updateSettings({ sfxVolume: parseFloat(e.target.value) })}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Toggles */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  updateSettings({ musicEnabled: !settings.musicEnabled });
                  audioManager.playSfx('click');
                }}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  settings.musicEnabled
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-gray-500'
                }`}
              >
                Music: {settings.musicEnabled ? 'ENABLED' : 'MUTED'}
              </button>

              <button
                type="button"
                onClick={() => {
                  updateSettings({ sfxEnabled: !settings.sfxEnabled });
                  audioManager.playSfx('click');
                }}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                  settings.sfxEnabled
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-gray-500'
                }`}
              >
                SFX: {settings.sfxEnabled ? 'ENABLED' : 'MUTED'}
              </button>
            </div>
          </div>

          {/* Graphics Quality */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>GRAPHICS QUALITY (3D RESOLUTION)</span>
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {(['LOW', 'MEDIUM', 'HIGH'] as GraphicsQuality[]).map((q) => (
                <button
                  key={q}
                  onClick={() => handleQualitySelect(q)}
                  className={`py-2.5 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                    settings.graphicsQuality === q
                      ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                      : 'bg-slate-900 border-slate-700 text-gray-400 hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Fullscreen & Display */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-white block">EXHIBITION FULLSCREEN</span>
              <span className="text-[11px] font-mono text-gray-400">
                Maximize browser canvas for exhibition monitors
              </span>
            </div>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-mono text-cyan-400 cursor-pointer flex items-center space-x-2"
            >
              {settings.fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              <span>{settings.fullscreen ? 'EXIT FULLSCREEN' : 'ENTER FULLSCREEN'}</span>
            </button>
          </div>

          {/* Keybindings Reference */}
          <div className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800 text-xs font-mono text-gray-400 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-300 font-bold mb-1">
              <Keyboard className="w-4 h-4" />
              <span>KEYBOARD SHORTCUTS</span>
            </div>
            <div className="flex justify-between">
              <span>Enter bank / Open doors:</span>
              <span className="text-white font-bold">[E] or Left Click</span>
            </div>
            <div className="flex justify-between">
              <span>Pause / Resume Game:</span>
              <span className="text-white font-bold">[ESC]</span>
            </div>
            <div className="flex justify-between">
              <span>Submit Password:</span>
              <span className="text-white font-bold">[ENTER]</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleBack}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-cinematic font-bold rounded-xl transition-all cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            APPLY & RETURN
          </button>
        </div>
      </motion.div>
    </div>
  );
};
