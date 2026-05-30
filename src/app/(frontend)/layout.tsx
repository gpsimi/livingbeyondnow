import type { Metadata } from "next";
import { Inter, Montserrat, Oswald } from "next/font/google";
import './globals.css'
import Header from "@/components/frontend/layout/Header";
import Footer from "@/components/frontend/layout/Footer";
import { Providers } from "@/components/frontend/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Living Beyond Now",
  description: "Unlocking purpose. Activating dominion capacity. Building legacy-driven systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${oswald.variable}`}>
      <body className="font-body min-h-screen bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
