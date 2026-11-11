export type TemplateId = 
  | 'minimalist' 
  | 'corporate' 
  | 'traditional' 
  | 'student' 
  | 'creative';

export type SectionKey = 
  | 'personalInfo'
  | 'summary'
  | 'education'
  | 'technicalSkills'
  | 'softSkills'
  | 'workExperience'
  | 'projects'
  | 'achievements'
  | 'certifications'
  | 'additionalInfo';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface Summary {
  content: string;
  careerObjective?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpaOrPercentage?: string;
  relevantCoursework?: string[];
}

export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  other: string[];
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  bullets: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface AdditionalInfo {
  languages: string[];
  volunteerExperience?: string[];
  extracurriculars?: string[];
  interests?: string[];
}

export interface ResumeMetadata {
  template: TemplateId;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  sectionOrder: SectionKey[];
  hiddenSections: SectionKey[];
  targetRole?: string;
  targetJobDescription?: string;
}

export interface ResumeData {
  id: string;
  updatedAt: string;
  metadata: ResumeMetadata;
  personalInfo: PersonalInfo;
  summary: Summary;
  education: EducationItem[];
  technicalSkills: TechnicalSkills;
  softSkills: string[];
  workExperience: WorkExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  additionalInfo: AdditionalInfo;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedAction?: 'apply_extracted_data' | 'clarify_missing_info';
  extractedData?: Partial<ResumeData>;
  questions?: string[];
}

export interface JobMatchAnalysis {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  tailoredSummarySuggestion?: string;
}
