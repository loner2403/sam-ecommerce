/* -----------------------------------------------------------------
   ModernHeader.tsx – Spectacular Dark Mode Header with Animations
------------------------------------------------------------------ */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  HomeIcon,
  CubeIcon,
  PhoneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/products", label: "Products", icon: CubeIcon },
  { href: "#contact", label: "Contact", icon: PhoneIcon },
  { href: "#about", label: "About", icon: SparklesIcon },
];

export default function ModernHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScroll] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScroll(window.scrollY > 50);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const headerV = {
    hidden: { y: -100, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        staggerChildren: 0.1
      } 
    },
  };

  const panelV = {
    hidden: { x: "100%", opacity: 0 },
    show: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        staggerChildren: 0.05
      } 
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
  };

  const itemV = {
    hidden: { x: 20, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  const searchV = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { 
      scaleX: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    },
    exit: { 
      scaleX: 0, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
  };

  return (
    <>
      <motion.header
        variants={headerV}
        initial="hidden"
        animate="show"
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled 
            ? "bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl" 
            : "bg-black/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <SparklesIcon className="w-6 h-6 text-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-white text-xl md:text-2xl font-bold tracking-tight">Segdi</span>
                <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">WALA</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l, i) => {
              const Icon = l.icon;
              return (
                <motion.div key={l.href} variants={itemV}>
                  <Link
                    href={l.href}
                    className="group relative px-4 py-2.5 rounded-xl text-gray-300 text-sm font-medium transition-all duration-300 hover:text-white flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {l.label}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      layoutId="navHover"
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    variants={searchV}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-64 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={() => setSearchOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-xl bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                2
              </motion.span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.aside
              variants={panelV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed right-0 top-0 z-[80] h-full w-80 bg-gray-900/95 backdrop-blur-xl border-l border-gray-800/50 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-800/50 p-6">
                <motion.div 
                  className="flex items-center gap-3"
                  variants={itemV}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white text-lg font-bold">Menu</span>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation */}
              <motion.nav 
                className="flex flex-col gap-2 p-6"
                variants={panelV}
              >
                {NAV_LINKS.map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <motion.div key={l.href} variants={itemV}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:text-white"
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        {l.label}
                        <motion.div
                          className="ml-auto w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Search */}
                <motion.div 
                  className="mt-6 space-y-3 border-t border-gray-800/50 pt-6"
                  variants={itemV}
                >
                  <motion.div
                    className="relative"
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-800 transition-all duration-300"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </motion.div>
                </motion.div>

                {/* Quick Links */}
                <motion.div 
                  className="mt-8 border-t border-gray-800/50 pt-8"
                  variants={itemV}
                >
                  <p className="px-4 mb-4 text-sm font-medium text-gray-400 uppercase tracking-wider">Quick Links</p>
                  <div className="space-y-2">
                    {[
                      { name: "Gas Burners", href: "/products" },
                      { name: "Installation", href: "#installation" },
                      { name: "Support", href: "#support" },
                      { name: "Warranty", href: "#warranty" }
                    ].map((item, i) => (
                      <motion.div key={item.name} variants={itemV}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center justify-between rounded-lg px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-gray-800/50 hover:text-white"
                        >
                          <span>{item.name}</span>
                          <motion.div
                            className="w-1 h-1 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div 
                  className="mt-8 px-4"
                  variants={itemV}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    onClick={() => setOpen(false)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10">Get Quote Now</span>
                  </motion.button>
                </motion.div>
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
