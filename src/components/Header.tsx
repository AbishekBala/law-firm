import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage, useTranslation } from '@/hooks/useLanguage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainNavigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/services' },
    { name: t('whyChooseUs'), href: '/why-choose-us' },
    { name: 'Blog', href: '/blog' },
    { name: t('contact'), href: '/contact' },
  ];

  const aboutDropdown = [
    { name: t('about'), href: '/about' },
    { name: t('team'), href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: t('testimonials'), href: '/testimonials' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-100/80 backdrop-blur-sm">
      <div className="container-max">
        <div className={`flex items-center justify-between h-20 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/src/assets/logo-new.png" 
              alt="Ali Bin Fahad Law Firm & Intellectual Property LLC" 
              className="h-12 w-auto max-w-[300px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center space-x-6">
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-accent whitespace-nowrap px-3 py-2 rounded-md ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/5 border-b-2 border-accent'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* About Dropdown */}
              <div 
                ref={dropdownRef}
                className="relative group"
                onMouseEnter={() => setIsAboutDropdownOpen(true)}
                onMouseLeave={() => setIsAboutDropdownOpen(false)}
              >
                <button
                  className={`flex items-center text-sm font-medium transition-colors hover:text-accent whitespace-nowrap px-3 py-2 rounded-md ${
                    aboutDropdown.some(item => isActive(item.href))
                      ? 'text-accent bg-accent/5'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  About Us
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    isAboutDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-neutral-100 py-2 transition-all duration-300 transform origin-top backdrop-blur-sm ${
                  isAboutDropdownOpen 
                    ? 'opacity-100 scale-100 translate-y-0 visible dropdown-enter' 
                    : 'opacity-0 scale-95 -translate-y-2 invisible'
                } z-50`}>
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-neutral-100 rotate-45"></div>
                  
                  {aboutDropdown.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`dropdown-item block px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-accent/5 hover:to-accent/10 hover:text-accent hover:pl-6 relative ${
                        isActive(item.href)
                          ? 'text-accent bg-accent/5 border-r-4 border-accent'
                          : 'text-neutral-700'
                      }`}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                      onClick={() => setIsAboutDropdownOpen(false)}
                    >
                      <div className="flex items-center relative z-10">
                        <div className={`w-2 h-2 bg-accent rounded-full mr-3 transition-all duration-300 ${
                          isActive(item.href) ? 'opacity-100 scale-110' : 'opacity-0 scale-75'
                        }`}></div>
                        {item.name}
                        {isActive(item.href) && (
                          <div className="ml-auto">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                  
                  <div className="border-t border-neutral-100 mt-2 pt-3 px-4">
                    <p className="text-xs text-neutral-500 font-medium flex items-center">
                      <div className="w-1 h-1 bg-accent rounded-full mr-2"></div>
                      {language === 'en' ? 'Learn more about our firm' : 'تعرف على المزيد عن شركتنا'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className={`flex items-center flex-shrink-0 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {/* Language Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center space-x-1 hover:bg-accent/10 hover:text-accent transition-all duration-300 px-3 py-2"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'عربي' : 'EN'}
              </span>
            </Button>

            {/* Schedule Consultation Button */}
            <Button 
              onClick={() => navigate('/contact')}
              className="btn-primary hidden md:inline-flex shadow-button hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm px-4 py-2"
            >
              {t('scheduleConsultation')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="xl:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-t border-neutral-200 shadow-lg">
            <nav className="py-4 space-y-1 max-h-96 overflow-y-auto">
              {/* Main Navigation Items */}
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-6 py-3 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/5 border-r-4 border-accent'
                      : 'text-neutral-700 hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* About Section Header */}
              <div className="px-6 py-2 border-t border-neutral-100 mt-2">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  About Us
                </p>
              </div>
              
              {/* About Dropdown Items */}
              {aboutDropdown.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-8 py-3 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/5 border-r-4 border-accent'
                      : 'text-neutral-600 hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Toggle Mobile */}
              <div className="px-6 py-3 border-t border-neutral-100 mt-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="w-full justify-center"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'عربي' : 'English'}
                </Button>
              </div>
              
              {/* Schedule Consultation Mobile */}
              <div className="px-6 py-3">
                <Button 
                  onClick={() => {
                    navigate('/contact');
                    setIsMenuOpen(false);
                  }}
                  className="btn-primary w-full justify-center"
                >
                  {t('scheduleConsultation')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;