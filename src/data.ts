import { Project, Experience, SkillGroup, Certificate } from "./types";

export const CONTACT_INFO = {
  name: "KHAN ABDULLAH",
  title: "PHP & Full Stack Developer",
  email: "khan123personal@gmail.com",
  phone: "+91 749-918-3353",
  location: "Aurangabad, India",
  github: "https://github.com/khan123personal", // styled dynamically
  linkedin: "https://linkedin.com",
};

export const EDUCATION_LIST = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Dr. Babasaheb Ambedkar Marathwada University, Aurangabad",
    period: "2023 – Present",
    details: "Relevant Courses: Diploma in Software Development (DSD), Data Science, PHP Development",
  },
  {
    degree: "HSC Board (Science)",
    institution: "Government College of Arts & Science, Aurangabad",
    period: "2020 – 2021",
    details: "Focus in Mathematics, Physics, Chemistry, and Logic",
  },
  {
    degree: "SSC Board",
    institution: "Scholars' English School, Aurangabad",
    period: "2018",
    details: "Completed with Distinction",
  }
];

export const EXPERIENCE_LIST: Experience[] = [
  {
    id: "exp-1",
    role: "Full Stack Developer",
    company: "Bilim Technologies",
    location: "Aurangabad",
    period: "April 2025 – Present",
    isCurrent: true,
    highlights: [
      "Developed and maintained company websites, dashboards, and internal tools using Laravel, PHP, JavaScript, and Blade templates.",
      "Built responsive frontend interfaces with Bootstrap and Tailwind CSS paired with robust and secure PHP backends.",
      "Optimized database queries and improved application performance with caching strategies and performance optimizations."
    ],
    skillsUsed: ["PHP", "Laravel", "JavaScript", "Tailwind CSS", "Bootstrap", "MySQL", "Caching"]
  },
  {
    id: "exp-2",
    role: "Web Developer Intern",
    company: "Bilim Technologies",
    location: "Aurangabad",
    period: "May 2024 – November 2024",
    isCurrent: false,
    highlights: [
      "Maintained core PHP web services and implemented new feature modules for active production applications.",
      "Developed secure API endpoints using RESTful architecture with proper JWT authentication and request validation.",
      "Collaborated heavily on UI/UX improvements and integrated dynamic front-end components with back-end APIs."
    ],
    skillsUsed: ["PHP", "REST APIs", "JWT Auth", "Bootstrap", "MySQL", "UI/UX Tuning"]
  },
  {
    id: "exp-3",
    role: "Frontend Developer Intern",
    company: "Iotee Solution",
    location: "Remote",
    period: "July 2024 – August 2024",
    isCurrent: false,
    highlights: [
      "Developed responsive frontend components using Vue.js and Quasar Framework.",
      "Built intuitive, accessible user interfaces and integrated them seamlessly with REST APIs.",
      "Implemented real-time features and contributed to a live-updating vehicle tracking dashboard application."
    ],
    skillsUsed: ["Vue.js", "Quasar", "HTML5", "CSS3", "JavaScript", "Real-time updates"]
  }
];

