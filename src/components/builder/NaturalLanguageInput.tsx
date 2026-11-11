'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Sparkles, Send, Loader2, CheckCircle2, HelpCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { ResumeData } from '@/types/resume';

export default function NaturalLanguageInput() {
  const {
    resume,
    chatMessages,
    addChatMessage,
    applyExtractedResumeData,
    isAiGenerating,
    setIsAiGenerating,
  } = useResumeStore();

  const [promptInput, setPromptInput] = useState('');
  const [pendingExtraction, setPendingExtraction] = useState<Partial<ResumeData> | null>(null);

  const samplePrompts = [
    "I'm a final-year CS student at UT Austin with a 3.85 GPA. I know Java, Python, React, and SQL. I built an open-source code review web app in Next.js and Docker used by 400 people. Looking for a summer software engineering internship.",
    "I am a Senior Full Stack Engineer with 5 years experience in React, Node.js, and AWS. I led a database migration that reduced query latency by 45% and mentored 6 engineers.",
  ];

  const handleSendPrompt = async (textToSend?: string) => {
    const text = (textToSend || promptInput).trim();
    if (!text || isAiGenerating) return;

    // Add user message to chat stream
    addChatMessage({
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    setPromptInput('');
    setIsAiGenerating(true);

    try {
      const response = await fetch('/api/ai/parse-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          existingResume: resume,
        }),
      });

      const result = await response.json();

      if (result.extractedData) {
        setPendingExtraction(result.extractedData);
      }

      addChatMessage({
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: result.message || 'I extracted the relevant details from your description. Review the summary below to merge them into your resume!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: result.extractedData ? 'apply_extracted_data' : undefined,
        extractedData: result.extractedData,
        questions: result.followUpQuestions || [],
      });
    } catch (err) {
      console.error('Error parsing natural language prompt:', err);
      addChatMessage({
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "I encountered a network issue analyzing your description. Please make sure the API key is configured or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleApplyExtraction = (dataToApply: Partial<ResumeData>) => {
    applyExtractedResumeData(dataToApply);
    setPendingExtraction(null);
    addChatMessage({
      id: `confirm-${Date.now()}`,
      sender: 'ai',
      text: "✅ Extracted details successfully applied to your resume! You can switch to the Structured Forms tab to tweak any specific field or check the live preview on the right.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">AI Natural Language Assistant</h3>
            <p className="text-[11px] text-slate-500">
              Describe your background in plain text. AI extracts and populates fields without making things up.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/70'
              }`}
            >
              <p>{msg.text}</p>

              {/* Follow-up Questions Card */}
              {msg.questions && msg.questions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Follow-up Clarifications (Optional):</span>
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-1">
                    {msg.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                  <p className="text-[10px] text-slate-400 italic pt-1">
                    You can type the answers directly in the prompt below.
                  </p>
                </div>
              )}

              {/* Extracted Data Action Card */}
              {msg.extractedData && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/80 bg-white/70 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">
                    Extracted Resume Fields:
                  </span>
                  <div className="text-[11px] text-slate-600 space-y-0.5 mb-2">
                    {msg.extractedData.personalInfo?.fullName && (
                      <p>• Name: <strong className="text-slate-800">{msg.extractedData.personalInfo.fullName}</strong></p>
                    )}
                    {msg.extractedData.personalInfo?.jobTitle && (
                      <p>• Title: <strong className="text-slate-800">{msg.extractedData.personalInfo.jobTitle}</strong></p>
                    )}
                    {msg.extractedData.education && msg.extractedData.education.length > 0 && (
                      <p>• Education: <strong className="text-slate-800">{msg.extractedData.education[0].institution} ({msg.extractedData.education[0].degree})</strong></p>
                    )}
                    {msg.extractedData.projects && msg.extractedData.projects.length > 0 && (
                      <p>• Projects: <strong className="text-slate-800">{msg.extractedData.projects.map(p => p.title).join(', ')}</strong></p>
                    )}
                    {msg.extractedData.technicalSkills?.languages && msg.extractedData.technicalSkills.languages.length > 0 && (
                      <p>• Languages: <strong className="text-slate-800">{msg.extractedData.technicalSkills.languages.join(', ')}</strong></p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyExtraction(msg.extractedData!)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Apply Extracted Details to Resume</span>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isAiGenerating && (
          <div className="flex items-center gap-2 text-xs text-indigo-600 p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>AI is analyzing your background and organizing sections...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
        <span className="text-[11px] font-semibold text-slate-500 block mb-1">
          Example Prompts to Try:
        </span>
        <div className="flex flex-col gap-1.5">
          {samplePrompts.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendPrompt(s)}
              className="text-left text-[11px] text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50/50 p-2 rounded border border-slate-200 transition-colors line-clamp-1"
            >
              "{s}"
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-end gap-2">
        <textarea
          rows={3}
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSendPrompt();
            }
          }}
          placeholder="Describe your education, skills, projects, or experience in your own words... (Ctrl+Enter to send)"
          className="flex-grow text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500 focus:bg-white resize-none"
        />

        <button
          type="button"
          onClick={() => handleSendPrompt()}
          disabled={!promptInput.trim() || isAiGenerating}
          className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAiGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
