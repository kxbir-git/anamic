import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Tees", "Hoodies", "Jackets", "Bottoms", "Accessories"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartDrawer />

      <div className="px-6 pb-24 pt-28 sm:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-neon-orange"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
              Shop
            </h1>
            <p className="mt-2 font-body text-lg text-muted-foreground">
              Season 01 — Limited drops forged in neon fire.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-sm border px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground glow-orange"
                    : "border-border bg-card text-muted-foreground hover:border-neon-purple hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background px-6 py-12 sm:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
          <span className="font-display text-lg font-bold uppercase tracking-[0.3em] text-foreground">
            Anamic
          </span>
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Anamic. All rights reserved. Forged in the future.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
