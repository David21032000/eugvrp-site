"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const questions = [
  { id: "roblox_username", label: "Username Roblox", type: "text", required: true },
  { id: "discord_tag", label: "Discord Tag (ex: Nume#1234)", type: "text", required: true },
  { id: "age", label: "Vârstă", type: "text", required: true },
  { id: "experience", label: "Ce experiență ai în moderare/administrare servere?", type: "textarea", required: true },
  { id: "why_staff", label: "De ce vrei să faci parte din Staff?", type: "textarea", required: true },
  { id: "scenario1", label: "Scenariu: Doi jucători se ceartă în chat. Cum procedezi?", type: "textarea", required: true },
  { id: "scenario2", label: "Scenariu: Un jucător acuză pe altul de cheat. Ce faci?", type: "textarea", required: true },
  { id: "activity", label: "Cât timp poți dedica activității pe server?", type: "text", required: true },
];

export default function StaffApplication() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    for (const q of questions) {
      if (q.required && !formData[q.id]?.trim()) {
        setError(`Te rugăm să completezi câmpul: ${q.label}`);
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discordUserId: formData.discord_tag || "unknown",
          discordUsername: formData.discord_tag || "unknown",
          faction: "staff",
          questions: formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("A apărut o eroare la trimiterea aplicației. Încearcă din nou.");
      }
    } catch (err) {
      setError("A apărut o eroare la trimiterea aplicației.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Aplicație trimisă cu succes!</h1>
            <p className="text-white/70 mb-6">
              Îți mulțumim pentru interes. Vom analiza aplicația ta și îți vom răspunde în cel mai scurt timp pe Discord.
            </p>
            <Button>
              <a href="/">Înapoi la pagina principală</a>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">Aplică pentru Staff</CardTitle>
              <CardDescription className="text-white/60">
                Completează formularul de mai jos pentru a aplica în echipa de Staff
              </CardDescription>
            </CardHeader>

            <CardContent>
              {error && (
                <div className="mb-4 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {questions.map((q, index) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      {q.label}
                      {q.required && <span className="text-red-400"> *</span>}
                    </label>
                    {q.type === "textarea" ? (
                      <Textarea
                        value={formData[q.id] || ""}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
                        required={q.required}
                      />
                    ) : (
                      <Input
                        type={q.type}
                        value={formData[q.id] || ""}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                        required={q.required}
                      />
                    )}
                  </motion.div>
                ))}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isSubmitting ? "Se trimite..." : "Trimite aplicația"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
