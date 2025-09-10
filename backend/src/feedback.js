import { Router } from 'express';
import { authRequired } from './middleware.js';
import { saveNps } from './repo.js';

const router = Router();

router.post('/nps', authRequired, async (req, res) => {
  const { score = null, comment = '' } = req.body || {};
  await saveNps(req.userId, score, comment);
  res.json({ ok: true });
});

export default router;


