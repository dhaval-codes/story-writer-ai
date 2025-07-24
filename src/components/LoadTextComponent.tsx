"use client";
import React from "react";
import AppButton from "./AppButton";
import axios from "axios";

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

  setProcessedJson,
}: {
  text: string;
  setText: (text: string) => void;

  setProcessedJson: (json: any) => void;
}) {
  const wordCount = getWordCount(text);
  const warningColor = getWarningColor(wordCount);

  const ProcessTextFunc = async (text: string) => {
    try {
      let res = await axios.post("/api/process-text", { text });
      if (res.data.json) {
        setProcessedJson(res.data.json);
      }
    } catch (error) {
      console.error("Error processing text:", error);
    }
  };

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
          text="Load Text"
          onClick={() => ProcessTextFunc(text)}
          disabled={!text || wordCount > 1000}
        />
      </div>
    </div>
  );
}

export default LoadTextComponent;
