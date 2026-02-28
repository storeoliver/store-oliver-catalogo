import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "5538997316598"; // 55 + 38 + 99731-6598
const INSTAGRAM_URL = "https://instagram.com/loja_storeoliver";

function buildWhatsappLink() {
  const text = encodeURIComponent(
    "Olá! Vim pelo catálogo da STORE OLIVER. Quero ajuda para escolher uma peça."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export default function Home() {
  return (
    <>
<header className="w-full flex justify-between items-center p-6 border-b border-white/10 bg-black">
  <h2 className="text-xl font-semibold">Catálogo</h2>

  <nav className="flex gap-6 text-sm">
    <a href="/catalogo/camisetas" className="hover:text-green-400">Camisetas</a>
    <a href="/catalogo/camisas" className="hover:text-green-400">Camisas</a>
    <a href="/catalogo/bermudas" className="hover:text-green-400">Bermudas</a>
    <a href="/catalogo/shorts" className="hover:text-green-400">Shorts</a>
    <a href="/catalogo/cuecas" className="hover:text-green-400">Cuecas</a>
  </nav>
</header>
<main className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* LOGO MARCA D'ÁGUA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Image src="/brand/logo.jpeg" alt="logo" width={500} height={500} />
      </div>

      <div className="relative z-10 p-10">

        <h1 className="text-4xl font-bold mb-6">STORE OLIVER</h1>
        <p className="mb-8">Moda masculina com identidade</p>

        <div className="flex gap-4">
          <a
            href={buildWhatsappLink()}
            target="_blank"
            className="bg-green-500 text-black px-6 py-3 rounded-xl font-bold"
          >
            Comprar no WhatsApp
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            className="border border-white px-6 py-3 rounded-xl"
          >
            Ver Instagram
          </a>
        </div>

      </div>
      {/* CATEGORIAS */}
<section className="mt-16">
  <h2 className="text-2xl font-bold mb-6">Categorias</h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    
<Link href="/catalogo/camisetas" className="group relative rounded-2xl overflow-hidden border border-white/10">      <img src="/categorias/camisetas.jpeg" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"/>
      <span className="absolute bottom-3 left-3 font-semibold">Camisetas</span>
    </Link>

    <Link href="/catalogo/camisas" className="group relative rounded-2xl overflow-hidden border border-white/10">
      <img src="/categorias/camisas.jpeg" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"/>
      <span className="absolute bottom-3 left-3 font-semibold">Camisas</span>
    </Link>

    <Link href="/catalogo/bermudas" className="group relative rounded-2xl overflow-hidden border border-white/10">
      <img src="/categorias/bermudas.jpeg" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"/>
      <span className="absolute bottom-3 left-3 font-semibold">Bermudas</span>
    </Link>

    <Link href="/catalogo/shorts" className="group relative rounded-2xl overflow-hidden border border-white/10">
      <img src="/categorias/shorts.jpeg" className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition"/>
      <span className="absolute bottom-3 left-3 font-semibold">Shorts</span>
    </Link>

  </div>
</section>
<div className="mt-8">
  <Link
    href="/catalogo"
    className="inline-flex items-center justify-center rounded-2xl px-6 py-4 font-semibold bg-white text-black hover:opacity-90 transition"
  >
    Ver catálogo completo
  </Link>
</div>
    </main>
    </>
  );
} 