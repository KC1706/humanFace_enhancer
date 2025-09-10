import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { db, initDb } from './db.js';
import { issueToken, authRequired } from './middleware.js';

const router = Router();

await initDb();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  await db.read();
  const existing = db.data.users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: nanoid(), email, password: hash, isSubscribed: false, subscriptionId: null, referralCode: null, referredBy: null };
  db.data.users.push(user);
  await db.write();
  const token = issueToken(user);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  await db.read();
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = issueToken(user);
  res.json({ token });
});

router.get('/me', authRequired, async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === req.userId);
  res.json({ id: user.id, email: user.email, isSubscribed: user.isSubscribed });
});

export default router;


