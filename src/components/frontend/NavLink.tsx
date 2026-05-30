import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string; // unused but accepted for backward compatibility
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  (
    { className, activeClassName, pendingClassName: _pendingClassName, href, ...props },
    ref,
  ) => {
    const router = useRouter();
    const isActive = router.pathname === href;

    // Note: Next.js doesn't expose pending state like react-router,
    // so pendingClassName is ignored.

    return (
      <Link href={href!} {...props} legacyBehavior>
        <a
          ref={ref}
          className={cn(className, isActive && activeClassName)}
        />
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
