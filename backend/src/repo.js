import { db, initDb } from './db.js';
import { pool, ensureSchema } from './pg.js';

const usePg = !!pool;

export async function initRepo() {
  if (usePg) await ensureSchema();
  else await initDb();
}

// USERS
export async function findUserByEmail(email) {
  if (usePg) {
    const { rows } = await pool.query('select * from users where email=$1', [email]);
    return rows[0] || null;
  }
  await db.read();
  return db.data.users.find(u => u.email === email) || null;
}

export async function getUserById(id) {
  if (usePg) {
    const { rows } = await pool.query('select * from users where id=$1', [id]);
    return rows[0] || null;
  }
  await db.read();
  return db.data.users.find(u => u.id === id) || null;
}

export async function createUser(user) {
  if (usePg) {
    const { id, email, password, isSubscribed=false, subscriptionId=null, referredBy=null } = user;
    await pool.query('insert into users(id, email, password, is_subscribed, subscription_id, referred_by) values($1,$2,$3,$4,$5,$6)', [id, email, password, isSubscribed, subscriptionId, referredBy]);
    return { id, email };
  }
  await db.read();
  db.data.users.push(user);
  await db.write();
  return { id: user.id, email: user.email };
}

export async function setUserSubscribed(userId, subscriptionId) {
  if (usePg) {
    await pool.query('update users set is_subscribed=true, subscription_id=$2 where id=$1', [userId, subscriptionId]);
    return;
  }
  await db.read();
  const user = db.data.users.find(u => u.id === userId);
  user.isSubscribed = true; user.subscriptionId = subscriptionId;
  await db.write();
}

export async function setUserReferredBy(userId, code) {
  if (usePg) {
    await pool.query('update users set referred_by=$2 where id=$1', [userId, code]);
    return;
  }
  await db.read();
  const user = db.data.users.find(u => u.id === userId);
  user.referredBy = code; await db.write();
}

export async function saveNps(userId, score, comment) {
  if (usePg) {
    await pool.query('update users set nps_score=$2, nps_comment=$3, nps_at=now() where id=$1', [userId, score, comment]);
    return;
  }
  await db.read();
  const user = db.data.users.find(u => u.id === userId);
  user.nps = { score, comment, at: new Date().toISOString() };
  await db.write();
}

// REFERRALS
export async function isReferralValid(code) {
  if (usePg) {
    const { rows } = await pool.query('select 1 from referrals where code=$1 and active=true', [code]);
    return rows.length > 0;
  }
  await db.read();
  return !!db.data.referrals.find(r => r.code === code && r.active);
}

// TRANSFORMATIONS
export async function upsertTransformation(userId, payload) {
  if (usePg) {
    const { beforeImageUrl, afterImageUrl, initialScore, potentialScore, featureRatings } = payload;
    await pool.query(`insert into transformations(user_id, before_image_url, after_image_url, initial_score, potential_score, feature_ratings)
      values ($1,$2,$3,$4,$5,$6)
      on conflict (user_id) do update set before_image_url=excluded.before_image_url, after_image_url=excluded.after_image_url, initial_score=excluded.initial_score, potential_score=excluded.potential_score, feature_ratings=excluded.feature_ratings`,
      [userId, beforeImageUrl, afterImageUrl, initialScore, potentialScore, JSON.stringify(featureRatings)]);
    return;
  }
  await db.read();
  const existing = db.data.transformations.find(t => t.userId === userId);
  if (existing) Object.assign(existing, payload);
  else db.data.transformations.push({ userId, ...payload });
  await db.write();
}

export async function getTransformation(userId) {
  if (usePg) {
    const { rows } = await pool.query('select * from transformations where user_id=$1', [userId]);
    const t = rows[0];
    if (!t) return null;
    return {
      beforeImageUrl: t.before_image_url,
      afterImageUrl: t.after_image_url,
      initialScore: Number(t.initial_score),
      potentialScore: t.potential_score != null ? Number(t.potential_score) : null,
      featureRatings: t.feature_ratings
    };
  }
  await db.read();
  const t = db.data.transformations.find(x => x.userId === userId);
  if (!t) return null;
  return t;
}

// PLAN
export async function getPlan(userId) {
  if (usePg) {
    const { rows } = await pool.query('select id,title,description,is_completed from plan_tasks where user_id=$1 order by id', [userId]);
    return { userId, tasks: rows.map(r => ({ id: r.id, title: r.title, description: r.description, isCompleted: r.is_completed })) };
  }
  await db.read();
  return db.data.plans.find(p => p.userId === userId) || { tasks: [] };
}

export async function savePlan(userId, tasks) {
  if (usePg) {
    await pool.query('delete from plan_tasks where user_id=$1', [userId]);
    for (const t of tasks) {
      await pool.query('insert into plan_tasks(id,user_id,title,description,is_completed) values($1,$2,$3,$4,$5)', [t.id, userId, t.title, t.description, t.isCompleted]);
    }
    return;
  }
  await db.read();
  let plan = db.data.plans.find(p => p.userId === userId);
  if (!plan) { plan = { userId, tasks: [] }; db.data.plans.push(plan); }
  plan.tasks = tasks;
  await db.write();
}

export async function toggleTask(userId, taskId) {
  if (usePg) {
    const { rows } = await pool.query('update plan_tasks set is_completed = not is_completed where user_id=$1 and id=$2 returning *', [userId, taskId]);
    return rows[0] ? { id: rows[0].id, isCompleted: rows[0].is_completed } : null;
  }
  await db.read();
  const plan = db.data.plans.find(p => p.userId === userId);
  if (!plan) return null;
  const task = plan.tasks.find(t => t.id === taskId);
  if (!task) return null;
  task.isCompleted = !task.isCompleted;
  await db.write();
  return task;
}
