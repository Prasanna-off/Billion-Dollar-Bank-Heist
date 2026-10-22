import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, ShieldAlert } from 'lucide-react';
import { useGame } from '../../state/GameContext';

export const CinematicNotification: React.FC = () => {
  const { notification } = useGame();

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-full max-w-lg px-4">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-black/90 border border-cyan-500/60 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,229,255,0.3)] backdrop-blur-md flex items-center space-x-3 text-white"
          >
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-mono text-cyan-200 tracking-wide font-medium leading-tight">
              {notification}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
