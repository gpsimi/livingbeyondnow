"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo1 from "@/assets/logos/lbn-logo.png";  

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Partner", path: "/partner" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    // <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
      <div className="container-narrow flex h-20 items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src={logo1}
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <div
            className="flex flex-col items-start"
          >
            <span
              className="font-heading text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300">
              LIVING BEYOND NOW
            </span>
            <span
              className="text-[7px] lg:text-[7.5px] font-bold tracking-[0.3em] uppercase transition-colors duration-300">
              EMPOWERMENT OUTREACH
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={
                link.label === "Contact"
                  ? "ml-4 px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md bg-primary text-white hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                  : `px-4 py-2 text-sm font-medium rounded-md transition-colors hover:text-primary ${
                      pathname === link.path
                        ? "text-primary bg-primary/5"
                        : "text-foreground/70"
                    }`
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav via Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] sm:max-w-sm flex flex-col p-6">
            <SheetHeader className="text-left mb-6">
              <SheetTitle>
                <Image
                  src={logo1}
                  alt="Living Beyond Now Logo"
                  width={140}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={
                    link.label === "Contact"
                      ? "block mt-4 py-3 text-center text-sm font-bold uppercase tracking-wider rounded-md bg-[#1B3629] text-white hover:bg-[#13261C] transition-colors"
                      : `block py-3 text-sm font-medium border-b border-border/50 transition-colors ${
                          pathname === link.path
                            ? "text-primary"
                            : "text-foreground/70"
                        }`
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
