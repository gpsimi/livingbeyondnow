import { BlogGrid, BlogHero } from "@/components/frontend/pages/blog";
import { BlogGridPost } from "@/components/frontend/pages/blog/blog-grid";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = "force-dynamic";

const Blog = async () => {
  const payload = await getPayload({ config: configPromise });

  const { docs: categories } = await payload.find({
    collection: "categories",
    limit: 100,
  });

  const categoryTitles = categories.map((cat) => cat.title);

  const { docs: posts } = await payload.find({
    collection: "blog",
    where: {
      _status: {
        equals: "published",
      },
    },
    sort: "-publishedAt",
    depth: 1, // To get category titles
  });

  const formattedPosts: BlogGridPost[] = posts.map((post) => {
    // Extract category title safely
    let categoryTitle = "Article";
    if (post.categories && post.categories.length > 0) {
      const firstCategory = post.categories[0];
      if (typeof firstCategory === "object" && firstCategory !== null && "title" in firstCategory) {
        categoryTitle = firstCategory.title;
      }
    }

    // Format date
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
    <main>
      <BlogHero />
      <BlogGrid posts={formattedPosts} categories={categoryTitles} />
    </main>
  );
};

export default Blog;
