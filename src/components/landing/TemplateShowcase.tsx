'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { TemplateId } from '@/types/resume';

interface TemplateInfo {
  id: TemplateId;
  name: string;
  tagline: string;
  bestFor: string;
  atsScore: string;
  accent: string;
}

export default function TemplateShowcase() {
  const templates: TemplateInfo[] = [
    {
      id: 'minimalist',
      name: 'Minimalist Professional',
      tagline: 'Clean, modern typography with maximum visual clarity and zero clutter.',
      bestFor: 'General professionals, engineers, accountants, and analysts.',
      atsScore: '99% ATS Pass Rate',
      accent: 'border-indigo-600',
    },
    {
      id: 'corporate',
      name: 'Modern Corporate',
      tagline: 'Sophisticated header layout with subtle division and strong executive presence.',
      bestFor: 'Corporate roles, managers, consultants, and finance professionals.',
      atsScore: '98% ATS Pass Rate',
      accent: 'border-slate-800',
    },
    {
      id: 'traditional',
      name: 'ATS Traditional',
      tagline: 'Classic single-column serif design with standard headings for strict enterprise systems.',
      bestFor: 'Academic, legal, healthcare, and traditional corporate jobs.',
      atsScore: '100% ATS Pass Rate',
      accent: 'border-amber-700',
    },
    {
      id: 'student',
      name: 'Student & Fresher',
      tagline: 'Prioritizes education, academic projects, coursework, and coding competitions.',
      bestFor: 'College students, recent university grads, and entry-level applicants.',
      atsScore: '98% ATS Pass Rate',
      accent: 'border-blue-600',
    },
    {
      id: 'creative',
      name: 'Creative Tech',
      tagline: 'Contemporary tech-focused layout with skill chips and modern section badges.',
      bestFor: 'Software developers, UX/UI designers, and startup specialists.',
      atsScore: '96% ATS Pass Rate',
      accent: 'border-teal-600',
    },
  ];

  return (
    <section id="templates" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <span>Recruiter-Approved Formats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            5 Battle-Tested ATS Templates
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Switch between designs instantly without re-typing your details. Every template is strictly tuned for automated applicant tracking systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="group border border-slate-200 hover:border-indigo-400 rounded-2xl p-6 bg-slate-50/50 hover:bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    {tpl.atsScore}
                  </span>
                  <span className="text-xs font-mono text-slate-400 capitalize">
                    {tpl.id}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {tpl.name}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {tpl.tagline}
                </p>

                <div className="bg-white p-3 rounded-lg border border-slate-200/70 text-xs space-y-1 mb-4">
                  <span className="font-semibold text-slate-700 block">Best for:</span>
                  <span className="text-slate-500 block">{tpl.bestFor}</span>
                </div>
              </div>

              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 pt-2 border-t border-slate-200/60 transition-colors"
              >
                <span>Use this template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
