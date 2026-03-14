import { ChatMessage } from "@/data/chats";

interface ChatBubbleProps {
  message: ChatMessage;
  isSent: boolean;
}

export default function ChatBubble({ message, isSent }: ChatBubbleProps) {
  return (
    <div className={`chat-bubble-wrapper ${isSent ? "chat-bubble-wrapper--sent" : "chat-bubble-wrapper--received"}`}>
      <div className={`chat-bubble ${isSent ? "chat-bubble--sent" : "chat-bubble--received"}`}>
        <p className="chat-bubble__text">{message.text}</p>
        <div className="chat-bubble__meta">
          <span className="chat-bubble__time">{message.time}</span>
          {isSent && (
            <span className="chat-bubble__read">
              {message.read ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 7l-8 8-4-4" />
                  <path d="M22 7l-8 8" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
