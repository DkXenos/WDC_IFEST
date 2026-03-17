"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export type VirtualFile = {
  id: string;
  name: string;
  content: string;
  type: 'note' | 'design' | 'doc' | 'video' | 'folder' | 'image';
  date: string;
  size: string;
};

type FileSystemContextType = {
  files: VirtualFile[];
  saveFile: (name: string, content: string) => void;
  deleteFile: (id: string) => void;
  activeFileId: string | null;
  setActiveFileId: (id: string | null) => void;
  openedFileContent: string | null;
};

const FileSystemContext = createContext<FileSystemContextType | null>(null);

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<VirtualFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  const saveFile = useCallback((name: string, content: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-US", { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Estimate size
    const size = `${(new Blob([content]).size / 1024).toFixed(1)} KB`;

    const newFile: VirtualFile = {
      id,
      name: name.endsWith('.md') ? name : `${name}.md`,
      content,
      type: 'note',
      date: dateStr,
      size
    };

    setFiles(prev => [newFile, ...prev]);
  }, []);

  const deleteFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) setActiveFileId(null);
  }, [activeFileId]);

  const openedFileContent = useMemo(() => {
    if (!activeFileId) return null;
    return files.find(f => f.id === activeFileId)?.content || null;
  }, [activeFileId, files]);

  return (
    <FileSystemContext.Provider value={{
      files,
      saveFile,
      deleteFile,
      activeFileId,
      setActiveFileId,
      openedFileContent
    }}>
      {children}
    </FileSystemContext.Provider>
  );
}

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (!context) throw new Error("useFileSystem must be used within FileSystemProvider");
  return context;
};
