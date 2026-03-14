import { ChatMessage, ChatUser } from "@/data/chats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/chats";

interface ChatBubbleProps {
  message: ChatMessage;
  isSent: boolean;
  sender?: ChatUser | null;
}

export default function ChatBubble({ message, isSent, sender }: ChatBubbleProps) {
  const user = isSent ? currentUser : sender;

  return (
    <div className={`flex w-full gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isSent ? "flex-row-reverse" : "flex-row"}`}>
      
      {/* Avatar */}
      {user && (
        <Avatar className="size-10 rounded-full border border-white/20 shadow-sm shrink-0 bg-[#1a1c20]">
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
          <AvatarFallback className="text-white text-xs font-bold" style={{ backgroundColor: user.avatarColor }}>
            {user.initials}
          </AvatarFallback>
        </Avatar>
      )}

      {/* Bubble Container */}
      <div className={`flex flex-col max-w-[70%] ${isSent ? "items-end" : "items-start"}`}>
        <span className="text-[11px] text-gray-400 mb-1 px-1">{user?.name}</span>
        
        <div className={`px-4 py-2.5 rounded-2xl relative shadow-md ${
          isSent 
            ? "bg-[#d5b880] text-black rounded-tr-sm" 
            : "bg-black/40 border border-white/10 text-gray-100 rounded-tl-sm"
        }`}>
          <p className="m-0 text-[14px] leading-relaxed break-words font-medium">{message.text}</p>
        </div>
        
        {/* Time / Read status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${isSent ? "justify-end text-[#d5b880]" : "justify-start text-gray-500"}`}>
          {isSent && message.read && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M18 7l-8 8-4-4" />
              <path d="M22 7l-8 8" />
            </svg>
          )}
          <span className="text-[10px] whitespace-nowrap opacity-80">{message.time}</span>
        </div>
      </div>

    </div>
  );
}
