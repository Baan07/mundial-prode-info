create extension if not exists "pgcrypto";

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_code text not null,
  flag_url text,
  group_name text,
  coach text,
  strength_rating numeric not null default 75,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade,
  name text not null,
  position text not null,
  shirt_number int,
  age int,
  current_club text,
  club_country text,
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  group_name text,
  phase text not null,
  home_team_id uuid references public.teams(id),
  away_team_id uuid references public.teams(id),
  stadium text,
  city text,
  kickoff_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'live', 'finished')),
  home_score int,
  away_score int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  player_id uuid references public.players(id),
  team_id uuid references public.teams(id),
  minute int,
  is_penalty boolean not null default false,
  is_own_goal boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.player_stats (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade,
  match_id uuid references public.matches(id) on delete cascade,
  minutes int not null default 0,
  goals int not null default 0,
  assists int not null default 0,
  yellow_cards int not null default 0,
  red_cards int not null default 0
);

create table public.historical_scorers (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  country text not null,
  total_goals int not null,
  world_cups int not null,
  years_played text not null
);

create table public.prediction_outputs (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references public.matches(id) on delete cascade,
  home_win_probability numeric not null,
  draw_probability numeric not null,
  away_win_probability numeric not null,
  predicted_home_score int not null,
  predicted_away_score int not null,
  confidence text not null,
  explanation text not null,
  created_at timestamptz not null default now()
);

create table public.prode_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  scoring_rules jsonb not null default '{"exact":5,"winner":2,"goal_difference":1,"match_scorer":2,"champion":10,"finalist":6,"top_scorer":8}',
  created_at timestamptz not null default now()
);

create table public.prode_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.prode_groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  points int not null default 0,
  created_at timestamptz not null default now(),
  unique (group_id, user_id)
);

create table public.prode_predictions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.prode_groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id uuid references public.matches(id) on delete cascade,
  predicted_home_score int not null,
  predicted_away_score int not null,
  predicted_scorer_id uuid references public.players(id),
  points_awarded int not null default 0,
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (group_id, user_id, match_id)
);

create table public.prode_champion_predictions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references public.prode_groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  champion_team_id uuid references public.teams(id),
  finalist_team_id uuid references public.teams(id),
  top_scorer_player_id uuid references public.players(id),
  points_awarded int not null default 0,
  created_at timestamptz not null default now(),
  unique (group_id, user_id)
);

create table public.team_lineups (
  id uuid primary key default gen_random_uuid(),
  team_id text not null,
  formation text not null,
  source text not null default 'manual',
  updated_at timestamptz not null default now()
);

create table public.lineup_players (
  id uuid primary key default gen_random_uuid(),
  lineup_id uuid references public.team_lineups(id) on delete cascade,
  team_id text not null,
  name text not null,
  position text not null,
  shirt_number int,
  current_club text,
  club_country text,
  starter boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.goals enable row level security;
alter table public.player_stats enable row level security;
alter table public.historical_scorers enable row level security;
alter table public.prediction_outputs enable row level security;
alter table public.prode_groups enable row level security;
alter table public.prode_members enable row level security;
alter table public.prode_predictions enable row level security;
alter table public.prode_champion_predictions enable row level security;
alter table public.team_lineups enable row level security;
alter table public.lineup_players enable row level security;

create policy "public read teams" on public.teams for select using (true);
create policy "public read players" on public.players for select using (true);
create policy "public read matches" on public.matches for select using (true);
create policy "public read goals" on public.goals for select using (true);
create policy "public read stats" on public.player_stats for select using (true);
create policy "public read historical scorers" on public.historical_scorers for select using (true);
create policy "public read predictions" on public.prediction_outputs for select using (true);
create policy "public read team lineups" on public.team_lineups for select using (true);
create policy "public read lineup players" on public.lineup_players for select using (true);

create policy "owners read groups" on public.prode_groups for select using (
  owner_id = auth.uid() or exists (
    select 1 from public.prode_members m where m.group_id = id and m.user_id = auth.uid()
  )
);
create policy "users create groups" on public.prode_groups for insert with check (owner_id = auth.uid());
create policy "owners update groups" on public.prode_groups for update using (owner_id = auth.uid());

create policy "members read same group" on public.prode_members for select using (
  user_id = auth.uid() or exists (
    select 1 from public.prode_members m where m.group_id = group_id and m.user_id = auth.uid()
  )
);
create policy "users join groups" on public.prode_members for insert with check (user_id = auth.uid());
create policy "users update own member" on public.prode_members for update using (user_id = auth.uid());

create policy "users read own predictions" on public.prode_predictions for select using (user_id = auth.uid());
create policy "users create own predictions before kickoff" on public.prode_predictions for insert with check (
  user_id = auth.uid() and exists (
    select 1 from public.matches m where m.id = match_id and m.kickoff_at > now()
  )
);
create policy "users update own unlocked predictions" on public.prode_predictions for update using (
  user_id = auth.uid() and locked_at is null and exists (
    select 1 from public.matches m where m.id = match_id and m.kickoff_at > now()
  )
);

create policy "users read own champion predictions" on public.prode_champion_predictions for select using (user_id = auth.uid());
create policy "users create own champion predictions" on public.prode_champion_predictions for insert with check (user_id = auth.uid());
create policy "users update own champion predictions" on public.prode_champion_predictions for update using (user_id = auth.uid());
