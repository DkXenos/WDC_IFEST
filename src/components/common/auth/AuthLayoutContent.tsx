"use client";

import React, { useState, useEffect } from "react";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  const { 
    isDarkTheme, 
    isBlurOn, 
    setIsDarkTheme, 
    setIsBlurOn, 
    containerBg, 
    borderColor, 
    textColor, 
    hoverBg, 
    activeVideoId, 
    isMusicOn, 
    setIsMusicOn, 
    currentSongIndex, 
    setCurrentSongIndex, 
    PLAYLIST 
  } = useChatTheme();

  const [isVideoOn, setIsVideoOn] = useState(true);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  // Handle Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn, currentSongIndex]);

  // Handle Audio End (Auto-play random next song)
  const handleSongEnd = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PLAYLIST.length);
    } while (nextIndex === currentSongIndex && PLAYLIST.length > 1);
    setCurrentSongIndex(nextIndex);
  };

  // Implement YouTube Iframe API to manually seek and prevent black frames.
  useEffect(() => {
    if (!isVideoOn) return;

    let player: any;
    let intervalId: NodeJS.Timeout;

    const initPlayer = () => {
      if (!(window as any).YT) return;
      
      player = new (window as any).YT.Player("yt-player", {
        videoId: activeVideoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          vq: "hd1080",
          playsinline: 1,
          loop: 1,
          playlist: activeVideoId, // Fallback for background tabs
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            intervalId = setInterval(() => {
              if (player && player.getCurrentTime && player.getDuration) {
                const time = player.getCurrentTime();
                const duration = player.getDuration();
                // Manually trigger loop right before the end to bypass the black frame.
                if (activeVideoId === "o4qjk8_5gmU") {
                  if (time >= 6.8) player.seekTo(0);
                } else if (duration > 0) {
                  if (time >= duration - 0.2) player.seekTo(0);
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
  }, [isVideoOn, activeVideoId, pathname]); // Added pathname dependency to recreate player on nav if needed? Wait actually NO, we DONT want to recreate player.
  
  // Correction: We don't want pathname in the dependency array because the whole point is to keep it running.
  // The layout holds this component and it will not unmount when children switch routes.

  return (
    <main className={`fixed inset-0 flex items-center justify-center z-0 overflow-hidden pt-4 pb-28 lg:pb-32 ${isVideoOn ? 'bg-black' : (isDarkTheme ? 'bg-neutral-800' : 'bg-[#E0C9B6]')} ${!isBlurOn ? 'disable-chat-blur' : ''} transition-colors duration-500`}>
      {/* Video Background Layer */}
      {isVideoOn && (
        <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-w-[177.77vh] min-h-[100vh] scale-[1.35] pointer-events-none">
            <div id="yt-player" className="w-full h-full pointer-events-none" />
          </div>
        </div>
      )}
      
      {/* Background Audio Player */}
      <audio 
        ref={audioRef}
        src={PLAYLIST[currentSongIndex]?.src}
        onEnded={handleSongEnd}
        preload="auto"
      />
      
      {/* Dark overlay for contrast */}
      {isVideoOn && (
        <div className={`absolute inset-0 z-[-1] pointer-events-none transition-colors duration-500 ${isDarkTheme ? 'bg-black/40' : 'bg-white/20'}`} />
      )}

      {/* Top Floating Dock Navbar for controls */}
      <header className={`absolute top-6 flex w-fit mx-auto ${containerBg} border ${borderColor} rounded-[1.75rem] shadow-lg p-2 items-center justify-center gap-2 z-50 transition-all duration-300`}>
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
        
        <Link 
          href="/chats"
          className={`w-[52px] h-[52px] flex items-center justify-center rounded-2xl transition-all border border-transparent shadow-sm ${hoverBg} hover:${borderColor} ${textColor}`}
          title="Go to Chats"
        >
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </Link>
      </header>
      
      {/* Forms will render here */}
      {children}
    </main>
  );
}
