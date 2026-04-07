"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { TiltCard, FloatingElements } from "@/components/effects";

const questions = [
  { id: "roblox_username", label: "Username Roblox", type: "text", required: true },
  { id: "discord_tag", label: "Discord Tag (ex: Nume#1234)", type: "text", required: true },
  { id: "age", label: "Vârstă", type: "text", required: true },
  { id: "experience", label: "Ce experiență ai în roleplay?", type: "textarea", required: true },
  { id: "why_police", label: "De ce vrei să faci parte din Poliție?", type: "textarea", required: true },
  { id: "scenario1", label: "Scenariu: Vezi un jucător care încalcă regulile în mod grav. Ce faci?", type: "textarea", required: true },
  { id: "activity", label: "Cât timp poți dedica activității pe server?", type: "text", required: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function PoliceApplication() {
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

    // Validate required fields
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
          faction: "police",
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
      <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
        <FloatingElements count={6} colors={["#3b82f6", "#06b6d4", "#a855f7"]} />
        <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">Aplicație trimisă cu succes!</h1>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Îți mulțumim pentru interes. Vom analiza aplicația ta și îți vom răspunde în cel mai scurt timp pe Discord.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Înapoi la pagina principală
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 relative">
      <FloatingElements count={5} colors={["#3b82f6", "#06b6d4"]} />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Înapoi
          </Link>

          <TiltCard tiltAmount={3} glowColor="rgba(59, 130, 246, 0.2)">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-center mb-8">
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Shield className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-2">Aplică pentru Poliție</h1>
                <p className="text-white/60">
                  Completează formularul de mai jos pentru a aplica în Departamentul de Poliție
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200"
                >
                  {error}
                </motion.div>
              )}

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {questions.map((q, index) => (
                  <motion.div key={q.id} variants={itemVariants}>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      {q.label}
                      {q.required && <span className="text-red-400"> *</span>}
                    </label>
                    {q.type === "textarea" ? (
                      <Textarea
                        value={formData[q.id] || ""}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px] focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                        required={q.required}
                      />
                    ) : (
                      <Input
                        type={q.type}
                        value={formData[q.id] || ""}
                        onChange={(e) => handleChange(q.id, e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                        required={q.required}
                      />
                    )}
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                    <span className="relative flex items-center justify-center">
                      <Send className="w-5 h-5 mr-2" />
                      {isSubmitting ? "Se trimite..." : "Trimite aplicația"}
                    </span>
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </div>
  );
}
