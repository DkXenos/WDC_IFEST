"use client";

import React from "react";
import { ChatThemeProvider } from "@/components/common/chats/ChatThemeContext";
import { WindowProvider } from "./WindowContext";
import { TimerProvider } from "./TimerContext";
import { FileSystemProvider } from "./FileSystemContext";
import GlobalVideoBackground from "./GlobalVideoBackground";

export default function GlobalAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChatThemeProvider>
      <WindowProvider>
        <TimerProvider>
          <FileSystemProvider>
            <GlobalVideoBackground />
            {children}
          </FileSystemProvider>
        </TimerProvider>
      </WindowProvider>
    </ChatThemeProvider>
  );
}
