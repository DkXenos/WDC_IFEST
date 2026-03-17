"use client";

import React, { useState } from "react";
import Window from "../Window";
import { FiCpu, FiFileText, FiZap, FiBookOpen } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useFileSystem } from "../FileSystemContext";
import { FiSave } from "react-icons/fi";

export default function NotesAIWindow() {
  const { isDarkTheme, textColor, mutedTextColor, borderColor, hoverBg, panelBg, emeraldBg, emeraldText } = useChatTheme();
  const { saveFile, activeFileId, openedFileContent, setActiveFileId } = useFileSystem();
  
  const [note, setNote] = useState("");
  const [aiInsight, setAiInsight] = useState("Write something to get AI insights...");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState("notes.md");

  // Load file content when activeFileId changes
  React.useEffect(() => {
    if (openedFileContent !== null) {
      setNote(openedFileContent);
    }
  }, [openedFileContent]);

  const handleSave = () => {
    if (!note.trim()) return;
    saveFile(fileName, note);
  };

  const handleNew = () => {
    setNote("");
    setFileName("notes.md");
    setActiveFileId(null);
  };

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
          <div className={`h-10 px-4 flex items-center justify-between border-b ${borderColor} ${panelBg}`}>
            <div className="flex items-center gap-2">
              <FiFileText size={14} className={mutedTextColor} />
              <input 
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className={`text-[11px] font-bold uppercase tracking-widest bg-transparent border-none outline-none ${mutedTextColor} w-40`}
                placeholder="filename.md"
              />
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleNew}
                className={`p-1.5 rounded-lg hover:${hoverBg} text-blue-500 transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider`}
              >
                <FiZap size={14} className="rotate-12" />
                New
              </button>
              <button 
                onClick={handleSave}
                className={`p-1.5 rounded-lg hover:${hoverBg} text-emerald-500 transition-colors flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider`}
              >
                <FiSave size={14} />
                Save
              </button>
            </div>
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
            <div className={`p-4 rounded-xl border ${borderColor} text-sm leading-relaxed ${isProcessing ? 'animate-pulse' : ''} ${isDarkTheme ? 'text-white/90' : 'text-neutral-900/90'}`}>
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
