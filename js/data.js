/*
 * Shared dummy data for the HECTOR School Student Hub mockup.
 * Single source for all three functionalities – keep everything consistent with persona_sebastian.md.
 * Function-specific data (catalogue, projects, feedback) is added below in its own section per step.
 */
window.HS = window.HS || {};

HS.data = {
  // Fixed sample "today" used by every function (ISO date, local time).
  today: '2026-11-12',

  // ---------------------------------------------------------------------------
  // Current student (persona: persona_sebastian.md)
  // ---------------------------------------------------------------------------
  student: {
    id: 'stu-001',
    firstName: 'Sebastian',
    lastName: 'Berger',
    initials: 'SB',
    age: 24,
    email: 'sebastian.berger@student.hectorschool.kit.edu',
    program: 'Master in Engineering and Management',
    school: 'KIT HECTOR School',
    studyMode: 'Part-time executive master',
    cohort: 'Cohort 2026/27',
    bachelor: "Bachelor's degree in Engineering",
    jobTitle: 'Full-Stack Developer',
    employer: 'Nexora IT Solutions GmbH',
    experience: '1–2 years',
    goals: [
      'Career advancement and stronger expertise in his current field',
      'Find out his limits, goals and strengths',
      'Confirmation of his career path',
      'Becoming a people leader at 30 (at the latest)'
    ],
    motivation: ['Growth', 'Recognition', 'Impact', 'Orientation'],
    careerInterests: ['Engineering', 'Project Management', 'Product Management', 'Consulting']
  },

  // ---------------------------------------------------------------------------
  // Lecturers (fictional)
  // ---------------------------------------------------------------------------
  lecturers: [
    { id: 'lec-albrecht',  name: 'Prof. Dr. Katrin Albrecht', field: 'Software Engineering' },
    { id: 'lec-reinhardt', name: 'Prof. Dr. Thomas Reinhardt', field: 'Strategic Management' },
    { id: 'lec-hoffmann',  name: 'Dr. Julia Hoffmann', field: 'Data Science' },
    { id: 'lec-keller',    name: 'Prof. Dr. Martin Keller', field: 'Project Management' },
    { id: 'lec-schuster',  name: 'Prof. Dr. Anna Schuster', field: 'Artificial Intelligence' },
    { id: 'lec-brandt',    name: 'Dr. Lukas Brandt', field: 'Innovation & Product Management' },
    { id: 'lec-wolf',      name: 'Prof. Dr. Stefan Wolf', field: 'IT Security' },
    { id: 'lec-dubois',    name: 'Dr. Claire Dubois', field: 'Negotiation & Communication' },
    { id: 'lec-larsen',    name: 'Prof. Dr. Henrik Larsen', field: 'Systems Engineering' },
    { id: 'lec-vogt',      name: 'Prof. Dr. Miriam Vogt', field: 'Corporate Finance' },
    { id: 'lec-meier',     name: 'Dr. Sophie Meier', field: 'Leadership & Communication' },
    { id: 'lec-clarke',    name: 'Emma Clarke, M.A.', field: 'Business English' },
    { id: 'lec-roth',      name: 'Daniel Roth', field: 'Sales Excellence' }
  ],

  // ---------------------------------------------------------------------------
  // Project partners: companies and associations (NGOs)
  // ---------------------------------------------------------------------------
  partners: [
    { id: 'org-sap',       name: 'SAP',                   type: 'Company',     industry: 'Enterprise Software' },
    { id: 'org-bmw',       name: 'BMW Group',             type: 'Company',     industry: 'Automotive' },
    { id: 'org-who',       name: 'WHO',                   type: 'NGO',         industry: 'Global Health' },
    { id: 'org-bosch',     name: 'Bosch',                 type: 'Company',     industry: 'Engineering & Technology' },
    { id: 'org-siemens',   name: 'Siemens Healthineers',  type: 'Company',     industry: 'Medical Technology' },
    { id: 'org-enbw',      name: 'EnBW',                  type: 'Company',     industry: 'Energy' },
    { id: 'org-unicef',    name: 'UNICEF',                type: 'NGO',         industry: "Children's Rights" },
    { id: 'org-redcross',  name: 'German Red Cross',      type: 'NGO',         industry: 'Humanitarian Aid' },
    { id: 'org-porsche',   name: 'Porsche',               type: 'Company',     industry: 'Automotive' },
    { id: 'org-db',        name: 'Deutsche Bahn',         type: 'Company',     industry: 'Mobility & Logistics' }
  ],

  // ---------------------------------------------------------------------------
  // Modules: 10 modules (5 engineering, 5 management), each 2 weeks.
  // Every module has exactly one company/NGO project (defined in Step 2).
  // ---------------------------------------------------------------------------
  modules: [
    { id: 'mod-e1', code: 'ENG-101', track: 'Engineering', title: 'Software Engineering & Cloud Architectures', lecturerId: 'lec-albrecht',  start: '2026-09-28', end: '2026-10-09' },
    { id: 'mod-m1', code: 'MGT-101', track: 'Management',  title: 'Strategic Management & Leadership',          lecturerId: 'lec-reinhardt', start: '2026-10-12', end: '2026-10-23' },
    { id: 'mod-e2', code: 'ENG-102', track: 'Engineering', title: 'Data Analytics & Machine Learning',          lecturerId: 'lec-hoffmann',  start: '2026-10-26', end: '2026-11-06' },
    { id: 'mod-m2', code: 'MGT-102', track: 'Management',  title: 'Project & Agile Management',                 lecturerId: 'lec-keller',    start: '2026-11-09', end: '2026-11-20' },
    { id: 'mod-e3', code: 'ENG-103', track: 'Engineering', title: 'Generative AI & Intelligent Systems',        lecturerId: 'lec-schuster',  start: '2026-11-23', end: '2026-12-04' },
    { id: 'mod-m3', code: 'MGT-103', track: 'Management',  title: 'Innovation & Product Management',            lecturerId: 'lec-brandt',    start: '2026-12-07', end: '2026-12-18' },
    { id: 'mod-e4', code: 'ENG-104', track: 'Engineering', title: 'Cybersecurity Engineering',                  lecturerId: 'lec-wolf',      start: '2027-01-04', end: '2027-01-15' },
    { id: 'mod-m4', code: 'MGT-104', track: 'Management',  title: 'Negotiation & Stakeholder Communication',    lecturerId: 'lec-dubois',    start: '2027-01-18', end: '2027-01-29' },
    { id: 'mod-e5', code: 'ENG-105', track: 'Engineering', title: 'Systems Engineering & Product Development',  lecturerId: 'lec-larsen',    start: '2027-02-01', end: '2027-02-12' },
    { id: 'mod-m5', code: 'MGT-105', track: 'Management',  title: 'Corporate Finance & Business Cases',         lecturerId: 'lec-vogt',      start: '2027-02-15', end: '2027-02-26' }
  ],

  // ---------------------------------------------------------------------------
  // Header notifications (link = in-page hash target, open = detail opened after navigating)
  // ---------------------------------------------------------------------------
  notifications: [
    { id: 'n1', icon: 'message-square', title: 'New feedback available', text: 'Dr. Julia Hoffmann shared feedback on your "Data Analytics & Machine Learning" final presentation.', time: '2 hours ago', link: '#grades', open: { type: 'feedback', id: 'act-siemens' }, unread: true },
    { id: 'n2', icon: 'calendar', title: 'Project week starts Monday', text: 'Your team project with BMW Group in "Project & Agile Management" starts on 16 Nov.', time: 'Yesterday', link: '#calendar', open: { type: 'project', id: 'prj-bmw' }, unread: true },
    { id: 'n3', icon: 'star', title: 'New recommendations', text: 'New courses match your skill profile.', time: '3 days ago', link: '#recommended', unread: false }
  ]
};

