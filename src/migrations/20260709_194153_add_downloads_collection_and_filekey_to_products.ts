import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "downloads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"token" varchar NOT NULL,
  	"product_id" integer NOT NULL,
  	"email" varchar NOT NULL,
  	"download_count" numeric DEFAULT 0 NOT NULL,
  	"max_downloads" numeric DEFAULT 2 NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "file_key" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_file_key" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "downloads_id" integer;
  ALTER TABLE "downloads" ADD CONSTRAINT "downloads_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "downloads_token_idx" ON "downloads" USING btree ("token");
  CREATE INDEX "downloads_product_idx" ON "downloads" USING btree ("product_id");
  CREATE INDEX "downloads_updated_at_idx" ON "downloads" USING btree ("updated_at");
  CREATE INDEX "downloads_created_at_idx" ON "downloads" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_downloads_fk" FOREIGN KEY ("downloads_id") REFERENCES "public"."downloads"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_downloads_id_idx" ON "payload_locked_documents_rels" USING btree ("downloads_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "downloads" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "downloads" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_downloads_fk";
  
  DROP INDEX "payload_locked_documents_rels_downloads_id_idx";
  ALTER TABLE "products" DROP COLUMN "file_key";
  ALTER TABLE "_products_v" DROP COLUMN "version_file_key";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "downloads_id";`)
}
