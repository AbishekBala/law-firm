import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useLanguage';
import { servicesData } from '@/data/servicesData';

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-legal-navy text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            {t('ourLegalServices')}
          </h1>
          <p className="text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.map((service, index) => (
              <div key={index} className="group">
                <Link to={`/services/${service.id}`} className="h-full block">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all h-full flex flex-col p-6 border border-gray-100 hover:border-accent/30">
                    <h3 className="text-xl font-bold text-legal-navy mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {service.description}
                    </p>
                    <div className="flex items-center text-accent font-medium mt-auto pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold">Learn more</span>
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-legal-navy rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('needLegalHelp')}
            </h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              {t('contactUsForExpertAdvice')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-legal-navy font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('getInTouch')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('learnMoreAboutUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
