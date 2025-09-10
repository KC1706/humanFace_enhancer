import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import usersRouter from './users.js';
import referralsRouter from './referrals.js';
import uploadsRouter from './uploads.js';
import transformationsRouter from './transformations.js';
import plansRouter from './plans.js';
import subscriptionsRouter from './subscriptions.js';
import webhooksRouter from './webhooks.js';
import feedbackRouter from './feedback.js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*'}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/users', usersRouter);
app.use('/api/referrals', referralsRouter);
app.use('/api/users/me/images', uploadsRouter);
app.use('/api/users/me/transformation', transformationsRouter);
app.use('/api/users/me/plan', plansRouter);
app.use('/api/subscriptions', subscriptionsRouter);
app.use('/api/webhooks', webhooksRouter);
app.use('/api/feedback', feedbackRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Look. backend running on :${port}`);
});


