import { MagneticText } from "@/components/effects";
import { Shield } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-10 h-10 text-purple-500" />
          <h1 className="text-4xl font-bold">
            <MagneticText strength={0.05}>Termeni și Condiții</MagneticText>
          </h1>
        </div>
        
        <div className="prose prose-invert max-w-none text-white/80 space-y-6">
          <p>
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptarea termenilor</h2>
          <p>
            Prin accesarea site-ului EUGVRP și prin conectarea pe serverele noastre de Discord asociate experienței Roblox Greenville, sunteți de acord să respectați acești Termeni și Condiții de Utilizare. Site-ul este un proiect comunitar, non-comercial.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Reguli și Conduită</h2>
          <p>
            Comunitatea noastră impune o conduită respectuoasă. Ne rezervăm dreptul de a suspenda sau de a interzice pe platformele EUGVRP orice persoană care are un comportament dăunător sau abuziv.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Politica pentru Donații și Pachete VIP</h2>
          <p>
            Toate "achizițiile" sub forma pachetelor VIP, SuperM sau Patron reprezintă <strong>Donații voluntare</strong> destinate întreținerii platformei:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Donațiile sunt finale și nerambursabile (No Refund Policy).</li>
            <li>Donațiile nu pre-garantează imunitate în fața încălcării regulamentului serverului de Roblox. Veți fi tratat în continuare ca orice membru obișnuit în caz de sancțiuni.</li>
            <li>Revenirea fondurilor de pe card/Revolut după validarea tranzacției implică interzicerea definitivă.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Informații de Contact</h2>
          <p>
            Dacă aveți probleme legale sau legate de contul dvs., vă rugăm să ne contactați deschizând un bilet de suport pe serverul oficial de Discord.
          </p>
        </div>
      </div>
    </div>
  );
}
