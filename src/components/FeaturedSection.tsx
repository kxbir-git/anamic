import { motion } from "framer-motion";

const categories = [
  { name: "Katana Tees", tag: "NEW" },
  { name: "Shinobi Hoodies", tag: "HOT" },
  { name: "Ronin Jackets", tag: null },
  { name: "Accessories", tag: null },
];

const FeaturedSection = () => {
  return (
    <section className="relative bg-background px-6 py-24 sm:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-body text-sm font-medium uppercase tracking-[0.4em] text-neon-purple">
            Season 01
          </p>
          <h2 className="font-display text-4xl font-bold uppercase tracking-wider text-foreground sm:text-5xl">
            The Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative cursor-pointer overflow-hidden border border-border bg-card"
            >
              <div className="aspect-[3/4] w-full bg-muted transition-all duration-500 group-hover:scale-105">
                <div className="flex h-full items-center justify-center">
                  <span className="font-display text-6xl font-black text-muted-foreground/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    {cat.name}
                  </h3>
                  {cat.tag && (
                    <span className="rounded-sm bg-primary px-2 py-0.5 font-body text-[10px] font-bold uppercase text-primary-foreground">
                      {cat.tag}
                    </span>
                  )}
                </div>
                <div className="mt-2 h-[1px] w-0 bg-neon-orange transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
