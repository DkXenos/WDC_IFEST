import { chats } from "@/data/chats";
import ChatListItem from "./ChatListItem";

interface ChatSidebarProps {
  activeChatId: string;
}

export default function ChatSidebar({ activeChatId }: ChatSidebarProps) {
  const groupChats = chats.filter((c) => c.type === "group");
  const personChats = chats.filter((c) => c.type === "person");

  return (
    <aside className="chat-sidebar">
      {/* Search */}
      <div className="chat-search">
        <svg className="chat-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          className="chat-search__input"
          placeholder="Search"
          readOnly
        />
      </div>

      {/* Scrollable list */}
      <div className="chat-sidebar__list">
        {/* Groups */}
        <div className="chat-section">
          <h3 className="chat-section__title">Groups</h3>
          <div className="chat-section__items">
            {groupChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
              />
            ))}
          </div>
        </div>

        {/* Person */}
        <div className="chat-section">
          <h3 className="chat-section__title">Person</h3>
          <div className="chat-section__items">
            {personChats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === activeChatId}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
