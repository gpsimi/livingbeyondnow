"use client";

import Link from "next/link"
import { motion } from "framer-motion"

export type ShopGridProduct = {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  slug: string;
};

interface ShopGridProps {
  products: ShopGridProduct[];
}

const ShopGrid = ({ products }: ShopGridProps) => {
  return (
     <section className="py-24 bg-background">
      <div className="container-narrow">
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center p-8">
                    <div className="text-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60 font-semibold">{product.category}</span>
                      <h3 className="font-heading text-xl font-bold uppercase text-primary-foreground mt-3 leading-tight">{product.title}</h3>
                      <p className="text-primary-foreground/70 text-xs mt-2">{product.subtitle}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                    <Link href={`/shop/${product.slug}`} className="text-primary text-sm font-semibold uppercase tracking-wider hover:text-accent transition-colors">
                      View Details →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border rounded-lg bg-muted/20">
            <p className="text-xl text-foreground font-semibold">No Product Found.</p>
            <p className="text-muted-foreground mt-2">Check back soon for our latest resources.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ShopGrid