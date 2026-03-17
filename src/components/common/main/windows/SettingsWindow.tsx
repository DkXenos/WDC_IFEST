"use client";

import React, { useState } from "react";
import Window, { WindowDragHandle } from "../Window";
import { FiSettings, FiUser, FiBell, FiLock, FiMonitor, FiMusic } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useWindows } from "../WindowContext";

const BACKGROUND_OPTIONS = [
  { id: "o4qjk8_5gmU", title: "Chilling Cat", exp: 0, img: "https://img.youtube.com/vi/o4qjk8_5gmU/hqdefault.jpg" },
  { id: "gU4vSEZwiyE", title: "Interstellar Black Hole", exp: 1000, img: "https://img.youtube.com/vi/gU4vSEZwiyE/hqdefault.jpg" },
  { id: "kDCXBwzSI-4", title: "Anime Rain Loop", exp: 2500, img: "https://img.youtube.com/vi/kDCXBwzSI-4/hqdefault.jpg" },
  { id: "cBYPzXR49Jw", title: "Animated Landscape", exp: 5000, img: "https://img.youtube.com/vi/cBYPzXR49Jw/hqdefault.jpg" },
  { id: "m3xgELeHltU", title: "Cyberpunk Cityscape", exp: 10000, img: "https://img.youtube.com/vi/m3xgELeHltU/hqdefault.jpg" },
];

const SETTINGS_TABS = [
  { id: "appearance", label: "Appearance", icon: FiMonitor },
  { id: "music", label: "Background Music", icon: FiMusic },
  { id: "account", label: "Account", icon: FiUser },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "privacy", label: "Privacy & Security", icon: FiLock },
];

