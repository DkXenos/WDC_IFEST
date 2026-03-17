"use client";

import React, { useState } from "react";
import Window from "../Window";
import { FiMessageSquare, FiUsers, FiTrendingUp, FiHash, FiArrowUp, FiArrowDown, FiSearch, FiEdit3 } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";

const CATEGORIES = ["Mathematics", "Computer Science", "Physics", "Chemistry", "Philosophy", "Psychology"];

const INITIAL_POSTS = [
  { id: 1, user: "Alex J.", category: "Computer Science", title: "How to master React server components?", content: "I've been struggling with the concept of server-client boundary...", upvotes: 42, replies: 12, time: "2h ago" },
  { id: 2, user: "Sarah K.", category: "Mathematics", title: "Help with Calculus II Integrals?", content: "Calculus II is getting really intense. Anyone have good resources?", upvotes: 28, replies: 8, time: "4h ago" },
  { id: 3, user: "Kevin P.", category: "Philosophy", title: "Stoicism in modern student life", content: "How do you guys apply Marcus Aurelius' teachings to finals week?", upvotes: 56, replies: 24, time: "1h ago" },
];

export default function ForumWindow() {
  const { textColor, mutedTextColor, borderColor, hoverBg, panelBg, emeraldText } = useChatTheme();
  const [activeCategory, setActiveCategory] = useState("Computer Science");
  const [posts, setPosts] = useState(INITIAL_POSTS);

  return (
    <Window 
      id="forum" 
      title="Peer Study Forum" 
      icon={<FiUsers size={18} />}
      width="900px"
      height="650px"
    >
      <div className="flex h-full divide-x divide-white/5">
        {/* Navigation Sidebar */}
        <aside className={`w-64 shrink-0 flex flex-col ${panelBg}`}>
          <div className="p-6">
            <div className={`flex items-center justify-between mb-8`}>
              <h3 className={`text-lg font-bold ${textColor}`}>Explore</h3>
              <FiTrendingUp className="text-emerald-500" />
            </div>
            
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-bold tracking-wide ${
                    activeCategory === cat 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : `${mutedTextColor} hover:${textColor} hover:${hoverBg}`
                  }`}
                >
                  <FiHash size={14} className={activeCategory === cat ? "text-emerald-500" : ""} />
                  {cat}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Feed Area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className={`h-20 px-8 flex items-center justify-between border-b ${borderColor}`}>
            <div className="flex items-center gap-4 flex-1">
              <div className={`relative flex-1 max-w-md`}>
                <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${mutedTextColor}`} size={16} />
                <input 
                  type="text" 
                  placeholder={`Search in ${activeCategory}...`}
                  className={`w-full py-2.5 pl-11 pr-4 rounded-xl border ${borderColor} bg-white/5 outline-none focus:border-emerald-500/50 transition-all text-sm ${textColor}`}
                />
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all ml-4">
              <FiEdit3 size={16} />
              Post Thread
            </button>
          </header>

          {/* Social Feed */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {posts.map((post) => (
              <div 
                key={post.id}
                className={`p-6 rounded-3xl border ${borderColor} ${hoverBg} transition-all cursor-pointer flex gap-6`}
              >
                {/* Voting Column */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <button className={`p-2 rounded-lg hover:bg-emerald-500/10 transition-colors ${mutedTextColor} hover:text-emerald-500`}>
                    <FiArrowUp size={20} />
                  </button>
                  <span className={`text-sm font-black ${textColor}`}>{post.upvotes}</span>
                  <button className={`p-2 rounded-lg hover:bg-red-500/10 transition-colors ${mutedTextColor} hover:text-red-500`}>
                    <FiArrowDown size={20} />
                  </button>
                </div>

                {/* Content Column */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      {post.user.substring(0, 2)}
                    </div>
                    <span className={`text-xs font-bold ${textColor}`}>{post.user}</span>
                    <span className={`text-[10px] font-bold ${mutedTextColor} uppercase`}>• {post.time}</span>
                  </div>
                  
                  <h3 className={`text-lg font-bold ${textColor} mb-2 leading-tight uppercase tracking-tight`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm ${mutedTextColor} line-clamp-2 leading-relaxed mb-4`}>
                    {post.content}
                  </p>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-400/20 text-[10px] font-black uppercase tracking-widest`}>
                      {activeCategory}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500">
                      <FiMessageSquare size={14} />
                      {post.replies} Replies
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Window>
  );
}
