import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartDrawer = () => {
  const { items, removeItem, totalItems, totalPrice, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                Cart ({totalItems})
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground transition-colors hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="font-body text-sm text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 border-b border-border pb-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-20 rounded-sm object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                            {item.product.name}
                          </h3>
                          <p className="font-body text-xs text-muted-foreground">
                            Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-body text-sm font-bold text-neon-orange">
                            ${item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.size)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Total
                  </span>
                  <span className="font-display text-lg font-bold text-foreground">
                    ${totalPrice}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-primary py-3 text-center font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:glow-orange"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
