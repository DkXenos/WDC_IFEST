"use client";

import { activeChat, currentUser } from "@/data/chats";
import ChatSidebar from "@/components/common/chats/ChatSidebar";
import ChatConversation from "@/components/common/chats/ChatConversation";

const navItems = [
  {
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Chats",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    active: true,
  },
  {
    label: "Notifications",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    active: false,
  },
  {
    label: "Settings",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    active: false,
  },
];

export default function ChatsPage() {
  return (
    <main className="fixed inset-0 pt-[72px] pb-[88px] flex bg-[#F0D9C7] z-0">
      <div className="flex w-full h-full shadow-[-4px_0_24px_-4px_rgba(0,0,0,0.05)]">
        
        {/* ─ Vertical Nav Strip ─ */}
        <nav className="w-24 shrink-0 h-full flex flex-col items-center py-8 gap-5 bg-[#DDEFDF] border-r border-[#C7DCC4]/50">
          
          {/* User avatar */}
          <div className="relative mb-4">
            {currentUser.avatarUrl ? (
              <img src={currentUser.avatarUrl} alt="User" className="w-[52px] h-[52px] rounded-[18px] object-cover shadow-sm border-2 border-[#F0D9C7]" />
            ) : (
              <div className="w-[52px] h-[52px] rounded-[18px] bg-[#DADBC6] flex items-center justify-center text-[#2d3a38] font-bold text-sm shadow-sm border-2 border-[#F0D9C7]">
                {currentUser.initials}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-emerald-400 rounded-full border-[3px] border-[#DDEFDF]" />
          </div>

          {/* Icons */}
          <div className="flex flex-col gap-3 flex-1 items-center w-full">
            {navItems.map((item) => (
              <button
                key={item.label}
                title={item.label}
                className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all ${
                  item.active
                    ? "bg-[#F0D9C7] text-[#2d3a38] shadow-sm font-semibold"
                    : "text-[#5a7a75] hover:text-[#2d3a38] hover:bg-black/5"
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>

          {/* Bottom clock icon */}
          <button
            title="History"
            className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[#5a7a75] hover:text-[#2d3a38] hover:bg-black/5 mt-auto transition-all"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </button>
        </nav>

        {/* ─ Sidebar (Groups / Person) ─ */}
        <ChatSidebar activeChatId={activeChat.id} />

        {/* ─ Conversation Area ─ */}
        <ChatConversation chat={activeChat} />

      </div>
    </main>
  );
}
