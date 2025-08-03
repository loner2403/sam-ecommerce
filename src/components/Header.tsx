/* -----------------------------------------------------------------
   Header.tsx  –  React / Next 13+  |  Tailwind 3.x  |  Framer-motion
------------------------------------------------------------------ */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

/* ------------- data ---------------- */
const NAV_LINKS = [
  { href: "#docs", label: "Docs" },
  { href: "#guides", label: "Guides" },
  { href: "#skills", label: "Get the skills" },
];

/* ------------- component ------------ */
export default function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScroll] = useState(false);

  /* shadow / blur after scroll --------------------------------- */
  useEffect(() => {
    const handler = () => setScroll(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* lock body while off-canvas is open ------------------------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  /* ESC to close ------------------------------------------------ */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  /* ---------- framer variants --------------------------------- */
  const headerV = {
    hidden : { y: -80 },
    show   : { y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
  };

  const panelV = {
    hidden : { x: "100%" },
    show   : { x: 0, transition: { type: "spring", stiffness: 260, damping: 30 } },
    exit   : { x: "100%", transition: { type: "spring", stiffness: 260, damping: 30 } },
  };

  /* ---------- markup ------------------------------------------ */
  return (
    <>
      {/* TOP BAR */}
      <motion.header
        variants={headerV}
        initial="hidden"
        animate="show"
        className={`fixed inset-x-0 top-0 z-[60] backdrop-blur-md transition-all
                    ${scrolled ? "bg-black/90 border-b border-gray-800" : "bg-black/60"}`}
      >
        <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* logo */}
          <a href="/" className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white text-xl md:text-2xl font-normal">Segdi</span>
              <span className="bg-green-400 text-black px-2 py-0.5 rounded text-sm font-bold uppercase">WALA</span>
            </motion.div>
          </a>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full bg-gray-800/50 text-gray-300 text-sm font-medium transition-all hover:bg-gray-700/50 hover:text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {l.label}
              </motion.a>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-4 py-2 rounded-full bg-gray-800/50 text-gray-300 text-sm font-medium transition-all hover:bg-gray-700/50 hover:text-white flex items-center gap-2"
            >
              Search
              <span className="bg-green-400 text-black px-1.5 py-0.5 rounded text-xs font-bold">/</span>
            </motion.button>
          </nav>

          {/* mobile menu button */}
          <button
            onClick={() => setOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="relative z-[70] rounded-lg p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </motion.header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[65] bg-black/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* panel */}
            <motion.aside
              key="panel"
              variants={panelV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm overflow-y-auto bg-neutral-900 shadow-xl md:hidden"
            >
              <div className="flex h-14 items-center justify-between px-4">
                <span className="text-white text-lg font-normal">centra</span>
                <button 
                  onClick={() => setOpen(false)} 
                  aria-label="Close menu" 
                  className="rounded-lg p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <nav className="space-y-1 px-4 pb-8 pt-4">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
                  >
                    {l.label}
                  </motion.a>
                ))}

                <div className="mt-6 space-y-3 border-t border-gray-800 pt-6">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-gray-800 px-4 py-3 text-left font-medium text-gray-300 transition-all hover:bg-gray-700 hover:text-white flex items-center justify-between"
                    onClick={() => setOpen(false)}
                  >
                    <span>Search</span>
                    <span className="bg-green-400 text-black px-1.5 py-0.5 rounded text-xs font-bold">/</span>
                  </motion.button>
                </div>

                {/* Additional Links */}
                <div className="mt-8 border-t border-gray-800 pt-8">
                  <p className="px-4 mb-4 text-sm text-gray-500">Resources</p>
                  <div className="space-y-1">
                    {["Documentation", "API Reference", "Community", "Support"].map((item, i) => (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-400 transition-all hover:bg-gray-800 hover:text-white"
                      >
                        {item}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 px-4">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-lg hover:bg-blue-600 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </motion.button>
                </div>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* -----------------------------------------------------------------
   tiny helpers
------------------------------------------------------------------ */
function IconBtn({
  label,
  children,
  badge,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-full bg-gray-800 p-2.5 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
      aria-label={label}
    >
      {children}
      {badge && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-blue-500 text-[11px] font-bold text-white"
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  );
}

function UtilityBtn({
  icon,
  children,
  badge,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-gray-300 transition-all hover:bg-gray-800 hover:text-white"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{children}</span>
      </div>
      {badge && (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-500 text-xs font-bold text-white">
          {badge}
        </span>
      )}
    </motion.button>
  );
}