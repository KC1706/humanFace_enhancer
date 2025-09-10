import { Router } from 'express';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';

await initDb();
const router = Router();

router.post('/nps', authRequired, async (req, res) => {
  const { score = null, comment = '' } = req.body || {};
  await db.read();
  const user = db.data.users.find(u => u.id === req.userId);
  user.nps = { score, comment, at: new Date().toISOString() };
  await db.write();
  res.json({ ok: true });
});

export default router;


