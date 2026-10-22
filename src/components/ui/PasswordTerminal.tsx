import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, AlertTriangle, Key, Delete, CornerDownLeft, Heart, Calculator } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { FORMAT_CURRENCY } from '../../constants/challenges';
import { audioManager } from '../../audio/AudioManager';

export const PasswordTerminal: React.FC = () => {
  const {
    currentScene,
    currentPrize,
    remainingChances,
    currentAttempt,
    currentClue,
    submitPassword,
    lastAttemptSuccess,
    isSubmitting,
    setScene,
  } = useGame();

  const [inputVal, setInputVal] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isTerminalScene = currentScene === 'PASSWORD_TERMINAL';
  const isFinalChance = remainingChances === 1;

  useEffect(() => {
    if (isTerminalScene) {
      inputRef.current?.focus();
    }
  }, [isTerminalScene, currentAttempt]);

  if (!isTerminalScene) return null;

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) {
      setErrorMessage('PLEASE ENTER A PASSWORD');
      audioManager.playSfx('denied');
      return;
    }

    setErrorMessage(null);
    audioManager.playSfx('click');
    const result = submitPassword(inputVal);

    if (!result.success) {
      setErrorMessage(result.message);
      setInputVal('');
    }
  };

  const handleKeypadPress = (char: string) => {
    audioManager.playSfx('hover');
    setInputVal((prev) => (prev + char).toUpperCase());
  };

  const handleBackspace = () => {
    audioManager.playSfx('hover');
    setInputVal((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    audioManager.playSfx('hover');
    setInputVal('');
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-2xl bg-slate-900/95 border-2 rounded-3xl p-5 sm:p-7 shadow-2xl text-white my-auto ${
          isFinalChance
            ? 'border-red-500 shadow-[0_0_60px_rgba(239,68,68,0.5)] animate-pulse'
            : lastAttemptSuccess === false
            ? 'border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.5)]'
            : lastAttemptSuccess === true
            ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.5)]'
            : 'border-sky-500/60 shadow-[0_0_50px_rgba(2,132,199,0.3)]'
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-sky-500/30">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2.5 rounded-xl ${
                isFinalChance
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-sky-500/20 text-sky-400'
              }`}
            >
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-cinematic font-bold text-white tracking-wider flex items-center gap-2">
                <span>FBI VAULT TERMINAL</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono border border-sky-500/30">
                  FBI-SEC-V4
                </span>
              </h2>
              <p className="text-xs font-mono text-gray-400">FEDERAL BANK OF INDIA // SECURITY PROTOCOL</p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.playSfx('click');
              setScene('VAULT_ROOM');
            }}
            className="text-xs font-mono text-gray-300 hover:text-sky-400 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-sky-500 bg-slate-800 cursor-pointer transition-colors"
          >
            ← VAULT VIEW
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="bg-slate-950/80 border border-yellow-500/30 rounded-xl p-3 text-center">
            <span className="text-[10px] font-mono text-yellow-400 font-bold block uppercase tracking-wider">
              PRIZE POT
            </span>
            <span className="text-sm sm:text-base font-cinematic font-bold text-yellow-300">
              {FORMAT_CURRENCY(currentPrize)}
            </span>
          </div>

          <div className="bg-slate-950/80 border border-sky-500/30 rounded-xl p-3 text-center">
            <span className="text-[10px] font-mono text-sky-400 font-bold block uppercase tracking-wider">
              ATTEMPT
            </span>
            <span className="text-sm sm:text-base font-cinematic font-bold text-sky-300">
              {currentAttempt} / 3
            </span>
          </div>

          <div className="bg-slate-950/80 border border-red-500/30 rounded-xl p-3 text-center flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono text-red-400 font-bold block uppercase tracking-wider">
              CHANCES
            </span>
            <div className="flex items-center space-x-1 mt-0.5">
              {[1, 2, 3].map((idx) => (
                <Heart
                  key={idx}
                  className={`w-4 h-4 ${
                    idx <= remainingChances
                      ? 'text-red-500 fill-red-500'
                      : 'text-gray-700 fill-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final Chance Tension Alert */}
        {isFinalChance && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4 bg-red-950/80 border border-red-500 rounded-xl p-3 text-center flex items-center justify-center space-x-2 text-red-300 font-mono text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          >
            <AlertTriangle className="w-5 h-5 text-red-400 animate-bounce" />
            <span>CRITICAL WARNING: FINAL CHANCE! ONE WRONG CODE WILL TRIGGER ALARMS & EXPLOSION!</span>
          </motion.div>
        )}

        {/* Current Clue Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-sky-500/40 rounded-2xl p-4 sm:p-5 mb-4 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-sky-400 flex items-center space-x-2 uppercase tracking-widest">
              {currentAttempt === 3 ? (
                <Calculator className="w-4 h-4 text-yellow-400" />
              ) : (
                <Key className="w-4 h-4 text-sky-400" />
              )}
              <span>DECRYPTED CLUE #{currentAttempt}</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Format: [WORD][2-DIGITS]
            </span>
          </div>

          <p className="text-base sm:text-lg font-mono text-yellow-300 font-semibold leading-relaxed">
            "{currentClue}"
          </p>
        </div>

        {/* Input Form with generic non-revealing placeholder */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              placeholder="ENTER PASSWORD (e.g. EAGLE88)"
              disabled={isSubmitting}
              className={`w-full bg-black/80 border-2 rounded-2xl px-5 py-4 text-center font-mono text-xl sm:text-2xl font-bold tracking-[0.25em] text-sky-300 placeholder-gray-500 focus:outline-none transition-all ${
                isFinalChance
                  ? 'border-red-500 focus:border-red-400 focus:shadow-[0_0_25px_rgba(239,68,68,0.5)]'
                  : 'border-sky-500/50 focus:border-sky-400 focus:shadow-[0_0_25px_rgba(2,132,199,0.4)]'
              }`}
            />
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-center font-mono text-xs sm:text-sm text-red-400 bg-red-950/60 border border-red-500/40 py-2 px-4 rounded-xl"
              >
                ⚠ {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Virtual Cyber Keypad */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            {/* Quick Numbers */}
            <div className="grid grid-cols-10 gap-1.5 mb-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
                <button
                  type="button"
                  key={digit}
                  onClick={() => handleKeypadPress(digit)}
                  className="py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-sky-600 text-sky-300 font-mono font-bold text-sm border border-slate-700 transition-colors cursor-pointer"
                >
                  {digit}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClear}
                className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono text-xs border border-slate-700 transition-colors cursor-pointer"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="flex-1 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono text-xs border border-slate-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Delete className="w-3.5 h-3.5" />
                <span>BACKSPACE</span>
              </button>
            </div>
          </div>

          {/* Submit Unlock Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-2xl font-cinematic font-bold text-lg tracking-widest shadow-lg flex items-center justify-center space-x-3 cursor-pointer transition-all duration-300 transform active:scale-98 ${
              isFinalChance
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:brightness-110'
                : 'bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 text-white shadow-[0_0_30px_rgba(2,132,199,0.4)] hover:brightness-110'
            }`}
          >
            {isSubmitting ? (
              <span className="font-mono">VERIFYING BIOMETRICS...</span>
            ) : (
              <>
                <Unlock className="w-6 h-6" />
                <span>UNLOCK FBI VAULT</span>
                <CornerDownLeft className="w-5 h-5 opacity-70" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
