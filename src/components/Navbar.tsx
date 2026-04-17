import { motion } from "framer-motion";
import { ShoppingBag, Menu, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-12"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background) / 0.8) 0%, transparent 100%)",
      }}
    >
      <button className="text-foreground sm:hidden">
        <Menu className="h-6 w-6" />
      </button>

      <div className="hidden items-center gap-8 sm:flex">
        <Link to="/shop" className="font-body text-sm font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-neon-orange">
          Shop
        </Link>
        <Link to="/posters" className="font-body text-sm font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-neon-orange">
          Posters
        </Link>
      </div>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-display text-lg font-bold uppercase tracking-[0.3em] text-foreground">
        Anamic
      </Link>

      <div className="flex items-center gap-5">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-foreground transition-colors hover:text-neon-orange"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button onClick={() => setIsOpen(true)} className="relative text-foreground transition-colors hover:text-neon-orange">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-body text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
