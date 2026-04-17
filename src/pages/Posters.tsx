import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Check, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

type FrameStyle = "none" | "black" | "oak";
type Finish = { id: string; name: string; desc: string; multiplier: number };

const finishes: Finish[] = [
  { id: "matte", name: "Matte", desc: "Soft, glare-free archival paper", multiplier: 1 },
  { id: "glossy", name: "Glossy", desc: "Vivid colors with a reflective sheen", multiplier: 1.15 },
  { id: "premium", name: "Premium Giclée", desc: "Museum-grade cotton, hand-finished", multiplier: 1.6 },
];

const sizes = ["A3", "A2", "A1"];

const Posters = () => {
  const { data: allProducts = [], isLoading } = useProducts();
  const posters = useMemo(
    () => allProducts.filter((p) => p.category === "Posters"),
    [allProducts]
  );
  const [activeId, setActiveId] = useState<string | undefined>(undefined);
  const [size, setSize] = useState("A2");
  const [finishId, setFinishId] = useState("matte");
  const [frame, setFrame] = useState<FrameStyle>("black");
  const { addItem } = useCart();

  const active = posters.find((p) => p.id === activeId) ?? posters[0];
  const finish = finishes.find((f) => f.id === finishId)!;
  const sizeMultiplier = size === "A1" ? 1.8 : size === "A2" ? 1.3 : 1;
  const framePrice = frame === "none" ? 0 : frame === "oak" ? 45 : 35;
  const totalPrice = active
    ? Math.round(active.price * finish.multiplier * sizeMultiplier + framePrice)
    : 0;

  if (isLoading || !active) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <CartDrawer />
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-neon-orange" />
        </div>
      </div>
    );
  }

  const frameStyles: Record<FrameStyle, string> = {
    none: "p-0 bg-transparent",
    black: "p-4 bg-gradient-to-br from-zinc-900 to-black shadow-2xl ring-1 ring-black/40",
    oak: "p-4 bg-gradient-to-br from-amber-700/80 to-amber-900/90 shadow-2xl ring-1 ring-amber-950/50",
  };

  const matStyle =
    frame === "none"
      ? ""
      : "bg-[hsl(var(--background))] p-3 shadow-inner ring-1 ring-border";

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
            <p className="mb-3 font-body text-sm font-medium uppercase tracking-[0.4em] text-neon-purple">
              Wall Art Series
            </p>
            <h1 className="font-display text-5xl font-bold uppercase tracking-wider text-foreground sm:text-6xl">
              Anamic Posters
            </h1>
            <p className="mt-3 max-w-xl font-body text-lg text-muted-foreground">
              Limited-run prints forged in neon. Choose your size, finish, and frame —
              each poster is made to order and shipped flat.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            {/* Preview */}
            <div className="space-y-6">
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm border border-border bg-gradient-to-br from-muted/40 via-background to-muted/20 p-8 sm:p-14">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.id}-${frame}-${finishId}`}
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative max-h-full ${frameStyles[frame]}`}
                    style={{ width: size === "A1" ? "92%" : size === "A2" ? "78%" : "64%" }}
                  >
                    <div className={matStyle}>
                      <div className="relative">
                        <img
                          src={active.image}
                          alt={active.name}
                          className="block h-auto w-full"
                          style={{
                            filter:
                              finishId === "glossy"
                                ? "saturate(1.15) contrast(1.05)"
                                : finishId === "premium"
                                ? "saturate(1.05) contrast(1.02) brightness(1.02)"
                                : "saturate(0.95)",
                          }}
                        />
                        {finishId === "glossy" && (
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 mix-blend-overlay" />
                        )}
                        {finishId === "premium" && (
                          <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(hsl(var(--foreground))_0.5px,transparent_0.5px)] [background-size:3px_3px]" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* floor reflection */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-background to-transparent" />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {posters.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveId(p.id)}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-sm border-2 transition-all ${
                      p.id === activeId
                        ? "border-primary glow-orange"
                        : "border-border hover:border-neon-purple"
                    }`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div>
                <span className="font-body text-[11px] font-medium uppercase tracking-[0.3em] text-neon-purple">
                  {active.tag ?? "Edition"}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-wider text-foreground">
                  {active.name}
                </h2>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  Printed on demand. Ships within 5–7 business days.
                </p>
              </div>

              {/* Size */}
              <Section label="Size">
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <OptionButton key={s} active={size === s} onClick={() => setSize(s)}>
                      <span className="block font-display text-sm font-bold">{s}</span>
                      <span className="block font-body text-[10px] text-muted-foreground">
                        {s === "A3" ? "30×42cm" : s === "A2" ? "42×59cm" : "59×84cm"}
                      </span>
                    </OptionButton>
                  ))}
                </div>
              </Section>

              {/* Finish */}
              <Section label="Paper / Finish">
                <div className="space-y-2">
                  {finishes.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFinishId(f.id)}
                      className={`flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left transition-all ${
                        finishId === f.id
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-neon-purple"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
                            {f.name}
                          </span>
                          {finishId === f.id && (
                            <Check className="h-3.5 w-3.5 text-neon-orange" />
                          )}
                        </div>
                        <p className="mt-0.5 font-body text-xs text-muted-foreground">
                          {f.desc}
                        </p>
                      </div>
                      <span className="font-body text-xs text-muted-foreground">
                        {f.multiplier === 1 ? "Included" : `+${Math.round((f.multiplier - 1) * 100)}%`}
                      </span>
                    </button>
                  ))}
                </div>
              </Section>

              {/* Frame */}
              <Section label="Frame Mockup">
                <div className="grid grid-cols-3 gap-2">
                  <OptionButton active={frame === "none"} onClick={() => setFrame("none")}>
                    <span className="block font-display text-sm font-bold">Unframed</span>
                    <span className="block font-body text-[10px] text-muted-foreground">+ $0</span>
                  </OptionButton>
                  <OptionButton active={frame === "black"} onClick={() => setFrame("black")}>
                    <span className="block font-display text-sm font-bold">Black</span>
                    <span className="block font-body text-[10px] text-muted-foreground">+ $35</span>
                  </OptionButton>
                  <OptionButton active={frame === "oak"} onClick={() => setFrame("oak")}>
                    <span className="block font-display text-sm font-bold">Oak</span>
                    <span className="block font-body text-[10px] text-muted-foreground">+ $45</span>
                  </OptionButton>
                </div>
              </Section>

              {/* Price + CTA */}
              <div className="mt-auto border-t border-border pt-6">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Total
                  </span>
                  <span className="font-display text-3xl font-bold text-neon-orange">
                    ${totalPrice}
                  </span>
                </div>
                <button
                  onClick={() =>
                    addItem(
                      { id: active.id, name: active.name, price: totalPrice, image: active.image },
                      `${size} · ${finish.name}${frame !== "none" ? ` · ${frame === "oak" ? "Oak" : "Black"} Frame` : ""}`
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 bg-primary py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:glow-orange"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
                <p className="mt-3 text-center font-body text-xs text-muted-foreground">
                  Free worldwide shipping on orders over $100
                </p>
              </div>
            </motion.div>
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

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <h3 className="mb-3 font-body text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </h3>
    {children}
  </div>
);

const OptionButton = React.forwardRef<
  HTMLButtonElement,
  { active: boolean; onClick: () => void; children: React.ReactNode }
>(({ active, onClick, children }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={`rounded-sm border px-3 py-2.5 text-center transition-all ${
      active
        ? "border-primary bg-primary/10 text-foreground glow-orange"
        : "border-border bg-card text-foreground hover:border-neon-purple"
    }`}
  >
    {children}
  </button>
));
OptionButton.displayName = "OptionButton";

export default Posters;
