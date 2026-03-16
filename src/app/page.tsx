"use client";

import VideoScroll from "@/components/VideoScroll";

export default function Home() {
  return (
    <main className="relative w-full bg-black">
      <VideoScroll videoSrc="/video/CozyRoom.mp4" />
    </main>
  );
}
