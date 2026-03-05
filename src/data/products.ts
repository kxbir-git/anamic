import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Katana Blaze Tee",
    price: 59,
    image: product1,
    category: "Tees",
    tag: "NEW",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Uzumaki Phantom Hoodie",
    price: 129,
    image: product2,
    category: "Hoodies",
    tag: "HOT",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "3",
    name: "Ronin Bomber Jacket",
    price: 249,
    image: product3,
    category: "Jackets",
    sizes: ["M", "L", "XL"],
  },
  {
    id: "4",
    name: "Shinobi Cargo Pants",
    price: 149,
    image: product4,
    category: "Bottoms",
    tag: "NEW",
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "5",
    name: "Shuriken Prism Tee",
    price: 55,
    image: product5,
    category: "Tees",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "6",
    name: "Samurai Chrome Cap",
    price: 45,
    image: product6,
    category: "Accessories",
    sizes: ["One Size"],
  },
];
