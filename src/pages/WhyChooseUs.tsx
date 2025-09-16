import { Shield, Monitor, Users, Clock, Award, RefreshCw } from 'lucide-react';

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
          <h1 className="heading-lg mb-6">Why Choose Ali Bin Fahad Law Firm</h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Discover what sets us apart as your trusted legal partner in Saudi Arabia
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card-premium text-center group">
                <div className="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-10 w-10 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold text-legal-navy mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="card-premium">
              <div className="stat-number text-legal-navy">15+</div>
              <p className="text-neutral-600 font-medium">Years of Excellence</p>
            </div>
            <div className="card-premium">
              <div className="stat-number text-legal-navy">500+</div>
              <p className="text-neutral-600 font-medium">Satisfied Clients</p>
            </div>
            <div className="card-premium">
              <div className="stat-number text-legal-navy">98%</div>
              <p className="text-neutral-600 font-medium">Success Rate</p>
            </div>
            <div className="card-premium">
              <div className="stat-number text-legal-navy">24/7</div>
              <p className="text-neutral-600 font-medium">Client Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section-padding bg-legal-navy text-white">
        <div className="container-max text-center">
          <h2 className="heading-md mb-8">Our Commitment to Excellence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trust & Reliability</h3>
              <p className="text-neutral-300 text-sm">
                Building lasting relationships through consistent, dependable legal service
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Results</h3>
              <p className="text-neutral-300 text-sm">
                Delivering exceptional outcomes that exceed client expectations
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Client Focus</h3>
              <p className="text-neutral-300 text-sm">
                Putting our clients' needs first in every decision and action
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;