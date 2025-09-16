import { X, Mail, Phone, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  name: string;
  title: string;
  specialization: string;
  credentials: string;
  description: string;
  areas: string[];
  image: string;
}

interface TeamMemberModalProps {
  member: TeamMember;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberModal = ({ member, isOpen, onClose }: TeamMemberModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-fadeIn" onClick={onClose}>
      <div 
        className="modal-content animate-slideInLeft max-w-4xl" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Header */}
          <div className="relative">
            <div className="h-48 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/80 to-transparent"></div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold mb-1">{member.name}</h2>
              <p className="text-accent text-sm font-semibold">{member.title}</p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-legal-navy mb-1">Specialization</h3>
                <p className="text-neutral-600 text-sm">{member.specialization}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-legal-navy mb-1">About</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{member.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-legal-navy mb-2">Practice Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {member.areas.map((area, index) => (
                    <span 
                      key={index}
                      className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-legal-navy mb-1">Credentials</h3>
                <div className="flex items-center text-neutral-600 text-sm">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  {member.credentials}
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
                    <Mail className="h-3 w-3" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
                    <Phone className="h-3 w-3" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2 text-xs">
                    <Linkedin className="h-3 w-3" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-5">
          {/* Image Side */}
          <div className="col-span-2 relative">
            <div className="h-full min-h-[500px] overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/60 to-transparent"></div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="absolute bottom-6 left-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
              <p className="text-accent text-lg font-semibold">{member.title}</p>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="col-span-3 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-legal-navy mb-2">Specialization</h3>
                <p className="text-neutral-600">{member.specialization}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-legal-navy mb-2">About</h3>
                <p className="text-neutral-600 leading-relaxed">{member.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-legal-navy mb-3">Practice Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {member.areas.map((area, index) => (
                    <span 
                      key={index}
                      className="bg-accent/10 text-accent text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-legal-navy mb-2">Credentials</h3>
                <div className="flex items-center text-neutral-600">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  {member.credentials}
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-semibold text-legal-navy mb-4">Contact Information</h3>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};