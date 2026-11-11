import React from 'react';
import { ResumeData, SectionKey } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface TemplateProps {
  resume: ResumeData;
}

export default function CreativeTemplate({ resume }: TemplateProps) {
  const { personalInfo, summary, education, technicalSkills, softSkills, workExperience, projects, achievements, certifications, additionalInfo, metadata } = resume;
  const accent = metadata.accentColor || '#0d9488'; // Teal-600

  const isHidden = (key: SectionKey) => metadata.hiddenSections?.includes(key);

  return (
    <div className="w-full bg-white text-slate-800 leading-relaxed text-sm flex flex-col md:flex-row min-h-full">
      {/* Left Modern Sidebar */}
      <aside className="w-full md:w-1/3 bg-slate-900 text-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6">
        <div>
          {/* Header in Sidebar */}
          <div className="border-b border-slate-700 pb-5 mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase mt-1" style={{ color: '#2dd4bf' }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-slate-300 pb-6 border-b border-slate-700">
            {personalInfo.email && (
              <div className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="flex items-center gap-2 break-all">
                <Linkedin className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2 break-all">
                <Github className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.github}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>

          {/* Technical Skills Sidebar Badges */}
          {!isHidden('technicalSkills') && (
            <div className="py-5 border-b border-slate-700 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Tech Stack
              </h2>
              {technicalSkills.languages.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Languages:</span>
                  <div className="flex flex-wrap gap-1">
                    {technicalSkills.languages.map((l, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {technicalSkills.frameworks.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Frameworks:</span>
                  <div className="flex flex-wrap gap-1">
                    {technicalSkills.frameworks.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {technicalSkills.tools.length > 0 && (
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Tools & Cloud:</span>
                  <div className="flex flex-wrap gap-1">
                    {technicalSkills.tools.map((t, i) => (
                      <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education in Sidebar */}
          {!isHidden('education') && education.length > 0 && (
            <div className="py-5 border-b border-slate-700 space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-white">{edu.institution}</div>
                  <div className="text-slate-300 text-[11px]">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-slate-400 text-[10px] font-mono">{edu.startDate} – {edu.endDate}</div>
                  {edu.gpaOrPercentage && <div className="text-teal-300 text-[10px]">GPA: {edu.gpaOrPercentage}</div>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications in Sidebar */}
          {!isHidden('certifications') && certifications.length > 0 && (
            <div className="pt-5 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Certifications
              </h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="text-xs">
                  <div className="font-semibold text-white">{cert.name}</div>
                  <div className="text-slate-400 text-[11px]">{cert.issuer} ({cert.issueDate})</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Right Main Column */}
      <main className="w-full md:w-2/3 p-8 sm:p-10 space-y-6 bg-white">
        {/* Professional Summary */}
        {!isHidden('summary') && summary.content && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2" style={{ color: accent }}>
              About & Career Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{summary.content}</p>
          </section>
        )}

        {/* Experience */}
        {!isHidden('workExperience') && workExperience.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-3" style={{ color: accent }}>
              Experience & History
            </h2>
            <div className="space-y-4">
              {workExperience.map((exp) => (
                <div key={exp.id} className="resume-item">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-900">
                    <span>{exp.position}</span>
                    <span className="text-xs font-mono font-normal text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: accent }}>
                    {exp.company} {exp.location && <span className="text-slate-400 font-normal">({exp.location})</span>}
                  </div>
                  {exp.bullets && (
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
        )}

        {/* Projects */}
        {!isHidden('projects') && projects.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-3" style={{ color: accent }}>
              Featured Projects
            </h2>
            <div className="space-y-3.5">
              {projects.map((proj) => (
                <div key={proj.id} className="resume-item">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-900">
                    <span>{proj.title}</span>
                    {proj.technologies && (
                      <span className="text-[11px] font-mono text-slate-500">
                        {proj.technologies.join(', ')}
                      </span>
                    )}
                  </div>
                  {proj.description && <p className="text-xs text-slate-600 mb-1">{proj.description}</p>}
                  {proj.bullets && (
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
        )}

        {/* Achievements */}
        {!isHidden('achievements') && achievements.length > 0 && (
          <section className="resume-section">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b pb-1 mb-2" style={{ color: accent }}>
              Key Accomplishments
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between">
                  <span><strong className="text-slate-900">{ach.title}</strong> {ach.description && `— ${ach.description}`}</span>
                  {ach.date && <span className="text-slate-500 font-mono text-[11px]">{ach.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
