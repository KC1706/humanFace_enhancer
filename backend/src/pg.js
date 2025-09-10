// Temporarily disable PostgreSQL to use lowdb fallback
export const pool = null;

export async function ensureSchema() {
  if (!pool) return;
  await pool.query(`
    create table if not exists users (
      id text primary key,
      email text unique not null,
      password text not null,
      is_subscribed boolean default false,
      subscription_id text,
      referred_by text,
      nps_score int,
      nps_comment text,
      nps_at timestamptz
    );
    create table if not exists transformations (
      user_id text primary key references users(id) on delete cascade,
      before_image_url text,
      after_image_url text,
      initial_score numeric,
      potential_score numeric,
      feature_ratings jsonb
    );
    create table if not exists plans (
      user_id text primary key references users(id) on delete cascade
    );
    create table if not exists plan_tasks (
      id text primary key,
      user_id text references users(id) on delete cascade,
      title text,
      description text,
      is_completed boolean default false
    );
    create table if not exists referrals (
      code text primary key,
      active boolean default true
    );
    insert into referrals(code, active)
    values ('9762', true), ('1234', true)
    on conflict (code) do nothing;
  `);
}