export default function SettingsWindow() {
  const [activeSettingsTab, setActiveSettingsTab] = useState("appearance");
  const { closeWindow, showTutorialButton, setShowTutorialButton } = useWindows();

  const {
    isDarkTheme,
    setIsDarkTheme,
    isBlurOn,
    setIsBlurOn,
    activeVideoId,
    setActiveVideoId,
    unlockedVideos,
    setUnlockedVideos,
    isMusicOn,
    setIsMusicOn,
    currentSongIndex,
    setCurrentSongIndex,
    PLAYLIST,
    borderColor,
    textColor,
    mutedTextColor,
    containerBg,
    hoverBg,
    activeBg,
    emeraldBg,
    emeraldText,
  } = useChatTheme();

  const handleVideoSelect = (id: string, exp: number) => {
    if (unlockedVideos.includes(id)) {
      setActiveVideoId(id);
    } else {
      setUnlockedVideos([...unlockedVideos, id]);
      setActiveVideoId(id);
    }
  };

  return (
    <Window 
      id="settings" 
      title="System Preferences" 
      icon={<FiSettings size={18} />}
      width="800px"
      height="550px"
      hideTitleBar={true}
    >
        <div className={`flex w-full h-full bg-transparent overflow-hidden pointer-events-none`}>
            {/* Sidebar */}
            <div className={`w-60 shrink-0 border-r ${borderColor} bg-black/5 dark:bg-black/20 flex flex-col overflow-y-auto h-full pointer-events-auto`}>
                <WindowDragHandle className="flex items-center gap-2 px-5 py-5 sticky top-0 z-10 w-full mb-2 bg-transparent">
                   <button onClick={() => closeWindow("settings")} className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10 pointer-events-auto" />
                   <button className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10 pointer-events-auto" />
                   <button className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10 pointer-events-auto" />
                </WindowDragHandle>

                <div className="flex items-center gap-3 mb-6 px-5 mt-2">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                    U
                </div>
                <div className="flex flex-col">
                    <span className={`text-[13px] font-bold ${textColor} leading-tight`}>
                    User Profile
                    </span>
                    <span className={`text-[11px] ${mutedTextColor} mt-0.5`}>
                    Apple ID, iCloud
                    </span>
                </div>
                </div>

                <div className="flex flex-col gap-1 px-3 pb-6">
                {SETTINGS_TABS.map((tab, idx) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSettingsTab(tab.id)}
                        className={`flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-lg w-full text-left transition-colors ${activeSettingsTab === tab.id ? `${activeBg} shadow-sm` : hoverBg} ${textColor}`}
                    >
                    <div
                        className={`w-5 h-5 rounded flex items-center justify-center text-white shadow-sm ${
                        idx === 0
                            ? "bg-blue-500"
                            : idx === 1
                            ? "bg-indigo-500"
                            : idx === 2
                                ? "bg-gray-500"
                                : idx === 3
                                ? "bg-red-500"
                                : "bg-orange-500"
                        }`}
                    >
                        <tab.icon size={12} />
                    </div>
                    {tab.label}
                    </button>
                ))}
                </div>
            </div>

            {/* Main View Data */}
            <div className={`flex-1 p-10 overflow-y-auto bg-transparent h-full pointer-events-auto`}>
                {activeSettingsTab === "appearance" && (
                <div>
                    <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
                    Appearance Settings
                    </h2>

                    <div className="flex flex-col gap-6">
                    {/* Theme Settings */}
                    <div className="flex flex-col gap-2">
                        <label className={`font-semibold ${textColor} text-sm`}>
                        Color Scheme
                        </label>
                        <div className={`flex items-center p-1 rounded-lg border ${borderColor} bg-black/5 w-fit gap-1`}>
                        <button
                            onClick={() => setIsDarkTheme(false)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!isDarkTheme ? "bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white" : `bg-transparent hover:bg-black/5 ${mutedTextColor}`}`}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => setIsDarkTheme(true)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isDarkTheme ? "bg-white dark:bg-neutral-800 shadow-sm text-neutral-900 dark:text-white" : `bg-transparent hover:bg-black/5 ${mutedTextColor}`}`}
                        >
                            Dark
                        </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${textColor}`}>
                            Enable Glassmorphism Blur
                        </span>
                        <div
                            onClick={() => setIsBlurOn(!isBlurOn)}
                            className={`w-10 h-6 ${isBlurOn ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20"} rounded-full relative cursor-pointer transition-colors duration-300`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${isBlurOn ? "right-0.5" : "left-0.5"}`} />
                        </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${textColor}`}>
                            Show Tutorial Button
                        </span>
                        <div
                            onClick={() => setShowTutorialButton(!showTutorialButton)}
                            className={`w-10 h-6 ${showTutorialButton ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20"} rounded-full relative cursor-pointer transition-colors duration-300`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${showTutorialButton ? "right-0.5" : "left-0.5"}`} />
                        </div>
                        </div>
                    </div>

                    {/* Video Background Selection */}
                    <div className="flex flex-col gap-2 mt-4 pt-6 border-t border-black/10 dark:border-white/10">
                        <label className={`font-semibold ${textColor} text-sm mb-2`}>
                        Video Background Wallpaper
                        </label>
                        <div className="flex flex-col gap-2">
                        {BACKGROUND_OPTIONS.map((bg) => {
                            const isUnlocked = unlockedVideos.includes(bg.id);
                            const isActive = activeVideoId === bg.id;

                            return (
                            <div
                                key={bg.id}
                                onClick={() => handleVideoSelect(bg.id, bg.exp)}
                                className={`group flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                isActive
                                    ? `${emeraldBg} border-emerald-500/40 shadow-sm scale-[1.01]`
                                    : `${hoverBg} border-transparent hover:${borderColor}`
                                }`}
                            >
                                <div className={`w-20 h-12 rounded-xl overflow-hidden shadow-sm relative shrink-0 ${!isUnlocked ? "grayscale blur-[2px] opacity-60" : ""} transition-all duration-500`}>
                                <img
                                    src={bg.img}
                                    alt={bg.title}
                                    className="w-full h-full object-cover"
                                />
                                </div>

                                <div className="flex-1 min-w-0">
                                <h5 className={`text-[14px] font-bold tracking-tight truncate ${isActive ? emeraldText : textColor}`}>
                                    {bg.title}
                                </h5>
                                {isActive ? (
                                    <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">
                                    Currently Active
                                    </p>
                                ) : isUnlocked ? (
                                    <p className={`text-[11px] font-medium ${mutedTextColor} mt-0.5`}>
                                    Unlocked
                                    </p>
                                ) : (
                                    <p className={`text-[11px] font-bold text-amber-500/80 mt-0.5`}>
                                    Requires {bg.exp.toLocaleString()} EXP
                                    </p>
                                )}
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    </div>
                </div>
                )}

                {activeSettingsTab === "music" && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${textColor}`}>
                        Background Music
                    </h2>
                    <button
                        onClick={() => setIsMusicOn(!isMusicOn)}
                        className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all border shadow-sm ${isMusicOn ? "bg-emerald-500/80 border-emerald-400 text-white" : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`}
                    >
                        {isMusicOn ? "Pause" : "Play"}
                    </button>
                    </div>

                    <div className={`flex flex-col gap-2`}>
                    {PLAYLIST.map((song: { src: string; title: string }, idx: number) => {
                        const isActive = currentSongIndex === idx;

                        return (
                        <div
                            key={song.src}
                            onClick={() => {
                            setCurrentSongIndex(idx);
                            if (!isMusicOn) setIsMusicOn(true);
                            }}
                            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isActive
                                ? `${emeraldBg} border-emerald-500/40 shadow-sm scale-[1.01]`
                                : `${hoverBg} border-transparent hover:${borderColor}`
                            }`}
                        >
                            <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${isActive ? "bg-emerald-500 text-white" : "bg-black/10 text-white/60"}`}>
                                {isActive && isMusicOn ? (
                                <div className="flex items-end gap-1 h-4">
                                    <div className="w-1 bg-white animate-[bounce_1s_infinite] h-full" />
                                    <div className="w-1 bg-white animate-[bounce_1s_infinite_0.2s] h-2/3" />
                                    <div className="w-1 bg-white animate-[bounce_1s_infinite_0.4s] h-full" />
                                </div>
                                ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                )}
                            </div>

                            <div>
                                <h4 className={`text-[15px] font-bold tracking-tight ${isActive ? emeraldText : textColor}`}>
                                {song.title}
                                </h4>
                                <p className={`text-[12px] font-medium ${isActive ? "text-emerald-500" : mutedTextColor} mt-0.5 uppercase tracking-wider`}>
                                {isActive ? "Currently Playing" : `Track ${idx + 1}`}
                                </p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}

                {["account", "notifications", "privacy"].includes(activeSettingsTab) && (
                <div className="flex flex-col items-center justify-center h-full text-center pb-20 opacity-50 pt-10">
                    <FiSettings size={48} className={`mb-4 ${mutedTextColor}`} />
                    <h3 className={`text-lg font-bold ${textColor}`}>
                    Work in Progress
                    </h3>
                    <p className={`text-sm ${mutedTextColor} mt-2 max-w-[250px]`}>
                    This settings module is currently under active development.
                    </p>
                </div>
                )}
            </div>
        </div>
    </Window>
  );
}
