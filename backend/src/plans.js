import { Router } from 'express';
import { authRequired } from './middleware.js';
import { getPlan, toggleTask } from './repo.js';

const router = Router();

router.get('/', authRequired, async (req, res) => {
  const plan = await getPlan(req.userId);
  res.json(plan);
});

router.post('/tasks/:taskId/toggle', authRequired, async (req, res) => {
  const task = await toggleTask(req.userId, req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ ok: true, task });
});

export default router;


