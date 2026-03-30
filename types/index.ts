export interface Project {
  id: number;
  title: string;
  category: string;
  status: string;
  summary: string;
  tech: string[];
  link: string;
  highlights: string[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  desc: string[];
  tags: string[];
}