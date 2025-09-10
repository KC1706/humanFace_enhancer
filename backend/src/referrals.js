import { Router } from 'express';
import { authRequired } from './middleware.js';
import { isReferralValid, setUserReferredBy } from './repo.js';

const router = Router();

router.post('/validate', async (req, res) => {
  const { code } = req.body || {};
  const valid = await isReferralValid(code);
  res.json({ valid });
});

router.post('/apply', authRequired, async (req, res) => {
  const { code } = req.body || {};
  const valid = await isReferralValid(code);
  if (!valid) return res.status(400).json({ error: 'Invalid code' });
  await setUserReferredBy(req.userId, code);
  res.json({ ok: true });
});

export default router;


