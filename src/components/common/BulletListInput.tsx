'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';

interface BulletListInputProps {
  label: string;
  bullets: string[];
  onChange: (bullets: string[]) => void;
  targetRole?: string;
  contextTitle?: string;
}

export default function BulletListInput({
  label,
  bullets,
  onChange,
  targetRole,
  contextTitle,
}: BulletListInputProps) {
  const [improvingIdx, setImprovingIdx] = useState<number | null>(null);

  const addBullet = () => {
    onChange([...bullets, '']);
  };

  const updateBullet = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const removeBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  const handleImproveWithAi = async (index: number) => {
    const rawText = bullets[index];
    if (!rawText.trim()) return;

    setImprovingIdx(index);
    try {
      const response = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: rawText,
          targetRole: targetRole || '',
          contextTitle: contextTitle || '',
        }),
      });

      const data = await response.json();
      if (data.improvedBullet) {
        updateBullet(index, data.improvedBullet);
      }
    } catch (err) {
      console.error('Failed to improve bullet:', err);
    } finally {
      setImprovingIdx(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={addBullet}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Bullet Point</span>
        </button>
      </div>

      <div className="space-y-2">
        {bullets.map((bullet, idx) => (
          <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
            <span className="text-slate-400 text-xs mt-2 font-mono">•</span>
            <textarea
              rows={2}
              value={bullet}
              onChange={(e) => updateBullet(idx, e.target.value)}
              placeholder="e.g., Spearheaded database migration of 40TB records, reducing query latency by 45%..."
              className="flex-grow text-xs text-slate-800 bg-white border border-slate-200 rounded p-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
            />
            <div className="flex flex-col gap-1 mt-0.5">
              <button
                type="button"
                onClick={() => handleImproveWithAi(idx)}
                disabled={improvingIdx === idx || !bullet.trim()}
                title="Polish with AI (STAR Method)"
                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded border border-indigo-200 transition-colors disabled:opacity-40"
              >
                {improvingIdx === idx ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </button>
              <button
                type="button"
                onClick={() => removeBullet(idx)}
                title="Remove bullet point"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
