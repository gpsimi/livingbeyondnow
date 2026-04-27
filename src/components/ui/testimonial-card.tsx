import { cn } from "@/utilities/ui"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-border",
        "bg-linear-to-b from-muted/50 to-muted/10",
        "p-5 text-start sm:p-6",
        "hover:from-muted/70 hover:to-muted/30",
        "max-w-[320px] sm:max-w-[340px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-11 w-11">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="font-heading text-sm text-navy leading-none">{author.name}</h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5">{author.handle}</p>
        </div>
      </div>
      {/* Gold accent line — brand touch */}
      <div className="w-8 h-0.5 bg-gold mb-3 rounded-full" />
      <p className="font-body text-sm text-muted-foreground leading-relaxed">{text}</p>
    </Card>
  )
}
