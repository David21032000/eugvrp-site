"use client";

import Link from "next/link";
import { Disc, Heart, ExternalLink, Zap, Shield, Flame, Truck, Crown } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { name: "Discord", href: "https://discord.gg/pEZEWVnNjV", icon: Disc },
];

const quickLinks = [
  { name: "Acasă", href: "/", icon: Crown },
  { name: "Shop", href: "#shop", icon: Zap },
  { name: "Aplică", href: "#apply", icon: Shield },
];

const factions = [
  { name: "Poliție", icon: Shield, color: "from-blue-500 to-cyan-500" },
  { name: "Pompieri", icon: Flame, color: "from-red-500 to-orange-500" },
  { name: "DOT", icon: Truck, color: "from-yellow-500 to-amber-500" },
  { name: "Staff", icon: Crown, color: "from-purple-500 to-pink-500" },
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

export function Footer() {
  return (
    <footer className="relative bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-hidden">
      {/* Animated gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, #a855f7, #3b82f6, #ec4899, #a855f7)",
          backgroundSize: "300% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4 lg:col-span-1">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-md"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative text-white font-bold text-xl">E</span>
              </motion.div>
              <div>
                <span className="text-white font-bold text-xl">EUGVRP</span>
                <div className="text-white/50 text-xs">Europa Greenville Roleplay</div>
              </div>
            </motion.div>
            <p className="text-white/60 text-sm leading-relaxed">
              Server de roleplay Roblox Greenville. Comunitate românească pasionată de roleplay de calitate.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Link-uri Rapide
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-white/60 hover:text-white transition-colors"
                  >
                    <motion.span
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mr-3 group-hover:bg-purple-500/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <link.icon className="w-4 h-4 text-purple-400" />
                    </motion.span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Factions */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Facțiuni
            </h3>
            <ul className="space-y-3">
              {factions.map((faction) => (
                <motion.li
                  key={faction.name}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <Link
                    href={`/apply/${faction.name.toLowerCase()}`}
                    className="flex items-center text-white/60 hover:text-white transition-colors"
                  >
                    <motion.span
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${faction.color} flex items-center justify-center mr-3`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <faction.icon className="w-4 h-4 text-white" />
                    </motion.span>
                    <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                      {faction.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4 text-purple-400" />
              Alătură-te
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Intră pe Discord și fii parte din cea mai tare comunitate de roleplay din România.
            </p>
            <motion.a
              href="https://discord.gg/pEZEWVnNjV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Disc className="w-5 h-5 group-hover:animate-pulse" />
              <span>Intră pe Discord</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.p
            className="text-white/40 text-sm flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            © 2025 EUGVRP. Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" />
            </motion.span>
            pentru comunitate
          </motion.p>

          <motion.a
            href="https://discord.gg/pEZEWVnNjV"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Disc className="w-4 h-4" />
            <span>discord.gg/eugvrp</span>
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
}
