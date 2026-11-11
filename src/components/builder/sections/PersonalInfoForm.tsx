'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { User, Mail, Phone, MapPin, Linkedin, Github, Globe, Briefcase } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const info = resume.personalInfo;

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Personal Information</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Essential contact details so recruiters and interviewers can get in touch with you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <div className="relative">
            <input
              type="text"
              value={info.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="e.g., Alex Chen"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Title / Headline</label>
          <div className="relative">
            <input
              type="text"
              value={info.jobTitle}
              onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
              placeholder="e.g., Aspiring Software Engineer / Computer Science Senior"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
          <div className="relative">
            <input
              type="email"
              value={info.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="e.g., alex.chen@university.edu"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
          <div className="relative">
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="e.g., +1 (555) 234-5678"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Location / City & State</label>
          <div className="relative">
            <input
              type="text"
              value={info.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="e.g., Austin, TX / Remote"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <input
              type="text"
              value={info.linkedIn || ''}
              onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
              placeholder="e.g., linkedin.com/in/alexchen"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Code Repository</label>
          <div className="relative">
            <input
              type="text"
              value={info.github || ''}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="e.g., github.com/alexchen"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio / Personal Website</label>
          <div className="relative">
            <input
              type="text"
              value={info.portfolio || ''}
              onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
              placeholder="e.g., alexchen.dev"
              className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
