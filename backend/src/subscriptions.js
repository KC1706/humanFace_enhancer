import { Router } from 'express';
import { authRequired } from './middleware.js';
import { setUserSubscribed } from './repo.js';

const router = Router();

// Demo: mark user as subscribed without real Stripe.
router.post('/create', authRequired, async (req, res) => {
  const subscriptionId = 'demo_' + Date.now();
  await setUserSubscribed(req.userId, subscriptionId);
  res.json({ ok: true, subscriptionId });
});

export default router;


