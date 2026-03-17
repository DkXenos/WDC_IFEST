"use client";

import React from "react";
import { ChatThemeProvider } from "@/components/common/chats/ChatThemeContext";
import GlobalVideoBackground from "./GlobalVideoBackground";

export default function GlobalAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChatThemeProvider>
      <GlobalVideoBackground />
      {children}
    </ChatThemeProvider>
  );
}
