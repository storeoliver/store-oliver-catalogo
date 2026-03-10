export const runtime = "nodejs";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../../../data/products";
import { getProducts } from "@/data/catalog";

const WHATSAPP_NUMBER = "5538997316598";

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buildWhatsappLink(opts: { name: string; id: string; size?: string }) {
  const { name, id, size } = opts;
  const text = encodeURIComponent(
    `Olá! Vim pelo catálogo da STORE OLIVER.\nProduto: ${name}\nRef: ${id}${
      size ? `\nTamanho: ${size}` : ""
    }`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ categoria: string }>;
  searchParams?: Promise<{ size?: string }>;
}) {
  const folderProducts = getProducts();
  const { categoria } = await params;
  const sp = searchParams ? await searchParams : {};

const SIZES =
  categoria === "calcas" || categoria === "bermudas"
    ? ["36", "38", "40", "42", "44", "46", "48"]
    : ["P", "M", "G", "GG"];  type Size = (typeof SIZES)[number];

  const selectedSizeRaw = (sp.size || "").toUpperCase();
  const selectedSize: Size | "" =
    SIZES.includes(selectedSizeRaw as Size) ? (selectedSizeRaw as Size) : "";

  const items = folderProducts.filter((p) => p.category === categoria);
console.log("CATEGORIA URL:", categoria);
console.log("PRODUTOS DAS PASTAS:", folderProducts);
console.log("ITEMS FILTRADOS:", items);

  const filteredItems =
    selectedSize === "" ? items : items.filter((p) => p.sizes.includes(selectedSize));

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[320px] sm:w-[420px] md:w-[520px]">
          <Image
            src="/brand/logo.jpeg"
            alt="STORE OLIVER"
            width={1200}
            height={1200}
            priority
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10">
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="opacity-80 hover:opacity-100">
            ← Voltar
          </Link>

          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.jpeg"
              alt="STORE OLIVER"
              width={120}
              height={120}
              className="h-10 w-auto"
              priority
            />
            <div className="leading-tight">
              <div className="text-sm opacity-80">Categoria</div>
              <div className="font-semibold tracking-wide">STORE OLIVER</div>
            </div>
          </div>

          <div className="w-14" />
        </header>

        <section className="mt-5 sm:mt-8">
          <h1 className="text-1 sm:text-3xl font-semibold capitalize">
            {categoria ? categoria.replaceAll("-", " ") : "categoria"}
          </h1>

          <p className="mt-1 text-sm sm:text-base opacity-80">
            {filteredItems.length > 0
              ? `Encontramos ${filteredItems.length} produto(s) nesta categoria.`
              : "Ainda não há produtos cadastrados nessa categoria."}
          </p>

          {/* Filtros por tamanho */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/catalogo/${categoria}`}
              className={`px-4 py-2 rounded-xl border ${
                selectedSize === "" ? "bg-white text-black" : "border-white/20"
              }`}
            >
              Todos
            </Link>

            {SIZES.map((size) => (
              <Link
                key={size}
                href={`/catalogo/${categoria}?size=${size}`}
                className={`px-4 py-2 rounded-xl border ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "border-white/20"
                }`}
              >
                {size}
              </Link>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((p) => (
              <div
                key={p.sku}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="relative h-36 sm:h-56 w-full bg-black/40">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <div className="p-2 sm:p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm sm:text-lg font-semibold leading-tight">{p.name}</div>
                    </div>
                    <div className="text-sm sm:text-lg font-semibold whitespace-nowrap">
  {formatBRL(
  categoria === "camisetas"
    ? 79.99
    : categoria === "shorts"
    ? 89.99
    : 0
)}
</div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
  <a
    href={buildWhatsappLink({
      name: p.name,
      id: p.sku,
      size: selectedSize || undefined,
    })}
    target="_blank"
    rel="noreferrer"
    className="inline-flex min-h-[36px] sm:min-h-[42px] items-center justify-center rounded-xl bg-[#25D366] px-2 sm:px-3 py-2 text-[10px] sm:text-sm font-semibold text-black shadow-md leading-tight text-center"
  >
    Comprar no WhatsApp
  </a>

  <Link
    href={`/produto/${encodeURIComponent(p.sku)}${selectedSize ? `?size=${selectedSize}` : ""}`}
    className="inline-flex min-h-[36px] sm:min-h-[42px] items-center justify-center rounded-xl bg-[#25D366] px-2 sm:px-3 py-2 text-[10px] sm:text-sm font-semibold text-black shadow-md leading-tight text-center whitespace-nowrap"
  >
    Ver detalhes
  </Link>
</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}