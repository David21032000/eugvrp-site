"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Shield,
  Users,
  Zap,
  Star,
  Award,
  MessageCircle,
  Ban,
  Wrench,
  Mic,
} from "lucide-react";
import { TiltCard, FloatingElements, MagneticText } from "@/components/effects";
import Image from "next/image";

const staffHierarchy = [
  {
    tier: "leadership",
    title: "Leadership",
    icon: Crown,
    color: "from-amber-500 to-yellow-500",
    description: "Fondatorii și dezvoltatorii serverului",
  },
  {
    tier: "management",
    title: "Management",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    description: "Administratori responsabili de buna funcționare",
  },
  {
    tier: "moderators",
    title: "Moderatori",
    icon: Ban,
    color: "from-red-500 to-orange-500",
    description: "Echipa de moderare și aplicare a regulilor",
  },
  {
    tier: "support",
    title: "Support",
    icon: MessageCircle,
    color: "from-blue-500 to-cyan-500",
    description: "Asistență pentru jucători și rezolvare tickete",
  },
  {
    tier: "developers",
    title: "Dezvoltatori",
    icon: Wrench,
    color: "from-emerald-500 to-green-500",
    description: "Dezvoltatori Roblox, scripturi și sisteme",
  },
  {
    tier: "sessionhosts",
    title: "Session Hosts",
    icon: Mic,
    color: "from-pink-500 to-rose-500",
    description: "Găzduiesc și organizează sesiunile RP",
  },
];

const staffMembers = [
  {
    name: "FounderName",
    role: "Fondator",
    tier: "leadership",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    joined: "2023",
    quote: "Construim cea mai bună comunitate de RP din România",
  },
  {
    name: "CoFounderName",
    role: "Co-Fondator",
    tier: "leadership",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    joined: "2023",
    quote: "Pasiunea pentru roleplay ne unește",
  },
  {
    name: "HeadAdmin",
    role: "Head Administrator",
    tier: "management",
    avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
    joined: "2023",
    quote: "Experiența jucătorilor este prioritatea noastră",
  },
  {
    name: "Admin1",
    role: "Administrator",
    tier: "management",
    avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
    joined: "2024",
    quote: "Aici pentru a ajuta comunitatea să crească",
  },
  {
    name: "SeniorMod",
    role: "Senior Moderator",
    tier: "moderators",
    avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
    joined: "2024",
    quote: "Respectă regulile și distrează-te!",
  },
  {
    name: "Moderator1",
    role: "Moderator",
    tier: "moderators",
    avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
    joined: "2024",
  },
  {
    name: "Support1",
    role: "Support Staff",
    tier: "support",
    avatar: "https://cdn.discordapp.com/embed/avatars/1.png",
    joined: "2024",
  },
  {
    name: "Dev1",
    role: "Lead Developer",
    tier: "developers",
    avatar: "https://cdn.discordapp.com/embed/avatars/2.png",
    joined: "2023",
    quote: "Inovație și stabilitate în fiecare update",
  },
  {
    name: "Host1",
    role: "Session Host",
    tier: "sessionhosts",
    avatar: "https://cdn.discordapp.com/embed/avatars/3.png",
    joined: "2024",
  },
  {
    name: "Host2",
    role: "Session Host",
    tier: "sessionhosts",
    avatar: "https://cdn.discordapp.com/embed/avatars/4.png",
    joined: "2024",
  },
];

const stats = [
  { value: "15+", label: "Membri Staff", icon: Users },
  { value: "24/7", label: "Acoperire", icon: Shield },
  { value: "<2h", label: "Timp Răspuns", icon: Zap },
  { value: "99%", label: "Satisfacție", icon: Star },
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
  hidden: { opacity: 0, y: 30 },
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

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/50 to-black" />
        <FloatingElements count={6} colors={["#a855f7", "#f59e0b", "#ec4899"]} />

        {/* Animated background orb */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.2) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-medium mb-6 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Crown className="w-4 h-4" />
              Echipa Noastră
            </motion.span>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <MagneticText strength={0.05}>Meet the Team</MagneticText>
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/60 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Oamenii pasionați care fac EUGVRP posibil în fiecare zi
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="flex justify-center mb-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-8 h-8 text-amber-400" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hierarchy Cards */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <MagneticText strength={0.05}>Ierarhia Staff-ului</MagneticText>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Fiecare rol are responsabilități specifice pentru a asigura cea mai bună experiență
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {staffHierarchy.map((tier, index) => (
              <motion.div
                key={tier.tier}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <tier.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.title}</h3>
                  <p className="text-white/60 text-sm">{tier.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Staff Members Grid */}
      <section className="py-16 relative bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {staffHierarchy.map((tier) => {
            const members = staffMembers.filter((m) => m.tier === tier.tier);
            if (members.length === 0) return null;

            return (
              <div key={tier.tier} className="mb-16 last:mb-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center`}
                  >
                    <tier.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{tier.title}</h2>
                    <p className="text-white/60 text-sm">
                      {members.length} membru{members.length !== 1 ? "i" : ""}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {members.map((member) => (
                    <motion.div key={member.name} variants={itemVariants}>
                      <TiltCard
                        tiltAmount={8}
                        glowColor={`${tier.color.includes("amber") ? "rgba(245,158,11,0.3)" : tier.color.includes("purple") ? "rgba(168,85,247,0.3)" : tier.color.includes("red") ? "rgba(239,68,68,0.3)" : tier.color.includes("blue") ? "rgba(59,130,246,0.3)" : tier.color.includes("emerald") ? "rgba(16,185,129,0.3)" : "rgba(236,72,153,0.3)"}`}
                      >
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 h-full">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              className="relative w-16 h-16"
                              whileHover={{ scale: 1.1 }}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${tier.color} rounded-full blur-md opacity-50`}
                              />
                              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden border-2 border-white/20">
                                <Image
                                  src={member.avatar}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                                {member.name}
                              </h3>
                              <span
                                className={`text-sm font-medium bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}
                              >
                                {member.role}
                              </span>
                            </div>
                          </div>

                          {member.quote && (
                            <p className="text-white/50 text-sm italic mb-4">
                              &ldquo;{member.quote}&rdquo;
                            </p>
                          )}

                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Award className="w-3 h-3" />
                            <span>Membru din {member.joined}</span>
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Join Staff CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-black border border-white/10 overflow-hidden text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background effect */}
            <div className="absolute inset-0">
              <FloatingElements count={4} colors={["#a855f7", "#3b82f6"]} />
            </div>

            <div className="relative z-10">
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Vrei să faci parte din echipă?
              </motion.h2>

              <motion.p
                className="text-white/70 text-lg mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Suntem mereu în căutare de oameni pasionați care vor să contribuie la dezvoltarea comunității
              </motion.p>

              <motion.a
                href="/apply/staff"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Shield className="w-5 h-5 mr-2" />
                Aplică pentru Staff
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
