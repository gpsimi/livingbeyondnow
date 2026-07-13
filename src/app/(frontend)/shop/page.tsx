import { ShopHero, ShopGrid } from "@/components/frontend/pages/shop";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ShopGridProduct } from "@/components/frontend/pages/shop/shop-grid";

export const dynamic = "force-dynamic";


export default async function Shop() {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "products",
    where: { _status: { equals: "published" } },
    sort: "-publishedAt",
    depth: 1,
  });

  const products: ShopGridProduct[] = docs.map((product) => {
    let categoryTitle = "Product";
    if (product.category) {
      if (
        typeof product.category === "object" &&
        product.category !== null &&
        "title" in product.category
      ) {
        categoryTitle = product.category.title as string;
      }
    }

    let imageUrl = "";
    if (product.heroImage && typeof product.heroImage === "object" && "url" in product.heroImage) {
      imageUrl = product.heroImage.url || "";
    }

    return {
      title: product.title,
      category: categoryTitle,
      subtitle: product.shortDescription || "",
      description: product.shortDescription || "",
      slug: product.slug || "",
      price: product.price || 0,
      image: imageUrl,
    };
  });

  return (
    <main>
      <ShopHero />
      <ShopGrid products={products} />
    </main>
  );
}
