"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificăm dacă utilizatorul a acceptat cookie-urile
    const hasConsent = localStorage.getItem("eugvrp-cookie-consent");
    if (!hasConsent) {
      // Un mic delay pentru prezentare
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("eugvrp-cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:w-[400px] bg-gray-900 border border-purple-500/30 p-6 rounded-2xl shadow-2xl z-50 backdrop-blur-lg"
        >
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-purple-500/20 rounded-full flex-shrink-0">
              <Cookie className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold mb-1">Folosim Cookie-uri</h3>
              <p className="text-white/60 text-sm mb-4">
                Pentru a asigura buna funcționare a serverului nostru (Admin Panel, Login, Performanță), utilizăm date locale (strict necesare). Prin continuarea navigării ești de acord cu{" "}
                <Link href="/cookies" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
                  Politica Cookies
                </Link>.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={handleAccept}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  Am înțeles!
                </Button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-2 border border-white/10 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
