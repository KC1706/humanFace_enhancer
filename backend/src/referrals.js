import { Router } from 'express';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';

await initDb();
const router = Router();

router.post('/validate', async (req, res) => {
  const { code } = req.body || {};
  await db.read();
  const valid = !!db.data.referrals.find(r => r.code === code && r.active);
  res.json({ valid });
});

router.post('/apply', authRequired, async (req, res) => {
  const { code } = req.body || {};
  await db.read();
  const valid = db.data.referrals.find(r => r.code === code && r.active);
  if (!valid) return res.status(400).json({ error: 'Invalid code' });
  const user = db.data.users.find(u => u.id === req.userId);
  user.referredBy = code;
  await db.write();
  res.json({ ok: true });
});

export default router;


