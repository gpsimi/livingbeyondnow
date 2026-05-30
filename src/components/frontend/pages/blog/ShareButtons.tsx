"use client";

import { Share2, Twitter, Facebook, Linkedin } from "lucide-react";
import { toast } from "sonner";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        <Share2 className="h-4 w-4" /> Share
      </button>
      <div className="flex items-center gap-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors flex items-center justify-center"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
