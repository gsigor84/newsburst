"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0); // ✅ UseRef to track scroll position

  // Track Scroll Direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }
      lastScrollY.current = window.scrollY; // ✅ Correctly update the ref value
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className={` backdrop-blur-md text-nav py-2 px-4 shadow-lg fixed top-0 left-0 w-[calc(100%-1rem)] mx-2 z-50 rounded-2xl transition-all duration-300 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* ✅ Logo - Globe Icon + NewsBurst Text */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-nav">
              <Globe size={24} strokeWidth={2.5} />
            </div>
            <span className="text-nav font-bold text-lg tracking-wide">NewsBurst</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-teal transition">Home</Link>
            <Link href="/asia" className="hover:text-teal transition">Asia</Link>
            <Link href="/israel" className="hover:text-teal transition">Israel</Link>
            <Link href="/blog" className="hover:text-teal transition">Blog</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-nav focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay with Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Start hidden & slightly above
            animate={{ opacity: 1, y: 0 }} // Animate to visible
            exit={{ opacity: 0, y: 20 }} // Exit with fade & slide down
            transition={{ duration: 0.3, ease: "easeOut" }} // Smooth transition
            className="fixed inset-0 bg-dark-blue flex flex-col items-center justify-center z-50"
          >
            {/* Close Button */}
            <button
              className="absolute top-5 right-5 text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={36} />
            </button>

            {/* Menu Links */}
            <div className="flex flex-col items-center gap-6 text-4xl sm:text-5xl font-headline font-bold text-white">
              <Link href="/" className="hover:text-teal transition" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/asia" className="hover:text-teal transition" onClick={() => setIsOpen(false)}>Asia</Link>
              <Link href="/israel" className="hover:text-teal transition" onClick={() => setIsOpen(false)}>Israel</Link>
              <Link href="/blog" className="hover:text-teal transition" onClick={() => setIsOpen(false)}>Blog</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