// =============================================================================
// Function 1 – Digital Learning Platform (function1_knowledge.md)
// =============================================================================
HS.data.learning = {
  budgetTotal: 1500,

  // Skill catalogue, grouped by category (spec §2.1).
  skillCatalog: [
    { category: 'Communication & Presentation', skills: ['Public Speaking', 'Storytelling', 'Body Language', 'Presentation Design'] },
    { category: 'Sales & Business',             skills: ['Challenger Sales', 'Negotiation', 'Stakeholder Management', 'Business English'] },
    { category: 'Organization & Leadership',    skills: ['Organization Skills', 'Time Management', 'Project Management', 'Team Leadership'] },
    { category: 'Technology & Data',            skills: ['Python', 'Cloud Fundamentals', 'AI/ML Basics', 'Data Analysis'] },
    { category: 'Methods',                      skills: ['Agile/Scrum', 'Design Thinking', 'Problem Solving'] }
  ],

  // Pre-filled skill profile (spec §2.1). Levels fit the persona: strong developer, early in management topics.
  initialSkills: [
    { name: 'Public Speaking',     level: 'Beginner' },
    { name: 'Challenger Sales',    level: 'Beginner' },
    { name: 'Organization Skills', level: 'Intermediate' },
    { name: 'Python',              level: 'Advanced' },
    { name: 'Project Management',  level: 'Beginner' }
  ],

  // Topic rows per category. Lecturer = HECTOR School faculty member who recorded the topic.
  topics: {
    'AI Chatbots':                   { category: 'tech',     lecturerId: 'lec-schuster', thumb: 1 },
    'Multi-Agent Systems':           { category: 'tech',     lecturerId: 'lec-albrecht', thumb: 2 },
    'Generative AI':                 { category: 'tech',     lecturerId: 'lec-schuster', thumb: 3 },
    'Data Analytics':                { category: 'tech',     lecturerId: 'lec-hoffmann', thumb: 4 },
    'Cybersecurity':                 { category: 'tech',     lecturerId: 'lec-wolf',     thumb: 5 },
    'Presentation':                  { category: 'personal', lecturerId: 'lec-meier',    thumb: 6 },
    'Body Language':                 { category: 'personal', lecturerId: 'lec-meier',    thumb: 2 },
    'Business Language':             { category: 'personal', lecturerId: 'lec-clarke',   thumb: 1 },
    'Challenger Attitude in Sales':  { category: 'personal', lecturerId: 'lec-roth',     thumb: 5 },
    'Negotiation':                   { category: 'personal', lecturerId: 'lec-dubois',   thumb: 4 },
    'Time Management':               { category: 'personal', lecturerId: 'lec-meier',    thumb: 3 }
  },

  // Category A + B: free HECTOR School recordings. duration in minutes, learners = popularity.
  courses: [
    // --- Category A: Technical Topics
    { id: 'a1',  topic: 'AI Chatbots', title: 'Building AI Chatbots with LLMs', duration: 200, videos: 14, level: 'Intermediate', rating: 4.8, learners: 2140, skills: ['Python', 'AI/ML Basics'], summary: 'Design, build and deploy a chatbot on top of a large language model – from prompt design to a working web integration.' },
    { id: 'a2',  topic: 'AI Chatbots', title: 'Conversational Design for Chatbots', duration: 125, videos: 9, level: 'Beginner', rating: 4.6, learners: 1320, skills: ['Design Thinking', 'AI/ML Basics'], summary: 'Learn how to map user intents, write natural dialogue flows and test conversations with real users.' },
    { id: 'a3',  topic: 'AI Chatbots', title: 'Retrieval-Augmented Generation (RAG) in Practice', duration: 250, videos: 16, level: 'Advanced', rating: 4.9, learners: 980, skills: ['Python', 'AI/ML Basics'], summary: 'Connect LLMs to company knowledge with vector search, chunking strategies and evaluation pipelines.' },
    { id: 'a4',  topic: 'AI Chatbots', title: 'Chatbots in Customer Service: Business Cases', duration: 100, videos: 7, level: 'Beginner', rating: 4.4, learners: 860, skills: ['Stakeholder Management', 'AI/ML Basics'], summary: 'Real implementation stories from industry: costs, KPIs, change management and lessons learned.' },

    { id: 'a5',  topic: 'Multi-Agent Systems', title: 'Introduction to Multi-Agent Systems', duration: 150, videos: 10, level: 'Beginner', rating: 4.7, learners: 1150, skills: ['AI/ML Basics', 'Problem Solving'], summary: 'Core concepts of autonomous agents, cooperation, coordination and how agent systems solve complex tasks.' },
    { id: 'a6',  topic: 'Multi-Agent Systems', title: 'Orchestrating AI Agents with Python', duration: 225, videos: 15, level: 'Advanced', rating: 4.8, learners: 740, skills: ['Python', 'AI/ML Basics'], summary: 'Build a team of cooperating AI agents with planning, memory and hand-offs – hands-on in Python.' },
    { id: 'a7',  topic: 'Multi-Agent Systems', title: 'Agent Tool Use & Function Calling', duration: 170, videos: 11, level: 'Intermediate', rating: 4.7, learners: 890, skills: ['Python'], summary: 'Let agents call APIs, query databases and use tools safely and reliably.' },
    { id: 'a8',  topic: 'Multi-Agent Systems', title: 'Governance & Safety for Autonomous Agents', duration: 115, videos: 8, level: 'Intermediate', rating: 4.5, learners: 520, skills: ['Problem Solving', 'Stakeholder Management'], summary: 'Risk assessment, human oversight and compliance (EU AI Act) for agent-based systems.' },

    { id: 'a9',  topic: 'Generative AI', title: 'Generative AI Fundamentals', duration: 135, videos: 10, level: 'Beginner', rating: 4.7, learners: 3410, skills: ['AI/ML Basics'], summary: 'What generative models are, how they work and where they create value in engineering and business.' },
    { id: 'a10', topic: 'Generative AI', title: 'Prompt Engineering for Developers', duration: 160, videos: 12, level: 'Intermediate', rating: 4.8, learners: 2760, skills: ['Python', 'AI/ML Basics'], summary: 'Systematic prompting techniques, structured outputs and testing prompts like code.' },
    { id: 'a11', topic: 'Generative AI', title: 'GenAI Product Strategy', duration: 110, videos: 8, level: 'Intermediate', rating: 4.6, learners: 1240, skills: ['Design Thinking', 'Project Management'], summary: 'Identify GenAI use cases, build a business case and plan the roll-out of an AI-powered product.' },
    { id: 'a12', topic: 'Generative AI', title: 'Fine-Tuning Foundation Models', duration: 270, videos: 17, level: 'Advanced', rating: 4.7, learners: 610, skills: ['Python', 'AI/ML Basics'], summary: 'Data preparation, parameter-efficient fine-tuning and evaluation of custom models.' },

    { id: 'a13', topic: 'Data Analytics', title: 'Python for Data Analysis', duration: 210, videos: 15, level: 'Beginner', rating: 4.8, learners: 3980, skills: ['Python', 'Data Analysis'], summary: 'Clean, transform and analyse data with pandas and NumPy – from raw CSV to insight.' },
    { id: 'a14', topic: 'Data Analytics', title: 'Data Visualization & Dashboards', duration: 140, videos: 10, level: 'Intermediate', rating: 4.6, learners: 1870, skills: ['Data Analysis', 'Presentation Design'], summary: 'Choose the right chart, design clear dashboards and tell a story with your numbers.' },
    { id: 'a15', topic: 'Data Analytics', title: 'SQL for Analysts', duration: 165, videos: 12, level: 'Beginner', rating: 4.7, learners: 2210, skills: ['Data Analysis'], summary: 'Query, join and aggregate business data with SQL – with exercises on real datasets.' },
    { id: 'a16', topic: 'Data Analytics', title: 'Applied Machine Learning with scikit-learn', duration: 245, videos: 16, level: 'Advanced', rating: 4.8, learners: 1090, skills: ['Python', 'AI/ML Basics', 'Data Analysis'], summary: 'Train, tune and evaluate classical ML models and bring them into production.' },

    { id: 'a17', topic: 'Cybersecurity', title: 'Cybersecurity Essentials', duration: 120, videos: 9, level: 'Beginner', rating: 4.6, learners: 2450, skills: ['Cloud Fundamentals'], summary: 'Threats, attack vectors and the basic security controls every engineer should know.' },
    { id: 'a18', topic: 'Cybersecurity', title: 'Secure Coding for Web Developers', duration: 190, videos: 13, level: 'Intermediate', rating: 4.8, learners: 1380, skills: ['Python'], summary: 'OWASP Top 10, secure authentication and how to review code for vulnerabilities.' },
    { id: 'a19', topic: 'Cybersecurity', title: 'Cloud Security Fundamentals', duration: 155, videos: 11, level: 'Intermediate', rating: 4.6, learners: 1120, skills: ['Cloud Fundamentals'], summary: 'Identity & access management, encryption and shared responsibility in the cloud.' },
    { id: 'a20', topic: 'Cybersecurity', title: 'Incident Response & Crisis Communication', duration: 105, videos: 7, level: 'Intermediate', rating: 4.5, learners: 640, skills: ['Stakeholder Management', 'Problem Solving'], summary: 'Handle a security incident end-to-end – technically and in communication with stakeholders.' },

    // --- Category B: Personal Skills
    { id: 'b1',  topic: 'Presentation', title: 'Confident Public Speaking', duration: 110, videos: 8, level: 'Beginner', rating: 4.8, learners: 4120, skills: ['Public Speaking'], summary: 'Overcome nervousness, structure your talk and speak with confidence in front of any audience.' },
    { id: 'b2',  topic: 'Presentation', title: 'Storytelling with Data', duration: 130, videos: 10, level: 'Intermediate', rating: 4.9, learners: 2870, skills: ['Storytelling', 'Data Analysis', 'Presentation Design'], summary: 'Turn analysis into a compelling narrative that decision-makers remember.' },
    { id: 'b3',  topic: 'Presentation', title: 'Slide Design that Convinces', duration: 95, videos: 7, level: 'Beginner', rating: 4.6, learners: 2340, skills: ['Presentation Design'], summary: 'Clean layouts, visual hierarchy and the one-message-per-slide principle.' },
    { id: 'b4',  topic: 'Presentation', title: 'Executive Presentations', duration: 120, videos: 9, level: 'Advanced', rating: 4.7, learners: 1060, skills: ['Public Speaking', 'Stakeholder Management'], summary: 'Present to senior management: bottom line first, handling questions and pushback.' },

    { id: 'b5',  topic: 'Body Language', title: 'Body Language Basics', duration: 80, videos: 6, level: 'Beginner', rating: 4.6, learners: 2980, skills: ['Body Language'], summary: 'Posture, gestures and eye contact – what your body says before you speak.' },
    { id: 'b6',  topic: 'Body Language', title: 'Presence & Voice on Stage', duration: 100, videos: 7, level: 'Intermediate', rating: 4.7, learners: 1540, skills: ['Body Language', 'Public Speaking'], summary: 'Use voice, pace and movement to build presence and keep your audience engaged.' },
    { id: 'b7',  topic: 'Body Language', title: 'Reading the Room in Meetings', duration: 75, videos: 6, level: 'Intermediate', rating: 4.5, learners: 1210, skills: ['Body Language', 'Stakeholder Management'], summary: 'Recognise non-verbal signals of agreement, doubt and resistance – and react to them.' },
    { id: 'b8',  topic: 'Body Language', title: 'Non-Verbal Communication in Virtual Teams', duration: 65, videos: 5, level: 'Beginner', rating: 4.4, learners: 930, skills: ['Body Language', 'Team Leadership'], summary: 'Camera presence, attention signals and building trust when working remotely.' },

    { id: 'b9',  topic: 'Business Language', title: 'Business English for Engineers', duration: 180, videos: 14, level: 'Intermediate', rating: 4.7, learners: 3150, skills: ['Business English'], summary: 'Explain technical topics clearly to non-technical colleagues and international partners.' },
    { id: 'b10', topic: 'Business Language', title: 'Writing Clear Emails & Reports', duration: 90, videos: 7, level: 'Beginner', rating: 4.6, learners: 2620, skills: ['Business English', 'Organization Skills'], summary: 'Structure, tone and brevity – write messages that get read and acted upon.' },
    { id: 'b11', topic: 'Business Language', title: 'Business English: Meetings & Calls', duration: 135, videos: 10, level: 'Intermediate', rating: 4.5, learners: 1780, skills: ['Business English'], summary: 'Lead and take part in meetings in English: phrases, moderation and small talk.' },
    { id: 'b12', topic: 'Business Language', title: 'Pitching in English', duration: 105, videos: 8, level: 'Advanced', rating: 4.7, learners: 870, skills: ['Business English', 'Public Speaking'], summary: 'Pitch an idea, product or project convincingly to an international audience.' },

    { id: 'b13', topic: 'Challenger Attitude in Sales', title: 'The Challenger Sale: Core Principles', duration: 125, videos: 9, level: 'Beginner', rating: 4.7, learners: 1690, skills: ['Challenger Sales'], summary: 'Why challengers outperform relationship builders and what the challenger mindset looks like.' },
    { id: 'b14', topic: 'Challenger Attitude in Sales', title: 'Teaching, Tailoring & Taking Control', duration: 150, videos: 10, level: 'Intermediate', rating: 4.8, learners: 1150, skills: ['Challenger Sales', 'Stakeholder Management'], summary: 'Apply the three challenger skills in customer conversations – with role-play examples.' },
    { id: 'b15', topic: 'Challenger Attitude in Sales', title: 'Commercial Insight for Tech Products', duration: 115, videos: 8, level: 'Advanced', rating: 4.6, learners: 620, skills: ['Challenger Sales', 'Problem Solving'], summary: 'Develop insights that reframe how customers think about their business problem.' },
    { id: 'b16', topic: 'Challenger Attitude in Sales', title: 'Consultative Selling for Engineers', duration: 100, videos: 7, level: 'Intermediate', rating: 4.6, learners: 940, skills: ['Challenger Sales', 'Negotiation'], summary: 'Use your technical expertise to advise customers and win trust in pre-sales.' },

    { id: 'b17', topic: 'Negotiation', title: 'Negotiation Fundamentals (Harvard Method)', duration: 140, videos: 10, level: 'Beginner', rating: 4.8, learners: 3020, skills: ['Negotiation'], summary: 'Interests instead of positions, BATNA and creating value for both sides.' },
    { id: 'b18', topic: 'Negotiation', title: 'Negotiating with Stakeholders', duration: 110, videos: 8, level: 'Intermediate', rating: 4.6, learners: 1340, skills: ['Negotiation', 'Stakeholder Management'], summary: 'Negotiate scope, budget and deadlines inside your organisation.' },
    { id: 'b19', topic: 'Negotiation', title: 'Salary & Career Negotiation', duration: 70, videos: 5, level: 'Beginner', rating: 4.9, learners: 2580, skills: ['Negotiation'], summary: 'Prepare and lead the conversation about your next role, promotion or salary.' },
    { id: 'b20', topic: 'Negotiation', title: 'Difficult Conversations', duration: 95, videos: 7, level: 'Advanced', rating: 4.7, learners: 1460, skills: ['Negotiation', 'Team Leadership'], summary: 'Address conflict, give critical feedback and stay calm when emotions run high.' },

    { id: 'b21', topic: 'Time Management', title: 'Time Management for Working Students', duration: 75, videos: 6, level: 'Beginner', rating: 4.8, learners: 2190, skills: ['Time Management', 'Organization Skills'], summary: 'Balance job, studies and private life with a realistic weekly planning system.' },
    { id: 'b22', topic: 'Time Management', title: 'Prioritization with Eisenhower & OKRs', duration: 90, videos: 7, level: 'Intermediate', rating: 4.6, learners: 1560, skills: ['Time Management', 'Project Management'], summary: 'Decide what matters, set measurable objectives and say no to the rest.' },
    { id: 'b23', topic: 'Time Management', title: 'Deep Work & Focus', duration: 65, videos: 5, level: 'Beginner', rating: 4.7, learners: 2730, skills: ['Time Management'], summary: 'Protect focus time, reduce context switching and get demanding work done.' },
    { id: 'b24', topic: 'Time Management', title: 'Leading Productive Meetings', duration: 85, videos: 6, level: 'Intermediate', rating: 4.5, learners: 1180, skills: ['Time Management', 'Team Leadership'], summary: 'Agendas, decisions and follow-ups – meetings your team actually wants to attend.' }
  ],

  // Category C: official certification partners (spec §2.4 / §2.5). Logo = placeholder initials.
  certPartners: [
    { id: 'p-aws',    name: 'AWS',             logo: 'AWS', fullName: 'Amazon Web Services', description: 'Amazon Web Services is the world\'s most widely adopted cloud platform. AWS certifications validate cloud expertise from foundational knowledge to professional architecture and development skills.' },
    { id: 'p-azure',  name: 'Microsoft Azure', logo: 'Az',  fullName: 'Microsoft', description: 'Microsoft Azure certifications prove skills in cloud services, development and AI on the Azure platform – widely requested by enterprise employers in Europe.' },
    { id: 'p-prince2',name: 'PRINCE2',         logo: 'P2',  fullName: 'PeopleCert / AXELOS', description: 'PRINCE2 is a process-based project management method used by organisations worldwide, especially in Europe and the public sector. Foundation and Practitioner levels build on each other.' },
    { id: 'p-pmp',    name: 'PMP',             logo: 'PMI', fullName: 'Project Management Institute', description: 'The Project Management Institute (PMI) offers the globally recognised PMP certification and the entry-level CAPM for professionals starting their project management career.' },
    { id: 'p-scrum',  name: 'Scrum.org',       logo: 'S',   fullName: 'Scrum.org', description: 'Scrum.org, founded by Scrum co-creator Ken Schwaber, offers Professional Scrum certifications for Scrum Masters, Product Owners and developers.' },
    { id: 'p-gcloud', name: 'Google Cloud',    logo: 'GC',  fullName: 'Google', description: 'Google Cloud certifications validate the ability to design, build and manage solutions on Google Cloud – from business-oriented to engineering roles.' }
  ],

  // prepHours = estimated preparation time. Price includes prep material + official exam voucher.
  certifications: [
    { id: 'c-aws-ccp',   partnerId: 'p-aws',     topic: 'Cloud & Development', title: 'AWS Certified Cloud Practitioner', level: 'Foundational', prepHours: 20, price: 140, rating: 4.7, learners: 1890, skills: ['Cloud Fundamentals'], summary: 'Foundational understanding of AWS cloud concepts, services, security, pricing and support.' },
    { id: 'c-aws-saa',   partnerId: 'p-aws',     topic: 'Cloud & Development', title: 'AWS Certified Solutions Architect – Associate', level: 'Associate', prepHours: 60, price: 320, rating: 4.8, learners: 1240, skills: ['Cloud Fundamentals'], summary: 'Design resilient, high-performing, secure and cost-optimised architectures on AWS.' },
    { id: 'c-aws-dva',   partnerId: 'p-aws',     topic: 'Cloud & Development', title: 'AWS Certified Developer – Associate', level: 'Associate', prepHours: 50, price: 320, rating: 4.7, learners: 860, skills: ['Python', 'Cloud Fundamentals'], summary: 'Develop, deploy and debug cloud-based applications using AWS services.' },
    { id: 'c-az-900',    partnerId: 'p-azure',   topic: 'Cloud & Development', title: 'Microsoft Azure Fundamentals (AZ-900)', level: 'Foundational', prepHours: 15, price: 130, rating: 4.6, learners: 1570, skills: ['Cloud Fundamentals'], summary: 'Cloud concepts, core Azure services, security, privacy, compliance and pricing.' },
    { id: 'c-az-204',    partnerId: 'p-azure',   topic: 'Cloud & Development', title: 'Azure Developer Associate (AZ-204)', level: 'Associate', prepHours: 55, price: 260, rating: 4.6, learners: 720, skills: ['Python', 'Cloud Fundamentals'], summary: 'Build cloud solutions on Azure: compute, storage, security and monitoring.' },
    { id: 'c-ai-102',    partnerId: 'p-azure',   topic: 'Cloud & Development', title: 'Azure AI Engineer Associate (AI-102)', level: 'Associate', prepHours: 50, price: 260, rating: 4.7, learners: 690, skills: ['AI/ML Basics', 'Python'], summary: 'Design and implement AI solutions with Azure AI services and Azure OpenAI.' },
    { id: 'c-gc-cdl',    partnerId: 'p-gcloud',  topic: 'Cloud & Development', title: 'Google Cloud Digital Leader', level: 'Foundational', prepHours: 20, price: 120, rating: 4.5, learners: 640, skills: ['Cloud Fundamentals'], summary: 'Business-oriented knowledge of cloud technology and how Google Cloud enables transformation.' },
    { id: 'c-gc-ace',    partnerId: 'p-gcloud',  topic: 'Cloud & Development', title: 'Google Associate Cloud Engineer', level: 'Associate', prepHours: 45, price: 150, rating: 4.6, learners: 510, skills: ['Cloud Fundamentals', 'Python'], summary: 'Deploy applications, monitor operations and manage enterprise solutions on Google Cloud.' },
    { id: 'c-p2-found',  partnerId: 'p-prince2', topic: 'Project Management', title: 'PRINCE2® 7 Foundation', level: 'Foundational', prepHours: 25, price: 450, rating: 4.6, learners: 1320, skills: ['Project Management'], summary: 'Principles, practices and processes of the PRINCE2 method for managing projects.' },
    { id: 'c-p2-pract',  partnerId: 'p-prince2', topic: 'Project Management', title: 'PRINCE2® 7 Practitioner', level: 'Professional', prepHours: 35, price: 620, rating: 4.7, learners: 780, skills: ['Project Management', 'Stakeholder Management'], summary: 'Apply and tailor PRINCE2 to real project scenarios. Requires PRINCE2 Foundation.' },
    { id: 'c-capm',      partnerId: 'p-pmp',     topic: 'Project Management', title: 'Certified Associate in Project Management (CAPM)®', level: 'Foundational', prepHours: 40, price: 330, rating: 4.6, learners: 920, skills: ['Project Management'], summary: 'Entry-level PMI certification covering predictive, agile and business analysis fundamentals.' },
    { id: 'c-pmp',       partnerId: 'p-pmp',     topic: 'Project Management', title: 'Project Management Professional (PMP)®', level: 'Professional', prepHours: 120, price: 1250, rating: 4.9, learners: 1460, skills: ['Project Management', 'Team Leadership'], summary: 'The gold standard in project management, incl. 35-hour exam bootcamp. Requires 36 months of project experience.' },
    { id: 'c-psm1',      partnerId: 'p-scrum',   topic: 'Agile', title: 'Professional Scrum Master™ I (PSM I)', level: 'Foundational', prepHours: 15, price: 190, rating: 4.8, learners: 2210, skills: ['Agile/Scrum'], summary: 'Fundamental understanding of Scrum and the role of the Scrum Master.' },
    { id: 'c-pspo1',     partnerId: 'p-scrum',   topic: 'Agile', title: 'Professional Scrum Product Owner™ I (PSPO I)', level: 'Foundational', prepHours: 15, price: 190, rating: 4.8, learners: 1380, skills: ['Agile/Scrum', 'Project Management'], summary: 'Maximise product value as a Product Owner – backlog management, stakeholders and vision.' }
  ],

  // Sebastian's starting state.
  purchases: [
    { itemId: 'c-psm1',    date: '2026-06-20', amount: 190 },
    { itemId: 'c-aws-ccp', date: '2026-10-05', amount: 140 }
  ],

  inProgress: [
    { itemId: 'b2', done: 6, total: 10, lessons: ['Why stories beat statistics', 'Know your audience', 'Finding the message in your data', 'Choosing the right chart', 'Decluttering your visuals', 'Focusing attention', 'Building the narrative arc', 'From insight to recommendation', 'Rehearsing your data story', 'Final project: your data story'] },
    { itemId: 'c-aws-ccp', done: 4, total: 10, lessons: ['Exam overview & study plan', 'Cloud concepts', 'Global infrastructure', 'Compute & networking', 'Security & compliance', 'Storage & databases', 'Billing & pricing', 'Support & architecture', 'Practice exam 1', 'Practice exam 2 & exam booking'] },
    { itemId: 'a10', done: 2, total: 12 }
  ],

  completed: [
    { itemId: 'a13',    date: '2026-10-30', credentialId: 'HS-PDA-2026-04127' },
    { itemId: 'c-psm1', date: '2026-07-14', credentialId: 'PSM-I-1083572' },
    { itemId: 'b1',     date: '2026-06-02', credentialId: 'HS-CPS-2026-01893' }
  ]
};

