'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              Resume<span className="text-indigo-400">AI</span>
            </span>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-left max-w-md">
            Product Vision: Turn your experience, skills, education, and achievements into a professional, ATS-friendly resume with the power of AI.
          </p>

          <div className="flex items-center gap-6 text-xs font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#templates" className="hover:text-white transition-colors">Templates</a>
            <Link href="/builder" className="text-indigo-400 hover:text-indigo-300 transition-colors">Builder</Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for ambitious students & job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
