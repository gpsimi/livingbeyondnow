import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ShareButtons } from "@/components/frontend/pages/blog/ShareButtons";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { Blog } from "@/payload-types";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: "blog",
    where: { _status: { equals: "published" } },
    limit: 1000,
  });

  return posts.docs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "blog",
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
      _status: {
        equals: "published",
      },
    },
    limit: 1,
    depth: 2, // Ensure categories, authors, and media are populated
  });

  if (docs.length === 0) {
    notFound();
  }

  const post = docs[0];

  // Extract Category
  let categoryTitle = "Article";
  if (post.categories && post.categories.length > 0) {
    const firstCategory = post.categories[0];
    if (typeof firstCategory === "object" && firstCategory !== null && "title" in firstCategory) {
      categoryTitle = firstCategory.title;
    }
  }

  // Extract Author
  let authorName = "LBN Editorial";
  if (post.populatedAuthors && post.populatedAuthors.length > 0) {
    authorName = post.populatedAuthors.map(a => a.name).join(', ') || "LBN Editorial";
  }

  // Format Date
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : "";

  // Extract Hero Image
  let heroImageUrl = "";
  if (post.heroImage && typeof post.heroImage === "object" && post.heroImage !== null && "url" in post.heroImage) {
    heroImageUrl = post.heroImage.url || "";
  }

  // Fallback related posts
  let related = post.relatedPosts || [];
  if (related.length === 0) {
    const fallback = await payload.find({
      collection: "blog",
      where: {
        slug: { not_equals: resolvedParams.slug },
        _status: { equals: "published" },
      },
      limit: 3,
      sort: "-publishedAt",
      depth: 1,
    });
    related = fallback.docs;
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1B3629] text-white pt-24 pb-32 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#D4AF37] text-xs uppercase tracking-wider mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.25em]">
              {categoryTitle}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mt-4 mb-8 leading-[0.95] text-balance">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-white/60 font-medium">
              <span>{authorName}</span>
              <span>·</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <div className="container max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="aspect-[21/9] bg-gradient-to-br from-[#8B2C2C] via-[#8B2C2C]/80 to-[#1B3629] rounded-xl shadow-2xl border border-white/10 relative overflow-hidden">
          {heroImageUrl && (
            <Image 
              src={heroImageUrl} 
              alt={post.title} 
              fill 
              className="object-cover opacity-90"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          )}
        </div>
      </div>

      {/* Content */}
      <section className="py-20 px-4 md:px-6">
        <div className="container max-w-3xl mx-auto">
          <article className="space-y-6 text-foreground/85 text-lg md:text-xl leading-relaxed font-body">
            <RichText data={post.content as unknown as DefaultTypedEditorState} />
          </article>

          {/* Share */}
          <div className="mt-16 pt-8 border-t border-border">
            <ShareButtons url={`/blog/${post.slug}`} title={post.title} />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-24 bg-muted/30">
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mb-12 text-center">
              Continue Reading
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {related.map((r: number | Blog) => {
                if (typeof r === "number") return null;
                const rSlug = r.slug || "";
                if (!rSlug) return null;
                
                let rCategory = "Article";
                if (r.categories && r.categories.length > 0) {
                  const fCat = r.categories[0];
                  if (typeof fCat === "object" && fCat !== null && "title" in fCat) {
                    rCategory = fCat.title;
                  }
                }
                const rDate = r.publishedAt ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(r.publishedAt)) : "";

                return (
                  <Link key={rSlug} href={`/blog/${rSlug}`} className="block group">
                    <article className="bg-card rounded-lg border border-border overflow-hidden h-full hover:shadow-xl transition-all duration-300 flex flex-col group-hover:-translate-y-1">
                      <div className="aspect-[16/10] bg-gradient-to-br from-[#8B2C2C]/90 to-[#1B3629] p-6 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <span className="relative z-10 text-white/90 font-bold uppercase text-[10px] tracking-[0.25em]">
                          {rCategory}
                        </span>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="font-heading text-lg font-bold uppercase leading-tight mb-4 group-hover:text-[#8B2C2C] transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium mt-auto uppercase tracking-wider">
                          {rDate}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
