"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrollProps {
  videoSrc?: string;
}

export default function VideoScroll({ 
  videoSrc = "/video/WeLearnIntro.mp4" 
}: VideoScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    if (!video) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        if (video.readyState >= 2) {
          video.currentTime = progress * video.duration;
        }

        if (progress >= 0.85) {
          const fadeProgress = Math.min((progress - 0.85) / 0.10, 1);
          setFadeOpacity(fadeProgress);
        } else {
          setFadeOpacity(0);
        }

        if (progress >= 0.98 && !isDone) {
          setIsDone(true);
        }
      },
    });

    return () => {
      trigger.kill();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mounted, isDone]);

  useEffect(() => {
    if (isDone) {
      const timer = setTimeout(() => {
        router.push("/sign-in");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isDone, router]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "500vh" }}
    >
      <div className="fixed inset-0 z-10 overflow-hidden">
        <AnimatePresence>
          {!isDone && (
            <motion.div
              key="video-content"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full relative"
            >
              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover pointer-events-none"
                preload="auto"
                muted
                playsInline
              />

              <div 
                className="absolute inset-0 bg-background pointer-events-none transition-opacity duration-150 ease-out"
                style={{ opacity: fadeOpacity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 pointer-events-none"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase font-light text-white/40">
              Scroll to explore
            </span>
            
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
