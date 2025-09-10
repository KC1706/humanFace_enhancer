import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { issueToken, authRequired } from './middleware.js';
import { findUserByEmail, createUser, getUserById } from './repo.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'Email exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = { id: nanoid(), email, password: hash, isSubscribed: false, subscriptionId: null, referralCode: null, referredBy: null };
  await createUser(user);
  const token = issueToken(user);
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = issueToken({ id: user.id, email: user.email });
  res.json({ token });
});

router.get('/me', authRequired, async (req, res) => {
  const user = await getUserById(req.userId);
  res.json({ id: user.id, email: user.email, isSubscribed: user.is_subscribed ?? user.isSubscribed });
});

export default router;


