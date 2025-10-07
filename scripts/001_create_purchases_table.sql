-- Create purchases table to track user course purchases
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_name text not null,
  course_price numeric(10, 2) not null,
  payment_id text,
  payment_status text not null default 'pending',
  purchased_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.purchases enable row level security;

-- RLS Policies: Users can only see their own purchases
create policy "purchases_select_own"
  on public.purchases for select
  using (auth.uid() = user_id);

create policy "purchases_insert_own"
  on public.purchases for insert
  with check (auth.uid() = user_id);

create policy "purchases_update_own"
  on public.purchases for update
  using (auth.uid() = user_id);

create policy "purchases_delete_own"
  on public.purchases for delete
  using (auth.uid() = user_id);
