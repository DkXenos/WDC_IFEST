

export interface ChatUser {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
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
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
  },
  sarah: {
    id: "sarah",
    name: "Sarah",
    initials: "SA",
    avatarColor: "#EBB1BB",
    online: true,
    lastSeen: "Just now",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
  },
  marcus: {
    id: "marcus",
    name: "Marcus",
    initials: "MC",
    avatarColor: "#7BC9B8",
    online: false,
    lastSeen: "2 hours ago",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026707d",
  },
  elena: {
    id: "elena",
    name: "Elena",
    initials: "EL",
    avatarColor: "#D4B1EB",
    online: true,
    lastSeen: "Online",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026708d",
  },
  david: {
    id: "david",
    name: "David",
    initials: "DA",
    avatarColor: "#B1EBD4",
    online: false,
    lastSeen: "4:00pm",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026709d",
  },
  sophia: {
    id: "sophia",
    name: "Sophia",
    initials: "SO",
    avatarColor: "#EBD4B1",
    online: true,
    lastSeen: "Online",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026710d",
  },
};



export const chats: Chat[] = [

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
  {
    id: "person-sarah",
    type: "person",
    name: "Sarah",
    participants: [users.sarah],
    lastMessage: "See you later!",
    lastMessageTime: "3:30pm",
    messages: [
      { id: "ps-1", senderId: "sarah", text: "Hey ready for the meeting?", time: "3:00pm" },
      { id: "ps-2", senderId: "me", text: "Almost, just 5 mins", time: "3:05pm", read: true },
      { id: "ps-3", senderId: "sarah", text: "See you later!", time: "3:30pm" },
    ],
  },
  {
    id: "person-marcus",
    type: "person",
    name: "Marcus",
    participants: [users.marcus],
    lastMessage: "The files are ready",
    lastMessageTime: "2:15pm",
    messages: [
      { id: "pmc-1", senderId: "marcus", text: "Finished the design", time: "2:00pm" },
      { id: "pmc-2", senderId: "marcus", text: "The files are ready", time: "2:15pm" },
    ],
  },
  {
    id: "person-elena",
    type: "person",
    name: "Elena",
    participants: [users.elena],
    lastMessage: "Thanks for the help!",
    lastMessageTime: "11:20am",
    messages: [
      { id: "pe-1", senderId: "elena", text: "Can you review my PR?", time: "11:00am" },
      { id: "pe-2", senderId: "me", text: "Done! Looks great", time: "11:15am", read: true },
      { id: "pe-3", senderId: "elena", text: "Thanks for the help!", time: "11:20am" },
    ],
  },
  {
    id: "person-david",
    type: "person",
    name: "David",
    participants: [users.david],
    lastMessage: "I'll be out of office tomorrow",
    lastMessageTime: "4:10pm",
    messages: [
      { id: "pd-1", senderId: "david", text: "I'll be out of office tomorrow", time: "4:00pm" },
      { id: "pd-2", senderId: "me", text: "Enjoy your day off!", time: "4:10pm", read: true },
    ],
  },
  {
    id: "person-sophia",
    type: "person",
    name: "Sophia",
    participants: [users.sophia],
    lastMessage: "Check out this link",
    lastMessageTime: "Yesterday",
    messages: [
      { id: "pso-1", senderId: "sophia", text: "Check out this link", time: "10:00am" },
    ],
  },
  {
    id: "group-design",
    type: "group",
    name: "Design Community",
    participants: [users.sarah, users.marcus, users.elena],
    lastMessage: "Elena: Love the new palette!",
    lastMessageTime: "Just now",
    messages: [
      { id: "gd-1", senderId: "sarah", text: "Drafting the new UI", time: "10:00am" },
      { id: "gd-2", senderId: "marcus", text: "Looking sharp", time: "11:00am" },
      { id: "gd-3", senderId: "elena", text: "Love the new palette!", time: "Just now" },
    ],
  },
  {
    id: "group-dev",
    type: "group",
    name: "Developer Chat",
    participants: [users.david, users.jake, users.kira],
    lastMessage: "Jake: Deployment successful",
    lastMessageTime: "1 hour ago",
    messages: [
      { id: "gde-1", senderId: "david", text: "Pushing to staging", time: "1:00pm" },
      { id: "gde-2", senderId: "jake", text: "Deployment successful", time: "1 hour ago" },
    ],
  },
];



export const activeChat = chats.find((c) => c.id === "person-wealth")!;

export function getChatUser(chat: Chat): ChatUser {
  return chat.participants[0];
}
