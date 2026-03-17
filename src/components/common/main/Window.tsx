"use client";

import React from "react";
import { motion, AnimatePresence, useDragControls, DragControls } from "framer-motion";
import { useChatTheme } from "@/components/common/chats/ChatThemeContext";
import { useWindows, WindowID } from "./WindowContext";
import { cn } from "@/lib/utils";

export const WindowDragContext = React.createContext<DragControls | null>(null);

export const WindowDragHandle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const controls = React.useContext(WindowDragContext);
  return (
    <div
      className={cn("cursor-grab active:cursor-grabbing touch-none select-none", className)}
      onPointerDown={(e) => controls?.start(e)}
    >
      {children}
    </div>
  );
};

// ─── Resize handle descriptors ──────────────────────────────────────────────

type Direction = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

interface HandleDef {
  dir: Direction;
  cursor: string;
  /** Tailwind classes that position the invisible hit area */
  className: string;
}

const HANDLES: HandleDef[] = [
  // edges
  {
    dir: "n",
    cursor: "cursor-ns-resize",
    className: "top-0 left-2 right-2 h-2",
  },
  {
    dir: "e",
    cursor: "cursor-ew-resize",
    className: "top-2 right-0 bottom-2 w-2",
  },
  {
    dir: "s",
    cursor: "cursor-ns-resize",
    className: "bottom-0 left-2 right-2 h-2",
  },
  {
    dir: "w",
    cursor: "cursor-ew-resize",
    className: "top-2 left-0 bottom-2 w-2",
  },
  // corners
  {
    dir: "ne",
    cursor: "cursor-nesw-resize",
    className: "top-0 right-0 w-4 h-4",
  },
  {
    dir: "se",
    cursor: "cursor-nwse-resize",
    className: "bottom-0 right-0 w-4 h-4",
  },
  {
    dir: "sw",
    cursor: "cursor-nesw-resize",
    className: "bottom-0 left-0 w-4 h-4",
  },
  {
    dir: "nw",
    cursor: "cursor-nwse-resize",
    className: "top-0 left-0 w-4 h-4",
  },
];

// ─── Props ───────────────────────────────────────────────────────────────────

interface WindowProps {
  id: WindowID;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  height?: string;
  hideTitleBar?: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MIN_W = 360;
const MIN_H = 280;

function parseSize(val: string, viewport: number): number {
  if (val.endsWith("vw")) return (parseFloat(val) / 100) * viewport;
  if (val.endsWith("vh")) return (parseFloat(val) / 100) * viewport;
  if (val.endsWith("px")) return parseFloat(val);
  return parseFloat(val);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Window({
  id,
  title,
  icon,
  children,
  width = "600px",
  height = "450px",
  hideTitleBar = false,
}: WindowProps) {
  const { containerBg, borderColor, textColor, panelBg, hoverBg } = useChatTheme();
  const { closeWindow, focusedWindow, setFocusedWindow } = useWindows();
  const dragControls = useDragControls();

  // ── size state ──────────────────────────────────────────────────────────
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null);

  // Initialise once from prop strings
  const initSize = React.useCallback(() => {
    if (size) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setSize({
      w: Math.max(MIN_W, parseSize(width, vw)),
      h: Math.max(MIN_H, parseSize(height, vh)),
    });
  }, [size, width, height]);

  React.useEffect(() => {
    initSize();
  }, [initSize]);

  const isFocused = focusedWindow === id;
  const resizingRef = React.useRef(false);

  // ── drag-surface guard ──────────────────────────────────────────────────
  const shouldSkipSurfaceDrag = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return true;
    return Boolean(
      target.closest(
        "button, a, input, textarea, select, summary, [role='button'], [data-no-drag='true'], [data-resize-handle='true'], [contenteditable='true']"
      )
    );
  };

