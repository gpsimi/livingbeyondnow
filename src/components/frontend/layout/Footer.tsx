import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-bold uppercase tracking-wider mb-3">LBN</h3>
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              Unlocking purpose. Activating dominion capacity. Building legacy-driven systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">Navigate</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Services", "Shop", "Blog", "Partner", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-secondary-foreground/70 hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">Services</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>Personal Development</li>
              <li>Leadership Consulting</li>
              <li>Publishing & IP Development</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-4 text-accent">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              <li>lbnow2016@gmail.com</li>
              <li>09069755436</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-xs text-secondary-foreground/50">
          © {new Date().getFullYear()} Living Beyond Now. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
