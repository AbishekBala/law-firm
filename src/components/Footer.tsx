import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Twitter, Instagram, Award, Shield, CheckCircle } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Why Choose Us', href: '/why-choose-us' },
    { name: 'Our Team', href: '/team' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalServices = [
    { name: 'Company Formation', href: '/services/company-formation' },
    { name: 'Litigation & Representation', href: '/services/litigation' },
    { name: 'Bankruptcy & Debt Restructuring', href: '/services/bankruptcy' },
    { name: 'Estate Liquidation', href: '/services/estate' },
    { name: 'Trademark Services', href: '/services/trademark' },
    { name: 'Legal Translation', href: '/services/translation' },
  ];

  const certifications = [
    { name: 'Saudi Bar Association', icon: Award },
    { name: 'Ministry of Justice', icon: Shield },
    { name: 'SAIP Registered', icon: CheckCircle },
    { name: 'ISO 9001:2015 Certified', icon: Award },
  ];

  return (
    <footer className="bg-legal-navy text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Firm Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Ali Bin Fahad Law Firm</h3>
              <p className="text-accent text-sm font-medium">& Intellectual Property LLC</p>
            </div>
            <p className="text-neutral-300 mb-6 text-sm leading-relaxed">
              Your trusted legal partner in Saudi Arabia, providing comprehensive 
              legal solutions with excellence and integrity.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-neutral-300">
                  <p>King Fahd Road, Al Olaya District,</p>
                  <p>Riyadh 12213</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="tel:+966557536255" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  +966 55 753 6255
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <a href="mailto:info@abf.sa" className="text-sm text-neutral-300 hover:text-accent transition-colors">
                  info@abf.sa
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-neutral-300 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Services */}
          <div>
            <h4 className="text-accent font-semibold mb-6">Legal Services</h4>
            <ul className="space-y-3">
              {legalServices.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href} 
                    className="text-sm text-neutral-300 hover:text-accent transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications & Social */}
          <div>
            <h4 className="text-accent font-semibold mb-6">Certifications</h4>
            <ul className="space-y-3 mb-6">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-center space-x-2">
                  <cert.icon className="h-4 w-4 text-accent flex-shrink-0" />
                  <span className="text-sm text-neutral-300">{cert.name}</span>
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-accent font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-2 bg-neutral-800 rounded-lg hover:bg-accent hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-neutral-800 rounded-lg hover:bg-accent hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 bg-neutral-800 rounded-lg hover:bg-accent hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-400">
              © 2024 Ali Bin Fahad Law Firm & Intellectual Property LLC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-neutral-400 hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-400 hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-neutral-400 hover:text-accent transition-colors">
                Cookie Policy
              </Link>
              <span className="text-neutral-400 text-xs">
                Licensed by Saudi Bar Association
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;