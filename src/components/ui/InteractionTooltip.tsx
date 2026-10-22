import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Key, Shield, DoorOpen } from 'lucide-react';
import { useGame } from '../../state/GameContext';
import { audioManager } from '../../audio/AudioManager';

export const InteractionTooltip: React.FC = () => {
  const { currentScene, setScene } = useGame();

  const getActionConfig = () => {
    switch (currentScene) {
      case 'BANK_EXTERIOR':
        return {
          title: 'ENTER NEXUS BANK',
          subtitle: 'Press [E] or Click to slide open glass doors',
          icon: DoorOpen,
          action: () => {
            audioManager.playSfx('door');
            setScene('BANK_ENTRY');
            setTimeout(() => {
              setScene('BANK_INTERIOR');
            }, 1200);
          },
        };
      case 'BANK_INTERIOR':
        return {
          title: 'PROCEED TO SECURITY CORRIDOR',
          subtitle: 'Press [E] or Click to breach inner sector',
          icon: Shield,
          action: () => {
            audioManager.playSfx('footstep');
            setScene('SECURITY_CORRIDOR');
          },
        };
      case 'SECURITY_CORRIDOR':
        return {
          title: 'APPROACH VAULT SANCTUM',
          subtitle: 'Press [E] or Click to reach central vault chamber',
          icon: ArrowRight,
          action: () => {
            audioManager.playSfx('footstep');
            setScene('VAULT_ROOM');
          },
        };
      case 'VAULT_ROOM':
        return {
          title: 'ACCESS LOCK TERMINAL',
          subtitle: 'Press [E] or Click to start code decryption',
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
      className="mb-4"
    >
      <button
        onClick={config.action}
        onMouseEnter={() => audioManager.playSfx('hover')}
        className="group px-6 py-3.5 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 hover:from-cyan-950 hover:to-slate-900 border border-cyan-500/50 hover:border-cyan-400 rounded-2xl shadow-[0_0_25px_rgba(0,229,255,0.3)] backdrop-blur-md flex items-center space-x-4 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="text-sm font-cinematic font-bold text-white tracking-wider group-hover:text-cyan-300">
            {config.title}
          </div>
          <div className="text-xs font-mono text-gray-400 group-hover:text-gray-300">
            {config.subtitle}
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-cyan-400 ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};
