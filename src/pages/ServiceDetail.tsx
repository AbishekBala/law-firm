import { ChevronLeft, Phone, Mail, Globe, Languages } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation, useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { getServiceById } from '@/data/servicesData';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceItem, ServiceContent } from '@/types/service';

// Default language to use if context is not available
const DEFAULT_LANGUAGE = 'en';
const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  const { language: siteLanguage, setLanguage } = useLanguage();
  const [pageLanguage, setPageLanguage] = useState<typeof siteLanguage>(siteLanguage);
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get content in English (default language)
  const getContent = (service: ServiceItem | null): ServiceContent => {
    if (!service) {
      return {
        title: 'Loading...',
        description: 'Loading service details...',
        points: []
      };
    }
    return {
      title: service.en.title || 'No title available',
      description: service.en.description || 'No description available',
      points: service.en.points || [],
      superTitle: service.superTitle || service.en.title,
      superDescription: service.superDescription || service.en.description,
      tags: service.tags || []
    };
  };

  useEffect(() => {
    console.log('ServiceDetail mounted with serviceId:', serviceId);
    
    const loadService = async () => {
      if (!serviceId) {
        console.error('No serviceId provided');
        return;
      }
      
      try {
        console.log('Loading service with ID:', serviceId);
        setLoading(true);
        
        // Add a small delay to show loading state (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundService = getServiceById(serviceId);
        console.log('Service found:', foundService);
        
        if (!foundService) {
          console.error(`Service with ID ${serviceId} not found`);
          return;
        }
        
        setService(foundService);
        console.log('Service state updated:', foundService);
      } catch (error) {
        console.error('Error loading service:', error);
      } finally {
        setLoading(false);
      }
    };

    loadService();
    
    return () => {
      console.log('ServiceDetail unmounting');
    };
  }, [serviceId]);

  // Sync local page language with site language initially
  useEffect(() => {
    setPageLanguage(siteLanguage);
  }, [siteLanguage]);
  
  console.log('Rendering ServiceDetail with service:', service);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-legal-navy h-64"></div>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-10 w-1/2 mb-6" />
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
          
          <div className="space-y-4 mb-8">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-4 border rounded-lg">
                <Skeleton className="h-5 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-legal-navy mb-3">Service Not Found</h1>
          <p className="text-neutral-600 mb-6">
            We couldn't find the service you're looking for. It may have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/services" 
              className="bg-legal-navy text-white px-6 py-2.5 rounded-md hover:bg-legal-navy/90 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1.5" />
              Back to All Services
            </Link>
            <Link 
              to="/" 
              className="border border-legal-navy text-legal-navy px-6 py-2.5 rounded-md hover:bg-legal-navy/5 transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const content = getContent(service);
  const superTitle = content.superTitle;
  const superDescription = content.superDescription;

  const togglePageLanguage = () => {
    const newLang = pageLanguage === 'en' ? 'ar' : 'en';
    setPageLanguage(newLang);
    // also switch global language so t() resolves to correct translations
    setLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-legal-navy text-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-6">
            <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
              {t('home')}
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
            <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
              {t('services')}
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-white">{pageLanguage === 'ar' ? t(`service_${service.id}_shortTitle`) || content.title : content.title}</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Page-level language toggle similar to BlogArticle (top-right) */}
            <div className="absolute right-4 top-24 z-40 lg:block hidden">
              <Button
                onClick={togglePageLanguage}
                variant="outline"
                className="border-2 border-accent bg-accent/10 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-4 py-2 backdrop-blur-sm"
              >
                <span className="flex items-center">
                  <Languages className="h-4 w-4 mr-2" />
                  {pageLanguage === 'en' ? 'العربية' : 'English'}
                </span>
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-legal-gold">
                {pageLanguage === 'ar' ? t(`service_${service.id}_shortTitle`) || superTitle : superTitle}
              </h1>
              {superDescription && (
                <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
                  {pageLanguage === 'ar' ? t(`service_${service.id}_description`) || superDescription : superDescription}
                </p>
              )}
              {content.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {content.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 bg-white/5 text-white/70 text-xs rounded-full backdrop-blur-sm border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {content.points.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-legal-gold">
                {pageLanguage === 'ar' ? t('keyFeatures') : 'Key Features'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.points.map((point, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-legal-gold/30 transition-all hover:bg-gradient-to-br from-white/5 to-transparent"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">
                          {pageLanguage === 'ar' ? (t(`service_${service.id}_feature_${index}`) || point) : point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

              <div className="w-full md:w-96 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t('contactUs')}
                </h3>
                  <p className="text-neutral-200 mb-4 text-sm">
                    {t('contactUsText')}
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 bg-white text-legal-navy px-5 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  +1 (234) 567-890
                </a>
                <a
                  href="mailto:info@example.com"
                  className="flex items-center gap-3 border border-white/30 text-white px-5 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  info@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Overview */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-legal-gold">
            {pageLanguage === 'ar' ? t('overview') : 'Overview'}
            </h2>
            <div className="space-y-6">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
                {pageLanguage === 'ar' ? t('overview_para_1') || content.description : content.description}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                {pageLanguage === 'ar' ? t('overview_para_2') || 'Our team of experienced legal professionals is dedicated to providing comprehensive legal solutions tailored to your specific needs. With years of expertise in the field, we ensure that every client receives the highest level of service and attention to detail.' : 'Our team of experienced legal professionals is dedicated to providing comprehensive legal solutions tailored to your specific needs. With years of expertise in the field, we ensure that every client receives the highest level of service and attention to detail.'}
              </p>

              {content.points.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-legal-gold">
                {pageLanguage === 'ar' ? t('whatWeOffer') : 'What We Offer'}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {pageLanguage === 'ar' ? t('whatWeOffer_intro') || 'Our comprehensive range of legal services is designed to address all your legal needs. Here\'s how we can assist you:' : 'Our comprehensive range of legal services is designed to address all your legal needs. Here\'s how we can assist you:'}
                    </p>
                    <ul className="space-y-4 list-disc pl-6">
                      {content.points.map((point, index) => (
                        <li key={index} className="text-gray-800 text-lg leading-relaxed marker:text-legal-gold">
                          {pageLanguage === 'ar' ? (t(`service_${service.id}_feature_${index}`) || point) : point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 text-lg leading-relaxed mt-6">
                      {pageLanguage === 'ar' ? t('contactUsCTA') || 'Contact us today to learn more about how we can help you navigate the legal landscape with confidence and peace of mind.' : 'Contact us today to learn more about how we can help you navigate the legal landscape with confidence and peace of mind.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Services */}
      <section className="bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link 
              to="/services" 
              className="inline-flex items-center text-legal-navy hover:text-legal-navy/80 font-medium transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>{pageLanguage === 'ar' ? t('backToServices') : 'Back to Services'}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;