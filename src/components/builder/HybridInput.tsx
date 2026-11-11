'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Sparkles, FormInput, HelpCircle } from 'lucide-react';
import NaturalLanguageInput from './NaturalLanguageInput';
import FormEditor from './FormEditor';

export default function HybridInput() {
  const { activeInputTab, setActiveInputTab } = useResumeStore();

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Top Switcher */}
      <div className="flex items-center justify-between bg-slate-200/70 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveInputTab('prompt')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeInputTab === 'prompt'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Natural Language (AI Prompt)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveInputTab('forms')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            activeInputTab === 'forms'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FormInput className="w-3.5 h-3.5 text-indigo-600" />
          <span>Structured Forms (10 Sections)</span>
        </button>
      </div>

      {/* Render Selected Input System */}
      <div className="flex-1 min-h-0">
        {activeInputTab === 'prompt' ? <NaturalLanguageInput /> : <FormEditor />}
      </div>
    </div>
  );
}
