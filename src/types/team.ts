export type QuickStat = { number: string; label: string };
export type Tag = { icon: string; label: string };
export type Highlight = { icon: string; number: string; label: string };
export type TimelineEntry = { period: string; title: string; company: string; description: string };
export type EducationEntry = { period: string; degree: string; institution: string; description: string };
export type Certification = { title: string; detail: string };
export type KeyStrength = { icon: string; title: string; description: string };
export type ProjectExperienceItem = { icon: string; title: string; description: string };

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  photo: string;
  initials: string;
  email: string;
  phone: string;
  location: string;
  quickStats: QuickStat[];
  leadQuote: string;
  bioParagraphs: string[];
  philosophyQuote: string;
  competencies: Tag[];
  highlights: Highlight[];
  careerTimeline: TimelineEntry[];
  education: EducationEntry[];
  certifications: Certification[];
  developmentBullets: string[];
  keyStrengths: KeyStrength[];
  projectExperience: ProjectExperienceItem[];
  projectTags: string[];
  socials: { linkedin: string; twitter: string; instagram: string };
};

export type RosterEntry = { id: string; hierarchy: number; order: number };
