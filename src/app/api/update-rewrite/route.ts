// app/api/hello/route.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

const textWritingPrompt = `You are an expert story updater. Given a story section, your task is to update bits and pieces of it using the provided tone and sentence complexity and keep the world count similar to OriginalText. Highlight the changes using the following tags so I can color them later:

- <blue> ... </blue> for word-level or tone-specific edits
- <green> ... </green> for sentence restructuring
- <red> ... </red> for added or omitted phrases

Return only the rewritten story section with tags embedded directly in the text.
`;

export async function POST(req: Request) {
  try {
    // received text from the frontend
    const { raw_text, tone, sentence_complexity } = await req.json();
    // console.log("text-length:", text.length);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          text: `${textWritingPrompt}, OriginalText: ${raw_text}, Tone: ${tone}, SentenceComplexity: ${sentence_complexity}`,
        },
      ],
    });
    const rawResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("rawResponse:", rawResponse);
    return Response.json(
      {
        updated_text: rawResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        json: null,
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