  // ── generic resize handler ───────────────────────────────────────────────
  const handleResizeStart = (
    e: React.PointerEvent<HTMLDivElement>,
    dir: Direction
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setFocusedWindow(id);

    const el = e.currentTarget.parentElement as HTMLElement;
    const startRect = el.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;

    resizingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      const maxW = window.innerWidth - 24;
      const maxH = window.innerHeight - 24;

      let newW = startRect.width;
      let newH = startRect.height;

      if (dir.includes("e")) newW = Math.min(maxW, Math.max(MIN_W, startRect.width + dx));
      if (dir.includes("w")) newW = Math.min(maxW, Math.max(MIN_W, startRect.width - dx));
      if (dir.includes("s")) newH = Math.min(maxH, Math.max(MIN_H, startRect.height + dy));
      if (dir.includes("n")) newH = Math.min(maxH, Math.max(MIN_H, startRect.height - dy));

      setSize({ w: newW, h: newH });
    };

    const onUp = () => {
      resizingRef.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // ── computed style ───────────────────────────────────────────────────────
  const motionStyle: React.CSSProperties = size
    ? { width: size.w, height: size.h }
    : { width, height };

  return (
    <WindowDragContext.Provider value={dragControls}>
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onPointerDownCapture={(e) => {
          if (resizingRef.current) return;
          if (e.button !== 0) return;
          if (shouldSkipSurfaceDrag(e.target)) return;
          dragControls.start(e);
        }}
        onPointerDown={() => setFocusedWindow(id)}
        style={{
          zIndex: isFocused ? 100 : 50,
          ...motionStyle,
        }}
        className={cn(
          "fixed inset-0 m-auto flex flex-col rounded-2xl border shadow-2xl overflow-hidden backdrop-blur-2xl transition-shadow duration-300",
          containerBg,
          borderColor,
          isFocused ? "shadow-emerald-500/10" : ""
        )}
      >
        {/* ── Title Bar ────────────────────────────────────────────── */}
        {!hideTitleBar && (
          <div
            className={cn(
              "h-11 shrink-0 flex items-center justify-between px-4 border-b cursor-grab active:cursor-grabbing",
              borderColor,
              panelBg
            )}
            onPointerDown={(e) => dragControls.start(e)}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                aria-label="Close"
                onClick={() => closeWindow(id)}
                className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm border border-black/10 hover:bg-[#ff5f56]/80 transition-colors"
              />
              <button
                aria-label="Minimize"
                className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm border border-black/10 hover:bg-[#ffbd2e]/80 transition-colors"
              />
              <button
                aria-label="Maximize"
                className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm border border-black/10 hover:bg-[#27c93f]/80 transition-colors"
              />
            </div>

            {/* Window title */}
            <div className="flex items-center gap-2 min-w-0 px-3">
              {icon && <span className="text-emerald-500 shrink-0">{icon}</span>}
              <span className={cn("text-sm font-semibold tracking-wide truncate", textColor)}>
                {title}
              </span>
            </div>

            <div className="w-[46px]" aria-hidden />
          </div>
        )}

        {/* ── Content ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-hidden pointer-events-auto min-h-0">
          {children}
        </div>

        {/* ── Resize handles (all 8 directions) ────────────────────── */}
        {HANDLES.map(({ dir, cursor, className }) => (
          <div
            key={dir}
            data-resize-handle="true"
            className={cn("absolute z-50", cursor, className)}
            onPointerDown={(e) => handleResizeStart(e, dir)}
          />
        ))}

        {/* ── SE corner visual indicator (subtle dots, macOS-like) ─── */}
        <div className="absolute bottom-1 right-1 z-40 pointer-events-none select-none opacity-30">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <circle cx="10" cy="10" r="1.2" fill="currentColor" className={textColor} />
            <circle cx="6.5" cy="10" r="1.2" fill="currentColor" className={textColor} />
            <circle cx="10" cy="6.5" r="1.2" fill="currentColor" className={textColor} />
          </svg>
        </div>
      </motion.div>
    </WindowDragContext.Provider>
  );
}