import { ChevronLeft, Phone, Mail } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Typewriter } from '@/components/ui/typewriter-text';
import { servicesData, getServiceById } from '@/data/servicesData';
import { useTranslation } from '@/hooks/useLanguage';

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();

  if (!serviceId) {
    return <Navigate to="/services" replace />;
  }

  const service = getServiceById(serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Super Heading */}
      <section className="bg-legal-navy text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-neutral-300 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>

          {/* Super Heading */}
          {servicesData.superHeading && (
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {servicesData.superHeading}
            </h1>
          )}
          
          {/* Super Description */}
          {servicesData.superDescription && (
            <p className="text-lg text-neutral-200 leading-relaxed mb-8">
              {servicesData.superDescription}
            </p>
          )}

          {/* Service Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            {service.title}
          </h2>

          {/* Service Description */}
          <p className="text-lg text-neutral-200 mb-6">
            {service.description}
          </p>

          {/* Service Points */}
          {service.points && service.points.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-3 mt-3">
                {service.points.map((point, index) => (
                  <button
                    key={index}
                    type="button"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-white text-legal-navy border-2 border-legal-navy hover:bg-legal-navy hover:text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-navy/50"
                  >
                    {point}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/services"
            className="inline-flex items-center text-neutral-600 hover:text-legal-navy"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Services
          </Link>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Repeat Service Title */}
          <h2 className="text-2xl font-bold text-legal-navy mb-6">
            {service.title} - In Depth
          </h2>
          
          {/* Repeat Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 mb-6">
              {service.description}
            </p>
          </div>

          {/* What We Offer Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-legal-navy mb-6">What We Offer</h3>
            <ul className="space-y-3">
              <li className="text-gray-700">• Corporate and Commercial Law</li>
              <li className="text-gray-700">• Dispute Resolution and Litigation</li>
              <li className="text-gray-700">• Intellectual Property Law</li>
              <li className="text-gray-700">• Personal Legal Support</li>
              <li className="text-gray-700">• Regulatory Compliance</li>
              <li className="text-gray-700">• Risk Assessment and Mitigation</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div className="bg-legal-navy/5 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-legal-navy mb-4">
              Need This Service?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Contact us today to discuss your specific requirements and get expert legal assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-legal-navy font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border border-legal-navy text-legal-navy hover:bg-legal-navy hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
