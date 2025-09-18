import { ArrowRight, Mail, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamMemberModal } from '@/components/TeamMemberModal';
import { AnimatedSection } from '@/components/AnimatedSection';
import { Typewriter } from '@/components/ui/typewriter-text';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import teamAli from '@/assets/hero-lawyer.jpg';
import teamSarah from '@/assets/team-sarah.jpg';
import teamAhmed from '@/assets/team-ahmed.jpg';
import teamFatima from '@/assets/team-fatima.jpg';

interface TeamMember {
  name: string;
  title: string;
  specialization: string;
  credentials: string;
  description: string;
  areas: string[];
  image: string;
}

const Team = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const teamMembers = [
    {
      name: t('aliBinFahad'),
      title: t('aliTitle'),
      specialization: t('aliSpecialization'),
      credentials: t('aliCredentials'),
      description: t('aliDescription'),
      areas: t('aliAreas', { returnObjects: true }) as string[],
      image: teamAli,
    },
    {
      name: t('sarahAlRashid'),
      title: t('sarahTitle'),
      specialization: t('sarahSpecialization'),
      credentials: t('sarahCredentials'),
      description: t('sarahDescription'),
      areas: t('sarahAreas', { returnObjects: true }) as string[],
      image: teamSarah,
    },
    {
      name: t('ahmedAlMansouri'),
      title: t('ahmedTitle'),
      specialization: t('ahmedSpecialization'),
      credentials: t('ahmedCredentials'),
      description: t('ahmedDescription'),
      areas: t('ahmedAreas', { returnObjects: true }) as string[],
      image: teamAhmed,
    },
    {
      name: t('fatimaAlZahra'),
      title: t('fatimaTitle'),
      specialization: t('fatimaSpecialization'),
      credentials: t('fatimaCredentials'),
      description: t('fatimaDescription'),
      areas: t('fatimaAreas', { returnObjects: true }) as string[],
      image: teamFatima,
    },
  ];

  return (
    <div>
      {/* Header */}
      <AnimatedSection animation="fadeInUp">
        <section className="bg-legal-navy text-white py-20">
          <div className="container-max text-center px-4">
            <h1 className="heading-lg mb-6">
              <Typewriter
                text={[
                  t('ourExpertLegalTeam'),
                  t('professionalExcellence'), 
                  t('experiencedLawyers'),
                  t('legalSpecialists')
                ]}
                speed={80}
                loop={true}
                deleteSpeed={40}
                delay={2000}
                className="text-inherit"
              />
            </h1>
            <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
              {t('meetExperiencedProfessionals')}
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Team Grid */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {teamMembers.map((member, index) => (
                <AnimatedSection 
                  key={index}
                  animation="scaleIn"
                  delay={index * 100}
                >
                  <div 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-2"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg width='320' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3E%3Ctspan x='50%25' dy='-0.5em'%3EImage%3C/tspan%3E%3Ctspan x='50%25' dy='1em'%3ENot Available%3C/tspan%3E%3C/svg%3E";
                        }}
                      />
                      {/* Enhanced overlay for better readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      {/* Professional badge overlay */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-medium text-legal-navy">{t('viewProfile')}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-legal-navy mb-2 group-hover:text-accent transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-accent font-semibold mb-2 text-sm">
                          {member.title}
                        </p>
                        <p className="text-xs text-neutral-600 mb-3 bg-neutral-50 px-3 py-1 rounded-full inline-block">
                          {member.specialization}
                        </p>
                      </div>
                      
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {member.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {member.areas.slice(0, 2).map((area, areaIndex) => (
                            <span 
                              key={areaIndex}
                              className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full font-medium border border-accent/20"
                            >
                              {area}
                            </span>
                          ))}
                          {member.areas.length > 2 && (
                            <span className="text-xs text-neutral-500 px-3 py-1 bg-neutral-100 rounded-full">
                              +{member.areas.length - 2} {t('moreAreas')}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center text-xs text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span className="font-medium">{member.credentials}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-4 border-t border-neutral-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-auto hover:bg-accent/10 hover:text-accent transition-all duration-200 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Open mail client with subject referencing the member
                            const subject = encodeURIComponent(`Inquiry for ${member.name}`);
                            window.location.href = `mailto:info@abf.sa?subject=${subject}`;
                          }}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-auto hover:bg-accent/10 hover:text-accent transition-all duration-200 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = 'tel:+966557536255';
                          }}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 h-auto hover:bg-accent/10 hover:text-accent transition-all duration-200 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://www.linkedin.com', '_blank');
                          }}
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Team Member Modal */}
      <TeamMemberModal 
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* CTA Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="section-padding bg-legal-navy text-white">
          <div className="container-max text-center">
            <h2 className="heading-md mb-6">{t('readyToWorkWithTeam')}</h2>
            <p className="text-xl text-neutral-200 mb-8 max-w-3xl mx-auto">
              {t('teamCTA')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                className="btn-primary shadow-button hover:shadow-lg transition-all duration-300"
              >
                {t('scheduleConsultation')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                className="btn-secondary hover:scale-105 transition-transform duration-300"
              >
                {t('contactUs')}
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Team;