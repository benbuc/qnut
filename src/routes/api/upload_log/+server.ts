// src/routes/api/upload_log/+server.ts
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  const body = await request.json();
  const filename = `${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const dir = path.resolve('static', 'logs');
  const filepath = path.join(dir, filename);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(filepath, JSON.stringify(body, null, 2));

  return json({ status: 'success', filename });
}
