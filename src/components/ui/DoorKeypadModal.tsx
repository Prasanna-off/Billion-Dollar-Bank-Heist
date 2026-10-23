import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, Calculator, X, Delete, CornerDownLeft } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface DoorKeypadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoorKeypadModal: React.FC<DoorKeypadModalProps> = ({ isOpen, onClose }) => {
  const { currentChallenge, unlockDoor } = useGame();
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Clear PIN whenever modal is opened or closed
  React.useEffect(() => {
    if (!isOpen) {
      setPin('');
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyPress = (num: string) => {
    audioManager.playSfx('hover');
    if (pin.length < 4) {
      setPin((prev) => prev + num);
      setErrorMsg(null);
    }
  };

  const handleBackspace = () => {
    audioManager.playSfx('hover');
    setPin((prev) => prev.slice(0, -1));
    setErrorMsg(null);
  };

  const handleClear = () => {
    audioManager.playSfx('hover');
    setPin('');
    setErrorMsg(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin.trim()) {
      setErrorMsg('PLEASE ENTER 2-DIGIT PIN');
      audioManager.playSfx('denied');
      return;
    }

    const res = unlockDoor(pin);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm sm:max-w-md bg-slate-950 border-2 border-sky-400/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 shadow-[0_0_50px_rgba(2,132,199,0.4)] text-white relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 sm:pb-3 border-b border-sky-500/30">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-sky-500/20 text-sky-400">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-cinematic font-bold text-white tracking-wide">
                ENTRANCE KEYPAD
              </h3>
              <p className="text-[9px] sm:text-xs font-mono text-gray-400">FBI Outer Access Security</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-white rounded-lg sm:rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Door Math Clue */}
        <div className="my-3 sm:my-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-sky-950/60 border border-sky-400/40 shadow-inner">
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-xs font-mono font-bold text-sky-400 uppercase tracking-wider mb-1">
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
            <span>DOOR SECURITY CLUE</span>
          </div>
          <p className="text-xs sm:text-sm md:text-base font-mono text-yellow-300 font-bold leading-relaxed">
            {currentChallenge.doorClue}
          </p>
        </div>

        {/* PIN Display */}
        <div className="my-2 sm:my-3 py-2 sm:py-3 px-3 sm:px-4 bg-black/80 rounded-xl sm:rounded-2xl border-2 border-sky-500/40 text-center">
          <span className="text-[9px] sm:text-xs font-mono text-gray-400 block mb-1">ENTER 2-DIGIT PIN</span>
          <div className="text-2xl sm:text-3xl font-mono font-black tracking-[0.5em] text-sky-300 h-8 sm:h-10 flex items-center justify-center">
            {pin ? pin : <span className="text-gray-600 tracking-normal font-normal text-sm sm:text-base">_ _</span>}
          </div>
        </div>

        {/* Error Feedback */}
        <AnimatePresence>
          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] sm:text-xs font-mono text-red-400 text-center bg-red-950/50 border border-red-500/40 py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg sm:rounded-xl mb-2 sm:mb-3"
            >
              ⚠ {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-2 sm:my-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyPress(digit)}
              className="py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-sky-600 text-sky-200 font-mono text-base sm:text-lg font-bold border border-slate-800 shadow transition-colors cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleClear}
            className="py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-400 font-mono text-[10px] sm:text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
          >
            CLEAR
          </button>
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-sky-600 text-sky-200 font-mono text-base sm:text-lg font-bold border border-slate-800 shadow transition-colors cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            className="py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900 hover:bg-slate-800 text-gray-400 font-mono text-xs font-bold border border-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full mt-2 py-3 sm:py-3.5 bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 hover:from-sky-400 hover:to-blue-500 text-white font-cinematic font-bold rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(2,132,199,0.4)] flex items-center justify-center space-x-2 transition-all cursor-pointer text-sm sm:text-base"
        >
          <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>AUTHENTICATE & OPEN</span>
        </button>
      </motion.div>
    </div>
  );
};
