'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export type ShopGridProduct = {
  title: string
  category: string
  subtitle: string
  description: string
  slug: string
  price: number
  image?: string | null
}

interface ShopGridProps {
  products: ShopGridProduct[]
}

const ShopGrid = ({ products }: ShopGridProps) => {
  return (
    <section className="py-24 bg-background">
      <div className="container-narrow">
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/shop/${product.slug}`} className="group flex flex-col bg-white border border-neutral-200/50 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow h-full">
                  <div className="aspect-4/5 bg-linear-to-br from-[#8B2C2C] to-[#1B3629] relative overflow-hidden flex items-center justify-center p-6 text-center">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        unoptimized
                        className="object-cover opacity-95 transition-transform duration-500 group-hover:scale-102"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="relative z-10 text-white/90">
                          <p className="text-[9px] font-bold tracking-[0.25em] uppercase mb-2 text-white/70">
                            {product.category}
                          </p>
                          <h3 className="font-heading text-lg md:text-xl font-bold uppercase tracking-tight leading-tight text-balance px-2">
                            {product.title}
                          </h3>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col gap-2 justify-between">
                    <div className="flex flex-col gap-2">
                      <span className="text-[9px] font-extrabold text-[#D4AF37] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h4 className="font-heading text-lg font-bold text-neutral-900 uppercase tracking-tight line-clamp-1 group-hover:text-[#8B2C2C] transition-colors leading-tight">
                        {product.title}
                      </h4>
                      <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                      <span className="font-bold text-[#8B2C2C]">${product.price}</span>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 group-hover:text-neutral-800 transition-colors flex items-center gap-1">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
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
