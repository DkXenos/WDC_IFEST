"use client";

import React from "react";
import Window from "../Window";
import { FiUser } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { currentUser } from "@/data/chats";

export default function ProfileWindow() {
  const { panelBg, borderColor, textColor, mutedTextColor, emeraldBg, emeraldText } = useChatTheme();

  return (
    <Window 
      id="profile" 
      title="Profile" 
      icon={<FiUser size={18} />}
      width="400px"
      height="500px"
    >
        <div className={`flex flex-col items-center justify-center h-full z-20 ${panelBg} transition-colors duration-300 py-10 px-4 overflow-y-auto`}>
            <div className="relative mb-6">
                {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="User" className="w-[120px] h-[120px] rounded-full object-cover shadow-xl border-4 border-emerald-500/20" />
                ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-4xl shadow-xl border-4 border-emerald-500/20">
                    {currentUser.initials}
                </div>
                )}
            </div>
            
            <h2 className={`text-2xl font-bold ${textColor}`}>{currentUser.name} (You)</h2>
            <p className={`text-[14px] font-medium ${mutedTextColor} mt-1 mb-6`}>"Learning every day"</p>
            
            <div className={`w-full p-6 rounded-3xl border ${borderColor} flex justify-around mb-8 bg-black/5`}>
                <div className="flex flex-col items-center">
                <span className={`text-[18px] font-bold ${textColor}`}>12</span>
                <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>Friends</span>
                </div>
                <div className="flex flex-col items-center">
                <span className={`text-[18px] font-bold ${textColor}`}>2,500</span>
                <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>EXP</span>
                </div>
                <div className="flex flex-col items-center">
                <span className={`text-[18px] font-bold ${textColor} flex items-center gap-1`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    Lvl. 4
                </span>
                <span className={`text-[12px] font-medium ${mutedTextColor} uppercase tracking-wider`}>Rank</span>
                </div>
            </div>
            
            <button className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 ${emeraldBg} ${emeraldText} font-bold transition-transform active:scale-95 shadow-sm`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Edit Profile
            </button>
        </div>
    </Window>
  );
}
