"use client";

import VideoScroll from "@/components/VideoScroll";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <VideoScroll videoSrc="/video/WeLearnIntro.mp4" />
    </main>
  );
}
