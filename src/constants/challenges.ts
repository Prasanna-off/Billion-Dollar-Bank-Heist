import { Challenge, Settings, DifficultyLevel } from '../types/game';

export const INITIAL_PRIZE = 1000000000;
export const SECOND_PRIZE = 500000000;
export const THIRD_PRIZE = 250000000;
export const LOSS_PRIZE = 0;

export const DIFFICULTY_CHALLENGES: Record<DifficultyLevel, Challenge[]> = {
  EASY: [
    {
      id: 1,
      word: 'TIGER',
      digits: '27',
      password: 'TIGER',
      doorClue: 'Enter Door Pin: Solve [3³ = 3 × 3 × 3 = ?]',
      clues: {
        clue1: 'National animal of India with fierce stripes.',
        clue2: 'Has 5 letters. Starts with "T", ends with "R".',
        clue3: 'Rhymes with "Bigger" and roars in the wild jungle.',
      },
    },
    {
      id: 2,
      word: 'ROCKET',
      digits: '42',
      password: 'ROCKET',
      doorClue: 'Enter Door Pin: Solve [6 × 7 = ?]',
      clues: {
        clue1: 'A high-speed spacecraft launched to orbit.',
        clue2: 'Has 6 letters. Burns roaring propulsion fuel.',
        clue3: 'Starts with "R", ends with "ET".',
      },
    },
    {
      id: 3,
      word: 'DRAGON',
      digits: '19',
      password: 'DRAGON',
      doorClue: 'Enter Door Pin: Solve [4² + 3 = 16 + 3 = ?]',
      clues: {
        clue1: 'Legendary mythical winged beast that breathes fire.',
        clue2: 'Has 6 letters. Has impenetrable scales and claws.',
        clue3: 'Starts with "D", ends with "ON".',
      },
    },
  ],
  MEDIUM: [
    {
      id: 1,
      word: 'DIAMOND',
      digits: '54',
      password: 'DIAMOND',
      doorClue: 'Enter Door Pin: Solve [6 × 9 = ?]',
      clues: {
        clue1: 'The hardest known natural mineral formed under extreme mantle pressure.',
        clue2: 'Has 7 letters. Starts with "D", ends with "D". A sparkling carbon allotrope.',
        clue3: 'A precious gemstone famously featured on wedding rings; "A girl\'s best friend".',
      },
    },
    {
      id: 2,
      word: 'THUNDER',
      digits: '36',
      password: 'THUNDER',
      doorClue: 'Enter Door Pin: Solve [6² = 6 × 6 = ?]',
      clues: {
        clue1: 'The explosive acoustic shockwave produced by rapid atmospheric heating.',
        clue2: 'Has 7 letters. Always heard moments after seeing lightning flash.',
        clue3: 'Starts with "TH", ends with "ER". Norse god Thor\'s roaring signature sound.',
      },
    },
    {
      id: 3,
      word: 'WATERFALL',
      digits: '63',
      password: 'WATERFALL',
      doorClue: 'Enter Door Pin: Solve [7 × 9 = ?]',
      clues: {
        clue1: 'A majestic cascading river dropping vertically over a steep mountain cliff.',
        clue2: 'Has 9 letters. Compound word of two common words: liquid + to drop.',
        clue3: 'Starts with "W", ends with "LL". World-famous examples include Niagara and Angel Falls.',
      },
    },
  ],
  HARD: [
    {
      id: 1,
      word: 'PHOENIX',
      digits: '64',
      password: 'PHOENIX',
      doorClue: 'Enter Door Pin: Solve [8² = 8 × 8 = ?]',
      clues: {
        clue1: 'Immortal mythical bird of fire destined to be reborn from its own ashes.',
        clue2: 'Has 7 letters. Starts with "PH", ends with "X". Contains the letter "O".',
        clue3: 'Ancient Greek and Egyptian legendary bird symbolizing eternal rebirth and resurrection.',
      },
    },
    {
      id: 2,
      word: 'BLACKHOLE',
      digits: '88',
      password: 'BLACKHOLE',
      doorClue: 'Enter Door Pin: Solve [(9 × 10) - 2 = 90 - 2 = ?]',
      clues: {
        clue1: 'A cosmic region of spacetime where gravitational acceleration traps even light.',
        clue2: 'Has 9 letters. Formed by collapsing supermassive stars; surrounded by an event horizon.',
        clue3: 'Starts with "B", ends with "E". An invisible cosmic singularity in deep space.',
      },
    },
    {
      id: 3,
      word: 'EARTHQUAKE',
      digits: '95',
      password: 'EARTHQUAKE',
      doorClue: 'Enter Door Pin: Solve [10² - 5 = 100 - 5 = ?]',
      clues: {
        clue1: 'Violent tectonic shockwaves caused by a sudden release of energy along geological faults.',
        clue2: 'Has 10 letters. Measured quantitatively on the logarithmic Richter / Moment Magnitude scale.',
        clue3: 'Starts with "E", ends with "E". Sudden trembling and shaking of the ground.',
      },
    },
  ],
};

export const DEFAULT_CHALLENGES: Challenge[] = DIFFICULTY_CHALLENGES.EASY;

export const DEFAULT_SETTINGS: Settings = {
  musicEnabled: true,
  sfxEnabled: true,
  masterVolume: 0.8,
  musicVolume: 0.7,
  sfxVolume: 0.9,
  graphicsQuality: 'HIGH',
  fullscreen: false,
  difficulty: 'EASY',
};

export const DEFAULT_ADMIN_PIN = '1234';

export const FORMAT_CURRENCY = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
