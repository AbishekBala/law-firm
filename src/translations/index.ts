// Export all translation files
export { commonTranslations } from './common';
export { homeTranslations } from './home';
export { aboutTranslations } from './about';
export { servicesTranslations } from './services';
export { contactTranslations } from './contact';
export { teamTranslations } from './team';
export { headerTranslations } from './header';
export { footerTranslations } from './footer';
export { whyChooseUsTranslations } from './whyChooseUs';
export { testimonialsTranslations } from './testimonials';
export { blogTranslations } from './blog';
export { careersTranslations } from './careers';

// Combined translations object for easy import
import { commonTranslations } from './common';
import { homeTranslations } from './home';
import { aboutTranslations } from './about';
import { servicesTranslations } from './services';
import { contactTranslations } from './contact';
import { teamTranslations } from './team';
import { headerTranslations } from './header';
import { footerTranslations } from './footer';
import { whyChooseUsTranslations } from './whyChooseUs';
import { testimonialsTranslations } from './testimonials';
import { blogTranslations } from './blog';
import { careersTranslations } from './careers';

export const allTranslations = {
  en: {
    translation: {
      ...commonTranslations.en,
      ...homeTranslations.en,
      ...aboutTranslations.en,
      ...servicesTranslations.en,
      ...contactTranslations.en,
      ...teamTranslations.en,
      ...headerTranslations.en,
      ...footerTranslations.en,
      ...whyChooseUsTranslations.en,
      ...testimonialsTranslations.en,
      ...blogTranslations.en,
      ...careersTranslations.en,
    }
  },
  ar: {
    translation: {
      ...commonTranslations.ar,
      ...homeTranslations.ar,
      ...aboutTranslations.ar,
      ...servicesTranslations.ar,
      ...contactTranslations.ar,
      ...teamTranslations.ar,
      ...headerTranslations.ar,
      ...footerTranslations.ar,
      ...whyChooseUsTranslations.ar,
      ...testimonialsTranslations.ar,
      ...blogTranslations.ar,
      ...careersTranslations.ar,
    }
  }
};