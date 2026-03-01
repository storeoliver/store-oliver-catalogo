import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../../data/products";

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

export default async function ProdutoPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ size?: string }>;
}) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : undefined;

  const selectedSize = (sp?.size || "").toUpperCase();

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  const SIZES = ["P", "M", "G", "GG"] as const;
  type Size = (typeof SIZES)[number];

  const normalizedSize: Size | "" =
    SIZES.includes(selectedSize as Size) ? (selectedSize as Size) : "";

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* marca d'água */}
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

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10">
        <header className="flex items-center justify-between gap-4">
          <Link
            href={`/catalogo/${product.category}`}
            className="opacity-80 hover:opacity-100"
          >
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
              <div className="text-sm opacity-80">Produto</div>
              <div className="font-semibold tracking-wide">STORE OLIVER</div>
            </div>
          </div>

          <div className="w-14" />
        </header>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* imagem */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative aspect-[4/5] w-full bg-black/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* conteúdo */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold">
                  {product.name}
                </h1>
                <div className="mt-2 text-sm opacity-75">Ref: {product.id}</div>
                <div className="mt-1 text-sm opacity-75 capitalize">
                  Categoria: {product.category.replaceAll("-", " ")}
                </div>
              </div>
              <div className="text-2xl font-semibold">
                {formatBRL(product.price)}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm opacity-70">
                Tamanhos {normalizedSize ? `(selecionado: ${normalizedSize})` : ""}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isActive = normalizedSize === s;
                  return (
                    <Link
                      key={s}
                      href={`/produto/${product.slug}?size=${s}`}
                      className={`rounded-xl border px-3 py-2 text-sm transition ${
                        isActive
                          ? "border-white/40 bg-white/15"
                          : "border-white/15 bg-black/40 hover:bg-black/60"
                      }`}
                    >
                      {s}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={buildWhatsappLink({
                  name: product.name,
                  id: product.id,
                  size: normalizedSize || undefined,
                })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-[#25D366] text-black hover:brightness-110 transition"
              >
                Comprar no WhatsApp
              </a>

              <Link
                href={`/catalogo/${product.category}`}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold border border-white/15 bg-black/40 hover:bg-black/55 transition"
              >
                Ver mais da categoria
              </Link>
            </div>

            <div className="mt-6 text-xs opacity-70">
              Dica: selecione um tamanho para o WhatsApp já ir com o pedido completo.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}