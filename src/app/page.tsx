"use client";
import AppHeader from "@/components/AppHeader";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("");
  return (
    <div className="flex flex-col h-auto w-full">
      <AppHeader />
    </div>
  );
}
