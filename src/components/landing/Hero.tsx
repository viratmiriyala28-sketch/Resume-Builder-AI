'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, FileCheck, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-indigo-200/40 via-violet-200/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200/70 text-indigo-700 shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI-Powered & ATS-Optimized Resume Creator</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Turn Your Experience Into a{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 bg-clip-text text-transparent">
              Job-Winning Resume
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Whether you describe yourself in free natural language or fill structured forms, ResumeAI crafts high-impact, professional, ATS-friendly resumes in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all hover:scale-[1.02] active:scale-[0.99]"
            >
              <span>Build My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all"
            >
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <span>Explore ATS Templates</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs sm:text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free to Use</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Zero Hallucinations Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Applicant Tracking System (ATS) Friendly</span>
            </div>
          </div>
        </div>

        {/* Visual Showcase Teaser */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-white p-2 sm:p-4 shadow-2xl border border-slate-200/80 shadow-indigo-500/10">
            {/* Top Bar Decoration */}
            <div className="flex items-center justify-between pb-3 px-3 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">resumeai-builder.workspace</span>
              </div>
              <div className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                <Sparkles className="w-3 h-3" />
                <span>AI Live Preview</span>
              </div>
            </div>

            {/* Split Screen Preview Simulation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-2 sm:p-4 bg-slate-50 rounded-xl mt-2">
              {/* Left Column: Natural Prompt & Form preview */}
              <div className="md:col-span-5 bg-white rounded-lg p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 p-2 rounded-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Natural Language Prompt</span>
                </div>
                <div className="text-xs text-slate-600 font-mono bg-slate-50 p-2.5 rounded border border-slate-200/70 leading-relaxed">
                  "I'm a final-year CS student. I built a full-stack project in Next.js and PostgreSQL with 400 active users. Looking for an internship..."
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">AI Extracted Structure:</div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded">Degree: B.S. CS</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">Next.js</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded">PostgreSQL</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-medium px-2 py-0.5 rounded">Impact: 400 Users</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mini Resume Preview Card */}
              <div className="md:col-span-7 bg-white rounded-lg p-5 border border-slate-200 shadow-sm space-y-3 text-left">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-slate-900 text-base">Alex Chen</h3>
                  <p className="text-xs text-indigo-600 font-medium">Aspiring Software Engineer & Computer Science Senior</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">alex.chen@university.edu • Austin, TX • github.com/alexchen</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-0.5">Education</h4>
                  <div className="text-[11px] flex justify-between text-slate-800 font-semibold">
                    <span>University of Texas at Austin</span>
                    <span className="text-slate-500 font-normal">2022 - 2026</span>
                  </div>
                  <p className="text-[10px] text-slate-600">B.S. in Computer Science — GPA: 3.85 / 4.0</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-0.5">Key Projects</h4>
                  <div className="text-[11px] flex justify-between text-slate-800 font-semibold">
                    <span>DevPulse — Collaborative Code Review System</span>
                    <span className="text-slate-500 font-normal">Next.js, PostgreSQL, Docker</span>
                  </div>
                  <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5">
                    <li>Architected REST backend handling 200+ req/s with normalized schemas, cutting query latency by 45%.</li>
                    <li>Integrated real-time code snippet review workflows serving 400+ active beta users.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
