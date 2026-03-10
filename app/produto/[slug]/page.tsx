import { notFound } from "next/navigation";
import { getProducts } from "@/data/catalog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Produto({ params }: PageProps) {
  const { slug } = await params;
const slugDecodificado = decodeURIComponent(slug);

const products = getProducts();
const produto = products.find((p) => p.sku === slugDecodificado);
const index = products.findIndex((p) => p.sku === slugDecodificado);

const prev = index > 0 ? products[index - 1] : null
const next = index < products.length - 1 ? products[index + 1] : null

  if (!produto) {
    notFound();
  }

  const whatsappHref = `https://wa.me/5538997316598?text=${encodeURIComponent(
    `Olá, tenho interesse no produto ${produto.sku}`
  )}`;

  return (
    <main className="h-screen bg-black px-4 py-3 text-white flex flex-col items-center justify-center">
        <a
  href={`/catalogo/${produto.category}`}
  className="absolute top-4 left-4 text-sm text-white opacity-70 hover:opacity-100"
>
  ← Voltar
</a>
      <h1 className="mb-2 text-xl font-semibold text-center">{produto.name}</h1>
<p className="mb-2 text-xs opacity-60">Código: {produto.sku}</p>

      <img
        src={produto.image}
        alt={produto.sku}
        className="mb-2 w-full max-w-[220px] md:max-w-[240px] rounded-xl"
      />

      <p className="mb-1 text-sm">Categoria: {produto.category}</p>

      <p className="mb-1 text-sm">
        Tamanhos disponíveis: {produto.sizes.join(", ")}
      </p>

      <p className="mb-2 text-sm">Consulte preço</p>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-xl bg-[#25D366] px-6 py-2 font-semibold text-black mt-2"
      >
        Comprar no WhatsApp
        </a>
        
        <div className="flex gap-6 mt-6 text-sm">

  {prev && (
    <a
      href={`/produto/${encodeURIComponent(prev.sku)}`}
      className="text-white opacity-70 hover:opacity-100"
    >
      ← Produto anterior
    </a>
  )}

  {next && (
    <a
      href={`/produto/${encodeURIComponent(next.sku)}`}
      className="text-white opacity-70 hover:opacity-100"
    >
      Próximo produto →
    </a>
  )}

</div>
    </main>
  );
}