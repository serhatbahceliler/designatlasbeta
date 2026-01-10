-- Create case_threads table
CREATE TABLE IF NOT EXISTS public.case_threads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create case_messages table
CREATE TABLE IF NOT EXISTS public.case_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID NOT NULL REFERENCES public.case_threads(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_threads_user_id ON public.case_threads(user_id);
CREATE INDEX IF NOT EXISTS idx_case_threads_updated_at ON public.case_threads(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_messages_thread_id ON public.case_messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_case_messages_user_id ON public.case_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_case_messages_created_at ON public.case_messages(thread_id, created_at ASC);

-- Enable Row Level Security
ALTER TABLE public.case_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for re-running migration)
DROP POLICY IF EXISTS "Users can view own case threads" ON public.case_threads;
DROP POLICY IF EXISTS "Users can create own case threads" ON public.case_threads;
DROP POLICY IF EXISTS "Users can update own case threads" ON public.case_threads;
DROP POLICY IF EXISTS "Users can delete own case threads" ON public.case_threads;
DROP POLICY IF EXISTS "Users can view own case messages" ON public.case_messages;
DROP POLICY IF EXISTS "Users can create own case messages" ON public.case_messages;
DROP POLICY IF EXISTS "Users can delete own case messages" ON public.case_messages;

-- RLS Policies for case_threads
CREATE POLICY "Users can view own case threads"
    ON public.case_threads
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own case threads"
    ON public.case_threads
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own case threads"
    ON public.case_threads
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own case threads"
    ON public.case_threads
    FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for case_messages
CREATE POLICY "Users can view own case messages"
    ON public.case_messages
    FOR SELECT
    USING (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.case_threads
            WHERE id = thread_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create own case messages"
    ON public.case_messages
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.case_threads
            WHERE id = thread_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own case messages"
    ON public.case_messages
    FOR DELETE
    USING (auth.uid() = user_id);

-- Drop existing trigger and function if they exist (for re-running migration)
DROP TRIGGER IF EXISTS update_case_thread_on_message_insert ON public.case_messages;
DROP FUNCTION IF EXISTS public.update_case_thread_updated_at();

-- Function to update updated_at timestamp on thread update
CREATE FUNCTION public.update_case_thread_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.case_threads
    SET updated_at = now()
    WHERE id = NEW.thread_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update thread's updated_at when a message is added
CREATE TRIGGER update_case_thread_on_message_insert
    AFTER INSERT ON public.case_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_case_thread_updated_at();
