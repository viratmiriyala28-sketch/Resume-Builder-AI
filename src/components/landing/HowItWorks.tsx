'use client';

import React from 'react';
import { MessageSquareText, Sparkles, Download, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: MessageSquareText,
      title: 'Describe or Fill Forms',
      description:
        'Speak your mind freely in natural language ("I know Java, built 2 projects, got a cloud cert...") or fill organized form sections. Choose whichever feels easiest.',
      tag: 'Hybrid Input',
    },
    {
      step: '02',
      icon: Sparkles,
      title: 'AI Structures & Enhances',
      description:
        'ResumeAI extracts details, frames your achievements using the impactful STAR method (Action + Metric + Result), and asks clarifying questions instead of guessing.',
      tag: 'Zero Hallucinations',
    },
    {
      step: '03',
      icon: Download,
      title: 'Preview & Download PDF',
      description:
        'Switch between 5 professional ATS-friendly templates, customize accent colors, match against specific job descriptions, and export pixel-perfect PDFs with selectable text.',
      tag: 'ATS Optimized',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ResumeAI Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No resume-writing experience needed. From messy thoughts to an interview-ready resume in three effortless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-50/80 border border-slate-200/90 rounded-2xl p-8 hover:shadow-lg hover:border-indigo-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-indigo-200 group-hover:text-indigo-400 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold text-indigo-700 bg-indigo-100/70 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-md shadow-indigo-600/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
