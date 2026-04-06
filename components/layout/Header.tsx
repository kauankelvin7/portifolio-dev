"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ButtonMenu } from "../ui/ButtonMenu";
import CreativeBackground from "../ui/CreativeBackground";
import { useTransition } from "@/app/context/TransitionContext";
import { LanguageToggle } from "../LanguageToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { startTransition } = useTransition();
  const t = useTranslations("Nav");
  
  // High-performance Scroll Spy
  const activeSection = useActiveSection(["home", "about", "work", "stack", "contact"]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; }
  }, [isOpen]);

  const handleNavigation = async (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    await startTransition(href);
  };

  const navLinks = [
    { href: "/", label: t('home'), id: "home" },
    { href: "/#about", label: t('about'), id: "about" },
    { href: "/#work", label: t('projects'), id: "work" },
    { href: "/#contact", label: t('contact'), id: "contact" }
  ];

  return (
    <header 
      className="sticky top-0 left-0 w-full z-100 pointer-events-auto"
      style={{
        background: 'rgba(12, 11, 9, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1a1815'
      }}
    >
      <div className="w-full mx-auto flex items-center justify-between px-6 py-4 relative">
        
        <Link
          href="/"
          onClick={(e) => handleNavigation(e, '/')}
          className="relative pointer-events-auto group flex items-center"
        >
          <motion.span 
            className="inline-block"
            whileHover={{ 
              letterSpacing: "0.25em",
              color: "#e5591d",
              transition: { duration: 0.4, ease: "circOut" }
            }}
            style={{
              fontWeight: 900,
              letterSpacing: "0.12em",
              fontSize: "12px",
              color: "#ffffff",
              textTransform: "uppercase",
              cursor: "pointer"
            }}
          >
            Kauan Kelvin
          </motion.span>
        </Link>

        <nav className="relative flex items-center gap-10">
          <div className="hidden md:flex items-center gap-10 mr-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'home' && activeSection === "");
              
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="relative group transition-colors duration-300"
                  style={{
                    fontSize: "11px",
                    color: isActive ? "#ffffff" : "#444444",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: isActive ? 900 : 500,
                    fontFamily: "var(--font-display)"
                  }}
                >
                  {link.label}
                  
                  {/* Sliding Underline Effect */}
                  <span 
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-brand-orange transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                  
                  {/* Active Dot */}
                  {isActive && (
                    <span 
                      className="absolute -right-2 top-0 w-1 h-1 rounded-full bg-brand-orange shadow-[0_0_8px_#e5591d]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-6">
            <LanguageToggle />
            
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex h-5 w-8 cursor-pointer flex-col items-center justify-between pointer-events-auto transition-transform hover:scale-110 active:scale-95"
              aria-label="Toggle menu"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <ButtonMenu isOpen={isOpen} isHovered={isHovered} />
            </button>
          </div>
          
          {isOpen && createPortal(
            <div className="fixed inset-0 z-1000 bg-transparent flex flex-col items-center justify-center space-y-4 text-4xl font-bold text-white transition-all duration-500 animate-in fade-in pointer-events-auto">
              
              <CreativeBackground />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 cursor-pointer transition-all duration-300 hover:text-brand-orange hover:rotate-90 z-50 p-2"
              >
                <X size={36} />
              </button>
              
              <div className="flex flex-col items-center gap-12 z-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className="text-6xl font-display font-extrabold transition-all duration-300 hover:text-brand-orange hover:italic hover:tracking-widest cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <footer className="absolute inset-x-0 bottom-0 px-8 pb-10 md:px-12 z-10">
                <div className="flex w-full flex-col items-start space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="font-mono text-xs tracking-widest uppercase text-[#333333]">
                    ©2026 TODOS OS DIREITOS RESERVADOS
                  </div>

                  <div className="flex flex-col items-start space-y-4 text-xs font-mono uppercase tracking-widest text-[#666666] md:flex-row md:items-center md:space-y-0 md:space-x-8">
                    <a
                      href="https://www.linkedin.com/in/kauan-kelvin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-orange"
                      aria-label="LinkedIn Profile"
                    >
                      LINKEDIN
                    </a>
                    <a
                      href="https://github.com/kauankelvin7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-orange"
                      aria-label="GitHub Profile"
                    >
                      GITHUB
                    </a>
                  </div>
                </div>
              </footer>
            </div>,
            document.body
          )}
        </nav>
      </div>
    </header>
  );
}