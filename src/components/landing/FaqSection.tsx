'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: 'Will the AI invent fake experience or fake metrics?',
      a: 'Absolutely not. ResumeAI is engineered with strict anti-hallucination guardrails. The AI will never invent college degrees, employers, work timelines, GPA, or fake statistical achievements. If any information is missing, the AI specifically asks you to clarify or leaves the space open for your genuine input.',
    },
    {
      q: 'Are the exported resumes really ATS-friendly?',
      a: 'Yes. All 5 templates follow strict ATS guidelines: single or clean dual-column layouts with standard semantic headings, universally readable fonts, and 100% selectable vector text. They avoid complex SVG graphical badges or unparseable tables that confuse applicant tracking robots.',
    },
    {
      q: 'Can I use natural language if I am a student with zero work experience?',
      a: 'Yes! That is one of our flagship capabilities. You can type: "I am a 3rd year student in Computer Science, I took classes in Data Structures and built a Discord bot and a React app for my college club." ResumeAI will structure your education, coursework, and projects effectively to showcase your strengths.',
    },
    {
      q: 'Can I switch between templates without losing my information?',
      a: 'Yes! Your resume data lives in a unified structured model. You can switch between Minimalist, Corporate, Traditional, Student, or Creative templates at any point with a single click, and all your content is preserved.',
    },
    {
      q: 'Is ResumeAI free to use?',
      a: 'Yes! You can generate, customize, preview, and download your resumes as PDFs completely free. There are no paywalls or watermarks.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to know about ResumeAI and how it works.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
