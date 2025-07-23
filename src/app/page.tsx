"use client";
import AppHeader from "@/components/AppHeader";
import LoadTextComponent from "@/components/LoadTextComponent";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  return (
    <div className="flex flex-col h-auto w-full">
      <AppHeader />
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <LoadTextComponent text={text} setText={setText} />
      </div>
    </div>
  );
}
