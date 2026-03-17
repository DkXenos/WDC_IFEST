"use client";

import VideoScroll from "@/components/VideoScroll";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <VideoScroll videoSrc="/video/MonitorOpening.mp4" />
    </main>
  );
}
