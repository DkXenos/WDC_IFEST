"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Customizable video source path
const VIDEO_SRC = "/video/openingAnimation.mp4";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current || isFadingOut) return;

      // Calculate how far down the user has scrolled relative to the total scrollable space
      const scrollY = window.scrollY;
      const maxScroll = containerRef.current.scrollHeight - window.innerHeight;
      
      let scrollFraction = scrollY / maxScroll;
      // Clamp between 0 and 1
      scrollFraction = Math.max(0, Math.min(scrollFraction, 1));
      
      const videoDuration = videoRef.current.duration;
      // If duration is loaded and valid, sync the video time to the scroll progress
      if (!isNaN(videoDuration) && videoDuration > 0) {
        videoRef.current.currentTime = videoDuration * scrollFraction;
      }

      // Trigger fade out when reaching the very end (allowing a small decimal margin)
      if (scrollFraction >= 0.99) {
        setIsFadingOut(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call to set state if user lands halfway down the page
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFadingOut]);

  // Handle the redirect after fade out starts
  useEffect(() => {
    if (isFadingOut) {
      // Wait for the 1s CSS transition to finish before navigating
      const timer = setTimeout(() => {
        router.push("/desktop");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, router]);

  return (
    // Increase height to allow scrolling (300vh gives a good amount of scroll space for the video duration)
    <main 
      ref={containerRef}
      className={`relative w-full h-[350vh] transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Sticky container holds the video fixed to viewport while page scrolls */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          className="w-full h-full object-cover pointer-events-none"
          preload="metadata"
          muted
          playsInline
        />
        
        {/* Helper text overlay indicating scroll action */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-[0.2em] uppercase flex flex-col items-center gap-2 animate-pulse pointer-events-none">
          <span>Scroll down to continue</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </main>
  );
}
