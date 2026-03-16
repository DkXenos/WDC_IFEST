"use client";

import { chats } from "@/data/chats";
import ChatListItem from "./ChatListItem";

interface ChatSidebarProps {
  activeChatId: string;
}

export default function ChatSidebar({ activeChatId }: ChatSidebarProps) {
  const groupChats = chats.filter((c) => c.type === "group");
  const personChats = chats.filter((c) => c.type === "person");

  return (
    <aside className="w-[360px] shrink-0 h-full flex flex-col bg-transparent relative z-10 mr-4">
      
      {/* Search Header */}
      <header className="px-6 py-6 shrink-0">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5a7a75] w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            className="w-full h-11 pl-11 pr-4 bg-black/30 backdrop-blur-md border border-white/10 rounded-full text-[14px] text-white font-medium placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-black/50 transition-all shadow-sm"
            placeholder="Search"
            readOnly
          />
        </div>
      </header>

      {/* Scrollable Lists */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 custom-scrollbar">
        
        {/* Groups */}
        <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-3 shadow-sm">
          <h3 className="text-[13px] font-semibold text-white/80 mb-3 px-3 tracking-wide capitalize">
            Groups
          </h3>
          <div className="flex flex-col gap-1">
            {groupChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
              />
            ))}
          </div>
        </section>

        {/* Person */}
        <section className="bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-3 shadow-sm">
          <h3 className="text-[13px] font-semibold text-white/80 mb-3 px-3 tracking-wide capitalize">
            Person
          </h3>
          <div className="flex flex-col gap-1">
            {personChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
              />
            ))}
          </div>
        </section>

      </div>
    </aside>
  );
}