// =============================================================================
// Function 2 – Projects & Calendar (function2_projects.md)
// =============================================================================
HS.data.calendar = {
  sessionTime: '09:00 – 16:30',
  location: 'KIT HECTOR School, Karlsruhe',

  // Fellow students of the cohort (also used as peer reviewers in Function 3).
  peers: [
    { id: 'peer-fischer',   name: 'Lena Fischer',    job: 'Process Engineer, automotive supplier' },
    { id: 'peer-weber',     name: 'Jonas Weber',     job: 'Product Manager, software company' },
    { id: 'peer-demir',     name: 'Aylin Demir',     job: 'Consultant, IT consultancy' },
    { id: 'peer-rossi',     name: 'Marco Rossi',     job: 'Mechanical Engineer, commercial vehicles' },
    { id: 'peer-sharma',    name: 'Priya Sharma',    job: 'Data Scientist, e-commerce' },
    { id: 'peer-hartmann',  name: 'Felix Hartmann',  job: 'Project Engineer, energy utility' },
    { id: 'peer-novak',     name: 'Sofia Novak',     job: 'UX Designer, industrial technology' },
    { id: 'peer-kim',       name: 'David Kim',       job: 'Software Architect, IT services' },
    { id: 'peer-schmidt',   name: 'Laura Schmidt',   job: 'Quality Manager, automotive' },
    { id: 'peer-becker',    name: 'Tobias Becker',   job: 'Electrical Engineer, automation' },
    { id: 'peer-wagner',    name: 'Mia Wagner',      job: 'Business Analyst, banking' },
    { id: 'peer-johansson', name: 'Nils Johansson',  job: 'Cloud Engineer, hosting provider' }
  ],

  // Course descriptions + session topics per module (sessions fill all module weekdays outside the project).
  courses: {
    'mod-e1': { description: 'Modern software engineering for scalable systems: architecture styles, microservices, containers and cloud deployment, with a strong focus on quality and maintainability.', topics: ['Architecture styles & trade-offs', 'Microservices & domain-driven design', 'Containers & Kubernetes', 'CI/CD pipelines', 'Cloud deployment on AWS'] },
    'mod-m1': { description: 'How companies define direction and win: strategic analysis, competitive advantage, business models and the leadership needed to implement strategy.', topics: ['Strategic analysis & environment scanning', 'Competitive advantage & positioning', 'Business model innovation', 'Leading strategic change', 'Leadership styles & self-reflection', 'Strategy implementation & OKRs', 'Case study: platform strategies'] },
    'mod-e2': { description: 'From data to decisions: data pipelines, exploratory analysis, supervised and unsupervised learning, and how to evaluate and communicate ML results.', topics: ['Data pipelines & data quality', 'Exploratory data analysis', 'Supervised learning', 'Unsupervised learning & clustering', 'Model evaluation & communication', 'MLOps basics'] },
    'mod-m2': { description: 'Plan, steer and deliver projects in classic and agile settings: scope, schedule, risk, Scrum and scaled agile frameworks, and leading project teams.', topics: ['Project lifecycle & classic planning', 'Scope, schedule & cost', 'Risk & stakeholder management', 'Scrum in practice', 'Scaling agile (SAFe, LeSS)'] },
    'mod-e3': { description: 'Foundations and applications of generative AI: large language models, prompt engineering, retrieval-augmented generation and responsible AI in engineering contexts.', topics: ['How large language models work', 'Prompt engineering & evaluation', 'Retrieval-augmented generation', 'AI agents & tool use', 'Responsible AI & EU AI Act', 'Building a GenAI prototype', 'GenAI in industrial applications'] },
    'mod-m3': { description: 'Turning ideas into successful products: innovation methods, design thinking, product discovery, roadmapping and product-market fit.', topics: ['Innovation management', 'Design thinking workshop', 'Product discovery & user research', 'Roadmapping & prioritisation', 'Measuring product-market fit', 'Pitching product ideas'] },
    'mod-e4': { description: 'Engineering secure systems: threat modelling, secure software development, network and cloud security, and incident response.', topics: ['Threat modelling', 'Secure software development', 'Network & cloud security', 'Penetration testing basics', 'Incident response', 'Security governance & ISO 27001'] },
    'mod-m4': { description: 'Communicate and negotiate effectively with stakeholders: negotiation strategies, stakeholder mapping, persuasion and handling conflict.', topics: ['Negotiation strategies (Harvard method)', 'Stakeholder mapping & analysis', 'Persuasion & influence', 'Conflict resolution', 'Intercultural communication', 'Negotiation simulation', 'Communicating in crises'] },
    'mod-e5': { description: 'Developing complex technical products: requirements engineering, model-based systems engineering, verification and the product development process.', topics: ['Requirements engineering', 'Model-based systems engineering (SysML)', 'System architecture & interfaces', 'Verification & validation', 'Product development process'] },
    'mod-m5': { description: 'Financial thinking for engineers and managers: financial statements, investment appraisal, business cases and valuation of technology projects.', topics: ['Reading financial statements', 'Cost accounting basics', 'Investment appraisal (NPV, IRR)', 'Building a business case', 'Valuation of technology projects', 'Funding & financing options'] }
  },

  // One company/NGO project per module. start/end = project period (3–5 days, first or second module week).
  projects: [
    {
      id: 'prj-sap', moduleId: 'mod-e1', partnerId: 'org-sap', start: '2026-10-05', end: '2026-10-09',
      title: 'Cloud-Native Migration of a Legacy Order Service',
      brief: 'SAP wants to move a monolithic order-management service of a mid-size customer into a cloud-native architecture. The team analyses the existing system, designs a target architecture and builds a proof of concept for the most critical service.',
      outcome: 'Target architecture (C4 diagrams), migration roadmap and a containerised proof of concept running on Kubernetes.',
      mentor: 'Solution Architect, SAP',
      team: { name: 'Cloud Nomads', members: [
        { id: 'stu-001', role: 'Backend Developer' }, { id: 'peer-weber', role: 'Product Owner' }, { id: 'peer-kim', role: 'Software Architect' }, { id: 'peer-johansson', role: 'DevOps Engineer' }
      ] }
    },
    {
      id: 'prj-who', moduleId: 'mod-m1', partnerId: 'org-who', start: '2026-10-19', end: '2026-10-21',
      title: 'Digital Health Strategy for Low-Resource Regions',
      brief: 'The WHO Digital Health team asks for a strategic assessment of how mobile health services can be scaled in rural regions of East Africa. The team analyses the environment, stakeholders and possible business and funding models.',
      outcome: 'Strategy paper with three strategic options, a recommendation and a 10-minute presentation to WHO representatives.',
      mentor: 'Digital Health Officer, WHO',
      team: { name: 'Health Horizon', members: [
        { id: 'stu-001', role: 'Research & Analysis Lead' }, { id: 'peer-demir', role: 'Team Lead' }, { id: 'peer-sharma', role: 'Data Analyst' }, { id: 'peer-wagner', role: 'Business Model Expert' }
      ] }
    },
    {
      id: 'prj-siemens', moduleId: 'mod-e2', partnerId: 'org-siemens', start: '2026-11-02', end: '2026-11-05',
      title: 'Predictive Maintenance for MRI Scanners',
      brief: 'Siemens Healthineers provides anonymised sensor data of MRI scanners. The team builds a model that predicts helium-pump failures early enough for planned maintenance and presents the results to the service department.',
      outcome: 'Cleaned dataset, evaluated prediction model (target: recall ≥ 80 %), dashboard mock-up and final presentation.',
      mentor: 'Head of Service Analytics, Siemens Healthineers',
      team: { name: 'Signal & Noise', members: [
        { id: 'stu-001', role: 'Data Engineer & Presenter' }, { id: 'peer-sharma', role: 'ML Lead' }, { id: 'peer-novak', role: 'Dashboard Designer' }, { id: 'peer-becker', role: 'Domain Expert' }
      ] }
    },
    {
      id: 'prj-bmw', moduleId: 'mod-m2', partnerId: 'org-bmw', start: '2026-11-16', end: '2026-11-20',
      title: 'Agile Release Planning for Connected-Car Features',
      brief: 'A BMW Group product team ships new connected-car features every quarter. The student team reviews the current planning process across five Scrum teams and designs a lean, scaled release-planning approach.',
      outcome: 'As-is analysis, proposed PI-planning format incl. templates, risk board and a pilot plan for the next quarter.',
      mentor: 'Agile Coach, BMW Group',
      team: { name: 'Sprint Drivers', members: [
        { id: 'stu-001', role: 'Scrum Master' }, { id: 'peer-fischer', role: 'Project Lead' }, { id: 'peer-rossi', role: 'Process Analyst' }, { id: 'peer-schmidt', role: 'Quality & Risk' }, { id: 'peer-weber', role: 'Product Owner' }
      ] }
    },
    {
      id: 'prj-bosch', moduleId: 'mod-e3', partnerId: 'org-bosch', start: '2026-11-25', end: '2026-11-27',
      title: 'GenAI Assistant for Service Technicians',
      brief: 'Bosch service technicians spend a lot of time searching manuals. The team prototypes a retrieval-augmented assistant that answers repair questions from technical documentation and evaluates answer quality.',
      outcome: 'Working RAG prototype, evaluation report on 50 real technician questions and a responsible-AI checklist.',
      mentor: 'AI Product Lead, Bosch',
      team: { name: 'Prompt Mechanics', members: [
        { id: 'stu-001', role: 'Technical Lead' }, { id: 'peer-fischer', role: 'Domain Expert' }, { id: 'peer-kim', role: 'Backend Developer' }, { id: 'peer-novak', role: 'UX Designer' }
      ] }
    },
    {
      id: 'prj-unicef', moduleId: 'mod-m3', partnerId: 'org-unicef', start: '2026-12-14', end: '2026-12-17',
      title: 'Product Roadmap for a Digital Learning App for Refugee Children',
      brief: 'UNICEF Germany plans a learning app for refugee children. The team runs a design-thinking sprint, defines the minimum viable product and creates a 12-month product roadmap.',
      outcome: 'User personas, MVP definition, prioritised roadmap and a clickable prototype of the core learning flow.',
      mentor: 'Innovation Manager, UNICEF Germany',
      team: { name: 'Bright Paths', members: [
        { id: 'stu-001', role: 'Product Owner' }, { id: 'peer-novak', role: 'UX Lead' }, { id: 'peer-wagner', role: 'Business Analyst' }, { id: 'peer-demir', role: 'User Researcher' }
      ] }
    },
    {
      id: 'prj-db', moduleId: 'mod-e4', partnerId: 'org-db', start: '2027-01-05', end: '2027-01-08',
      title: 'Security Assessment of a Passenger Information Platform',
      brief: 'Deutsche Bahn asks for a security assessment of a test instance of its passenger information platform. The team performs threat modelling and a scoped penetration test and prioritises the findings.',
      outcome: 'Threat model, penetration-test report with prioritised findings and a remediation roadmap.',
      mentor: 'Information Security Officer, Deutsche Bahn',
      team: { name: 'Red Signal', members: [
        { id: 'stu-001', role: 'Security Analyst' }, { id: 'peer-johansson', role: 'Cloud Security' }, { id: 'peer-becker', role: 'Network Specialist' }, { id: 'peer-kim', role: 'Team Lead' }
      ] }
    },
    {
      id: 'prj-redcross', moduleId: 'mod-m4', partnerId: 'org-redcross', start: '2027-01-25', end: '2027-01-27',
      title: 'Stakeholder Strategy for a Volunteer Coordination Platform',
      brief: 'The German Red Cross introduces a new digital platform for coordinating volunteers. The team maps all stakeholders, prepares negotiation strategies with local branches and plans the change communication.',
      outcome: 'Stakeholder map, negotiation playbook for three key stakeholder groups and a communication plan.',
      mentor: 'Head of Volunteer Management, German Red Cross',
      team: { name: 'Common Ground', members: [
        { id: 'stu-001', role: 'Stakeholder Manager' }, { id: 'peer-demir', role: 'Communication Lead' }, { id: 'peer-hartmann', role: 'Negotiation Lead' }, { id: 'peer-schmidt', role: 'Project Coordinator' }
      ] }
    },
    {
      id: 'prj-porsche', moduleId: 'mod-e5', partnerId: 'org-porsche', start: '2027-02-08', end: '2027-02-12',
      title: 'Systems Architecture for an E-Charging Planning Tool',
      brief: 'Porsche develops a tool that plans charging stops for long-distance trips. The team derives requirements, models the system architecture in SysML and defines the verification strategy.',
      outcome: 'Requirements specification, SysML architecture model and verification & validation plan.',
      mentor: 'Systems Engineering Lead, Porsche',
      team: { name: 'Charge Ahead', members: [
        { id: 'stu-001', role: 'Systems Architect' }, { id: 'peer-rossi', role: 'Requirements Engineer' }, { id: 'peer-schmidt', role: 'V&V Lead' }, { id: 'peer-becker', role: 'E/E Specialist' }
      ] }
    },
    {
      id: 'prj-enbw', moduleId: 'mod-m5', partnerId: 'org-enbw', start: '2027-02-16', end: '2027-02-19',
      title: 'Business Case for a Smart-Grid Home Battery Service',
      brief: 'EnBW evaluates a subscription service for home batteries that also stabilise the grid. The team builds the business case, calculates NPV under different scenarios and recommends a pricing model.',
      outcome: 'Financial model with scenario analysis, pricing recommendation and an investment pitch for EnBW management.',
      mentor: 'Business Development Manager, EnBW',
      team: { name: 'Grid Thinkers', members: [
        { id: 'stu-001', role: 'Financial Analyst' }, { id: 'peer-hartmann', role: 'Energy Expert' }, { id: 'peer-wagner', role: 'Finance Lead' }, { id: 'peer-weber', role: 'Pitch Lead' }
      ] }
    }
  ]
};

