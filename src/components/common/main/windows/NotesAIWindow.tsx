"use client";

import React, { useState } from "react";
import Window from "../Window";
import { FiCpu, FiFileText, FiZap, FiBookOpen } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";

export default function NotesAIWindow() {
  const { textColor, mutedTextColor, borderColor, hoverBg, panelBg, emeraldBg, emeraldText } = useChatTheme();
  const [note, setNote] = useState("");
  const [aiInsight, setAiInsight] = useState("Write something to get AI insights...");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAIAction = (action: string) => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      switch (action) {
        case "summarize":
          setAiInsight("Summary: The user is writing about productivity and AI integration in a desktop environment.");
          break;
        case "keywords":
          setAiInsight("Keywords: Next.js, Framer Motion, AI, Workspace, UX Design");
          break;
        case "flashcards":
          setAiInsight("Flashcards: \n1. Q: What is Next.js? A: A React framework for static & server rendering.");
          break;
      }
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <Window 
      id="notes" 
      title="Smart AI Notes" 
      icon={<FiCpu size={18} />}
      width="800px"
      height="550px"
    >
      <div className="flex h-full divide-x divide-white/10 overflow-hidden">
        {/* Editor Pane */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className={`h-10 px-4 flex items-center gap-2 border-b ${borderColor} ${panelBg}`}>
            <FiFileText size={14} className={mutedTextColor} />
            <span className={`text-[11px] font-bold uppercase tracking-widest ${mutedTextColor}`}>Draft / notes.md</span>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing your study notes here..."
            className={`flex-1 w-full bg-transparent p-6 outline-none resize-none text-[15px] leading-relaxed custom-scrollbar ${textColor}`}
          />
        </div>

        {/* AI Insight Pane */}
        <div className={`w-72 flex flex-col shrink-0 ${panelBg}`}>
          <div className={`h-10 px-4 flex items-center gap-2 border-b ${borderColor}`}>
            <FiZap size={14} className="text-amber-400" />
            <span className={`text-[11px] font-bold uppercase tracking-widest ${textColor}`}>AI Smart Insights</span>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
            <div className={`p-4 rounded-xl border ${borderColor} text-sm leading-relaxed ${isProcessing ? 'animate-pulse' : ''} ${textColor}/90`}>
              {aiInsight}
            </div>

            <div className="space-y-2 mt-4">
              <button 
                onClick={() => handleAIAction("summarize")}
                disabled={isProcessing}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-xs font-medium ${textColor}`}
              >
                <FiFileText size={14} className="text-blue-400" />
                Summarize Notes
              </button>
              <button 
                onClick={() => handleAIAction("keywords")}
                disabled={isProcessing}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-xs font-medium ${textColor}`}
              >
                <FiZap size={14} className="text-amber-400" />
                Extract Keywords
              </button>
              <button 
                onClick={() => handleAIAction("flashcards")}
                disabled={isProcessing}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-xs font-medium ${textColor}`}
              >
                <FiBookOpen size={14} className="text-emerald-400" />
                Generate Flashcards
              </button>
            </div>
          </div>

          <div className={`p-4 border-t ${borderColor} text-[10px] text-center ${mutedTextColor}`}>
            AI may generate inaccurate information.
          </div>
        </div>
      </div>
    </Window>
  );
}
