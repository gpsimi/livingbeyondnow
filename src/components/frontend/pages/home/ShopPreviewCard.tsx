"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type ShopPreviewProduct = {
  title: string;
  category: string;
  subtitle: string;
  slug: string;
};

interface ShopPreviewCardProps {
  product: ShopPreviewProduct;
  index: number;
}

export function ShopPreviewCard({ product, index }: ShopPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-[3/4] bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center p-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 font-semibold">{product.category}</span>
            <h3 className="font-heading text-xl font-bold uppercase text-primary-foreground mt-3 leading-tight">{product.title}</h3>
            <p className="text-primary-foreground/70 text-xs mt-2">{product.subtitle}</p>
          </div>
        </div>
        <div className="p-5">
          <Link href={`/shop/${product.slug}`} className="text-primary text-sm font-semibold uppercase tracking-wider hover:text-accent transition-colors">
            View Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
