"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Users, Shield, Flame, Truck, ShoppingCart, ArrowRight, Zap, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ParticlesBackground, TextScramble, TiltCard, AnimatedGradientBorder, FloatingElements, GlowButton, MagneticText } from "@/components/effects";

const features = [
  {
    icon: Users,
    title: "Comunitate Activă",
    description: "Peste 1000+ membri activi zilnic pe serverul nostru de Discord și în joc.",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    icon: Shield,
    title: "Roleplay Serios",
    description: "Experiență autentică de roleplay cu reguli clare și staff profesionist.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Flame,
    title: "Evenimente Speciale",
    description: "Evenimente săptămânale cu premii și activități pentru toată comunitatea.",
    gradient: "from-orange-500 to-red-500",
  },
];

const factions = [
  {
    name: "Poliție",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    description: "Protejează și servește comunitatea",
    accent: "#3b82f6",
  },
  {
    name: "Pompieri",
    icon: Flame,
    color: "from-red-500 to-orange-500",
    description: "Răspunde la urgențe și salvează vieți",
    accent: "#ef4444",
  },
  {
    name: "DOT",
    icon: Truck,
    color: "from-yellow-500 to-amber-500",
    description: "Menține drumurile și gestionează transportul",
    accent: "#f59e0b",
  },
  {
    name: "Staff",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    description: "Administrează și modernează serverul",
    accent: "#a855f7",
  },
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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/50 to-black" />
        <ParticlesBackground />
        <FloatingElements count={8} />

        {/* Animated gradient orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
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
            {/* Badge with animation */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.6)" }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                <Zap className="w-4 h-4" />
              </motion.span>
              Server de Roleplay Roblox Greenville
            </motion.span>

            {/* Animated title */}
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]">
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                  style={{ backgroundSize: "200% auto" }}
                >
                  <TextScramble text="EUGVRP" delay={500} />
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle with magnetic effect */}
            <motion.p
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <MagneticText strength={0.1} className="font-semibold text-white/90">
                Elite Unite Greenville Roleplay
              </MagneticText>
            </motion.p>

            <motion.p
              className="text-lg text-white/50 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Europa Greenville Roleplay Community — Cel mai bun server de roleplay din România
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <GlowButton href="https://discord.gg/pEZEWVnNjV" external variant="primary">
                Intră pe Discord
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.span>
              </GlowButton>

              <motion.a
                href="#shop"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-6 text-lg rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Vezi Shop-ul
              </motion.a>
            </motion.div>

            {/* Stats with stagger animation */}
            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { value: "1000+", label: "Membri", icon: Users },
                { value: "24/7", label: "Online", icon: Zap },
                { value: "50+", label: "Sloturi", icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="flex justify-center mb-2"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-white/60 rounded-full"
              animate={{ opacity: [0.6, 1, 0.6], scaleY: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 relative">
        <FloatingElements count={4} colors={["#a855f7", "#3b82f6", "#ec4899"]} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4"
              whileHover={{ scale: 1.1 }}
            >
              De ce să ne alegi?
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <MagneticText strength={0.05}>De ce EUGVRP?</MagneticText>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Îți oferim cea mai bună experiență de roleplay pe Roblox Greenville
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <TiltCard key={feature.title} tiltAmount={8} glowColor={`rgba(${index === 0 ? "168, 85, 247" : index === 1 ? "59, 130, 246" : "249, 115, 22"}, 0.3)`}>
                <motion.div
                  variants={itemVariants}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 h-full"
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Factions Section */}
      <section id="apply" className="py-24 relative bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-4"
              whileHover={{ scale: 1.1 }}
            >
              Alătură-te echipei
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <MagneticText strength={0.05}>Facțiuni Disponibile</MagneticText>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Aplică pentru a face parte din una dintre facțiunile noastre profesioniste
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {factions.map((faction, index) => (
              <TiltCard key={faction.name} tiltAmount={10} glowColor={`${faction.accent}40`}>
                <motion.div
                  variants={itemVariants}
                  className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden h-full cursor-pointer"
                >
                  {/* Gradient background on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${faction.color}`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${faction.color} flex items-center justify-center mb-6 relative z-10`}
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <faction.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:${faction.color}">
                    {faction.name}
                  </h3>
                  <p className="text-white/60 mb-6 relative z-10">{faction.description}</p>

                  <Link
                    href={`/apply/${faction.name.toLowerCase()}`}
                    className="inline-flex items-center text-white/80 hover:text-white group/link relative z-10"
                  >
                    Aplică acum
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </motion.span>
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Shop Preview Section */}
      <section id="shop" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span
              className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-medium mb-4"
              whileHover={{ scale: 1.1 }}
            >
              Susține serverul
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <MagneticText strength={0.05}>Shop</MagneticText>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Achiziționează roluri exclusive și susține dezvoltarea serverului
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { name: "VIP", price: "10 RON", features: ["Acces la vehicule exclusive", "Tag Discord special", "Prioritate în queue"], popular: false, colors: ["#64748b", "#475569"] },
              { name: "VIP+", price: "25 RON", features: ["Toate beneficiile VIP", "Casă personală", "Custom plate", "Prioritate maximă"], popular: true, colors: ["#a855f7", "#3b82f6", "#ec4899", "#a855f7"] },
              { name: "Donator", price: "50 RON", features: ["Toate beneficiile VIP+", "Rol personalizat", "Acces beta funcții", "Support prioritar"], popular: false, colors: ["#f59e0b", "#d97706"] },
            ].map((plan, index) => (
              <motion.div key={plan.name} variants={itemVariants}>
                {plan.popular ? (
                  <AnimatedGradientBorder colors={plan.colors}>
                    <div className="p-8 rounded-2xl h-full flex flex-col">
                      <motion.span
                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Cel mai popular
                      </motion.span>

                      <h3 className="text-2xl font-bold text-white mb-2 mt-2">{plan.name}</h3>
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        {plan.price}
                      </div>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={feature}
                            className="flex items-center text-white/70"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.span
                              className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3"
                              whileHover={{ scale: 1.2, backgroundColor: "rgba(168,85,247,0.4)" }}
                            >
                              <Star className="w-3 h-3 text-purple-400" />
                            </motion.span>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      <GlowButton variant="primary" className="w-full">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cumpără acum
                      </GlowButton>
                    </div>
                  </AnimatedGradientBorder>
                ) : (
                  <TiltCard tiltAmount={5} glowColor={`${plan.colors[0]}40`}>
                    <div className={`p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-${plan.name === "VIP" ? "gray" : "amber"}-500/30 transition-all duration-300 h-full flex flex-col`}>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-white mb-6">{plan.price}</div>

                      <ul className="space-y-3 mb-8 flex-grow">
                        {plan.features.map((feature, i) => (
                          <motion.li
                            key={feature}
                            className="flex items-center text-white/70"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <motion.span
                              className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"
                              whileHover={{ scale: 2 }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className="w-full bg-white/10 hover:bg-white/20 text-white"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Cumpără acum
                        </Button>
                      </motion.div>
                    </div>
                  </TiltCard>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedGradientBorder colors={["#a855f7", "#3b82f6", "#ec4899", "#a855f7"]}>
            <motion.div
              className="relative p-12 rounded-2xl text-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Background particles */}
              <div className="absolute inset-0 opacity-30">
                <FloatingElements count={4} />
              </div>

              <div className="relative z-10">
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Gata să începi?
                </motion.h2>
                <motion.p
                  className="text-white/70 text-lg mb-8 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Alătură-te comunității noastre și trăiește cea mai bună experiență de roleplay pe Roblox Greenville
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <GlowButton href="https://discord.gg/pEZEWVnNjV" external variant="primary" className="px-10 py-5 text-xl">
                    Intră pe Discord acum
                    <motion.span
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.span>
                  </GlowButton>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedGradientBorder>
        </div>
      </section>
    </div>
  );
}
