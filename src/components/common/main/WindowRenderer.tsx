"use client";

import React from "react";
import { useWindows } from "./WindowContext";
import { AnimatePresence } from "framer-motion";
import NotesAIWindow from "./windows/NotesAIWindow";
import StudyModeWindow from "./windows/StudyModeWindow";
import TaskManagerWindow from "./windows/TaskManagerWindow";
import ForumWindow from "./windows/ForumWindow";

export default function WindowRenderer() {
  const { openWindows } = useWindows();

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 
        The parent has pointer-events-none so it doesn't block the desktop.
        Each Window component inside will have pointer-events-auto to be interactive.
      */}
      <AnimatePresence>
        {Array.from(openWindows).map((id) => {
          switch (id) {
            case "notes":
              return <NotesAIWindow key={id} />;
            case "timer":
              return <StudyModeWindow key={id} />;
            case "tasks":
              return <TaskManagerWindow key={id} />;
            case "forum":
              return <ForumWindow key={id} />;
            default:
              return null;
          }
        })}
      </AnimatePresence>
    </div>
  );
}
