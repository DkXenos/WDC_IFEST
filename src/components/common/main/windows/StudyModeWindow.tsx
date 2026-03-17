"use client";

import React, { useState, useEffect, useRef } from "react";
import Window from "../Window";
import { FiClock, FiPlay, FiPause, FiRefreshCw, FiMusic, FiSkipForward } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useTimer, MODE_TIMES, TimerMode } from "../TimerContext";

export default function StudyModeWindow() {
  const { textColor, mutedTextColor, borderColor, hoverBg, panelBg } = useChatTheme();
  const { mode, timeLeft, isActive, toggleTimer, resetTimer, changeMode } = useTimer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Window 
      id="timer" 
      title="Focus Space" 
      icon={<FiClock size={18} />}
      width="450px"
      height="400px"
    >
      <div className="flex flex-col h-full items-center justify-between p-8 bg-neutral-900/10">
        {/* Mode Selector */}
        <div className={`inline-flex p-1 rounded-2xl ${panelBg} border ${borderColor} shadow-inner`}>
          {(Object.keys(MODE_TIMES) as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                mode === m 
                  ? "bg-emerald-500 text-white shadow-lg" 
                  : `${mutedTextColor} hover:${textColor} hover:${hoverBg}`
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="relative flex flex-col items-center">
          <div className="text-[72px] font-black tracking-tighter tabular-nums drop-shadow-xl select-none" style={{ color: mode === "Focus" ? '#10b981' : '#3b82f6' }}>
            {formatTime(timeLeft)}
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] -mt-2 ${mutedTextColor}`}>
            {isActive ? "Flowing State" : "Paused"}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button 
            onClick={resetTimer}
            className={`p-4 rounded-full border ${borderColor} ${hoverBg} transition-all`}
          >
            <FiRefreshCw size={20} className={textColor} />
          </button>
          
          <button 
            onClick={toggleTimer}
            className="w-20 h-20 rounded-full bg-emerald-500 shadow-xl shadow-emerald-500/20 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
          >
            {isActive ? <FiPause size={32} /> : <FiPlay size={32} className="ml-1" />}
          </button>

          <button className={`p-4 rounded-full border ${borderColor} ${hoverBg} transition-all`}>
            <FiSkipForward size={20} className={textColor} />
          </button>
        </div>

        {/* Ambient Settings */}
        <div className={`w-full mt-4 p-4 rounded-2xl border ${borderColor} ${panelBg} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <FiMusic className="text-emerald-500" />
            <span className={`text-xs font-semibold ${textColor}`}>Lofi Chill Beats</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`w-24 h-1 rounded-full bg-emerald-500/20 overflow-hidden`}>
              <div className="w-[60%] h-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
