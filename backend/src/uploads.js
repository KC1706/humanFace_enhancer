import { Router } from 'express';
import multer from 'multer';
import { authRequired } from './middleware.js';
import { nanoid } from 'nanoid';
import { upsertTransformation, savePlan } from './repo.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authRequired, upload.array('images', 6), async (req, res) => {
  // Simulate storing images and kicking off analysis
  const userId = req.userId;
  const beforeImageUrl = `https://picsum.photos/seed/${nanoid(6)}/600/800`;
  const afterImageUrl = `https://picsum.photos/seed/${nanoid(6)}/600/800`;
  const initialScore = 6.5 + Math.random();
  const potentialScore = Math.min(9.5, initialScore + 1.5 + Math.random());
  const featureRatings = {
    jawAndFace: 70,
    skin: 68,
    hair: 72,
    body: 66,
    eyes: 71
  };

  await upsertTransformation(userId, { beforeImageUrl, afterImageUrl, initialScore, potentialScore, featureRatings });

  const tasks = [
    { id: nanoid(), title: 'Morning skincare routine', description: 'Cleanser + SPF', isCompleted: false },
    { id: nanoid(), title: 'Jaw exercises', description: '10 minutes of mewing & chewing', isCompleted: false },
    { id: nanoid(), title: 'Posture check', description: '3 x 2 minutes wall stands', isCompleted: false }
  ];
  await savePlan(userId, tasks);

  res.json({ ok: true, message: 'Analysis started' });
});

export default router;


