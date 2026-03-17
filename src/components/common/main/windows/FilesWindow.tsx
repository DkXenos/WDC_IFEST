"use client";

import React from "react";
import Window, { WindowDragHandle } from "../Window";
import { FiFolder, FiFileText, FiImage, FiVideo, FiSearch } from "react-icons/fi";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useWindows } from "../WindowContext";
import { useFileSystem, VirtualFile } from "../FileSystemContext";

const MOCK_FILES = [
  { id: "m1", name: "Project Proposal.pdf", type: "pdf", icon: FiFileText, date: "Today, 10:24 AM", size: "2.4 MB" },
  { id: "m2", name: "UI Architecture.fig", type: "design", icon: FiImage, date: "Yesterday, 3:15 PM", size: "15.8 MB" },
  { id: "m3", name: "Meeting Notes.docx", type: "doc", icon: FiFileText, date: "Oct 12, 2026", size: "12 KB" },
  { id: "m4", name: "Demo Recording.mp4", type: "video", icon: FiVideo, date: "Oct 10, 2026", size: "142.5 MB" },
  { id: "m5", name: "Assets", type: "folder", icon: FiFolder, date: "Oct 8, 2026", size: "--" },
  { id: "m6", name: "Client Logo.png", type: "image", icon: FiImage, date: "Oct 5, 2026", size: "4.1 MB" },
];

export default function FilesWindow() {
  const { borderColor, panelBg, hoverBg, activeBg, mutedTextColor, textColor } = useChatTheme();
  const { closeWindow, toggleWindow, isWindowOpen } = useWindows();
  const { files, setActiveFileId } = useFileSystem();

  const handleFileClick = (file: any) => {
    if (file.type === 'note') {
      setActiveFileId(file.id);
      if (!isWindowOpen("notes")) {
        toggleWindow("notes");
      }
    }
  };

  const allFiles = [...files.map(f => ({ ...f, icon: FiFileText })), ...MOCK_FILES];

  return (
    <Window 
      id="files" 
      title="Files Explorer" 
      icon={<FiFolder size={18} />}
      width="900px"
      height="550px"
      hideTitleBar={true}
    >
        <div className="flex w-full h-full pointer-events-none">
            <div className={`w-56 shrink-0 border-r ${borderColor} bg-black/5 dark:bg-black/20 flex flex-col overflow-y-auto h-full pointer-events-auto`}>
                {/* Mac OS Window Controls */}
                <WindowDragHandle className="flex items-center gap-2 px-5 py-5 sticky top-0 z-10 w-full mb-2">
                   <button onClick={() => closeWindow("files")} aria-label="Close" className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 shadow-sm border border-black/10 transition-colors pointer-events-auto" />
                   <button aria-label="Minimize" className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 shadow-sm border border-black/10 transition-colors pointer-events-auto" />
                   <button aria-label="Maximize" className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 shadow-sm border border-black/10 transition-colors pointer-events-auto" />
                </WindowDragHandle>

                <div className="px-3 pb-6 flex flex-col gap-1">
                <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-1 mb-1`}>Favorites</div>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${activeBg} shadow-sm ${textColor}`}>
                    <FiSearch size={14} className="text-blue-500" /> Recents
                </button>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <FiFolder size={14} className="text-blue-500" /> Desktop
                </button>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <FiFolder size={14} className="text-blue-500" /> Documents
                </button>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <FiFolder size={14} className="text-blue-500" /> Downloads
                </button>
                
                <div className={`px-2 py-1 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} mt-4 mb-1`}>Tags</div>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-sm" /> Important
                </button>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-sm" /> Work
                </button>
                <button className={`flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium rounded-lg w-full text-left ${hoverBg} ${textColor}`}>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-sm" /> Personal
                </button>
                </div>
            </div>

            <div className={`flex-1 flex flex-col overflow-hidden bg-transparent h-full pointer-events-auto`}>
                {/* Top Bar */}
                <div className={`flex items-center justify-between border-b ${borderColor} px-6 py-4 h-[60px] shrink-0`}>
                <div className="flex items-center gap-4">
                    <span className={`font-semibold text-lg tracking-tight ${textColor}`}>Recents</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${borderColor} bg-black/5 dark:bg-black/20 ${mutedTextColor} shadow-sm`}>
                    <FiSearch size={14} />
                    <input 
                    type="text" 
                    placeholder="Search" 
                    className="bg-transparent border-none outline-none text-[13px] w-44 placeholder:text-current font-medium"
                    />
                </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                <div className={`grid grid-cols-5 gap-4 mb-3 text-[11px] font-bold uppercase tracking-wider ${mutedTextColor} px-3`}>
                    <div className="col-span-2">Name</div>
                    <div>Date Modified</div>
                    <div>Size</div>
                    <div>Kind</div>
                </div>

                <div className="flex flex-col gap-1">
                    {allFiles.map((file) => (
                    <div 
                        key={file.id} 
                        onDoubleClick={() => handleFileClick(file)}
                        className={`grid grid-cols-5 items-center gap-4 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${hoverBg} group`}
                    >
                        <div className="col-span-2 flex items-center gap-3">
                        <file.icon size={18} className={`shrink-0 ${file.type === 'folder' ? 'text-blue-400 fill-blue-400/20' : file.type === 'pdf' ? 'text-red-400' : file.type === 'note' ? 'text-emerald-400' : 'text-neutral-400'}`} />
                        <span className={`text-[13px] font-medium truncate ${textColor}`}>{file.name}</span>
                        </div>
                        <div className={`text-[12px] font-medium ${mutedTextColor} truncate`}>{file.date}</div>
                        <div className={`text-[12px] font-medium ${mutedTextColor}`}>{file.size}</div>
                        <div className={`text-[12px] font-medium ${mutedTextColor} uppercase`}>{file.type}</div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    </Window>
  );
}
