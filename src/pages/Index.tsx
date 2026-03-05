import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturedSection />

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

export default Index;
