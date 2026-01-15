import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sanitizeTitle } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey; // Fallback to anon key if service key not set

export async function GET(request: NextRequest) {
  try {
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

    // Get all threads for user, ordered by updated_at DESC
    const { data: threads, error } = await supabaseService
      .from("case_threads")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching threads:", error);
      return NextResponse.json({ error: "Veritabanı hatası" }, { status: 500 });
    }

    return NextResponse.json({ threads: threads || [] });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Title gereklidir" }, { status: 400 });
    }

    // Sanitize title input
    let sanitizedTitle: string;
    try {
      sanitizedTitle = sanitizeTitle(title);
    } catch (error: any) {
      return NextResponse.json({ error: error.message || "Geçersiz title" }, { status: 400 });
    }

    // Use service role client for insert (bypasses RLS)
    const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Create new thread - service role bypasses RLS
    const { data: thread, error } = await supabaseService
      .from("case_threads")
      .insert([
        {
          user_id: user.id,
          title: sanitizedTitle,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating thread:", error);
      return NextResponse.json({ 
        error: "Thread oluşturulamadı",
        details: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ thread });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
