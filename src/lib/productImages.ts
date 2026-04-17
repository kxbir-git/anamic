import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import poster1 from "@/assets/poster-1.jpg";
import poster2 from "@/assets/poster-2.jpg";
import poster3 from "@/assets/poster-3.jpg";

// Map asset paths stored in DB to bundled image URLs
const imageMap: Record<string, string> = {
  "/src/assets/product-1.jpg": product1,
  "/src/assets/product-2.jpg": product2,
  "/src/assets/product-3.jpg": product3,
  "/src/assets/product-4.jpg": product4,
  "/src/assets/product-5.jpg": product5,
  "/src/assets/product-6.jpg": product6,
  "/src/assets/poster-1.jpg": poster1,
  "/src/assets/poster-2.jpg": poster2,
  "/src/assets/poster-3.jpg": poster3,
};

export const resolveProductImage = (url: string): string => {
  return imageMap[url] ?? url;
};
