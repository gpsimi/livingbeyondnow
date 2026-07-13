import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "pages" numeric;
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "format" varchar DEFAULT 'PDF';
    ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_pages" numeric;
    ALTER TABLE "_products_v" ADD COLUMN IF NOT EXISTS "version_format" varchar DEFAULT 'PDF';
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "products" DROP COLUMN IF EXISTS "pages";
    ALTER TABLE "products" DROP COLUMN IF EXISTS "format";
    ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_pages";
    ALTER TABLE "_products_v" DROP COLUMN IF EXISTS "version_format";
  `);
}
