'use client';

import React from 'react';
import {
  Sparkles,
  ShieldAlert,
  Target,
  LayoutTemplate,
  FileCheck2,
  Sliders,
  RefreshCw,
  Cpu,
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Sparkles,
      title: 'Hybrid Input Engine',
      description:
        'Don’t feel like filling 10 tedious forms? Just talk to the AI in plain English. Your informal notes instantly become structured resume sections.',
    },
    {
      icon: ShieldAlert,
      title: 'Anti-Hallucination Guardrails',
      description:
        'The AI strictly respects truth. It will never fabricate fake companies, fake degrees, fake metrics, or fake credentials. If information is missing, it asks.',
    },
    {
      icon: Target,
      title: 'Job Description Tailoring',
      description:
        'Paste any job posting URL or text. ResumeAI analyzes target qualifications, surfaces matching keywords, and highlights relevant experiences to boost your interview callbacks.',
    },
    {
      icon: LayoutTemplate,
      title: '5 ATS-Engineered Templates',
      description:
        'Carefully styled to ensure 100% parsing accuracy across Workday, Taleo, Greenhouse, and Lever. Selectable text and clean typography guaranteed.',
    },
    {
      icon: Sliders,
      title: 'Live Split-Screen Customizer',
      description:
        'Reorder sections, toggle visibility, adjust accent colors, and switch fonts in real-time with zero latency and automatic local saving.',
    },
    {
      icon: FileCheck2,
      title: 'Pixel-Perfect PDF Export',
      description:
        'Download sharp, vector-quality PDF documents formatted to standard Letter / A4 paper sizes with zero unexpected page breaks.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
            <span>Built For Modern Hiring</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Job Seekers Choose ResumeAI
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Traditional resume builders force you into rigid boxes. Generic AI chatbots make up facts. ResumeAI gives you the best of both worlds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {feature.description}
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
