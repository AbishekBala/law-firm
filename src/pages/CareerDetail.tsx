import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { careersData, getCareerById } from '../data/careersData';
import CareerAPI from '../api/careerAPI';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  CheckCircle, 
  ChevronLeft, 
  Send, 
  AlertCircle, 
  Mail, 
  Phone, 
  ArrowRight 
} from 'lucide-react';

const CareerDetail = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const navigate = useNavigate();
  const career = getCareerById(careerId || '');
  
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  // Validation functions
  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'Phone number is required';
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return '';
  };

  const validateFullName = (name: string): string => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateExperience = (experience: string): string => {
    if (!experience.trim()) return 'Experience is required';
    const expRegex = /^\d+(\.\d+)?\s*(year|years|yr|yrs|months|month|mo|mos)?$/i;
    if (!expRegex.test(experience.trim())) {
      return 'Please enter experience in format like "3 years" or "6 months"';
    }
    return '';
  };

  const validateResume = (file: File | null): string => {
    if (!file) return 'Resume is required';
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      return 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    return '';
  };

  const validateCoverLetter = (coverLetter: string): string => {
    if (coverLetter && coverLetter.length > 1000) {
      return 'Cover letter must be less than 1000 characters';
    }
    return '';
  };

  const validateField = (name: string, value: string | File | null): string => {
    switch (name) {
      case 'fullName':
        return validateFullName(value as string);
      case 'email':
        return validateEmail(value as string);
      case 'phone':
        return validatePhone(value as string);
      case 'experience':
        return validateExperience(value as string);
      case 'resume':
        return validateResume(value as File | null);
      case 'coverLetter':
        return validateCoverLetter(value as string);
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    errors.fullName = validateField('fullName', applicationData.fullName);
    errors.email = validateField('email', applicationData.email);
    errors.phone = validateField('phone', applicationData.phone);
    errors.experience = validateField('experience', applicationData.experience);
    errors.resume = validateField('resume', applicationData.resume);
    errors.coverLetter = validateField('coverLetter', applicationData.coverLetter);
    
    // Filter out empty error messages
    const filteredErrors = Object.fromEntries(
      Object.entries(errors).filter(([_, value]) => value !== '')
    );
    
    setValidationErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-legal-navy mb-4">Career Position Not Found</h1>
          <Link to="/careers" className="text-accent hover:underline">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Real-time validation for better UX
    if (touched[name]) {
      const error = validateField(name, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setApplicationData(prev => ({
      ...prev,
      resume: file
    }));
    
    setTouched(prev => ({
      ...prev,
      resume: true
    }));
    
    // Clear validation error when user selects a file
    if (validationErrors.resume) {
      setValidationErrors(prev => ({
        ...prev,
        resume: ''
      }));
    }
    
    // Validate the selected file
    const error = validateField('resume', file);
    setValidationErrors(prev => ({
      ...prev,
      resume: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      experience: true,
      resume: true,
      coverLetter: true
    });
    
    // Validate the entire form
    if (!validateForm()) {
      setError('Please fix the validation errors below before submitting.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const result = await CareerAPI.submitApplication({
        ...applicationData,
        careerId: career.id,
        submittedAt: new Date()
      });
      
      if (result.success) {
        alert('Application submitted successfully! We will contact you soon.');
        setApplicationData({
          fullName: '',
          email: '',
          phone: '',
          experience: '',
          coverLetter: '',
          resume: null
        });
        setValidationErrors({});
        setTouched({});
      } else {
        setError(result.error || 'Failed to submit application');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-br from-legal-navy via-legal-navy/90 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Link 
            to="/careers" 
            className="inline-flex items-center text-neutral-200 hover:text-accent mb-8 transition-all duration-300 transform hover:translate-x-1 animate-fade-in"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Careers
          </Link>
          <div className="animate-slide-up animate-delay-200">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {career.title}
            </h1>
            <p className="text-xl text-neutral-200 mb-8 max-w-3xl">
              Join our legal team in {career.location} • {career.type} • {career.experience} required
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20">
                📍 {career.location}
              </div>
              <div className="bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-accent/30">
                💼 {career.type}
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm border border-white/20">
                🎯 {career.experience}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Requirements */}
              <div className="animate-fade-in animate-delay-300">
                <h2 className="text-2xl font-bold text-legal-navy mb-6">Requirements & Qualifications</h2>
                <div className="space-y-3">
                  {career.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start animate-slide-right animate-delay-[400ms] hover:bg-neutral-50 p-3 rounded-lg transition-all duration-300">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-neutral-700 leading-relaxed">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="animate-fade-in animate-delay-500">
                <h2 className="text-2xl font-bold text-legal-navy mb-6">Key Responsibilities</h2>
                <div className="space-y-3">
                  {career.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start animate-slide-right animate-delay-[600ms] hover:bg-neutral-50 p-3 rounded-lg transition-all duration-300">
                      <div className="w-2 h-2 bg-accent rounded-full mr-4 flex-shrink-0 mt-2"></div>
                      <p className="text-neutral-700 leading-relaxed">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Description */}
              <div className="animate-fade-in animate-delay-700">
                <h2 className="text-2xl font-bold text-legal-navy mb-6">About This Role</h2>
                <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-6 rounded-xl border-l-4 border-accent">{career.description}</p>
              </div>
            </div>

            {/* Right Sidebar - Application Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 animate-fade-in animate-delay-400">
                <div id="application-form" className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl border border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-legal-navy mb-6">Apply for this Position</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={applicationData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`mt-1 ${validationErrors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {validationErrors.fullName && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`mt-1 ${validationErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`mt-1 ${validationErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                        placeholder="+966 XX XXX XXXX"
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validationErrors.phone}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g. 5 years, 2 years, 6 months"
                        required
                        className={`mt-1 ${validationErrors.experience ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {validationErrors.experience && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validationErrors.experience}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="resume">Resume/CV *</Label>
                      <Input
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className={`mt-1 ${validationErrors.resume ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {!validationErrors.resume && (
                        <p className="text-xs text-neutral-500 mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                      )}
                      {validationErrors.resume && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {validationErrors.resume}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={applicationData.coverLetter}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Tell us why you're interested in this position..."
                        rows={4}
                        className={`mt-1 ${validationErrors.coverLetter ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <div>
                          {validationErrors.coverLetter && (
                            <p className="text-red-500 text-sm flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {validationErrors.coverLetter}
                            </p>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {applicationData.coverLetter.length}/1000 characters
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-legal-navy font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-legal-navy mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-neutral-500 text-center">
                      By submitting this application, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </div>
                
                {/* Contact Info */}
                <div className="mt-6 p-6 bg-white border rounded-xl">
                  <h4 className="font-semibold text-legal-navy mb-4">Questions about this role?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-accent mr-2" />
                      <span>careers@alibinfahad.com</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-accent mr-2" />
                      <span>+966 11 XXX XXXX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-legal-navy to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <div className="animate-fade-in animate-delay-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore More Opportunities
            </h2>
            <p className="text-lg text-neutral-200 mb-8">
              Don't see the perfect fit? Check out our other open positions or submit your CV for future opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/careers')}
                className="bg-accent hover:bg-accent/90 text-legal-navy font-semibold transform hover:scale-105 transition-all duration-300 hover:shadow-lg group"
              >
                View All Positions
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                className="border-accent text-accent hover:bg-accent hover:text-legal-navy transform hover:scale-105 transition-all duration-300"
              >
                Contact HR Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerDetail;