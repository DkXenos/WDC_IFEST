"use client";

import { Chat, getChatUser } from "@/data/chats";

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
}

export default function ChatListItem({ chat, isActive }: ChatListItemProps) {
  const user = getChatUser(chat);

  return (
    <div
      className={`flex items-center gap-3.5 px-3 py-3 rounded-[1.25rem] cursor-pointer transition-all border ${
        isActive
          ? "bg-black/40 backdrop-blur-md border-white/20 shadow-sm"
          : "bg-transparent border-transparent hover:bg-black/20"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-11 h-11 rounded-[14px] object-cover"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-[14px] flex items-center justify-center text-[#2d3a38] text-sm font-bold shadow-sm"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.initials}
          </div>
        )}
        {user.online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
        )}
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex items-baseline justify-between gap-2">
          <h4 className={`text-[15px] font-semibold truncate flex-1 min-w-0 ${isActive ? "text-white" : "text-white/90"}`}>
            {chat.name}
          </h4>
          <span className={`text-[12px] font-medium shrink-0 ${isActive ? "text-emerald-300" : "text-white/60"}`}>
            {chat.lastMessageTime}
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className={`text-[13px] font-medium truncate flex-1 min-w-0 m-0 ${isActive ? "text-white/80" : "text-white/50"}`}>
            {chat.lastMessage}
          </p>
          {chat.unread && chat.unread > 0 ? (
            <span className="flex items-center justify-center shrink-0 min-w-[22px] h-[22px] px-1.5 rounded-full bg-emerald-500/80 text-white border border-emerald-400/50 text-[11px] font-bold shadow-sm">
              {chat.unread}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
