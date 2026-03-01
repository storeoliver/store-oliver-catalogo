import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { MessageCircle, Instagram } from "lucide-react";

const SIZES = ["P","M","G","GG"] as const;
const WHATSAPP_NUMBER = "5538997316598";
const INSTAGRAM_URL = "https://instagram.com/loja_storeoliver";

function buildWhatsappLink() {
  const text = encodeURIComponent(
    "Olá! Vim pelo catálogo da STORE OLIVER. Quero ajuda para escolher uma peça."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function Home() {

  const HOME_CARDS = [
    { kind: "tag", slug: "lancamentos", label: "Lançamentos 🔥", tag: "new" as const },
    { kind: "tag", slug: "promocoes", label: "Promoções 🔥", tag: "promo" as const },
    { kind: "cat", slug: "camisetas", label: "Camisetas" },
    { kind: "cat", slug: "camisas", label: "Camisas" },
    { kind: "cat", slug: "polos", label: "Gola Polo" },
    { kind: "cat", slug: "bermudas", label: "Bermudas" },
    { kind: "cat", slug: "calcas", label: "Calças" },
    { kind: "cat", slug: "shorts", label: "Shorts" },
    { kind: "cat", slug: "cuecas", label: "Cuecas" },
  ] as const;

  return (
    <>
      <header className="w-full flex justify-between items-center p-6 border-b border-white/10 bg-black">
        <h2 className="text-xl font-semibold">Catálogo</h2>
      </header>

      <main className="min-h-screen bg-black text-white relative overflow-hidden">

        {/* LOGO MARCA D'ÁGUA */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image src="/brand/logo.jpeg" alt="logo" width={500} height={500} />
        </div>

        <div className="relative z-10 p-10">

          {/* HERO */}
          <h1 className="text-4xl font-bold mb-2">STORE OLIVER</h1>
          <p className="mb-8 opacity-80">Moda masculina com identidade</p>

          <div className="flex gap-4">
  <a
    href={buildWhatsappLink()}
    target="_blank"
    className="inline-flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
  >
    <MessageCircle className="h-5 w-5" />
    <span>Comprar no WhatsApp</span>
  </a>

  <a
    href={INSTAGRAM_URL}
    target="_blank"
    className="inline-flex items-center gap-2 border border-white px-6 py-3 rounded-xl"
  >
    <Instagram className="h-5 w-5" />
    <span>Ver Instagram</span>
  </a>
</div>

          {/* CATEGORIAS COM CARDS DO CATÁLOGO */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Categorias</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {HOME_CARDS.map((card) => {

                let count = 0;

                if (card.kind === "tag") {
                  count = PRODUCTS.filter((p) =>
                    card.tag === "new" ? p.isNew : p.isPromo
                  ).length;
                } else {
                  count = PRODUCTS.filter((p) => p.category === card.slug).length;
                }

                const baseLink =
                  card.kind === "tag"
                    ? `/catalogo?tag=${card.slug}`
                    : `/catalogo/${card.slug}`;

                return (
                  <div
                    key={card.slug}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-lg font-semibold">{card.label}</div>
                        <div className="text-sm opacity-70 mt-1">
                          {count} produto(s)
                        </div>
                      </div>

                      <Link
                        href={baseLink}
                        className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10 transition"
                      >
                        Ver tudo
                      </Link>
                    </div>

                    <div className="mt-4 text-sm opacity-70">
                      Filtrar por tamanho
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <Link
                          key={size}
                          href={`${baseLink}?size=${size}`}
                          className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10 transition"
                        >
                          {size}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}