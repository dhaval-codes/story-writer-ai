"use client";
import React from "react";
import { MdOutlineEdit } from "react-icons/md";

function StoryStudio({
  processedJson,
  openEditPopUp,
}: {
  processedJson: any;
  openEditPopUp: (key: number) => void;
}) {
  return (
    <div className="flex flex-col justify-center w-full h-full p-4 gap-2">
      <h1 className="text-2xl font-bold">Story Studio</h1>
      {/* story sections component */}
      <span className="font-bold text-xl">➡️ Story Sections</span>
      <div className="w-full max-h-96 overflow-y-auto flex flex-col">
        {processedJson.sections.map((section: any, index: number) => (
          <div
            key={index}
            className={`p-4 ${
              index % 2 === 0 ? "bg-green-100" : "bg-blue-100"
            }`}
          >
            {/* {console.log(index, "inline index")} */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{section.heading}</h2>
              <div
                className="cursor-pointer"
                onClick={() => openEditPopUp(index)}
              >
                <MdOutlineEdit size={24} />
              </div>
            </div>
            <p className="text-lg">{section.raw_text}</p>
            <div className="mt-2 border rounded p-2 bg-white">
              <h3 className="text-lg font-semibold mb-1">Metadata</h3>
              <div className="text-lg">
                <span className="font-medium">Writing Style Summary:</span>{" "}
                {section.writing_style_summary}
              </div>
              <div className="text-lg">
                <span className="font-medium">Narration Type:</span>{" "}
                {section.narration_type}
              </div>
              <div className="text-lg">
                <span className="font-medium">Narrative Tense:</span>{" "}
                {section.narrative_tense}
              </div>
              <div className="text-lg">
                <span className="font-medium">Tone:</span> {section.tone}
              </div>
              <div className="text-lg">
                <span className="font-medium">Pacing:</span> {section.pacing}
              </div>
              <div className="text-lg">
                <span className="font-medium">Sentence Complexity:</span>{" "}
                {section.sentence_complexity}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* overall analysis */}
      <span className="font-bold text-xl">➡️ Overall Analysis</span>
      <div className="border rounded p-2 bg-white">
        <div className="text-lg">
          <span className="font-medium">Summary:</span>{" "}
          {processedJson.overall_analysis.summary}
        </div>
        <div className="text-lg">
          <span className="font-medium">Writing Style Summary:</span>{" "}
          {processedJson.overall_analysis.writing_style_summary}
        </div>
        <div className="text-lg">
          <span className="font-medium">Narration Type:</span>{" "}
          {processedJson.overall_analysis.narration_type}
        </div>
        <div className="text-lg">
          <span className="font-medium">Narrative Tense:</span>{" "}
          {processedJson.overall_analysis.narrative_tense}
        </div>
        <div className="text-lg">
          <span className="font-medium">Tone:</span>{" "}
          {processedJson.overall_analysis.tone}
        </div>
        <div className="text-lg">
          <span className="font-medium">Pacing:</span>{" "}
          {processedJson.overall_analysis.pacing}
        </div>
        <div className="text-lg">
          <span className="font-medium">Sentence Complexity:</span>{" "}
          {processedJson.overall_analysis.sentence_complexity}
        </div>
        <div className="text-lg">
          <span className="font-medium">Genre:</span>{" "}
          {processedJson.overall_analysis.genre}
        </div>
      </div>
      {/* characters */}
      <span className="font-bold text-xl">➡️ Characters</span>
      <div className="bg-white">
        {processedJson.characters.map((character: any, index: number) => (
          <div
            key={index}
            className={`text-lg mb-2 p-3 rounded ${
              index % 2 === 0 ? "bg-yellow-100" : "bg-purple-100"
            }`}
          >
            <span className="font-medium">{character.name}:</span>{" "}
            {character.description}
            <div className="text-sm text-gray-600">
              <span className="font-medium">Role:</span> {character.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoryStudio;
