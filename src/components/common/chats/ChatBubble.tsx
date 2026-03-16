"use client";

import { ChatMessage, ChatUser } from "@/data/chats";
import { useChatTheme } from "./ChatThemeContext";

interface ChatBubbleProps {
  message: ChatMessage;
  isSent: boolean;
  sender?: ChatUser | null;
}

export default function ChatBubble({ message, isSent }: ChatBubbleProps) {
  const { panelBg, borderColor, textColor, mutedTextColor, emeraldBg, emeraldText, isDarkTheme } = useChatTheme();

  return (
    <div
      className={`flex w-full ${isSent ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[75%] px-5 py-3 shadow-md border transition-colors duration-300 ${
          isSent
            ? `${emeraldBg} rounded-3xl rounded-tr-md`
            : `${panelBg} ${borderColor} rounded-3xl rounded-tl-md`
        }`}
      >
        <p className={`text-[14px] font-medium leading-relaxed m-0 break-words whitespace-pre-wrap ${isSent ? emeraldText : textColor}`}>
          {message.text}
        </p>
        <div
          className={`flex items-center gap-1.5 mt-1.5 ${
            isSent ? "justify-end" : "justify-start"
          }`}
        >
          <span
            className={`text-[11px] font-medium ${isSent ? (isDarkTheme ? 'text-emerald-200/80' : 'text-emerald-700/80') : mutedTextColor}`}
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
              className={isSent ? (isDarkTheme ? 'text-emerald-200/80' : 'text-emerald-700/80') : mutedTextColor}
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