export const PROJECTS_LIST: Project[] = [
  {
    id: "proj-freelanceforge",
    title: "FreelanceForge (Monorepo)",
    subtitle: "Unified Freelance Management Platform",
    category: "Full Stack",
    description: [
      "Architected FreelanceForge as a unified, high-performing monorepo platform for managing freelancer projects and direct team contract collaborations.",
      "Crafted full-responsive frontend using Next.js 14+ with React 18, GSAP smooth scroll canvas, Three.js coordinates, and Tailwinds.",
      "Constructed Node.js 20 LTS + Express.js backend backend securing accounts via JWT, bcrypt, and prisma client connection pooling under a PostgreSQL database."
    ],
    technologies: ["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Prisma", "GSAP", "Tailwind"],
    stats: [
      { label: "Architecture", value: "Monorepo" },
      { label: "Build Tool", value: "Turborepo" },
      { label: "Deployment", value: "Vercel" }
    ]
  },
  {
    id: "proj-sofacraft",
    title: "SofaCraft Mobile",
    subtitle: "Automatic Quotation Generator App",
    category: "Mobile UI",
    description: [
      "Created a robust mobile application for furniture manufacturers enabling instantaneous catalog-style automatic quotation generation from Android and iOS mobile devices.",
      "Integrated secure storage, dynamic PDF generation layout formats (using PDFKit), reactive client caches, and instant image pipeline uploads."
    ],
    technologies: ["Flutter", "Dart", "Riverpod", "GoRouter", "Dio", "S3 Storage", "PDFKit"],
    stats: [
      { label: "Platform", value: "Android & iOS" },
      { label: "UX Flow", value: "Auto-quote" },
      { label: "State Mgmt", value: "Riverpod" }
    ]
  },
  {
    id: "proj-tracking",
    title: "Vehicle Tracking Dashboard",
    subtitle: "Real-time Geolocation Coordinator",
    category: "ERP & Systems",
    description: [
      "Engineered an interactive live tracking vehicle fleet dashboard with Mapbox/Leaflet open map layers integration.",
      "Established hot websocket updates pushing GPS tracks and telemetry streams dynamically without lag or frame skipping."
    ],
    technologies: ["Vue.js", "Quasar", "REST APIs", "Map rendering", "State syncing"],
    stats: [
      { label: "Sync rate", value: "< 250ms" },
      { label: "Framework", value: "Quasar Vue" },
      { label: "Scope", value: "Realtime Map" }
    ]
  },
  {
    id: "proj-campussync",
    title: "CampusSync ERP",
    subtitle: "Web & Desktop ERP Suite",
    category: "ERP & Systems",
    description: [
      "Engineered and maintained a multi-platform ERP solution for university student records and academic campus management.",
      "Engineered the responsive web interface in Laravel (PHP) and built a lightweight companion desktop workspace using Tauri (Rust)."
    ],
    technologies: ["Laravel", "Tauri", "Rust", "SQLite", "PostgreSQL", "React Native Template"],
    stats: [
      { label: "Web Framework", value: "Laravel PHP" },
      { label: "Desktop Bridge", value: "Tauri Rust" },
      { label: "Database", value: "PostgreSQL" }
    ]
  },
  {
    id: "proj-dashboard",
    title: "Internal Dashboard System",
    subtitle: "Secure Role-Based Admin Hub",
    category: "Frontend",
    description: [
      "Designed and integrated a robust corporate administrative operations portal with unified CRUD states and access level guards.",
      "Deployed role-based permissions, data-table exports, reporting widgets, and clean chart summaries."
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs", "Bootstrap UI", "JWT Auth"],
    stats: [
      { label: "Access level", value: "RBAC Admin" },
      { label: "UI Library", value: "Bootstrap" },
      { label: "API Design", value: "RESTful" }
    ]
  },
  {
    id: "proj-urdublog",
    title: "UrduBlog Platform",
    subtitle: "Bilingual CMS Engine",
    category: "Frontend",
    description: [
      "Designed and published a lightweight bilingual content management platform backing full right-to-left (RTL) Urdu layouts alongside standard Left-to-Right English.",
      "Includes instant drafts, category trees, clean SQLite structures, and active media management interfaces."
    ],
    technologies: ["PHP", "SQLite", "HTML/CSS", "Bootstrap", "RTL support"],
    stats: [
      { label: "Type", value: "Bilingual CMS" },
      { label: "DB Type", value: "SQLite File" },
      { label: "Text Support", value: "RTL & LTR" }
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript / ES6+", level: 92, iconName: "code-2" },
      { name: "PHP (OOP & MVC)", level: 90, iconName: "file-code" },
      { name: "Python", level: 80, iconName: "binary" },
      { name: "Java", level: 75, iconName: "coffee" },
      { name: "Rust", level: 68, iconName: "cpu" },
      { name: "C / C++", level: 70, iconName: "terminal" },
    ]
  },
  {
    category: "Frameworks & Frontend",
    items: [
      { name: "Laravel / Lumen", level: 92, iconName: "layers" },
      { name: "Tailwind CSS", level: 95, iconName: "palette" },
      { name: "Vue.js / Quasar", level: 88, iconName: "layout" },
      { name: "React / Vite", level: 85, iconName: "atom" },
      { name: "Node.js / Express", level: 82, iconName: "server" },
      { name: "Flutter", level: 75, iconName: "smartphone" },
    ]
  },
  {
    category: "Databases & Platforms",
    items: [
      { name: "MySQL / PostgreSQL", level: 90, iconName: "database" },
      { name: "MongoDB", level: 75, iconName: "database-backup" },
      { name: "SQLite", level: 85, iconName: "file-spreadsheet" },
      { name: "Git / GitHub", level: 88, iconName: "git-branch" },
      { name: "Postman / REST APIs", level: 92, iconName: "api" }, // mapped custom
      { name: "Tauri (Rust)", level: 72, iconName: "shield" },
    ]
  },
  {
    category: "Specialties & Data",
    items: [
      { name: "Admin Dashboard Design", level: 95, iconName: "layout-dashboard" },
      { name: "Database Design & Normalization", level: 88, iconName: "milestone" },
      { name: "Real-time Telemetry Updates", level: 82, iconName: "activity" },
      { name: "Power BI / Tableau Charts", level: 78, iconName: "bar-chart-3" },
    ]
  }
];

export const CERTIFICATES_LIST: Certificate[] = [
  {
    id: "cert-1",
    title: "Diploma in Software Development (DSD)",
    issuer: "Practical full-stack development program",
    date: "Dec 2024",
    details: "Focused on comprehensive full-stack workflows including PHP, MySQL, various modern frontend frameworks, and general software engineering core paradigms."
  },
  {
    id: "cert-2",
    title: "PHP Development Certificate",
    issuer: "Hands-on training curriculum",
    date: "April 2024",
    details: "Covering advanced PHP fundamentals, MVC design patterns, robust backend architecture logic, schema operations, and production-ready project modules."
  },
  {
    id: "cert-3",
    title: "Java Coding Competition",
    issuer: "Participation Certificate",
    date: "2023",
    details: "Demonstrated efficient programmatic problem-solving, advanced algorithmic thinking, and structural Java coding techniques under timed pressure."
  }
];
