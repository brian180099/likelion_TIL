create extension if not exists "pgcrypto";

create table if not exists public.lions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  track text not null,
  role text not null,
  email text,
  github text,
  skills text[] not null default '{}',
  motto text not null,
  status text not null default 'active',
  created_by uuid references auth.users(id) default auth.uid(),
  created_at timestamptz not null default now()
);

alter table public.lions enable row level security;

drop policy if exists "Anyone can read lions" on public.lions;
drop policy if exists "Authenticated users can insert lions" on public.lions;
drop policy if exists "Authenticated users can delete lions" on public.lions;
drop policy if exists "Authenticated users can update own lions" on public.lions;

create policy "Anyone can read lions"
on public.lions
for select
using (true);

create policy "Authenticated users can insert lions"
on public.lions
for insert
to authenticated
with check (created_by = auth.uid());

create policy "Authenticated users can delete lions"
on public.lions
for delete
to authenticated
using (true);

create policy "Authenticated users can update own lions"
on public.lions
for update
to authenticated
using (created_by = auth.uid())
with check (created_by = auth.uid());

-- Supabase Realtime에서 public.lions 변경을 구독하려면 Dashboard의
-- Database -> Replication에서도 lions 테이블을 활성화하세요.
-- SQL Editor에서 필요할 경우 아래 줄을 한 번 실행할 수 있습니다.
-- alter publication supabase_realtime add table public.lions;
