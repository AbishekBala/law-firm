import { Star, Quote } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { useTranslation } from '@/hooks/useLanguage';
import { Typewriter } from '@/components/ui/typewriter-text';

const Testimonials = () => {
  const { t } = useTranslation();
  
  const stats = [
    { number: '500+', label: t('satisfiedClients') },
    { number: '98%', label: t('successRate') },
    { number: '4.9/5', label: t('averageRating') },
    { number: '15+', label: t('yearsExperience') },
  ];

  const testimonials = [
    {
      rating: 5,
      quote: t('testimonial1.quote'),
      service: t('testimonial1.service'),
      client: {
        name: t('testimonial1.clientName'),
        title: t('testimonial1.clientTitle'),
        avatar: 'M'
      }
    },
    {
      rating: 5,
      quote: t('testimonial2.quote'),
      service: t('testimonial2.service'),
      client: {
        name: t('testimonial2.clientName'),
        title: t('testimonial2.clientTitle'),
        avatar: 'S'
      }
    },
    {
      rating: 5,
      quote: t('testimonial3.quote'),
      service: t('testimonial3.service'),
      client: {
        name: t('testimonial3.clientName'),
        title: t('testimonial3.clientTitle'),
        avatar: 'A'
      }
    },
    {
      rating: 5,
      quote: t('testimonial4.quote'),
      service: t('testimonial4.service'),
      client: {
        name: t('testimonial4.clientName'),
        title: t('testimonial4.clientTitle'),
        avatar: 'F'
      }
    },
    {
      rating: 5,
      quote: t('testimonial5.quote'),
      service: t('testimonial5.service'),
      client: {
        name: t('testimonial5.clientName'),
        title: t('testimonial5.clientTitle'),
        avatar: 'K'
      }
    },
    {
      rating: 5,
      quote: t('testimonial6.quote'),
      service: t('testimonial6.service'),
      client: {
        name: t('testimonial6.clientName'),
        title: t('testimonial6.clientTitle'),
        avatar: 'N'
      }
    }
  ];

  return (
    <div>
      {/* Header */}
      <AnimatedSection animation="fadeInUp">
        <section className="bg-gradient-to-br from-legal-navy via-legal-navy to-accent/20 text-white py-20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/20 rounded-full"></div>
          </div>
          
          {/* Quote Icon Background */}
          <div className="absolute top-8 right-8 opacity-5">
            <Quote className="h-48 w-48 text-white" />
          </div>
          
          <div className="container-max text-center px-4 relative z-10">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2">
                <span className="text-accent font-medium">{t('pageTitle')}</span>
              </div>
            </div>
            <h1 className="heading-lg mb-6 bg-gradient-to-r from-white to-accent/90 bg-clip-text text-transparent">
              <Typewriter
                text={t('pageTitle')}
                speed={80}
                loop={false}
                className="text-inherit"
              />
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto leading-relaxed">
              {t('pageSubtitle')}
            </p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center items-center mt-8 space-x-4">
              <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-24"></div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent w-24"></div>
            </div>
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

            {/* All Testimonials Section */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-legal-navy mb-4">
                {t('pageTitle')}
              </h2>
              <p className="text-neutral-600">
                {t('pageSubtitle')}
              </p>
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