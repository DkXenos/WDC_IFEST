"use client";

import React, { createContext, useContext, useState } from "react";

type ChatThemeContextType = {
  isDarkTheme: boolean;
  isBlurOn: boolean;
  setIsDarkTheme: (v: boolean) => void;
  setIsBlurOn: (v: boolean) => void;

  activeVideoId: string;
  setActiveVideoId: (id: string) => void;
  unlockedVideos: string[];
  setUnlockedVideos: (ids: string[]) => void;

  containerBg: string; // Nav strip, main content bg
  panelBg: string; // sidebar, input bar, headers
  borderColor: string;
  textColor: string;
  mutedTextColor: string;
  hoverBg: string;
  activeBg: string;
  emeraldBg: string;
  emeraldText: string;
};

export const ChatThemeContext = createContext<ChatThemeContextType | null>(null);

export const ChatThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isBlurOn, setIsBlurOn] = useState(true);
  
  // Video Backgrounds State
  const [activeVideoId, setActiveVideoId] = useState('o4qjk8_5gmU');
  const [unlockedVideos, setUnlockedVideos] = useState<string[]>(['o4qjk8_5gmU']); // The chilling cat default is unlocked

  // When blur is off, make backgrounds highly opaque to preserve text readability
  const containerBg = isDarkTheme
    ? (isBlurOn ? 'bg-black/30 backdrop-blur-xl' : 'bg-black/95')
    : (isBlurOn ? 'bg-white/40 backdrop-blur-xl' : 'bg-[#f4ebe1]');

  const panelBg = isDarkTheme
    ? (isBlurOn ? 'bg-black/40 backdrop-blur-sm' : 'bg-black/90')
    : (isBlurOn ? 'bg-white/50 backdrop-blur-sm' : 'bg-white/95');

  const borderColor = isDarkTheme ? 'border-white/10' : 'border-black/10';
  const textColor = isDarkTheme ? 'text-white' : 'text-neutral-900';
  const mutedTextColor = isDarkTheme ? 'text-white/60' : 'text-neutral-500';
  const hoverBg = isDarkTheme ? 'hover:bg-white/10' : 'hover:bg-black/5';
  const activeBg = isDarkTheme ? 'bg-white/10' : 'bg-black/5';
  const emeraldBg = isDarkTheme ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-emerald-500/20 border-emerald-500/30';
  const emeraldText = isDarkTheme ? 'text-emerald-50' : 'text-emerald-900';

  return (
    <ChatThemeContext.Provider value={{
      isDarkTheme, isBlurOn, setIsDarkTheme, setIsBlurOn,
      activeVideoId, setActiveVideoId, unlockedVideos, setUnlockedVideos,
      containerBg, panelBg, borderColor, textColor, mutedTextColor, hoverBg, activeBg, emeraldBg, emeraldText
    }}>
      {children}
    </ChatThemeContext.Provider>
  );
};

export const useChatTheme = () => {
  const context = useContext(ChatThemeContext);
  if (!context) throw new Error("useChatTheme must be used within ChatThemeProvider");
  return context;
};
