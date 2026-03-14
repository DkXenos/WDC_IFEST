import { Chat, getChatUser } from "@/data/chats";
import ChatBubble from "./ChatBubble";

interface ChatConversationProps {
  chat: Chat;
}

export default function ChatConversation({ chat }: ChatConversationProps) {
  const user = getChatUser(chat);

  return (
    <section className="chat-conversation">
      {/* Header */}
      <header className="chat-conv-header">
        <div className="chat-conv-header__user">
          <div
            className="chat-conv-header__avatar"
            style={{ backgroundColor: user.avatarColor }}
          >
            <span>{user.initials}</span>
          </div>
          <div className="chat-conv-header__info">
            <h2 className="chat-conv-header__name">{user.name}</h2>
            <p className="chat-conv-header__status">
              {user.online ? "Online" : "Offline"} · Last seen {user.lastSeen}
            </p>
          </div>
        </div>
        <div className="chat-conv-header__actions">
          {/* Phone */}
          <button className="chat-conv-header__btn" aria-label="Call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
          {/* Video */}
          <button className="chat-conv-header__btn" aria-label="Video call">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </button>
          {/* Menu */}
          <button className="chat-conv-header__btn" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="chat-conv-messages">
        {/* Date separator */}
        <div className="chat-conv-date">
          <span>Today</span>
        </div>

        {chat.messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isSent={msg.senderId === "me"}
          />
        ))}
      </div>

      {/* Input bar */}
      <div className="chat-conv-input">
        <button className="chat-conv-input__btn" aria-label="Emoji">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </button>
        <input
          type="text"
          className="chat-conv-input__field"
          placeholder="Type your message here..."
          readOnly
        />
        <button className="chat-conv-input__btn" aria-label="Attach">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <button className="chat-conv-input__btn" aria-label="Image">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>
        <button className="chat-conv-input__send" aria-label="Send">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </section>
  );
}
