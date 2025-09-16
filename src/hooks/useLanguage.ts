import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  isRTL: boolean;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      isRTL: false,
      setLanguage: (lang: 'en' | 'ar') => {
        set({ 
          language: lang, 
          isRTL: lang === 'ar' 
        });
        
        // Update document direction
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute('lang', lang);
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

// Translation data
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    whyChooseUs: 'Why Choose Us',
    team: 'Our Team',
    testimonials: 'Testimonials',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Premier Legal Excellence in Saudi Arabia',
    heroSubtitle: 'Ali Bin Fahad Law Firm & Intellectual Property LLC',
    heroDescription: 'Providing comprehensive legal solutions with unmatched expertise in corporate law, intellectual property, and regulatory compliance. Your trusted legal partner in the Kingdom of Saudi Arabia.',
    scheduleConsultation: 'Schedule Consultation',
    ourServices: 'Our Services',
    
    // Stats
    yearsExperience: 'Years Experience',
    clientsServed: 'Clients Served',
    successRate: 'Success Rate',
    
    // Common
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    readMore: 'Read More',
    sendMessage: 'Send Message',
    
    // Team
    managingPartner: 'Managing Partner & Founder',
    seniorPartner: 'Senior Partner',
    seniorAssociate: 'Senior Associate',
    partner: 'Partner',
    
    // About
    ourVision: 'Our Vision',
    ourMission: 'Our Mission',
    ourJourney: 'Our Journey',
    ourCommitment: 'Our Commitment',
    
    // Services
    servicesTitle: 'Our Legal Services',
    servicesDescription: 'Comprehensive legal solutions tailored to meet your business and personal needs with the highest standards of professional excellence.',
    companyFormation: 'Company Formation',
    companyFormationDesc: 'Complete business setup and registration services in Saudi Arabia',
    litigation: 'Litigation & Representation',
    litigationDesc: 'Expert legal representation in courts and dispute resolution',
    bankruptcy: 'Bankruptcy & Debt Restructuring',
    bankruptcyDesc: 'Professional guidance through financial restructuring processes',
    estateLiquidation: 'Estate Liquidation',
    estateLiquidationDesc: 'Comprehensive estate planning and liquidation services',
    drafting: 'Drafting & Notarization',
    draftingDesc: 'Professional document drafting and legal notarization',
    debtCollection: 'Debt Collection',
    debtCollectionDesc: 'Efficient debt recovery and collection services',
    legalTranslation: 'Legal Translation',
    legalTranslationDesc: 'Certified translation of legal documents',
    trademark: 'Trademark Services',
    trademarkDesc: 'Intellectual property protection and trademark registration',
    ecommerce: 'E-Store & Compliance',
    ecommerceDesc: 'E-commerce legal compliance and online business setup',
    readyToStart: 'Ready to Get Started?',
    readyToStartDesc: 'Contact our experienced legal team today to discuss your specific needs and find the right solution for your situation.',
    
    // Contact
    contactTitle: 'Contact Us',
    contactDescription: 'Get in touch with our legal experts',
    ourOffice: 'Our Office',
    phone: 'Phone',
    email: 'Email',
    businessHours: 'Business Hours',
    secureConfidential: 'Secure & Confidential',
    secureConfidentialDesc: 'All communications are protected by attorney-client privilege and encrypted for your privacy and security.',
    sendUsMessage: 'Send us a Message',
    sendUsMessageDesc: "Fill out the form below and we'll get back to you within 24 hours.",
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    emailAddress: 'Email Address',
    subject: 'Subject',
    message: 'Message',
    privacyNotice: 'By submitting this form, you agree to our privacy policy and consent to be contacted regarding your inquiry.',
    
    // About Page
    aboutTitle: 'About Us',
    aboutSubtitle: 'Your Trusted Legal Partner in Saudi Arabia',
    aboutDescription1: 'Ali Bin Fahad Law Firm & Intellectual Property LLC is a prestigious corporate law firm based in Saudi Arabia, dedicated to delivering world-class legal services to businesses and individuals. Renowned for our expertise in corporate law, business formation, intellectual property protection, and notary services, we empower clients to navigate Saudi Arabia\'s legal landscape with confidence and ease.',
    aboutDescription2: 'Our firm is built on a foundation of integrity, excellence, and innovation, with a mission to provide customized legal solutions tailored to the specific needs of our clients. Whether you\'re establishing a business, safeguarding intellectual property, or seeking expert representation, we combine legal precision with a deep understanding of the Saudi market to help you succeed.',
    learnAboutServices: 'Learn About Our Services',
    visionDescription: 'To be the leading law firm in Saudi Arabia, recognized for our expertise, integrity, and commitment to delivering exceptional legal services that exceed client expectations and contribute to the development of the Kingdom\'s legal landscape.',
    missionDescription: 'At Ali Bin Fahad Law Firm, our goal is to be the leading legal partner in Saudi Arabia, providing tailored and innovative solutions to businesses and individuals. We aim to deliver exceptional legal services that empower our clients to achieve their objectives while safeguarding their legal and financial interests.',
    commitmentDescription: 'Under the guidance of Ali Bin Fahad, our highly skilled team of lawyers and legal consultants delivers unparalleled legal support across all areas of corporate law. Our ability to adapt to the unique demands of each client ensures that your business objectives are met with efficiency, professionalism, and attention to detail.',
    innovation: 'Innovation',
    innovationDesc: 'Offering innovative legal solutions that align with Saudi regulations and international standards',
    partnership: 'Partnership',
    partnershipDesc: 'Building long-lasting partnerships with clients based on trust and results',  
    protection: 'Protection',
    protectionDesc: 'Ensuring your legal interests are protected while minimizing risks and maximizing opportunities',
    journeyDescription: 'Excellence Through Leadership and Expertise',
    ourAchievements: 'Our Achievements',
    yearsOfExcellence: 'Years of Excellence',
    clientSupport: 'Client Support',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'خدماتنا',
    whyChooseUs: 'لماذا نحن',
    team: 'فريقنا',
    testimonials: 'آراء العملاء',
    contact: 'اتصل بنا',
    
    // Hero Section
    heroTitle: 'التميز القانوني الرائد في المملكة العربية السعودية',
    heroSubtitle: 'مكتب المحامي علي بن فهد والملكية الفكرية ذ.م.م',
    heroDescription: 'نقدم حلولاً قانونية شاملة بخبرة لا تُضاهى في القانون التجاري والملكية الفكرية والامتثال التنظيمي. شريكك القانوني الموثوق في المملكة العربية السعودية.',
    scheduleConsultation: 'احجز استشارة',
    ourServices: 'خدماتنا',
    
    // Stats
    yearsExperience: 'سنوات الخبرة',
    clientsServed: 'عميل تم خدمتهم',
    successRate: 'معدل النجاح',
    
    // Common
    learnMore: 'اعرف المزيد',
    contactUs: 'اتصل بنا',
    readMore: 'اقرأ المزيد',
    sendMessage: 'إرسال الرسالة',
    
    // Team
    managingPartner: 'الشريك الإداري والمؤسس',
    seniorPartner: 'شريك أول',
    seniorAssociate: 'محامي أول',
    partner: 'شريك',
    
    // About
    ourVision: 'رؤيتنا',
    ourMission: 'رسالتنا',
    ourJourney: 'رحلتنا',
    ourCommitment: 'التزامنا',
    
    // Services
    servicesTitle: 'خدماتنا القانونية',
    servicesDescription: 'حلول قانونية شاملة مصممة لتلبية احتياجات الأعمال والاحتياجات الشخصية بأعلى معايير التميز المهني.',
    companyFormation: 'تأسيس الشركات',
    companyFormationDesc: 'خدمات إعداد وتسجيل الأعمال الكاملة في المملكة العربية السعودية',
    litigation: 'التقاضي والتمثيل',
    litigationDesc: 'تمثيل قانوني خبير في المحاكم وحل النزاعات',
    bankruptcy: 'الإفلاس وإعادة هيكلة الديون',
    bankruptcyDesc: 'توجيه مهني من خلال عمليات إعادة الهيكلة المالية',
    estateLiquidation: 'تصفية التركات',
    estateLiquidationDesc: 'خدمات شاملة لتخطيط وتصفية التركات',
    drafting: 'الصياغة والتوثيق',
    draftingDesc: 'صياغة المستندات المهنية والتوثيق القانوني',
    debtCollection: 'تحصيل الديون',
    debtCollectionDesc: 'خدمات استرداد وتحصيل الديون الفعالة',
    legalTranslation: 'الترجمة القانونية',
    legalTranslationDesc: 'ترجمة معتمدة للوثائق القانونية',
    trademark: 'خدمات العلامات التجارية',
    trademarkDesc: 'حماية الملكية الفكرية وتسجيل العلامات التجارية',
    ecommerce: 'المتاجر الإلكترونية والامتثال',
    ecommerceDesc: 'الامتثال القانوني للتجارة الإلكترونية وإعداد الأعمال عبر الإنترنت',
    readyToStart: 'مستعد للبدء؟',
    readyToStartDesc: 'اتصل بفريقنا القانوني ذوي الخبرة اليوم لمناقشة احتياجاتك المحددة والعثور على الحل المناسب لحالتك.',
    
    // Contact
    contactTitle: 'اتصل بنا',
    contactDescription: 'تواصل مع خبرائنا القانونيين',
    ourOffice: 'مكتبنا',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    businessHours: 'ساعات العمل',
    secureConfidential: 'آمن وسري',
    secureConfidentialDesc: 'جميع الاتصالات محمية بامتياز المحامي والموكل ومشفرة لخصوصيتك وأمانك.',
    sendUsMessage: 'أرسل لنا رسالة',
    sendUsMessageDesc: 'املأ النموذج أدناه وسنعاود الاتصال بك خلال 24 ساعة.',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    emailAddress: 'عنوان البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    privacyNotice: 'بإرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على الاتصال بك بخصوص استفسارك.',
    
    // About Page
    aboutTitle: 'من نحن',
    aboutSubtitle: 'شريكك القانوني الموثوق في المملكة العربية السعودية',
    aboutDescription1: 'مكتب المحامي علي بن فهد والملكية الفكرية ذ.م.م هو مكتب محاماة مؤسسي مرموق مقره في المملكة العربية السعودية، مكرس لتقديم خدمات قانونية عالمية المستوى للشركات والأفراد. مشهور بخبرتنا في القانون التجاري وتأسيس الأعمال وحماية الملكية الفكرية وخدمات التوثيق، نمكن العملاء من التنقل في المشهد القانوني للمملكة العربية السعودية بثقة وسهولة.',
    aboutDescription2: 'مكتبنا مبني على أساس من النزاهة والتميز والابتكار، مع مهمة تقديم حلول قانونية مخصصة مصممة خصيصاً لتلبية الاحتياجات المحددة لعملائنا. سواء كنت تؤسس عملاً أو تحمي الملكية الفكرية أو تسعى للحصول على تمثيل خبير، فإننا نجمع بين الدقة القانونية والفهم العميق للسوق السعودي لمساعدتك على النجاح.',
    learnAboutServices: 'اعرف المزيد عن خدماتنا',
    visionDescription: 'أن نكون مكتب المحاماة الرائد في المملكة العربية السعودية، معترف بنا لخبرتنا ونزاهتنا والتزامنا بتقديم خدمات قانونية استثنائية تتجاوز توقعات العملاء وتساهم في تطوير المشهد القانوني للمملكة.',
    missionDescription: 'في مكتب المحامي علي بن فهد، هدفنا هو أن نكون الشريك القانوني الرائد في المملكة العربية السعودية، نقدم حلولاً مخصصة ومبتكرة للشركات والأفراد. نهدف إلى تقديم خدمات قانونية استثنائية تمكن عملائنا من تحقيق أهدافهم مع حماية مصالحهم القانونية والمالية.',
    commitmentDescription: 'تحت إرشاد علي بن فهد، يقدم فريقنا عالي المهارة من المحامين والاستشاريين القانونيين دعماً قانونياً لا مثيل له في جميع مجالات القانون التجاري. قدرتنا على التكيف مع المتطلبات الفريدة لكل عميل تضمن أن أهداف عملك تُحقق بكفاءة ومهنية واهتمام بالتفاصيل.',
    innovation: 'الابتكار',
    innovationDesc: 'تقديم حلول قانونية مبتكرة تتماشى مع اللوائح السعودية والمعايير الدولية',
    partnership: 'الشراكة',
    partnershipDesc: 'بناء شراكات طويلة الأمد مع العملاء قائمة على الثقة والنتائج',
    protection: 'الحماية',
    protectionDesc: 'ضمان حماية مصالحك القانونية مع تقليل المخاطر وتعظيم الفرص',
    journeyDescription: 'التميز من خلال القيادة والخبرة',
    ourAchievements: 'إنجازاتنا',
    yearsOfExcellence: 'سنوات التميز',
    clientSupport: 'دعم العملاء',
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t, language };
};