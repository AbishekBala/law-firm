export interface BlogContentSection {
  type: 'heading' | 'paragraph' | 'image';
  content?: {
    en: string;
    ar: string;
  };
  level?: number; // For heading level (h1, h2, h3, etc.)
  imageUrl?: string; // For image sections
  imageAlt?: {
    en: string;
    ar: string;
  };
}

export interface BlogPost {
  id: number;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: BlogContentSection[];
  thumbnail: string;
  category: {
    en: string;
    ar: string;
  };
  author: string;
  date: string;
  readTime: {
    en: string;
    ar: string;
  };
  tags: {
    en: string[];
    ar: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "corporate-law-saudi-arabia",
    title: {
      en: "Corporate Law Changes in Saudi Arabia",
      ar: "تغييرات قانون الشركات في المملكة العربية السعودية"
    },
    excerpt: {
      en: "Saudi Arabia has introduced significant changes to its corporate law framework as part of Vision 2030. These changes affect business registration and foreign investment.",
      ar: "أدخلت المملكة العربية السعودية تغييرات مهمة على إطار قانون الشركات كجزء من رؤية 2030. تؤثر هذه التغييرات على تسجيل الشركات والاستثمار الأجنبي."
    },
    content: [
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Saudi Arabia skyline with modern buildings',
          ar: 'أفق المملكة العربية السعودية مع مباني عصرية'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Introduction to Corporate Law Reforms',
          ar: 'مقدمة في إصلاحات قانون الشركات'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Saudi Arabia has embarked on an ambitious journey to transform its economic landscape through Vision 2030. A cornerstone of this transformation is the comprehensive reform of corporate laws and regulations.',
          ar: 'شرعت المملكة العربية السعودية في رحلة طموحة لتحويل مشهدها الاقتصادي من خلال رؤية 2030. ويعد إصلاح قوانين ولوائح الشركات حجر الزاوية في هذا التحول.'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'These reforms aim to create a more business-friendly environment, attract foreign investment, and position the Kingdom as a global investment hub.',
          ar: 'تهدف هذه الإصلاحات إلى خلق بيئة أكثر ملاءمة للأعمال، وجذب الاستثمار الأجنبي، ووضع المملكة كمركز استثماري عالمي.'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Key Legislative Changes',
          ar: 'أهم التغييرات التشريعية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'The new corporate law framework introduces several groundbreaking changes that significantly impact how businesses operate in the Kingdom.',
          ar: 'يقدم إطار قانون الشركات الجديد عدة تغييرات ثورية تؤثر بشكل كبير على كيفية عمل الشركات في المملكة.'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Business professionals in a meeting',
          ar: 'محترفون أعمال في اجتماع'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Business Registration Process',
          ar: 'عملية تسجيل الأعمال'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'The business registration process has been streamlined to be completed within 24 hours through the unified national business platform. This marks a significant improvement from the previous system that could take several weeks.',
          ar: 'تم تبسيط عملية تسجيل الأعمال بحيث يمكن إكمالها في غضون 24 ساعة من خلال المنصة الوطنية الموحدة للأعمال. وهذا يمثل تحسناً كبيراً عن النظام السابق الذي كان يستغرق عدة أسابيع.'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Foreign Investment Reforms',
          ar: 'إصلاحات الاستثمار الأجنبي'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'The new regulations allow for 100% foreign ownership in most sectors, eliminating the previous requirement for a local partner. This change is expected to significantly boost foreign direct investment in the Kingdom.',
          ar: 'تسمح اللوائح الجديدة بالملكية الأجنبية بنسبة 100٪ في معظم القطاعات، مما يلغي اشتراط الشريك المحلي السابق. ومن المتوقع أن يعزز هذا التغيير الاستثمار الأجنبي المباشر في المملكة بشكل كبير.'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Handshake between business partners',
          ar: 'مصافحة بين شريكي أعمال'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Impact on Existing Businesses',
          ar: 'التأثير على الشركات القائمة'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Existing businesses are encouraged to review their current corporate structures and governance frameworks to ensure compliance with the new regulations and take advantage of the opportunities they present.',
          ar: 'يتم تشجيع الشركات القائمة على مراجعة هياكلها الحالية وأطر الحوكمة لضمان الامتثال للوائح الجديدة والاستفادة من الفرص التي تتيحها.'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'The Ministry of Commerce has established dedicated support centers to assist businesses with the transition and provide guidance on the new requirements.',
          ar: 'أنشأت وزارة التجارة مراكز دعم مخصصة لمساعدة الشركات في عملية الانتقال وتقديم التوجيهات المتعلقة بالمتطلبات الجديدة.'
        }
      }
    ],
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    category: {
      en: "Corporate Law",
      ar: "قانون الشركات"
    },
    author: "Ali Bin Fahad",
    date: "2024-09-15",
    readTime: {
      en: "5 min read",
      ar: "5 دقائق قراءة"
    },
    tags: {
      en: ["Corporate Law", "Saudi Arabia", "Vision 2030"],
      ar: ["قانون الشركات", "السعودية", "رؤية 2030"]
    }
  },
  {
    id: 2,
    slug: "intellectual-property-protection",
    title: {
      en: "Intellectual Property Protection Strategies",
      ar: "استراتيجيات حماية الملكية الفكرية"
    },
    excerpt: {
      en: "Learn about essential strategies for protecting your intellectual property rights in the digital age, including trademarks, patents, and copyrights.",
      ar: "تعرف على الاستراتيجيات الأساسية لحماية حقوق الملكية الفكرية في العصر الرقمي، بما في ذلك العلامات التجارية وبراءات الاختراع وحقوق النشر."
    },
    content: [
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Abstract digital lock representing intellectual property protection',
          ar: 'قفل رقمي مجرد يمثل حماية الملكية الفكرية'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Understanding Intellectual Property',
          ar: 'فهم الملكية الفكرية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'In today\'s digital economy, protecting your intellectual property (IP) has never been more critical. IP assets often represent a company\'s most valuable resources and competitive advantages.',
          ar: 'في الاقتصاد الرقمي اليوم، أصبحت حماية الملكية الفكرية أكثر أهمية من أي وقت مضى. غالباً ما تمثل أصول الملكية الفكرية أكثر الموارد والمزايا التنافسية قيمة للشركة.'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Trademarks and Brand Protection',
          ar: 'العلامات التجارية وحماية العلامة'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Trademarks serve as the face of your business in the marketplace. They include brand names, logos, slogans, and other distinctive signs that help consumers identify your products or services.',
          ar: 'تمثل العلامات التجارية وجه عملك في السوق. وتشمل أسماء العلامات التجارية والشعارات والشعارات الإعلانية والعلامات المميزة الأخرى التي تساعد المستهلكين على التعرف على منتجاتك أو خدماتك.'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Trademark symbols on documents',
          ar: 'رموز العلامات التجارية على المستندات'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Patent Protection',
          ar: 'حماية براءات الاختراع'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Patents protect new inventions and technical innovations, giving inventors exclusive rights to their creations for a limited period. This encourages innovation by ensuring inventors can benefit from their inventions.',
          ar: 'تحمي براءات الاختراع الابتكارات التقنية الجديدة، مما يمنح المخترعين حقوقاً حصرية لاختراعاتهم لفترة محدودة. يشجع ذلك على الابتكار من خلال ضمان استفادة المخترعين من اختراعاتهم.'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Best Practices for IP Protection',
          ar: 'أفضل الممارسات لحماية الملكية الفكرية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'To effectively protect your intellectual property, consider these key strategies:',
          ar: 'لحماية ملكيتك الفكرية بشكل فعال، ضع في اعتبارك هذه الاستراتيجيات الرئيسية:'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '1. Conduct thorough IP audits to identify all your intellectual property assets.',
          ar: '1. إجراء عمليات تدقيق شاملة للملكية الفكرية لتحديد جميع أصول الملكية الفكرية الخاصة بك.'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '2. Register your IP rights in all relevant jurisdictions where you operate.',
          ar: '2. تسجيل حقوق الملكية الفكرية الخاصة بك في جميع الولايات القضائية ذات الصلة التي تعمل فيها.'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '3. Implement robust confidentiality agreements with employees and partners.',
          ar: '3. تنفيذ اتفاقيات سرية قوية مع الموظفين والشركاء.'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Legal documents and IP protection',
          ar: 'المستندات القانونية وحماية الملكية الفكرية'
        }
      }
    ],
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: {
      en: "Intellectual Property",
      ar: "الملكية الفكرية"
    },
    author: "Sarah Al-Mansouri",
    date: "2024-09-10",
    readTime: {
      en: "6 min read",
      ar: "6 دقائق قراءة"
    },
    tags: {
      en: ["Intellectual Property", "Trademarks", "Patents"],
      ar: ["الملكية الفكرية", "العلامات التجارية", "براءات الاختراع"]
    }
  },
  {
    id: 3,
    slug: "commercial-litigation-guide",
    title: {
      en: "Commercial Litigation: A Practical Guide",
      ar: "التقاضي التجاري: دليل عملي"
    },
    excerpt: {
      en: "Understanding commercial litigation processes, alternative dispute resolution methods, and how to protect your business interests in legal disputes.",
      ar: "فهم عمليات التقاضي التجاري وطرق حل النزاعات البديلة وكيفية حماية مصالح شركتك في النزاعات القانونية."
    },
    content: [
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Scales of justice representing commercial litigation',
          ar: 'ميزان العدالة يمثل التقاضي التجاري'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Understanding Commercial Litigation',
          ar: 'فهم التقاضي التجاري'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Commercial litigation encompasses a wide range of legal disputes that arise in the business context. These disputes can involve breach of contract, partnership disagreements, intellectual property disputes, and regulatory compliance issues.',
          ar: 'يشمل التقاضي التجاري مجموعة واسعة من النزاعات القانونية التي تنشأ في سياق الأعمال. يمكن أن تشمل هذه النزاعات خرق العقد، وخلافات الشراكة، ونزاعات الملكية الفكرية، وقضايا الامتثال التنظيمي.'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Common Types of Commercial Disputes',
          ar: 'الأنواع الشائعة للنزاعات التجارية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Businesses may face various types of disputes, including:',
          ar: 'قد تواجه الشركات أنواعاً مختلفة من النزاعات، بما في ذلك:'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• Contract disputes and breaches of agreement',
          ar: '• النزاعات التعاقدية وخرق الاتفاقيات'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• Shareholder and partnership disputes',
          ar: '• نزاعات المساهمين والشركاء'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• Intellectual property infringement',
          ar: '• انتهاك حقوق الملكية الفكرية'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'Alternative Dispute Resolution (ADR)',
          ar: 'طرق حل النزاعات البديلة (ADR)'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Before proceeding to court, many businesses opt for alternative dispute resolution methods, which can be more cost-effective and less time-consuming than traditional litigation.',
          ar: 'قبل المضي قدماً في المحكمة، تختار العديد من الشركات طرق حل النزاعات البديلة، والتي يمكن أن تكون أكثر فعالية من حيث التكلفة وتستغرق وقتاً أقل من التقاضي التقليدي.'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Mediation Process',
          ar: 'عملية الوساطة'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Mediation involves a neutral third party who helps facilitate discussions between disputing parties to reach a mutually acceptable resolution. This process is confidential and non-binding unless an agreement is reached.',
          ar: 'تتضمن الوساطة طرفاً ثالثاً محايداً يساعد في تسهيل المناقشات بين الأطراف المتنازعة للوصول إلى حل مقبول للطرفين. هذه العملية سرية وغير ملزمة ما لم يتم التوصل إلى اتفاق.'
        }
      },
      {
        type: 'heading',
        level: 3,
        content: {
          en: 'Arbitration Benefits',
          ar: 'مزايا التحكيم'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'Arbitration offers a more formal process than mediation, where an arbitrator makes a binding decision. It provides a faster resolution than court proceedings while maintaining privacy.',
          ar: 'يقدم التحكيم عملية أكثر رسمية من الوساطة، حيث يتخذ المحكم قراراً ملزماً. يوفر حلاً أسرع من الإجراءات القضائية مع الحفاظ على الخصوصية.'
        }
      },
      {
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
        imageAlt: {
          en: 'Business professionals shaking hands in a meeting',
          ar: 'محترفون في مجال الأعمال يصافحون بعضهم البعض في اجتماع'
        }
      },
      {
        type: 'heading',
        level: 2,
        content: {
          en: 'When to Consider Litigation',
          ar: 'متى تفكر في التقاضي'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: 'While ADR methods are often preferable, there are situations where litigation becomes necessary. Consider litigation when:',
          ar: 'بينما تكون طرق حل النزاعات البديلة مفضلة في كثير من الأحيان، هناك حالات يصبح فيها التقاضي ضرورياً. فكر في التقاضي عندما:'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• The other party refuses to participate in good-faith negotiations',
          ar: '• يرفض الطرف الآخر المشاركة في مفاوضات حسن النية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• You need immediate injunctive relief',
          ar: '• تحتاج إلى إجراءات تحفظية فورية'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• The dispute involves complex legal issues requiring court interpretation',
          ar: '• ينطوي النزاع على قضايا قانونية معقدة تتطلب تفسيراً قضائياً'
        }
      },
      {
        type: 'paragraph',
        content: {
          en: '• You need to establish a legal precedent',
          ar: '• تحتاج إلى إنشاء سابقة قانونية'
        }
      }
    ],
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    category: {
      en: "Commercial Law",
      ar: "القانون التجاري"
    },
    author: "Ahmed Bin Sultan",
    date: "2024-09-05",
    readTime: {
      en: "8 min read",
      ar: "8 دقائق قراءة"
    },
    tags: {
      en: ["Commercial Law", "Litigation", "Dispute Resolution"],
      ar: ["القانون التجاري", "التقاضي", "حل النزاعات"]
    }
  }
];