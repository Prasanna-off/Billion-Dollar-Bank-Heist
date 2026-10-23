import { Challenge, Settings, DifficultyLevel } from '../types/game';
import { DEFAULT_CHALLENGES, DEFAULT_SETTINGS, DEFAULT_ADMIN_PIN, DIFFICULTY_CHALLENGES } from '../constants/challenges';

const KEYS = {
  CHALLENGES: 'bankHeistChallenges_v3',
  NEXT_CHALLENGE_INDEX: 'bankHeistNextChallenge',
  SETTINGS: 'bankHeistSettings',
  ADMIN_PIN: 'bankHeistAdminPin',
};

export const loadChallenges = (diff?: DifficultyLevel): Challenge[] => {
  try {
    const raw = localStorage.getItem(KEYS.CHALLENGES);
    if (!raw) return diff ? DIFFICULTY_CHALLENGES[diff] : DEFAULT_CHALLENGES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 3) {
      return parsed;
    }
    return diff ? DIFFICULTY_CHALLENGES[diff] : DEFAULT_CHALLENGES;
  } catch (err) {
    console.warn('Failed to load challenges from localStorage, using defaults:', err);
    return diff ? DIFFICULTY_CHALLENGES[diff] : DEFAULT_CHALLENGES;
  }
};

export const saveChallenges = (challenges: Challenge[]): boolean => {
  try {
    localStorage.setItem(KEYS.CHALLENGES, JSON.stringify(challenges));
    return true;
  } catch (err) {
    console.error('Failed to save challenges to localStorage:', err);
    return false;
  }
};

export const loadNextChallengeIndex = (): number => {
  try {
    const raw = localStorage.getItem(KEYS.NEXT_CHALLENGE_INDEX);
    if (raw === null) return 0;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 0 : (val % 3 + 3) % 3;
  } catch (err) {
    console.warn('Failed to load challenge index from localStorage, defaulting to 0:', err);
    return 0;
  }
};

export const saveNextChallengeIndex = (index: number): void => {
  try {
    const normalized = (index % 3 + 3) % 3;
    localStorage.setItem(KEYS.NEXT_CHALLENGE_INDEX, normalized.toString());
  } catch (err) {
    console.error('Failed to save challenge index to localStorage:', err);
  }
};

export const loadSettings = (): Settings => {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.warn('Failed to load settings, using defaults:', err);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
};

export const loadAdminPin = (): string => {
  try {
    const pin = localStorage.getItem(KEYS.ADMIN_PIN);
    return pin || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
};

export const saveAdminPin = (pin: string): void => {
  try {
    localStorage.setItem(KEYS.ADMIN_PIN, pin);
  } catch (err) {
    console.error('Failed to save admin PIN:', err);
  }
};

export const resetToDefaults = (diff: DifficultyLevel = 'EASY'): void => {
  try {
    localStorage.setItem(KEYS.CHALLENGES, JSON.stringify(DIFFICULTY_CHALLENGES[diff]));
    localStorage.setItem(KEYS.NEXT_CHALLENGE_INDEX, '0');
    localStorage.setItem(KEYS.ADMIN_PIN, DEFAULT_ADMIN_PIN);
  } catch (err) {
    console.error('Failed to reset data in localStorage:', err);
  }
};
