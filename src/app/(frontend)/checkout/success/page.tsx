import Link from "next/link";
import { CheckCircle, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Order Successful - Living Beyond Now",
  description: "Your book purchase was successful! Check your email for download links.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-background min-h-screen pt-20 pb-32 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CheckCircle className="h-16 w-16 text-[#1B3629] mx-auto stroke-[1.5]" />
        
        <div className="space-y-2">
          <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.25em]">
            Payment Confirmed
          </span>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-foreground">
            Thank You for Your Purchase!
          </h1>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          We have successfully processed your payment. Your secure download links for the purchased PDF book(s) have been dispatched to your email address. 
        </p>

        <div className="bg-muted/40 p-4 rounded-xl text-left border border-border flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-[#8B2C2C] shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-bold text-foreground">What happens next?</p>
            <p className="text-muted-foreground leading-normal">
              Check your inbox (and spam folder) for an email from <span className="font-bold text-foreground">Living Beyond Now</span> containing your links.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Link href="/shop">
            <Button className="w-full h-12 bg-[#1B3629] hover:bg-[#13261C] text-white font-bold uppercase tracking-wider text-xs">
              Go Back to Shop
            </Button>
          </Link>
          <Link href="/" className="inline-flex items-center justify-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
            Go to Homepage <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
