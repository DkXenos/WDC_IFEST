// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatUser {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string; // We'll keep color fallback if no URL
  avatarColor: string;
  online?: boolean;
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  read?: boolean;
}

export interface Chat {
  id: string;
  type: "group" | "person";
  name: string;
  participants: ChatUser[];
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unread?: number;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const currentUser: ChatUser = {
  id: "me",
  name: "Zyy",
  initials: "ZY",
  avatarColor: "#6B8E7B",
  avatarUrl: "https://i.pravatar.cc/150?u=zyy", // Dummy avatar for self
};

export const users: Record<string, ChatUser> = {
  riyu: {
    id: "riyu",
    name: "Riyu",
    initials: "RY",
    avatarColor: "#809bb9",
    online: true,
    lastSeen: "Online",
    avatarUrl: "https://i.pravatar.cc/150?img=11", 
  },
  zhonglong: {
    id: "zhonglong",
    name: "Zhonglong",
    initials: "ZH",
    avatarColor: "#b89c72",
    online: false,
    lastSeen: "Ultima vez online: 5 dia(s)",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  kafka: {
    id: "kafka",
    name: "Kafka",
    initials: "KF",
    avatarColor: "#6e4a68",
    online: true,
    lastSeen: "Online",
  },
  blade: {
    id: "blade",
    name: "Blade",
    initials: "BL",
    avatarColor: "#47515a",
    online: false,
    lastSeen: "10 hours ago",
  },
};

// ─── Chats ────────────────────────────────────────────────────────────────────

export const chats: Chat[] = [
  // ── Person ────────────────────────────────────────────────────────────────
  {
    id: "person-riyu",
    type: "person",
    name: "Riyu",
    participants: [users.riyu],
    lastMessage: "Which means...",
    lastMessageTime: "Today",
    messages: [
      {
        id: "msg-1",
        senderId: "me",
        text: "My sanity has ran out. I cannot do this anymore.",
        time: "10:15am",
      },
      {
        id: "msg-2",
        senderId: "me",
        text: "Firefly refuses to come home.",
        time: "10:16am",
      },
      {
        id: "msg-3",
        senderId: "me",
        text: "I have approximatly 6 days to get her",
        time: "10:17am",
      },
      {
        id: "msg-4",
        senderId: "me",
        text: "with 38 pulls left to get a *******nted Firefly",
        time: "10:18am",
      },
      {
        id: "msg-5",
        senderId: "me",
        text: "Which means",
        time: "10:20am",
      },
      {
        id: "msg-6",
        senderId: "me",
        text: "6080 gems...",
        time: "10:21am",
      },
    ],
  },
  {
    id: "person-zhonglong",
    type: "person",
    name: "Zhonglong",
    participants: [users.zhonglong],
    lastMessage: "Hey, check out this build.",
    lastMessageTime: "5 days ago",
    unread: 2,
    messages: [
      {
        id: "zl-1",
        senderId: "zhonglong",
        text: "Hey, check out this build.",
        time: "2:00pm",
      },
      {
        id: "zl-2",
        senderId: "zhonglong",
        text: "It deals massive damage in simulated universe.",
        time: "2:01pm",
      },
    ],
  },
  {
    id: "group-stellaron",
    type: "group",
    name: "Stellaron Hunters",
    participants: [users.kafka, users.blade],
    lastMessage: "Mission accomplished.",
    lastMessageTime: "Yesterday",
    messages: [
      {
        id: "sh-1",
        senderId: "kafka",
        text: "Is everyone ready?",
        time: "8:00pm",
      },
      {
        id: "sh-2",
        senderId: "blade",
        text: "Mission accomplished.",
        time: "9:00pm",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the active conversation data (Riyu chat) */
export const activeChat = chats.find((c) => c.id === "person-riyu")!;

/** Returns the user object for a given chat */
export function getChatUser(chat: Chat): ChatUser {
  return chat.participants[0];
}
