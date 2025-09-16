import { ArrowRight, Mail, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamMemberModal } from '@/components/TeamMemberModal';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useLanguage';
import teamAli from '@/assets/hero-lawyer.jpg';
import teamSarah from '@/assets/team-sarah.jpg';
import teamAhmed from '@/assets/team-ahmed.jpg';
import teamFatima from '@/assets/team-fatima.jpg';

const Team = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const teamMembers = [
    {
      name: 'Ali Bin Fahad',
      title: 'Managing Partner & Founder',
      specialization: 'Corporate Law • Intellectual Property',
      credentials: 'Saudi Bar Association',
      description: 'A distinguished legal practitioner with over 15 years of experience in Saudi Arabian law, specializing in corporate formations, regulatory compliance, and business restructuring with a focus on helping clients navigate complex legal landscapes.',
      areas: ['Corporate Law', 'Intellectual Property', '+2 more'],
      image: teamAli,
    },
    {
      name: 'Dr. Sarah Al-Rashid',
      title: 'Senior Partner • IP Law',
      specialization: 'Trademark • Patent Protection',
      credentials: 'SAIP Certified',
      description: 'Leading expert in intellectual property law with extensive experience in trademark registration, patent protection, and brand defense strategies. Recognized for her innovative approach to IP protection in the digital age.',
      areas: ['Trademark Law', 'Patent Protection', '+2 more'],
      image: teamSarah,
    },
    {
      name: 'Ahmed Al-Mansouri',
      title: 'Senior Associate • Corporate Law',
      specialization: 'Corporate Formation • Regulatory Compliance',
      credentials: 'Licensed Attorney',
      description: 'Specializes in corporate formations, regulatory compliance, and business restructuring with a focus on helping international companies establish operations in Saudi Arabia and navigate local business requirements.',
      areas: ['Corporate Formation', 'Regulatory Compliance', '+2 more'],
      image: teamAhmed,
    },
    {
      name: 'Fatima Al-Zahra',
      title: 'Partner • Family & Estate Law',
      specialization: 'Family Law • Estate Planning',
      credentials: 'Family Law Specialist',
      description: 'Dedicated to family law matters, estate planning, and succession law with a compassionate approach to sensitive family issues. Expertise in Islamic inheritance law and modern estate planning strategies.',
      areas: ['Family Law', 'Estate Planning', '+2 more'],
      image: teamFatima,
    },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">Our Expert Legal Team</h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Meet the experienced professionals dedicated to your success
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card will-change-transform"
                onClick={() => setSelectedMember(member)}
              >
                <div className="h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-legal-navy mb-1">
                      {member.name}
                    </h3>
                    <p className="text-accent font-semibold mb-2 text-sm">
                      {member.title}
                    </p>
                    <p className="text-xs text-neutral-600 mb-3">
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
                          className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium"
                        >
                          {area}
                        </span>
                      ))}
                      {member.areas.length > 2 && (
                        <span className="text-xs text-neutral-500 px-2 py-1">
                          +{member.areas.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-xs text-neutral-600">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      {member.credentials}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-accent/10">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-accent/10">
                      <Phone className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-accent/10">
                      <Linkedin className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Member Modal */}
      <TeamMemberModal 
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* CTA Section */}
      <section className="section-padding bg-legal-navy text-white">
        <div className="container-max text-center">
          <h2 className="heading-md mb-6">Ready to Work with Our Team?</h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-3xl mx-auto">
            Connect with our experienced legal professionals who are committed to providing 
            exceptional service and results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary shadow-button hover:shadow-lg transition-all duration-300">
              {t('scheduleConsultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-secondary hover:scale-105 transition-transform duration-300">
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;