"use client";
import React from "react";

function AppHeader() {
  return (
    <div className="w-full h-16 border-b px-24 flex items-center justify-between">
      <h1 className="text-lg font-bold">Story Writer AI</h1>
      <span className="text-sm">
        AI-driven writing assistant utilizing Google Gemini technology
      </span>
    </div>
  );
}

export default AppHeader;
