import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const { i18n } = useI18nTranslation();
  const [isRTL, setIsRTL] = useState(false);

  const language = i18n.language as 'en' | 'ar';

  useEffect(() => {
    const currentLang = i18n.language;
    const rtl = currentLang === 'ar';
    setIsRTL(rtl);

    // Update document direction and language
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
  }, [i18n.language]);

  const setLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang);
  };

  return {
    language,
    setLanguage,
    isRTL,
  };
};

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return {
    t,
    language: i18n.language as 'en' | 'ar',
  };
};

// Legacy exports for backward compatibility
export const translations = {}; // Empty object since translations are now in i18n config