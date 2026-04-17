import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden border border-border bg-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.tag && (
          <span className="absolute left-3 top-3 rounded-sm bg-primary px-2 py-0.5 font-display text-[10px] font-bold uppercase text-primary-foreground">
            {product.tag}
          </span>
        )}

        {/* Quick add overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-background/30 to-transparent p-4"
        >
          <div className="w-full space-y-3">
            {/* Sizes */}
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-sm border px-2.5 py-1 font-body text-xs font-medium uppercase transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-neon-purple"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, selectedSize)}
              className="flex w-full items-center justify-center gap-2 bg-primary py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:glow-orange"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </button>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-4">
        <span className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {product.category}
        </span>
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
          {product.name}
        </h3>
        <span className="font-body text-lg font-bold text-neon-orange">
          ${product.price}
        </span>
      </div>
    </motion.div>
  );
};

export default ProductCard;
