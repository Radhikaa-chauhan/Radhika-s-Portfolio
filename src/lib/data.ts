export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  language: string;
  languageColor: string;
  forks: number;
  githubUrl: string;
  liveUrl?: string;
  category: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  dateRange: string;
  description: string;
  techStack: string[];
  type: 'work' | 'education' | 'freelance';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

// Navigation
export const navItems: NavItem[] = [
  { label: 'Overview', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

// Social Links
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/radhikaa-chauhan', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/full-stack-radhikachauhan/', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://x.com/Radhikacha05', icon: 'twitter' },
  { name: 'Email', url: 'mailto:radhikachauhanrc1980@gmail.com', icon: 'email' },
];

// Projects
export const projects: Project[] = [
  {
    id: 'mergathon-dashboard',
    name: 'Mergathon Dashboard',
    description: 'Built a real-time leaderboard dashboard tracking contributor PRs, issues, and team scores for the CircuitVerse open-source hackathon; engineered a cron-driven ETL pipeline via GitHub Actions that fetches and transforms GitHub data automatically with ETag-based conditional requests to stay within API rate limits.',
    techStack: ['Next.js', 'YAML', 'GitHub Actions'],
    language: 'TypeScript',
    languageColor: '#3178C6',
    forks: 13,
    githubUrl: 'https://github.com/Radhikaa-chauhan/mergathon-dashboard',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: 'ping-md',
    name: 'PingMD',
    description: ' Built and deployed a full-stack doctor appointment booking platform with real-time availability scheduling, doctor profiles, and a responsive booking flow, structured as a monorepo with separate frontend/ (Next.js App Router) and server/ (Node.js + Express REST API) directories.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
    language: 'TypeScript',
    languageColor: '#3572A5',
    forks: 0,
    githubUrl: 'https://github.com/Radhikaa-chauhan/PingMD',
    category: 'AI/ML',
    featured: true,
  },
  {
    id: 'watcher',
    name: 'Watcher',
    description: 'Developer social platform with real-time chat, project showcases, and collaboration tools. Full-stack Next.js application.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL'],
    language: 'TypeScript',
    languageColor: '#3178C6',
    forks: 0,
    githubUrl: 'https://github.com/Radhikaa-chauhan/watcher',
    category: 'AI/ML',
    featured: true,
  },
  {
    id: 'nextin-dashboard',
    name: 'Nextin',
    description: 'Developed a modern web platform using Next.js App Router and TypeScript with reusable components, dynamic routing, and optimized rendering..',
    techStack: ['Next.js', 'TypeScript'],
    language: 'TypeScript',
    languageColor: '#3178C6',
    forks: 0,
    githubUrl: 'https://github.com/Radhikaa-chauhan/Nextin',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: 'social-rails-api',
    name: 'Social Rails API',
    description: 'A secure RESTful API built with Ruby on Rails 8.1.2 that uses JSON Web Tokens (JWT) for authentication. This API serves as the backend for a social media platform where users can register, login, and create posts.',
    techStack: ['Ruby on Rails', 'JSON Web Tokens (JWT)'],
    language: 'Ruby',
    languageColor: '#701516',
    forks: 0,
    githubUrl: 'https://github.com/Radhikaa-chauhan/socials-api-rails',
    category: 'Backend',
    featured: true,
  },
];

// Skills
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus,
  SiReact, SiNextdotjs, SiHtml5, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiFastapi, SiGraphql,
  SiPostgresql, SiMongodb, SiRedis, SiPrisma,
  SiLangchain, SiOpenai, SiScikitlearn, SiTensorflow,
  SiGit, SiDocker, SiPostman, SiLinux,
} from 'react-icons/si';
import { IconType } from 'react-icons';
import { VscVscode } from 'react-icons/vsc';

export type SkillCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'AI / ML' | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  icon: IconType;
}

export const skillCategories: SkillCategory[] = [
  'Languages', 'Frontend', 'Backend', 'Database', 'AI / ML', 'Tools',
];

