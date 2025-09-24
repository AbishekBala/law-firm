import { ArrowRight, Award, Users, TrendingUp, Heart, Shield, Lightbulb, Scale, Clock, CheckCircle } from 'lucide-react';
import HeroScrollAnimation from '@/components/ui/hero-scroll-animation';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';
import { GradientCard } from '@/components/ui/gradient-card-optimized';
import RotatingText from '@/components/RotatingText';
import { Typewriter } from '@/components/ui/typewriter-text';
import { useTranslation } from '@/hooks/useLanguage';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';
import { useNavigate } from 'react-router-dom';
import heroLawyer from '@/assets/hero-lawyer.jpg';
import heroOffice from '@/assets/hero-office.jpg';

const Home = () => {
  const { t } = useTranslation();
  const { isVisible, elementRef } = useOptimizedAnimation();
  const navigate = useNavigate();
  
  const stats = [
    { number: '15+', label: t('yearsExperience'), icon: Award },
    { number: '500+', label: t('clientsServed'), icon: Users },
    { number: '98%', label: t('successRate'), icon: TrendingUp },
  ];

  const showcaseFeatures = [
    {
      icon: Scale,
      title: t('legalExpertise'),
      description: t('legalExpertiseDesc'),
    },
    {
      icon: Clock,
      title: t('rapidResponse'),
      description: t('rapidResponseDesc'),
    },
    {
      icon: CheckCircle,
      title: t('successRecord'),
      description: t('successRecordDesc'),
    },
  ];

  const coreValues = [
    {
      icon: Award,
      title: t('legalExcellence'),
      description: t('legalExcellenceDesc'),
    },
    {
      icon: Shield,
      title: t('professionalIntegrity'),
      description: t('professionalIntegrityDesc'),
    },
    {
      icon: Lightbulb,
      title: t('innovativeSolutions'),
      description: t('innovativeSolutionsDesc'),
    },
    {
      icon: Heart,
      title: t('clientCenteredApproach'),
      description: t('clientCenteredApproachDesc'),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section h-[85vh] flex items-center pt-8"
        style={{
          backgroundImage: `url(${heroOffice})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="hero-content container-max w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center">
            {/* Left Side - Main Content */}
            <AnimatedSection animation="fadeInLeft" className="text-white flex flex-col justify-center px-4 lg:px-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {t('heroTitle')}
              </h1>
              <div className="gold-accent text-lg md:text-xl font-semibold mb-6">
                {t('heroSubtitle')}
              </div>
              <p className="text-base text-neutral-200 mb-8 leading-relaxed">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="btn-primary shadow-button hover:shadow-lg transition-all duration-300"
                >
                  {t('Contact Us')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={() => navigate('/services')}
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-legal-navy transition-all duration-300 font-medium"
                >
                  {t('ourServices')}
                </Button>
              </div>
            </AnimatedSection>

            {/* Right Side - Professional Showcase */}
            <AnimatedSection animation="fadeInRight" delay={200} className="hidden lg:block relative px-4 lg:px-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center mr-4">
                      <Scale className="h-6 w-6 text-accent" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">{t('premierLegalSolutions')}</h3>
                      <p className="text-neutral-200 text-sm md:text-base">{t('trustedByClients')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {showcaseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-accent/20 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
                        <p className="text-neutral-200 text-xs leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats below the card */}
              <div className="mt-4">
                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="h-4 w-4 text-accent mx-auto mb-1" />
                      <AnimatedCounter 
                        value={stat.number} 
                        label={stat.label}
                        duration={2000 + index * 200}
                        className="text-white"
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Legal Excellence */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-amber-50/30 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-legal-navy rounded-full blur-3xl"></div>
          </div>
          
          <div className="container-max relative z-10 px-4 sm:px-6 lg:px-12">
            {/* Mobile Section Header - Show only on mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-accent/10 rounded-full border border-accent/20 mb-2 sm:mb-3">
                <Scale className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-accent mr-1.5 sm:mr-2" />
                <span className="text-xs font-medium text-accent">{t('professionalLegalServices')}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-legal-navy mb-2 sm:mb-3 leading-tight">
                Our Legal{' '}
                <RotatingText
                  texts={[t('rotatingExcellence'), t('rotatingExpertise'), t('rotatingSolutions'), t('rotatingInnovation')]}
                  mainClassName="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-accent via-yellow-500 to-amber-600 text-white overflow-hidden rounded-md sm:rounded-lg shadow-lg text-sm sm:text-base"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </h2>
              
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-accent to-yellow-500 rounded-full mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center max-w-6xl mx-auto">
              
              {/* Enhanced Image Section - Mobile First Order */}
              <div className="lg:col-span-5 order-1 lg:order-2 relative mb-8 lg:mb-0">
                <div className="relative group max-w-xs sm:max-w-sm lg:max-w-md mx-auto">
                  {/* Decorative background elements - Optimized for mobile */}
                  <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-black/15 to-black/25 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl group-hover:blur-xl sm:group-hover:blur-2xl transition-all duration-500"></div>
                  
                  {/* Main image container - Mobile optimized */}
                  <div className="relative bg-white rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-lg sm:shadow-xl">
                    <LazyImage 
                      src={heroLawyer} 
                      alt={t('heroAlt')} 
                      className="rounded-lg sm:rounded-xl w-full h-auto object-cover shadow-md sm:shadow-lg"
                    />
                    
                    {/* Overlay badge - Mobile optimized */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-md sm:shadow-lg">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-legal-navy">{t('availableForConsultation')}</span>
                      </div>
                    </div>

                    {/* Bottom testimonial card - Hidden on mobile, shown on hover for desktop */}
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-white/95 backdrop-blur-sm rounded-md sm:rounded-lg p-2 sm:p-3 shadow-md sm:shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
                      <div className="flex items-start space-x-1.5 sm:space-x-2">
                        <div className="flex-shrink-0">
                          <div className="w-5 sm:w-6 h-5 sm:h-6 bg-accent/10 rounded-full flex items-center justify-center">
                            <Scale className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-accent" />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-neutral-600 italic">{t('testimonialQuote')}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{t('testimonialAuthor')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section - Mobile Second Order */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col">
                {/* Enhanced Header - Desktop only */}
                <div className="mb-4 sm:mb-6 text-center lg:text-left hidden lg:block">
                  <div className="inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 bg-accent/10 rounded-full border border-accent/20 mb-2 sm:mb-3">
                    <Scale className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-accent mr-1.5 sm:mr-2" />
                    <span className="text-xs font-medium text-accent">{t('professionalLegalServices')}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-legal-navy mb-2 sm:mb-3 leading-tight">
                        {t('ourLegal')}{' '}
                        <RotatingText
                          texts={[t('rotatingExcellence'), t('rotatingExpertise'), t('rotatingSolutions'), t('rotatingInnovation')]}
                      mainClassName="inline-flex px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-accent via-yellow-500 to-amber-600 text-white overflow-hidden rounded-md sm:rounded-lg shadow-lg text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden"
                      transition={{ type: "spring", damping: 30, stiffness: 400 }}
                      rotationInterval={3000}
                    />
                  </h2>
                  
                  <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-accent to-yellow-500 rounded-full mb-3 sm:mb-4 mx-auto lg:mx-0"></div>
                </div>

                {/* Enhanced Description - Mobile optimized */}
                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-center lg:text-left">
                    <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
                    {t('heroLinePrefix')}{' '}
                    <span className="text-accent font-semibold">{t('beaconPhrase')}</span>{' '}
                    {t('inSaudiArabia')}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    {t('heroDescription')}
                  </p>
                </div>

                {/* Enhanced Stats - Side by Side Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8 text-center lg:text-left">
                  {/* Years of Excellence */}
                  <div className="group">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-1">
                          <AnimatedCounter 
                            value="15+" 
                            label=""
                            className="!text-3xl sm:!text-4xl lg:!text-5xl"
                            size="lg"
                          />
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-legal-navy">{t('yearsExperience')}</p>
                      </div>
                    </div>
                  </div>

                  {/* Satisfied Clients */}
                  <div className="group">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-accent to-yellow-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-1">
                          <AnimatedCounter 
                            value="500+" 
                            label=""
                            className="!text-3xl sm:!text-4xl lg:!text-5xl"
                            size="lg"
                          />
                        </div>
                        <p className="text-base sm:text-lg font-semibold text-legal-navy">{t('clientsServed')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced CTA Section - Mobile optimized */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center lg:items-start mb-4 sm:mb-6">
                  <Button 
                    onClick={() => navigate('/about')}
                    className="btn-primary group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 w-full sm:w-auto"
                  >
                    {t('learnMore')}
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-3.5 sm:w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/services')}
                    variant="outline" 
                    className="border-2 border-legal-navy text-legal-navy hover:bg-legal-navy hover:text-white transition-all duration-300 text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 w-full sm:w-auto"
                  >
                    {t('ourServices')}
                  </Button>
                </div>

                {/* Trust Indicators - Mobile optimized */}
                <div className="pt-4 sm:pt-6 border-t border-neutral-200">
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 text-xs text-neutral-500">
                    <div className="flex items-center">
                      <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1 sm:mr-1.5 text-accent" />
                      <span>{t('licensedCertified')}</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1 sm:mr-1.5 text-accent" />
                      <span>{t('successRateText')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1 sm:mr-1.5 text-accent" />
                      <span>{t('support247')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Values Animation */}
      <HeroScrollAnimation />

      {/* Our Mission */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-legal-navy text-white relative overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-legal-navy via-legal-navy to-neutral-900"></div>
          <div className="container-max relative z-10 text-center">
            <h2 className="heading-lg mb-8">{t('ourMission')}</h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('missionDescription')}
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="btn-primary"
            >
              {t('scheduleConsultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;