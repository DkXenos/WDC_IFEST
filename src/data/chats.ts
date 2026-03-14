// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChatUser {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string; // Optional remote image
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
  name: "You",
  initials: "YO",
  avatarColor: "#6B8E7B",
  avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
};

export const users: Record<string, ChatUser> = {
  wealth: {
    id: "wealth",
    name: "Wealth",
    initials: "WE",
    avatarColor: "#D4A574",
    online: true,
    lastSeen: "2:45pm",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  },
  amarae: {
    id: "amarae",
    name: "Amarae",
    initials: "AM",
    avatarColor: "#7BA3B8",
    online: false,
    lastSeen: "1:20pm",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026703d",
  },
  blessing: {
    id: "blessing",
    name: "Blessing",
    initials: "BL",
    avatarColor: "#B89B7A",
    online: true,
    lastSeen: "10:02am",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
  },
  tee: {
    id: "tee",
    name: "Tee",
    initials: "TE",
    avatarColor: "#8B7BAA",
    online: false,
    lastSeen: "Yesterday, 10:45pm",
    avatarUrl: "https://i.pravatar.cc/150?u=a04258114e29026702d",
  },
  kira: {
    id: "kira",
    name: "Kira",
    initials: "KI",
    avatarColor: "#A3B87B",
  },
  jake: {
    id: "jake",
    name: "Jake",
    initials: "JK",
    avatarColor: "#B87B8E",
  },
};

// ─── Chats ────────────────────────────────────────────────────────────────────

export const chats: Chat[] = [
  // ── Groups ────────────────────────────────────────────────────────────────
  {
    id: "group-internship",
    type: "group",
    name: "Kingplus Internship Team",
    participants: [users.wealth, users.blessing, users.kira],
    lastMessage: "On my way",
    lastMessageTime: "Today, 2:45pm",
    messages: [
      {
        id: "gi-1",
        senderId: "kira",
        text: "Hey team, are we still meeting at 3?",
        time: "2:30pm",
      },
      {
        id: "gi-2",
        senderId: "blessing",
        text: "Yeah I'll be there in 10",
        time: "2:32pm",
      },
      {
        id: "gi-3",
        senderId: "me",
        text: "On my way",
        time: "2:45pm",
        read: true,
      },
    ],
  },
  {
    id: "group-fun",
    type: "group",
    name: "Just fun",
    participants: [users.amarae, users.tee, users.jake],
    lastMessage: "Yo ...what are you guys up to?",
    lastMessageTime: "Yesterday, 12:45pm",
    unread: 10,
    messages: [
      {
        id: "gf-1",
        senderId: "jake",
        text: "Anyone up for games tonight?",
        time: "12:30pm",
      },
      {
        id: "gf-2",
        senderId: "tee",
        text: "Count me in!",
        time: "12:35pm",
      },
      {
        id: "gf-3",
        senderId: "amarae",
        text: "Yo ...what are you guys up to?",
        time: "12:45pm",
      },
    ],
  },

  // ── Person ────────────────────────────────────────────────────────────────
  {
    id: "person-amarae",
    type: "person",
    name: "Amarae",
    participants: [users.amarae],
    lastMessage: "Are you coming today?",
    lastMessageTime: "Today, 2:45pm",
    unread: 1,
    messages: [
      {
        id: "pa-1",
        senderId: "amarae",
        text: "Hey! How's it going?",
        time: "1:00pm",
      },
      {
        id: "pa-2",
        senderId: "me",
        text: "Pretty good, just finishing up some work",
        time: "1:15pm",
        read: true,
      },
      {
        id: "pa-3",
        senderId: "amarae",
        text: "Are you coming today?",
        time: "2:45pm",
      },
    ],
  },
  {
    id: "person-wealth",
    type: "person",
    name: "Wealth",
    participants: [users.wealth],
    lastMessage: "Because I'm sitting at the back",
    lastMessageTime: "Today, 2:45pm",
    messages: [
      {
        id: "pw-1",
        senderId: "wealth",
        text: "What's up?",
        time: "2:19pm",
        read: true,
      },
      {
        id: "pw-2",
        senderId: "me",
        text: "Good you?",
        time: "2:52pm",
        read: true,
      },
      {
        id: "pw-3",
        senderId: "wealth",
        text: "I'm fine",
        time: "2:52pm",
        read: true,
      },
      {
        id: "pw-4",
        senderId: "wealth",
        text: "What you up to?",
        time: "2:53pm",
        read: true,
      },
      {
        id: "pw-5",
        senderId: "me",
        text: "Hahaha ...and u are texting",
        time: "2:54pm",
        read: true,
      },
      {
        id: "pw-6",
        senderId: "wealth",
        text: "I'm in class",
        time: "2:56pm",
        read: true,
      },
      {
        id: "pw-7",
        senderId: "me",
        text: "Yup",
        time: "2:58pm",
        read: true,
      },
      {
        id: "pw-8",
        senderId: "me",
        text: "Because I'm sitting at the back",
        time: "2:59pm",
        read: true,
      },
    ],
  },
  {
    id: "person-blessing",
    type: "person",
    name: "Blessing",
    participants: [users.blessing],
    lastMessage: "I saw the girl this morning",
    lastMessageTime: "Today, 10:02am",
    messages: [
      {
        id: "pb-1",
        senderId: "blessing",
        text: "Good morning!",
        time: "9:45am",
      },
      {
        id: "pb-2",
        senderId: "me",
        text: "Morning Blessing!",
        time: "9:50am",
        read: true,
      },
      {
        id: "pb-3",
        senderId: "blessing",
        text: "I saw the girl this morning",
        time: "10:02am",
      },
    ],
  },
  {
    id: "person-tee",
    type: "person",
    name: "Tee",
    participants: [users.tee],
    lastMessage: "I think I'm coming back next week",
    lastMessageTime: "Yesterday, 10:45pm",
    unread: 1,
    messages: [
      {
        id: "pt-1",
        senderId: "tee",
        text: "Hey, long time no see!",
        time: "10:20pm",
      },
      {
        id: "pt-2",
        senderId: "me",
        text: "I know right! When are you coming back?",
        time: "10:30pm",
        read: true,
      },
      {
        id: "pt-3",
        senderId: "tee",
        text: "I think I'm coming back next week",
        time: "10:45pm",
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns the active conversation data (Wealth chat) */
export const activeChat = chats.find((c) => c.id === "person-wealth")!;

/** Returns the user object for a given chat */
export function getChatUser(chat: Chat): ChatUser {
  return chat.participants[0];
}
