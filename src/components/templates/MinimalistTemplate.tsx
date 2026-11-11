import React from 'react';
import { ResumeData, SectionKey } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
}

export default function MinimalistTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, education, technicalSkills, softSkills, workExperience, projects, achievements, certifications, additionalInfo, metadata } = resume;
  const accent = metadata.accentColor || '#4f46e5';

  const isHidden = (key: SectionKey) => metadata.hiddenSections?.includes(key);

  return (
    <div className="w-full bg-white text-slate-800 p-8 sm:p-12 leading-relaxed text-sm">
      {/* Header / Personal Info */}
      <header className="border-b pb-6 mb-6" style={{ borderColor: `${accent}33` }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-base sm:text-lg font-medium text-slate-600 mt-1">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Bar */}
        <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600 mt-3">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.linkedIn}
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.github}
            </span>
          )}
          {personalInfo.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Ordered Sections */}
      <div className="space-y-6">
        {metadata.sectionOrder.map((sectionKey) => {
          if (isHidden(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              if (!summary.content && !summary.careerObjective) return null;
              return (
                <section key="summary" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                    Professional Summary
                  </h2>
                  {summary.content && <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{summary.content}</p>}
                  {summary.careerObjective && (
                    <p className="text-xs text-slate-600 mt-1.5 italic">
                      <strong className="text-slate-800 not-italic">Objective:</strong> {summary.careerObjective}
                    </p>
                  )}
                </section>
              );

            case 'workExperience':
              if (!workExperience || workExperience.length === 0) return null;
              return (
                <section key="workExperience" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {workExperience.map((exp) => (
                      <div key={exp.id} className="resume-item">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{exp.position}</span>
                          <span className="text-xs text-slate-500 font-mono">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-600 font-medium mb-1.5">
                          <span>{exp.company}</span>
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'education':
              if (!education || education.length === 0) return null;
              return (
                <section key="education" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Education
                  </h2>
                  <div className="space-y-3">
                    {education.map((edu) => (
                      <div key={edu.id} className="resume-item">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <span className="font-bold text-slate-900">{edu.institution}</span>
                          <span className="text-xs text-slate-500 font-mono">
                            {edu.startDate} – {edu.current ? 'Expected ' + edu.endDate : edu.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-700">
                          <span>{edu.degree} in {edu.fieldOfStudy}</span>
                          {edu.gpaOrPercentage && <span className="font-medium text-slate-600">GPA / Score: {edu.gpaOrPercentage}</span>}
                        </div>
                        {edu.relevantCoursework && edu.relevantCoursework.length > 0 && (
                          <p className="text-[11px] text-slate-600 mt-1">
                            <span className="font-semibold text-slate-700">Relevant Coursework:</span> {edu.relevantCoursework.join(', ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'projects':
              if (!projects || projects.length === 0) return null;
              return (
                <section key="projects" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Projects
                  </h2>
                  <div className="space-y-3.5">
                    {projects.map((proj) => (
                      <div key={proj.id} className="resume-item">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{proj.title}</span>
                            {proj.link && (
                              <span className="text-[11px] text-slate-500 font-mono">({proj.link})</span>
                            )}
                          </div>
                          {proj.technologies && proj.technologies.length > 0 && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              {proj.technologies.join(', ')}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-xs text-slate-600 mb-1">{proj.description}</p>
                        )}
                        {proj.bullets && proj.bullets.length > 0 && (
                          <ul className="list-disc list-outside ml-4 text-xs text-slate-700 space-y-1">
                            {proj.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'technicalSkills':
              const hasTechSkills =
                technicalSkills.languages.length > 0 ||
                technicalSkills.frameworks.length > 0 ||
                technicalSkills.databases.length > 0 ||
                technicalSkills.tools.length > 0 ||
                technicalSkills.other.length > 0;
              if (!hasTechSkills) return null;
              return (
                <section key="technicalSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Technical Skills
                  </h2>
                  <div className="text-xs space-y-1.5 text-slate-700">
                    {technicalSkills.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {technicalSkills.languages.join(', ')}</p>
                    )}
                    {technicalSkills.frameworks.length > 0 && (
                      <p><strong className="text-slate-900">Frameworks & Libraries:</strong> {technicalSkills.frameworks.join(', ')}</p>
                    )}
                    {technicalSkills.databases.length > 0 && (
                      <p><strong className="text-slate-900">Databases:</strong> {technicalSkills.databases.join(', ')}</p>
                    )}
                    {technicalSkills.tools.length > 0 && (
                      <p><strong className="text-slate-900">Developer Tools:</strong> {technicalSkills.tools.join(', ')}</p>
                    )}
                    {technicalSkills.other.length > 0 && (
                      <p><strong className="text-slate-900">Other Competencies:</strong> {technicalSkills.other.join(', ')}</p>
                    )}
                  </div>
                </section>
              );

            case 'softSkills':
              if (!softSkills || softSkills.length === 0) return null;
              return (
                <section key="softSkills" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Soft Skills & Competencies
                  </h2>
                  <p className="text-xs text-slate-700">{softSkills.join(' • ')}</p>
                </section>
              );

            case 'achievements':
              if (!achievements || achievements.length === 0) return null;
              return (
                <section key="achievements" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Achievements & Honors
                  </h2>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {achievements.map((ach) => (
                      <div key={ach.id} className="flex justify-between">
                        <div>
                          <strong className="text-slate-900">{ach.title}</strong>
                          {ach.description && <span className="text-slate-600"> — {ach.description}</span>}
                        </div>
                        {ach.date && <span className="text-slate-500 font-mono text-[11px]">{ach.date}</span>}
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'certifications':
              if (!certifications || certifications.length === 0) return null;
              return (
                <section key="certifications" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Certifications
                  </h2>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <div>
                          <strong className="text-slate-900">{cert.name}</strong>
                          <span className="text-slate-600"> ({cert.issuer})</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{cert.issueDate}</span>
                      </div>
                    ))}
                  </div>
                </section>
              );

            case 'additionalInfo':
              const hasAddl =
                additionalInfo.languages.length > 0 ||
                (additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0) ||
                (additionalInfo.extracurriculars && additionalInfo.extracurriculars.length > 0) ||
                (additionalInfo.interests && additionalInfo.interests.length > 0);
              if (!hasAddl) return null;
              return (
                <section key="additionalInfo" className="resume-section">
                  <h2 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: accent, borderColor: `${accent}22` }}>
                    Additional Information
                  </h2>
                  <div className="text-xs space-y-1 text-slate-700">
                    {additionalInfo.languages.length > 0 && (
                      <p><strong className="text-slate-900">Languages:</strong> {additionalInfo.languages.join(', ')}</p>
                    )}
                    {additionalInfo.volunteerExperience && additionalInfo.volunteerExperience.length > 0 && (
                      <p><strong className="text-slate-900">Volunteering:</strong> {additionalInfo.volunteerExperience.join('; ')}</p>
                    )}
                    {additionalInfo.extracurriculars && additionalInfo.extracurriculars.length > 0 && (
                      <p><strong className="text-slate-900">Activities:</strong> {additionalInfo.extracurriculars.join('; ')}</p>
                    )}
                    {additionalInfo.interests && additionalInfo.interests.length > 0 && (
                      <p><strong className="text-slate-900">Interests:</strong> {additionalInfo.interests.join(', ')}</p>
                    )}
                  </div>
                </section>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
