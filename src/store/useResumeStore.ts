import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ResumeData,
  PersonalInfo,
  Summary,
  EducationItem,
  TechnicalSkills,
  WorkExperienceItem,
  ProjectItem,
  AchievementItem,
  CertificationItem,
  AdditionalInfo,
  TemplateId,
  SectionKey,
  AiChatMessage,
} from '@/types/resume';
import {
  initialDefaultResume,
  sampleStudentResume,
  sampleProfessionalResume,
} from '@/lib/sampleData';

interface ResumeStoreState {
  resume: ResumeData;
  activeInputTab: 'prompt' | 'forms';
  activeFormSection: SectionKey;
  zoomLevel: number;
  isAiGenerating: boolean;
  chatMessages: AiChatMessage[];
  jobDescriptionInput: string;
  targetRoleInput: string;

  // Actions
  setActiveInputTab: (tab: 'prompt' | 'forms') => void;
  setActiveFormSection: (section: SectionKey) => void;
  setZoomLevel: (zoom: number) => void;
  setIsAiGenerating: (loading: boolean) => void;
  setResume: (resume: ResumeData) => void;
  loadSampleResume: (type: 'student' | 'professional' | 'blank') => void;
  resetToBlank: () => void;

  // Partial updates
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (data: Partial<Summary>) => void;
  updateTechnicalSkills: (data: Partial<TechnicalSkills>) => void;
  updateSoftSkills: (skills: string[]) => void;
  updateAdditionalInfo: (data: Partial<AdditionalInfo>) => void;

  // Education list CRUD
  setEducationList: (items: EducationItem[]) => void;
  addEducationItem: (item: EducationItem) => void;
  updateEducationItem: (id: string, item: Partial<EducationItem>) => void;
  removeEducationItem: (id: string) => void;

  // Work Experience list CRUD
  setWorkExperienceList: (items: WorkExperienceItem[]) => void;
  addWorkExperienceItem: (item: WorkExperienceItem) => void;
  updateWorkExperienceItem: (id: string, item: Partial<WorkExperienceItem>) => void;
  removeWorkExperienceItem: (id: string) => void;

  // Projects list CRUD
  setProjectsList: (items: ProjectItem[]) => void;
  addProjectItem: (item: ProjectItem) => void;
  updateProjectItem: (id: string, item: Partial<ProjectItem>) => void;
  removeProjectItem: (id: string) => void;

  // Achievements list CRUD
  setAchievementsList: (items: AchievementItem[]) => void;
  addAchievementItem: (item: AchievementItem) => void;
  updateAchievementItem: (id: string, item: Partial<AchievementItem>) => void;
  removeAchievementItem: (id: string) => void;

  // Certifications list CRUD
  setCertificationsList: (items: CertificationItem[]) => void;
  addCertificationItem: (item: CertificationItem) => void;
  updateCertificationItem: (id: string, item: Partial<CertificationItem>) => void;
  removeCertificationItem: (id: string) => void;

  // Design & metadata
  setTemplate: (template: TemplateId) => void;
  setAccentColor: (color: string) => void;
  setFontFamily: (font: 'sans' | 'serif' | 'mono') => void;
  reorderSections: (newOrder: SectionKey[]) => void;
  toggleSectionVisibility: (section: SectionKey) => void;
  setTargetRole: (role: string) => void;
  setJobDescriptionInput: (jd: string) => void;

