import { Router } from 'express';
import { authRequired } from './middleware.js';
import { getTransformation, getUserById } from './repo.js';

const router = Router();

router.get('/', authRequired, async (req, res) => {
  const user = await getUserById(req.userId);
  const t = await getTransformation(req.userId);
  if (!t) return res.status(404).json({ error: 'Not found' });
  const isSubscribed = user.is_subscribed ?? user.isSubscribed;
  if (!isSubscribed) {
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


