"use client";
import React from "react";
import AppButton from "./AppButton";

function getWordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function getWarningColor(wordCount: number) {
  if (wordCount > 1000) return "red";
  if (wordCount > 800) return "yellow";
  return "green";
}

function LoadTextComponent({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) {
  const wordCount = getWordCount(text);
  const warningColor = getWarningColor(wordCount);

  return (
    <div className="w-full h-80 flex flex-col gap-2 items-center justify-center p-4">
      <textarea
        autoFocus
        className="w-full h-full resize-none overflow-auto border-solid border-2 border-gray-400 rounded-lg p-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="w-full h-auto flex justify-between items-center">
        <span
          className={`w-3 h-3 rounded-full`}
          style={{
            backgroundColor:
              warningColor === "red"
                ? "#ef4444"
                : warningColor === "yellow"
                ? "#facc15"
                : "#22c55e",
          }}
          title={
            warningColor === "red"
              ? "Too many words"
              : warningColor === "yellow"
              ? "Approaching limit"
              : "Good"
          }
        />

        <AppButton
          text="Submit"
          onClick={() => console.log(text)}
          disabled={!text || wordCount > 1000}
        />
      </div>
    </div>
  );
}

export default LoadTextComponent;
