// Comprehensive portfolio data drawn directly from the developer's CV,
// Zone01 Kisumu engineering portfolio, and active project ecosystem.
// All fields are fully editable and live-synced via the /admin portal.

const defaultContent = {
  hero: {
    name: 'Favor Charles Owuor',
    role: 'Backend & Systems Software Engineer',
    tagline:
      'I build Go APIs, real-time systems, and AI-integrated apps — and ship them end to end, from schema design to deployment.',
    status: 'Available for Software Engineering Roles & Internships',
    photoUrl: '/me.png',
    resumeUrl: '/Favor_Charles_Owuor_Resume.pdf',
    stats: [
      { value: 'Solo', label: 'Shipped a production Go API' },
      { value: '~30%', label: 'Commits on a 6-person team' },
      { value: 'Race-tested', label: 'Go concurrency & CI/CD' },
    ],
  },
  about: {
    intro:
      "I'm a backend-focused software developer with a foundation in algorithmic programming, statistical thinking, and scalable system design. Currently advancing through Zone01 Kisumu, an intensive peer-to-peer coding collective focused on autonomous engineering and production-grade software.",
    bio: "Most of my engineering sits at the foundation — Go (Golang), Python, PostgreSQL, REST APIs, and high-concurrency WebSockets — expanding into React and TypeScript when the product needs a UI. I own systems from database schema and transactional isolation to automated CI/CD pipelines and cloud deployments.",
    photoUrl: '/me.png',
    hobbies: [
      {
        name: 'Open Source & Dev Communities',
        icon: 'code',
        description:
          'Contributing to developer tooling, reviewing peers\u2019 pull requests, and learning in public through community build sessions.',
      },
      {
        name: 'Chess & Strategy Games',
        icon: 'crown',
        description:
          'A daily habit I use to sharpen pattern recognition, long-horizon planning, and calm decision-making under pressure.',
      },
      {
        name: 'Public Speaking & Rhetoric',
        icon: 'mic',
        description:
          'Trained through Toastmasters-style practice. I coach articulation and stage presence, which inspired my Articulate app.',
      },
      {
        name: 'Football & Running',
        icon: 'activity',
        description:
          'Five-a-side football and long-distance runs keep me disciplined, energetic, and used to working as part of a team.',
      },
      {
        name: 'Reading & Technical Writing',
        icon: 'book',
        description:
          'I read systems-design literature, sci-fi, and essays, then distill what I learn into articles for other engineers.',
      },
      {
        name: 'Music & Audio',
        icon: 'music',
        description:
          'Exploring audio engineering and rhythm is a creative counterweight to backend work and shaped my first audio app.',
      },
    ],
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
        period: '2026 – Present',
        status: 'Currently Enrolled',
        description:
          'Systems programming, distributed services, network protocols, concurrency, and collaborative agile engineering.',
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
      title: 'Piggy Bank — Personal Finance API',
      type: 'Personal',
      category: 'Backend & Full-Stack',
      period: '2026',
      role: 'Solo developer',
      metrics: ['5 REST resources', '~95% of commits', 'Race-detector tested'],
      description:
        'A personal finance tracker built solo end to end: multi-account ledgering, budgets, transaction categorization, and an aggregated insights endpoint that returns net worth and spending health in one query.',
      highlights: [
        'Built a RESTful API in Go (Gin, GORM, PostgreSQL) with JWT access & refresh token rotation and full CRUD across 5 core resources',
        'Aggregated insights endpoint computing net worth, cash-flow velocity, and budget health in a single query',
        'Wrote a backend test suite with Go\u2019s race detector, catching a real transactional-isolation bug before production',
        'Set up CI/CD with GitHub Actions and deployed frontend and backend independently on Vercel',
      ],
      tags: ['Go', 'Gin', 'PostgreSQL', 'React', 'JWT Auth', 'GitHub Actions', 'Vercel'],
      githubUrl: 'https://github.com/f18charles/piggy-bank',
      liveUrl: 'https://piggy-bank-f18charles.vercel.app',
      link: 'https://github.com/f18charles/piggy-bank',
      featured: true,
      hidden: false,
    },
    {
      id: 'social-network',
      title: 'Social Network — Real-Time Platform',
      type: 'Team',
      category: 'Distributed Systems',
      period: '2026',
      role: 'Backend lead · 6-person team',
      metrics: ['~30% of commits', 'Real-time WebSockets', 'Auth & data models'],
      description:
        'A real-time social platform delivered inside the Zone01 engineering programme. I led backend development on a 6-person team, building the authentication and data-model foundation plus a WebSocket layer for live messaging and notifications.',
      highlights: [
        'Top contributor by commit volume (~30%) on a 6-person team, owning authentication, middleware, CORS, and the user, session, and follower models',
        'Built real-time chat and notifications end to end with WebSockets, across the Go backend and React frontend',
        'Designed a relational schema supporting followers, private posts, and close-friends filters',
        'Containerized the multi-service environment with Docker for reproducible local and cloud testing',
      ],
      tags: ['Go', 'WebSockets', 'PostgreSQL', 'React', 'Docker', 'Concurrency'],
      githubUrl: 'https://github.com/f18charles/social-network',
      liveUrl: '',
      link: 'https://github.com/f18charles/social-network',
      featured: true,
      hidden: false,
    },
    {
      id: 'micro-seed',
      title: 'MicroSeed — AI Microfinance Underwriting',
      type: 'Personal',
      category: 'AI & FinTech',
      role: 'Solo developer',
      description:
        'A microloan evaluation platform for emerging markets. Uses Google Gemini to analyze unstructured business narratives, trade patterns, and cash-flow data to assess merchant creditworthiness beyond standard credit scores.',
      highlights: [
        'Integrated Google Gemini for contextual credit assessment, growth forecasting, and fraud detection',
        'Designed a digital guarantor verification workflow and automated loan lifecycle state machines',
        'Built the interface with React 18, Tailwind CSS, Framer Motion, and a Firebase backend',
      ],
      tags: ['React', 'Gemini AI', 'Firebase', 'FinTech', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/micro-seed',
      liveUrl: 'https://micro-seed.vercel.app',
      link: 'https://github.com/f18charles/micro-seed',
      featured: false,
      hidden: false,
    },
    {
      id: 'bloom-productivity',
      title: 'Bloom — Gamified Habit & Workflow Engine',
      type: 'Personal',
      category: 'Full-Stack',
      role: 'Solo developer',
      description:
        'A gamified productivity platform combining habit cultivation with Kanban task management, XP rewards, leveling, and bi-directional Google Calendar sync.',
      highlights: [
        'Dynamic Kanban workflow with subtask pipelines, priority filters, and milestone badges',
        'Google Calendar API integration for synchronized deadlines and schedule alerts',
        'Engineered with a Node.js/Express backend, Prisma ORM, and PostgreSQL (Neon)',
      ],
      tags: ['React', 'Node.js', 'Prisma', 'PostgreSQL', 'Google Calendar API'],
      githubUrl: 'https://github.com/f18charles/bloom',
      liveUrl: 'https://bloom-productivity.vercel.app',
      link: 'https://github.com/f18charles/bloom',
      featured: false,
      hidden: false,
    },
    {
      id: 'articulate',
      title: 'Articulate — AI Speech & Diction Trainer',
      type: 'Personal',
      category: 'AI & Audio UX',
      role: 'Solo developer',
      description:
        'An offline-first vocal articulation trainer based on theatrical speaker warmups (jaw-locking drills, phoneme tongue twisters, and a visual pacing metronome), augmented with Gemini-generated challenges.',
      highlights: [
        'Serverless Gemini integration generating speaking challenges by difficulty and topic',
        'Interactive audio/visual metronome (50–180 BPM) with immediate self-rating feedback',
        'Privacy-first design: persistent local-first browser storage and zero audio uploads',
      ],
      tags: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS'],
      githubUrl: 'https://github.com/f18charles/articulate',
      liveUrl: 'https://articulate-speech.vercel.app',
      link: 'https://github.com/f18charles/articulate',
      featured: false,
      hidden: false,
    },
    {
      id: 'bulksend',
      title: 'BulkSend — In-Browser Carrier SMS Dispatcher',
      type: 'Personal',
      category: 'Utilities',
      role: 'Solo developer',
      description:
        'A zero-backend browser-based SMS campaign orchestrator. Parses spreadsheet data and uses client-side QR deep links to trigger native phone SMS — no subscription fees and no data leaving the client.',
      highlights: [
        'Auto-parses raw clipboard/CSV rows with phone-format sanitization',
        'Generates offline QR payloads deep-linking to native mobile SMS apps',
        'Eliminates third-party SMS API fees and keeps contact lists client-side',
      ],
      tags: ['React', 'Deep Linking', 'QR Encoding', 'Privacy-First'],
      githubUrl: 'https://github.com/f18charles/bulksend',
      liveUrl: 'https://bulksend.vercel.app',
      link: 'https://github.com/f18charles/bulksend',
      featured: false,
      hidden: false,
    },
    {
      id: 'tempus-vox',
      title: 'TempusVox — Presentation Timing Stopwatch',
      type: 'Personal',
      category: 'Utilities',
      role: 'Solo developer',
      description:
        'A stage timing stopwatch for Toastmasters and presenters, with tri-color visual coaching intervals, a clutter-free Zen Mode, and persistent speaker evaluation logs.',
      highlights: [
        'Tri-color visual feedback intervals (white → yellow → green → red alarm)',
        'Distraction-free Zen Mode with a pulsing concentric circular countdown',
        'Local-storage persistence for speaker logs, notes, and duration metrics',
      ],
      tags: ['JavaScript', 'Tailwind CSS', 'Local Storage', 'UI/UX'],
      githubUrl: 'https://github.com/f18charles/tempus-vox',
      liveUrl: 'https://tempus-vox.vercel.app',
      link: 'https://github.com/f18charles/tempus-vox',
      featured: false,
      hidden: false,
    },
  ],
  // Article templates. Hidden by default until a real post URL is set in /admin,
  // so the public site never links to an empty profile or a 404.
  articles: [
    {
      id: 'race-free-go-transactions',
      title: 'Building a Race-Free Finance API in Go',
      excerpt:
        'How the Go race detector surfaced a transactional-isolation bug in Piggy Bank before it reached production, and the locking strategy that fixed it.',
      source: 'dev.to',
      date: '2026-05-18',
      readTime: '7 min read',
      tags: ['Go', 'PostgreSQL', 'Concurrency'],
      url: '',
      featured: false,
      hidden: true,
    },
    {
      id: 'websocket-hub-design',
      title: 'Designing a WebSocket Hub for Real-Time Messaging',
      excerpt:
        'Notes from leading the backend of a 6-person social platform: connection pools, fan-out delivery, presence tracking, and graceful reconnects.',
      source: 'dev.to',
      date: '2026-04-02',
      readTime: '9 min read',
      tags: ['Go', 'WebSockets', 'System Design'],
      url: '',
      featured: false,
      hidden: true,
    },
    {
      id: 'gemini-credit-scoring',
      title: 'Using Gemini AI to Underwrite Microloans',
      excerpt:
        'Why unstructured business narratives carry signal that traditional credit scores miss, and how I modelled them for MicroSeed.',
      source: 'dev.to',
      date: '2026-03-11',
      readTime: '6 min read',
      tags: ['Gemini AI', 'FinTech', 'Prompt Engineering'],
      url: '',
      featured: false,
      hidden: true,
    },
    {
      id: 'offline-first-lessons',
      title: 'Why I Ship Offline-First: Lessons from Articulate',
      excerpt:
        'Privacy-first architecture is a feature, not a constraint. A case for keeping user data in the browser whenever the product allows it.',
      source: 'dev.to',
      date: '2026-02-07',
      readTime: '5 min read',
      tags: ['Privacy', 'React', 'Architecture'],
      url: '',
      featured: false,
      hidden: true,
    },
  ],
  contact: {
    email: 'f.18charles@gmail.com',
    github: 'https://github.com/f18charles',
    linkedin: 'https://linkedin.com/in/favor-owuor-39a31a29b/',
    // Dev.to and X are intentionally blank until real profile URLs are set in
    // /admin, so the public site never renders a broken/placeholder link.
    devto: '',
    x: '',
    resumeUrl: '/Favor_Charles_Owuor_Resume.pdf',
    resumeDocxUrl: '/Favor_Charles_Owuor_Resume.docx',
    message:
      'Open to software engineering roles, backend positions, and internships where I can build reliable, impactful software. Whether you have a project in mind, an opportunity to discuss, or just want to connect — say hello.',
  },
}

export default defaultContent
