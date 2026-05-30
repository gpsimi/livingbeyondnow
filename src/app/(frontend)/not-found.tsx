"use client";

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1B3629]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#8B2C2C]/10 rounded-full blur-[100px]" />

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto flex flex-col items-center"
        >
          <span className="text-[#D4AF37] font-bold text-sm md:text-base uppercase tracking-[0.3em] mb-4">
            Error 404
          </span>
          
          <h1 className="font-heading text-8xl md:text-[12rem] font-bold leading-none text-transparent bg-clip-text bg-linear-to-br from-[#1B3629] to-[#8B2C2C] mb-6">
            404
          </h1>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight text-balance">
            {"You've stepped outside the system."}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
            {"The page you are looking for has been moved, removed, or perhaps it never existed at all. Let's get you back on track."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link 
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1B3629] hover:bg-[#13261C] text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-[#1B3629] text-[#1B3629] hover:bg-muted px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
