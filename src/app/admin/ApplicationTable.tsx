"use client";

import { useState } from "react";
import { Check, X, Clock, ShieldAlert } from "lucide-react";
import { acceptApplication, rejectApplication } from "./actions";

type Application = {
  id: string;
  discordUserId: string;
  faction: string;
  questions: string;
  status: string;
  createdAt: Date;
};

export default function ApplicationTable({ data }: { data: Application[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (id: string, action: "accept" | "reject") => {
    setLoadingId(id);
    if (action === "accept") {
      await acceptApplication(id);
    } else {
      await rejectApplication(id);
    }
    setLoadingId(null);
  };

  return (
    <div className="w-full bg-[#0a0a16] border border-violet-500/20 rounded-xl overflow-hidden text-[#E2E8F0]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-[#13122c] border-b border-violet-500/20 text-violet-300">
            <tr>
              <th className="px-6 py-4">Discord ID</th>
              <th className="px-6 py-4">Facțiune</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 w-1/3">Răspunsuri Principale</th>
              <th className="px-6 py-4 text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-white/40">
                  Nicio aplicație găsită.
                </td>
              </tr>
            ) : (
              data.map((app) => (
                <tr key={app.id} className="border-b border-violet-500/10 hover:bg-violet-900/10 transition-colors">
                  <td className="px-6 py-4 font-mono text-purple-400">{app.discordUserId}</td>
                  <td className="px-6 py-4 font-bold capitalize">{app.faction}</td>
                  <td className="px-6 py-4">
                    {app.status === "pending" && <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded"><Clock className="w-3 h-3"/> Pending</span>}
                    {app.status === "accepted" && <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded"><Check className="w-3 h-3"/> Accepted</span>}
                    {app.status === "rejected" && <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-400/10 px-2 py-1 rounded"><X className="w-3 h-3"/> Rejected</span>}
                  </td>
                  <td className="px-6 py-4 text-xs text-white/50">
                    <pre className="whitespace-pre-wrap max-h-20 overflow-y-auto font-sans">
                      {JSON.stringify(app.questions ? JSON.parse(app.questions) : {}, null, 2)}
                    </pre>
                  </td>
                  <td className="px-6 py-4">
                    {app.status === "pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleAction(app.id, "accept")}
                          disabled={loadingId === app.id}
                          className="px-3 py-1.5 rounded-md bg-[#7C3AED] hover:bg-violet-500 text-white transition-colors"
                        >
                          {loadingId === app.id ? "..." : "Accept"}
                        </button>
                        <button 
                          onClick={() => handleAction(app.id, "reject")}
                          disabled={loadingId === app.id}
                          className="px-3 py-1.5 rounded-md bg-[#F43F5E]/20 text-[#F43F5E] hover:bg-[#F43F5E]/30 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                       <div className="text-right text-white/30 text-xs">Arhivat</div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
