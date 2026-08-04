import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateChatCompletion, generateTitleFromFirstMessage } from '@/lib/openai';
import { MENTOR_SYSTEM_PROMPT } from '@/lib/mentor-prompt';
import { sanitizeMessage } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

function getClientId(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'anonymous';
  }
  return request.headers.get('x-real-ip') || 'anonymous';
}

export async function POST(request: NextRequest) {
  try {
    const rateLimit = checkRateLimit(getClientId(request));
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Rate limit aşıldı. Lütfen daha sonra tekrar deneyin.",
          resetAt: rateLimit.resetAt,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { message, history = [], isFirstMessage } = body;

    let sanitizedMessage: string;
    try {
      sanitizedMessage = sanitizeMessage(message);
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Geçersiz mesaj" }, { status: 400 });
    }

    const chatMessages = [
      ...(Array.isArray(history) ? history : [])
        .filter(
          (msg: any) =>
            msg &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string"
        )
        .slice(-19)
        .map((msg: any) => ({
          role: msg.role as "user" | "assistant",
          content: String(msg.content).slice(0, 10000),
        })),
      { role: "user" as const, content: sanitizedMessage },
    ];

    let assistantResponse: string;
    try {
      assistantResponse = await generateChatCompletion(chatMessages, MENTOR_SYSTEM_PROMPT);
    } catch (openaiError: any) {
      console.error("OpenAI error in chat route:", {
        message: openaiError.message,
        stack: openaiError.stack,
        error: openaiError,
      });
      if (openaiError.message?.includes("API key") || openaiError.message?.includes("not configured")) {
        return NextResponse.json(
          { error: "OpenAI API yapılandırması eksik. Lütfen yöneticiye bildirin." },
          { status: 500 }
        );
      }
      if (
        openaiError.message?.includes("quota") ||
        openaiError.message?.includes("insufficient_quota") ||
        openaiError.message?.includes("billing")
      ) {
        return NextResponse.json(
          { error: "OpenAI API kotası doldu. Lütfen OpenAI hesabınızda billing ayarlarını kontrol edin." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        {
          error: "Şu an cevap üretemedim, tekrar dener misiniz?",
          details: process.env.NODE_ENV === 'development' ? openaiError.message : undefined,
        },
        { status: 500 }
      );
    }

    const updatedTitle =
      isFirstMessage ? generateTitleFromFirstMessage(sanitizedMessage) : null;

    return NextResponse.json({
      message: {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: assistantResponse,
        created_at: new Date().toISOString(),
      },
      remainingRequests: rateLimit.remaining,
      ...(updatedTitle && { threadTitle: updatedTitle }),
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Şu an cevap üretemedim, tekrar dener misiniz?" },
      { status: 500 }
    );
  }
}
