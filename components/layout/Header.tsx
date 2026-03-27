"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { ButtonMenu } from "../ui/ButtonMenu";
import CreativeBackground from "../ui/CreativeBackground";
import { useTransition } from "@/app/context/TransitionContext";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { startTransition } = useTransition();

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

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none bg-transparent">
      <div className="w-full mx-auto flex items-center justify-between px-8 py-9">
        
        <Link
          href="/"
          onClick={(e) => handleNavigation(e, '/')}
          className="relative pointer-events-auto group flex items-center gap-2"
        >
          <div className="relative font-display text-3xl md:text-4xl font-black tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-10deg]">
             {/* Main Text with Outline Effect */}
             <span 
               className="text-brand-cream" 
               style={{ WebkitTextStroke: '1.5px #0a0a0a', textShadow: '3px 3px 0px #ff6b00' }}
             >
               KAUAN
             </span>
             {/* Floating Accent */}
             <span className="absolute -top-1 -right-4 w-3 h-3 bg-brand-orange border-2 border-brand-black rotate-45 group-hover:animate-bounce" />
          </div>
          
          <div className="hidden md:block h-px w-8 bg-brand-orange/40 group-hover:w-16 transition-all duration-500" />
        </Link>

        <nav>
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex h-5 w-8 cursor-pointer flex-col items-center justify-between pointer-events-auto"
            aria-label="Toggle menu"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <ButtonMenu isOpen={isOpen} isHovered={isHovered} />
          </button>
          {isOpen && createPortal(
            <div className="fixed inset-0 z-9999 bg-transparent flex flex-col items-center justify-center space-y-4 text-4xl font-bold text-white transition-all duration-500 animate-in fade-in pointer-events-auto">
              
              <CreativeBackground />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 cursor-pointer transition hover:text-gray-400 z-50"
              >
                <X size={30} />
              </button>
              
              <Link
                href="/"
                onClick={(e) => handleNavigation(e, '/')}
                className="text-6xl font-display font-extrabold transition-all duration-100 ease-in-out hover:text-brand-orange cursor-pointer z-10"
              >
                INÍCIO
              </Link>

              <Link
                href="/#about"
                onClick={(e) => handleNavigation(e, '/#about')}
                className="text-6xl font-display font-extrabold transition-all duration-100 ease-in-out hover:text-brand-orange cursor-pointer z-10"
              >
                SOBRE
              </Link>

              <Link
                href="/#work"
                onClick={(e) => handleNavigation(e, '/#work')}
                className="text-6xl font-display font-extrabold transition-all duration-100 ease-in-out hover:text-brand-orange cursor-pointer z-10"
              >
                PROJETOS
              </Link>

              <Link
                href="/#contact"
                onClick={(e) => handleNavigation(e, '/#contact')}
                className="text-6xl font-display font-extrabold transition-all duration-100 ease-in-out hover:text-brand-orange cursor-pointer z-10"
              >
                CONTATO
              </Link>

              <footer className="absolute inset-x-0 bottom-0 px-8 pb-8 md:px-12 z-10">
                <div className="flex w-full flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <div className="font-mono text-xs tracking-widest uppercase text-brand-gray">
                    ©2026 TODOS OS DIREITOS RESERVADOS
                  </div>

                  <div className="flex flex-col items-start space-y-2 text-xs font-mono uppercase tracking-widest text-brand-cream md:flex-row md:items-center md:space-y-0 md:space-x-6">
                    <a
                      href="https://www.linkedin.com/in/kauan-kelvin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-orange"
                    >
                      LINKEDIN
                    </a>
                    <a
                      href="https://github.com/kauankelvin7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-brand-orange"
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