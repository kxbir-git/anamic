import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name.trim(),
          customer_email: form.email.trim(),
          shipping_address: form.address.trim(),
          total: totalPrice,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((i) => ({
        order_id: order.id,
        product_id: i.product.id,
        product_name: i.product.name,
        size: i.size,
        quantity: i.quantity,
        unit_price: i.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setSuccess(order.id);
      clearCart();
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md text-center"
          >
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-neon-orange" />
            <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-foreground">
              Order Confirmed
            </h1>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              Thank you for shopping with Anamic.
            </p>
            <p className="mt-2 font-body text-xs text-muted-foreground">
              Order #{success.slice(0, 8).toUpperCase()}
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-8 w-full bg-primary py-3 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:glow-orange"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="px-6 pb-24 pt-28 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/shop"
            className="mb-6 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-neon-orange"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          <h1 className="mb-12 font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
            Checkout
          </h1>

          <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Shipping Details
              </h2>
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
              <Field
                label="Shipping Address"
                value={form.address}
                onChange={(v) => setForm({ ...form, address: v })}
                multiline
              />

              <button
                type="submit"
                disabled={submitting || items.length === 0}
                className="flex w-full items-center justify-center gap-2 bg-primary py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:glow-orange disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order — $${totalPrice}`
                )}
              </button>
            </form>

            <div className="h-fit border border-border bg-card p-6">
              <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Order Summary
              </h2>
              {items.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground">Your cart is empty.</p>
              ) : (
                <div className="space-y-3">
                  {items.map((i) => (
                    <div
                      key={`${i.product.id}-${i.size}`}
                      className="flex items-center gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0"
                    >
                      <img
                        src={i.product.image}
                        alt={i.product.name}
                        className="h-14 w-12 rounded-sm object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-display text-xs font-bold uppercase text-foreground">
                          {i.product.name}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          {i.size} · Qty {i.quantity}
                        </p>
                      </div>
                      <span className="font-body text-sm font-bold text-neon-orange">
                        ${i.product.price * i.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-border pt-3 font-display text-base font-bold uppercase">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-neon-orange">${totalPrice}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  multiline?: boolean;
}) => (
  <div>
    <label className="mb-2 block font-body text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-sm border border-border bg-card px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-card px-4 py-3 font-body text-sm text-foreground outline-none transition-colors focus:border-primary"
      />
    )}
  </div>
);

export default Checkout;
