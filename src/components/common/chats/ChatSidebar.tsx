"use client";

import { useState } from "react";

import { chats } from "@/data/chats";
import ChatListItem from "./ChatListItem";
import { useChatTheme } from "./ChatThemeContext";

interface ChatSidebarProps {
  activeChatId: string;
  onSelectChat: (id: string) => void;
}

export default function ChatSidebar({ activeChatId, onSelectChat }: ChatSidebarProps) {
  const [activeTab, setActiveTab] = useState<"person" | "groups">("person");
  const groupChats = chats.filter((c) => c.type === "group");
  const personChats = chats.filter((c) => c.type === "person");
  const { panelBg, borderColor, textColor, mutedTextColor, emeraldBg, emeraldText } = useChatTheme();

  return (
    <aside className="w-[360px] shrink-0 h-full flex flex-col bg-transparent relative z-10 mr-4">
      
      {/* Search Header */}
      <header className="px-6 py-6 shrink-0">
        <div className="relative">
          <svg
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${mutedTextColor} w-4 h-4`}
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
            className={`w-full h-11 pl-11 pr-4 ${panelBg} border ${borderColor} rounded-full text-[14px] ${textColor} font-medium placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 transition-all shadow-sm`}
            placeholder="Search"
            readOnly
          />
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 pb-4 shrink-0">
        <div className={`p-1 flex items-center ${panelBg} border ${borderColor} rounded-2xl transition-colors duration-300`}>
          <button 
            onClick={() => setActiveTab('groups')}
            className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[12px] transition-all ${activeTab === 'groups' ? `${emeraldBg} ${emeraldText} shadow-sm border` : `${mutedTextColor} hover:${textColor} border border-transparent`}`}
          >
            Groups
          </button>
          <button 
            onClick={() => setActiveTab('person')}
            className={`flex-1 py-1.5 text-[13px] font-semibold rounded-[12px] transition-all ${activeTab === 'person' ? `${emeraldBg} ${emeraldText} shadow-sm border` : `${mutedTextColor} hover:${textColor} border border-transparent`}`}
          >
            Person
          </button>
        </div>
      </div>

      {/* Scrollable Lists */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        
        {activeTab === "groups" && (
          <div className="flex flex-col gap-1 fade-in">
            {groupChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onClick={() => onSelectChat(chat.id)}
              />
            ))}
          </div>
        )}

        {activeTab === "person" && (
          <div className="flex flex-col gap-1 fade-in">
            {personChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
                onClick={() => onSelectChat(chat.id)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
