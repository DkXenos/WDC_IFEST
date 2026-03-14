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
      className={`group relative flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all overflow-hidden border ${
        isActive
          ? "bg-white/40 border-white/40 shadow-sm backdrop-blur-md" 
          : "bg-white/10 border-transparent hover:bg-white/20 hover:border-white/20 backdrop-blur-sm"
      }`}
    >
      
      {/* Avatar */}
      <div className="relative shrink-0">
        <Avatar className="size-11 rounded-full shadow-sm">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback
            className="text-white text-sm font-bold tracking-wide"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.initials}
          </AvatarFallback>
        </Avatar>
        {user.online && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#6cce74] rounded-full border-2 border-[#81a6a2] z-10" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 z-10 justify-center">
        <div className="flex justify-between items-center mb-0.5 mt-1">
          <h4 className={`text-[14px] font-bold truncate tracking-wide ${isActive ? "text-[#1a2b29]" : "text-[#183633]"}`}>
            {chat.name}
          </h4>
          <span className={`text-[10px] whitespace-nowrap ${isActive ? "text-[#3f6560]" : "text-[#47746f]"}`}>
            {chat.lastMessageTime.split(',')[0]} {/* e.g "Today" */}
          </span>
        </div>
        <p className={`text-[12px] truncate ${isActive ? "text-[#355854]" : "text-[#3a625e]"}`}>
          {chat.lastMessage}
        </p>
      </div>

      {/* Badge */}
      {chat.unread && chat.unread > 0 && (
        <div className="flex shrink-0 items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-[#1e2a28] text-white text-[10px] font-bold shadow-sm">
          {chat.unread}
        </div>
      )}
    </div>
  );
}