  // Chat / NL prompt actions
  addChatMessage: (message: AiChatMessage) => void;
  clearChatMessages: () => void;
  applyExtractedResumeData: (extracted: Partial<ResumeData>) => void;
}

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set, get) => ({
      resume: sampleStudentResume, // Start with rich student sample so the preview immediately looks great
      activeInputTab: 'prompt',
      activeFormSection: 'personalInfo',
      zoomLevel: 100,
      isAiGenerating: false,
      chatMessages: [
        {
          id: 'welcome-msg',
          sender: 'ai',
          text: "Hello! I'm your AI Resume Co-pilot. Tell me about your background, projects, skills, or education in natural language, or type what you'd like to include. I will structure it for you without making anything up!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      jobDescriptionInput: '',
      targetRoleInput: '',

      setActiveInputTab: (tab) => set({ activeInputTab: tab }),
      setActiveFormSection: (section) => set({ activeFormSection: section }),
      setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
      setIsAiGenerating: (loading) => set({ isAiGenerating: loading }),
      setResume: (resume) => set({ resume: { ...resume, updatedAt: new Date().toISOString() } }),

      loadSampleResume: (type) => {
        if (type === 'student') set({ resume: { ...sampleStudentResume, updatedAt: new Date().toISOString() } });
        else if (type === 'professional') set({ resume: { ...sampleProfessionalResume, updatedAt: new Date().toISOString() } });
        else set({ resume: { ...initialDefaultResume, updatedAt: new Date().toISOString() } });
      },

      resetToBlank: () => set({ resume: { ...initialDefaultResume, updatedAt: new Date().toISOString() } }),

      updatePersonalInfo: (data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...data },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSummary: (data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            summary: { ...state.resume.summary, ...data },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateTechnicalSkills: (data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            technicalSkills: { ...state.resume.technicalSkills, ...data },
            updatedAt: new Date().toISOString(),
          },
        })),

      updateSoftSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            softSkills: skills,
            updatedAt: new Date().toISOString(),
          },
        })),

      updateAdditionalInfo: (data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            additionalInfo: { ...state.resume.additionalInfo, ...data },
            updatedAt: new Date().toISOString(),
          },
        })),

      // Education
      setEducationList: (items) =>
        set((state) => ({
          resume: { ...state.resume, education: items, updatedAt: new Date().toISOString() },
        })),
      addEducationItem: (item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [item, ...state.resume.education],
            updatedAt: new Date().toISOString(),
          },
        })),
      updateEducationItem: (id, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) => (edu.id === id ? { ...edu, ...item } : edu)),
            updatedAt: new Date().toISOString(),
          },
        })),
      removeEducationItem: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((edu) => edu.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Work Experience
      setWorkExperienceList: (items) =>
        set((state) => ({
          resume: { ...state.resume, workExperience: items, updatedAt: new Date().toISOString() },
        })),
      addWorkExperienceItem: (item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            workExperience: [item, ...state.resume.workExperience],
            updatedAt: new Date().toISOString(),
          },
        })),
      updateWorkExperienceItem: (id, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            workExperience: state.resume.workExperience.map((exp) => (exp.id === id ? { ...exp, ...item } : exp)),
            updatedAt: new Date().toISOString(),
          },
        })),
      removeWorkExperienceItem: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            workExperience: state.resume.workExperience.filter((exp) => exp.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Projects
      setProjectsList: (items) =>
        set((state) => ({
          resume: { ...state.resume, projects: items, updatedAt: new Date().toISOString() },
        })),
      addProjectItem: (item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [item, ...state.resume.projects],
            updatedAt: new Date().toISOString(),
          },
        })),
      updateProjectItem: (id, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((proj) => (proj.id === id ? { ...proj, ...item } : proj)),
            updatedAt: new Date().toISOString(),
          },
        })),
      removeProjectItem: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((proj) => proj.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Achievements
      setAchievementsList: (items) =>
        set((state) => ({
          resume: { ...state.resume, achievements: items, updatedAt: new Date().toISOString() },
        })),
      addAchievementItem: (item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            achievements: [item, ...state.resume.achievements],
            updatedAt: new Date().toISOString(),
          },
        })),
      updateAchievementItem: (id, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            achievements: state.resume.achievements.map((ach) => (ach.id === id ? { ...ach, ...item } : ach)),
            updatedAt: new Date().toISOString(),
          },
        })),
      removeAchievementItem: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            achievements: state.resume.achievements.filter((ach) => ach.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Certifications
      setCertificationsList: (items) =>
        set((state) => ({
          resume: { ...state.resume, certifications: items, updatedAt: new Date().toISOString() },
        })),
      addCertificationItem: (item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [item, ...state.resume.certifications],
            updatedAt: new Date().toISOString(),
          },
        })),
      updateCertificationItem: (id, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.map((cert) => (cert.id === id ? { ...cert, ...item } : cert)),
            updatedAt: new Date().toISOString(),
          },
        })),
      removeCertificationItem: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.filter((cert) => cert.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Metadata / Customization
      setTemplate: (template) =>
        set((state) => ({
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, template },
            updatedAt: new Date().toISOString(),
          },
        })),

      setAccentColor: (color) =>
        set((state) => ({
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, accentColor: color },
            updatedAt: new Date().toISOString(),
          },
        })),

      setFontFamily: (font) =>
        set((state) => ({
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, fontFamily: font },
            updatedAt: new Date().toISOString(),
          },
        })),

      reorderSections: (newOrder) =>
        set((state) => ({
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, sectionOrder: newOrder },
            updatedAt: new Date().toISOString(),
          },
        })),

      toggleSectionVisibility: (section) =>
        set((state) => {
          const isHidden = state.resume.metadata.hiddenSections.includes(section);
          const hiddenSections = isHidden
            ? state.resume.metadata.hiddenSections.filter((s) => s !== section)
            : [...state.resume.metadata.hiddenSections, section];
          return {
            resume: {
              ...state.resume,
              metadata: { ...state.resume.metadata, hiddenSections },
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      setTargetRole: (role) =>
        set((state) => ({
          targetRoleInput: role,
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, targetRole: role },
            updatedAt: new Date().toISOString(),
          },
        })),

      setJobDescriptionInput: (jd) =>
        set((state) => ({
          jobDescriptionInput: jd,
          resume: {
            ...state.resume,
            metadata: { ...state.resume.metadata, targetJobDescription: jd },
            updatedAt: new Date().toISOString(),
          },
        })),

      // Chat / NL
      addChatMessage: (msg) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, msg],
        })),

      clearChatMessages: () =>
        set({
          chatMessages: [],
        }),

      applyExtractedResumeData: (extracted) =>
        set((state) => {
          const current = state.resume;
          const updated: ResumeData = {
            ...current,
            updatedAt: new Date().toISOString(),
            personalInfo: {
              ...current.personalInfo,
              ...(extracted.personalInfo || {}),
            },
            summary: {
              ...current.summary,
              ...(extracted.summary || {}),
            },
            education: extracted.education && extracted.education.length > 0
              ? [...extracted.education, ...current.education]
              : current.education,
            workExperience: extracted.workExperience && extracted.workExperience.length > 0
              ? [...extracted.workExperience, ...current.workExperience]
              : current.workExperience,
            projects: extracted.projects && extracted.projects.length > 0
              ? [...extracted.projects, ...current.projects]
              : current.projects,
            technicalSkills: {
              languages: Array.from(new Set([...current.technicalSkills.languages, ...(extracted.technicalSkills?.languages || [])])),
              frameworks: Array.from(new Set([...current.technicalSkills.frameworks, ...(extracted.technicalSkills?.frameworks || [])])),
              databases: Array.from(new Set([...current.technicalSkills.databases, ...(extracted.technicalSkills?.databases || [])])),
              tools: Array.from(new Set([...current.technicalSkills.tools, ...(extracted.technicalSkills?.tools || [])])),
              other: Array.from(new Set([...current.technicalSkills.other, ...(extracted.technicalSkills?.other || [])])),
            },
            softSkills: Array.from(new Set([...current.softSkills, ...(extracted.softSkills || [])])),
            achievements: extracted.achievements && extracted.achievements.length > 0
              ? [...extracted.achievements, ...current.achievements]
              : current.achievements,
            certifications: extracted.certifications && extracted.certifications.length > 0
              ? [...extracted.certifications, ...current.certifications]
              : current.certifications,
            additionalInfo: {
              languages: Array.from(new Set([...current.additionalInfo.languages, ...(extracted.additionalInfo?.languages || [])])),
              volunteerExperience: Array.from(new Set([...(current.additionalInfo.volunteerExperience || []), ...(extracted.additionalInfo?.volunteerExperience || [])])),
              extracurriculars: Array.from(new Set([...(current.additionalInfo.extracurriculars || []), ...(extracted.additionalInfo?.extracurriculars || [])])),
              interests: Array.from(new Set([...(current.additionalInfo.interests || []), ...(extracted.additionalInfo?.interests || [])])),
            },
          };
          return { resume: updated };
        }),
    }),
    {
      name: 'resume-ai-storage-v1',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({
        resume: state.resume,
        zoomLevel: state.zoomLevel,
        activeInputTab: state.activeInputTab,
      }),
    }
  )
);
