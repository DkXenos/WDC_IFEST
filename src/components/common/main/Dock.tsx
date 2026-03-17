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
  FiCpu,
  FiClock,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useWindows, WindowID } from "./WindowContext";

type DockItem =
  | { icon: React.ElementType; label: string; href: string }
  | { icon: React.ElementType; label: string; id: WindowID };

const dockItems: DockItem[] = [
  { icon: FiHome, label: "Home", href: "/desktop" },
  { icon: FiMessageSquare, label: "Chats", id: "chats" },
  { icon: FiCpu, label: "AI Notes", id: "notes" },
  { icon: FiClock, label: "Focus", id: "timer" },
  { icon: FiTarget, label: "Quests", id: "tasks" },
  { icon: FiUsers, label: "Forum", id: "forum" },
  { icon: FiCalendar, label: "Calendar", id: "calendar" },
  { icon: FiFolder, label: "Files", id: "files" },
  { icon: FiUser, label: "Profile", id: "profile" },
  { icon: FiSettings, label: "Settings", id: "settings" },
];

export default function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { toggleWindow, isWindowOpen } = useWindows();

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
                <TooltipTrigger asChild>
                  <Link
                    href={"href" in item ? item.href : "#"}
                    className="group relative flex flex-col items-center justify-end"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onClick={(e) => {
                      if ("id" in item) {
                        e.preventDefault();
                        toggleWindow(item.id);
                      }
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
                        "id" in item && isWindowOpen(item.id) ? "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-black" : ""
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
                          "id" in item && isWindowOpen(item.id) ? "text-emerald-500" : ""
                        )}
                      />
                    </div>
                  </Link>
                </TooltipTrigger>
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
