import { Router } from 'express';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';

await initDb();
const router = Router();

// Demo: mark user as subscribed without real Stripe.
router.post('/create', authRequired, async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === req.userId);
  user.isSubscribed = true;
  user.subscriptionId = 'demo_' + Date.now();
  await db.write();
  res.json({ ok: true, subscriptionId: user.subscriptionId });
});

export default router;