export const skills: Skill[] = [
  // Languages
  { name: 'Python',      category: 'Languages', icon: SiPython },
  { name: 'JavaScript',  category: 'Languages', icon: SiJavascript },
  { name: 'TypeScript',  category: 'Languages', icon: SiTypescript },
  { name: 'SQL',         category: 'Languages', icon: SiPostgresql },
  { name: 'C++',         category: 'Languages', icon: SiCplusplus },
  // Frontend
  { name: 'React',         category: 'Frontend', icon: SiReact },
  { name: 'Next.js',       category: 'Frontend', icon: SiNextdotjs },
  { name: 'HTML / CSS',    category: 'Frontend', icon: SiHtml5 },
  { name: 'Tailwind CSS',  category: 'Frontend', icon: SiTailwindcss },
  { name: 'Framer Motion', category: 'Frontend', icon: SiFramer },
  // Backend
  { name: 'Node.js',    category: 'Backend', icon: SiNodedotjs },
  { name: 'Express.js', category: 'Backend', icon: SiExpress },
  { name: 'FastAPI',    category: 'Backend', icon: SiFastapi },
  { name: 'REST APIs',  category: 'Backend', icon: VscVscode },
  { name: 'GraphQL',    category: 'Backend', icon: SiGraphql },
  // Database
  { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql },
  { name: 'MongoDB',    category: 'Database', icon: SiMongodb },
  { name: 'Redis',      category: 'Database', icon: SiRedis },
  { name: 'Prisma',     category: 'Database', icon: SiPrisma },
  // AI / ML
  { name: 'LangChain',   category: 'AI / ML', icon: SiLangchain },
  { name: 'OpenAI API',  category: 'AI / ML', icon: SiOpenai },
  { name: 'Scikit-learn',category: 'AI / ML', icon: SiScikitlearn },
  { name: 'TensorFlow',  category: 'AI / ML', icon: SiTensorflow },
  // Tools
  { name: 'Git',     category: 'Tools', icon: SiGit },
  { name: 'Docker',  category: 'Tools', icon: SiDocker },
  { name: 'Postman', category: 'Tools', icon: SiPostman },
  { name: 'Linux',   category: 'Tools', icon: SiLinux },
];

export const otherSkills = [
  'Data Structures', 'Algorithms', 'System Design',
  'REST APIs', 'GraphQL', 'Docker', 'Git', 'CI/CD', 'Canva',
];

// Experience
export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Member',
    company: 'Circuitverse',
    dateRange: 'Jan 2026 — Present',
    description: ' Contributing to CircuitVerse, a production open-source digital logic simulator with 1.2k+ GitHub stars, submitting merged PRs fixing bugs and improving core functionality across Ruby on Rails, JavaScript, and Vue.js.',
    techStack: ['Javascript','typescript','Ruby on rails'],
    type: 'work',
  },
  {
    id: 'exp-2',
    role: 'Hacktober Fest Contributor',
    company: 'Hacktober Fest',
    dateRange: 'Oct 2025 — Oct 2025',
    description: '  Contributed to multiple open-source projects, earned the Highest Contribution Badge for volume and quality of merged pull requests across diverse repositories.',
    techStack: ['Javascript','typescript','C++'],
    type: 'work',
  },
  {
    id: 'exp-3',
    role: 'Core Lead',
    company: 'Elixir Tech Community',
    dateRange: '2025 — 2026',
    description: 'Spearheaded and managed the technical division, orchestrating hackathons and workshops and fostering a vibrant campus community through innovation and collaboration.',
    techStack: ['Leadership', 'Project Management', 'Team Collaboration'],
    type: 'work',
  },
];

// GitHub Stats
export const githubStats = {
  username: 'Radhikaa-chauhan',
  displayName: 'Radhika',
  repositories: 56,
  contributions: 142,
  pullRequests: 24,
  issues: 18,
  followers: 89,
  following: 34,
};

// Terminal lines for typing effect
export const terminalLines = [
  '$ Radhika.exe --init',
  '',
  'Initializing developer profile...',
  'Loading skills, projects & experience...',
  '',
  'System ready! 🚀',
];

// ASCII Art
export const asciiArt = `
    ██████╗  █████╗ ██████╗ ██╗  ██╗██╗██╗  ██╗ █████╗
    ██╔══██╗██╔══██╗██╔══██╗██║  ██║██║██║ ██╔╝██╔══██╗
    ██████╔╝███████║██║  ██║███████║██║█████╔╝ ███████║
    ██╔══██╗██╔══██║██║  ██║██╔══██║██║██╔═██╗ ██╔══██║
    ██║  ██║██║  ██║██████╔╝██║  ██║██║██║  ██╗██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝
`;

// Contribution heatmap data generator
export function generateHeatmapData(): number[][] {
  const weeks = 52;
  const days = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      const rand = Math.random();
      if (rand < 0.3) week.push(0);
      else if (rand < 0.5) week.push(1);
      else if (rand < 0.7) week.push(2);
      else if (rand < 0.85) week.push(3);
      else week.push(4);
    }
    data.push(week);
  }
  return data;
}

// Months for heatmap
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Tech stack icons mapping
export const techStackIcons: Record<string, { icon: string; color: string }> = {
  Python: { icon: '🐍', color: '#3572A5' },
  JavaScript: { icon: 'JS', color: '#F7DF1E' },
  TypeScript: { icon: 'TS', color: '#3178C6' },
  React: { icon: '⚛️', color: '#61DAFB' },
  'Next.js': { icon: 'N', color: '#FFFFFF' },
  'Node.js': { icon: '⬢', color: '#339933' },
  PostgreSQL: { icon: '🐘', color: '#336791' },
  'Tailwind CSS': { icon: '🌊', color: '#06B6D4' },
  Git: { icon: '', color: '#F05032' },
  Docker: { icon: '🐳', color: '#2496ED' },
  LangChain: { icon: '🦜', color: '#1C3C3C' },
  OpenAI: { icon: '🤖', color: '#412991' },
};
