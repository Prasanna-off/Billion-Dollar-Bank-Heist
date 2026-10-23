import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Key, Shield, DoorOpen, Calculator } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface InteractionTooltipProps {
  onOpenDoorKeypad?: () => void;
}

export const InteractionTooltip: React.FC<InteractionTooltipProps> = ({ onOpenDoorKeypad }) => {
  const { currentScene, setScene, doorUnlocked } = useGame();

  const getActionConfig = () => {
    switch (currentScene) {
      case 'BANK_EXTERIOR':
        if (!doorUnlocked) {
          return {
            title: 'ENTER ENTRANCE PIN',
            subtitle: 'Tap or Press [E] to solve Door Math Keypad',
            icon: Calculator,
            action: () => {
              if (onOpenDoorKeypad) {
                onOpenDoorKeypad();
              }
            },
          };
        } else {
          return {
            title: 'ENTER FBI BANK LOBBY',
            subtitle: 'Door Unlocked! Tap or Press [E] to enter',
            icon: DoorOpen,
            action: () => {
              audioManager.playSfx('door');
              setScene('BANK_ENTRY');
              setTimeout(() => {
                setScene('BANK_INTERIOR');
              }, 1200);
            },
          };
        }
      case 'BANK_INTERIOR':
        return {
          title: 'PROCEED TO CORRIDOR',
          subtitle: 'Tap or Press [E] to breach inner security',
          icon: Shield,
          action: () => {
            audioManager.playSfx('footstep');
            setScene('SECURITY_CORRIDOR');
          },
        };
      case 'SECURITY_CORRIDOR':
        return {
          title: 'APPROACH VAULT',
          subtitle: 'Tap or Press [E] to reach vault chamber',
          icon: ArrowRight,
          action: () => {
            audioManager.playSfx('footstep');
            setScene('VAULT_ROOM');
          },
        };
      case 'VAULT_ROOM':
        return {
          title: 'ACCESS VAULT TERMINAL',
          subtitle: 'Tap or Press [E] to decrypt Vault Word',
          icon: Key,
          action: () => {
            audioManager.playSfx('click');
            setScene('PASSWORD_TERMINAL');
          },
        };
      default:
        return null;
    }
  };

  const config = getActionConfig();
  if (!config) return null;

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-2 sm:mb-4 w-full max-w-[90vw] sm:max-w-none sm:w-auto flex justify-center"
    >
      <button
        onClick={config.action}
        onMouseEnter={() => audioManager.playSfx('hover')}
        className="group w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 hover:from-sky-950 hover:to-slate-900 border border-sky-400/50 hover:border-sky-400 rounded-xl sm:rounded-2xl shadow-[0_0_25px_rgba(2,132,199,0.3)] backdrop-blur-md flex items-center space-x-2.5 sm:space-x-4 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-sky-500/20 text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-colors flex-shrink-0">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="text-left min-w-0">
          <div className="text-xs sm:text-sm font-cinematic font-bold text-white tracking-wider group-hover:text-sky-300 truncate">
            {config.title}
          </div>
          <div className="text-[9px] sm:text-xs font-mono text-gray-400 group-hover:text-gray-300 truncate">
            {config.subtitle}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </button>
    </motion.div>
  );
};
