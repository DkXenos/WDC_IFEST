"use client";

import { ChatMessage, ChatUser } from "@/data/chats";

interface ChatBubbleProps {
  message: ChatMessage;
  isSent: boolean;
  sender?: ChatUser | null;
}

export default function ChatBubble({ message, isSent }: ChatBubbleProps) {
  return (
    <div
      className={`flex w-full ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[75%] px-5 py-3 shadow-md border ${
          isSent
            ? "bg-white/40 backdrop-blur-md border-white/50 text-[#2d3a38] rounded-3xl rounded-tr-md"
            : "bg-white/80 backdrop-blur-xl border-white/90 text-[#2d3a38] rounded-3xl rounded-tl-md"
        }`}
      >
        <p className="text-[14px] font-medium leading-relaxed m-0 break-words whitespace-pre-wrap">
          {message.text}
        </p>
        <div
          className={`flex items-center gap-1.5 mt-1.5 ${
            isSent ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className="text-[11px] font-medium text-[#5a7a75]"
          >
            {message.time}
          </span>
          {isSent && message.read && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#5a7a75]"
            >
              <path d="M18 7l-8 8-4-4" />
              <path d="M22 7l-8 8" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
