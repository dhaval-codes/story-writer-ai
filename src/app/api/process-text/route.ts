// app/api/hello/route.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

const textProcessingPrompt = `Analyze the provided text and return a structured JSON response with the following components:

Instructions:

1. Divide the text into logical sections based on its structure (e.g., paragraphs for stories, chapters for books, sections for documentation).
2. Create an array of objects representing each section.
3. Include the exact raw text that corresponds to each section.
4. Provide an overall analysis of the entire text.
5. Extract character information, if applicable.

Required JSON Structure:

{
  "overall_analysis": {
    "summary": "Proportional summary of the entire text (50–150 words depending on text length)",
    "writing_style_summary": "A 1–2 sentence description of the overall writing style, flow, and structure",
    "narration_type": "Point of view (e.g., first person, third person omniscient)",
    "narrative_tense": "Tense used predominantly (e.g., past, present, mixed)",
    "tone": "Overall tone (e.g., inspirational, serious, humorous, dramatic, neutral)",
    "pacing": "Narrative pacing (e.g., fast, medium, slow, varies)",
    "sentence_complexity": "Typical sentence structure (e.g., simple, compound, complex, varied)",
    "genre": "Text type (e.g., story, biography, documentation, article)",
  },
  "sections": [
    {
      "section_number": 1,
      "heading": "Use existing heading/chapter title OR generate an appropriate 3–6 word heading",
      "writing_style_summary": "A 1–2 sentence description of the overall writing style, flow, and structure",
      "narration_type": "Point of view (e.g., first person, third person omniscient)",
      "narrative_tense": "Tense used predominantly (e.g., past, present, mixed)",
      "tone": "Overall tone (e.g., inspirational, serious, humorous, dramatic, neutral)",
      "pacing": "Narrative pacing (e.g., fast, medium, slow, varies)",
      "sentence_complexity": "Typical sentence structure (e.g., simple, compound, complex, varied)",
      "raw_text": "Exact text content from the input that this section corresponds to"
    }
    // ...more sections
  ],
  "characters": [
    {
      "name": "Character name",
      "role": "Brief role description (e.g., protagonist, antagonist, supporting)",
      "description": "Key characteristics or notable details mentioned in the text"
    }
    // ...more characters
  ]
}

Guidelines:

- If no characters exist (e.g., in documentation), return an empty array for "characters".
- For section headings: use existing ones if available, otherwise generate clear and descriptive headings.
- Adjust summary lengths proportionally to section lengths.
- Maintain consistency in narration type throughout the analysis.
- Focus on structural and narrative elements, avoiding subjective interpretation.
- For each section, include the full verbatim text being analyzed for that section in the "raw_text" field.

Return only the final JSON object. Do not include code fences, markdown formatting, or any explanatory text. The output must be directly parsable using JSON.parse().
`;

export async function POST(req: Request) {
  try {
    // received text from the frontend
    const { text } = await req.json();
    console.log("text-length:", text.length);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `${textProcessingPrompt} and here's the text: ${text}`,
        },
      ],
    });
    const rawResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("rawResponse:", rawResponse);
    return Response.json(
      {
        json: JSON.parse(rawResponse),
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        json: null,
        message: error,
      },
      { status: 500 }
    );
  }
}
