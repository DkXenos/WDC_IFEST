"use client";

import { Chat, getChatUser } from "@/data/chats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatBubble from "./ChatBubble";

interface ChatConversationProps {
  chat: Chat;
}

export default function ChatConversation({ chat }: ChatConversationProps) {
  const user = getChatUser(chat);

  return (
    <section className="flex-1 flex flex-col min-w-0 bg-transparent p-6 gap-4">
      
      {/* Header Container */}
      <header className="flex justify-between items-center px-5 py-3 rounded-3xl bg-white/20 border border-white/20 shadow-sm backdrop-blur-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="size-10 shadow-sm rounded-full">
              {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
              <AvatarFallback
                className="text-white text-xs font-bold"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </AvatarFallback>
            </Avatar>
            {user.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#6cce74] rounded-full border-2 border-white/40 z-10" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-[15px] font-bold text-[#142624] leading-tight m-0 tracking-wide">{chat.name}</h2>
            <p className="text-[11px] text-[#345753] font-medium m-0 mt-0.5">
              {user.online ? "Online" : "Offline"} {user.lastSeen && `- ${user.lastSeen}`}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1">
          {/* Phone */}
          <Button variant="ghost" size="icon" className="rounded-full size-9 text-[#25423f] hover:bg-white/20 hover:text-black transition-colors" aria-label="Call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </Button>
          {/* Video */}
          <Button variant="ghost" size="icon" className="rounded-full size-9 text-[#25423f] hover:bg-white/20 hover:text-black transition-colors" aria-label="Video call">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </Button>
          {/* Menu */}
          <Button variant="ghost" size="icon" className="rounded-full size-9 text-[#25423f] hover:bg-white/20 hover:text-black transition-colors" aria-label="More options">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-3 pb-4">
          
          <div className="flex justify-center py-2 mb-2">
            <div className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/20 text-[#25423f] backdrop-blur-sm shadow-sm border border-white/10">
              Today
            </div>
          </div>

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
      <div className="shrink-0">
        <div className="flex items-center gap-2 bg-white/20 border border-white/20 rounded-full p-1.5 pl-4 shadow-sm backdrop-blur-md">
          
          <button className="shrink-0 flex items-center justify-center p-2 rounded-full text-[#d5b880] hover:bg-white/20 transition-colors" aria-label="Emoji">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          <input
            type="text"
            className="flex-1 bg-transparent border-none text-[14px] text-[#142624] font-medium focus:outline-none placeholder:text-[#4a726d]"
            placeholder="Type your message here..."
            readOnly
          />
          
          <button className="shrink-0 flex items-center justify-center p-2 text-[#4a726d] hover:bg-white/20 transition-colors rounded-full mr-1" aria-label="Camera">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </button>

          <button className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#182321] text-white hover:bg-[#253633] transition-all shadow-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[2px] -translate-y-[1px]">
               <path d="m22 2-7 20-4-9-9-4Z" />
               <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
