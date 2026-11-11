'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { SectionKey } from '@/types/resume';
import {
  User,
  FileText,
  GraduationCap,
  Code2,
  Users,
  Briefcase,
  FolderGit2,
  Award,
  BadgeCheck,
  Globe2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import PersonalInfoForm from './sections/PersonalInfoForm';
import SummaryForm from './sections/SummaryForm';
import EducationForm from './sections/EducationForm';
import TechnicalSkillsForm from './sections/TechnicalSkillsForm';
import SoftSkillsForm from './sections/SoftSkillsForm';
import WorkExperienceForm from './sections/WorkExperienceForm';
import ProjectsForm from './sections/ProjectsForm';
import AchievementsForm from './sections/AchievementsForm';
import CertificationsForm from './sections/CertificationsForm';
import AdditionalInfoForm from './sections/AdditionalInfoForm';

interface SectionTab {
  key: SectionKey;
  label: string;
  icon: React.ElementType;
}

const SECTION_TABS: SectionTab[] = [
  { key: 'personalInfo', label: 'Personal', icon: User },
  { key: 'summary', label: 'Summary', icon: FileText },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'technicalSkills', label: 'Tech Skills', icon: Code2 },
  { key: 'projects', label: 'Projects', icon: FolderGit2 },
  { key: 'workExperience', label: 'Experience', icon: Briefcase },
  { key: 'certifications', label: 'Certs', icon: BadgeCheck },
  { key: 'achievements', label: 'Awards', icon: Award },
  { key: 'softSkills', label: 'Soft Skills', icon: Users },
  { key: 'additionalInfo', label: 'Additional', icon: Globe2 },
];

export default function FormEditor() {
  const { resume, activeFormSection, setActiveFormSection } = useResumeStore();

  const currentIdx = SECTION_TABS.findIndex((t) => t.key === activeFormSection);

  const goToNext = () => {
    if (currentIdx < SECTION_TABS.length - 1) {
      setActiveFormSection(SECTION_TABS[currentIdx + 1].key);
    }
  };

  const goToPrev = () => {
    if (currentIdx > 0) {
      setActiveFormSection(SECTION_TABS[currentIdx - 1].key);
    }
  };

  const isSectionFilled = (key: SectionKey): boolean => {
    switch (key) {
      case 'personalInfo':
        return !!(resume.personalInfo.fullName && resume.personalInfo.email);
      case 'summary':
        return !!resume.summary.content;
      case 'education':
        return resume.education.length > 0;
      case 'technicalSkills':
        return (
          resume.technicalSkills.languages.length > 0 ||
          resume.technicalSkills.frameworks.length > 0
        );
      case 'projects':
        return resume.projects.length > 0;
      case 'workExperience':
        return resume.workExperience.length > 0;
      case 'certifications':
        return resume.certifications.length > 0;
      case 'achievements':
        return resume.achievements.length > 0;
      case 'softSkills':
        return resume.softSkills.length > 0;
      case 'additionalInfo':
        return resume.additionalInfo.languages.length > 0;
      default:
        return false;
    }
  };

  const renderActiveSection = () => {
    switch (activeFormSection) {
      case 'personalInfo':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'education':
        return <EducationForm />;
      case 'technicalSkills':
        return <TechnicalSkillsForm />;
      case 'softSkills':
        return <SoftSkillsForm />;
      case 'workExperience':
        return <WorkExperienceForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'additionalInfo':
        return <AdditionalInfoForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Horizontal Tabs Scroll Area */}
      <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto scrollbar-thin">
        {SECTION_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFormSection === tab.key;
          const isFilled = isSectionFilled(tab.key);

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFormSection(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {isFilled && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Form Content Scrollable Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        {renderActiveSection()}
      </div>

      {/* Footer Navigation Bar */}
      <div className="flex items-center justify-between p-3.5 bg-slate-50 border-t border-slate-200">
        <button
          type="button"
          onClick={goToPrev}
          disabled={currentIdx === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous Section</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {currentIdx + 1} of {SECTION_TABS.length}
        </span>

        <button
          type="button"
          onClick={goToNext}
          disabled={currentIdx === SECTION_TABS.length - 1}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Next Section</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
