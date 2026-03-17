"use client";

import React, { useState } from "react";
import Window, { WindowDragHandle } from "../Window";
import { FiCalendar } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { Calendar } from "@/components/ui/calendar";
import { useWindows } from "../WindowContext";

export default function CalendarWindow() {
  const { borderColor, containerBg, panelBg, hoverBg, mutedTextColor, textColor, emeraldText } = useChatTheme();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { closeWindow } = useWindows();

  return (
    <Window 
      id="calendar" 
      title="Calendar" 
      icon={<FiCalendar size={18} />}
      width="700px"
      height="450px"
      hideTitleBar={true}
    >
        <div className="flex bg-transparent overflow-hidden h-[450px] pointer-events-none">
            <WindowDragHandle className={`w-60 shrink-0 border-r ${borderColor} ${panelBg} flex flex-col items-center justify-center p-6 text-center shadow-2xl rounded-l-2xl relative pointer-events-auto`}>
                {/* Window controls */}
                <div className="absolute top-4 left-4 flex gap-1.5 pointer-events-auto">
                    <button onClick={() => closeWindow("calendar")} className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10 transition-colors hover:bg-[#ff5f56]/80" />
                    <button className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10 transition-colors hover:bg-[#ffbd2e]/80" />
                    <button className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10 transition-colors hover:bg-[#27c93f]/80" />
                </div>
                <p className={`text-sm font-semibold tracking-widest uppercase mb-1 ${emeraldText}`}>
                {date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) : "Month"}
                </p>
                <h1 className={`text-7xl font-bold tracking-tighter my-2 ${textColor}`}>
                {date ? date.getDate() : "--"}
                </h1>
                <p className={`text-[15px] font-medium ${mutedTextColor} capitalize`}>
                {date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : "Select Date"}
                </p>
                <div className={`mt-10 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm border ${borderColor} ${hoverBg} ${mutedTextColor}`}>
                No events today
                </div>
            </WindowDragHandle>

            <div className={`flex-1 flex items-center justify-center relative p-6 bg-black/5 dark:bg-white/5 backdrop-blur-sm h-full pointer-events-auto`}>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className={`rounded-2xl border ${borderColor} ${containerBg} shadow-sm scale-105! origin-center ${textColor}`}
                />
            </div>
        </div>
    </Window>
  );
}
