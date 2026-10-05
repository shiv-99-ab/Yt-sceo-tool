
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-3-flash-preview";

async function generate(prompt: string, schema: any): Promise<any> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Empty response from API");
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to generate content. Please check your API key and try again.");
  }
}

const listSchema = {
  type: Type.OBJECT,
  properties: {
    items: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
};

export const getKeywordSuggestions = async (topic: string): Promise<string[]> => {
  const prompt = `Act as a YouTube SEO expert. Generate a list of 20 high-traffic, low-competition keywords for a video about "${topic}". Include both long-tail and short-tail keywords.`;
  const result = await generate(prompt, listSchema);
  return result.items || [];
};

export const generateTitles = async (topic: string): Promise<string[]> => {
  const prompt = `Act as a viral marketing expert for YouTube. Generate 5 catchy, click-worthy, and SEO-optimized titles for a video about "${topic}". Titles must be under 70 characters.`;
  const result = await generate(prompt, listSchema);
  return result.items || [];
};

export const generateDescription = async (topic: string, title: string): Promise<string> => {
  const prompt = `Act as a YouTube SEO expert. Write a detailed, engaging, and SEO-optimized description for a video titled "${title}" about "${topic}". The description should be at least 200 words, include relevant keywords naturally, have a clear call-to-action, and use emojis. Also include a section for relevant links and a disclaimer.`;
  const schema = {
    type: Type.OBJECT,
    properties: {
      description: { type: Type.STRING },
    },
  };
  const result = await generate(prompt, schema);
  return result.description || '';
};

export const generateHashtags = async (topic: string): Promise<string[]> => {
  const prompt = `Act as a YouTube growth hacker. Generate a list of 25 relevant and trending hashtags for a video about "${topic}". Include a mix of broad, specific, and niche hashtags. Each hashtag must start with '#'.`;
  const result = await generate(prompt, listSchema);
  return result.items || [];
};

export const extractTags = async (topic: string): Promise<string[]> => {
  const prompt = `Act as a YouTube SEO analysis tool. Based on the video topic "${topic}", what are the most effective video tags this video would use to rank high? Generate a list of 30 relevant tags.`;
  const result = await generate(prompt, listSchema);
  return result.items || [];
};
