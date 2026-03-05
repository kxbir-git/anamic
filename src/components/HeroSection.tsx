import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Anamic cyberpunk samurai hero banner"
          className="h-full w-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Tagline above logo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 font-body text-sm font-medium uppercase tracking-[0.4em] text-neon-purple"
        >
          Forged in the Future
        </motion.p>

        {/* Logo / Brand Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-2 font-display text-7xl font-black uppercase tracking-widest text-gradient-chrome sm:text-8xl md:text-9xl"
        >
          Anamic
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8 max-w-xl font-body text-lg font-light tracking-wider text-foreground/70 sm:text-xl"
        >
          Where ancient bushido meets neon-lit streets. Premium anime-inspired
          streetwear for the next era.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <a href="/shop" className="group relative overflow-hidden rounded-sm border border-primary/50 bg-primary px-10 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:glow-orange hover:shadow-lg">
            <span className="relative z-10">Shop Collection</span>
            <div className="absolute inset-0 -translate-x-full bg-neon-purple transition-transform duration-500 group-hover:translate-x-0" />
            <span className="absolute inset-0 z-10 flex items-center justify-center font-display text-sm font-bold uppercase tracking-widest text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              Shop Collection
            </span>
          </a>

          <button className="rounded-sm border border-foreground/20 bg-transparent px-10 py-4 font-display text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:border-neon-purple hover:glow-purple">
            Discover More
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-8 w-[1px] bg-gradient-to-b from-neon-orange to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
