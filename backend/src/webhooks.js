import { Router } from 'express';
import { db, initDb } from './db.js';

await initDb();
const router = Router();

router.post('/stripe', async (req, res) => {
  // Placeholder: accept event and return 200
  await db.read();
  res.json({ received: true });
});

export default router;


