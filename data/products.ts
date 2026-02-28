export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string; // ex: "camisetas"
  sizes: Array<"P" | "M" | "G" | "GG">;
  image: string; // caminho em /public
  isNew?: boolean;
  isPromo?: boolean;
  isLast?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: "SO-001",
    slug: "camiseta-preta-basica",
    name: "Camiseta Preta Básica",
    price: 79.9,
    category: "camisetas",
    sizes: ["P", "M", "G", "GG"],
    image: "/products/camiseta-preta.jpeg",
    isNew: true,
  },
  {
    id: "SO-002",
    slug: "camiseta-branca-premium",
    name: "Camiseta Branca Premium",
    price: 89.9,
    category: "camisetas",
    sizes: ["M", "G", "GG"],
    image: "/products/camiseta-branca.jpeg",
  },
  {
    id: "SO-101",
    slug: "bermuda-sarja-caqui",
    name: "Bermuda Sarja Caqui",
    price: 119.9,
    category: "bermudas",
    sizes: ["P", "M", "G"],
    image: "/products/bermuda-caqui.jpeg",
    isPromo: true,
  },
  {
    id: "SO-201",
    slug: "polo-preta-classic",
    name: "Polo Preta Classic",
    price: 129.9,
    category: "polos",
    sizes: ["M", "G", "GG"],
    image: "/products/polo-preta.jpeg",
  },
];