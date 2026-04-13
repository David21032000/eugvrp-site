import { prisma } from "@/lib/prisma";
import ApplicationTable from "./ApplicationTable";
import { LogoutButton } from "./LogoutButton";
import { Server, Users, Activity } from "lucide-react";

// Opțional: Revalidare pagina la fiecare 30 secunde
export const revalidate = 30;
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const applications = await prisma.factionApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pendingCount = applications.filter((app) => app.status === "pending").length;
  const acceptedCount = applications.filter((app) => app.status === "accepted").length;

  return (
    <div className="min-h-screen bg-[#0F0F23] pt-28 pb-12 font-sans selection:bg-violet-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-widest uppercase" style={{ fontFamily: "Chakra Petch, sans-serif" }}>
              COMMAND <span className="text-[#7C3AED]">CENTER</span>
            </h1>
            <p className="text-white/50 text-sm mt-1">EUGVRP Roleplay Server Admin System</p>
          </div>
          <div className="flex gap-3">
             <div className="px-4 py-2 bg-violet-900/20 border border-violet-500/30 rounded-lg flex items-center gap-2 text-violet-300">
               <Server className="w-4 h-4"/>
               <span className="text-xs uppercase tracking-wider font-bold">DB Active</span>
             </div>
             <LogoutButton />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#13122c] border border-violet-500/20 p-6 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-20 h-20"/></div>
             <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Total Aplicații</p>
             <h2 className="text-4xl font-black text-white">{applications.length}</h2>
          </div>
          <div className="bg-[#13122c] border border-amber-500/20 p-6 rounded-xl relative overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.05)]">
             <p className="text-amber-400/50 text-xs font-bold uppercase tracking-widest mb-1">În Așteptare</p>
             <h2 className="text-4xl font-black text-amber-400">{pendingCount}</h2>
          </div>
          <div className="bg-[#13122c] border border-emerald-500/20 p-6 rounded-xl relative overflow-hidden">
             <p className="text-emerald-400/50 text-xs font-bold uppercase tracking-widest mb-1">Aprobate</p>
             <h2 className="text-4xl font-black text-emerald-400">{acceptedCount}</h2>
          </div>
        </div>

        {/* Data Table */}
        <div className="mb-4">
          <h3 className="text-white font-bold tracking-wider uppercase mb-4 text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-400"/> Intrări Recente
          </h3>
          <ApplicationTable data={applications} />
        </div>

      </div>
    </div>
  );
}
