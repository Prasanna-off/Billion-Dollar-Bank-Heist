import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Save, RotateCcw, AlertTriangle, ArrowLeft, Key, CheckCircle, RefreshCw } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { Challenge } from '../../types/game';
import { audioManager } from '../../audio/AudioManager';

export const AdminModal: React.FC = () => {
  const {
    currentScene,
    setScene,
    adminPin,
    adminAuthenticated,
    setAdminAuthenticated,
    challenges,
    updateChallenges,
    updateAdminPin,
    restoreDefaults,
    resetGameProgress,
    showNotification,
  } = useGame();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Challenge 1, 1 = Challenge 2, 2 = Challenge 3
  const [editableChallenges, setEditableChallenges] = useState<Challenge[]>(JSON.parse(JSON.stringify(challenges)));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [newPinVal, setNewPinVal] = useState('');

  const isAdminScene = currentScene === 'ADMIN_LOGIN' || currentScene === 'ADMIN_DASHBOARD';
  if (!isAdminScene) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin) {
      setAdminAuthenticated(true);
      setPinError(null);
      setPinInput('');
      audioManager.playSfx('granted');
      setScene('ADMIN_DASHBOARD');
    } else {
      audioManager.playSfx('denied');
      setPinError('INVALID ADMIN PIN. (Default: 1234)');
    }
  };

  const handleFieldChange = (challengeIdx: number, field: string, value: string) => {
    setEditableChallenges((prev) => {
      const copy = [...prev];
      const target = { ...copy[challengeIdx] };

      if (field === 'word') {
        const cleanWord = value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        target.word = cleanWord;
        target.password = `${cleanWord}${target.digits}`;
      } else if (field === 'digits') {
        const cleanDigits = value.replace(/[^0-9]/g, '').slice(0, 2);
        target.digits = cleanDigits;
        target.password = `${target.word}${cleanDigits}`;
      } else if (field.startsWith('clue')) {
        target.clues = {
          ...target.clues,
          [field]: value,
        };
      }

      copy[challengeIdx] = target;
      return copy;
    });
    setValidationError(null);
  };

  const handleSaveChallenges = () => {
    // Validate all 3 challenges
    for (let i = 0; i < editableChallenges.length; i++) {
      const c = editableChallenges[i];
      if (!c.word || c.word.trim().length < 2) {
        setValidationError(`Challenge ${i + 1}: Word must contain at least 2 letters.`);
        audioManager.playSfx('denied');
        return;
      }
      if (!c.digits || c.digits.length !== 2) {
        setValidationError(`Challenge ${i + 1}: Digits must contain exactly 2 numbers (e.g. 27).`);
        audioManager.playSfx('denied');
        return;
      }
      if (!c.clues.clue1.trim() || !c.clues.clue2.trim() || !c.clues.clue3.trim()) {
        setValidationError(`Challenge ${i + 1}: All 3 clues must be filled.`);
        audioManager.playSfx('denied');
        return;
      }
    }

    const ok = updateChallenges(editableChallenges);
    if (ok) {
      audioManager.playSfx('granted');
      showNotification('All 3 Challenges successfully saved to LocalStorage!');
      setValidationError(null);
    } else {
      setValidationError('Failed to save challenges.');
    }
  };

  const handleConfirmReset = () => {
    restoreDefaults();
    setEditableChallenges(JSON.parse(JSON.stringify(challenges)));
    setShowResetConfirm(false);
    audioManager.playSfx('click');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinVal.trim().length >= 4) {
      updateAdminPin(newPinVal.trim());
      setNewPinVal('');
      audioManager.playSfx('granted');
      showNotification('Admin PIN successfully updated!');
    } else {
      audioManager.playSfx('denied');
      showNotification('PIN must be at least 4 digits.', 3000);
    }
  };

  const handleBack = () => {
    audioManager.playSfx('click');
    setScene('MAIN_MENU');
  };

  // If not authenticated, show PIN Screen
  if (!adminAuthenticated || currentScene === 'ADMIN_LOGIN') {
    return (
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-yellow-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(234,179,8,0.3)] text-white"
        >
          <div className="flex items-center justify-between pb-3 border-b border-yellow-500/20 mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-cinematic font-bold text-yellow-400">ADMIN ACCESS</h2>
                <p className="text-xs font-mono text-gray-400">Exhibition Control Gateway</p>
              </div>
            </div>
            <button
              onClick={handleBack}
              className="p-2 text-gray-400 hover:text-white rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
                Enter Admin PIN
              </label>
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                autoFocus
                className="w-full bg-black/70 border border-yellow-500/50 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-[0.5em] text-yellow-300 focus:outline-none focus:border-yellow-400"
              />
            </div>

            {pinError && (
              <p className="text-xs font-mono text-red-400 text-center bg-red-950/40 border border-red-500/30 py-2 px-3 rounded-lg">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-cinematic font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] cursor-pointer"
            >
              AUTHENTICATE
            </button>

            <div className="text-center text-[11px] font-mono text-gray-500">
              Default Exhibition PIN: <span className="text-yellow-400 font-bold">1234</span>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard UI
  const currentCh = editableChallenges[activeTab];

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-slate-950 border-2 border-yellow-500/40 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(234,179,8,0.25)] text-white my-auto max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-yellow-500/20">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinematic font-bold text-yellow-400">
                ADMIN HEIST CONTROL PANEL
              </h2>
              <p className="text-xs font-mono text-gray-400">
                Configure Vault Passwords, Clues, and Challenge Rotations
              </p>
            </div>
          </div>

          <button
            onClick={handleBack}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 hover:text-white rounded-xl text-xs font-mono cursor-pointer flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>EXIT ADMIN</span>
          </button>
        </div>

        {/* Challenge Selector Tabs */}
        <div className="flex gap-2 my-5 border-b border-slate-800 pb-3">
          {[0, 1, 2].map((idx) => {
            const ch = editableChallenges[idx];
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(idx);
                  audioManager.playSfx('click');
                }}
                className={`flex-1 py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold border transition-all cursor-pointer text-left ${
                  activeTab === idx
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="block text-[10px] text-gray-500">ROTATION SLOT {idx + 1}</span>
                <span className="font-cinematic text-white">{ch.password || `CHALLENGE ${idx + 1}`}</span>
              </button>
            );
          })}
        </div>

        {/* Challenge Editor Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Word */}
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5 uppercase tracking-wider">
                Recognizable Word (Letters Only)
              </label>
              <input
                type="text"
                value={currentCh.word}
                onChange={(e) => handleFieldChange(activeTab, 'word', e.target.value)}
                placeholder="TIGER"
                className="w-full bg-black/70 border border-slate-700 focus:border-yellow-400 rounded-xl px-4 py-2.5 font-mono text-base font-bold text-yellow-300 uppercase"
              />
            </div>

            {/* Digits */}
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5 uppercase tracking-wider">
                Two Digits (Exactly 2 Numbers)
              </label>
              <input
                type="text"
                maxLength={2}
                value={currentCh.digits}
                onChange={(e) => handleFieldChange(activeTab, 'digits', e.target.value)}
                placeholder="27"
                className="w-full bg-black/70 border border-slate-700 focus:border-yellow-400 rounded-xl px-4 py-2.5 font-mono text-base font-bold text-yellow-300 text-center"
              />
            </div>

            {/* Generated Password Preview */}
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-1.5 uppercase tracking-wider">
                Full Password Preview
              </label>
              <div className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl px-4 py-2.5 font-mono text-base font-bold text-cyan-400 tracking-wider text-center">
                {currentCh.password || '—'}
              </div>
            </div>
          </div>

          {/* Clues */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-mono text-cyan-400 mb-1 font-bold">
                CLUE 1 (Shown on Attempt 1 — 3 Chances / ₹1B):
              </label>
              <input
                type="text"
                value={currentCh.clues.clue1}
                onChange={(e) => handleFieldChange(activeTab, 'clue1', e.target.value)}
                placeholder="Describe word category/subject without revealing full name..."
                className="w-full bg-black/70 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-yellow-400 mb-1 font-bold">
                CLUE 2 (Shown on Attempt 2 — 2 Chances / ₹500M):
              </label>
              <input
                type="text"
                value={currentCh.clues.clue2}
                onChange={(e) => handleFieldChange(activeTab, 'clue2', e.target.value)}
                placeholder="Specify letter length or characteristics..."
                className="w-full bg-black/70 border border-slate-700 focus:border-yellow-400 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-200"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-red-400 mb-1 font-bold">
                CLUE 3 (Shown on Attempt 3 — 1 Final Chance / ₹250M):
              </label>
              <input
                type="text"
                value={currentCh.clues.clue3}
                onChange={(e) => handleFieldChange(activeTab, 'clue3', e.target.value)}
                placeholder="Specify the two digits or ending..."
                className="w-full bg-black/70 border border-slate-700 focus:border-red-400 rounded-xl px-4 py-2.5 font-mono text-sm text-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Validation Error */}
        {validationError && (
          <div className="mt-4 p-3 bg-red-950/60 border border-red-500 rounded-xl text-xs font-mono text-red-300 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Controls Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-red-950/60 border border-red-500/30 text-red-400 rounded-xl font-mono text-xs cursor-pointer flex items-center space-x-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DEFAULTS</span>
            </button>

            <button
              onClick={() => {
                resetGameProgress();
                audioManager.playSfx('click');
              }}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-400 rounded-xl font-mono text-xs cursor-pointer flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET ROTATION TO #1</span>
            </button>
          </div>

          <button
            onClick={handleSaveChallenges}
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-cinematic font-bold rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center space-x-2 cursor-pointer transition-all transform hover:scale-102"
          >
            <Save className="w-4 h-4" />
            <span>SAVE ALL CHALLENGES</span>
          </button>
        </div>

        {/* Change PIN Accordion */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <form onSubmit={handleChangePin} className="flex items-center gap-3 w-full max-w-sm">
            <input
              type="password"
              value={newPinVal}
              onChange={(e) => setNewPinVal(e.target.value)}
              placeholder="NEW ADMIN PIN"
              maxLength={8}
              className="flex-1 bg-black/70 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs text-yellow-300"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl text-xs font-mono text-yellow-400 cursor-pointer"
            >
              UPDATE PIN
            </button>
          </form>
          <span className="text-[11px] font-mono text-gray-500">
            Changes survive browser reloads via LocalStorage.
          </span>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border-2 border-red-500 rounded-2xl p-6 text-center text-white">
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3 animate-bounce" />
              <h3 className="text-lg font-cinematic font-bold text-red-400">RESTORE DEFAULT CHALLENGES?</h3>
              <p className="text-xs font-mono text-gray-300 mt-2">
                This will overwrite any customized words, digits, and clues with default TIGER27, ROCKET42, and DRAGON19.
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={handleConfirmReset}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs rounded-xl cursor-pointer"
                >
                  YES, RESTORE DEFAULTS
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-300 font-mono text-xs rounded-xl cursor-pointer"
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
