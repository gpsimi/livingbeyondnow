import { getProductById, products } from "@/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import ProductDetailClient from "@/components/frontend/pages/shop/ProductDetailClient";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-background min-h-screen pt-12 pb-24">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm uppercase tracking-wider mb-12 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Left Column - Product Image Placeholder */}
          <div className="aspect-3/4 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] rounded-xl flex flex-col items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="relative z-10 text-white/90">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-white/70">
                {product.category}
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none text-balance">
                {product.title}
              </h2>
              <p className="text-sm md:text-base mt-4 text-white/80 font-medium">
                {product.subtitle}
              </p>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em] mb-2">
              {product.category}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-foreground leading-[0.9]">
              {product.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-4 mb-6">
              {product.subtitle}
            </p>

            <div className="text-3xl font-bold text-[#8B2C2C] mb-6">
              ${product.price}
            </div>

            <div className="space-y-4 text-foreground/80 leading-relaxed mb-8">
              {product.longDescription.map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
            </div>

            <div className="bg-muted/50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">
                What you&apos;ll gain
              </h3>
              <ul className="space-y-3">
                {product.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground/80">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <ProductDetailClient product={product} />

            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-border">
              {product.format && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">
                    Format
                  </p>
                  <p className="font-medium">{product.format}</p>
                </div>
              )}
              {product.pages && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-1">
                    Pages
                  </p>
                  <p className="font-medium">{product.pages}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 text-center">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Truck className="h-6 w-6 stroke-[1.5]" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Worldwide Shipping
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-6 w-6 stroke-[1.5]" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Secure Checkout
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <RotateCcw className="h-6 w-6 stroke-[1.5]" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="bg-muted/30 py-24">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-center mb-12">
            You May Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((rp) => (
              <Link key={rp.id} href={`/shop/${rp.id}`} className="group block">
                <div className="aspect-3/4 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] rounded-t-lg flex flex-col items-center justify-center p-6 text-center shadow-lg relative overflow-hidden transition-transform group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="relative z-10 text-white/90">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/70">
                      {rp.category}
                    </p>
                    <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight leading-tight text-balance">
                      {rp.title}
                    </h3>
                  </div>
                </div>
                <div className="bg-card border border-border border-t-0 rounded-b-lg p-5 flex items-center justify-between shadow-sm">
                  <span className="font-bold text-[#8B2C2C]">${rp.price}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                    View &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
