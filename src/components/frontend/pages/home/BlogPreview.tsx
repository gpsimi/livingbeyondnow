import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { BlogPreviewCard, BlogPreviewPost } from "./BlogPreviewCard";

export const dynamic = "force-dynamic";


export default async function BlogPreview() {
  const payload = await getPayload({ config: configPromise });

  const { docs: recentPosts } = await payload.find({
    collection: "blog",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 3,
    depth: 1,
  });

  const posts: BlogPreviewPost[] = recentPosts.map((post) => {
    let categoryTitle = "Article";
    if (post.categories && post.categories.length > 0) {
      const firstCategory = post.categories[0];
      if (typeof firstCategory === "object" && firstCategory !== null && "title" in firstCategory) {
        categoryTitle = firstCategory.title;
      }
    }

    const formattedDate = post.publishedAt
      ? new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(post.publishedAt))
      : "";

    return {
      slug: post.slug,
      category: categoryTitle,
      title: post.title,
      excerpt: post.meta?.description || "Read more about this topic...",
      date: formattedDate,
    };
  });

  return (
    <section className="py-24 bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">Insights</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mt-3">
            Latest From The Blog
          </h2>
        </div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogPreviewCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/20">
            <p className="text-lg text-foreground font-semibold">No posts found.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for new insights!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="border-2 border-primary text-primary px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors">
              Read Insights
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
