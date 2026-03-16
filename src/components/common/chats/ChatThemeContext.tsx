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

  // Background Music State
  isMusicOn: boolean;
  setIsMusicOn: (v: boolean) => void;
  currentSongIndex: number;
  setCurrentSongIndex: (v: number) => void;
  PLAYLIST: Array<{ title: string, src: string }>;
};

export const PLAYLIST = [
  { title: "Lofi Beats 1 - Chill Study", src: "/audio/lofi-playlist/Lofi-1.mp3" },
  { title: "Lofi Beats 2 - Late Night", src: "/audio/lofi-playlist/Lofi-2.mp3" },
  { title: "Lofi Beats 3 - Morning Coffee", src: "/audio/lofi-playlist/Lofi-3.mp3" },
  { title: "Lofi Beats 4 - Relaxing Vibes", src: "/audio/lofi-playlist/Lofi-4.mp3" },
  { title: "Lofi Beats 5 - Sunset Drive", src: "/audio/lofi-playlist/Lofi-5.mp3" },
  { title: "Lofi Beats 6 - Rainy Days", src: "/audio/lofi-playlist/Lofi-6.mp3" },
  { title: "Lofi Beats 7 - Deep Focus", src: "/audio/lofi-playlist/Lofi-7.mp3" },
];

export const ChatThemeContext = createContext<ChatThemeContextType | null>(null);

export const ChatThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isBlurOn, setIsBlurOn] = useState(true);
  
  // Video Backgrounds State
  const [activeVideoId, setActiveVideoId] = useState('o4qjk8_5gmU');
  const [unlockedVideos, setUnlockedVideos] = useState<string[]>(['o4qjk8_5gmU']); // The chilling cat default is unlocked

  // Audio BGM State
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(Math.floor(Math.random() * PLAYLIST.length));

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
      containerBg, panelBg, borderColor, textColor, mutedTextColor, hoverBg, activeBg, emeraldBg, emeraldText,
      isMusicOn, setIsMusicOn, currentSongIndex, setCurrentSongIndex, PLAYLIST
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
