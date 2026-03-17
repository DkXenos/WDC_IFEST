"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FiHome,
  FiMessageSquare,
  FiSettings,
  FiCalendar,
  FiFolder,
  FiUser,
  FiBell,
  FiLock,
  FiMonitor,
  FiMusic,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { Calendar } from "@/components/ui/calendar";
import { FiImage, FiFileText, FiVideo, FiSearch } from "react-icons/fi";

const MOCK_FILES = [
  { id: 1, name: "Project Proposal.pdf", type: "pdf", icon: FiFileText, date: "Today, 10:24 AM", size: "2.4 MB" },
  { id: 2, name: "UI Architecture.fig", type: "design", icon: FiImage, date: "Yesterday, 3:15 PM", size: "15.8 MB" },
  { id: 3, name: "Meeting Notes.docx", type: "doc", icon: FiFileText, date: "Oct 12, 2026", size: "12 KB" },
  { id: 4, name: "Demo Recording.mp4", type: "video", icon: FiVideo, date: "Oct 10, 2026", size: "142.5 MB" },
  { id: 5, name: "Assets", type: "folder", icon: FiFolder, date: "Oct 8, 2026", size: "--" },
  { id: 6, name: "Client Logo.png", type: "image", icon: FiImage, date: "Oct 5, 2026", size: "4.1 MB" },
];

const BACKGROUND_OPTIONS = [
  {
    id: "o4qjk8_5gmU",
    title: "Chilling Cat",
    exp: 0,
    img: "https://img.youtube.com/vi/o4qjk8_5gmU/hqdefault.jpg",
  },
  {
    id: "gU4vSEZwiyE",
    title: "Interstellar Black Hole",
    exp: 1000,
    img: "https://img.youtube.com/vi/gU4vSEZwiyE/hqdefault.jpg",
  },
  {
    id: "kDCXBwzSI-4",
    title: "Anime Rain Loop",
    exp: 2500,
    img: "https://img.youtube.com/vi/kDCXBwzSI-4/hqdefault.jpg",
  },
  {
    id: "cBYPzXR49Jw",
    title: "Animated Landscape",
    exp: 5000,
    img: "https://img.youtube.com/vi/cBYPzXR49Jw/hqdefault.jpg",
  },
  {
    id: "m3xgELeHltU",
    title: "Cyberpunk Cityscape",
    exp: 10000,
    img: "https://img.youtube.com/vi/m3xgELeHltU/hqdefault.jpg",
  },
];

const SETTINGS_TABS = [
  { id: "appearance", label: "Appearance", icon: FiMonitor },
  { id: "music", label: "Background Music", icon: FiMusic },
  { id: "account", label: "Account", icon: FiUser },
  { id: "notifications", label: "Notifications", icon: FiBell },
  { id: "privacy", label: "Privacy & Security", icon: FiLock },
];

const dockItems = [
  { icon: FiHome, label: "Home", href: "/desktop" },
  { icon: FiMessageSquare, label: "Chats", href: "/chats" },
  { icon: FiCalendar, label: "Calendar", href: "/calendar" },
  { icon: FiFolder, label: "Files", href: "/files" },
  { icon: FiUser, label: "Profile", href: "/profile" },
  { icon: FiSettings, label: "Settings", href: "/settings" },
];

