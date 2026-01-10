// OpenAI API client for server-side use only

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

if (!OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set. OpenAI features will not work.");
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function generateChatCompletion(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    throw new Error(error.message || "OpenAI API istek hatası");
  }
}

export function generateTitleFromFirstMessage(firstMessage: string): string {
  // İlk mesajdan 6-8 kelime ile title üret
  const words = firstMessage.trim().split(/\s+/);
  const titleWords = words.slice(0, 8); // Max 8 kelime
  let title = titleWords.join(" ");
  
  // Eğer çok uzunsa kes
  if (title.length > 60) {
    title = title.substring(0, 57) + "...";
  }
  
  return title || "Yeni Case";
}
