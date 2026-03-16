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
    <main className="fixed inset-0 flex z-0 overflow-hidden bg-black pt-[72px] pb-[88px]">

      {/* Video Background Layer */}
      <div className="absolute inset-0 z-[-2] pointer-events-none overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-w-[177.77vh] min-h-[100vh] scale-[1.35]"
          src={`https://www.youtube.com/embed/o4qjk8_5gmU?autoplay=1&mute=1&loop=1&playlist=o4qjk8_5gmU&controls=0&showinfo=0&rel=0&vq=hd1080`}
          title="Loop Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-[-1] pointer-events-none bg-black/40" />

      <div className="flex flex-col w-full h-full max-w-[1400px] mx-auto p-4 lg:p-6 pb-2 gap-4 relative z-10">
        
        {/* Top Guide Navbar */}
        <header className="flex w-full min-h-[64px] bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl shadow-sm px-8 items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DDEFDF]/80 flex items-center justify-center text-[#2d3a38] border border-white/50 shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-[18px] font-bold text-white leading-tight">Messages</h1>
              <p className="text-[12px] font-medium text-white/70 leading-tight">Select a conversation to start chatting.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 transition-all rounded-full border border-white/20 text-white text-[13px] font-bold shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              New Chat
            </button>
          </div>
        </header>

        {/* Main Glassmorphic Window Container */}
        <div className="flex w-full flex-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden p-2 gap-2">
          
          {/* ─ Vertical Nav Strip ─ */}
          <nav className="w-24 shrink-0 h-full flex flex-col items-center py-6 gap-5 bg-black/50 backdrop-blur-sm rounded-[1.5rem] border border-white/10 shadow-inner">
            
            {/* User avatar */}
            <div className="relative mb-4">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="w-[52px] h-[52px] rounded-[18px] object-cover shadow-sm border border-white/20" />
              ) : (
                <div className="w-[52px] h-[52px] rounded-[18px] bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm shadow-sm border border-white/20">
                  {currentUser.initials}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-[18px] h-[18px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-300 to-emerald-500 rounded-full border-[3px] border-white/80" />
            </div>

            {/* Icons */}
            <div className="flex flex-col gap-3 flex-1 items-center w-full">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  title={item.label}
                  className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center transition-all ${
                    item.active
                      ? "bg-[#C7DCC4]/30 text-emerald-300 shadow-md font-semibold border border-emerald-500/30"
                      : "text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {/* Bottom clock icon */}
            <button
              title="History"
              className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 mt-auto transition-all"
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
      </div>
    </main>
  );
}
