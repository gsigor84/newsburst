"use client";
import React from "react";
import Link from "next/link";
import { Globe, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-nav text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Left Side - Logo or Brand */}
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-light-blue" />
          <span className="text-lg font-semibold">NewsBurst</span>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-teal transition">About</Link>
          <Link href="/contact" className="hover:text-teal transition">Contact</Link>
          <Link href="/privacy" className="hover:text-teal transition">Privacy</Link>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={20} className="hover:text-light-blue transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={20} className="hover:text-light-blue transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram size={20} className="hover:text-light-blue transition" />
          </a>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs text-gray-400 mt-4">
        © {new Date().getFullYear()} NewsBurst. All Rights Reserved.
      </div>
    </footer>
  );
}
