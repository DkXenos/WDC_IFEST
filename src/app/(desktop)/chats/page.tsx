"use client";

import { activeChat } from "@/data/chats";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatSidebar from "@/components/common/chats/ChatSidebar";
import ChatConversation from "@/components/common/chats/ChatConversation";

export default function ChatsPage() {
  return (
    <TooltipProvider>
      <div className="flex h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 relative">
        {/* Base dark backdrop for HSR theme */}
        <div className="absolute inset-0 bg-[#141518] -z-10" />
        {/* Optional decorative background effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1c23] to-[#252836] opacity-50 -z-10" />

        {/* Main Container - HSR Style Modal */}
        <div className="flex w-full max-w-6xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#101115]/60 text-white shadow-2xl backdrop-blur-md">
          
          {/* Navigation strip */}
          <nav className="flex flex-col items-center gap-4 py-6 px-4 border-r border-white/10 bg-black/20 shrink-0">
            <Avatar className="size-10 mb-4 shadow-sm border border-white/20 bg-[#1a1c20]">
              <AvatarFallback className="text-white text-xs font-bold bg-transparent">
                ZY
              </AvatarFallback>
            </Avatar>

            {/* Home */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-12 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105" aria-label="Home">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1c20] text-gray-200 border-white/10">Home</TooltipContent>
            </Tooltip>

            {/* Chat (active) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-12 rounded-2xl shadow-sm text-black bg-[#d5b880] hover:bg-[#ebd09b] transition-all hover:scale-105" aria-label="Chats">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1c20] text-gray-200 border-white/10">Chats</TooltipContent>
            </Tooltip>

            {/* Notifications */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-12 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105" aria-label="Notifications">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1c20] text-gray-200 border-white/10">Notifications</TooltipContent>
            </Tooltip>

            {/* Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-12 rounded-2xl text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105 mt-auto" aria-label="Settings">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-[#1a1c20] text-gray-200 border-white/10">Settings</TooltipContent>
            </Tooltip>
          </nav>

          {/* Sidebar */}
          <ChatSidebar activeChatId={activeChat.id} />

          {/* Conversation */}
          <ChatConversation chat={activeChat} />
          
        </div>
      </div>
    </TooltipProvider>
  );
}
