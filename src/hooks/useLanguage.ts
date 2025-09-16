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