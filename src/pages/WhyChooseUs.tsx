import { Shield, Monitor, Users, Clock, Award, RefreshCw } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Typewriter } from '@/components/ui/typewriter-text';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Highest Standards of Integrity',
      description: 'We uphold the highest ethical standards, providing honest and transparent legal services while adhering to professional excellence and Islamic principles.',
    },
    {
      icon: Monitor,
      title: 'Digital Legal Solutions',
      description: 'Modern technology integration for efficient service delivery, including online consultations, document management, and real-time case tracking.',
    },
    {
      icon: Users,
      title: 'Expert Legal Team',
      description: 'Our diverse team of specialized lawyers brings comprehensive expertise across all areas of law, ensuring the best possible outcomes.',
    },
    {
      icon: Clock,
      title: 'Rapid Response Time',
      description: 'We understand the urgency of legal matters and guarantee prompt responses to all client inquiries through multiple communication channels.',
    },
    {
      icon: Award,
      title: 'Professional Excellence',
      description: 'Our commitment to continuous improvement and professional development ensures we deliver cutting-edge legal solutions.',
    },
    {
      icon: RefreshCw,
      title: 'Ongoing Client Support',
      description: 'Comprehensive follow-up services and regular updates keep you informed about your case progress and any legal developments.',
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">
            <Typewriter
              text="Why Choose Ali Bin Fahad Law Firm"
              speed={80}
              loop={false}
              className="text-inherit"
            />
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Discover what sets us apart as your trusted legal partner in Saudi Arabia
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive approach to legal services combines expertise, innovation, and unwavering commitment to client success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white border border-neutral-100 hover:border-accent/30 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent/20 group-hover:to-accent/30 transition-all duration-300 transform group-hover:scale-110 shadow-md">
                    <feature.icon className="h-10 w-10 text-accent" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-legal-navy mb-4 group-hover:text-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 via-white to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 border border-accent/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent/5 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-accent/10 rounded-full"></div>
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">Our Track Record</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Numbers that speak to our commitment and success in delivering exceptional legal services
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <AnimatedSection animation="scaleIn" delay={0}>
              <div className="group">
                <div className="bg-white border border-accent/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <AnimatedCounter 
                      value="15+" 
                      label="Years of Excellence"
                      className="text-accent"
                      duration={2000}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="group">
                <div className="bg-white border border-accent/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <AnimatedCounter 
                      value="500+" 
                      label="Satisfied Clients"
                      className="text-accent"
                      duration={2200}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="scaleIn" delay={400}>
              <div className="group">
                <div className="bg-white border border-accent/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <AnimatedCounter 
                      value="98%" 
                      label="Success Rate"
                      className="text-accent"
                      duration={2400}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="scaleIn" delay={600}>
              <div className="group">
                <div className="bg-white border border-accent/20 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <AnimatedCounter 
                      value="24/7" 
                      label="Client Support"
                      className="text-accent"
                      duration={2600}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-gradient-to-br from-legal-navy via-legal-navy to-legal-navy/90 text-white relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 border border-accent/20 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/10 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-accent/15 rounded-full opacity-25"></div>
          <div className="absolute bottom-40 left-40 w-16 h-16 bg-accent/15 rounded-full opacity-30"></div>
        </div>
        
        <div className="container-max text-center relative z-10">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Commitment to Excellence</h2>
            <p className="text-lg md:text-xl text-accent/90 leading-relaxed">
              We don't just practice law – we perfect it. Our unwavering dedication to excellence drives every decision, every case, and every client relationship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                <Shield className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">Trust & Reliability</h3>
              <p className="text-neutral-200 leading-relaxed">
                Building lasting relationships through consistent, dependable legal service that you can count on when it matters most.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                <Award className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">Quality Results</h3>
              <p className="text-neutral-200 leading-relaxed">
                Delivering exceptional outcomes that exceed client expectations through meticulous preparation and strategic execution.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-accent/20 to-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">Client Focus</h3>
              <p className="text-neutral-200 leading-relaxed">
                Putting our clients' needs first in every decision and action, ensuring personalized attention and tailored solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;