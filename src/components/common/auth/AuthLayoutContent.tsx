"use client";

import React from "react";

export default function AuthLayoutContent({ children }: { children: React.ReactNode }) {

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center z-10 overflow-hidden pt-4 pb-28 lg:pb-32">
      {/* Forms will render here */}
      <div className="flex-1 w-full flex flex-col items-center justify-center pointer-events-auto">
        {children}
      </div>
    </main>
  );
}
