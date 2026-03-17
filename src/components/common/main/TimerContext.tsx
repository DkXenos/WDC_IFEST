"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export type TimerMode = "Focus" | "Short Break" | "Long Break";

export const MODE_TIMES: Record<TimerMode, number> = {
  "Focus": 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60
};

type TimerContextType = {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  changeMode: (newMode: TimerMode) => void;
};

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<TimerMode>("Focus");
  const [timeLeft, setTimeLeft] = useState(MODE_TIMES["Focus"]);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODE_TIMES[mode]);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODE_TIMES[newMode]);
  };

  return (
    <TimerContext.Provider value={{
      mode,
      timeLeft,
      isActive,
      toggleTimer,
      resetTimer,
      changeMode
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within TimerProvider");
  return context;
};
