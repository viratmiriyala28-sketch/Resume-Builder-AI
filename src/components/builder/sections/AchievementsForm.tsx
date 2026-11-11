'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Award, Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/lib/utils';

export default function AchievementsForm() {
  const { resume, addAchievementItem, updateAchievementItem, removeAchievementItem } = useResumeStore();
  const achievements = resume.achievements;

  const handleAddNew = () => {
    addAchievementItem({
      id: generateId('ach'),
      title: '',
      description: '',
      date: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-600" />
            <span>Honors & Achievements</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Hackathons, Dean's honor lists, competition placements, scholarships, and academic recognition.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Achievement</span>
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-500">No achievements added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            + Add an Honor or Achievement
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((ach, idx) => (
            <div
              key={ach.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Achievement #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeAchievementItem(ach.id)}
                  className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                  title="Delete Entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Award / Achievement Title *
                  </label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => updateAchievementItem(ach.id, { title: e.target.value })}
                    placeholder="e.g., 1st Place Winner - HackAustin 2024"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={ach.date || ''}
                    onChange={(e) => updateAchievementItem(ach.id, { date: e.target.value })}
                    placeholder="e.g., Oct 2024"
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Details / Description</label>
                  <input
                    type="text"
                    value={ach.description || ''}
                    onChange={(e) => updateAchievementItem(ach.id, { description: e.target.value })}
                    placeholder="e.g., Competed against 45 collegiate teams to build an accessible voice-driven productivity assistant."
                    className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
