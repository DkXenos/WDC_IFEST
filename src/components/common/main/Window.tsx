"use client";

import React from "react";
import { motion, AnimatePresence, useDragControls, DragControls } from "framer-motion";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi";
import { useWindows, WindowID } from "./WindowContext";
import { cn } from "@/lib/utils";

export const WindowDragContext = React.createContext<DragControls | null>(null);

export const WindowDragHandle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const controls = React.useContext(WindowDragContext);
  return (
    <div className={cn("cursor-grab active:cursor-grabbing touch-none select-none", className)} onPointerDown={(e) => controls?.start(e)}>
      {children}
    </div>
  );
};

interface WindowProps {
  id: WindowID;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  height?: string;
  hideTitleBar?: boolean;
}

export default function Window({ id, title, icon, children, width = "600px", height = "450px", hideTitleBar = false }: WindowProps) {
  const { containerBg, borderColor, textColor, panelBg, hoverBg } = useChatTheme();
  const { closeWindow, focusedWindow, setFocusedWindow } = useWindows();
  const controls = useDragControls();

  const isFocused = focusedWindow === id;

  return (
    <WindowDragContext.Provider value={controls}>
      <motion.div
        drag
        dragControls={controls}
        dragListener={!hideTitleBar}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onPointerDown={() => setFocusedWindow(id)}
        style={{ 
          zIndex: isFocused ? 100 : 50,
          width,
          height
        }}
        className={`fixed top-20 left-1/4 flex flex-col ${containerBg} border ${borderColor} rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl transition-shadow duration-300 ${isFocused ? 'shadow-emerald-500/10' : ''}`}
      >
        {/* Title Bar */}
        {!hideTitleBar && (
          <div 
            className={`h-11 shrink-0 flex items-center justify-between px-4 border-b ${borderColor} cursor-grab active:cursor-grabbing ${panelBg}`}
            onPointerDown={(e) => controls.start(e)}
          >
            <div className="flex items-center gap-2">
              {icon && <span className="text-emerald-500">{icon}</span>}
              <span className={`text-sm font-semibold tracking-wide ${textColor}`}>{title}</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button className={`p-1.5 rounded-lg transition-colors ${hoverBg} ${textColor}/40 hover:${textColor}`}>
                <FiMinus size={14} />
              </button>
              <button className={`p-1.5 rounded-lg transition-colors ${hoverBg} ${textColor}/40 hover:${textColor}`}>
                <FiMaximize2 size={14} />
              </button>
              <button 
                onClick={() => closeWindow(id)}
                className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <FiX size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-hidden pointer-events-auto">
          {children}
        </div>
      </motion.div>
    </WindowDragContext.Provider>
  );
}
