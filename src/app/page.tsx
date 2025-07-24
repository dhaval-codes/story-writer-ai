"use client";
import AppHeader from "@/components/AppHeader";
import LoadTextComponent from "@/components/LoadTextComponent";
import StoryStudio from "@/components/StoryStudio";
import PopUp from "@/components/PopUp";
import { useState } from "react";

// Define preset names
type PresetName =
  | "Bollywood Drama"
  | "Gothic Thriller"
  | "Fairy Tale"
  | "Horror"
  | "Custom"
  | string;

type Preset = {
  tone: string;
  sentence_complexity: string;
};

// Initial presets
const initialPresets: Record<string, Preset> = {
  "Bollywood Drama": {
    tone: "Emotional, intense, passionate",
    sentence_complexity:
      "Dramatic, with long, expressive sentences and metaphors",
  },
  "Gothic Thriller": {
    tone: "Dark, suspenseful, mysterious",
    sentence_complexity:
      "Rich, layered sentences with a mix of archaic and complex structures",
  },
  "Fairy Tale": {
    tone: "Whimsical, magical, hopeful",
    sentence_complexity:
      "Simple yet vivid, often with repetitive and lyrical phrasing",
  },
  Horror: {
    tone: "Tense, fearful, chilling",
    sentence_complexity:
      "Short, abrupt sentences with occasional graphic detail",
  },
};

export default function Home() {
  const [text, setText] = useState<string>("");
  const [processedJson, setProcessedJson] = useState<any>(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [presets, setPresets] =
    useState<Record<string, Preset>>(initialPresets);

  const OpenEditPopUp = (key: number) => {
    setIsPopUpOpen(true);
    setCurrentSection(key);
    console.log("index key:", key);
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
    // Logic to handle the section editing can be added here
  };

  const CloseEditPopUp = () => {
    setIsPopUpOpen(false);
    document.body.style.overflow = "";
    // Logic to save changes can be added here
  };

  return (
    <div className="flex flex-col h-auto w-full">
      {isPopUpOpen && (
        <PopUp
          processedJson={processedJson}
          setProcessedJson={setProcessedJson}
          closePopUp={CloseEditPopUp}
          index={currentSection}
          presets={presets}
          setPresets={setPresets}
        />
      )}
      <AppHeader />
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <LoadTextComponent
          text={text}
          setText={setText}
          setProcessedJson={setProcessedJson}
        />
        {processedJson && (
          <StoryStudio
            processedJson={processedJson}
            openEditPopUp={OpenEditPopUp}
          />
        )}
      </div>
    </div>
  );
}
