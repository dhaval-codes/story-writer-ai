"use client";

import React, { useState } from "react";
import AppButton from "./AppButton";
import axios from "axios";

// Define preset types
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

type Section = {
  heading: string;
  raw_text: string;
  tone: string;
  sentence_complexity: string;
};

type Props = {
  processedJson: { sections: Section[] };
  closePopUp: () => void;
  setProcessedJson: React.Dispatch<React.SetStateAction<any>>;
  index: number;
  presets: Record<string, Preset>;
  setPresets: React.Dispatch<React.SetStateAction<Record<string, Preset>>>;
};

function convertCustomTagsToSpans(text: string) {
  return text
    .replace(/<blue>(.*?)<\/blue>/g, '<span class="blue">$1</span>')
    .replace(/<green>(.*?)<\/green>/g, '<span class="green">$1</span>')
    .replace(/<red>(.*?)<\/red>/g, '<span class="red">$1</span>');
}

function PopUp({
  processedJson,
  closePopUp,
  setProcessedJson,
  index,
  presets,
  setPresets,
}: Props) {
  const section = processedJson.sections[index];

  const [heading, setHeading] = useState(section.heading);
  const [rawText, setRawText] = useState(section.raw_text);
  const [tone, setTone] = useState(section.tone);
  const [sentenceComplexity, setSentenceComplexity] = useState(
    section.sentence_complexity
  );
  const [presetName, setPresetName] = useState<PresetName>("Custom");
  const [newPresetName, setNewPresetName] = useState("");

  const [updatedText, setUpdatedText] = useState<string>("");
  const [loadingRewrite, setLoadingRewrite] = useState(false);
  const [rewriteError, setRewriteError] = useState("");

  const handlePresetChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = e.target.value;
    setPresetName(selected);

    let updatedTone = tone;
    let updatedComplexity = sentenceComplexity;

    if (selected === "Custom") {
      updatedTone = section.tone;
      updatedComplexity = section.sentence_complexity;
    } else {
      const selectedPreset = presets[selected];
      if (selectedPreset) {
        updatedTone = selectedPreset.tone;
        updatedComplexity = selectedPreset.sentence_complexity;
        setTone(updatedTone);
        setSentenceComplexity(updatedComplexity);
      }
    }

    // API call to update-rewrite
    try {
      setLoadingRewrite(true);
      setRewriteError("");

      const response = await axios.post("/api/update-rewrite", {
        raw_text: rawText,
        tone: updatedTone,
        sentence_complexity: updatedComplexity,
      });

      setUpdatedText(response.data.updated_text);
    } catch (err) {
      console.error("Rewrite Error:", err);
      setRewriteError("Failed to update text.");
    } finally {
      setLoadingRewrite(false);
    }
  };

  const handleSaveAsPreset = () => {
    if (!newPresetName.trim()) return;

    const newPresets = {
      ...presets,
      [newPresetName]: {
        tone,
        sentence_complexity: sentenceComplexity,
      },
    };

    setPresets(newPresets);
    setPresetName(newPresetName);
    setNewPresetName("");
  };

  const handleSaveChanges = () => {
    let cleanedText = updatedText
      ? updatedText
          // Remove <red>...</red> including the text inside
          .replace(/<red>[\s\S]*?<\/red>/g, "")
          // Remove only the tags for blue and green, keep their text
          .replace(/<\/?(blue|green)>/g, "")
      : rawText;

    const updatedSections = processedJson.sections.map((sec, i) => {
      if (i !== index) return sec;

      return {
        ...sec,
        heading,
        raw_text: cleanedText,
        tone,
        sentence_complexity: sentenceComplexity,
      };
    });

    console.log("Updated Sections:", updatedSections);
    const updatedJson = {
      ...processedJson,
      sections: updatedSections,
    };
    setProcessedJson(updatedJson);
    closePopUp();
  };

  return (
    <div className="h-full w-full bg-gray-200/70 flex items-center justify-center absolute z-50">
      <div className="w-[600px] max-h-[90vh] overflow-y-auto flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">Edit Story Section</h2>

        {/* Section Heading */}
        <label className="text-lg font-medium">Section Heading:</label>
        <input
          type="text"
          value={heading}
          className="p-2 border rounded text-lg"
          onChange={(e) => setHeading(e.target.value)}
        />

        {/* Section Content */}
        <label className="text-lg font-medium">Section Content:</label>
        <textarea
          className="p-2 border rounded text-lg h-60 resize-y min-h-[10rem]"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        {/* Tone Preset Selection */}
        <label className="text-lg font-medium mt-2">Tone Preset:</label>
        <select
          value={presetName}
          onChange={handlePresetChange}
          className="p-2 border rounded text-lg"
        >
          <option value="Custom">Custom</option>
          {Object.keys(presets).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Tone and Complexity Values */}
        <label className="text-lg font-medium mt-2">Tone:</label>
        <span className="text-md">{tone}</span>

        <label className="text-lg font-medium">Sentence Complexity:</label>
        <span className="text-md">{sentenceComplexity}</span>

        {/* Rewritten Output */}
        <label className="text-lg font-medium mt-2">Rewritten Output:</label>
        {loadingRewrite && (
          <span className="text-blue-500">Loading rewrite...</span>
        )}
        {rewriteError && <span className="text-red-500">{rewriteError}</span>}
        {updatedText && (
          <span
            className="text-md p-2 rounded border"
            dangerouslySetInnerHTML={{
              __html: convertCustomTagsToSpans(updatedText),
            }}
          />
        )}

        {/* Save New Preset */}
        {presetName === "Custom" && (
          <>
            <label className="text-lg font-medium mt-2">
              Save Custom as New Preset:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="New Preset Name"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="p-2 border rounded text-md flex-1"
              />
              <AppButton text="Save Preset" onClick={handleSaveAsPreset} />
            </div>
          </>
        )}

        {/* Save Changes Button */}
        <AppButton text="Save Changes" onClick={handleSaveChanges} />
      </div>
    </div>
  );
}

export default PopUp;
