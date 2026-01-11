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
    console.error("OPENAI_API_KEY is not set in environment variables");
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
      const errorMessage = errorData.error?.message || response.statusText;
      console.error("OpenAI API error response:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(errorMessage || `OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "";
    
    if (!content) {
      console.error("OpenAI API returned empty content:", data);
      throw new Error("OpenAI API boş yanıt döndü");
    }
    
    return content;
  } catch (error: any) {
    console.error("OpenAI API error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    throw error;
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
