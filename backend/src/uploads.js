import { Router } from 'express';
import multer from 'multer';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';
import { nanoid } from 'nanoid';

await initDb();
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authRequired, upload.array('images', 6), async (req, res) => {
  // Simulate storing images and kicking off analysis
  await db.read();
  const userId = req.userId;
  const beforeImageUrl = `https://picsum.photos/seed/${nanoid(6)}/600/800`;
  const afterImageUrl = `https://picsum.photos/seed/${nanoid(6)}/600/800`;
  const initialScore = 65 + Math.floor(Math.random() * 10);
  const potentialScore = Math.min(95, initialScore + 15 + Math.floor(Math.random() * 10));
  const featureRatings = {
    jawAndFace: 70,
    skin: 68,
    hair: 72,
    body: 66,
    eyes: 71
  };
  const existing = db.data.transformations.find(t => t.userId === userId);
  if (existing) {
    existing.beforeImageUrl = beforeImageUrl;
    existing.afterImageUrl = afterImageUrl;
    existing.initialScore = initialScore / 10;
    existing.potentialScore = potentialScore / 10;
    existing.featureRatings = featureRatings;
  } else {
    db.data.transformations.push({ userId, beforeImageUrl, afterImageUrl, initialScore: initialScore / 10, potentialScore: potentialScore / 10, featureRatings });
  }
  // Basic starter plan
  const plan = db.data.plans.find(p => p.userId === userId) || { userId, tasks: [] };
  plan.tasks = [
    { id: nanoid(), title: 'Morning skincare routine', description: 'Cleanser + SPF', isCompleted: false },
    { id: nanoid(), title: 'Jaw exercises', description: '10 minutes of mewing & chewing', isCompleted: false },
    { id: nanoid(), title: 'Posture check', description: '3 x 2 minutes wall stands', isCompleted: false }
  ];
  if (!db.data.plans.find(p => p.userId === userId)) db.data.plans.push(plan);
  await db.write();

  setTimeout(() => {
    res.json({ ok: true, message: 'Analysis started' });
  }, 1200);
});

export default router;


