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
  content: {
    en: string;
    ar: string;
  };
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
    content: {
      en: `
        <h2>Introduction</h2>
        <p>Saudi Arabia's corporate law landscape has undergone significant transformation in recent years, particularly as part of the Kingdom's ambitious Vision 2030 initiative.</p>
        
        <h2>Key Changes</h2>
        <p>The new regulations have streamlined the business registration process, reducing the time required from several weeks to just a few days.</p>
        
        <h3>Foreign Investment</h3>
        <p>The Kingdom has significantly liberalized foreign investment rules, now allowing 100% foreign ownership in many sectors.</p>
        
        <h2>Impact on Businesses</h2>
        <p>Existing businesses need to review their current corporate structure and ensure compliance with the new regulations.</p>
      `,
      ar: `
        <h2>المقدمة</h2>
        <p>شهد المشهد القانوني للشركات في المملكة العربية السعودية تحولاً كبيراً في السنوات الأخيرة، خاصة كجزء من مبادرة رؤية 2030 الطموحة للمملكة.</p>
        
        <h2>التغييرات الرئيسية</h2>
        <p>عملت اللوائح الجديدة على تبسيط عملية تسجيل الشركات، مما قلل الوقت المطلوب من عدة أسابيع إلى بضعة أيام فقط.</p>
        
        <h3>الاستثمار الأجنبي</h3>
        <p>حررت المملكة بشكل كبير قواعد الاستثمار الأجنبي، حيث تسمح الآن بالملكية الأجنبية بنسبة 100% في العديد من القطاعات.</p>
        
        <h2>التأثير على الشركات</h2>
        <p>تحتاج الشركات الحالية إلى مراجعة هيكلها الحالي وضمان الامتثال للوائح الجديدة.</p>
      `
    },
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
    content: {
      en: `
        <h2>Types of Intellectual Property</h2>
        <p>Intellectual property includes trademarks, patents, copyrights, and trade secrets. Each type requires different protection strategies.</p>
        
        <h3>Trademarks</h3>
        <p>Trademarks protect brand names, logos, and distinctive signs that identify your business.</p>
        
        <h3>Patents</h3>
        <p>Patents protect inventions and technical innovations for a specific period.</p>
        
        <h2>Best Practices</h2>
        <p>Register your IP rights early and monitor for potential infringement to maintain protection.</p>
      `,
      ar: `
        <h2>أنواع الملكية الفكرية</h2>
        <p>تشمل الملكية الفكرية العلامات التجارية وبراءات الاختراع وحقوق النشر والأسرار التجارية. كل نوع يتطلب استراتيجيات حماية مختلفة.</p>
        
        <h3>العلامات التجارية</h3>
        <p>تحمي العلامات التجارية أسماء العلامات التجارية والشعارات والعلامات المميزة التي تحدد هوية شركتك.</p>
        
        <h3>براءات الاختراع</h3>
        <p>تحمي براءات الاختراع الاختراعات والابتكارات التقنية لفترة محددة.</p>
        
        <h2>أفضل الممارسات</h2>
        <p>سجل حقوق الملكية الفكرية مبكراً وراقب الانتهاكات المحتملة للحفاظ على الحماية.</p>
      `
    },
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    category: {
      en: "Intellectual Property",
      ar: "الملكية الفكرية"
    },
    author: "Sarah Al-Mansouri",
    date: "2024-09-10",
    readTime: {
      en: "4 min read",
      ar: "4 دقائق قراءة"
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
    content: {
      en: `
        <h2>What is Commercial Litigation?</h2>
        <p>Commercial litigation involves legal disputes between businesses, covering contracts, partnerships, and regulatory compliance issues.</p>
        
        <h2>Alternative Dispute Resolution</h2>
        <p>Many commercial disputes can be resolved through mediation or arbitration, which are often faster and less expensive than traditional litigation.</p>
        
        <h3>Mediation Benefits</h3>
        <p>Mediation allows parties to maintain business relationships while resolving disputes amicably.</p>
        
        <h2>When to Consider Litigation</h2>
        <p>Litigation may be necessary when other resolution methods fail or when immediate legal remedies are required.</p>
      `,
      ar: `
        <h2>ما هو التقاضي التجاري؟</h2>
        <p>يشمل التقاضي التجاري النزاعات القانونية بين الشركات، ويغطي العقود والشراكات وقضايا الامتثال التنظيمي.</p>
        
        <h2>حل النزاعات البديل</h2>
        <p>يمكن حل العديد من النزاعات التجارية من خلال الوساطة أو التحكيم، وهي غالباً أسرع وأقل تكلفة من التقاضي التقليدي.</p>
        
        <h3>فوائد الوساطة</h3>
        <p>تسمح الوساطة للأطراف بالحفاظ على العلاقات التجارية أثناء حل النزاعات بشكل ودي.</p>
        
        <h2>متى تفكر في التقاضي</h2>
        <p>قد يكون التقاضي ضرورياً عندما تفشل طرق الحل الأخرى أو عندما تكون هناك حاجة لسبل الانتصاف القانونية الفورية.</p>
      `
    },
    thumbnail: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    category: {
      en: "Commercial Law",
      ar: "القانون التجاري"
    },
    author: "Ahmed Bin Sultan",
    date: "2024-09-05",
    readTime: {
      en: "6 min read",
      ar: "6 دقائق قراءة"
    },
    tags: {
      en: ["Commercial Law", "Litigation", "Dispute Resolution"],
      ar: ["القانون التجاري", "التقاضي", "حل النزاعات"]
    }
  }
];