import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateChatCompletion, generateTitleFromFirstMessage } from '@/lib/openai';
import { MENTOR_SYSTEM_PROMPT } from '@/lib/mentor-prompt';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    // Get auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check rate limit
    const rateLimit = checkRateLimit(user.id);
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
    const { threadId, message, isFirstMessage } = body;

    if (!threadId || typeof threadId !== "string") {
      return NextResponse.json({ error: "Thread ID gereklidir" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Mesaj gereklidir" }, { status: 400 });
    }

    // Verify thread belongs to user
    const { data: thread, error: threadError } = await supabase
      .from("case_threads")
      .select("id, user_id, title")
      .eq("id", threadId)
      .eq("user_id", user.id)
      .single();

    if (threadError || !thread) {
      return NextResponse.json({ error: "Thread bulunamadı" }, { status: 404 });
    }

    // If first message, update thread title
    if (isFirstMessage && thread.title === "Yeni Case") {
      const title = generateTitleFromFirstMessage(message);
      await supabase
        .from("case_threads")
        .update({ title })
        .eq("id", threadId);
    }

    // Save user message
    const { data: userMessage, error: userMessageError } = await supabase
      .from("case_messages")
      .insert([
        {
          thread_id: threadId,
          user_id: user.id,
          role: "user",
          content: message.trim(),
        },
      ])
      .select()
      .single();

    if (userMessageError) {
      console.error("Error saving user message:", userMessageError);
      return NextResponse.json({ error: "Mesaj kaydedilemedi" }, { status: 500 });
    }

    // Get last 20 messages for context (limit for OpenAI)
    const { data: messages, error: messagesError } = await supabase
      .from("case_messages")
      .select("role, content")
      .eq("thread_id", threadId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(20);

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      return NextResponse.json({ error: "Mesajlar alınamadı" }, { status: 500 });
    }

    // Convert messages to OpenAI format
    const chatMessages = (messages || []).map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    }));

    // Generate assistant response using OpenAI
    let assistantResponse: string;
    try {
      assistantResponse = await generateChatCompletion(chatMessages, MENTOR_SYSTEM_PROMPT);
    } catch (openaiError: any) {
      console.error("OpenAI error in chat route:", {
        message: openaiError.message,
        stack: openaiError.stack,
      });
      // Return more specific error message if it's an API key issue
      if (openaiError.message?.includes("API key") || openaiError.message?.includes("not configured")) {
        return NextResponse.json(
          { error: "OpenAI API yapılandırması eksik. Lütfen yöneticiye bildirin." },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { error: "Şu an cevap üretemedim, tekrar dener misiniz?" },
        { status: 500 }
      );
    }

    // Save assistant message
    const { data: assistantMessage, error: assistantMessageError } = await supabase
      .from("case_messages")
      .insert([
        {
          thread_id: threadId,
          user_id: user.id,
          role: "assistant",
          content: assistantResponse,
        },
      ])
      .select()
      .single();

    if (assistantMessageError) {
      console.error("Error saving assistant message:", assistantMessageError);
      // Don't fail if message save fails, still return response
    }

    return NextResponse.json({
      message: assistantMessage || { role: "assistant", content: assistantResponse },
      remainingRequests: rateLimit.remaining,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Şu an cevap üretemedim, tekrar dener misiniz?" },
      { status: 500 }
    );
  }
}
