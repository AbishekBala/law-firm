import { ArrowRight, Award, Users, TrendingUp, Target, Eye, Shield, Lightbulb, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { Typewriter } from '@/components/ui/typewriter-text';
import { useTranslation } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import heroLawyer from '@/assets/hero-lawyer.jpg';
import certificate1 from '@/assets/certificate1.png';
import certificate2 from '@/assets/certificate2.png';
import certificate3 from '@/assets/certificate3.png';

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const stickyContent = [
    {
      title: "Legal Excellence Foundation",
      description: "Built on 15+ years of specialized experience in Saudi Arabian law, our firm has established itself as a cornerstone of legal expertise in the region.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-accent/10 via-yellow-500/5 to-accent/20 border-2 border-accent/30 flex items-center justify-center p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-accent to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Award className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">15+ Years</h3>
            <p className="text-lg text-white font-semibold">Legal Excellence</p>
          </div>
        </div>
      ),
    },
    {
      title: "Client-Centered Approach", 
      description: "We have successfully served over 500 clients, maintaining a 98% success rate through our personalized legal solutions and dedicated service.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-legal-navy via-legal-navy/90 to-accent/20 flex items-center justify-center text-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-accent to-yellow-500 border-2 border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-accent mb-2">500+</h3>
            <p className="text-lg text-accent font-semibold">Satisfied Clients</p>
          </div>
        </div>
      ),
    },
    {
      title: "Innovation & Technology",
      description: "Leveraging cutting-edge legal technology and innovative strategies to provide efficient and effective solutions for complex legal challenges.",
      content: (
        <div className="h-full w-full bg-gradient-to-br from-accent via-yellow-500 to-accent/80 flex items-center justify-center text-white p-8 rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lightbulb className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">98%</h3>
            <p className="text-lg text-legal-navy font-bold">Success Rate</p>
          </div>
        </div>
      ),
    },
  ];
  
  const achievements = [
    { icon: Award, number: 15, suffix: '+', label: t('yearsOfExcellence') },
    { icon: Users, number: 500, suffix: '+', label: t('clientsServed') },
    { icon: TrendingUp, number: 98, suffix: '%', label: t('successRate') },
    { icon: Award, number: 24, suffix: '/7', label: t('clientSupport') },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">
            <Typewriter
              text="About Ali Bin Fahad Law Firm"
              speed={80}
              loop={false}
              className="text-inherit"
            />
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            {t('aboutSubtitle')}
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slideInLeft">
                <h2 className="heading-md text-legal-navy mb-6">
                  Ali Bin Fahad Law Firm & Intellectual Property LLC
                </h2>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  {t('aboutDescription1')}
                </p>
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  {t('aboutDescription2')}
                </p>
                <Button 
                  onClick={() => navigate('/services')}
                  className="btn-outline"
                >
                  {t('learnAboutServices')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative animate-slideInRight">
                <LazyImage 
                  src={heroLawyer}
                  alt="Ali Bin Fahad - Managing Partner" 
                  className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Sticky Scroll Experience */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-neutral-50">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-legal-navy mb-4">Our Legal Journey</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Discover how we've built our reputation as Saudi Arabia's premier law firm through dedication, innovation, and unwavering commitment to excellence.
              </p>
            </div>
            <StickyScroll content={stickyContent} />
          </div>
        </section>
      </AnimatedSection>

      {/* Our Goal */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-legal-navy mb-4">Our Goal</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our commitment to being the leading legal partner in Saudi Arabia through excellence and innovation
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              {/* Main Goal Statement */}
              <div className="mb-12">
                <div className="bg-white border-2 border-legal-gold rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-legal-gold/10 border border-legal-gold rounded-xl flex items-center justify-center">
                        <Target className="h-7 w-7 text-legal-gold" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-legal-navy">Leading Legal Partnership</h3>
                      <p className="text-lg leading-relaxed text-neutral-600 mb-4">
                        At Ali Bin Fahad Law Firm & Intellectual Property LLC, our goal is to be the leading legal partner in Saudi Arabia, providing tailored and innovative solutions to businesses and individuals while safeguarding their legal and financial interests.
                      </p>
                      <p className="text-lg leading-relaxed text-neutral-600">
                        We focus on building long-term partnerships through trust, integrity, and professionalism, leveraging our expertise to provide practical strategies for evolving legal challenges.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Supporting Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Commitment Section */}
                <div className="bg-white border border-legal-gold rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-legal-gold/10 border border-legal-gold w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="h-6 w-6 text-legal-gold" />
                    </div>
                    <h4 className="text-xl font-semibold text-legal-navy">Our Commitment</h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    We help clients navigate complex legal frameworks, protect intellectual property, facilitate business growth, and resolve disputes effectively with tailored support and guidance.
                  </p>
                </div>
                
                {/* Excellence Section */}
                <div className="bg-white border border-legal-gold rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-legal-gold/10 border border-legal-gold w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-legal-gold" />
                    </div>
                    <h4 className="text-xl font-semibold text-legal-navy">Excellence in Service</h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    Excellence drives everything we do. Through dedication, accountability, and results-driven approaches, we deliver outstanding outcomes for local and international success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Professional Certificates */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-accent/5">
          <div className="container-max">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
                <Award className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Official Certifications</span>
              </div>
              <h2 className="heading-lg text-legal-navy mb-6">Professional Certificates</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                Our firm is officially recognized and certified by the leading legal authorities in Saudi Arabia, 
                ensuring the highest standards of legal practice and professional excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Saudi Bar Association */}
              <AnimatedSection animation="scaleIn" delay={0}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-accent/10 group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl p-6 mb-6 group-hover:from-accent/20 group-hover:to-yellow-500/20 transition-all duration-300">
                      <img 
                        src={certificate1} 
                        alt="Saudi Bar Association" 
                        className="mx-auto h-24 object-contain filter brightness-110"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-legal-navy mb-4 group-hover:text-accent transition-colors duration-300">
                    Saudi Bar Association
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    Certified by the Saudi Bar Association and a main member with full practicing privileges
                  </p>
                  <div className="pt-4 border-t border-accent/10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      Licensed Attorney
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* SAIP */}
              <AnimatedSection animation="scaleIn" delay={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-accent/10 group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl p-6 mb-6 group-hover:from-accent/20 group-hover:to-yellow-500/20 transition-all duration-300">
                      <img 
                        src={certificate2} 
                        alt="Saudi Authority for Intellectual Property" 
                        className="mx-auto h-24 object-contain filter brightness-110"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-legal-navy mb-4 group-hover:text-accent transition-colors duration-300">
                    Saudi Authority for Intellectual Property
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    Authorized by SAIP for registering trademarks, industrial models, and patents with full IP protection services
                  </p>
                  <div className="pt-4 border-t border-accent/10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      IP Specialist
                    </span>
                  </div>
                </div>
              </AnimatedSection>

              {/* Ministry of Justice */}
              <AnimatedSection animation="scaleIn" delay={400}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-accent/10 group">
                  <div className="relative mb-8">
                    <div className="bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl p-6 mb-6 group-hover:from-accent/20 group-hover:to-yellow-500/20 transition-all duration-300">
                      <img 
                        src={certificate3} 
                        alt="Ministry of Justice" 
                        className="mx-auto h-24 object-contain filter brightness-110"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-legal-navy mb-4 group-hover:text-accent transition-colors duration-300">
                    Ministry of Justice
                  </h3>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    Licensed by the Ministry of Justice to provide comprehensive legal services across all legal domains
                  </p>
                  <div className="pt-4 border-t border-accent/10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      Legal Services Provider
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-accent/20 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-legal-navy">Fully Licensed</p>
                      <p className="text-sm text-neutral-600">All Saudi Authorities</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-legal-navy">ISO Certified</p>
                      <p className="text-sm text-neutral-600">Quality Standards</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-legal-navy">Verified Practice</p>
                      <p className="text-sm text-neutral-600">15+ Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Achievements */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-legal-navy text-white">
          <div className="container-max text-center">
            <h2 className="heading-md mb-12">{t('ourAchievements')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-accent" />
                  </div>
                  <AnimatedCounter 
                    value={achievement.number.toString() + achievement.suffix} 
                    label={achievement.label}
                    className="text-accent"
                    duration={2000 + index * 200}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default About;