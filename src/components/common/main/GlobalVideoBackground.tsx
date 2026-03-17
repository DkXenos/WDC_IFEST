"use client";

import React, { useEffect } from "react";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { usePathname } from "next/navigation";

export default function GlobalVideoBackground() {
  const { 
    isDarkTheme, 
    isBlurOn, 
    activeVideoId, 
    isMusicOn, 
    currentSongIndex, 
    setCurrentSongIndex, 
    PLAYLIST,
    isVideoOn
  } = useChatTheme();

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  // If we are on the landing page, we completely hide this background since
  // the landing page uses its own VideoScroll background
  const isLandingPage = pathname === "/";

  // Handle Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn && !isLandingPage) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn, currentSongIndex, isLandingPage]);

  // Handle Audio End (Auto-play random next song)
  const handleSongEnd = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PLAYLIST.length);
    } while (nextIndex === currentSongIndex && PLAYLIST.length > 1);
    setCurrentSongIndex(nextIndex);
  };

  // Implement YouTube Iframe API.
  // Note: we do not add pathname as a dependency heavily here because we want
  // the player to remain alive and persistent in the DOM, so that transitions 
  // Note: we add `isLandingPage` closely here so that if the user starts on `/`
  // and manually routes to `/chats`, this hook natively fires and creates the player properly!
  useEffect(() => {
    if (!isVideoOn || isLandingPage) return;

    let player: any;
    let intervalId: NodeJS.Timeout;

    const initPlayer = () => {
      if (!(window as any).YT) return;
      
      player = new (window as any).YT.Player("global-yt-player", {
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
  }, [isVideoOn, activeVideoId, isLandingPage]);

  if (isLandingPage) return null;

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${isVideoOn ? 'bg-black' : (isDarkTheme ? 'bg-neutral-800' : 'bg-[#E0C9B6]')} ${!isBlurOn ? 'disable-chat-blur' : ''} transition-colors duration-500`}>
      {/* Video Background Layer */}
      {isVideoOn && (
        <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-w-[177.77vh] min-h-screen scale-[1.35] pointer-events-none">
            <div id="global-yt-player" className="w-full h-full pointer-events-none" />
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
    </div>
  );
}
