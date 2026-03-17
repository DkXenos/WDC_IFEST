"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useWindows } from "./WindowContext";
import { useTimer } from "./TimerContext";
import { FiX } from "react-icons/fi";

export default function ZenModeOverlay() {
  const { isZenMode, setIsZenMode } = useWindows();
  const { timeLeft, isActive, mode } = useTimer();
  const { textColor, mutedTextColor } = useChatTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatClockTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatClockDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimerTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isZenMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div 
            className="absolute inset-0 bg-transparent" 
            onClick={() => setIsZenMode(false)}
          />

          {/* Centered Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={() => setIsZenMode(false)}
            className="relative z-10 flex flex-col items-center justify-center p-12 rounded-[3rem] bg-white/5 dark:bg-black/20 border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.3)] cursor-pointer hover:scale-[1.02] active:scale-95 transition-all w-full max-w-lg group"
          >
            <div className="absolute top-6 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 group-hover:text-white/40 transition-colors">
              Click to Exit
            </div>

            <div className="text-center relative select-none">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className={`text-8xl font-black tracking-tighter leading-none ${textColor} drop-shadow-2xl`}>
                  {formatClockTime(time).split(" ")[0]}
                  <span className="text-2xl ml-2 opacity-50 uppercase tracking-widest align-baseline">
                    {formatClockTime(time).split(" ")[1]}
                  </span>
                </h1>
                <p className={`text-sm font-bold tracking-[0.3em] uppercase mt-2 ${mutedTextColor} opacity-60`}>
                  {formatClockDate(time)}
                </p>
              </motion.div>

              <AnimatePresence>
                {(isActive || timeLeft > 0) && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex flex-col items-center"
                  >
                    <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${mutedTextColor} mb-1 block`}>
                        {mode}
                      </span>
                      <div className={`text-5xl font-black tabular-nums ${isActive ? 'text-emerald-500' : 'opacity-40'}`}>
                        {formatTimerTime(timeLeft)}
                      </div>
                    </div>
                    {isActive && (
                      <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-3 flex items-center gap-1.5"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Flowing</span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
