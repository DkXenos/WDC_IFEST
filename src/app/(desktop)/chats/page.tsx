"use client";

import { useState, useEffect, useMemo } from "react";

import { chats, currentUser } from "@/data/chats";
import ChatSidebar from "@/components/common/chats/ChatSidebar";
import ChatConversation from "@/components/common/chats/ChatConversation";
import { ChatThemeProvider, useChatTheme } from "@/components/common/chats/ChatThemeContext";

const navItems = [
  {
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    active: false,
  },
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
];

export default function ChatsPage() {
  return (
    <ChatThemeProvider>
      <ChatsPageContent />
    </ChatThemeProvider>
  );
}

function ChatsPageContent() {
  const { isDarkTheme, isBlurOn, setIsDarkTheme, setIsBlurOn, containerBg, panelBg, borderColor, textColor, hoverBg, mutedTextColor } = useChatTheme();
  const [isVideoOn, setIsVideoOn] = useState(true);
  
  // Navigation State
  const [activeNav, setActiveNav] = useState("Chats");

  // Chat State
  const [activeChatId, setActiveChatId] = useState("person-wealth");
  const activeChat = useMemo(() => chats.find(c => c.id === activeChatId) || chats[0], [activeChatId]);

  // Implement YouTube Iframe API to manually seek and prevent black frames.
  useEffect(() => {
    if (!isVideoOn) return;

    let player: any;
    let intervalId: NodeJS.Timeout;

    const initPlayer = () => {
      if (!(window as any).YT) return;
      
      player = new (window as any).YT.Player("yt-player", {
        videoId: "o4qjk8_5gmU",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          vq: "hd1080",
          playsinline: 1,
          loop: 1,
          playlist: "o4qjk8_5gmU", // Fallback for background tabs
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            intervalId = setInterval(() => {
              if (player && player.getCurrentTime) {
                const time = player.getCurrentTime();
                // Manually trigger loop right before the 7-second mark to bypass the black frame.
                if (time >= 6.8) {
                  player.seekTo(0);
                }
              }
            }, 50);
          },
        },
      });
    };

    if (!(window as any).YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      clearInterval(intervalId);
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    };
  }, [isVideoOn]);

  return (
    <main className={`fixed inset-0 flex z-0 overflow-hidden pt-[72px] pb-[88px] ${isVideoOn ? 'bg-black' : (isDarkTheme ? 'bg-neutral-800' : 'bg-[#E0C9B6]')} ${!isBlurOn ? 'disable-chat-blur' : ''} transition-colors duration-500`}>

      {/* Video Background Layer */}
      {isVideoOn && (
        <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-w-[177.77vh] min-h-[100vh] scale-[1.35] pointer-events-none">
            <div id="yt-player" className="w-full h-full pointer-events-none" />
          </div>
        </div>
      )}
      
      {/* Dark overlay for contrast */}
      {isVideoOn && (
        <div className={`absolute inset-0 z-[-1] pointer-events-none transition-colors duration-500 ${isDarkTheme ? 'bg-black/40' : 'bg-white/20'}`} />
      )}

      <div className="flex flex-col w-full h-full max-w-[1400px] mx-auto p-4 lg:p-6 pb-2 gap-4 relative z-10 transition-all duration-500">
        
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
          
        </header>

        {/* Main Glassmorphic Window Container */}
        <div className={`flex w-full flex-1 ${containerBg} border ${borderColor} rounded-[2rem] shadow-2xl overflow-hidden p-2 gap-2 transition-all duration-300 relative z-10 -mt-2`}>
          
          {/* ─ Vertical Nav Strip ─ */}
          <nav className={`w-24 shrink-0 h-full flex flex-col items-center py-6 gap-5 ${panelBg} rounded-[1.5rem] border ${borderColor} shadow-inner transition-colors duration-300`}>
            
            {/* User avatar */}
            <div className="relative mb-4">
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
              className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center ${mutedTextColor} hover:${textColor} ${hoverBg} border border-transparent hover:${borderColor} mt-auto transition-all`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </button>
          </nav>

          {/* ─ Sidebar (Groups / Person) ─ */}
          <ChatSidebar activeChatId={activeChatId} onSelectChat={setActiveChatId} />

          {/* ─ Conversation Area ─ */}
          <ChatConversation chat={activeChat} />

        </div>
      </div>
    </main>
  );
}
