import { ChatMessage, ChatUser } from "@/data/chats";
import { currentUser } from "@/data/chats";

interface ChatBubbleProps {
  message: ChatMessage;
  isSent: boolean;
  sender?: ChatUser | null;
}

export default function ChatBubble({ message, isSent }: ChatBubbleProps) {
  return (
    <div className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${isSent ? "justify-end" : "justify-start"}`}>
      
      {/* Bubble Container */}
      <div className="flex flex-col max-w-[70%]">
        
        <div className={`px-5 py-3 relative shadow-sm max-w-fit ${
          isSent 
            ? "bg-[#3e4443] text-[#e8efee] rounded-3xl rounded-br-[4px] self-end" 
            : "bg-white/40 border border-white/20 text-[#142624] rounded-3xl rounded-bl-[4px] self-start backdrop-blur-md"
        }`}>
          <p className="m-0 text-[13px] leading-relaxed break-words font-medium pr-14">{message.text}</p>
          
          {/* Time / Read status (Absolutely positioned inline with text) */}
          <div className={`absolute bottom-2 right-3 flex items-center gap-1 ${isSent ? "text-[#a3b1af]" : "text-[#4a726d]"}`}>
            <span className="text-[9px] font-bold tracking-wider">{message.time}</span>
            {isSent && message.read && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                <path d="M18 7l-8 8-4-4" />
                <path d="M22 7l-8 8" />
              </svg>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
