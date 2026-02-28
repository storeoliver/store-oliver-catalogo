import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { title: "Camisetas", slug: "camisetas", badge: "" },
  { title: "Polos", slug: "polos", badge: "" },
  { title: "Camisas", slug: "camisas", badge: "" },
  { title: "Calças", slug: "calcas", badge: "" },
  { title: "Bermudas", slug: "bermudas", badge: "" },
  { title: "Shorts", slug: "shorts", badge: "" },
  { title: "Cuecas", slug: "cuecas", badge: "" },
  { title: "Lançamentos", slug: "lancamentos", badge: "NEW" },
  { title: "Promoções", slug: "promocoes", badge: "OFF" },
  { title: "Últimas Peças", slug: "ultimas-pecas", badge: "🔥" },
];

export default function CatalogoPage() {
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
              <div className="text-sm opacity-80">Catálogo</div>
              <div className="font-semibold tracking-wide">STORE OLIVER</div>
            </div>
          </div>

          <div className="w-14" />
        </header>

        <section className="mt-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Categorias</h1>
          <p className="mt-2 opacity-80">
            Escolha uma categoria para visualizar os produtos.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/catalogo/${c.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
              >
                {c.badge ? (
                  <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold">
                    {c.badge}
                  </div>
                ) : null}

                <div className="mt-12">
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="mt-1 text-sm opacity-70">Ver produtos →</div>
                </div>

                <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}