"use client";

import { Chat, getChatUser } from "@/data/chats";
import ChatBubble from "./ChatBubble";

interface ChatConversationProps {
  chat: Chat;
}

export default function ChatConversation({ chat }: ChatConversationProps) {
  const user = getChatUser(chat);

  return (
    <section className="flex-1 h-full min-w-0 flex flex-col bg-transparent relative z-20">
      
      {/* Header */}
      <header className="h-[84px] shrink-0 flex items-center justify-between px-6 bg-white/10 backdrop-blur-md rounded-[1.5rem] border border-white/20 shadow-sm mt-4 mr-4 mx-2">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-[14px] object-cover shadow-sm"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[#2d3a38] text-sm font-bold shadow-sm"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.initials}
              </div>
            )}
            {user.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-[3px] border-[#F0D9C7]" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[16px] font-bold text-[#2d3a38] truncate m-0">
              {chat.name}
            </h2>
            <p className="text-[12px] font-medium text-[#5a7a75] m-0 truncate mt-0.5">
              {user.online ? "Online" : "Offline"} - Last seen{" "}
              {user.lastSeen || "recently"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          {["Call", "Video", "More"].map((action, idx) => (
            <button
              key={action}
              title={action}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              {idx === 0 && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              )}
              {idx === 1 && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              )}
              {idx === 2 && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-4">
        {/* Day separator */}
        <div className="flex justify-center mb-6">
          <span className="text-[12px] font-bold text-white/90 bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full shadow-sm border border-white/30">
            Today
          </span>
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

      {/* Input bar */}
      <footer className="shrink-0 p-5 lg:p-6 mb-2">
        <div className="flex items-center gap-3 bg-white/30 backdrop-blur-xl rounded-full p-2 pl-4 shadow-lg border border-[#DDEFDF]/40 mx-4">
          
          {/* Emoji */}
          <button className="shrink-0 w-8 h-8 flex items-center justify-center text-[#5a7a75] hover:text-[#2d3a38] transition-colors" aria-label="Emoji">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </button>

          {/* Input field */}
          <input
            type="text"
            className="flex-1 min-w-0 h-10 bg-transparent text-[14px] text-[#2d3a38] font-medium placeholder:text-[#5a7a75] focus:outline-none"
            placeholder="Type your message here..."
            readOnly
          />

          {/* Icons container */}
          <div className="flex items-center gap-1 shrink-0">
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#5a7a75] hover:bg-white/40 hover:text-[#2d3a38] transition-colors" aria-label="Camera">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="13" r="4" />
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-[#5a7a75] hover:bg-white/40 hover:text-[#2d3a38] transition-colors" aria-label="Gallery">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            
            {/* Send button */}
            <button className="w-10 h-10 ml-1 rounded-full flex items-center justify-center bg-[#C7DCC4] text-[#2d3a38] backdrop-blur-md hover:bg-[#DDEFDF] border border-white/20 transition-all shadow-md" aria-label="Send">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-ml-1">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </button>
          </div>
          
        </div>
      </footer>

    </section>
  );
}
