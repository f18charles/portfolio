// Comprehensive portfolio data drawn directly from the developer's CV,
// Zone01 Kisumu engineering portfolio, and active project ecosystem.
// All fields are fully editable and live-synced via the /admin portal.

const defaultContent = {
  hero: {
    name: 'Favor Charles Owuor',
    role: 'Software Developer & AI-Native Engineer',
    tagline: 'Architecting resilient backend systems, distributed architectures, and AI-integrated software.',
    status: 'Available for Software Engineering Roles & Internships',
    stats: [
      { value: '7+', label: 'Projects Built' },
      { value: '100%', label: 'End-to-End Ownership' },
      { value: 'Zone01', label: 'Peer Engineering' },
    ],
  },
  about: {
    intro:
      "I'm a software developer with a strong foundation in algorithmic programming, statistical thinking, and scalable system design. Currently advancing through Zone01 Kisumu, an intensive peer-to-peer coding collective focused on autonomous engineering and production-grade software.",
    bio: "Most of my engineering sits at the foundation — Go (Golang), Python (Django/FastAPI), PostgreSQL, REST APIs, and high-concurrency WebSockets — expanding smoothly into React and TypeScript when building dynamic user interfaces. I pride myself on owning systems from database schema and transactional isolation to automated CI/CD pipelines and cloud deployments.",
    skillCategories: [
      {
        name: 'Backend & Systems',
        color: 'cobalt',
        skills: [
          'Go (Golang)',
          'Python',
          'Django',
          'Gin Framework',
          'GORM',
          'RESTful APIs',
          'WebSockets',
          'JWT & Auth Architecture',
          'Concurrency & Race Prevention',
        ],
      },
      {
        name: 'Frontend & UI',
        color: 'violet',
        skills: [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Framer Motion',
          'Vite',
          'State Management',
          'Responsive Design',
        ],
      },
      {
        name: 'Databases & DevOps',
        color: 'signal',
        skills: [
          'PostgreSQL',
          'SQLite',
          'Prisma ORM',
          'Docker',
          'GitHub Actions (CI/CD)',
          'Vercel',
          'Supabase',
          'Firebase',
        ],
      },
      {
        name: 'AI & Data Engineering',
        color: 'cyan',
        skills: [
          'Google Gemini API',
          'Statistical Analysis',
          'LLM Integration',
          'Prompt Engineering',
          'Data Modeling',
        ],
      },
    ],
    skills: [
      'Go',
      'Python / Django',
      'React',
      'TypeScript',
      'PostgreSQL',
      'REST APIs',
      'WebSockets',
      'JWT / Auth',
      'Docker',
      'CI/CD',
      'Google Gemini AI',
      'Tailwind CSS',
      'GORM',
      'Prisma',
    ],
    education: [
      {
        degree: 'Software Engineering Programme',
        institution: 'Zone01 Kisumu · Peer-to-Peer & Project-Based Engineering',
        period: '2024 – Present',
        status: 'Currently Enrolled',
        description:
          'Deep dive into systems programming, distributed microservices, network protocols, concurrency, and collaborative agile engineering.',
      },
      {
        degree: 'BSc. Statistics & Programming',
        institution: 'University',
        period: 'In Progress',
        status: 'Deferred – Year 2',
        description:
          'Mathematical foundations in statistical modeling, computational probability, analytical reasoning, and algorithmic logic.',
      },
      {
        degree: 'Beginner Software Development',
        institution: 'Modcom Institute of Technology',
        period: 'Certified',
        status: 'Completed',
        description:
          'Core foundational software development principles, web architecture, and object-oriented programming.',
      },
    ],
    attributes: [
      'Strong analytical, mathematical & statistical problem-solving ability',
      'Comfortable owning a project end to end: database schema to deployment pipeline',
      'Rigorous attention to detail in code quality, concurrency safety, and documentation',
      'Quick autonomous learner with a self-driven, collaborative work ethic',
    ],
  },
  projects: [
    {
      id: 'piggy-bank',
      title: 'Piggy Bank — Personal Finance Tracker',
      category: 'Full-Stack & Backend',
      description:
        'A comprehensive personal finance tracker built solo end to end. Features multi-account ledgering, budget tracking, transaction categorization, and an aggregated analytical insights endpoint delivering net worth and spending health in a single query.',
      highlights: [
        'Built a RESTful API in Go (Gin, GORM, PostgreSQL) with JWT access & refresh token rotation',
        'Aggregated insights endpoint calculating net worth, cash flow velocity, and budget health',
        'Implemented concurrency test suite using Go race detector, resolving transactional isolation bugs prior to production',
        'Configured CI/CD with GitHub Actions and deployed independent frontend/backend instances on Vercel',
      ],
      tags: ['Go', 'Gin', 'PostgreSQL', 'React', 'JWT Auth', 'GitHub Actions', 'Vercel', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/piggy-bank',
      liveUrl: 'https://piggy-bank-f18charles.vercel.app',
      link: 'https://github.com/f18charles/piggy-bank',
      featured: true,
      hidden: false,
    },
    {
      id: 'social-network',
      title: 'Social Network — Real-Time Platform',
      category: 'Distributed Systems',
      description:
        'A high-concurrency collaborative social platform. Led the Go backend architecture, implementing real-time WebSocket communication hubs for instant group/private messaging, live notifications, dynamic feeds, and granular post privacy controls.',
      highlights: [
        'Architected bi-directional WebSocket hub in Go handling concurrent messaging and live event streams',
        'Engineered relational database schema supporting followers, private posts, and custom close-friends filters',
        'Built reactive React interfaces with live state synchronization and cookie/session security',
        'Containerized multi-service environment with Docker for reproducible local and cloud testing',
      ],
      tags: ['Go', 'WebSockets', 'PostgreSQL', 'SQLite', 'React', 'Docker', 'Concurrency'],
      githubUrl: 'https://github.com/f18charles/social-network',
      liveUrl: '',
      link: 'https://github.com/f18charles/social-network',
      featured: true,
      hidden: false,
    },
    {
      id: 'micro-seed',
      title: 'MicroSeed — AI Microfinance Underwriting',
      category: 'AI & FinTech',
      description:
        'A next-generation microloan evaluation platform engineered for emerging markets. Leverages Google Gemini AI to analyze unstructured business narratives, trade patterns, and cash flow data to assess merchant creditworthiness beyond standard credit scores.',
      highlights: [
        'Integrated Google Gemini AI for contextual credit assessment, growth forecasting, and fraud detection',
        'Designed digital guarantor verification workflow and automated loan lifecycle state machines',
        'Crafted responsive interface with React 18, Tailwind CSS, Framer Motion, and Firebase backend',
      ],
      tags: ['React', 'Gemini AI', 'Firebase', 'FinTech', 'Framer Motion', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/micro-seed',
      liveUrl: 'https://micro-seed.vercel.app',
      link: 'https://github.com/f18charles/micro-seed',
      featured: true,
      hidden: false,
    },
    {
      id: 'bloom-productivity',
      title: 'Bloom — Gamified Habit & Workflow Engine',
      category: 'Full-Stack',
      description:
        'A gamified productivity platform combining habit cultivation with interactive Kanban task management, XP rewards, leveling progression, and bi-directional Google Calendar synchronization.',
      highlights: [
        'Dynamic Kanban workflow with subtask pipelines, priority filters, and milestone badges',
        'Google Calendar API integration for synchronized deadlines and schedule alerts',
        'Engineered with Node.js/Express backend, Prisma ORM, and PostgreSQL (Neon)',
      ],
      tags: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'Google Calendar API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/bloom',
      liveUrl: 'https://bloom-productivity.vercel.app',
      link: 'https://github.com/f18charles/bloom',
      featured: false,
      hidden: false,
    },
    {
      id: 'articulate',
      title: 'Articulate — AI Speech & Diction Trainer',
      category: 'AI & Audio UX',
      description:
        'An offline-first vocal articulation platform based on theatrical speaker warmups (Pencil drill jaw locking, phoneme tongue twisters, and visual pacing metronome) augmented with dynamic Gemini AI challenge generation.',
      highlights: [
        'Serverless Gemini 3.5 Flash integration generating targeted speaking challenges by difficulty and topic',
        'Interactive audio/visual pacing metronome (50–180 BPM) with immediate self-rating feedback',
        'Privacy-first architecture with persistent local-first browser storage and zero audio uploads',
      ],
      tags: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS', 'Vocal Coaching'],
      githubUrl: 'https://github.com/f18charles/articulate',
      liveUrl: 'https://articulate-speech.vercel.app',
      link: 'https://github.com/f18charles/articulate',
      featured: false,
      hidden: false,
    },
    {
      id: 'bulksend',
      title: 'BulkSend — In-Browser Carrier SMS Dispatcher',
      category: 'Utilities',
      description:
        'A zero-backend browser-based SMS campaign orchestrator. Automatically parses spreadsheet data and utilizes client-side QR deep links to trigger native phone SIM messaging with zero subscription fees and total data privacy.',
      highlights: [
        'Auto-parses raw clipboard/CSV spreadsheet rows with phone format sanitization',
        'Generates offline QR payloads deep-linking to native mobile SMS applications',
        'Eliminates third-party SMS API fees and guarantees sensitive contact lists never leave the client',
      ],
      tags: ['React', 'Deep Linking', 'QR Encoding', 'Privacy-First', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/bulksend',
      liveUrl: 'https://bulksend.vercel.app',
      link: 'https://github.com/f18charles/bulksend',
      featured: false,
      hidden: false,
    },
    {
      id: 'tempus-vox',
      title: 'TempusVox — Presentation Timing Stopwatch',
      category: 'Utilities',
      description:
        'A professional stage timing stopwatch engineered for Toastmasters and presenters. Provides dynamic tri-color visual coaching intervals, a clutter-free Zen Mode, and persistent speaker evaluation logs.',
      highlights: [
        'Dynamic tri-color visual feedback intervals (White → Yellow → Green → Red alarm)',
        'Distraction-free Zen Mode presenting a pulsing concentric circular countdown',
        'Local storage persistence for speaker logs, note annotations, and duration metrics',
      ],
      tags: ['JavaScript', 'Tailwind CSS', 'Local Storage', 'UI/UX Design'],
      githubUrl: 'https://github.com/f18charles/tempus-vox',
      liveUrl: 'https://tempus-vox.vercel.app',
      link: 'https://github.com/f18charles/tempus-vox',
      featured: false,
      hidden: false,
    },
  ],
  contact: {
    email: 'f.18charles@gmail.com',
    github: 'https://github.com/f18charles',
    linkedin: 'https://linkedin.com/in/favor-owuor-39a31a29b/',
    message:
      'Open to software engineering roles, backend positions, and internships where I can build reliable, impactful software. Whether you have a project in mind, an opportunity to discuss, or just want to connect — say hello.',
  },
}

export default defaultContent
