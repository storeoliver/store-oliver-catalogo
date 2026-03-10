import fs from "fs";
import path from "path";

export type Product = {
  sku: string;
  name: string;
  category: string;
  sizes: string[];
  image: string;
};

const BASE = path.join(process.cwd(), "public", "products");

export function getProducts(): Product[] {
  const categories = fs.readdirSync(BASE);

  const products: Record<string, Product> = {};

  categories.forEach((category) => {
    const categoryPath = path.join(BASE, category);

    if (!fs.statSync(categoryPath).isDirectory()) return;

    const sizes = fs.readdirSync(categoryPath);

    sizes.forEach((size) => {
      const sizePath = path.join(categoryPath, size);

      if (!fs.statSync(sizePath).isDirectory()) return;

      const files = fs.readdirSync(sizePath);

      files.forEach((file) => {
        const sku = file.replace(/\.(jpeg|jpg|png|webp)$/i, "");

        if (!products[sku]) {
          products[sku] = {
            sku,
            name: sku,
            category,
            sizes: [],
            image: `/products/${category}/${size}/${file}`,
          };
        }

        if (!products[sku].sizes.includes(size)) {
          products[sku].sizes.push(size);
        }
      });
    });
  });

  return Object.values(products);
}