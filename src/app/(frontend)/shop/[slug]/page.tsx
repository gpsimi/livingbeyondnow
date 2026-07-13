import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import ProductDetailClient from "@/components/frontend/pages/shop/ProductDetailClient";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import RichText from "@/components/RichText";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";



export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const products = await payload.find({
    collection: "products",
    where: { _status: { equals: "published" } },
    limit: 1000,
  });

  return products.docs.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "products",
    where: {
      slug: {
        equals: resolvedParams.slug,
      },
      _status: {
        equals: "published",
      },
    },
    limit: 1,
    depth: 2,
  });

  if (docs.length === 0) {
    notFound();
  }

  const product = docs[0];

  // Resolve Category
  let categoryTitle = "Book";
  if (product.category && typeof product.category === "object" && "title" in product.category) {
    categoryTitle = product.category.title;
  }

  // Resolve Image
  let imageUrl = "";
  if (product.heroImage && typeof product.heroImage === "object" && "url" in product.heroImage) {
    imageUrl = product.heroImage.url || "";
  }

  // Resolve Related Products
  const related = await payload.find({
    collection: "products",
    where: {
      slug: { not_equals: resolvedParams.slug },
      _status: { equals: "published" },
    },
    limit: 3,
    depth: 1,
  });
  const relatedProducts = related.docs;

    return (
      <div className="bg-neutral-50/50 min-h-screen pt-12 pb-24">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-800 text-xs font-bold uppercase tracking-widest mb-10 transition-colors"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Back to Shop
          </Link>

          {/* Top Section Grid: Product Cover + Floating Card */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Left Column - Product Image (5 cols) */}
            <div className="md:col-span-6 lg:col-span-5">
              <div className="aspect-4/5 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] rounded-2xl flex flex-col items-center justify-center p-8 text-center shadow-xl relative overflow-hidden group">
                {imageUrl ? (
                  <Image 
                    src={imageUrl} 
                    alt={product.title} 
                    fill 
                    unoptimized
                    className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-102"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="relative z-10 text-white/90">
                      <p className="text-xs font-extrabold tracking-[0.25em] uppercase mb-4 text-white/70">
                        {categoryTitle}
                      </p>
                      <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none text-balance">
                        {product.title}
                      </h2>
                      <p className="text-sm md:text-base mt-4 text-white/80 font-medium">
                        {product.shortDescription}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column - Product Buy Card (7 cols) */}
            <div className="md:col-span-6 lg:col-span-7">
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block bg-neutral-100 text-neutral-800 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-4">
                    {categoryTitle}
                  </span>
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-neutral-900 leading-none mb-3">
                    {product.title}
                  </h1>
                  
                  <div className="text-3xl font-bold text-[#8B2C2C] mb-6">
                    ${product.price}
                  </div>

                  <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-medium">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  {/* Action buttons (Add to Cart, Buy Now, Quantity) */}
                  <ProductDetailClient product={product} />

                  {/* Metadata List */}
                  <div className="mt-8 space-y-3 text-xs">
                    {product.format && (
                      <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-100">
                        <span className="text-neutral-400 font-bold uppercase tracking-wider">Format</span>
                        <span className="text-neutral-800 font-semibold">{product.format}</span>
                      </div>
                    )}
                    {product.pages && (
                      <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-100">
                        <span className="text-neutral-400 font-bold uppercase tracking-wider">Pages</span>
                        <span className="text-neutral-800 font-semibold">{product.pages} Pages</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-dashed border-neutral-100">
                      <span className="text-neutral-400 font-bold uppercase tracking-wider">Delivery</span>
                      <span className="text-[#1B3629] font-bold">Instant Secure Download</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Container (White card matching Image 1 layout) */}
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-10 lg:p-12 shadow-xs mb-20">
            <div className="prose max-w-none text-neutral-700 leading-relaxed font-body">
              <RichText data={product.description as unknown as DefaultTypedEditorState} enableGutter={false} />
            </div>

            {/* Bottom Summary Bar inside Description Box */}
            <div className="border-t border-neutral-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-[#8B2C2C]">${product.price}</span>
              </div>
              <div className="w-full sm:w-auto min-w-[200px]">
                <Link
                  href="/checkout"
                  className="w-full inline-flex h-12 items-center justify-center bg-[#1B3629] hover:bg-[#13261C] text-white rounded-lg font-semibold shadow-xs transition-colors px-8 text-center"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (Styled to match Image 1 related cards) */}
        {relatedProducts.length > 0 && (
          <div className="bg-neutral-50 border-t border-neutral-100 py-20">
            <div className="container max-w-6xl mx-auto px-4 md:px-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block text-center mb-2">
                Explore More
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-center text-neutral-900 mb-12">
                You May Also Like
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {relatedProducts.map((rp) => {
                  let rpCategory = "Book";
                  if (rp.category && typeof rp.category === "object" && "title" in rp.category) {
                    rpCategory = rp.category.title;
                  }

                  let rpImageUrl = "";
                  if (rp.heroImage && typeof rp.heroImage === "object" && "url" in rp.heroImage) {
                    rpImageUrl = rp.heroImage.url || "";
                  }

                  return (
                    <Link key={rp.slug} href={`/shop/${rp.slug}`} className="group block bg-white border border-neutral-200/50 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                      <div className="aspect-4/5 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] relative overflow-hidden flex items-center justify-center p-6 text-center">
                        {rpImageUrl ? (
                          <Image 
                            src={rpImageUrl} 
                            alt={rp.title} 
                            fill 
                            unoptimized
                            className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-102"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="relative z-10 text-white/90">
                              <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2 text-white/70">
                                {rpCategory}
                              </p>
                              <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight leading-tight text-balance px-2">
                                {rp.title}
                              </h3>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="p-5 flex flex-col gap-2">
                        <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider">
                          {rpCategory}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-neutral-900 uppercase tracking-tight line-clamp-1 group-hover:text-[#8B2C2C] transition-colors leading-tight">
                          {rp.title}
                        </h4>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                          <span className="font-bold text-[#8B2C2C]">${rp.price}</span>
                          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors flex items-center gap-1">
                            View &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
