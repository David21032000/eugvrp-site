import { MagneticText } from "@/components/effects";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Cookie className="w-10 h-10 text-orange-500" />
          <h1 className="text-4xl font-bold">
            <MagneticText strength={0.05}>Politica de Cookie-uri</MagneticText>
          </h1>
        </div>
        
        <div className="prose prose-invert max-w-none text-white/80 space-y-6">
          <p>
            Vrem să fim absolut transparenți despre modul în care utilizăm Cookie-urile pe platforma serverului de joc.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Ce sunt cookie-urile?</h2>
          <p>
            Un cookie este un fișier text de mici dimensiuni, pe care un site îl salvează pe calculatorul sau dispozitivul dumneavoastră mobil direct din browser.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Ce tip de cookie-uri folosim?</h2>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Strict Necesare:</strong> Fără aceste cookie-uri, platforma noastră nu poate recunoaște sesiunea dacă sunteți logați (pe viitorul panou de Admin) și pentru acordul bannerului de jos (`eugvrp-cookie-consent`).</li>
            <li><strong>Performanță (sau Vercel Analytics):</strong> Poate exista trafic anonimizat ce ne ajută să știm câți jucători vizitează site-ul pe zi.</li>
          </ul>

          <p className="mt-8">Puteți alege opțiunea de "Clear Cookies" din Browserul dumneavoastră personal pentru a ne reseta instanța.</p>
        </div>
      </div>
    </div>
  );
}
