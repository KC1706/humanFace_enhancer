import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, 'database.json');
const adapter = new JSONFile(file);
export const db = new Low(adapter, {
  users: [],
  transformations: [],
  plans: [],
  referrals: [
    { code: '9762', active: true },
    { code: '1234', active: true }
  ]
});

export async function initDb() {
  await db.read();
  await db.write();
}


