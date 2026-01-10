import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;
    
    // Get auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify thread belongs to user
    const { data: thread, error: threadError } = await supabase
      .from("case_threads")
      .select("id, user_id")
      .eq("id", threadId)
      .eq("user_id", user.id)
      .single();

    if (threadError || !thread) {
      return NextResponse.json({ error: "Thread bulunamadı" }, { status: 404 });
    }

    // Get last 20 messages for context (OpenAI context window)
    const { data: messages, error } = await supabase
      .from("case_messages")
      .select("*")
      .eq("thread_id", threadId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(20);

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json({ error: "Mesajlar alınamadı" }, { status: 500 });
    }

    return NextResponse.json({ messages: messages || [] });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;
    
    // Get auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify thread belongs to user
    const { data: thread, error: threadError } = await supabase
      .from("case_threads")
      .select("id, user_id")
      .eq("id", threadId)
      .eq("user_id", user.id)
      .single();

    if (threadError || !thread) {
      return NextResponse.json({ error: "Thread bulunamadı" }, { status: 404 });
    }

    const body = await request.json();
    const { role, content } = body;

    if (!role || !['user', 'assistant'].includes(role)) {
      return NextResponse.json({ error: "Geçersiz role" }, { status: 400 });
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Content gereklidir" }, { status: 400 });
    }

    // Insert message
    const { data: message, error } = await supabase
      .from("case_messages")
      .insert([
        {
          thread_id: threadId,
          user_id: user.id,
          role,
          content: content.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating message:", error);
      return NextResponse.json({ error: "Mesaj kaydedilemedi" }, { status: 500 });
    }

    return NextResponse.json({ message });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
