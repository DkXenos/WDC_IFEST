import { Chat, getChatUser, users } from "@/data/chats";

interface ChatListItemProps {
  chat: Chat;
  isActive?: boolean;
}

export default function ChatListItem({ chat, isActive }: ChatListItemProps) {
  const user = getChatUser(chat);
  const isGroup = chat.type === "group";

  return (
    <div
      className={`chat-list-item ${isActive ? "chat-list-item--active" : ""}`}
    >
      {/* Avatar */}
      <div className="chat-list-avatar" style={{ backgroundColor: user.avatarColor }}>
        {isGroup ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ) : (
          <span className="chat-list-avatar__initials">{user.initials}</span>
        )}
      </div>

      {/* Info */}
      <div className="chat-list-info">
        <div className="chat-list-info__header">
          <span className="chat-list-info__name">{chat.name}</span>
          <span className="chat-list-info__time">{chat.lastMessageTime}</span>
        </div>
        <p className="chat-list-info__message">{chat.lastMessage}</p>
      </div>

      {/* Unread badge */}
      {chat.unread && chat.unread > 0 && (
        <div className="chat-list-unread">
          <span>{chat.unread}</span>
        </div>
      )}
    </div>
  );
}
