import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   -- Rename tables if they exist
   DO $$
   BEGIN
     IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts') THEN
       ALTER TABLE "posts" RENAME TO "blog";
     END IF;
     
     IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts_rels') THEN
       ALTER TABLE "posts_rels" RENAME TO "blog_rels";
     END IF;
     
     IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'posts_populated_authors') THEN
       ALTER TABLE "posts_populated_authors" RENAME TO "blog_populated_authors";
     END IF;

      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_posts_v') THEN
       ALTER TABLE "_posts_v" RENAME TO "_blog_v";
     END IF;

      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_posts_v_rels') THEN
       ALTER TABLE "_posts_v_rels" RENAME TO "_blog_v_rels";
     END IF;
      
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_posts_v_version_populated_authors') THEN
       ALTER TABLE "_posts_v_version_populated_authors" RENAME TO "_blog_v_version_populated_authors";
     END IF;
   END $$;

  -- Rename columns in other rels tables if necessary (e.g. blog_rels)
  DO $$
  BEGIN
      IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'blog_rels' AND column_name = 'posts_id') THEN
          ALTER TABLE "blog_rels" RENAME COLUMN "posts_id" TO "blog_id";
      END IF;
  END $$;

  -- Handle redirects_rels constraint issue specifically
  -- First drop the constraint if it exists on the old name
  DO $$
  BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'redirects_rels_posts_fk') THEN
        ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
    END IF;
  END $$;

  -- Rename column in redirects_rels
  DO $$
  BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'redirects_rels' AND column_name = 'posts_id') THEN
      ALTER TABLE "redirects_rels" RENAME COLUMN "posts_id" TO "blog_id";
    END IF;
  END $$;

  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   
   DO $$
   BEGIN
     IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog') THEN
       ALTER TABLE "blog" RENAME TO "posts";
     END IF;
     
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_rels') THEN
       ALTER TABLE "blog_rels" RENAME TO "posts_rels";
     END IF;

      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'blog_populated_authors') THEN
       ALTER TABLE "blog_populated_authors" RENAME TO "posts_populated_authors";
     END IF;

      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_blog_v') THEN
       ALTER TABLE "_blog_v" RENAME TO "_posts_v";
     END IF;
      
      IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_blog_v_rels') THEN
       ALTER TABLE "_blog_v_rels" RENAME TO "_posts_v_rels";
     END IF;
      
       IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = '_blog_v_version_populated_authors') THEN
       ALTER TABLE "_blog_v_version_populated_authors" RENAME TO "_posts_v_version_populated_authors";
     END IF;
   END $$;

  DO $$
  BEGIN
    IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'redirects_rels' AND column_name = 'blog_id') THEN
      ALTER TABLE "redirects_rels" RENAME COLUMN "blog_id" TO "posts_id";
    END IF;
  END $$;

  DO $$
  BEGIN
      IF EXISTS (SELECT FROM information_schema.columns WHERE table_name = 'posts_rels' AND column_name = 'blog_id') THEN
          ALTER TABLE "posts_rels" RENAME COLUMN "blog_id" TO "posts_id";
      END IF;
  END $$;

  `)
}
