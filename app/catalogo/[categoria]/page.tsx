import Image from "next/image";
import Link from "next/link";
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

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;

  const items = PRODUCTS.filter((p) => p.category === categoria);

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
          <Link href="/catalogo" className="opacity-80 hover:opacity-100">
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

        <section className="mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold capitalize">
            {categoria ? categoria.replaceAll("-", " ") : "categoria"}
          </h1>
          <p className="mt-2 opacity-80">
            {items.length > 0
              ? `Encontramos ${items.length} produto(s) nesta categoria.`
              : "Ainda não há produtos cadastrados nessa categoria."}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <div className="relative h-56 w-full bg-black/40">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">{p.name}</div>
                      <div className="mt-1 text-sm opacity-70">Ref: {p.id}</div>
                    </div>
                    <div className="text-lg font-semibold">
                      {formatBRL(p.price)}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm opacity-70">Tamanhos</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.sizes.map((s) => (
                        <a
                          key={s}
                          href={buildWhatsappLink({ name: p.name, id: p.id, size: s })}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm hover:bg-black/60 transition"
                        >
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <a
                      href={buildWhatsappLink({ name: p.name, id: p.id })}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-[#25D366] text-black hover:brightness-110 transition"
                    >
                      Comprar no WhatsApp
                    </a>

                    <Link
                      href={`/produto/${p.slug}`}
                      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold border border-white/15 bg-black/40 hover:bg-black/55 transition"
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