export default function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState("appearance");
  const [date, setDate] = useState<Date | undefined>(new Date());

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
    panelBg,
    hoverBg,
    activeBg,
    emeraldBg,
    emeraldText,
    isControlBarOpen,
    setIsControlBarOpen,
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
    <TooltipProvider delayDuration={0}>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div
          className="flex items-end gap-3 rounded-2xl border border-white/20 bg-white/40 px-3 pb-2 pt-2 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:bg-black/40 dark:border-white/10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {dockItems.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isNeighbor =
              hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

            return (
              <Tooltip key={item.label}>
                {item.label === "Settings" ? (
                  <Dialog>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <button
                          className="group relative flex flex-col items-center justify-end"
                          onMouseEnter={() => setHoveredIndex(index)}
                        >
                          {/* Icon Container with macOS dock scaling effect */}
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-xl bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out origin-bottom border border-black/5 dark:border-white/10",
                              isHovered
                                ? "w-16 h-16 -translate-y-2"
                                : isNeighbor
                                  ? "w-14 h-14 -translate-y-1"
                                  : "w-12 h-12",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "transition-all duration-200",
                                isHovered
                                  ? "w-8 h-8 text-black dark:text-white"
                                  : isNeighbor
                                    ? "w-7 h-7 text-neutral-700 dark:text-neutral-200"
                                    : "w-6 h-6 text-neutral-600 dark:text-neutral-300",
                              )}
                            />
                          </div>
                        </button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <DialogContent
                      showCloseButton={false}
                      overlayClassName="bg-black/10 dark:bg-black/40 backdrop-blur-sm"
                      className={`max-w-3xl sm:max-w-[800px] p-0 overflow-hidden border ${borderColor} ${containerBg} rounded-2xl shadow-2xl`}
                    >
                      <DialogTitle className="sr-only">
                        System Preferences
                      </DialogTitle>

                      {/* Window Content */}
                      <div className="flex w-full h-[550px] overflow-hidden">
                        {/* Sidebar */}
                        <div
                          className={`w-60 shrink-0 border-r ${borderColor} bg-black/5 dark:bg-black/20 flex flex-col overflow-y-auto`}
                        >
                          {/* Mac OS Window Controls */}
                          <div className="flex items-center gap-2 px-5 py-5 sticky top-0 z-10 w-full mb-2">
                            <DialogClose asChild>
                              <button
                                aria-label="Close"
                                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 shadow-sm border border-black/10 transition-colors"
                              />
                            </DialogClose>
                            <button
                              aria-label="Minimize"
                              className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 shadow-sm border border-black/10 transition-colors"
                            />
                            <button
                              aria-label="Maximize"
                              className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 shadow-sm border border-black/10 transition-colors"
                            />
                          </div>

                          <div className="flex items-center gap-3 mb-6 px-5 mt-2">
                            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-lg font-bold shadow-md">
                              U
                            </div>
                            <div className="flex flex-col">
                              <span
                                className={`text-[13px] font-bold ${textColor} leading-tight`}
                              >
                                User Profile
                              </span>
                              <span
                                className={`text-[11px] ${mutedTextColor} mt-0.5`}
                              >
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
                        <div
                          className={`flex-1 p-10 overflow-y-auto bg-transparent`}
                        >
                          {activeSettingsTab === "appearance" && (
                            <div>
                              <h2
                                className={`text-2xl font-bold mb-6 ${textColor}`}
                              >
                                Appearance Settings
                              </h2>

                              <div className="flex flex-col gap-6">
                                {/* Theme Settings */}
                                <div className="flex flex-col gap-2">
                                  <label
                                    className={`font-semibold ${textColor} text-sm`}
                                  >
                                    Color Scheme
                                  </label>
                                  <div
                                    className={`flex items-center p-1 rounded-lg border ${borderColor} bg-black/5 w-fit gap-1`}
                                  >
                                    <button
                                      onClick={() => setIsDarkTheme(false)}
                                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!isDarkTheme ? "bg-white dark:bg-neutral-800 shadow-sm" : "bg-transparent hover:bg-black/5"} ${textColor}`}
                                    >
                                      Light
                                    </button>
                                    <button
                                      onClick={() => setIsDarkTheme(true)}
                                      className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isDarkTheme ? "bg-white dark:bg-neutral-800 shadow-sm" : "bg-transparent hover:bg-black/5"} ${textColor}`}
                                    >
                                      Dark
                                    </button>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 mt-2">
                                  <div className="flex items-center justify-between">
                                    <span
                                      className={`text-sm font-semibold ${textColor}`}
                                    >
                                      Enable Glassmorphism Blur
                                    </span>
                                    <div
                                      onClick={() => setIsBlurOn(!isBlurOn)}
                                      className={`w-10 h-6 ${isBlurOn ? "bg-emerald-500" : "bg-black/20 dark:bg-white/20"} rounded-full relative cursor-pointer transition-colors duration-300`}
                                    >
                                      <div
                                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform duration-300 ${isBlurOn ? "right-0.5" : "left-0.5"}`}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Video Background Selection */}
                                <div className="flex flex-col gap-2 mt-4 pt-6 border-t border-black/10 dark:border-white/10">
                                  <label
                                    className={`font-semibold ${textColor} text-sm mb-2`}
                                  >
                                    Video Background Wallpaper
                                  </label>
                                  <div className="flex flex-col gap-2">
                                    {BACKGROUND_OPTIONS.map((bg) => {
                                      const isUnlocked =
                                        unlockedVideos.includes(bg.id);
                                      const isActive = activeVideoId === bg.id;

                                      return (
                                        <div
                                          key={bg.id}
                                          onClick={() =>
                                            handleVideoSelect(bg.id, bg.exp)
                                          }
                                          className={`group flex items-center gap-4 p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                            isActive
                                              ? `${emeraldBg} border-emerald-500/40 shadow-sm scale-[1.01]`
                                              : `${hoverBg} border-transparent hover:${borderColor}`
                                          }`}
                                        >
                                          <div
                                            className={`w-20 h-12 rounded-xl overflow-hidden shadow-sm relative shrink-0 ${!isUnlocked ? "grayscale blur-[2px] opacity-60" : ""} transition-all duration-500`}
                                          >
                                            <img
                                              src={bg.img}
                                              alt={bg.title}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>

                                          <div className="flex-1 min-w-0">
                                            <h5
                                              className={`text-[14px] font-bold tracking-tight truncate ${isActive ? emeraldText : textColor}`}
                                            >
                                              {bg.title}
                                            </h5>
                                            {isActive ? (
                                              <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">
                                                Currently Active
                                              </p>
                                            ) : isUnlocked ? (
                                              <p
                                                className={`text-[11px] font-medium ${mutedTextColor} mt-0.5`}
                                              >
                                                Unlocked
                                              </p>
                                            ) : (
                                              <p
                                                className={`text-[11px] font-bold text-amber-500/80 mt-0.5`}
                                              >
                                                Requires{" "}
                                                {bg.exp.toLocaleString()} EXP
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
                                <h2
                                  className={`text-2xl font-bold ${textColor}`}
                                >
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
                                {PLAYLIST.map((song: any, idx: number) => {
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
                                        <div
                                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${isActive ? "bg-emerald-500 text-white" : "bg-black/10 text-white/60"}`}
                                        >
                                          {isActive && isMusicOn ? (
                                            <div className="flex items-end gap-1 h-4">
                                              <div className="w-1 bg-white animate-bounce h-full" />
                                              <div className="w-1 bg-white animate-bounce h-2/3" />
                                              <div className="w-1 bg-white animate-bounce h-full" />
                                            </div>
                                          ) : (
                                            <svg
                                              width="18"
                                              height="18"
                                              viewBox="0 0 24 24"
                                              fill="currentColor"
                                            >
                                              <path d="M8 5v14l11-7z" />
                                            </svg>
                                          )}
                                        </div>

                                        <div>
                                          <h4
                                            className={`text-[15px] font-bold tracking-tight ${isActive ? emeraldText : textColor}`}
                                          >
                                            {song.title}
                                          </h4>
                                          <p
                                            className={`text-[12px] font-medium ${isActive ? "text-emerald-500" : mutedTextColor} mt-0.5 uppercase tracking-wider`}
                                          >
                                            {isActive
                                              ? "Currently Playing"
                                              : `Track ${idx + 1}`}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {["account", "notifications", "privacy"].includes(
                            activeSettingsTab,
                          ) && (
                            <div className="flex flex-col items-center justify-center h-full text-center pb-20 opacity-50 pt-10">
                              <FiSettings
                                size={48}
                                className={`mb-4 ${mutedTextColor}`}
                              />
                              <h3 className={`text-lg font-bold ${textColor}`}>
                                Work in Progress
                              </h3>
                              <p
                                className={`text-sm ${mutedTextColor} mt-2 max-w-[250px]`}
                              >
                                This settings module is currently under active
                                development.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : item.label === "Calendar" ? (
                  <Dialog>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <button
                          className="group relative flex flex-col items-center justify-end"
                          onMouseEnter={() => setHoveredIndex(index)}
                        >
                          {/* Icon Container with macOS dock scaling effect */}
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-xl bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out origin-bottom border border-black/5 dark:border-white/10",
                              isHovered
                                ? "w-16 h-16 -translate-y-2"
                                : isNeighbor
                                  ? "w-14 h-14 -translate-y-1"
                                  : "w-12 h-12",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "transition-all duration-200",
                                isHovered
                                  ? "w-8 h-8 text-black dark:text-white"
                                  : isNeighbor
                                    ? "w-7 h-7 text-neutral-700 dark:text-neutral-200"
                                    : "w-6 h-6 text-neutral-600 dark:text-neutral-300",
                              )}
                            />
                          </div>
                        </button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <DialogContent
                      showCloseButton={false}
                      overlayClassName="bg-black/10 dark:bg-black/40 backdrop-blur-sm"
                      className={`max-w-3xl sm:max-w-[700px] p-0 overflow-hidden border ${borderColor} ${containerBg} rounded-2xl shadow-2xl`}
                    >
                      <DialogTitle className="sr-only">Calendar</DialogTitle>

                      {/* Window Controls */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/20">
                        <DialogClose asChild>
                          <button
                            aria-label="Close"
                            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 shadow-sm border border-black/10 transition-colors"
                          />
                        </DialogClose>
                        <button
                          aria-label="Minimize"
                          className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 shadow-sm border border-black/10 transition-colors"
                        />
                        <button
                          aria-label="Maximize"
                          className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 shadow-sm border border-black/10 transition-colors"
                        />
                        <span
                          className={`text-xs ml-2 font-medium ${textColor}`}
                        >
                          Calendar
                        </span>
                      </div>

                      <div className="flex bg-transparent overflow-hidden h-[400px]">
                        {/* Left Panel: Selected Date Overview mapping to ChatThemeContext styles */}
                        <div className={`w-60 shrink-0 border-r ${borderColor} ${panelBg} flex flex-col items-center justify-center p-6 text-center shadow-inner`}>
                          <p className={`text-sm font-semibold tracking-widest uppercase mb-1 ${emeraldText}`}>
                            {date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) : "Month"}
                          </p>
                          <h1 className={`text-7xl font-bold tracking-tighter my-2 ${textColor}`}>
                            {date ? date.getDate() : "--"}
                          </h1>
                          <p className={`text-[15px] font-medium ${mutedTextColor} capitalize`}>
                            {date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : "Select Date"}
                          </p>
                          <div className={`mt-10 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm border ${borderColor} ${hoverBg} ${mutedTextColor}`}>
                            No events today
                          </div>
                        </div>

                        {/* Right Panel: Calendar Grid */}
                        <div className="p-6 flex-1 flex items-center justify-center relative bg-black/5 dark:bg-white/5 backdrop-blur-sm">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className={`rounded-2xl border ${borderColor} ${containerBg} shadow-sm scale-105! origin-center ${textColor}`}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : item.label === "Files" ? (
                  <Dialog>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <button
                          className="group relative flex flex-col items-center justify-end"
                          onMouseEnter={() => setHoveredIndex(index)}
                        >
                          {/* Icon Container with macOS dock scaling effect */}
                          <div
                            className={cn(
                              "flex items-center justify-center rounded-xl bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out origin-bottom border border-black/5 dark:border-white/10",
                              isHovered
                                ? "w-16 h-16 -translate-y-2"
                                : isNeighbor
                                  ? "w-14 h-14 -translate-y-1"
                                  : "w-12 h-12",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "transition-all duration-200",
                                isHovered
                                  ? "w-8 h-8 text-black dark:text-white"
                                  : isNeighbor
                                    ? "w-7 h-7 text-neutral-700 dark:text-neutral-200"
                                    : "w-6 h-6 text-neutral-600 dark:text-neutral-300",
                              )}
                            />
                          </div>
                        </button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <DialogContent showCloseButton={false} overlayClassName="bg-black/10 dark:bg-black/40 backdrop-blur-sm" className={`max-w-4xl sm:max-w-[900px] p-0 overflow-hidden border ${borderColor} ${containerBg} rounded-2xl shadow-2xl`}>
                      <DialogTitle className="sr-only">Files Explorer</DialogTitle>
                      
                      {/* Window Content */}
                      <div className="flex w-full h-[550px] overflow-hidden">
                        {/* Sidebar */}
                        <div className={`w-56 shrink-0 border-r ${borderColor} bg-black/5 dark:bg-black/20 flex flex-col overflow-y-auto`}>
                          {/* Mac OS Window Controls */}
                          <div className="flex items-center gap-2 px-5 py-5 sticky top-0 z-10 w-full mb-2">
                             <DialogClose asChild>
                               <button aria-label="Close" className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 shadow-sm border border-black/10 transition-colors" />
                             </DialogClose>
                             <button aria-label="Minimize" className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 shadow-sm border border-black/10 transition-colors" />
                             <button aria-label="Maximize" className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 shadow-sm border border-black/10 transition-colors" />
                          </div>

                          <div className="px-3 pb-6 flex flex-col gap-1">
                            <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-1 mb-1`}>Favorites</div>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${activeBg} shadow-sm ${textColor}`}>
                              <FiSearch size={14} className="text-blue-500" /> Recents
                            </button>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <FiFolder size={14} className="text-blue-500" /> Desktop
                            </button>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <FiFolder size={14} className="text-blue-500" /> Documents
                            </button>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <FiFolder size={14} className="text-blue-500" /> Downloads
                            </button>
                            
                            <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-4 mb-1`}>Tags</div>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-sm" /> Important
                            </button>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-sm" /> Work
                            </button>
                            <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-sm" /> Personal
                            </button>
                          </div>
                        </div>

                        {/* Main File View */}
                        <div className={`flex-1 flex flex-col overflow-hidden bg-transparent`}>
                          {/* Top Bar for Main Content */}
                          <div className={`flex items-center justify-between border-b ${borderColor} px-6 py-4 h-[60px] shrink-0`}>
                            <div className="flex items-center gap-4">
                              <span className={`font-semibold text-lg tracking-tight ${textColor}`}>Recents</span>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${borderColor} bg-black/5 dark:bg-black/20 ${mutedTextColor} shadow-sm`}>
                              <FiSearch size={14} />
                              <input 
                                type="text" 
                                placeholder="Search" 
                                className="bg-transparent border-none outline-none text-[13px] w-44 placeholder:text-current font-medium"
                              />
                            </div>
                          </div>

                          <div className="flex-1 overflow-y-auto p-6">
                            <div className={`grid grid-cols-5 gap-4 mb-3 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} px-3`}>
                              <div className="col-span-2">Name</div>
                              <div>Date Modified</div>
                              <div>Size</div>
                              <div>Kind</div>
                            </div>

                            <div className="flex flex-col gap-1">
                              {MOCK_FILES.map((file) => (
                                <div 
                                  key={file.id} 
                                  className={`grid grid-cols-5 items-center gap-4 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${hoverBg} group`}
                                >
                                  <div className="col-span-2 flex items-center gap-3">
                                    <file.icon size={18} className={`shrink-0 ${file.type === 'folder' ? 'text-blue-400 fill-blue-400/20' : file.type === 'pdf' ? 'text-red-400' : 'text-neutral-400'}`} />
                                    <span className={`text-[13px] font-medium truncate ${textColor}`}>{file.name}</span>
                                  </div>
                                  <div className={`text-[12px] font-medium ${mutedTextColor} truncate`}>{file.date}</div>
                                  <div className={`text-[12px] font-medium ${mutedTextColor}`}>{file.size}</div>
                                  <div className={`text-[12px] font-medium ${mutedTextColor} uppercase`}>{file.type}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className="group relative flex flex-col items-center justify-end"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onClick={(e) => {
                        // We removed the control bar trigger for Settings but other clicks could go here
                      }}
                    >
                      {/* Icon Container with macOS dock scaling effect */}
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-xl bg-linear-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out origin-bottom border border-black/5 dark:border-white/10",
                          isHovered
                            ? "w-16 h-16 -translate-y-2"
                            : isNeighbor
                              ? "w-14 h-14 -translate-y-1"
                              : "w-12 h-12",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "transition-all duration-200",
                            isHovered
                              ? "w-8 h-8 text-black dark:text-white"
                              : isNeighbor
                                ? "w-7 h-7 text-neutral-700 dark:text-neutral-200"
                                : "w-6 h-6 text-neutral-600 dark:text-neutral-300",
                          )}
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                )}
                <TooltipContent
                  side="top"
                  sideOffset={12}
                  className="font-medium px-3 py-1.5 text-xs rounded-md"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
