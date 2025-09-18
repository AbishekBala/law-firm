export interface CareerData {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  experience: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationProcess: {
    title: string;
    steps: string[];
  };
  icon: string;
  postedDate: string;
  deadline?: string;
}

export const careersData: CareerData[] = [
  {
    id: "senior-lawyer",
    title: "Senior Lawyer - Commercial Law",
    department: "Legal Services",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "5+ years",
    salary: "Competitive salary package",
    description: "Join our dynamic legal team as a Senior Lawyer specializing in Commercial Law. You will handle complex corporate transactions, provide strategic legal advice to multinational clients, and lead junior lawyers in delivering exceptional legal services.",
    responsibilities: [
      "Handle complex commercial litigation and dispute resolution cases",
      "Draft, review, and negotiate commercial contracts and agreements",
      "Provide legal counsel on mergers, acquisitions, and joint ventures",
      "Represent clients before Saudi courts and arbitration panels",
      "Lead and mentor junior lawyers and legal assistants",
      "Develop and maintain client relationships with corporate entities",
      "Ensure compliance with Saudi commercial laws and regulations",
      "Collaborate with international law firms on cross-border transactions"
    ],
    requirements: [
      "Law degree from a recognized university with excellent academic record",
      "5+ years of experience in commercial law, preferably in Saudi Arabia",
      "Licensed to practice law in Saudi Arabia",
      "Fluency in Arabic and English (written and verbal)",
      "Strong litigation and negotiation skills",
      "Experience with corporate transactions and commercial contracts",
      "Excellent analytical and problem-solving abilities",
      "Strong leadership and team management skills",
      "Professional certifications in commercial law (preferred)"
    ],
    benefits: [
      "Competitive salary with performance-based bonuses",
      "Comprehensive health insurance for you and your family",
      "Professional development opportunities and continuing education",
      "Flexible working arrangements and work-life balance",
      "Opportunity to work on high-profile international cases",
      "Career advancement opportunities within the firm",
      "Annual leave and sabbatical options",
      "State-of-the-art office facilities and technology"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit your CV, cover letter, and relevant certifications through our portal",
        "Initial screening and review of your application by our HR team",
        "First-round interview with the Legal Department Head",
        "Technical assessment and case study presentation",
        "Final interview with senior partners and cultural fit assessment",
        "Reference checks and background verification",
        "Job offer and contract negotiation"
      ]
    },
    icon: "Scale",
    postedDate: "2024-01-15",
    deadline: "2024-02-28"
  },
  {
    id: "junior-lawyer",
    title: "Junior Lawyer - Litigation",
    department: "Litigation",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "1-3 years",
    salary: "Entry-level competitive package",
    description: "We are seeking a motivated Junior Lawyer to join our litigation team. This role offers excellent growth opportunities for recent law graduates or lawyers with limited experience who are passionate about litigation and client advocacy.",
    responsibilities: [
      "Assist senior lawyers in preparing litigation cases and legal documentation",
      "Conduct legal research and case law analysis",
      "Draft legal memoranda, pleadings, and court submissions",
      "Attend court hearings and assist with client representation",
      "Communicate with clients under supervision of senior lawyers",
      "Maintain case files and ensure compliance with court deadlines",
      "Support settlement negotiations and alternative dispute resolution",
      "Assist in client interviews and witness preparation"
    ],
    requirements: [
      "Law degree from a recognized university",
      "1-3 years of experience in litigation or legal practice",
      "Licensed to practice law in Saudi Arabia or eligibility for licensure",
      "Strong written and verbal communication skills in Arabic and English",
      "Excellent research and analytical abilities",
      "Attention to detail and strong organizational skills",
      "Ability to work under pressure and meet tight deadlines",
      "Commitment to professional ethics and client confidentiality",
      "Willingness to learn and grow within the firm"
    ],
    benefits: [
      "Mentorship program with senior lawyers",
      "Comprehensive training in litigation procedures",
      "Health insurance and medical coverage",
      "Professional development budget for courses and certifications",
      "Clear career progression pathway",
      "Collaborative and supportive work environment",
      "Performance-based salary reviews",
      "Access to legal databases and research tools"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit your CV, cover letter, and academic transcripts",
        "Complete online legal knowledge assessment",
        "Initial interview with HR and Department Supervisor",
        "Technical interview and writing sample evaluation",
        "Final interview with senior partners",
        "Reference verification and background check",
        "Job offer and onboarding process"
      ]
    },
    icon: "FileText",
    postedDate: "2024-01-20",
    deadline: "2024-03-15"
  },
  {
    id: "legal-assistant",
    title: "Legal Assistant - Corporate Department",
    department: "Corporate Services",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "2+ years",
    description: "Join our Corporate Department as a Legal Assistant and play a crucial role in supporting our lawyers with administrative and paralegal tasks. This position is ideal for detail-oriented professionals who want to contribute to high-stakes corporate legal matters.",
    responsibilities: [
      "Prepare and organize legal documents and contracts",
      "Maintain client files and case management systems",
      "Schedule appointments and coordinate with clients and court officials",
      "Assist with due diligence processes for corporate transactions",
      "Research corporate records and regulatory filings",
      "Support lawyers during client meetings and court proceedings",
      "Handle confidential information with discretion",
      "Manage document production and filing requirements"
    ],
    requirements: [
      "Bachelor's degree in Law, Business Administration, or related field",
      "2+ years of experience as a legal assistant or paralegal",
      "Strong knowledge of Saudi corporate law and procedures",
      "Proficiency in Arabic and English",
      "Excellent computer skills including MS Office and legal software",
      "Strong organizational and time management abilities",
      "Attention to detail and accuracy in document preparation",
      "Professional demeanor and communication skills",
      "Ability to handle multiple tasks and priorities"
    ],
    benefits: [
      "Competitive salary and annual increments",
      "Health insurance and wellness programs",
      "Training opportunities in legal technology",
      "Supportive work environment with growth opportunities",
      "Flexible working hours",
      "Annual performance bonuses",
      "Professional development workshops",
      "Team building activities and events"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit CV and cover letter highlighting relevant experience",
        "Initial phone screening with HR department",
        "In-person interview with Corporate Department Manager",
        "Skills assessment and typing test",
        "Final interview and cultural fit evaluation",
        "Reference checks and employment verification",
        "Job offer and contract signing"
      ]
    },
    icon: "Building",
    postedDate: "2024-02-01"
  },
  {
    id: "ip-specialist",
    title: "Intellectual Property Specialist",
    department: "Intellectual Property",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "3+ years",
    salary: "Competitive with IP experience premium",
    description: "We are looking for an experienced Intellectual Property Specialist to join our growing IP department. You will handle trademark registrations, patent applications, and IP enforcement matters for local and international clients.",
    responsibilities: [
      "Handle trademark registration and renewal processes",
      "Conduct trademark searches and clearance analyses",
      "Prepare and file patent applications with SAIP",
      "Manage IP portfolio for corporate clients",
      "Handle trademark opposition and cancellation proceedings",
      "Advise clients on IP strategy and protection measures",
      "Draft licensing agreements and IP transfer documents",
      "Monitor and enforce IP rights against infringement"
    ],
    requirements: [
      "Law degree with specialization in Intellectual Property",
      "3+ years of experience in IP law and practice",
      "Registration with Saudi Authority for Intellectual Property (SAIP)",
      "Strong knowledge of trademark and patent law",
      "Experience with international IP systems (Madrid Protocol, PCT)",
      "Excellent analytical and research skills",
      "Fluency in Arabic and English",
      "Client relationship management experience",
      "Technical background (preferred for patent work)"
    ],
    benefits: [
      "Specialized IP practice with diverse clientele",
      "Competitive salary with IP expertise premium",
      "International training opportunities",
      "Access to global IP databases and tools",
      "Professional development in IP law",
      "Health insurance and family coverage",
      "Performance-based bonuses",
      "Flexible work arrangements"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit CV, cover letter, and IP-related work samples",
        "Portfolio review and initial screening",
        "Technical interview with IP Department Head",
        "Client scenario assessment and case study",
        "Interview with senior partners",
        "Professional reference verification",
        "Final offer and contract negotiation"
      ]
    },
    icon: "Shield",
    postedDate: "2024-01-25",
    deadline: "2024-03-30"
  },
  {
    id: "legal-translator",
    title: "Legal Translator (Arabic-English)",
    department: "Translation Services",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "2+ years",
    description: "Join our Translation Services team as a Legal Translator specializing in Arabic-English translation of legal documents. You will ensure accurate and culturally appropriate translations for our diverse client base.",
    responsibilities: [
      "Translate legal documents between Arabic and English",
      "Review and edit translations for accuracy and consistency",
      "Certify translated documents for official use",
      "Maintain translation databases and terminology glossaries",
      "Collaborate with lawyers to ensure legal accuracy",
      "Handle urgent translation requests under tight deadlines",
      "Provide interpreting services during legal proceedings",
      "Quality assurance and proofreading of translations"
    ],
    requirements: [
      "Bachelor's degree in Translation, Languages, or Law",
      "2+ years of experience in legal translation",
      "Native proficiency in Arabic and excellent English skills",
      "Strong knowledge of legal terminology in both languages",
      "Certification in translation (preferred)",
      "Experience with CAT tools and translation software",
      "Attention to detail and cultural sensitivity",
      "Ability to work under pressure and meet deadlines",
      "Confidentiality and professional ethics"
    ],
    benefits: [
      "Specialized training in legal translation",
      "Competitive salary with language premium",
      "Health insurance and medical benefits",
      "Professional development opportunities",
      "Flexible working arrangements",
      "Access to translation tools and resources",
      "Performance-based salary increases",
      "Multicultural work environment"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit CV, cover letter, and translation portfolio",
        "Complete translation assessment test",
        "Interview with Translation Services Manager",
        "Technical evaluation of translation skills",
        "Cultural competency assessment",
        "Reference checks and verification",
        "Job offer and contract agreement"
      ]
    },
    icon: "Globe",
    postedDate: "2024-02-05"
  },
  {
    id: "business-development-manager",
    title: "Business Development Manager - Legal Services",
    department: "Business Development",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    experience: "5+ years",
    salary: "Base salary + commission structure",
    description: "We are seeking a dynamic Business Development Manager to drive growth and expand our client base. You will be responsible for developing new business opportunities and maintaining relationships with existing clients in the legal services sector.",
    responsibilities: [
      "Develop and implement business development strategies",
      "Identify and pursue new client opportunities",
      "Build and maintain relationships with corporate clients",
      "Prepare proposals and presentations for potential clients",
      "Attend networking events and industry conferences",
      "Collaborate with legal teams to understand service offerings",
      "Monitor market trends and competitor activities",
      "Achieve revenue targets and growth objectives"
    ],
    requirements: [
      "Bachelor's degree in Business, Marketing, or related field",
      "5+ years of experience in business development or sales",
      "Experience in legal services industry (preferred)",
      "Strong networking and relationship-building skills",
      "Excellent presentation and communication abilities",
      "Strategic thinking and analytical skills",
      "Fluency in Arabic and English",
      "Knowledge of Saudi business environment",
      "Results-oriented with proven track record"
    ],
    benefits: [
      "Competitive base salary plus commission",
      "Performance-based bonuses and incentives",
      "Health insurance and family coverage",
      "Professional development budget",
      "Networking and conference attendance opportunities",
      "Career advancement potential",
      "Company car and expense allowances",
      "Flexible working arrangements"
    ],
    applicationProcess: {
      title: "Application Process",
      steps: [
        "Submit CV, cover letter, and business development portfolio",
        "Initial screening call with HR",
        "Interview with Business Development Director",
        "Presentation of growth strategy proposal",
        "Final interview with senior management",
        "Reference and background verification",
        "Offer negotiation and contract signing"
      ]
    },
    icon: "DollarSign",
    postedDate: "2024-01-30",
    deadline: "2024-04-15"
  }
];

export const getCareerById = (id: string): CareerData | undefined => {
  return careersData.find(career => career.id === id);
};

export const getCareersByDepartment = (department: string): CareerData[] => {
  return careersData.filter(career => career.department === department);
};

export const getFeaturedCareers = (): CareerData[] => {
  return careersData.slice(0, 3);
};