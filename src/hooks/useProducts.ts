import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveProductImage } from "@/lib/productImages";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string;
  category: string;
  tag: string | null;
  sizes: string[];
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("category", { ascending: true });

      if (error) throw error;

      return (data ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        image: resolveProductImage(p.image_url),
        category: p.category,
        tag: p.tag,
        sizes: p.sizes ?? [],
      }));
    },
  });
};
