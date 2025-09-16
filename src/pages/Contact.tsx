import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent Successfully",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Office',
      details: [
        'King Fahd Road',
        'Al Olaya District',
        'Riyadh 12213, Saudi Arabia'
      ]
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+966 55 753 6255']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@abf.sa', 'legal@abf.sa']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Sunday - Thursday: 8:00 AM - 6:00 PM',
        'Friday - Saturday: Closed'
      ]
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">Contact Us</h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            Get in touch with our legal experts
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="text-center md:text-left">
                    <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                      <info.icon className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-legal-navy mb-3">
                      {info.title}
                    </h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-neutral-600 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Secure & Confidential
                    </h4>
                    <p className="text-blue-700 text-sm leading-relaxed">
                      All communications are protected by attorney-client privilege and 
                      encrypted for your privacy and security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-neutral-50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-legal-navy mb-2">
                Send us a Message
              </h2>
              <p className="text-neutral-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="contact-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+966 XX XXX XXXX"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="contact-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your legal matter"
                    className="contact-input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your legal inquiry..."
                    rows={5}
                    className="contact-input resize-none"
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-primary">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-xs text-neutral-500 text-center">
                  By submitting this form, you agree to our privacy policy and consent to be 
                  contacted regarding your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;