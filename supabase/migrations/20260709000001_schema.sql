-- Security+ Trainer: schema + row-level security
-- Content tables are read-only to authenticated users; all user state is
-- isolated per-user via RLS on auth.uid().

-- ---------- content ----------

create table public.flashcards (
  id text primary key,
  deck text not null check (deck in ('core', 'acronym', 'feynman')),
  domain smallint not null check (domain between 1 and 5),
  objective text not null,
  front text not null,
  back text not null,
  created_at timestamptz not null default now()
);

create table public.questions (
  id text primary key,
  domain smallint not null check (domain between 1 and 5),
  objective text not null,
  qtype text not null check (qtype in ('mcq', 'multi', 'ordering', 'matching')),
  difficulty smallint not null default 2 check (difficulty between 1 and 3),
  stem text not null,
  -- mcq/multi: ["choice A", ...]; ordering: ["step", ...] in scrambled display order;
  -- matching: {"left": [...], "right": [...]}
  choices jsonb not null,
  -- mcq: index; multi: [indexes]; ordering: [indexes of choices in correct order];
  -- matching: [right-index for each left item]
  answer jsonb not null,
  explanation text not null,
  created_at timestamptz not null default now()
);

create index questions_domain_idx on public.questions (domain);
create index flashcards_deck_idx on public.flashcards (deck);

-- ---------- user state ----------

create table public.card_states (
  user_id uuid not null references auth.users (id) on delete cascade,
  card_id text not null references public.flashcards (id) on delete cascade,
  ease real not null default 2.5,
  interval_days real not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  due_at timestamptz not null default now(),
  last_grade smallint,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index card_states_due_idx on public.card_states (user_id, due_at);

create table public.answer_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null references public.questions (id) on delete cascade,
  quiz_kind text not null check (quiz_kind in ('mixed', 'domain', 'weak', 'exam')),
  correct boolean not null,
  chosen jsonb,
  answered_at timestamptz not null default now()
);

create index answer_events_user_time_idx on public.answer_events (user_id, answered_at desc);

create table public.exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  question_ids jsonb not null,
  responses jsonb,
  raw_correct integer,
  scaled_score integer,
  passed boolean
);

create index exam_attempts_user_idx on public.exam_attempts (user_id, started_at desc);

create table public.study_days (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  reviews integer not null default 0,
  questions_answered integer not null default 0,
  primary key (user_id, day)
);

-- ---------- row-level security ----------

alter table public.flashcards enable row level security;
alter table public.questions enable row level security;
alter table public.card_states enable row level security;
alter table public.answer_events enable row level security;
alter table public.exam_attempts enable row level security;
alter table public.study_days enable row level security;

create policy "content readable by authenticated" on public.flashcards
  for select to authenticated using (true);
create policy "content readable by authenticated" on public.questions
  for select to authenticated using (true);

create policy "own card_states" on public.card_states
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own answer_events" on public.answer_events
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own exam_attempts" on public.exam_attempts
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "own study_days" on public.study_days
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
