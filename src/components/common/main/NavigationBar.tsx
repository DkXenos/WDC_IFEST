"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";

export default function NavigationBar() {
  const { 
    containerBg, borderColor, textColor, mutedTextColor,
    hoverBg
  } = useChatTheme();
  const leftNavLinks = [
    {
      title: "WeLearn",
      href: "/",
      icon: "/icons/app-icon.svg",
    },
    {
      title: "FILE",
      href: "/",
    },
  ];
  const middleNavLinks = [
    {
      title: "🔥 7 DAYS",
      href: "/",
    },
    {
      title: "LEVEL 1 (240/100) XP",
      href: "/",
    },
    {
      title: "🪙 120.5K",
      href: "/",
    },
  ];
  const rightNavLinksData = [
    {
      title: "",
      href: "",
      icon: <FaCirclePlay />,
      iconClicked: <FaCirclePlay />,
    },
    {
      title: "",
      href: "",
      icon: <IoIosNotifications />,
      iconClicked: <IoIosNotificationsOff />,
    },
  ];

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const wibClock = useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(now);

    const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
    const day = parts.find((part) => part.type === "day")?.value ?? "";
    const month = parts.find((part) => part.type === "month")?.value ?? "";
    const hour = parts.find((part) => part.type === "hour")?.value ?? "";
    const minute = parts.find((part) => part.type === "minute")?.value ?? "";

    return `${weekday} ${day} ${month} ${hour}.${minute}`;
  }, [now]);

  const [clickedStates, setClickedStates] = useState<boolean[]>(
    rightNavLinksData.map(() => false)
  );

  const toggleClicked = (index: number) => {
    setClickedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 px-3 py-2 sm:px-6 sm:py-2.5">
      <div className={`mx-auto flex w-full max-w-400 items-center justify-between gap-2 rounded-2xl border ${borderColor} ${containerBg} px-3 py-2 shadow-xl backdrop-blur-sm sm:gap-4 sm:px-4`}>
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        {leftNavLinks.map((link) => {
          if (link.title === "FILE") {
            return (
              <DropdownMenu key={link.title}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-2 rounded-md px-2 py-1 text-[11px] font-bold tracking-wider transition-colors uppercase sm:text-xs ${textColor} ${hoverBg}`}
                  >
                    {link.title}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={8}
                  className="w-72 rounded-3xl border border-white/15 bg-neutral-900/80 p-2.5 text-neutral-200 shadow-2xl backdrop-blur-2xl"
                >
                  <DropdownMenuItem className="rounded-xl px-4 py-0.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    New Tab
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    New Window
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    New Incognito Window
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Reopen Closed Tab
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Open File...
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Open Location...
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-white/20" />
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Close Window
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Close Tab
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Save Page As...
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500"></DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-white/20" />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                      Share
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-52 rounded-2xl border border-white/15 bg-neutral-900/90 p-1.5 text-neutral-200 shadow-xl backdrop-blur-2xl">
                      <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm font-medium focus:bg-white/10 focus:text-white">Copy Link</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg px-3 py-2 text-sm font-medium focus:bg-white/10 focus:text-white">Send to Friends</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator className="my-2 bg-white/20" />
                  <DropdownMenuItem className="rounded-xl px-4 py-2.5 text-lg font-semibold focus:bg-white/10 focus:text-white">
                    Print...
                    <DropdownMenuShortcut className="text-base tracking-normal text-neutral-500">⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          return (
            <Link
              className={`flex items-center gap-2 rounded-md px-1.5 py-1 text-xs font-bold tracking-wide uppercase transition-opacity hover:opacity-80 ${textColor}`}
              key={link.title}
              href={link.href}
            >
              {link.icon && (
                <Image src={link.icon} alt={link.title} width={24} height={24} />
              )}
              <span className="hidden sm:inline">{link.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="hidden lg:flex items-center gap-4">
        {middleNavLinks.map((link) => (
          <Link
            className={`flex items-center gap-2 text-xs xl:text-sm ${textColor}`}
            key={link.title}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {rightNavLinksData.map((link, index) =>
          link.icon ? (
            <button
              className={`flex items-center gap-2 cursor-pointer rounded-full p-1.5 transition-colors ${hoverBg} ${textColor}`}
              key={link.title || index}
              onClick={() => toggleClicked(index)}
            >
              {clickedStates[index] ? link.iconClicked : link.icon}
            </button>
          ) : null
        )}
        <span className={`flex items-center gap-2 text-[11px] sm:text-sm font-semibold ${textColor}`}>
          {wibClock}
        </span>
      </div>
      </div>
    </nav>
  );
}
