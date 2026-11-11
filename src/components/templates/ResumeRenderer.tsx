import React from 'react';
import { ResumeData } from '@/types/resume';
import MinimalistTemplate from './MinimalistTemplate';
import CorporateTemplate from './CorporateTemplate';
import TraditionalTemplate from './TraditionalTemplate';
import StudentTemplate from './StudentTemplate';
import CreativeTemplate from './CreativeTemplate';

interface ResumeRendererProps {
  resume: ResumeData;
  scale?: number;
}

export default function ResumeRenderer({ resume, scale = 1 }: ResumeRendererProps) {
  const fontClass =
    resume.metadata.fontFamily === 'serif'
      ? 'font-serif'
      : resume.metadata.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const renderTemplate = () => {
    switch (resume.metadata.template) {
      case 'corporate':
        return <CorporateTemplate resume={resume} />;
      case 'traditional':
        return <TraditionalTemplate resume={resume} />;
      case 'student':
        return <StudentTemplate resume={resume} />;
      case 'creative':
        return <CreativeTemplate resume={resume} />;
      case 'minimalist':
      default:
        return <MinimalistTemplate resume={resume} />;
    }
  };

  return (
    <div
      id="printable-resume-document"
      className={`resume-paper-container bg-white text-slate-900 shadow-xl border border-slate-200/90 rounded-sm mx-auto overflow-hidden transition-all ${fontClass}`}
      style={{
        width: '100%',
        maxWidth: '850px',
        minHeight: '1100px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center',
      }}
    >
      {renderTemplate()}
    </div>
  );
}
