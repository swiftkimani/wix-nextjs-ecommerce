import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL || '';

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Required for Railway/Neon self-signed certs sometimes
});

export const db = drizzle(pool, { schema });
