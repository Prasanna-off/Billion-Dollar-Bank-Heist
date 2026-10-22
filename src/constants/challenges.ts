import { Challenge, Settings } from '../types/game';

export const INITIAL_PRIZE = 1000000000;
export const SECOND_PRIZE = 500000000;
export const THIRD_PRIZE = 250000000;
export const LOSS_PRIZE = 0;

export const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: 1,
    word: 'TIGER',
    digits: '27',
    password: 'TIGER27',
    clues: {
      clue1: 'My word is a ferocious predator and the majestic national animal of India.',
      clue2: 'My word has exactly five letters (Starts with T, ends with R).',
      clue3: 'Math Clue for 2 Digits: Solve the cube of 3: [3³ = 3 × 3 × 3 = ?].',
    },
  },
  {
    id: 2,
    word: 'ROCKET',
    digits: '42',
    password: 'ROCKET42',
    clues: {
      clue1: 'My word is a powerful aerospace vehicle launched beyond Earth into orbit.',
      clue2: 'My word has six letters and burns roaring propulsion fuel.',
      clue3: 'Math Clue for 2 Digits: Solve the multiplication: [6 × 7 = ?].',
    },
  },
  {
    id: 3,
    word: 'DRAGON',
    digits: '19',
    password: 'DRAGON19',
    clues: {
      clue1: 'My word is an ancient legendary winged beast that breathes scorching fire.',
      clue2: 'My word has six letters and impenetrable scales.',
      clue3: 'Math Clue for 2 Digits: Solve the expression: [4² + 3 = (16 + 3) = ?].',
    },
  },
];

export const DEFAULT_SETTINGS: Settings = {
  musicEnabled: true,
  sfxEnabled: true,
  masterVolume: 0.8,
  musicVolume: 0.7,
  sfxVolume: 0.9,
  graphicsQuality: 'HIGH',
  fullscreen: false,
};

export const DEFAULT_ADMIN_PIN = '1234';

export const FORMAT_CURRENCY = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
