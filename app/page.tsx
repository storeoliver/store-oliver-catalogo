import Link from "next/link";
import { MessageCircle, Instagram, Phone } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5538997316598";
const INSTAGRAM_URL = "https://instagram.com/loja_storeoliver";

const SIZES = ["P", "M", "G", "GG"] as const;

type Product = {
  category: string;
  isNew?: boolean;
  isPromo?: boolean;
};

type HomeCard =
  | { title: string; slug: string; kind: "category" }
  | { title: string; slug: string; kind: "tag"; tag: "new" | "promo" };

const PRODUCTS: Product[] = [
  { category: "camisetas", isNew: true, isPromo: false },
  { category: "camisetas", isNew: false, isPromo: true },
  { category: "bermudas", isNew: false, isPromo: false },
];

const HOME_CARDS: HomeCard[] = [
  { title: "Lançamentos 🔥", slug: "new", kind: "tag", tag: "new" },
  { title: "Promoções 🔥", slug: "promo", kind: "tag", tag: "promo" },
  { title: "Camisetas", slug: "camisetas", kind: "category" },
  { title: "Camisas", slug: "camisas", kind: "category" },
  { title: "Gola Polo", slug: "gola-polo", kind: "category" },
  { title: "Bermudas", slug: "bermudas", kind: "category" },
  { title: "Calças", slug: "calcas", kind: "category" },
  { title: "Shorts", slug: "shorts", kind: "category" },
  { title: "Cuecas", slug: "cuecas", kind: "category" },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6">
      {/* HERO */}
      <section className="mb-10">
        {/* mantém botões lado a lado no desktop e no mobile */}
        <div className="flex flex-col items-center text-center">
          <div className="text-sm opacity-70">Catálogo</div>
          <h1 className="mt-3 text-4xl font-bold">STORE OLIVER</h1>
          <p className="mt-1 opacity-70">Moda masculina com identidade</p>

          <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-md">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 font-semibold text-black"
            >
              <MessageCircle size={18} />
              Comprar no WhatsApp
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-white
                         bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5]"
            >
              <Instagram size={18} />
              Ver Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Categorias</h2>
        <p className="mt-2 text-sm sm:text-base opacity-70">
  Explore as categorias e encontre seu estilo.
</p>

<div className="mt-4 mb-6 h-px w-full bg-white/10"></div>

        {/* 2 colunas no celular, 3 no desktop */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {HOME_CARDS.map((card) => {
            const count =
              card.kind === "tag"
                ? PRODUCTS.filter((p) =>
                    card.tag === "new" ? p.isNew : p.isPromo
                  ).length
                : PRODUCTS.filter((p) => p.category === card.slug).length;

            const baseLink =
              card.kind === "tag"
                ? `/catalogo?tag=${card.slug}`
                : `/catalogo/${card.slug}`;

            return (
              <div
                key={`${card.kind}-${card.slug}`}
                className="group min-w-0 rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/30"
              >
                {/* topo do card: título + botão */}
<div className="flex items-center justify-between gap-3">
  {/* TÍTULO (1 linha, sem "...", reduz no celular) */}
  <div className="flex-1 min-w-0 pr-3 overflow-">
    <div className="font-semibold leading-tight whitespace-nowrap text-[clamp(0.78rem,3.2vw,1.125rem)]">
      {card.title}
    </div>
  </div>

  {/* BOTÃO (não encolhe e não quebra) */}
  <Link
    href={baseLink}
    className="shrink-0 whitespace-nowrap rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
  >
    Ver tudo
  </Link>
</div>

                <div className="mt-4 text-sm opacity-70">Filtrar por tamanho</div>

                {/* tamanhos */}
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {SIZES.map((size) => {
                    const href = `${baseLink}${
                      baseLink.includes("?") ? "&" : "?"
                    }size=${size}`;

                    return (
                      <Link
                        key={size}
                        href={href}
                        className="rounded-lg border border-white/15 px-2 py-1 text-center text-xs hover:bg-white/10"
                      >
                        {size}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* CTA FINAL */}
<section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
  <h3 className="text-xl sm:text-2xl font-semibold">
    Não encontrou o que procura?
  </h3>

  <p className="mt-2 text-sm sm:text-base opacity-80 max-w-2xl">
    Nossa equipe pode te mostrar mais modelos e tamanhos disponíveis. Fale conosco e
    receba atendimento direto no WhatsApp.
  </p>

  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noreferrer"
    className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-semibold text-black hover:opacity-90 transition"
  >
    <MessageCircle size={18} />
    Falar no WhatsApp
  </a>
</section>
{/* RODAPÉ */}
<footer className="mt-14 border-t border-white/10 py-10">
  <div className="mx-auto max-w-6xl px-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <div className="text-lg font-semibold">STORE OLIVER</div>
        <div className="mt-1 text-sm opacity-80">
          Moda masculina com identidade
        </div>
      </div>

      <div className="flex flex-row gap-3 w-full sm:w-auto">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3 font-semibold text-black hover:opacity-90 transition"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90 transition"
        >
          <Instagram size={18} />
          Instagram
        </a>
      </div>
    </div>
  </div>
</footer>
{/* WhatsApp flutuante */}
<a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110 active:scale-95 animate-whatsapp-pulse"
  aria-label="Falar no WhatsApp"
>
  <Phone size={26} />
</a>
    </main>
  );
}