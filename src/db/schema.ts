import { pgTable, text, timestamp, uuid, boolean, integer, numeric } from 'drizzle-orm/pg-core';

export const artifacts = pgTable('artifacts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  period: text('period').notNull(),
  origin: text('origin').notNull(),
  estimatedValue: text('estimated_value').notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull(),
  provenance: text('provenance').notNull(),
  status: text('status').notNull().default('Vaulted'),
  year: text('year').notNull(),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const inquiries = pgTable('inquiries', {
  id: text('id').primaryKey(),
  artifactId: text('artifact_id').notNull(),
  artifactTitle: text('artifact_title').notNull(),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  offerAmount: numeric('offer_amount'),
  message: text('message').notNull(),
  status: text('status').notNull().default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
