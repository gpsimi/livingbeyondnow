import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ShopPreviewCard, ShopPreviewProduct } from "./ShopPreviewCard";


export const dynamic = "force-dynamic";


export default async function ShopPreview() {
  const payload = await getPayload({ config: configPromise });

  const { docs: recentProducts } = await payload.find({
    collection: "products",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    limit: 3,
    depth: 1,
  });

  const products: ShopPreviewProduct[] = recentProducts.map((product) => {
    let categoryTitle = "Product";
    if (product.category) {
      if (typeof product.category === "object" && product.category !== null && "title" in product.category) {
        categoryTitle = product.category.title as string;
      }
    }

    return {
      title: product.title,
      category: categoryTitle,
      subtitle: product.shortDescription || "",
      slug: product.slug || "",
    };
  });

  return (
    <section className="py-24 bg-muted/50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="text-accent font-heading text-sm uppercase tracking-[0.2em] font-semibold">Resources</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-tight mt-3">
            Books. Resources. Intellectual Products.
          </h2>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ShopPreviewCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-background">
            <p className="text-lg text-foreground font-semibold">No Product Found.</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon for our latest resources!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/shop">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-semibold uppercase tracking-wider hover:bg-primary/90 transition-colors">
              Visit Shop
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
