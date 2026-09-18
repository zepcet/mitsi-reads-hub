-- ===========================================================
-- ENUMS
-- ===========================================================
CREATE TYPE public.subscription_plan AS ENUM ('none', 'reader', 'member', 'collector');
CREATE TYPE public.subscription_type AS ENUM ('individual', 'group', 'gift');
CREATE TYPE public.subscription_status AS ENUM ('none', 'active', 'canceled');
CREATE TYPE public.book_status AS ENUM ('want_to_read', 'reading', 'finished');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- ===========================================================
-- PROFILES
-- ===========================================================
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  avatar_url text,
  subscription_plan public.subscription_plan NOT NULL DEFAULT 'none'::public.subscription_plan,
  subscription_type public.subscription_type,
  subscription_status public.subscription_status NOT NULL DEFAULT 'none'::public.subscription_status,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- updated_at maintenance trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- auto-create profile on signup (security definer, bypasses RLS)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===========================================================
-- BOOK PROGRESS
-- ===========================================================
CREATE TABLE public.book_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_club_slug text NOT NULL,
  status public.book_status NOT NULL DEFAULT 'want_to_read'::public.book_status,
  saved boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, book_club_slug)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_progress TO authenticated;
GRANT ALL ON public.book_progress TO service_role;
ALTER TABLE public.book_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "book_progress_all_own" ON public.book_progress
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER book_progress_set_updated_at
  BEFORE UPDATE ON public.book_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ===========================================================
-- MEMBER CONTENT
-- ===========================================================
CREATE TABLE public.member_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'guide',
  body text NOT NULL,
  link_url text,
  event_date timestamptz,
  published_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.member_content TO authenticated;
GRANT ALL ON public.member_content TO service_role;
ALTER TABLE public.member_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "member_content_select_members" ON public.member_content
  FOR SELECT TO authenticated
  USING (true);

-- ===========================================================
-- USER ROLES
-- ===========================================================
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_roles_select_own" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

-- has_role helper (security definer)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- admin can manage member_content
CREATE POLICY "member_content_admin_write" ON public.member_content
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- admin can manage user_roles
CREATE POLICY "user_roles_admin_write" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));