import { MagneticText } from "@/components/effects";
import { Lock } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Lock className="w-10 h-10 text-blue-500" />
          <h1 className="text-4xl font-bold">
            <MagneticText strength={0.05}>Politica de Confidențialitate</MagneticText>
          </h1>
        </div>
        
        <div className="prose prose-invert max-w-none text-white/80 space-y-6">
          <p>
            Vă respectăm dreptul la confidențialitate și ne aliniem principiilor GDPR referitoare la protecția datelor. Această platformă este creată pentru comunitatea EUGVRP.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Ce date colectăm?</h2>
          <p>
            Când interacționați cu site-ul nostru, aplicând la facțiuni sau utilizând comanda Discord, extragem strict informații menite corelării contului de Roblox cu cel de Discord:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Numele dvs. de utilizator Roblox și ID-ul aferent API-ului Roblox.</li>
            <li>Numele de Discord, inclusiv identificatorul unic (Discord ID).</li>
            <li>Informațiile completate voluntar prin intermediul formularelor (ex. aplicații de departament).</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">La ce le folosim?</h2>
          <p>
            Datele sunt stocate temporar/permanent cu unicul scop:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Acordare de grade automate (bot Discord) și validarea Gamepass-urilor.</li>
            <li>Evaluarea dosarelor pentru recrutări în Poliție/Staff.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">Dreptul de Preluare / Ștergere</h2>
          <p>
            Aici, ca individ fizic sau entitate comunitară ne rezervăm dreptul să stocăm aceste identificatoare exclusiv pentru buna functionare, fără a le livra terților comerciali. Puteți solicita oricând o excludere a aplicației voastre prin cerere pe Ticket Discord.
          </p>
        </div>
      </div>
    </div>
  );
}
