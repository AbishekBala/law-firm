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
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-100/80 backdrop-blur-sm">
      <div className="container-max">
        <div className={`flex items-center justify-between h-16 px-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/src/assets/logo-new.png" 
              alt="Ali Bin Fahad Law Firm & Intellectual Property LLC" 
              className="h-10 w-auto max-w-[280px] object-contain"
            />
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
            {/* Language Toggle with fixed width container to prevent layout shift */}
            <div className="w-20 flex justify-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center space-x-1 hover:bg-accent/10 hover:text-accent transition-all duration-300 transform hover:scale-105 w-auto px-2"
                onClick={toggleLanguage}
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium transition-all duration-300">
                  {language === 'en' ? 'عربي' : 'EN'}
                </span>
              </Button>
            </div>

            {/* Schedule Consultation Button */}
            <Button className="btn-primary hidden md:inline-flex shadow-button hover:shadow-lg transition-all duration-300 hover:scale-105">
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