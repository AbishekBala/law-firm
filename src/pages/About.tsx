import { ArrowRight, Award, Users, TrendingUp, Target, Eye, Heart, Shield, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { useTranslation } from '@/hooks/useLanguage';
import heroLawyer from '@/assets/hero-lawyer.jpg';

const About = () => {
  const { t } = useTranslation();

  const stickyContent = [
    {
      title: "Legal Excellence Foundation",
      description: "Built on 15+ years of specialized experience in Saudi Arabian law, our firm has established itself as a cornerstone of legal expertise in the region.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,hsl(var(--legal-navy)),hsl(var(--legal-gold)))] flex items-center justify-center text-white p-8 rounded-lg">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">15+ Years</h3>
            <p className="text-lg">Legal Excellence</p>
          </div>
        </div>
      ),
    },
    {
      title: "Client-Centered Approach", 
      description: "We have successfully served over 500 clients, maintaining a 98% success rate through our personalized legal solutions and dedicated service.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,hsl(var(--legal-gold)),hsl(var(--legal-gold-light)))] flex items-center justify-center text-white p-8 rounded-lg">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-lg">Satisfied Clients</p>
          </div>
        </div>
      ),
    },
    {
      title: "Innovation & Technology",
      description: "Leveraging cutting-edge legal technology and innovative strategies to provide efficient and effective solutions for complex legal challenges.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,hsl(var(--accent)),hsl(var(--primary)))] flex items-center justify-center text-white p-8 rounded-lg">
          <div className="text-center">
            <Lightbulb className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">98%</h3>
            <p className="text-lg">Success Rate</p>
          </div>
        </div>
      ),
    },
    {
      title: "Professional Integrity",
      description: "Maintaining the highest ethical standards and building trust through transparent, honest, and reliable legal counsel for all our clients.",
      content: (
        <div className="h-full w-full bg-[linear-gradient(to_bottom_right,hsl(var(--primary)),hsl(var(--accent)))] flex items-center justify-center text-white p-8 rounded-lg">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Trusted</h3>
            <p className="text-lg">Legal Partner</p>
          </div>
        </div>
      ),
    },
  ];
  
  const milestones = [
    { year: '2009', event: 'Firm Founded', description: 'Ali Bin Fahad established the firm with a vision for legal excellence' },
    { year: '2015', event: 'Major Expansion', description: 'Expanded services to include intellectual property and corporate law' },
    { year: '2020', event: 'Digital Innovation', description: 'Launched digital legal solutions and online consultation services' },
    { year: '2024', event: 'Market Leadership', description: 'Recognized as a leading law firm in Saudi Arabia with 500+ clients' },
  ];

  const achievements = [
    { icon: Award, number: '15+', label: t('yearsOfExcellence') },
    { icon: Users, number: '500+', label: t('clientsServed') },
    { icon: TrendingUp, number: '98%', label: t('successRate') },
    { icon: Award, number: '24/7', label: t('clientSupport') },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">{t('aboutTitle')}</h1>
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
                <Button className="btn-outline">
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

      {/* Vision & Mission */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-premium text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-legal-navy mb-4">{t('ourVision')}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {t('visionDescription')}
                </p>
              </div>
              
              <div className="card-premium text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-legal-navy mb-4">{t('ourMission')}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {t('missionDescription')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Commitment */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-neutral-50">
          <div className="container-max text-center">
            <h2 className="heading-md text-legal-navy mb-8">{t('ourCommitment')}</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                {t('commitmentDescription')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-legal-navy mb-2">{t('innovation')}</h3>
                  <p className="text-neutral-600 text-sm">
                    {t('innovationDesc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-legal-navy mb-2">{t('partnership')}</h3>
                  <p className="text-neutral-600 text-sm">
                    {t('partnershipDesc')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-legal-navy mb-2">{t('protection')}</h3>
                  <p className="text-neutral-600 text-sm">
                    {t('protectionDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Story Timeline */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="text-center mb-12">
              <h2 className="heading-md text-legal-navy mb-6">{t('ourJourney')}</h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                {t('journeyDescription')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {milestone.year}
                  </div>
                  <h3 className="text-lg font-semibold text-legal-navy mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              ))}
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
                    value={achievement.number} 
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