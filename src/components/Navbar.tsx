import { motion } from "framer-motion";
import { ShoppingBag, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-12"
      style={{
        background:
          "linear-gradient(180deg, hsl(270 15% 5% / 0.8) 0%, transparent 100%)",
      }}
    >
      <button className="text-foreground sm:hidden">
        <Menu className="h-6 w-6" />
      </button>

      <div className="hidden items-center gap-8 sm:flex">
        {["New Drops", "Collections", "Lookbook"].map((item) => (
          <a
            key={item}
            href="#"
            className="font-body text-sm font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-neon-orange"
          >
            {item}
          </a>
        ))}
      </div>

      <span className="absolute left-1/2 -translate-x-1/2 font-display text-lg font-bold uppercase tracking-[0.3em] text-foreground">
        Anamic
      </span>

      <div className="flex items-center gap-6">
        <a
          href="#"
          className="hidden font-body text-sm font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-neon-orange sm:block"
        >
          About
        </a>
        <button className="relative text-foreground transition-colors hover:text-neon-orange">
          <ShoppingBag className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-body text-[10px] font-bold text-primary-foreground">
            0
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
