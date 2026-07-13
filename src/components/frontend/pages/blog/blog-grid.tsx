"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"

export type BlogGridPost = {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
}

interface BlogGridProps {
    posts: BlogGridPost[];
    categories: string[];
}

const BlogGrid = ({ posts, categories }: BlogGridProps) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    const filteredPosts = activeCategory
        ? posts.filter((post) => post.category === activeCategory)
        : posts

    return (
        <section className="py-24 bg-background">
            <div className="container-narrow">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === null
                            ? "bg-primary text-primary-foreground border border-primary"
                            : "border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                ? "bg-primary text-primary-foreground border border-primary"
                                : "border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, i) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
                                    <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{post.category}</span>
                                    <h3 className="font-heading text-lg font-bold uppercase mt-2 mb-3 leading-tight">{post.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{post.excerpt}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">{post.date}</span>
                                        <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-semibold hover:text-accent transition-colors cursor-pointer">Read →</Link>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-border rounded-lg bg-muted/20">
                        <p className="text-xl text-foreground font-semibold">No posts found.</p>
                        <p className="text-muted-foreground mt-2">Try selecting a different category or check back later.</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default BlogGrid