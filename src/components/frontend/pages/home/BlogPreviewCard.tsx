"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type BlogPreviewPost = {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  slug: string;
};

interface BlogPreviewCardProps {
  post: BlogPreviewPost;
  index: number;
}

export function BlogPreviewCard({ post, index }: BlogPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow h-full flex flex-col">
        <span className="text-accent text-xs font-semibold uppercase tracking-[0.15em]">{post.category}</span>
        <h3 className="font-heading text-lg font-bold uppercase mt-2 mb-3 leading-tight">{post.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{post.date}</span>
          <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-semibold hover:text-accent transition-colors">
            Read →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
