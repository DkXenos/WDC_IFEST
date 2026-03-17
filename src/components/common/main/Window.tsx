"use client";

import React from "react";
import { motion, AnimatePresence, useDragControls, DragControls } from "framer-motion";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
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

  const shouldSkipSurfaceDrag = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return true;

    return Boolean(
      target.closest(
        "button, a, input, textarea, select, summary, [role='button'], [data-no-drag='true'], [contenteditable='true']"
      )
    );
  };

  return (
    <WindowDragContext.Provider value={controls}>
      <motion.div
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onPointerDownCapture={(e) => {
          if (!hideTitleBar) return;
          if (e.button !== 0) return;
          if (shouldSkipSurfaceDrag(e.target)) return;
          controls.start(e);
        }}
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
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                aria-label="Close"
                onClick={() => closeWindow(id)}
                className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10 transition-colors hover:bg-[#ff5f56]/80"
              />
              <button
                aria-label="Minimize"
                className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10 transition-colors hover:bg-[#ffbd2e]/80"
              />
              <button
                aria-label="Maximize"
                className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10 transition-colors hover:bg-[#27c93f]/80"
              />
            </div>

            <div className="flex items-center gap-2 min-w-0 px-3">
              {icon && <span className="text-emerald-500 shrink-0">{icon}</span>}
              <span className={`text-sm font-semibold tracking-wide truncate ${textColor}`}>{title}</span>
            </div>

            <div className="w-11.5" aria-hidden="true" />
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
