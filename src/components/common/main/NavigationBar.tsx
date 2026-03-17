"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosNotifications, IoIosNotificationsOff } from "react-icons/io";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { FiFolder, FiImage, FiFileText, FiVideo, FiSearch } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";

const MOCK_FILES = [
  { id: 1, name: "Project Proposal.pdf", type: "pdf", icon: FiFileText, date: "Today, 10:24 AM", size: "2.4 MB" },
  { id: 2, name: "UI Architecture.fig", type: "design", icon: FiImage, date: "Yesterday, 3:15 PM", size: "15.8 MB" },
  { id: 3, name: "Meeting Notes.docx", type: "doc", icon: FiFileText, date: "Oct 12, 2026", size: "12 KB" },
  { id: 4, name: "Demo Recording.mp4", type: "video", icon: FiVideo, date: "Oct 10, 2026", size: "142.5 MB" },
  { id: 5, name: "Assets", type: "folder", icon: FiFolder, date: "Oct 8, 2026", size: "--" },
  { id: 6, name: "Client Logo.png", type: "image", icon: FiImage, date: "Oct 5, 2026", size: "4.1 MB" },
];

export default function NavigationBar() {
  const { 
    borderColor, textColor, mutedTextColor,
    panelBg, hoverBg, activeBg 
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
    {
      title: "EDIT",
      href: "/about",
    },
    {
      title: "CONTACT",
      href: "/contact",
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
    {
      title: "10.00 AM",
      href: "",
    },
  ];

  const [clickedStates, setClickedStates] = useState<boolean[]>(
    rightNavLinksData.map(() => false)
  );

  const toggleClicked = (index: number) => {
    setClickedStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };
  return (
    <nav className="flex z-100 px-6 py-1 text-card fixed top-0 w-screen justify-between font-bold items-center gap-4">
      <div className="flex items-center gap-4">
        {leftNavLinks.map((link) => {
          if (link.title === "FILE") {
            return (
              <Dialog key={link.title}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity uppercase">
                    {link.title}
                  </button>
                </DialogTrigger>
                <DialogContent showCloseButton={false} className={`max-w-4xl sm:max-w-[900px] p-0 overflow-hidden border ${borderColor} ${panelBg} rounded-2xl shadow-2xl`}>
                  <DialogTitle className="sr-only">Files Explorer</DialogTitle>
                  
                  {/* Window Content */}
                  <div className="flex w-full h-[550px] overflow-hidden">
                    {/* Sidebar */}
                    <div className={`w-56 shrink-0 border-r ${borderColor} bg-white/20 dark:bg-black/20 flex flex-col overflow-y-auto`}>
                      {/* Mac OS Window Controls */}
                      <div className="flex items-center gap-2 px-5 py-5 sticky top-0 z-10 w-full mb-2">
                         <DialogClose asChild>
                           <button aria-label="Close" className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 shadow-sm border border-black/10 transition-colors" />
                         </DialogClose>
                         <button aria-label="Minimize" className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 shadow-sm border border-black/10 transition-colors" />
                         <button aria-label="Maximize" className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 shadow-sm border border-black/10 transition-colors" />
                      </div>

                      <div className="px-3 pb-6 flex flex-col gap-1">
                        <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-1 mb-1`}>Favorites</div>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${activeBg} shadow-sm ${textColor}`}>
                          <FiSearch size={14} className="text-blue-500" /> Recents
                        </button>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <FiFolder size={14} className="text-blue-500" /> Desktop
                        </button>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <FiFolder size={14} className="text-blue-500" /> Documents
                        </button>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <FiFolder size={14} className="text-blue-500" /> Downloads
                        </button>
                        
                        <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-4 mb-1`}>Tags</div>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-sm" /> Important
                        </button>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-sm" /> Work
                        </button>
                        <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-sm" /> Personal
                        </button>
                      </div>
                    </div>

                    {/* Main File View */}
                    <div className={`flex-1 flex flex-col overflow-hidden bg-white/40 dark:bg-black/40`}>
                      {/* Top Bar for Main Content */}
                      <div className={`flex items-center justify-between border-b ${borderColor} px-6 py-4 h-[60px] shrink-0`}>
                        <div className="flex items-center gap-4">
                          <span className={`font-semibold text-lg tracking-tight ${textColor}`}>Recents</span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${borderColor} bg-white/50 dark:bg-black/40 ${mutedTextColor} shadow-sm`}>
                          <FiSearch size={14} />
                          <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-transparent border-none outline-none text-[13px] w-44 placeholder:text-current font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6">
                        <div className={`grid grid-cols-5 gap-4 mb-3 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} px-3`}>
                          <div className="col-span-2">Name</div>
                          <div>Date Modified</div>
                          <div>Size</div>
                          <div>Kind</div>
                        </div>

                        <div className="flex flex-col gap-1">
                          {MOCK_FILES.map((file) => (
                            <div 
                              key={file.id} 
                              className={`grid grid-cols-5 items-center gap-4 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${hoverBg} group`}
                            >
                              <div className="col-span-2 flex items-center gap-3">
                                <file.icon size={18} className={`shrink-0 ${file.type === 'folder' ? 'text-blue-400 fill-blue-400/20' : file.type === 'pdf' ? 'text-red-400' : 'text-neutral-400'}`} />
                                <span className={`text-[13px] font-medium truncate ${textColor}`}>{file.name}</span>
                              </div>
                              <div className={`text-[12px] font-medium ${mutedTextColor} truncate`}>{file.date}</div>
                              <div className={`text-[12px] font-medium ${mutedTextColor}`}>{file.size}</div>
                              <div className={`text-[12px] font-medium ${mutedTextColor} uppercase`}>{file.type}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          }

          return (
            <Link
              className="flex items-center gap-2 uppercase hover:opacity-80 transition-opacity"
              key={link.title}
              href={link.href}
            >
              {link.icon && (
                <Image src={link.icon} alt={link.title} width={24} height={24} />
              )}
              {link.title}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        {middleNavLinks.map((link) => (
          <Link
            className="flex items-center gap-2"
            key={link.title}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        {rightNavLinksData.map((link, index) =>
          link.icon ? (
            <button
              className="flex items-center gap-2 cursor-pointer"
              key={link.title || index}
              onClick={() => toggleClicked(index)}
            >
              {clickedStates[index] ? link.iconClicked : link.icon}
            </button>
          ) : (
            <Link
              className="flex items-center gap-2"
              key={link.title || index}
              href={link.href}
            >
              {link.title}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
