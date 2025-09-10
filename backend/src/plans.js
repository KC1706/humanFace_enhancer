import { Router } from 'express';
import { db, initDb } from './db.js';
import { authRequired } from './middleware.js';

await initDb();
const router = Router();

router.get('/', authRequired, async (req, res) => {
  await db.read();
  const plan = db.data.plans.find(p => p.userId === req.userId) || { tasks: [] };
  res.json(plan);
});

router.post('/tasks/:taskId/toggle', authRequired, async (req, res) => {
  await db.read();
  const plan = db.data.plans.find(p => p.userId === req.userId);
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  const task = plan.tasks.find(t => t.id === req.params.taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.isCompleted = !task.isCompleted;
  await db.write();
  res.json({ ok: true, task });
});

export default router;


