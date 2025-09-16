import { ArrowRight, Award, Users, TrendingUp, Heart, Shield, Lightbulb, Scale, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';
import { useTranslation } from '@/hooks/useLanguage';
import heroLawyer from '@/assets/hero-lawyer.jpg';
import heroOffice from '@/assets/hero-office.jpg';

const Home = () => {
  const { t } = useTranslation();
  
  const stats = [
    { number: '15+', label: t('yearsExperience'), icon: Award },
    { number: '500+', label: t('clientsServed'), icon: Users },
    { number: '98%', label: t('successRate'), icon: TrendingUp },
  ];

  const showcaseFeatures = [
    {
      icon: Scale,
      title: 'Legal Expertise',
      description: '15+ years of specialized experience in Saudi Arabian law',
    },
    {
      icon: Clock,
      title: 'Rapid Response',
      description: '24/7 legal consultation and emergency support',
    },
    {
      icon: CheckCircle,
      title: 'Success Record',
      description: '98% success rate in cases handled',
    },
  ];

  const coreValues = [
    {
      icon: Award,
      title: 'Legal Excellence',
      description: 'Delivering exceptional legal services with precision, expertise, and unwavering attention to every case we handle.',
    },
    {
      icon: Shield,
      title: 'Professional Integrity',
      description: 'Maintaining the highest ethical standards and building trust through transparent, honest, and reliable legal counsel.',
    },
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'Leveraging cutting-edge legal strategies and modern technology to provide efficient and effective solutions.',
    },
    {
      icon: Heart,
      title: 'Client-Centered Approach',
      description: 'Placing our clients at the heart of everything we do, ensuring personalized service and exceptional results.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section h-[85vh] flex items-center pt-16"
        style={{
          backgroundImage: `url(${heroOffice})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="hero-content container-max w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
            {/* Left Side - Main Content */}
            <AnimatedSection animation="fadeInLeft" className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {t('heroTitle')}
              </h1>
              <div className="gold-accent text-xl md:text-2xl font-semibold mb-6">
                {t('heroSubtitle')}
              </div>
              <p className="text-lg text-neutral-200 mb-8 leading-relaxed">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary shadow-button hover:shadow-lg transition-all duration-300">
                  {t('scheduleConsultation')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button className="btn-secondary hover:scale-105 transition-transform duration-300">
                  {t('ourServices')}
                </Button>
              </div>
            </AnimatedSection>

            {/* Right Side - Professional Showcase */}
            <AnimatedSection animation="fadeInRight" delay={200} className="hidden lg:block relative -mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-8">
                  <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Scale className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Premier Legal Solutions</h3>
                  <p className="text-neutral-200">Trusted by 500+ clients across Saudi Arabia</p>
                </div>
                
                <div className="space-y-6">
                  {showcaseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-accent/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                        <p className="text-neutral-200 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Stats with Animation - Positioned at bottom */}
          <div className="mt-16 px-4">
            <div className="grid grid-cols-3 gap-8 max-w-lg">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-2" />
                  <AnimatedCounter 
                    value={stat.number} 
                    label={stat.label}
                    duration={2000 + index * 200}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Legal Excellence */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="flex flex-col">
                <h2 className="heading-lg text-legal-navy mb-6">
                  Our Legal Excellence
                </h2>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  Ali Bin Fahad Law Firm & Intellectual Property LLC stands as a 
                  beacon of legal excellence in Saudi Arabia. With thorough expertise 
                  and unwavering commitment to our clients, we provide comprehensive 
                  legal solutions that drive success and protect your interests.
                </p>
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <AnimatedCounter 
                    value="15+" 
                    label="Years"
                    className="text-legal-navy"
                  />
                  <AnimatedCounter 
                    value="500+" 
                    label="Clients"
                    className="text-legal-navy"
                  />
                </div>
                <div className="flex justify-start">
                  <Button className="btn-outline hover:scale-105 transition-transform duration-300">
                    {t('learnMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <LazyImage 
                  src={heroLawyer} 
                  alt="Professional lawyer" 
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-neutral-50">
          <div className="container-max text-center">
            <h2 className="heading-lg text-legal-navy mb-4">Our Core Values</h2>
            <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
              The principles that guide our practice and define our commitment to excellence
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <AnimatedSection key={index} animation="scaleIn" delay={index * 100}>
                  <div className="card-premium text-center h-full flex flex-col">
                    <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-legal-navy mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed flex-grow">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Mission */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-legal-navy text-white relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-legal-navy via-legal-navy to-neutral-900"></div>
          <div className="container-max relative z-10 text-center">
            <h2 className="heading-lg mb-8">Our Mission</h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              To be the leading law firm in Saudi Arabia, recognized for our expertise, integrity, and commitment to 
              delivering exceptional legal services that exceed client expectations.
            </p>
            <Button className="btn-primary">
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;