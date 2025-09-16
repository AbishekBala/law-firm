import { ArrowRight, Award, Users, TrendingUp, Heart, Shield, Lightbulb, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
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
        className="hero-section min-h-screen flex items-center pt-20"
        style={{
          backgroundImage: `url(${heroOffice})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="hero-content container-max w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
            <div className="text-white animate-slideInLeft">
              <h1 className="heading-xl mb-8">
                {t('heroTitle')}
              </h1>
              <div className="gold-accent text-2xl md:text-3xl font-semibold mb-8">
                {t('heroSubtitle')}
              </div>
              <p className="text-xl text-neutral-200 mb-12 leading-relaxed">
                {t('heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <Button className="btn-primary shadow-button hover:shadow-lg transition-all duration-300">
                  {t('scheduleConsultation')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button className="btn-secondary hover:scale-105 transition-transform duration-300">
                  {t('ourServices')}
                </Button>
              </div>
              
              {/* Stats with Animation */}
              <div className="grid grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Our Legal Excellence */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slideInLeft">
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
              <Button className="btn-outline hover:scale-105 transition-transform duration-300">
                {t('learnMore')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative animate-slideInRight">
              <img 
                src={heroLawyer} 
                alt="Professional lawyer" 
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max text-center">
          <h2 className="heading-lg text-legal-navy mb-4">Our Core Values</h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
            The principles that guide our practice and define our commitment to excellence
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="card-premium text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-legal-navy mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding bg-legal-navy text-white relative overflow-hidden">
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
    </div>
  );
};

export default Home;