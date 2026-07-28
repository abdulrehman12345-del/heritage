import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString =
  (import.meta.env?.DATABASE_URL as string) ||
  'postgresql://postgres:[YOUR-PASSWORD]@db.dcvgsgxfmetfqfzrvfbe.supabase.co:5432/postgres';

// Disable prefetch as it is not supported for Transaction mode connection pooling
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
