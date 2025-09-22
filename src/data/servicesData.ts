import { ServiceItem, ServicePageData } from '@/types/service';

interface ServiceData {
  id: string;
  en: {
    title: string;
    description: string;
    points: string[];
  };
  ar: {
    title: string;
    description: string;
    points: string[];
  };
  tags?: string[];
}

export const servicesData: { services: ServiceData[] } = {

  services: [
    {
      id: "legal-consultation",
      en: {
        title: "Expert Legal Consultation",
        description: "Looking for expert legal advice in Saudi Arabia? Our experienced lawyers provide tailored legal consultation services for businesses and individuals, helping you navigate complex legal challenges with ease.",
        points: [
          "Corporate and Commercial Law",
          "Dispute Resolution and Litigation",
          "Intellectual Property Law",
          "Personal Legal Support",
          "Regulatory Compliance",
          "Risk Assessment and Mitigation"
        ]
      },
      ar: {
        title: "استشارات قانونية احترافية",
        description: "هل تبحث عن استشارة قانونية احترافية في المملكة العربية السعودية؟ يقدم محامونا ذوو الخبرة خدمات استشارية قانونية مخصصة للشركات والأفراد، مما يساعدك على تجاوز التحديات القانونية المعقدة بسهولة.",
        points: [
          "قانون الشركات والتجارة",
          "تسوية المنازعات والمنازعات القضائية",
          "قانون الملكية الفكرية",
          "الدعم القانوني الشخصي",
          "الامتثال التنظيمي",
          "تقييم المخاطر والتخفيف من حدتها"
        ]
      },
      tags: ["consultation", "legal advice", "business"]
    },
    {
      id: "litigation-representation",
      en: {
        title: "Litigation & Representation",
        description: "When legal disputes arise, our seasoned litigators provide strategic legal advocacy in Saudi Arabia, protecting your rights and achieving the best possible outcomes in every case.",
        points: [
          "Civil Litigation",
          "Commercial Litigation",
          "Criminal Defense",
          "Administrative and Labor Disputes",
          "Arbitration and Alternative Dispute Resolution",
          "Strategic Legal Advocacy"
        ]
      },
      ar: {
        title: "المحاكمات والتمثيل القانوني",
        description: "عندما تنشأ النزاعات القانونية، يقدم محامونا المخضرمون الدفاع القانوني الاستراتيجي في المملكة العربية السعودية، لحماية حقوقك وتحقيق أفضل النتائج الممكنة في كل قضية.",
        points: [
          "المنازعات المدنية",
          "المنازعات التجارية",
          "الدفاع الجنائي",
          "منازعات العمل والإدارة",
          "التحكيم وتسوية المنازعات البديلة",
          "الدفاع القانوني الاستراتيجي"
        ]
      },
      tags: ["litigation", "court", "legal representation"]
    },
    {
      id: "company-formation",
      en: {
        title: "Company Formation",
        description: "Professional, end-to-end legal services for establishing your business or investing in Saudi Arabia, ensuring successful formation and growth in the Saudi market.",
        points: [
          "Legal Consultation",
          "Drafting and Reviewing Contracts",
          "Licensing and Commercial Registration",
          "Entity Transformation",
          "Corporate Governance",
          "Legal Representation and Litigation"
        ]
      },
      ar: {
        title: "تأسيس الشركات",
        description: "خدمات قانونية احترافية شاملة لتأسيس عملك أو استثمارك في المملكة العربية السعودية، مما يضمن التأسيس الناجح والنمو في السوق السعودي.",
        points: [
          "الاستشارات القانونية",
          "صياغة ومراجعة العقود",
          "التراخيص والتسجيل التجاري",
          "تحويل الكيان",
          "حوكمة الشركات",
          "التمثيل القانوني والمحاكمات"
        ]
      },
      tags: ["company", "business", "startup"]
    },
    {
      id: "bankruptcy-debt-restructuring",
      en: {
        title: "Bankruptcy & Debt Restructuring",
        description: "Specialized services for bankruptcy applications and debt restructuring, providing businesses and individuals with the support needed to comply with Saudi Bankruptcy Law.",
        points: [
          "Filing Bankruptcy Applications",
          "Debt Restructuring and Settlement",
          "Liquidation and Asset Management",
          "Financial Recovery Planning",
          "Creditor Negotiations",
          "Court Representation"
        ]
      },
      ar: {
        title: "الإفلاس وإعادة هيكلة الديون",
        description: "خدمات متخصصة في تقديم طلبات الإفلاس وإعادة هيكلة الديون، وتقديم الدعم اللازم للشركات والأفراد للامتثال لقانون الإفلاس السعودي.",
        points: [
          "تقديم طلبات الإفلاس",
          "إعادة هيكلة الديون والتسوية",
          "التصفية وإدارة الأصول",
          "تخطيط التعافي المالي",
          "مفاوضات الدائنين",
          "التمثيل أمام المحكمة"
        ]
      },
      tags: ["bankruptcy", "debt", "restructuring"]
    },
    {
      id: "estate-liquidation",
      en: {
        title: "Estate Liquidation",
        description: "Comprehensive estate liquidation services to help individuals and families handle the process with ease, ensuring compliance with Saudi inheritance laws.",
        points: [
          "Asset Evaluation and Inventory",
          "Debt Settlement and Claims Management",
          "Legal Representation in Estate Disputes",
          "Asset Distribution and Transfer",
          "Compliance with Saudi Inheritance Laws",
          "Estate Planning Guidance"
        ]
      },
      ar: {
        title: "تصفية التركات",
        description: "خدمات شاملة لتصفية التركات لمساعدة الأفراد والأسر على التعامل مع العملية بسهولة، مع ضمان الامتثال لقوانين الميراث السعودية.",
        points: [
          "تقييم الأصول وجردها",
          "تسوية الديون وإدارة المطالبات",
          "التمثيل القانوني في منازعات التركات",
          "توزيع ونقل الأصول",
          "الامتثال لقوانين الميراث السعودية",
          "توجيهات التخطيط للتركة"
        ]
      },
      tags: ["estate", "inheritance", "legal"]
    },
    {
      id: "contract-drafting-notarization",
      en: {
        title: "Contract Drafting & Notarization",
        description: "Professional contract drafting, notarization, and document legalization services ensuring your documents are accurate, enforceable, and compliant with Saudi and international regulations.",
        points: [
          "Corporate and Commercial Contracts",
          "Employment Contracts",
          "Real Estate Contracts",
          "Customized Agreements",
          "Notarization Services",
          "Legalization and Attestation Services"
        ]
      },
      ar: {
        title: "صياغة العقود والتوثيق",
        description: "خدمات احترافية في صياغة العقود والتوثيق وإضفاء الصفة الرسمية على المستندات لضمان دقة مستنداتك وقابليتها للتنفيذ وامتثالها للوائح السعودية والدولية.",
        points: [
          "عقود الشركات والتجارة",
          "عقود العمل",
          "عقود العقارات",
          "اتفاقيات مخصصة",
          "خدمات التوثيق",
          "خدمات التصديق والتأشير"
        ]
      },
      tags: ["contracts", "legal documents", "notarization"]
    },
    {
      id: "debt-collection",
      en: {
        title: "Debt Collection",
        description: "Efficient and ethical debt collection services in Saudi Arabia, helping businesses and individuals recover outstanding debts through professional and legal means.",
        points: [
          "Commercial Debt Collection",
          "Personal Debt Recovery",
          "Pre-Litigation Debt Recovery",
          "Legal Action for Debt Recovery",
          "Debt Settlement Negotiations",
          "Asset Tracing and Recovery"
        ]
      },
      ar: {
        title: "تحصيل الديون",
        description: "خدمات فعالة وأخلاقية لتحصيل الديون في المملكة العربية السعودية، لمساعدة الشركات والأفراد على استرداد الديون المستحقة من خلال وسائل احترافية وقانونية.",
        points: [
          "تحصيل الديون التجارية",
          "استرداد الديون الشخصية",
          "استرداد الديون قبل التقاضي",
          "اتخاذ إجراءات قضائية لاسترداد الديون",
          "مفاوضات تسوية الديون",
          "تتبع واسترداد الأصول"
        ]
      },
      tags: ["debt", "collection", "recovery"]
    },
    {
      id: "legal-translation",
      en: {
        title: "Legal Translation",
        description: "Certified legal translation services ensuring your documents are accurate, legally valid, and ready for official use in Saudi Arabia and internationally.",
        points: [
          "Certified Translation of Legal Documents",
          "Multilingual Legal Translation Services",
          "Specialized Legal Translation for Businesses",
          "Translation for Personal Legal Matters",
          "Quality Assurance Process",
          "Fast Turnaround Times"
        ]
      },
      ar: {
        title: "الترجمة القانونية",
        description: "خدمات ترجمة قانونية معتمدة لضمان دقة مستنداتك وصدقها قانونيا وجاهزيتها للاستخدام الرسمي في المملكة العربية السعودية وعلى الصعيد الدولي.",
        points: [
          "الترجمة المعتمدة للمستندات القانونية",
          "خدمات الترجمة القانونية متعددة اللغات",
          "الترجمة القانونية المخصصة للأعمال",
          "الترجمة للقضايا القانونية الشخصية",
          "عملية ضمان الجودة",
          "أوقات إنجاز سريعة"
        ]
      },
      tags: ["translation", "legal", "certified"]
    },
    {
      id: "trademark-services",
      en: {
        title: "Trademark Services",
        description: "Comprehensive trademark services to safeguard your intellectual property in Saudi Arabia, from registration to enforcement and dispute resolution.",
        points: [
          "Trademark Registration in Saudi Arabia",
          "Trademark Protection and Renewals",
          "Trademark Enforcement",
          "Trademark Dispute Resolution",
          "International Trademark Services",
          "Comprehensive Brand Strategy"
        ]
      },
      ar: {
        title: "خدمات العلامات التجارية",
        description: "خدمات شاملة للعلامات التجارية لحماية حقوق الملكية الفكرية في المملكة العربية السعودية، من التسجيل إلى التنفيذ وحل النزاعات.",
        points: [
          "تسجيل العلامات التجارية في المملكة العربية السعودية",
          "حماية العلامات التجارية وتجديدها",
          "تنفيذ العلامات التجارية",
          "حل نزاعات العلامات التجارية",
          "خدمات العلامات التجارية الدولية",
          "استراتيجية العلامة التجارية الشاملة"
        ]
      },
      tags: ["trademark", "intellectual property", "protection"]
    },
    {
      id: "franchising-services",
      en: {
        title: "Franchising Services",
        description: "Comprehensive franchising services in Saudi Arabia, providing legal guidance and support for both franchisors and franchisees.",
        points: [
          "Drafting and Reviewing Franchise Agreements",
          "Compliance with Saudi Franchise Law",
          "Franchise Registration with Relevant Authorities",
          "Dispute Resolution and Enforcement",
          "International Franchising Services",
          "End-to-End Legal Support"
        ]
      },
      ar: {
        title: "خدمات التفرغ",
        description: "خدمات تفرغ شاملة في المملكة العربية السعودية، تقدم إرشادات قانونية ودعم للفرعين المالكين والمتفرجين.",
        points: [
          "صياغة ومراجعة اتفاقيات التفرغ",
          "الامتثال لقانون التفرغ السعودي",
          "تسجيل التفرغ لدى السلطات ذات الصلة",
          "حل النزاعات وتنفيذها",
          "خدمات التفرغ الدولية",
          "الدعم القانوني الشامل"
        ]
      },
      tags: ["franchising", "legal", "support"]
    },
    {
      id: "estore-registration",
      en: {
        title: "E-Store Registration",
        description: "Comprehensive e-store registration and legal compliance services to help businesses establish and operate successful online stores in Saudi Arabia.",
        points: [
          "E-Store Registration",
          "Compliance with Saudi E-Commerce Laws",
          "Intellectual Property Protection for E-Stores",
          "Cybersecurity and Data Protection Compliance",
          "Dispute Resolution and Legal Support",
          "Cross-Border E-Commerce"
        ]
      },
      ar: {
        title: "تسجيل المتاجر الإلكترونية",
        description: "خدمات تسجيل المتاجر الإلكترونية والامتثال القانوني الشاملة لمساعدة الشركات على إنشاء وتشغيل متاجر إلكترونية ناجحة في المملكة العربية السعودية.",
        points: [
          "تسجيل المتاجر الإلكترونية",
          "الامتثال لقوانين التجارة الإلكترونية السعودية",
          "حماية حقوق الملكية الفكرية للمتاجر الإلكترونية",
          "الامتثال لأمن المعلومات وحماية البيانات",
          "حل النزاعات والدعم القانوني",
          "التجارة الإلكترونية عبر الحدود"
        ]
      },
      tags: ["e-store", "registration", "compliance"]
    },
    {
      id: "real-estate-legal-services",
      en: {
        title: "Real Estate Legal Services",
        description: "Expert legal services for all real estate matters in Saudi Arabia, including property transactions, disputes, and development projects.",
        points: [
          "Property Registration",
          "Lease Agreement Review",
          "Real Estate Disputes",
          "Due Diligence",
          "Off-Plan Property",
          "Real Estate Development"
        ]
      },
      ar: {
        title: "الخدمات القانونية العقارية",
        description: "خدمات قانونية متخصصة في جميع الأمور العقارية في المملكة العربية السعودية، بما في ذلك المعاملات العقارية والمنازعات ومشاريع التطوير.",
        points: [
          "تسجيل العقارات",
          "مراجعة عقود الإيجار",
          "المنازعات العقارية",
          "الفحص القانوني",
          "العقارات قيد الإنشاء",
          "التطوير العقاري"
        ]
      },
      tags: ["real estate", "property", "legal"]
    }
  ]
};

// Utility function to get service by ID
export const getServiceById = (id: string): ServiceItem | undefined => {
  const service = servicesData.services.find(s => s.id === id);
  if (!service) return undefined;
  
  return {
    id: service.id,
    en: {
      title: service.en.title,
      description: service.en.description,
      points: service.en.points
    },
    ar: {
      title: service.ar.title,
      description: service.ar.description,
      points: service.ar.points
    },
    tags: service.tags || [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};