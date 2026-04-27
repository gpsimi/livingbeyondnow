import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FinalCTA from "./final-cta";
import { CartDrawer } from "../shop/cart-drawer";
import { AddToCartModal } from "../shop/add-to-cart-modal";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FinalCTA />
      <Footer />
      <CartDrawer />
      <AddToCartModal />
    </div>
  );
};

export default Layout;
