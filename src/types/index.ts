export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies?: string[];
  location?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
  gpa?: number;
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    phone?: string;
    location?: string;
    avatar?: string;
    resume?: string;
  };
  socials: Social[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}