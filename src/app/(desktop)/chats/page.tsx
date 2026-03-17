"use client";

import React, { useState, useEffect, useMemo } from "react";

import { chats, currentUser } from "@/data/chats";
import ChatSidebar from "@/components/common/chats/ChatSidebar";
import ChatConversation from "@/components/common/chats/ChatConversation";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";

const navItems = [
  {
    label: "Chats",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Notifications",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Settings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Friends",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
      </svg>
    ),
    active: false,
  },
];

export default function ChatsPage() {
  const { isDarkTheme, isBlurOn, setIsDarkTheme, setIsBlurOn, containerBg, panelBg, borderColor, textColor, hoverBg, mutedTextColor, isMusicOn, setIsMusicOn, isVideoOn, setIsVideoOn } = useChatTheme();
  const [isMinimized, setIsMinimized] = useState(false);
  
  // Navigation State
  const [activeNav, setActiveNav] = useState("Chats");

  // Chat State
  const [activeChatId, setActiveChatId] = useState("person-wealth");
  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId) || chats[0], [activeChatId]);

  return (
    <main className="fixed inset-0 flex z-10 overflow-hidden pt-4 pb-28 lg:pb-32 pointer-events-none">

      {/* Relax Widget (Active when Minimized) */}
      <RelaxWidget isVisible={isMinimized} onRestore={() => setIsMinimized(false)} />

      <div className={`flex flex-col w-full h-full max-w-[1400px] mx-auto p-4 lg:p-6 pb-1 gap-4 relative z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMinimized ? 'opacity-0 scale-95 pointer-events-none translate-y-8' : 'opacity-100 scale-100 translate-y-0'} pointer-events-auto`}>
        
        {/* Top Floating Dock Navbar */}
        <header className={`flex w-fit mx-auto ${containerBg} border ${borderColor} rounded-[1.75rem] shadow-lg p-2 items-center justify-center gap-2 shrink-0 relative z-50 transition-all duration-300`}>
          
          <button
            onClick={() => setIsVideoOn(!isVideoOn)} 
            className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border shadow-sm ${isVideoOn ? 'bg-emerald-500/80 border-emerald-400 text-white' : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`}
            title="Toggle Video Background"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
          </button>
          
          <button
            onClick={() => setIsBlurOn(!isBlurOn)}
            className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border shadow-sm ${isBlurOn ? 'bg-emerald-500/80 border-emerald-400 text-white' : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`}
            title="Toggle Glassmorphism Blur"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </button>
          
          <button 
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border shadow-sm ${!isDarkTheme ? 'bg-emerald-500/80 border-emerald-400 text-white' : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`} 
            title="Toggle Dark/Light Theme"
          >
            {isDarkTheme ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          
          <button 
            onClick={() => setIsMusicOn(!isMusicOn)}
            className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border shadow-sm ${isMusicOn ? 'bg-emerald-500/80 border-emerald-400 text-white' : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`} 
            title="Toggle Background Music"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
          </button>
          
          <div className={`w-px h-8 ${borderColor} mx-1`} />

          <button
            onClick={() => setIsMinimized(true)}
            className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border border-transparent shadow-sm ${hoverBg} hover:${borderColor} ${textColor}`}
            title="Minimize to Widget"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          </button>
          
        </header>

        {/* Main Glassmorphic Window Container */}
        <div className={`flex w-full flex-1 ${containerBg} border ${borderColor} rounded-[2rem] shadow-2xl overflow-hidden p-2 gap-2 transition-all duration-300 relative z-10 -mt-2`}>
          
          {/* ─ Vertical Nav Strip ─ */}
          <nav className={`w-24 shrink-0 h-full flex flex-col items-center py-6 gap-5 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-inner transition-colors duration-300`}>
            
            {/* User avatar */}
            <div 
              className={`relative mb-4 cursor-pointer rounded-[18px] transition-all duration-300 ${activeNav === "Profile" ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-transparent scale-[1.05]' : 'hover:scale-[1.02]'}`}
              onClick={() => setActiveNav("Profile")}
              title="View Profile"
            >
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="w-[52px] h-[52px] rounded-[18px] object-cover shadow-sm border border-white/20" />
              ) : (
                <div className="w-[52px] h-[52px] rounded-[18px] bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm shadow-sm border border-white/20">
                  {currentUser.initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-300 to-emerald-500 rounded-full border-[3px] border-white/80" />
            </div>

            {/* Icons */}
            <div className="flex flex-col gap-3 flex-1 items-center w-full">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  title={item.label}
                  onClick={() => setActiveNav(item.label)}
                  className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all ${
                    item.label === activeNav
                      ? "bg-emerald-500/20 text-emerald-400 shadow-md font-semibold border border-emerald-500/30"
                      : `${mutedTextColor} hover:${textColor} ${hoverBg} border border-transparent hover:${borderColor}`
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {/* Bottom clock icon */}
            <button
              title="History"
              onClick={() => setActiveNav("History")}
              className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center mt-auto transition-all ${
                activeNav === "History" 
                  ? "bg-emerald-500/20 text-emerald-400 shadow-md font-semibold border border-emerald-500/30"
                  : `${mutedTextColor} hover:${textColor} ${hoverBg} border border-transparent hover:${borderColor}`
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>
          </nav>

          {/* ─ Sidebar (Groups / Person) ─ */}
          <ChatSidebar activeChatId={activeChatId} onSelectChat={setActiveChatId} />

          {/* ─ Dynamic Main Area ─ */}
          {activeNav === "Chats" && <ChatConversation chat={activeChat} onViewProfile={() => setActiveNav("ContactProfile")} />}
          {activeNav === "Notifications" && <NotificationsView />}
          {activeNav === "Settings" && <SettingsView />}
          {activeNav === "Profile" && <UserProfileView />}
          {activeNav === "ContactProfile" && <ContactProfileView chat={activeChat} />}
          {activeNav === "Friends" && <FriendsView />}
          {activeNav === "History" && <HistoryView />}

        </div>
      </div>
    </main>
  );
}

// ─── Auxiliary Views ─────────────────────────────────────────────────────────

function NotificationsView() {
  const { panelBg, borderColor, textColor, mutedTextColor, hoverBg, emeraldText } = useChatTheme();
  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300 overflow-hidden`}>
      <header className={`h-[84px] shrink-0 flex items-center px-8 border-b ${borderColor}`}>
        <h2 className={`text-[16px] font-bold ${textColor}`}>Notifications & Mentions</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4 custom-scrollbar">
          
        <div className={`p-4 rounded-3xl border ${borderColor} transition-colors cursor-pointer ${hoverBg}`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-lg">
                @
              </div>
              <div>
                <h4 className={`text-[15px] font-semibold ${textColor}`}>Wealth mentioned you</h4>
                <p className={`text-[12px] font-medium ${emeraldText}`}>Kingplus Internship Team</p>
              </div>
            </div>
            <span className={`text-[12px] font-medium ${mutedTextColor}`}>10m ago</span>
          </div>
          <p className={`text-[13px] font-medium ${mutedTextColor} pl-13 ml-[52px]`}>
            "<span className={emeraldText}>@you</span> are we still meeting at 3?"
          </p>
        </div>

      </div>
    </section>
  );
}

const BACKGROUND_OPTIONS = [
  { id: 'o4qjk8_5gmU', title: 'Chilling Cat', exp: 0, img: 'https://img.youtube.com/vi/o4qjk8_5gmU/hqdefault.jpg' },
  { id: 'gU4vSEZwiyE', title: 'Interstellar Black Hole', exp: 1000, img: 'https://img.youtube.com/vi/gU4vSEZwiyE/hqdefault.jpg' },
  { id: 'kDCXBwzSI-4', title: 'Anime Rain Loop', exp: 2500, img: 'https://img.youtube.com/vi/kDCXBwzSI-4/hqdefault.jpg' },
  { id: 'cBYPzXR49Jw', title: 'Animated Landscape', exp: 5000, img: 'https://img.youtube.com/vi/cBYPzXR49Jw/hqdefault.jpg' },
  { id: 'm3xgELeHltU', title: 'Cyberpunk Cityscape', exp: 10000, img: 'https://img.youtube.com/vi/m3xgELeHltU/hqdefault.jpg' },
];

function SettingsView() {
  const { panelBg, borderColor, textColor, mutedTextColor, hoverBg, emeraldBg, emeraldText, activeVideoId, setActiveVideoId, unlockedVideos, setUnlockedVideos, isMusicOn, setIsMusicOn, currentSongIndex, setCurrentSongIndex, PLAYLIST } = useChatTheme();
  
  // Settings Tab State
  const [activeTab, setActiveTab] = useState<'Appearance' | 'Music'>('Appearance');
  
  const [isBgMenuOpen, setIsBgMenuOpen] = useState(false);

  const handleVideoSelect = (id: string, exp: number) => {
    if (unlockedVideos.includes(id)) {
      setActiveVideoId(id);
    } else {
      // Simulate Unlocking statically via prompt logic
      setUnlockedVideos([...unlockedVideos, id]);
      setActiveVideoId(id);
    }
  };

  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300 overflow-hidden`}>
      <header className={`h-[84px] shrink-0 flex items-center justify-between px-8 border-b ${borderColor}`}>
        <h2 className={`text-[16px] font-bold ${textColor}`}>Settings</h2>
        
        <div className={`flex bg-black/10 dark:bg-black/40 p-1 rounded-[1.25rem] border ${borderColor}`}>
          <button onClick={() => setActiveTab('Appearance')} className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${activeTab === 'Appearance' ? 'bg-white/20 text-white shadow-sm' : `${mutedTextColor} hover:${textColor}`}`}>Appearance</button>
          <button onClick={() => setActiveTab('Music')} className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${activeTab === 'Music' ? 'bg-white/20 text-white shadow-sm' : `${mutedTextColor} hover:${textColor}`}`}>Music</button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8 custom-scrollbar">
        
        {activeTab === 'Appearance' && (
          <div>
            <h3 className={`text-[13px] font-bold ${mutedTextColor} uppercase tracking-wider mb-4 px-2`}>Display</h3>
          
          <div className={`p-2 rounded-[1.75rem] border ${borderColor} shadow-sm transition-all duration-300`}>
            
            {/* Header / Trigger */}
            <div 
              onClick={() => setIsBgMenuOpen(!isBgMenuOpen)}
              className={`p-4 flex items-center justify-between ${hoverBg} rounded-[1.25rem] cursor-pointer transition-colors active:scale-[0.98] duration-200`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-[48px] h-[48px] rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20 shadow-sm`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <div>
                  <h4 className={`text-[16px] font-semibold tracking-tight ${textColor}`}>Background Change</h4>
                  <p className={`text-[13px] font-medium ${mutedTextColor} mt-0.5`}>Change the active chat background</p>
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${borderColor} border transition-transform duration-300 ${isBgMenuOpen ? 'rotate-180 bg-black/10' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={textColor}><polyline points="6 9 12 15 18 9"/></svg>
              </div>
            </div>

            {/* Expandable Options UI */}
            <div className={`grid transition-all duration-300 ease-in-out ${isBgMenuOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-2 p-2">
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
                        {/* Thumbnail Bubble */}
                        <div className={`w-20 h-12 rounded-xl overflow-hidden shadow-sm relative shrink-0 ${!isUnlocked ? 'grayscale blur-[2px] opacity-60' : ''} transition-all duration-500`}>
                          <img src={bg.img} alt={bg.title} className="w-full h-full object-cover" />
                          {!isUnlocked && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </div>
                          )}
                        </div>

                        {/* Title / Info */}
                        <div className="flex-1 min-w-0">
                          <h5 className={`text-[14px] font-bold tracking-tight truncate ${isActive ? emeraldText : textColor}`}>
                            {bg.title}
                          </h5>
                          {isActive ? (
                            <p className="text-[11px] font-semibold text-emerald-500 mt-0.5">Currently Active</p>
                          ) : isUnlocked ? (
                            <p className={`text-[11px] font-medium ${mutedTextColor} mt-0.5`}>Unlocked</p>
                          ) : (
                            <p className={`text-[11px] font-bold text-amber-500/80 mt-0.5 flex items-center gap-1`}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
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
          </div>
        )}

        {/* Music Tab Settings */}
        {activeTab === 'Music' && (
          <div>
            <div className="flex items-center justify-between mb-4 px-2">
               <h3 className={`text-[13px] font-bold ${mutedTextColor} uppercase tracking-wider`}>Lofi Playlist</h3>
               <button 
                 onClick={() => setIsMusicOn(!isMusicOn)}
                 className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all border shadow-sm ${isMusicOn ? 'bg-emerald-500/80 border-emerald-400 text-white' : `${hoverBg} border-transparent hover:${borderColor} ${textColor}`}`}
               >
                 {isMusicOn ? 'Pause' : 'Play'}
               </button>
            </div>
            
            <div className={`flex flex-col gap-2`}>
              {PLAYLIST.map((song, idx) => {
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
                      {/* Track Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${isActive ? 'bg-emerald-500 text-white' : 'bg-black/10 text-white/60'}`}>
                        {isActive && isMusicOn ? (
                          <div className="flex items-end gap-1 h-4">
                            <div className="w-1 bg-white animate-[bounce_1s_infinite] h-full" />
                            <div className="w-1 bg-white animate-[bounce_1s_infinite_0.2s] h-2/3" />
                            <div className="w-1 bg-white animate-[bounce_1s_infinite_0.4s] h-full" />
                          </div>
                        ) : (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </div>
                      
                      <div>
                        <h4 className={`text-[15px] font-bold tracking-tight ${isActive ? emeraldText : textColor}`}>
                          {song.title}
                        </h4>
                        <p className={`text-[12px] font-medium ${isActive ? 'text-emerald-500' : mutedTextColor} mt-0.5 uppercase tracking-wider`}>
                          {isActive ? 'Currently Playing' : `Track ${idx + 1}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function UserProfileView() {
  const { panelBg, borderColor, textColor, mutedTextColor, emeraldBg, emeraldText } = useChatTheme();
  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col items-center justify-center z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300`}>
      <div className="flex flex-col items-center max-w-sm text-center w-full px-4">
        <div className="relative mb-6">
          {currentUser.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="User" className="w-[120px] h-[120px] rounded-full object-cover shadow-xl border-4 border-emerald-500/20" />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-4xl shadow-xl border-4 border-emerald-500/20">
              {currentUser.initials}
            </div>
          )}
        </div>
        
        <h2 className={`text-2xl font-bold ${textColor}`}>{currentUser.name} (You)</h2>
        <p className={`text-[14px] font-medium ${mutedTextColor} mt-1 mb-6`}>"Learning every day"</p>
        
        <div className={`w-full p-6 rounded-3xl border ${borderColor} flex justify-around mb-8`}>
          <div className="flex flex-col items-center">
            <span className={`text-[18px] font-bold ${textColor}`}>12</span>
            <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>Friends</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-[18px] font-bold ${textColor}`}>2,500</span>
            <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>EXP</span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`text-[18px] font-bold ${textColor} flex items-center gap-1`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Lvl. 4
            </span>
            <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>Rank</span>
          </div>
        </div>
        
        <button className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 ${emeraldBg} ${emeraldText} font-bold transition-transform active:scale-95 shadow-sm`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Edit Profile
        </button>
      </div>
    </section>
  );
}

function ContactProfileView({ chat }: { chat: any }) {
  const { panelBg, borderColor, textColor, mutedTextColor, emeraldText, hoverBg } = useChatTheme();
  const user = chat.type === "person" ? chat.participants.find((p: any) => p.id !== "me") : chat;
  const isGroup = chat.type === "group";

  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col items-center justify-center z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300 overflow-y-auto custom-scrollbar relative`}>
      <div className="flex flex-col items-center max-w-sm text-center py-10 w-full px-4">
        <div className="relative mb-6">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name || chat.name} className="w-[120px] h-[120px] rounded-full object-cover shadow-xl border-4 border-white/10" />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-4xl shadow-xl border-4 border-white/10" style={{ backgroundColor: user.avatarColor }}>
              {user.initials || chat.name.substring(0,2).toUpperCase()}
            </div>
          )}
          {!isGroup && user.online && (
             <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-400 rounded-full border-4 border-[#1a1a1a]" />
          )}
        </div>

        <h2 className={`text-2xl font-bold ${textColor}`}>{user.name || chat.name}</h2>
        <p className={`text-[14px] font-medium ${isGroup ? mutedTextColor : (user.online ? emeraldText : mutedTextColor)} mt-1 mb-8`}>
          {isGroup ? `${chat.participants.length} Members` : (user.online ? 'Online' : `Last seen ${user.lastSeen}`)}
        </p>



        {isGroup && (
          <div className={`w-full text-left p-6 rounded-3xl border ${borderColor} shadow-sm bg-black/5`}>
             <h3 className={`text-[13px] font-bold ${mutedTextColor} uppercase tracking-wider mb-4`}>Group Members</h3>
             <div className="space-y-4">
               {chat.participants.map((p: any) => (
                 <div key={p.id} className="flex items-center gap-3">
                   {p.avatarUrl ? (
                      <img src={p.avatarUrl} alt={p.name} className="w-9 h-9 rounded-full object-cover shadow-sm border border-white/10" />
                    ) : (
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#2d3a38] shadow-sm border border-white/10" style={{ backgroundColor: p.avatarColor }}>
                        {p.initials}
                      </div>
                    )}
                    <span className={`text-[14px] font-semibold ${textColor}`}>{p.name} {p.id === 'me' && <span className={mutedTextColor}>(You)</span>}</span>
                 </div>
               ))}
             </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FriendsView() {
  const { panelBg, borderColor, textColor, mutedTextColor, hoverBg, emeraldBg, emeraldText } = useChatTheme();
  const [tab, setTab] = useState<'Discover' | 'Requests'>('Discover');

  const DUMMY_DISCOVER = [
    { id: 1, name: "Jason Derulo", username: "@jderulo", initials: "JD", color: "#8E6B8E", bio: "Wanna study physics and create nice music?" },
    { id: 2, name: "Selena", username: "@selly", initials: "S", color: "#6B8E8E", bio: "Engineering major - UI/UX Enthusiast" },
  ];

  const DUMMY_REQUESTS = [
    { id: 3, name: "Mark Zuck", username: "@mark", initials: "MZ", color: "#8E6B6B", bio: "CS101 group?" }
  ];

  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300 overflow-hidden`}>
      <header className={`h-[84px] shrink-0 flex items-center justify-between px-8 border-b ${borderColor}`}>
        <h2 className={`text-[16px] font-bold ${textColor}`}>Add Friends</h2>
        <div className={`flex bg-black/10 dark:bg-black/40 p-1 rounded-[1.25rem] border ${borderColor}`}>
          <button onClick={() => setTab('Discover')} className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all ${tab === 'Discover' ? 'bg-white/20 text-white shadow-sm' : `${mutedTextColor} hover:${textColor}`}`}>Discover</button>
          <button onClick={() => setTab('Requests')} className={`px-5 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${tab === 'Requests' ? 'bg-white/20 text-white shadow-sm' : `${mutedTextColor} hover:${textColor}`}`}>
            Requests
            <span className="bg-emerald-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">1</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4 custom-scrollbar">
        {(tab === 'Discover' ? DUMMY_DISCOVER : DUMMY_REQUESTS).map((user) => (
          <div key={user.id} className={`flex items-center justify-between p-4 rounded-[1.25rem] border ${borderColor} ${hoverBg} transition-colors group`}>
            <div className="flex items-center gap-4 min-w-0 pr-4">
               <div className="w-[52px] h-[52px] shrink-0 rounded-[18px] flex items-center justify-center font-bold text-[#2d3a38] text-lg shadow-sm border border-white/10 group-hover:scale-105 transition-transform" style={{ backgroundColor: user.color }}>
                 {user.initials}
               </div>
               <div className="min-w-0">
                 <h4 className={`text-[15px] font-bold ${textColor} truncate`}>{user.name} <span className={`font-medium ${mutedTextColor} ml-1`}>{user.username}</span></h4>
                 <p className={`text-[13px] font-medium ${mutedTextColor} mt-0.5 max-w-[200px] truncate md:max-w-[400px]`}>{user.bio}</p>
               </div>
            </div>
            {tab === 'Discover' ? (
              <button className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${emeraldBg} ${emeraldText} shadow-sm active:scale-95 transition-transform`} title="Send Request">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </button>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button className={`px-4 py-2 rounded-xl ${emeraldBg} ${emeraldText} font-bold text-[13px] shadow-sm active:scale-95 transition-transform`}>
                  Accept
                </button>
                 <button className={`px-4 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-bold text-[13px] shadow-sm active:scale-95 transition-transform hidden md:block`}>
                  Decline
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function HistoryView() {
  const { panelBg, borderColor, textColor, mutedTextColor, hoverBg, emeraldBg, emeraldText } = useChatTheme();
  
  return (
    <section className={`flex-1 h-full min-w-0 flex flex-col z-20 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-sm mt-4 mr-4 mx-2 transition-colors duration-300 overflow-hidden`}>
      <header className={`h-[84px] shrink-0 flex items-center px-8 border-b ${borderColor}`}>
        <h2 className={`text-[16px] font-bold ${textColor}`}>Activity History</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 custom-scrollbar bg-black/5">
        
        {/* Mock History Timeline */}
        <div>
          <h3 className={`text-[13px] font-bold ${mutedTextColor} uppercase tracking-wider mb-4 px-2`}>Today</h3>
          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-white/10 before:to-transparent">
            
            <div className="relative flex items-center min-w-0 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1a1a1a] bg-emerald-500/20 text-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 mx-2 transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border ${borderColor} ${panelBg} shadow-sm min-w-0 pr-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer`}>
                    <div className="flex items-center justify-between space-x-2 mb-1 min-w-0">
                        <div className={`font-bold ${textColor} text-[14px] truncate`}>Voice Call with Wealth</div>
                        <time className={`font-medium ${emeraldText} text-[12px] shrink-0 ml-1`}>2:45pm</time>
                    </div>
                    <div className={`text-[13px] font-medium ${mutedTextColor}`}>Duration: 42 mins</div>
                </div>
            </div>

            <div className="relative flex items-center min-w-0 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1a1a1a] bg-blue-500/20 text-blue-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 mx-2 transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border ${borderColor} ${panelBg} shadow-sm min-w-0 pr-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer`}>
                    <div className="flex items-center justify-between space-x-2 mb-1 min-w-0">
                        <div className={`font-bold ${textColor} text-[14px] truncate`}>Accepted Friend Request</div>
                        <time className={`font-medium ${mutedTextColor} text-[12px] shrink-0 ml-1`}>10:02am</time>
                    </div>
                    <div className={`text-[13px] font-medium ${mutedTextColor} truncate`}>You and Blessing are now friends.</div>
                </div>
            </div>

            <div className="relative flex items-center min-w-0 md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#1a1a1a] bg-amber-500/20 text-amber-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 mx-2 transition-transform duration-300 group-hover:scale-110">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border ${borderColor} ${panelBg} shadow-sm min-w-0 pr-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer`}>
                    <div className="flex items-center justify-between space-x-2 mb-1 min-w-0">
                        <div className={`font-bold ${textColor} text-[14px] truncate`}>Unlocked New Background</div>
                        <time className={`font-medium ${mutedTextColor} text-[12px] shrink-0 ml-1`}>9:12am</time>
                    </div>
                    <div className={`text-[13px] font-medium ${mutedTextColor} truncate`}>Unlocked 'Interstellar Black Hole' for 1,000 EXP.</div>
                </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function RelaxWidget({ isVisible, onRestore }: { isVisible: boolean, onRestore: () => void }) {
  const { panelBg, borderColor, textColor, mutedTextColor, hoverBg, emeraldBg, emeraldText } = useChatTheme();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <div 
      className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
    >
      <div 
        onClick={onRestore}
        className={`pointer-events-auto flex flex-col items-center justify-center p-12 ${panelBg} backdrop-blur-3xl rounded-[3rem] border ${borderColor} shadow-2xl cursor-pointer group transition-transform hover:scale-105 active:scale-95`}
      >
        <div className={`text-6xl md:text-8xl font-black tracking-tighter ${textColor} mb-2`}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className={`text-lg md:text-xl font-medium ${mutedTextColor} mb-8 uppercase tracking-widest`}>
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
        
        <div className={`px-6 py-3 rounded-full flex items-center gap-3 bg-black/20 dark:bg-black/40 border ${borderColor} ${textColor}`}>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-sm tracking-wide">Take a break</span>
        </div>

        <div className={`absolute -bottom-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${emeraldBg} ${emeraldText} px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
          Click to Restore
        </div>
      </div>
    </div>
  );
}
