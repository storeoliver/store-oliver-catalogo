import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../../data/products";

const SIZES = ["P", "M", "G", "GG"] as const;

function titleize(slug: string) {
  return slug
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CatalogoPage() {
  // categorias únicas a partir dos produtos
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

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
              <div className="text-sm opacity-80">Catálogo</div>
              <div className="font-semibold tracking-wide">STORE OLIVER</div>
            </div>
          </div>

          <div className="opacity-80 text-sm">Selecione uma categoria</div>
        </header>

        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => {
              const count = PRODUCTS.filter((p) => p.category === cat).length;

              return (
                <div
                  key={cat}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">
                        {titleize(cat)}
                      </div>
                      <div className="mt-1 text-sm opacity-70">
                        {count} produto(s)
                      </div>
                    </div>

                    <Link
                      href={`/catalogo/${cat}`}
                      className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm hover:bg-black/60 transition"
                    >
                      Ver tudo
                    </Link>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm opacity-70">Filtrar por tamanho</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <Link
                          key={size}
                          href={`/catalogo/${cat}?size=${size}`}
                          className="rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm hover:bg-black/60 transition"
                        >
                          {size}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}