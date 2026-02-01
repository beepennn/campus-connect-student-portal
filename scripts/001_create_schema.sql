-- Create profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'student', -- 'student', 'admin', 'faculty'
  department text,
  phone text,
  created_at timestamp default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Create notices table
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text default 'general', -- 'general', 'academic', 'event', 'urgent'
  created_by uuid references auth.users(id) on delete cascade,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  is_pinned boolean default false,
  visibility text default 'all' -- 'all', 'students', 'admin'
);

alter table public.notices enable row level security;

create policy "notices_select_all" on public.notices for select using (true);
create policy "notices_insert_admin" on public.notices for insert with check (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
create policy "notices_update_own" on public.notices for update using (
  created_by = auth.uid() or
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
create policy "notices_delete_own" on public.notices for delete using (
  created_by = auth.uid() or
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Create materials table
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text default 'general', -- 'books', 'notes', 'assignments', 'syllabus', 'general'
  file_url text,
  uploaded_by uuid references auth.users(id) on delete cascade,
  uploaded_at timestamp default now(),
  subject text,
  semester text,
  visibility text default 'all' -- 'all', 'students', 'admin'
);

alter table public.materials enable row level security;

create policy "materials_select_all" on public.materials for select using (true);
create policy "materials_insert_authenticated" on public.materials for insert with check (auth.uid() is not null);
create policy "materials_update_own" on public.materials for update using (uploaded_by = auth.uid());
create policy "materials_delete_own" on public.materials for delete using (uploaded_by = auth.uid());

-- Create events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_date timestamp not null,
  end_date timestamp,
  location text,
  event_type text default 'academic', -- 'academic', 'social', 'seminar', 'workshop'
  created_by uuid references auth.users(id) on delete cascade,
  created_at timestamp default now()
);

alter table public.events enable row level security;

create policy "events_select_all" on public.events for select using (true);
create policy "events_insert_authenticated" on public.events for insert with check (auth.uid() is not null);
create policy "events_update_own" on public.events for update using (created_by = auth.uid());
create policy "events_delete_own" on public.events for delete using (created_by = auth.uid());

-- Create announcements table
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  announcement_type text default 'general', -- 'maintenance', 'alert', 'info'
  created_at timestamp default now()
);

alter table public.announcements enable row level security;

create policy "announcements_select_all" on public.announcements for select using (true);
