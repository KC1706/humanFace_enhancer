import { Router } from 'express';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';

await initDb();
const router = Router();

router.get('/', authRequired, async (req, res) => {
  await db.read();
  const user = db.data.users.find(u => u.id === req.userId);
  const t = db.data.transformations.find(x => x.userId === req.userId);
  if (!t) return res.status(404).json({ error: 'Not found' });
  if (!user.isSubscribed) {
    return res.json({
      beforeImageUrl: t.beforeImageUrl,
      afterImageUrl: null,
      initialScore: t.initialScore,
      potentialScore: null,
      featureRatings: null,
      locked: true
    });
  }
  res.json({ ...t, locked: false });
});

export default router;


