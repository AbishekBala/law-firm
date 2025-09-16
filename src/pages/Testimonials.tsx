import { Star, Quote } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useTranslation } from '@/hooks/useLanguage';

const Testimonials = () => {
  const { t } = useTranslation();
  
  const stats = [
    { number: '500+', label: 'Satisfied Clients' },
    { number: '98%', label: 'Success Rate' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '15+', label: t('yearsExperience') },
  ];

  const testimonials = [
    {
      rating: 5,
      quote: "Ali Bin Fahad Law Firm provided exceptional service for our company formation. Their expertise in Saudi Arabian law and prompt responses made the entire process seamless. Highly recommend their professional services.",
      service: "Company Formation",
      client: {
        name: "Mohammed Al-Rashid",
        title: "CEO, Tech Solutions KSA",
        avatar: "M"
      }
    },
    {
      rating: 5,
      quote: "Outstanding legal representation in our intellectual property case. The team demonstrated deep knowledge of trademark law and achieved better results than we expected. Professional, responsive, and results-driven.",
      service: "Trademark Services",
      client: {
        name: "Sarah Al-Mansouri",
        title: "Entrepreneur & Business Owner",
        avatar: "S"
      }
    },
    {
      rating: 5,
      quote: "The firm handled our complex commercial litigation with remarkable skill and attention to detail. Their strategic approach and thorough preparation resulted in a favorable outcome. Truly impressed with their professionalism.",
      service: "Commercial Litigation",
      client: {
        name: "Ahmed Bin Sultan",
        title: "International Investor",
        avatar: "A"
      }
    },
    {
      rating: 5,
      quote: "Excellent support with our estate planning needs. The team provided clear guidance through complex family law matters with sensitivity and expertise. Their bilingual service was particularly valuable for our family.",
      service: "Estate Planning",
      client: {
        name: "Fatima Al-Zahra",
        title: "Family Business Owner",
        avatar: "F"
      }
    },
    {
      rating: 5,
      quote: "Ali Bin Fahad Law Firm has been our trusted legal partner for over 3 years. Their consistent quality of service, deep understanding of regulatory requirements, and proactive approach make them invaluable to our business.",
      service: "Corporate Compliance",
      client: {
        name: "Khalid Al-Otaibi",
        title: "Managing Director",
        avatar: "K"
      }
    },
    {
      rating: 5,
      quote: "From startup incorporation to ongoing legal compliance, this firm has supported our growth journey every step of the way. Their innovative approach to legal solutions and understanding of modern business needs is exceptional.",
      service: "Business Growth Support",
      client: {
        name: "Nora Al-Saud",
        title: "Tech Entrepreneur",
        avatar: "N"
      }
    }
  ];

  return (
    <div>
      {/* Header */}
      <AnimatedSection animation="fadeInUp">
        <section className="bg-legal-navy text-white py-20">
          <div className="container-max text-center px-4">
            <h1 className="heading-lg mb-6">Client Testimonials</h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              What our clients say about our legal services
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16">
              {stats.map((stat, index) => (
                <AnimatedSection 
                  key={index} 
                  animation="scaleIn" 
                  delay={index * 100}
                >
                  <div className="card-premium will-change-transform">
                    <AnimatedCounter 
                      value={stat.number} 
                      label={stat.label}
                      className="text-accent"
                      duration={2000 + index * 300}
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection 
                  key={index}
                  animation="fadeInUp"
                  delay={index * 150}
                >
                  <div className="testimonial-card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5 text-accent fill-current transform group-hover:scale-110 transition-transform duration-300"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative mb-6">
                      <Quote className="h-8 w-8 text-accent/20 absolute -top-2 -left-2 group-hover:text-accent/40 transition-colors duration-300" />
                      <p className="text-neutral-600 leading-relaxed pl-6">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Service */}
                    <div className="mb-4">
                      <span className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full font-medium">
                        {testimonial.service}
                      </span>
                    </div>

                    {/* Client */}
                    <div className="flex items-center">
                      <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-semibold mr-4">
                        {testimonial.client.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-legal-navy">
                          {testimonial.client.name}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {testimonial.client.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Testimonials;