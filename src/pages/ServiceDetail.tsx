import { ChevronLeft, Phone, Mail, Globe } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useLanguage';
import { getServiceById } from '@/data/servicesData';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ServiceItem, ServiceContent } from '@/types/service';

// Default language to use if context is not available
const DEFAULT_LANGUAGE = 'en';
const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-legal-navy text-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-6">
            <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
            <Link to="/services" className="text-neutral-300 hover:text-white transition-colors">
              {t('services')}
            </Link>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-white">{content.title}</span>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-legal-gold">
                {superTitle}
              </h1>
              {superDescription && (
                <p className="text-lg md:text-xl text-neutral-200 mb-8 leading-relaxed">
                  {superDescription}
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
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.points.map((point, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-legal-gold/30 transition-all hover:bg-gradient-to-br from-white/5 to-transparent"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full md:w-96 bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Service Details
            </h3>
              
              {/* Service Title */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-300 mb-1">
                  Title
                </h4>
                <p className="text-white">{content.title}</p>
              </div>
              
              {/* Service Description */}
              {content.description && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-neutral-300 mb-1">
                    Description
                  </h4>
                  <p className="text-white/90">{content.description}</p>
                </div>
              )}
              
              <div className="border-t border-white/20 pt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Contact Us
                </h3>
                <p className="text-neutral-200 mb-4 text-sm">
                  Get in touch with our experts to learn more about this service
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
              Overview
            </h2>
            <div className="space-y-6">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed">
                {content.description}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team of experienced legal professionals is dedicated to providing comprehensive legal solutions tailored to your specific needs. With years of expertise in the field, we ensure that every client receives the highest level of service and attention to detail.
              </p>

              {content.points.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-legal-gold">
                    What We Offer
                  </h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our comprehensive range of legal services is designed to address all your legal needs. Here's how we can assist you:
                    </p>
                    <ul className="space-y-4 list-disc pl-6">
                      {content.points.map((point, index) => (
                        <li key={index} className="text-gray-800 text-lg leading-relaxed marker:text-legal-gold">
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 text-lg leading-relaxed mt-6">
                      Contact us today to learn more about how we can help you navigate the legal landscape with confidence and peace of mind.
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
              <span>Back to Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;