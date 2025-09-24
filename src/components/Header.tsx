import { useState, useEffect, useRef } from 'react';
import logoNew from '@/assets/logo-new.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage, useTranslation } from '@/hooks/useLanguage';
import i18n from 'i18next';
import { useTranslation as useI18nTranslation } from 'react-i18next';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownCloseTimer = useRef<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
        // If there is a pending close timer, clear it
        if (dropdownCloseTimer.current) {
          window.clearTimeout(dropdownCloseTimer.current);
          dropdownCloseTimer.current = null;
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // clear timer on unmount
      if (dropdownCloseTimer.current) {
        window.clearTimeout(dropdownCloseTimer.current);
        dropdownCloseTimer.current = null;
      }
    };
  }, []);

  const mainNavigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/services' },
    { name: t('whyChooseUs'), href: '/why-choose-us' },
    { name: t('blog'), href: '/blog' },
    { name: t('contact'), href: '/contact' },
  ];

  const aboutDropdown = [
    { name: t('about'), href: '/about' },
    { name: t('team'), href: '/team' },
    { name: t('testimonials'), href: '/testimonials' },
  ];

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language, isRTL]);

  const { i18n: i18nInstance } = useI18nTranslation();

  const toggleLanguage = async () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    await i18nInstance.changeLanguage(newLang);
    setLanguage(newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLang);
    
    // Force a re-render of all components
    window.dispatchEvent(new Event('languageChanged'));
  };

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Set initial language and direction
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    
    // Add/remove RTL class to body
    if (isRTL) {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language, isRTL]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-white'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >

      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img 
                src={logoNew} 
                alt="Ali Bin Fahad Law Firm & Intellectual Property LLC" 
                className={`h-12 w-auto transition-all duration-300 ${isScrolled ? 'max-w-[200px]' : 'max-w-[250px]'}`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-1'}`}>
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2.5 text-sm font-medium relative group overflow-hidden transition-all duration-300 ${
                    isActive(item.href) 
                      ? 'text-legal-navy font-semibold' 
                      : 'text-gray-700 hover:text-legal-navy'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-legal-gold transition-all duration-500 transform -translate-x-1/2 ${
                    isActive(item.href) ? 'w-3/4' : 'group-hover:w-1/2'
                  }`}></span>
                  <span className="absolute inset-0 -z-10 bg-gradient-to-r from-legal-navy/0 via-legal-navy/5 to-legal-navy/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              ))}
              
              {/* About Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative group"
                onMouseEnter={() => {
                  // Open immediately and clear any pending close timer
                  setIsAboutDropdownOpen(true);
                  if (dropdownCloseTimer.current) {
                    window.clearTimeout(dropdownCloseTimer.current);
                    dropdownCloseTimer.current = null;
                  }
                }}
                onMouseLeave={() => {
                  // Start a 2 second timer to close the dropdown
                  if (dropdownCloseTimer.current) {
                    window.clearTimeout(dropdownCloseTimer.current);
                  }
                  dropdownCloseTimer.current = window.setTimeout(() => {
                    setIsAboutDropdownOpen(false);
                    dropdownCloseTimer.current = null;
                  }, 2000);
                }}
              >
                <button
                  className={`flex items-center px-4 py-2.5 text-sm font-medium relative group overflow-hidden transition-all duration-300 ${
                    aboutDropdown.some(item => isActive(item.href))
                      ? 'text-legal-navy font-semibold'
                      : 'text-gray-700 hover:text-legal-navy'
                  }`}
                >
                  {t('about')}
                  <ChevronDown className={`${isRTL ? 'mr-1' : 'ml-1'} h-4 w-4 transition-all duration-300 ${
                    isAboutDropdownOpen ? 'rotate-180 text-legal-gold' : 'group-hover:translate-y-0.5'
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 transition-all duration-300 transform origin-top ${
                  isAboutDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                } z-50`}>
                  <div className={`absolute -top-2 ${isRTL ? 'right-6' : 'left-6'} w-4 h-4 bg-white border-l border-t border-neutral-100 rotate-45`}></div>
                  
                  {aboutDropdown.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-legal-navy bg-gray-50 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-legal-navy'
                      }`}
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full ${isRTL ? 'ml-3' : 'mr-3'} transition-colors ${
                          isActive(item.href) ? 'bg-legal-navy' : 'bg-transparent'
                        }`}></div>
                        {item.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA and Language Switcher */}
              <div className={`flex items-center ${isRTL ? 'space-x-reverse' : 'space-x-1'}`}>
                <div className="relative">
                  <button 
                    onClick={toggleLanguage}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${isRTL ? 'ml-6' : 'mr-6'}
                      bg-white border border-gray-200 hover:border-legal-navy/30 hover:shadow-sm
                      group relative overflow-hidden`}
                    aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                  >
                    <span className={`absolute inset-0 bg-legal-navy/5 group-hover:bg-legal-navy/10 transition-all duration-300`}></span>
                    <span className={`relative z-10 font-medium text-gray-700 group-hover:text-legal-navy text-sm ${isRTL ? 'font-sans-ar' : 'font-sans'}`}>
                      {language === 'en' ? 'عربي' : 'EN'}
                    </span>
                  </button>
                </div>
                
                <div className="relative">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className={`relative bg-gradient-to-r from-legal-navy to-legal-navy/90 text-white px-8 py-3 text-sm font-semibold overflow-hidden 
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${isRTL ? 'font-sans-ar' : ''}
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-legal-navy/90 before:to-legal-navy/80 
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300`}
                  >
                    <span className="relative z-10 flex items-center">
                      {t('getFreeConsultation')}
                      <svg className={`w-4 h-4 ml-2 ${isRTL ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <div className={isRTL ? 'ml-4' : 'mr-4'}>
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                    bg-white border border-gray-200 hover:border-legal-navy/30 hover:shadow-sm
                    text-gray-700 hover:text-legal-navy text-sm"
                  aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
                >
                  <span className={isRTL ? 'font-sans-ar' : ''}>
                    {language === 'en' ? 'عربي' : 'EN'}
                  </span>
                </button>
              </div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-legal-navy hover:bg-gray-100 focus:outline-none transition-colors duration-200"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? t('close') : t('menu')}
              >
                <span className="sr-only">{isMenuOpen ? t('close') : t('menu')}</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className={`pt-4 pb-3 border-t border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-col space-y-1 px-4">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-gray-100 text-legal-navy'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-legal-navy'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile About Dropdown */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                    className={`w-full flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between px-3 py-2 rounded-md text-base font-medium ${
                      aboutDropdown.some(item => isActive(item.href))
                        ? 'bg-gray-100 text-legal-navy'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-legal-navy'
                    }`}
                  >
                    {t('about')}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isAboutDropdownOpen ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {isAboutDropdownOpen && (
                    <div className={`${isRTL ? 'pr-4' : 'pl-4'} space-y-1`}>
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-3 py-2 rounded-md text-base font-medium ${
                            isActive(item.href)
                              ? 'bg-gray-100 text-legal-navy'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-legal-navy'
                          }`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsAboutDropdownOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-2 mt-2">
                  <div className="relative group w-full">
                    <div className="absolute inset-0 bg-legal-gold/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-500 -z-10"></div>
                    <Button 
                      onClick={() => {
                        navigate('/contact');
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-center bg-gradient-to-r from-legal-navy to-legal-navy/90 hover:from-legal-navy/90 hover:to-legal-navy/80 text-white py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg"
                    >
                      {t('getFreeConsultation')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;