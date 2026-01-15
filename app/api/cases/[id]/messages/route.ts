import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeUUID, sanitizeRole, sanitizeMessage } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey; // Fallback to anon key if service key not set

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: threadId } = await params;

    // Sanitize thread ID
    let sanitizedThreadId: string;
    try {
      sanitizedThreadId = sanitizeUUID(threadId);
    } catch (error: any) {
      return NextResponse.json({ error: "Geçersiz thread ID" }, { status: 400 });
    }
    
    // Get auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Verify user with token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service role client for queries (bypasses RLS but we filter by user_id)
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Verify thread belongs to user
    const { data: thread, error: threadError } = await supabaseService
      .from("case_threads")
      .select("id, user_id")
      .eq("id", sanitizedThreadId)
      .eq("user_id", user.id)
      .single();

    if (threadError || !thread) {
      return NextResponse.json({ error: "Thread bulunamadı" }, { status: 404 });
    }

    // Get last 20 messages for context (OpenAI context window)
    const { data: messages, error } = await supabaseService
      .from("case_messages")
      .select("*")
      .eq("thread_id", sanitizedThreadId)
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

    // Sanitize thread ID
    let sanitizedThreadId: string;
    try {
      sanitizedThreadId = sanitizeUUID(threadId);
    } catch (error: any) {
      return NextResponse.json({ error: "Geçersiz thread ID" }, { status: 400 });
    }
    
    // Get auth token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Verify user with token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Use service role client for queries (bypasses RLS but we filter by user_id)
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Verify thread belongs to user
    const { data: thread, error: threadError } = await supabaseService
      .from("case_threads")
      .select("id, user_id")
      .eq("id", sanitizedThreadId)
      .eq("user_id", user.id)
      .single();

    if (threadError || !thread) {
      return NextResponse.json({ error: "Thread bulunamadı" }, { status: 404 });
    }

    const body = await request.json();
    const { role, content } = body;

    // Sanitize role
    let sanitizedRole: 'user' | 'assistant';
    try {
      sanitizedRole = sanitizeRole(role);
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Geçersiz role" }, { status: 400 });
    }

    // Sanitize content
    let sanitizedContent: string;
    try {
      sanitizedContent = sanitizeMessage(content);
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Geçersiz content" }, { status: 400 });
    }

    // Insert message
    const { data: message, error } = await supabaseService
      .from("case_messages")
      .insert([
        {
          thread_id: sanitizedThreadId,
          user_id: user.id,
          role: sanitizedRole,
          content: sanitizedContent,
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
