export type SceneType =
  | 'MAIN_MENU'
  | 'HOW_TO_PLAY'
  | 'BANK_EXTERIOR'
  | 'BANK_ENTRY'
  | 'BANK_INTERIOR'
  | 'SECURITY_CORRIDOR'
  | 'VAULT_ROOM'
  | 'PASSWORD_TERMINAL'
  | 'WIN_SEQUENCE'
  | 'LOSS_SEQUENCE'
  | 'RESULT_SCREEN'
  | 'ADMIN_LOGIN'
  | 'ADMIN_DASHBOARD'
  | 'SETTINGS';

export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface Challenge {
  id: number;
  word: string;
  digits: string;
  password: string; // for backward compatibility/preview
  doorClue: string; // Math expression or clue for the 2-digit entrance keypad
  clues: {
    clue1: string; // word category clue (Attempt 1)
    clue2: string; // word length/properties clue (Attempt 2)
    clue3: string; // word extra hint (Attempt 3)
  };
}

export type GraphicsQuality = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Settings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: GraphicsQuality;
  fullscreen: boolean;
  difficulty: DifficultyLevel;
}

export type GameStatus = 'IDLE' | 'PLAYING' | 'WIN' | 'LOSS' | 'PAUSED';

export interface GameState {
  currentScene: SceneType;
  currentChallengeIndex: number;
  currentAttempt: number; // 1, 2, or 3
  remainingChances: number; // 3, 2, 1, or 0
  currentPrize: number;
  gameStatus: GameStatus;
  adminAuthenticated: boolean;
  isPaused: boolean;
  selectedObject: string | null;
  notificationMessage: string | null;
  difficulty: DifficultyLevel;
  doorUnlocked: boolean;
}
