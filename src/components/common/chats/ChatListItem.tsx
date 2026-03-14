"use client";

import { Chat, getChatUser } from "@/data/chats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
}

export default function ChatListItem({ chat, isActive }: ChatListItemProps) {
  const user = getChatUser(chat);

  return (
    <div
      className={`group relative flex items-center gap-3 p-3 cursor-pointer transition-all overflow-hidden ${
        isActive
          ? "" 
          : "hover:bg-white/5"
      }`}
    >
      {/* Solid gradient background for active state like HSR */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200/90 to-transparent -z-10" />
      )}
      
      {/* Avatar */}
      <Avatar className="size-12 rounded-full border border-white/20 shadow-sm bg-[#1a1c20]" style={{ borderColor: isActive ? "white" : undefined }}>
        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
        <AvatarFallback
          className="text-white text-sm font-bold tracking-wide"
          style={{ backgroundColor: user.avatarColor }}
        >
          {user.initials}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0 z-10">
        <h4 className={`text-[15px] font-bold truncate tracking-wide ${isActive ? "text-[#1a1c20]" : "text-gray-200 group-hover:text-white"}`}>
          {chat.name}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${user.online ? "bg-[#64b967]" : "bg-gray-500"}`} />
          <span className={`text-[11px] truncate ${isActive ? "text-[#4d9750] font-bold" : "text-gray-400"}`}>
            {user.lastSeen || (user.online ? "Online" : "Offline")}
          </span>
        </div>
      </div>
    </div>
  );
}
