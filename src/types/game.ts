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

export interface Challenge {
  id: number;
  word: string;
  digits: string;
  password: string;
  clues: {
    clue1: string;
    clue2: string;
    clue3: string;
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
}

export type GameStatus = 'IDLE' | 'PLAYING' | 'WIN' | 'LOSS' | 'PAUSED';

export interface GameState {
  currentScene: SceneType;
  currentChallengeIndex: number;
  currentAttempt: number; // 1, 2, or 3
  remainingChances: number; // 3, 2, 1, or 0
  currentPrize: number; // 1,000,000,000 -> 500,000,000 -> 250,000,000 -> 0
  gameStatus: GameStatus;
  adminAuthenticated: boolean;
  isPaused: boolean;
  selectedObject: string | null;
  notificationMessage: string | null;
}
