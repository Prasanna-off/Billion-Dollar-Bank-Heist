import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SceneType, Challenge, Settings, GameStatus } from '../types/game';
import {
  INITIAL_PRIZE,
  SECOND_PRIZE,
  THIRD_PRIZE,
  LOSS_PRIZE,
} from '../constants/challenges';
import {
  loadChallenges,
  saveChallenges,
  loadNextChallengeIndex,
  saveNextChallengeIndex,
  loadSettings,
  saveSettings,
  loadAdminPin,
  saveAdminPin,
  resetToDefaults,
} from '../utils/storage';
import { audioManager } from '../audio/AudioManager';

interface GameContextType {
  // Navigation & Scene
  currentScene: SceneType;
  setScene: (scene: SceneType) => void;
  gameStatus: GameStatus;

  // Challenge & Game Progression
  challenges: Challenge[];
  currentChallengeIndex: number;
  currentChallenge: Challenge;
  currentAttempt: number;
  remainingChances: number;
  currentPrize: number;
  currentClue: string;

  // Actions
  startHeist: () => void;
  submitPassword: (input: string) => { success: boolean; message: string };
  restartGame: (advanceChallenge?: boolean) => void;
  resetCurrentHeist: () => void;

  // Admin
  adminPin: string;
  adminAuthenticated: boolean;
  setAdminAuthenticated: (auth: boolean) => void;
  updateChallenges: (newChallenges: Challenge[]) => boolean;
  updateAdminPin: (newPin: string) => void;
  restoreDefaults: () => void;
  resetGameProgress: () => void;

  // Settings
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  toggleFullscreen: () => void;

  // Interactive state
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  notification: string | null;
  showNotification: (msg: string, durationMs?: number) => void;
  lastAttemptSuccess: boolean | null;
  isSubmitting: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(loadChallenges);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(loadNextChallengeIndex);
  const [settings, setSettingsState] = useState<Settings>(loadSettings);
  const [adminPin, setAdminPinState] = useState<string>(loadAdminPin);
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(false);

  const [currentScene, setCurrentSceneState] = useState<SceneType>('MAIN_MENU');
  const [gameStatus, setGameStatus] = useState<GameStatus>('IDLE');
  const [currentAttempt, setCurrentAttempt] = useState<number>(1);
  const [remainingChances, setRemainingChances] = useState<number>(3);
  const [currentPrize, setCurrentPrize] = useState<number>(INITIAL_PRIZE);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [lastAttemptSuccess, setLastAttemptSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize audio settings
  useEffect(() => {
    audioManager.init(settings);
  }, []);

  // Update audio when settings change
  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettingsState(updated);
    saveSettings(updated);
    audioManager.updateSettings(updated);
  };

