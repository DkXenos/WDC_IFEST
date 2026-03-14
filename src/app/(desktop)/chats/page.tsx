"use client";

import { activeChat } from "@/data/chats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      {/* Background container */}
      <div className="flex h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 relative justify-center items-center">
        
        {/* Soft Leafy Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b3a37] via-[#2c4e4c] to-[#122b2a] -z-20" />
        {/* Abstract shapes/blur to mimic the leafy reference */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3a6864]/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#224440]/40 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

        {/* Main Glassmorphic Container */}
        <div className="flex w-full max-w-7xl h-full max-h-[900px] mx-auto rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl">
          
          {/* Vertical Navigation Strip (Leftmost) */}
          <nav className="flex flex-col items-center gap-6 py-6 px-4 w-20 border-r border-[#ffffff15] shrink-0 bg-black/10">
            {/* User Avatar */}
            <div className="relative mb-4">
              <Avatar className="size-12 rounded-xl shadow-lg border-2 border-transparent bg-white/10">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <AvatarFallback className="text-white text-xs font-bold bg-transparent">
                  YO
                </AvatarFallback>
              </Avatar>
              {/* Online Indicator Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6cce74] rounded-full border-2 border-[#2b4c4a]" />
            </div>

            {/* Nav Icons */}
            <div className="flex flex-col gap-2 flex-1 w-full items-center">
              {/* Home */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-12 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105" aria-label="Home">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white/20 backdrop-blur-md text-white border-white/10">Home</TooltipContent>
              </Tooltip>

              {/* Chat (active) */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-12 rounded-xl shadow-sm text-black bg-white/90 hover:bg-white transition-all hover:scale-105" aria-label="Chats">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white/20 backdrop-blur-md text-white border-white/10">Chats</TooltipContent>
              </Tooltip>

              {/* Notifications */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-12 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105" aria-label="Notifications">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white/20 backdrop-blur-md text-white border-white/10">Notifications</TooltipContent>
              </Tooltip>

              {/* Settings */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-12 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all hover:scale-105" aria-label="Settings">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white/20 backdrop-blur-md text-white border-white/10">Settings</TooltipContent>
              </Tooltip>
            </div>

            {/* Logout/Power */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-12 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all hover:scale-105 mt-auto" aria-label="Logout">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-white/20 backdrop-blur-md text-white border-white/10">Logout</TooltipContent>
            </Tooltip>
          </nav>

          {/* Sidebar Area */}
          <ChatSidebar activeChatId={activeChat.id} />

          {/* Conversation Area */}
          <ChatConversation chat={activeChat} />
          
        </div>
      </div>
    </TooltipProvider>
  );
}
