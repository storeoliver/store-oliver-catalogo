import Image from "next/image";

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
    </main>
  );
} 