"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type WindowID = "notes" | "timer" | "tasks" | "forum" | "chats" | "calendar" | "files" | "profile" | "settings";

type WindowContextType = {
  openWindows: Set<WindowID>;
  toggleWindow: (id: WindowID) => void;
  closeWindow: (id: WindowID) => void;
  isWindowOpen: (id: WindowID) => boolean;
  focusedWindow: WindowID | null;
  setFocusedWindow: (id: WindowID | null) => void;
  isZenMode: boolean;
  setIsZenMode: (val: boolean) => void;
};

const WindowContext = createContext<WindowContextType | null>(null);

export function WindowProvider({ children }: { children: React.ReactNode }) {
  const [openWindows, setOpenWindows] = useState<Set<WindowID>>(new Set());
  const [focusedWindow, setFocusedWindow] = useState<WindowID | null>(null);
  const [isZenMode, setIsZenMode] = useState(false);

  const toggleWindow = useCallback((id: WindowID) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (focusedWindow === id) setFocusedWindow(null);
      } else {
        next.add(id);
        setFocusedWindow(id);
      }
      return next;
    });
  }, [focusedWindow]);

  const closeWindow = useCallback((id: WindowID) => {
    setOpenWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (focusedWindow === id) setFocusedWindow(null);
  }, [focusedWindow]);

  const isWindowOpen = useCallback((id: WindowID) => openWindows.has(id), [openWindows]);

  return (
    <WindowContext.Provider value={{ 
      openWindows, 
      toggleWindow, 
      closeWindow, 
      isWindowOpen,
      focusedWindow,
      setFocusedWindow,
      isZenMode,
      setIsZenMode
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) throw new Error("useWindows must be used within WindowProvider");
  return context;
};