  // Fullscreen helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        updateSettings({ fullscreen: true });
      }).catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          updateSettings({ fullscreen: false });
        }).catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setSettingsState((prev) => ({
        ...prev,
        fullscreen: !!document.fullscreenElement,
      }));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Current Challenge Calculation
  const safeIndex = (currentChallengeIndex % challenges.length + challenges.length) % challenges.length;
  const currentChallenge = challenges[safeIndex] || challenges[0];

  // Current Clue based on attempt
  const currentClue =
    currentAttempt === 1
      ? currentChallenge.clues.clue1
      : currentAttempt === 2
      ? currentChallenge.clues.clue2
      : currentChallenge.clues.clue3;

  // Scene setter with audio triggers
  const setScene = (scene: SceneType) => {
    setCurrentSceneState(scene);

    switch (scene) {
      case 'MAIN_MENU':
      case 'HOW_TO_PLAY':
        audioManager.playBgm('MENU_BGM');
        break;
      case 'BANK_EXTERIOR':
      case 'BANK_ENTRY':
      case 'BANK_INTERIOR':
        audioManager.playBgm('BANK_BGM');
        break;
      case 'SECURITY_CORRIDOR':
        audioManager.playBgm('SECURITY_BGM');
        break;
      case 'VAULT_ROOM':
        audioManager.playBgm('VAULT_BGM');
        break;
      case 'PASSWORD_TERMINAL':
        if (remainingChances === 1) {
          audioManager.playBgm('TENSION_BGM');
        } else {
          audioManager.playBgm('VAULT_BGM');
        }
        break;
      case 'WIN_SEQUENCE':
        audioManager.playBgm('WIN_BGM');
        break;
      case 'LOSS_SEQUENCE':
        audioManager.playBgm('LOSS_BGM');
        break;
      default:
        break;
    }
  };

  // Keyboard navigation / ESC pause listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (
          currentScene !== 'MAIN_MENU' &&
          currentScene !== 'HOW_TO_PLAY' &&
          currentScene !== 'ADMIN_LOGIN' &&
          currentScene !== 'ADMIN_DASHBOARD' &&
          currentScene !== 'SETTINGS' &&
          currentScene !== 'WIN_SEQUENCE' &&
          currentScene !== 'LOSS_SEQUENCE' &&
          currentScene !== 'RESULT_SCREEN'
        ) {
          setIsPaused((prev) => !prev);
          audioManager.playSfx('click');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  // Show Toast / Notification
  const showNotification = (msg: string, durationMs: number = 3000) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, durationMs);
  };

  // Start a new heist
  const startHeist = () => {
    setCurrentAttempt(1);
    setRemainingChances(3);
    setCurrentPrize(INITIAL_PRIZE);
    setGameStatus('PLAYING');
    setIsPaused(false);
    setLastAttemptSuccess(null);
    setScene('BANK_EXTERIOR');
    audioManager.playSfx('click');
    showNotification('MISSION OBJECTIVE: Infiltrate the bank and crack the vault code.');
  };

  // Reset current heist without advancing rotation (used when player restarts mid-game)
  const resetCurrentHeist = () => {
    setCurrentAttempt(1);
    setRemainingChances(3);
    setCurrentPrize(INITIAL_PRIZE);
    setGameStatus('PLAYING');
    setIsPaused(false);
    setLastAttemptSuccess(null);
    setScene('BANK_EXTERIOR');
    audioManager.playSfx('click');
  };

  // Restart game after completion (advances rotation 1 -> 2 -> 3 -> 1)
  const restartGame = (advanceChallenge: boolean = true) => {
    if (advanceChallenge) {
      const nextIdx = (currentChallengeIndex + 1) % challenges.length;
      setCurrentChallengeIndex(nextIdx);
      saveNextChallengeIndex(nextIdx);
    }
    setCurrentAttempt(1);
    setRemainingChances(3);
    setCurrentPrize(INITIAL_PRIZE);
    setGameStatus('PLAYING');
    setIsPaused(false);
    setLastAttemptSuccess(null);
    setScene('BANK_EXTERIOR');
    audioManager.playSfx('click');
    showNotification(`HEIST INITIATED: Challenge ${(currentChallengeIndex + (advanceChallenge ? 1 : 0)) % 3 + 1}`);
  };

  // Submit password attempt
  const submitPassword = (input: string): { success: boolean; message: string } => {
    if (isSubmitting || gameStatus !== 'PLAYING' || remainingChances <= 0) {
      return { success: false, message: 'Terminal unavailable.' };
    }

    const trimmed = input.trim().toUpperCase();
    if (!trimmed) {
      audioManager.playSfx('denied');
      return { success: false, message: 'PLEASE ENTER A PASSWORD' };
    }

    setIsSubmitting(true);
    const targetPassword = currentChallenge.password.trim().toUpperCase();

    if (trimmed === targetPassword) {
      // WINNER!
      setLastAttemptSuccess(true);
      setGameStatus('WIN');
      audioManager.playSfx('granted');
      showNotification('ACCESS GRANTED! INITIATING VAULT EXTRACTION...');

      setTimeout(() => {
        setIsSubmitting(false);
        setScene('WIN_SEQUENCE');
      }, 1000);

      return { success: true, message: 'ACCESS GRANTED' };
    } else {
      // WRONG PASSWORD
      setLastAttemptSuccess(false);
      audioManager.playSfx('denied');

      const nextAttempt = currentAttempt + 1;
      const nextChances = remainingChances - 1;

      if (nextChances <= 0 || nextAttempt > 3) {
        // Complete Loss on attempt 3
        setCurrentAttempt(3);
        setRemainingChances(0);
        setCurrentPrize(LOSS_PRIZE);
        setGameStatus('LOSS');
        showNotification('SECURITY BREACH DETECTED! INITIATING LOCKDOWN...');

        setTimeout(() => {
          setIsSubmitting(false);
          setScene('LOSS_SEQUENCE');
        }, 1200);

        return { success: false, message: 'ACCESS DENIED — ALL CHANCES DEPLETED' };
      } else {
        // Attempt 1 or 2 failed
        setCurrentAttempt(nextAttempt);
        setRemainingChances(nextChances);

        let newPrize = INITIAL_PRIZE;
        if (nextAttempt === 2) {
          newPrize = SECOND_PRIZE;
        } else if (nextAttempt === 3) {
          newPrize = THIRD_PRIZE;
          audioManager.playBgm('TENSION_BGM');
        }
        setCurrentPrize(newPrize);

        setTimeout(() => {
          setIsSubmitting(false);
          setLastAttemptSuccess(null);
        }, 1200);

        return {
          success: false,
          message: `ACCESS DENIED — ${nextChances} CHANCE${nextChances > 1 ? 'S' : ''} REMAINING`,
        };
      }
    }
  };

  // Admin management
  const updateChallenges = (newChallenges: Challenge[]): boolean => {
    if (newChallenges.length !== 3) return false;
    setChallenges(newChallenges);
    return saveChallenges(newChallenges);
  };

  const updateAdminPin = (newPin: string) => {
    setAdminPinState(newPin);
    saveAdminPin(newPin);
  };

  const restoreDefaults = () => {
    resetToDefaults();
    setChallenges(loadChallenges());
    setCurrentChallengeIndex(0);
    setAdminPinState(loadAdminPin());
    showNotification('Challenge configuration restored to defaults.');
  };

  const resetGameProgress = () => {
    setCurrentChallengeIndex(0);
    saveNextChallengeIndex(0);
    showNotification('Challenge rotation reset to Challenge 1.');
  };

  return (
    <GameContext.Provider
      value={{
        currentScene,
        setScene,
        gameStatus,
        challenges,
        currentChallengeIndex,
        currentChallenge,
        currentAttempt,
        remainingChances,
        currentPrize,
        currentClue,
        startHeist,
        submitPassword,
        restartGame,
        resetCurrentHeist,
        adminPin,
        adminAuthenticated,
        setAdminAuthenticated,
        updateChallenges,
        updateAdminPin,
        restoreDefaults,
        resetGameProgress,
        settings,
        updateSettings,
        toggleFullscreen,
        isPaused,
        setIsPaused,
        notification,
        showNotification,
        lastAttemptSuccess,
        isSubmitting,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
