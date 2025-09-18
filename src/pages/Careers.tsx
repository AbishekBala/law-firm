import { ArrowRight, Building, Scale, DollarSign, FileText, Globe, Shield, Users, MapPin, Clock, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Typewriter } from '@/components/ui/typewriter-text';
import { useTranslation } from '@/hooks/useLanguage';
import { careersData } from '@/data/careersData';

const Careers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Icon mapping for the careers
  const iconMap = {
    'Scale': Scale,
    'Building': Building,
    'DollarSign': DollarSign,
    'FileText': FileText,
    'Globe': Globe,
    'Shield': Shield,
    'Users': Users
  } as const;

  // Get unique departments for filtering
  const departments = Array.from(new Set(careersData.map(career => career.department)));

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-legal-navy via-legal-navy/95 to-slate-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent"></div>
        <div className="container-max text-center px-4 relative z-10">
          <div className="animate-fade-in">
            <h1 className="heading-lg mb-6">
              <Typewriter
                text={[
                  "Join Our Legal Team",
                  "Build Your Career With Us", 
                  "Grow with Ali Bin Fahad Law Firm",
                  "Your Legal Career Starts Here"
                ]}
                speed={80}
                loop={true}
                deleteSpeed={40}
                delay={2000}
                className="text-inherit"
              />
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto mb-8 animate-slide-up animate-delay-300">
              Discover exciting career opportunities at Ali Bin Fahad Law Firm. Join our dynamic team of legal professionals and build a rewarding career in one of Saudi Arabia's leading law firms.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up animate-delay-500">
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-neutral-300">Legal Professionals</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent mb-2">15+</div>
              <div className="text-neutral-300">Years of Excellence</div>
            </div>
            <div className="text-center transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent mb-2">6</div>
              <div className="text-neutral-300">Open Positions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12 animate-fade-in animate-delay-200">
            <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">
              Current Opportunities
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our open positions and find the perfect role to advance your legal career.
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {careersData.map((career, index) => {
              const IconComponent = iconMap[career.icon as keyof typeof iconMap] || Building;
              const isNew = new Date(career.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
              
              return (
                <Link key={index} to={`/careers/${career.id}`} className="h-full">
                  <div className={`card-service group cursor-pointer h-full flex flex-col border border-neutral-200 hover:border-accent/30 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-fade-in bg-gradient-to-br from-white to-neutral-50/50`}
                       style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="p-6 flex-grow">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-br from-accent/10 to-accent/20 w-12 h-12 rounded-xl flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="flex gap-2">
                          {isNew && (
                            <Badge className="bg-green-100 text-green-800 text-xs animate-pulse">New</Badge>
                          )}
                          <Badge variant="outline" className="text-xs hover:bg-accent hover:text-white transition-all duration-300">{career.type}</Badge>
                        </div>
                      </div>
                      
                      {/* Job Title & Department */}
                      <h3 className="text-xl font-semibold text-legal-navy mb-2 leading-tight group-hover:text-accent transition-colors">
                        {career.title}
                      </h3>
                      
                      <div className="text-sm text-accent font-medium mb-3">
                        {career.department}
                      </div>
                      
                      {/* Job Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-neutral-600">
                          <MapPin className="h-4 w-4 mr-2 text-neutral-400" />
                          {career.location}
                        </div>
                        <div className="flex items-center text-sm text-neutral-600">
                          <Clock className="h-4 w-4 mr-2 text-neutral-400" />
                          {career.experience} experience
                        </div>
                        {career.salary && (
                          <div className="flex items-center text-sm text-neutral-600">
                            <DollarSign className="h-4 w-4 mr-2 text-neutral-400" />
                            {career.salary}
                          </div>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="text-neutral-600 mb-6 leading-relaxed text-sm line-clamp-3">
                        {career.description}
                      </p>
                      
                      {/* Key Requirements Preview */}
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-legal-navy mb-2">Key Requirements:</h4>
                        <ul className="space-y-1">
                          {career.requirements.slice(0, 2).map((requirement, reqIndex) => (
                            <li key={reqIndex} className="flex items-start text-sm text-neutral-600">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0 mt-2"></div>
                              <span className="leading-relaxed">{requirement}</span>
                            </li>
                          ))}
                          {career.requirements.length > 2 && (
                            <li className="text-sm text-neutral-500 ml-4">
                              +{career.requirements.length - 2} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="px-6 pb-6 pt-0">
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div className="flex items-center text-xs text-neutral-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          Posted {new Date(career.postedDate).toLocaleDateString()}
                        </div>
                        <Button
                          variant="ghost"
                          className="text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto group-hover:translate-x-1 transition-transform font-medium text-sm"
                          onClick={(e) => {
                            e.preventDefault();
                            // navigate to career detail page
                            try {
                              // try a programmatic navigation if available
                              const path = `/careers/${career.id}`;
                              window.location.href = path;
                            } catch {
                              window.location.href = `/careers/${career.id}`;
                            }
                          }}
                        >
                          Apply Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-legal-navy to-legal-navy/90 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-accent/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent/20 rounded-full"></div>
          <div className="absolute top-40 right-40 w-16 h-16 bg-accent/10 rounded-full"></div>
        </div>
        
        <div className="container-max text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              <Typewriter
                text="Ready to Start Your Legal Career?"
                speed={80}
                loop={false}
                className="text-inherit"
              />
            </h2>
            <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't see the perfect role? Send us your CV anyway. We're always looking for talented legal professionals to join our growing team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-accent hover:bg-accent/90 text-legal-navy font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group w-full sm:w-auto"
              >
                Submit Your CV
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => window.open('mailto:careers@alibinfahad.com', '_blank')}
                variant="outline" 
                className="border-2 border-accent/80 bg-white/90 text-legal-navy hover:bg-accent hover:text-white hover:border-accent font-semibold px-8 py-3 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Email HR Team
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                <div className="text-white/90">
                  <div className="text-lg font-semibold text-accent mb-2">HR Department</div>
                  <div className="text-sm">careers@alibinfahad.com</div>
                </div>
                <div className="text-white/90">
                  <div className="text-lg font-semibold text-accent mb-2">Phone</div>
                  <div className="text-sm">+966 11 XXX XXXX</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;