// =============================================================================
// Function 3 – Feedback & Improvement Plan (function3_feedback.md)
// =============================================================================
HS.data.feedback = {
  competencies: ['Communication', 'Presentation Skills', 'Critical Thinking', 'Problem-Solving', 'Teamwork', 'Leadership'],

  // Graded activities. grade = German scale (1.0 best). criteria = clear evaluation criteria.
  // feedback[].giver: { type: 'lecturer' | 'peer' | 'mentor', id } – mentor id = project id.
  // ratings: competency → 1–5. courseId = optional matching course from Function 1.
  activities: [
    {
      id: 'act-e1-exam', moduleId: 'mod-e1', type: 'Evaluation', title: 'Written Exam: Software Architecture', date: '2026-10-02', grade: 2.0,
      noFeedback: true
    },
    {
      id: 'act-sap', moduleId: 'mod-e1', projectId: 'prj-sap', type: 'Project', title: 'Team Project: Cloud-Native Migration (SAP)', date: '2026-10-09', grade: 1.7,
      criteria: [
        { name: 'Technical solution quality', weight: '40 %', score: '1.7' },
        { name: 'Architecture documentation', weight: '30 %', score: '1.3' },
        { name: 'Final presentation', weight: '30 %', score: '2.3' }
      ],
      strengths: ['Clean, well-tested proof-of-concept code', 'Pragmatic problem-solving when the Kubernetes setup failed', 'Reliable team member who delivered on time'],
      improvements: ['Explaining technical decisions to non-technical stakeholders', 'Speaking up earlier when you see a problem'],
      feedback: [
        { id: 'fb-sap-1', giver: { type: 'lecturer', id: 'lec-albrecht' }, ratings: { 'Problem-Solving': 5, Communication: 3, 'Critical Thinking': 4 },
          wellDone: 'Your proof of concept was one of the most robust in the cohort – the automated tests and clear service boundaries showed real engineering maturity.',
          improve: 'In the final presentation you went very deep into implementation details, and the business value of the migration got lost.',
          example: 'When the partner asked what the migration would save, you answered with container start-up times instead of cost or risk reduction.',
          recommendation: 'Before your next presentation, prepare one slide that translates your technical result into business impact (cost, risk, time).' },
        { id: 'fb-sap-2', giver: { type: 'mentor', id: 'prj-sap' }, ratings: { Teamwork: 4, Communication: 3, 'Problem-Solving': 5 },
          wellDone: 'You quickly understood the legacy order service and asked precise questions during the kick-off.',
          improve: 'You had good ideas for the service split but only shared them when asked directly.',
          example: 'On day 2 you had already spotted the database coupling issue, but the team only discussed it on day 4 when you mentioned it in passing.',
          recommendation: 'In your next project, share a concern on the same day you notice it – a short message to the team is enough.' },
        { id: 'fb-sap-3', giver: { type: 'peer', id: 'peer-kim' }, ratings: { Teamwork: 4, Communication: 3 },
          wellDone: 'Super reliable – whenever you said you would fix something, it was done by the next morning.',
          improve: 'Sometimes we did not know what you were working on until it was finished.',
          example: 'You rewrote the API gateway configuration on Wednesday evening without telling us, so Nils was debugging the old version for an hour.',
          recommendation: 'Post a two-line status update in the team chat at the end of each project day.' }
      ]
    },
    {
      id: 'act-who', moduleId: 'mod-m1', projectId: 'prj-who', type: 'Presentation', title: 'Strategy Presentation for WHO', date: '2026-10-21', grade: 2.0,
      criteria: [
        { name: 'Strategic analysis', weight: '40 %', score: '1.7' },
        { name: 'Recommendation & reasoning', weight: '30 %', score: '2.0' },
        { name: 'Presentation & delivery', weight: '30 %', score: '2.7' }
      ],
      strengths: ['Thorough, data-based environment analysis', 'Clear structure of the three strategic options'],
      improvements: ['Confidence and pace when presenting', 'Too much text on slides', 'Handling critical questions'],
      feedback: [
        { id: 'fb-who-1', giver: { type: 'lecturer', id: 'lec-reinhardt' }, ratings: { 'Critical Thinking': 5, 'Presentation Skills': 2, Communication: 3 }, courseId: 'b3',
          wellDone: 'Your environment analysis was thorough and well sourced – the partner representatives explicitly praised the stakeholder map.',
          improve: 'Your delivery did not yet match the quality of your content: you read from the slides and spoke very fast.',
          example: 'On the slide with the three strategic options you read all 14 bullet points aloud, and the audience stopped following after the second option.',
          recommendation: 'Use a maximum of three key messages per slide and rehearse the presentation out loud at least twice with a timer.' },
        { id: 'fb-who-2', giver: { type: 'mentor', id: 'prj-who' }, ratings: { 'Critical Thinking': 4, Communication: 3, 'Presentation Skills': 2 },
          wellDone: 'You clearly understood the realities in rural regions – your options were realistic, not just theoretical.',
          improve: 'When we challenged the funding assumptions, you seemed unsure and handed the question over to a teammate.',
          example: 'Asked whether donor funding would be sustainable after five years, you said "I think Aylin can answer that better", although your own analysis covered exactly this point.',
          recommendation: 'Prepare answers to the three most likely critical questions before your next presentation and practise them with a peer.' },
        { id: 'fb-who-3', giver: { type: 'peer', id: 'peer-demir' }, ratings: { Teamwork: 5, 'Presentation Skills': 3 },
          wellDone: 'You did most of the research, and your numbers made our case strong.',
          improve: 'You underestimate yourself – your part was the strongest, but you presented it as if it was not important.',
          example: 'You started your part with "This is probably not that interesting, but…".',
          recommendation: 'Start your next presentation part with your key finding and one confident sentence – no apologies.' }
      ]
    },
    {
      id: 'act-leader', moduleId: 'mod-m1', type: 'Assignment', title: 'Leadership Reflection Paper', date: '2026-10-23', grade: 1.3,
      criteria: [
        { name: 'Depth of self-reflection', weight: '40 %', score: '1.0' },
        { name: 'Use of leadership theory', weight: '30 %', score: '1.7' },
        { name: 'Personal development plan', weight: '30 %', score: '1.3' }
      ],
      strengths: ['Honest and specific self-reflection', 'Concrete link between theory and your own work experience'],
      improvements: ['Turning insights into measurable development goals'],
      feedback: [
        { id: 'fb-leader-1', giver: { type: 'lecturer', id: 'lec-reinhardt' }, ratings: { Leadership: 3, 'Critical Thinking': 5 },
          wellDone: 'One of the most honest reflections this year – you named concrete situations in which you avoided taking the lead.',
          improve: 'Your development plan is still vague.',
          example: '"I want to become more confident as a leader" is a good intention, but you do not describe how or when you will practise it.',
          recommendation: 'Choose one upcoming team project in which you deliberately take a leadership role, and define what success looks like.' }
      ]
    },
    {
      id: 'act-ml', moduleId: 'mod-e2', type: 'Assignment', title: 'Assignment: End-to-End Data Pipeline', date: '2026-10-30', grade: 1.3,
      criteria: [
        { name: 'Correctness', weight: '50 %', score: '1.0' },
        { name: 'Code quality', weight: '30 %', score: '1.3' },
        { name: 'Documentation', weight: '20 %', score: '2.0' }
      ],
      strengths: ['Excellent code quality and testing', 'Efficient pipeline design'],
      improvements: ['Documentation for other readers'],
      feedback: [
        { id: 'fb-ml-1', giver: { type: 'lecturer', id: 'lec-hoffmann' }, ratings: { 'Problem-Solving': 5, Communication: 3 },
          wellDone: 'Excellent, production-ready pipeline – clean code, sensible tests and very efficient data handling.',
          improve: 'The README assumes the reader already knows your design.',
          example: 'There is no explanation of why you chose daily batch processing instead of streaming, although this was the key design decision.',
          recommendation: 'Add a short "design decisions" section (3–5 bullet points) to your next technical deliverable.' }
      ]
    },
    {
      id: 'act-siemens', moduleId: 'mod-e2', projectId: 'prj-siemens', type: 'Presentation', title: 'Final Presentation: Predictive Maintenance for MRI Scanners', date: '2026-11-05', grade: 1.7, isNew: true,
      criteria: [
        { name: 'Model & analysis', weight: '40 %', score: '1.3' },
        { name: 'Business relevance', weight: '30 %', score: '2.0' },
        { name: 'Presentation & Q&A', weight: '30 %', score: '2.0' }
      ],
      strengths: ['Strong technical depth and correct evaluation', 'Much clearer slides than in your previous presentation', 'Good collaboration within the team'],
      improvements: ['Storytelling: lead with the key insight', 'Eye contact and body language', 'Asking for help before you are overloaded'],
      feedback: [
        { id: 'fb-sie-1', giver: { type: 'lecturer', id: 'lec-hoffmann' }, ratings: { 'Presentation Skills': 3, 'Critical Thinking': 5, Communication: 4 }, courseId: 'b2',
          wellDone: 'Your model evaluation was methodically correct and clearly explained – and your slides were much clearer than in your earlier presentations.',
          improve: 'The key insight came too late: the audience only learned in minute 12 that the model detects 85 % of failures a week in advance.',
          example: 'You spent the first eight minutes on data-cleaning steps before showing why the results matter for the service department.',
          recommendation: 'Structure your next presentation "answer first": start with the main result and its impact, then explain how you got there.' },
        { id: 'fb-sie-2', giver: { type: 'mentor', id: 'prj-siemens' }, ratings: { 'Presentation Skills': 3, Communication: 4, 'Problem-Solving': 5 }, courseId: 'b6',
          wellDone: 'Your team delivered results we can actually use – a recall of 85 % is a real basis for a pilot.',
          improve: 'When answering questions you looked mostly at your laptop rather than at the audience.',
          example: 'During the Q&A about false alarms you answered correctly, but kept your eyes on the screen, which made the answer sound less confident than it was.',
          recommendation: 'Practise answering questions while looking at the person who asked – record yourself once to see the difference.' },
        { id: 'fb-sie-3', giver: { type: 'peer', id: 'peer-sharma' }, ratings: { Teamwork: 4, Leadership: 3 },
          wellDone: 'Great data engineering work – without your pipeline we could not have trained the model in time.',
          improve: 'You took on a lot alone in the last night instead of asking for help.',
          example: 'On Wednesday you fixed three pipeline bugs until 2 a.m. – I had time and could have taken one of them.',
          recommendation: 'In the next project, say clearly when you are overloaded and hand over at least one task.' },
        { id: 'fb-sie-4', giver: { type: 'peer', id: 'peer-novak' }, ratings: { 'Presentation Skills': 3, Communication: 4 }, courseId: 'b5',
          wellDone: 'You presented much more calmly than in the WHO project – the improvement was obvious.',
          improve: 'Your hands were in your pockets most of the time.',
          example: 'When you explained the confusion matrix, you described it instead of pointing to the chart.',
          recommendation: 'Use gestures to guide attention – point to the part of the slide you are talking about.' }
      ]
    },
    {
      id: 'act-sprint', moduleId: 'mod-m2', type: 'Evaluation', title: 'Peer Evaluation: Scrum Sprint Simulation', date: '2026-11-11', grade: null, gradeLabel: 'Passed',
      criteria: [
        { name: 'Collaboration', weight: 'Peer-rated', score: '5 / 5' },
        { name: 'Facilitation of Scrum events', weight: 'Peer-rated', score: '4 / 5' },
        { name: 'Decision-making', weight: 'Peer-rated', score: '3 / 5' }
      ],
      strengths: ['Calm and structured facilitation of the daily stand-up', 'Supportive towards team members'],
      improvements: ['Making decisions when the team is stuck', 'Time-boxing discussions'],
      feedback: [
        { id: 'fb-spr-1', giver: { type: 'peer', id: 'peer-fischer' }, ratings: { Leadership: 3, Teamwork: 5, Communication: 4 },
          wellDone: 'Your stand-ups were well structured and everybody got a voice.',
          improve: 'When we disagreed about the sprint goal, you waited too long for a consensus.',
          example: 'The sprint planning ran 25 minutes over because nobody proposed a decision while the discussion went in circles.',
          recommendation: 'As Scrum Master in the BMW project, propose a time-box at the start of each discussion and suggest a decision when it runs out.' },
        { id: 'fb-spr-2', giver: { type: 'peer', id: 'peer-rossi' }, ratings: { Leadership: 3, Teamwork: 5 },
          wellDone: 'You noticed when I was stuck with the burndown chart and offered help without me asking.',
          improve: 'You could challenge the Product Owner more.',
          example: 'When two stories were added mid-sprint, you accepted them although they put our sprint goal at risk.',
          recommendation: 'Next time, politely ask about the impact on the sprint goal before accepting changes.' }
      ]
    },
    {
      id: 'act-bmw-final', moduleId: 'mod-m2', projectId: 'prj-bmw', type: 'Presentation', title: 'Final Project Presentation (BMW Group)', date: '2026-11-20', grade: null,
      pending: true
    }
  ],

  // Sebastian's existing improvement actions (shows the loop: feedback → action → review).
  actions: [
    {
      id: 'ia-1', feedbackId: 'fb-who-1', createdAt: '2026-10-22', status: 'completed',
      goal: 'Present with fewer, clearer slides and a steady pace',
      nextStep: 'Reduce my next presentation to max. three key messages per slide and rehearse it twice with a timer.',
      support: { type: 'peer', id: 'peer-demir' },
      followUp: { date: '2026-11-05', label: 'Final presentation – Predictive Maintenance (ENG-102)' },
      reviews: [{ date: '2026-11-05', result: 'Achieved', note: 'Used 9 slides instead of 18 – Dr. Hoffmann noticed the clearer slides.' }]
    },
    {
      id: 'ia-2', feedbackId: 'fb-leader-1', createdAt: '2026-10-26', status: 'in-progress',
      goal: 'Take on a leadership role in a team project',
      nextStep: 'Act as Scrum Master in the BMW project and agree on success criteria with the team at the kick-off.',
      support: { type: 'mentor', id: 'prj-bmw' },
      followUp: { date: '2026-11-20', label: 'Project period · BMW Group (MGT-102)' },
      reviews: []
    }
  ]
};

// Lookup helpers shared by all functions.
HS.find = {
  lecturer: (id) => HS.data.lecturers.find((l) => l.id === id),
  partner: (id) => HS.data.partners.find((p) => p.id === id),
  module: (id) => HS.data.modules.find((m) => m.id === id),
  project: (id) => HS.data.calendar.projects.find((p) => p.id === id),
  projectOfModule: (moduleId) => HS.data.calendar.projects.find((p) => p.moduleId === moduleId),
  // Person = the student or a peer.
  person: (id) => (id === HS.data.student.id
    ? { id, name: `${HS.data.student.firstName} ${HS.data.student.lastName}`, job: `${HS.data.student.jobTitle}, ${HS.data.student.employer}` }
    : HS.data.calendar.peers.find((p) => p.id === id))
};
