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
    }\n\nPode me passar disponibilidade e prazo de entrega?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* watermark */}
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

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* imagem */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="relative h-[420px] w-full bg-black/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* infos */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h1 className="text-3xl font-semibold">{product.name}</h1>

            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="text-sm opacity-70">Ref: {product.id}</div>
              <div className="text-2xl font-semibold">{formatBRL(product.price)}</div>
            </div>

            <div className="mt-6">
              <div className="text-sm opacity-70">Escolha o tamanho</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <a
                    key={s}
                    href={buildWhatsappLink({ name: product.name, id: product.id, size: s })}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-semibold hover:bg-black/60 transition"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={buildWhatsappLink({ name: product.name, id: product.id })}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-4 font-semibold bg-[#25D366] text-black hover:brightness-110 transition"
              >
                Comprar no WhatsApp
              </a>

              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-2xl px-5 py-4 font-semibold border border-white/15 bg-black/40 hover:bg-black/55 transition"
              >
                Voltar ao catálogo
              </Link>
            </div>

            <div className="mt-6 text-xs opacity-60">
              Dica operacional: ao clicar no tamanho, a mensagem já vai com produto + ref + tamanho.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}