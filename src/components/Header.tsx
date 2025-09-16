import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage, useTranslation } from '@/hooks/useLanguage';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('whyChooseUs'), href: '/why-choose-us' },
    { name: t('team'), href: '/team' },
    { name: t('testimonials'), href: '/testimonials' },
    { name: t('contact'), href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-neutral-100">
      <div className="container-max">
        <div className={`flex items-center justify-between h-20 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-legal-navy text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl">
              A
            </div>
            <div className="hidden md:block">
              <div className="text-legal-navy font-bold text-xl">
                Ali Bin Fahad Law Firm
              </div>
              <div className="text-neutral-600 text-sm">
                & Intellectual Property LLC
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.href)
                    ? 'text-accent border-b-2 border-accent pb-1'
                    : 'text-neutral-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {/* Language Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center space-x-1 hover:bg-accent/10 hover:text-accent transition-colors"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </Button>

            {/* Schedule Consultation Button */}
            <Button className="btn-primary hidden md:inline-flex shadow-button hover:shadow-lg transition-all duration-300">
              {t('scheduleConsultation')}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200">
            <nav className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-accent bg-accent/5 border-r-4 border-accent'
                      : 'text-neutral-700 hover:text-accent hover:bg-accent/5'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 py-3">
                <Button className="btn-primary w-full">
                  Schedule Consultation
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