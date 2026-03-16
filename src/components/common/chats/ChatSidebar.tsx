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
    <aside className="w-[360px] shrink-0 h-full flex flex-col bg-[#D0E7D2] border-r border-[#C7DCC4]/60 relative z-10">
      
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
            className="w-full h-11 pl-11 pr-4 bg-white/40 border border-[#C7DCC4] rounded-2xl text-[14px] text-[#2d3a38] font-medium placeholder:text-[#5a7a75] focus:outline-none focus:ring-2 focus:ring-[#C7DCC4] focus:bg-white/60 transition-all shadow-sm"
            placeholder="Search"
            readOnly
          />
        </div>
      </header>

      {/* Scrollable Lists */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-8 custom-scrollbar">
        
        {/* Groups */}
        <section>
          <h3 className="text-xs font-bold text-[#5a7a75] mb-3 px-2 tracking-wider uppercase">
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
        <section>
          <h3 className="text-xs font-bold text-[#5a7a75] mb-3 px-2 tracking-wider uppercase">
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
