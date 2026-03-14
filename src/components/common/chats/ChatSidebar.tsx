"use client";

import { chats } from "@/data/chats";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatListItem from "./ChatListItem";

interface ChatSidebarProps {
  activeChatId: string;
}

export default function ChatSidebar({ activeChatId }: ChatSidebarProps) {
  const allChats = chats;

  return (
    <aside className="w-[300px] flex flex-col border-r border-white/10 bg-black/20 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 pb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d5b880" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
        <h2 className="text-lg font-bold tracking-wide text-[#d5b880]">Chats</h2>
      </div>

      {/* Scrollable list */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 pb-4 px-3 pr-4">
          {allChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer / User Profile Area */}
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-[#1a1c20] hover:bg-[#25282f] text-white py-2.5 rounded-full border border-white/10 transition-colors text-sm font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Start Chat
          </button>
          <button className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-[#1a1c20] border border-white/10 hover:bg-[#25282f] transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M2 15h10" />
              <path d="m9 18 3-3-3-3" />
            </svg>
          </button>
        </div>
        <div className="mt-4 text-[10px] text-white/40 tracking-wider">
          UID:702941119
        </div>
      </div>
    </aside>
  );
}
