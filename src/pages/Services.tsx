import { ArrowRight, Building, Scale, DollarSign, FileText, Edit, CreditCard, Globe, Shield, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/typewriter-text';
import { useTranslation } from '@/hooks/useLanguage';
import { servicesData } from '@/data/servicesData';

const Services = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Icon mapping for the services
  const iconMap = {
    'Scale': Scale,
    'Building': Building,
    'DollarSign': DollarSign,
    'FileText': FileText,
    'Edit': Edit,
    'CreditCard': CreditCard,
    'Globe': Globe,
    'Shield': Shield,
    'ShoppingCart': ShoppingCart
  } as const;

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">
            <Typewriter
              text={[
                "Our Legal Services",
                "Expert Legal Solutions", 
                "Professional Legal Advice",
                "Comprehensive Legal Support"
              ]}
              speed={80}
              loop={true}
              deleteSpeed={40}
              delay={2000}
              className="text-inherit"
            />
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">{servicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building;
              
              return (
                <Link key={index} to={`/services/${service.id}`} className="h-full">
                  <div className="card-service group cursor-pointer h-full flex flex-col">
                    <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-accent" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-legal-navy mb-4 leading-tight">
                      {service.shortTitle}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed text-sm line-clamp-4">
                      {service.description}
                    </p>
                    
                    <div className="flex-grow">
                      <ul className="space-y-3 mb-6">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-sm text-neutral-600">
                            <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0 mt-2"></div>
                            <span className="leading-relaxed">{feature.split(':')[0]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-auto pt-4 border-t border-neutral-100">
                      <Button 
                        variant="ghost" 
                        className="text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto group-hover:translate-x-1 transition-transform font-medium"
                      >
                        {t('learnMore')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-legal-navy to-legal-navy/90 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-accent/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent/20 rounded-full"></div>
          <div className="absolute top-40 right-40 w-16 h-16 bg-accent/10 rounded-full"></div>
        </div>
        
        <div className="container-max text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <Typewriter
                text="Ready to Get Started?"
                speed={80}
                loop={false}
                className="text-inherit"
              />
            </h2>
            <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't let legal challenges hold your business back. Partner with Ali Bin Fahad Law Firm for expert legal solutions that protect your interests and drive your success forward.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-accent hover:bg-accent/90 text-legal-navy font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => navigate('/team')}
                variant="outline" 
                className="border-2 border-accent/80 bg-white/90 text-legal-navy hover:bg-accent hover:text-white hover:border-accent font-semibold px-8 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Contact Our Team
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
                <div className="text-white/90">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm md:text-base">Successful Cases</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">15+</div>
                  <div className="text-sm md:text-base">Years Experience</div>
                </div>
                <div className="text-white/90">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">98%</div>
                  <div className="text-sm md:text-base">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;