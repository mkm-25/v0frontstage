-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles 
  FOR DELETE USING (auth.uid() = id);

-- Create deliverables table
CREATE TABLE IF NOT EXISTS public.deliverables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'ready',
  file_url text,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deliverables_select_own" ON public.deliverables 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "deliverables_insert_own" ON public.deliverables 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "deliverables_update_own" ON public.deliverables 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "deliverables_delete_own" ON public.deliverables 
  FOR DELETE USING (auth.uid() = user_id);

-- Create interview sessions table
CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text DEFAULT 'scheduled',
  scheduled_at timestamp,
  completed_at timestamp,
  created_at timestamp DEFAULT now()
);

ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "interview_sessions_select_own" ON public.interview_sessions 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "interview_sessions_insert_own" ON public.interview_sessions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "interview_sessions_update_own" ON public.interview_sessions 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "interview_sessions_delete_own" ON public.interview_sessions 
  FOR DELETE USING (auth.uid() = user_id);
