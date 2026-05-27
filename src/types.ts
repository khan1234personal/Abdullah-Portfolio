export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Full Stack" | "Frontend" | "Mobile UI" | "ERP & Systems";
  description: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  skillsUsed: string[];
  isCurrent: boolean;
}

export interface SkillItem {
  name: string;
  level: number; // percentage or strength
  iconName: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  details: string;
}
