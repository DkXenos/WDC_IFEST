"use client";

import { Chat, getChatUser } from "@/data/chats";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./ChatBubble";

interface ChatConversationProps {
  chat: Chat;
}

export default function ChatConversation({ chat }: ChatConversationProps) {
  const user = getChatUser(chat);

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-black/40">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white tracking-wide m-0">{chat.name}</h2>
          <div className="h-0.5 w-6 bg-white/20 ml-2" />
        </div>
        <div className="flex gap-2">
          {/* More Menu */}
          <button className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white" aria-label="More options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </button>
          
          <button className="flex shrink-0 items-center justify-center w-8 h-8 rounded-full bg-transparent hover:bg-white/10 transition-colors text-white" aria-label="Close">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-6 pr-8">
          {chat.messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg}
              isSent={msg.senderId === "me"}
              sender={msg.senderId === "me" ? null : user}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Input bar */}
      <div className="p-4 shrink-0 pb-6">
        <div className="flex items-center gap-3 bg-black/60 border border-white/20 rounded-full p-1 pl-4 h-[52px]">
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-gray-500"
            placeholder="|"
            readOnly
          />
          
          <button className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-white hover:bg-white/10 transition-colors" aria-label="Emoji">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>
          
          <button className="shrink-0 px-6 h-10 rounded-full bg-gray-100 font-bold text-black text-sm hover:bg-white transition-all">
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
