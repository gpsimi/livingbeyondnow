import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "book_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  ALTER TABLE "products" ADD COLUMN "book_file_id" integer;
  ALTER TABLE "_products_v" ADD COLUMN "version_book_file_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "book_files_id" integer;
  CREATE INDEX "book_files_updated_at_idx" ON "book_files" USING btree ("updated_at");
  CREATE INDEX "book_files_created_at_idx" ON "book_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "book_files_filename_idx" ON "book_files" USING btree ("filename");
  ALTER TABLE "products" ADD CONSTRAINT "products_book_file_id_book_files_id_fk" FOREIGN KEY ("book_file_id") REFERENCES "public"."book_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_book_file_id_book_files_id_fk" FOREIGN KEY ("version_book_file_id") REFERENCES "public"."book_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_book_files_fk" FOREIGN KEY ("book_files_id") REFERENCES "public"."book_files"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "products_book_file_idx" ON "products" USING btree ("book_file_id");
  CREATE INDEX "_products_v_version_version_book_file_idx" ON "_products_v" USING btree ("version_book_file_id");
  CREATE INDEX "payload_locked_documents_rels_book_files_id_idx" ON "payload_locked_documents_rels" USING btree ("book_files_id");
  ALTER TABLE "products" DROP COLUMN "file_key";
  ALTER TABLE "_products_v" DROP COLUMN "version_file_key";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "book_files" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "book_files" CASCADE;
  ALTER TABLE "products" DROP CONSTRAINT "products_book_file_id_book_files_id_fk";
  
  ALTER TABLE "_products_v" DROP CONSTRAINT "_products_v_version_book_file_id_book_files_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_book_files_fk";
  
  DROP INDEX "products_book_file_idx";
  DROP INDEX "_products_v_version_version_book_file_idx";
  DROP INDEX "payload_locked_documents_rels_book_files_id_idx";
  ALTER TABLE "products" ADD COLUMN "file_key" varchar;
  ALTER TABLE "_products_v" ADD COLUMN "version_file_key" varchar;
  ALTER TABLE "products" DROP COLUMN "book_file_id";
  ALTER TABLE "_products_v" DROP COLUMN "version_book_file_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "book_files_id";`)
}
