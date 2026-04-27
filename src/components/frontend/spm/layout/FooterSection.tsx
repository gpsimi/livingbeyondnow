import { CONTACT_INFO } from "@/components/frontend/spm/data/constants";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import logoLight from "@/assets/logos/logo-light.svg";
import Image from "next/image";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className="bg-[hsl(235,100%,16%)] py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            < Link href="/spm-2" className="inline-block mb-3">
              <Image
                src={logoLight}
                alt="Prime Counsel"
                className="h-8 md:h-10 w-auto"
                width={150}
                height={40}
                priority
              />
            </ Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-md">
              Prime Counsel is a UK-registered leadership and personal
              development organisation committed to helping emerging leaders
              move from potential to structured impact.
            </p>
          </div>

          <div className="md:text-right">
            <div className="flex md:justify-end gap-3 mb-4">
              {[
                {
                  href: CONTACT_INFO.instagram,
                  Icon: FaInstagram,
                  label: "Instagram",
                },
                {
                  href: CONTACT_INFO.youtube,
                  Icon: FaYoutube,
                  label: "YouTube",
                },
                { href: CONTACT_INFO.tiktok, Icon: FaTiktok, label: "TikTok" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm border border-white/15 flex items-center justify-center text-white/40 hover:text-secondary hover:border-secondary/40 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-body text-white/30 text-sm">
              © {new Date().getFullYear()} Prime Counsel Limited. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
