"use client";

import { chats } from "@/data/chats";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ChatListItem from "./ChatListItem";

interface ChatSidebarProps {
  activeChatId: string;
}

export default function ChatSidebar({ activeChatId }: ChatSidebarProps) {
  const groupChats = chats.filter((c) => c.type === "group");
  const personChats = chats.filter((c) => c.type === "person");

  return (
    <aside className="w-[320px] flex flex-col border-r border-white/20 bg-white/10 shrink-0">
      
      {/* Search Header */}
      <div className="p-6 pb-2">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <Input
            type="text"
            className="w-full h-11 pl-11 bg-black/20 hover:bg-black/30 text-white placeholder:text-white/60 border-none rounded-2xl shadow-inner transition-colors focus-visible:ring-1 focus-visible:ring-white/30"
            placeholder="Search"
            readOnly
          />
        </div>
      </div>

      {/* Scrollable list */}
      <ScrollArea className="flex-1">
        <div className="p-6 pt-4 flex flex-col gap-6">
          
          {/* Groups */}
          <section>
            <h3 className="text-[14px] font-semibold text-white/90 mb-3 px-1 tracking-wide">Groups</h3>
            <div className="flex flex-col gap-2 bg-black/10 p-2.5 rounded-[1.5rem] border border-white/10 shadow-sm backdrop-blur-md">
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
            <h3 className="text-[14px] font-semibold text-white/90 mb-3 px-1 tracking-wide">Person</h3>
            <div className="flex flex-col gap-2 bg-black/10 p-2.5 rounded-[1.5rem] border border-white/10 shadow-sm backdrop-blur-md">
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
      </ScrollArea>
      
    </aside>
  );
}
