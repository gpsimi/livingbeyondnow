import Image from "next/image";
import Link from "next/link";
import logoLight from "@/assets/logos/logo-light.svg";
import { FaInstagram, FaYoutube, FaTiktok, } from 'react-icons/fa'
import { CONTACT_INFO, footerLinks } from "@/constants";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            < Link href="/" className="inline-block mb-3">
              <Image
                src={logoLight}
                alt="Prime Counsel"
                className="h-8 md:h-10 w-auto"
                width={150}
                height={40}
                priority
              />
            </ Link>
            <p className="font-body text-sm leading-relaxed text-primary-foreground/70 max-w-md">
              A global leadership and personal development institution building
              visionary, ethically grounded and strategically positioned
              leaders.
            </p>
            <div className="my-4">
                  <p className="font-body text-sm font-semibold text-primary-foreground/70 uppercase tracking-wider mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href={CONTACT_INFO.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="w-3 h-3 text-white group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="YouTube"
                    >
                      <FaYoutube className="w-3 h-3 text-white group-hover:text-primary-foreground transition-colors" />
                    </Link>
                    <Link
                      href={CONTACT_INFO.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-all group"
                      aria-label="TikTok"
                    >
                      <FaTiktok className="w-3 h-3 text-white group-hover:text-primary-foreground transition-colors" />
                    </Link>
                  </div>
                </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold tracking-wider uppercase mb-4 text-secondary">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  className="font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold tracking-wider uppercase mb-4 text-secondary">
              Contact
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-primary-foreground/70">
              <a
                href="mailto:info@primecounsel.co.uk"
                className="hover:text-secondary transition-colors"
              >
                info@primecounsel.co.uk
              </a>
              <a
                href="tel:+447774483791"
                className="hover:text-secondary transition-colors"
              >
                +44 7774 483791
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-body text-xs text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-xs text-primary-foreground/50 hover:text-secondary transition-colors"
            >
              Terms of Use
            </Link>
          </div>
          <p className="font-body text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Prime Counsel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
