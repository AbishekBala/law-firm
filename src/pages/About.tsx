import { ArrowRight, Award, Users, TrendingUp, Target, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { useTranslation } from '@/hooks/useLanguage';
import heroLawyer from '@/assets/hero-lawyer.jpg';

const About = () => {
  const { t } = useTranslation();
  
  const milestones = [
    { year: '2009', event: 'Firm Founded', description: 'Ali Bin Fahad established the firm with a vision for legal excellence' },
    { year: '2015', event: 'Major Expansion', description: 'Expanded services to include intellectual property and corporate law' },
    { year: '2020', event: 'Digital Innovation', description: 'Launched digital legal solutions and online consultation services' },
    { year: '2024', event: 'Market Leadership', description: 'Recognized as a leading law firm in Saudi Arabia with 500+ clients' },
  ];

  const achievements = [
    { icon: Award, number: '15+', label: 'Years of Excellence' },
    { icon: Users, number: '500+', label: t('clientsServed') },
    { icon: TrendingUp, number: '98%', label: t('successRate') },
    { icon: Award, number: '24/7', label: 'Client Support' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">About Us</h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Your Trusted Legal Partner in Saudi Arabia
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="heading-md text-legal-navy mb-6">
                Ali Bin Fahad Law Firm & Intellectual Property LLC
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Ali Bin Fahad Law Firm & Intellectual Property LLC is a prestigious corporate law firm 
                based in Saudi Arabia, dedicated to delivering world-class legal services to businesses 
                and individuals. Renowned for our expertise in corporate law, business formation, 
                intellectual property protection, and notary services, we empower clients to navigate 
                Saudi Arabia's legal landscape with confidence and ease.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our firm is built on a foundation of integrity, excellence, and innovation, with a mission 
                to provide customized legal solutions tailored to the specific needs of our clients. 
                Whether you're establishing a business, safeguarding intellectual property, or seeking 
                expert representation, we combine legal precision with a deep understanding of the 
                Saudi market to help you succeed.
              </p>
              <Button className="btn-outline">
                Learn About Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative animate-slideInRight">
              <img 
                src={heroLawyer} 
                alt="Ali Bin Fahad - Managing Partner" 
                className="rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-premium text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-legal-navy mb-4">{t('ourVision')}</h3>
              <p className="text-neutral-600 leading-relaxed">
                To be the leading law firm in Saudi Arabia, recognized for our expertise, integrity, 
                and commitment to delivering exceptional legal services that exceed client expectations 
                and contribute to the development of the Kingdom's legal landscape.
              </p>
            </div>
            
            <div className="card-premium text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-legal-navy mb-4">{t('ourMission')}</h3>
              <p className="text-neutral-600 leading-relaxed">
                At Ali Bin Fahad Law Firm, our goal is to be the leading legal partner in Saudi Arabia, 
                providing tailored and innovative solutions to businesses and individuals. We aim to 
                deliver exceptional legal services that empower our clients to achieve their objectives 
                while safeguarding their legal and financial interests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="heading-md text-legal-navy mb-8">{t('ourCommitment')}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Under the guidance of Ali Bin Fahad, our highly skilled team of lawyers and legal 
              consultants delivers unparalleled legal support across all areas of corporate law. 
              Our ability to adapt to the unique demands of each client ensures that your business 
              objectives are met with efficiency, professionalism, and attention to detail.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-legal-navy mb-2">Innovation</h3>
                <p className="text-neutral-600 text-sm">
                  Offering innovative legal solutions that align with Saudi regulations and international standards
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-legal-navy mb-2">Partnership</h3>
                <p className="text-neutral-600 text-sm">
                  Building long-lasting partnerships with clients based on trust and results
                </p>
              </div>
              <div className="text-center">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-legal-navy mb-2">Protection</h3>
                <p className="text-neutral-600 text-sm">
                  Ensuring your legal interests are protected while minimizing risks and maximizing opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="heading-md text-legal-navy mb-6">{t('ourJourney')}</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Excellence Through Leadership and Expertise
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

      {/* Achievements */}
      <section className="section-padding bg-legal-navy text-white">
        <div className="container-max text-center">
          <h2 className="heading-md mb-12">Our Achievements</h2>
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
    </div>
  );
};

export default About;