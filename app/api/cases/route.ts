import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
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

    // Get all threads for user, ordered by updated_at DESC
    const { data: threads, error } = await supabase
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

    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title gereklidir" }, { status: 400 });
    }

    // Create new thread (RLS will verify auth.uid() = user_id)
    const { data: thread, error } = await supabase
      .from("case_threads")
      .insert([
        {
          user_id: user.id,
          title: title.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating thread:", error);
      return NextResponse.json({ error: "Thread oluşturulamadı" }, { status: 500 });
    }

    return NextResponse.json({ thread });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
