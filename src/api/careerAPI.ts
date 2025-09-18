// Career Application API - Simulated backend service
// In a real application, this would connect to your backend API

export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
  careerId: string;
  submittedAt: Date;
}

export interface ApplicationResponse {
  success: boolean;
  message: string;
  applicationId?: string;
  error?: string;
}

// Simulated API endpoints
class CareerAPI {
  // Submit job application
  static async submitApplication(applicationData: ApplicationData): Promise<ApplicationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      // Validate required fields
      if (!applicationData.fullName || !applicationData.email || !applicationData.phone || !applicationData.resume) {
        return {
          success: false,
          message: 'Missing required fields',
          error: 'Please fill in all required fields'
        };
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(applicationData.email)) {
        return {
          success: false,
          message: 'Invalid email format',
          error: 'Please enter a valid email address'
        };
      }

      // Validate file size (max 5MB)
      if (applicationData.resume && applicationData.resume.size > 5 * 1024 * 1024) {
        return {
          success: false,
          message: 'File too large',
          error: 'Resume file must be less than 5MB'
        };
      }

      // Simulate successful submission
      const applicationId = 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      // In a real application, you would:
      // 1. Upload the resume file to cloud storage
      // 2. Save application data to database
      // 3. Send notification emails to HR team
      // 4. Send confirmation email to applicant
      
      console.log('Application submitted:', {
        ...applicationData,
        resume: applicationData.resume?.name,
        applicationId
      });

      return {
        success: true,
        message: 'Application submitted successfully',
        applicationId
      };

    } catch (error) {
      console.error('Application submission error:', error);
      return {
        success: false,
        message: 'Submission failed',
        error: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  // Get application status (for future feature)
  static async getApplicationStatus(applicationId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate different application statuses
    const statuses = ['received', 'under_review', 'interview_scheduled', 'rejected', 'accepted'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      applicationId,
      status: randomStatus,
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      notes: 'Your application is being reviewed by our HR team.'
    };
  }

  // Subscribe to job alerts (for future feature)
  static async subscribeToJobAlerts(email: string, preferences: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Successfully subscribed to job alerts',
      email
    };
  }

  // Send general career inquiry
  static async sendCareerInquiry(inquiryData: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      console.log('Career inquiry submitted:', inquiryData);
      
      return {
        success: true,
        message: 'Your inquiry has been sent to our HR team',
        reference: 'INQ-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send inquiry',
        error: 'Please try again later'
      };
    }
  }
}

// Email notification service (simulated)
export class EmailService {
  static async sendApplicationConfirmation(applicationData: ApplicationData, applicationId: string) {
    // In a real application, this would send an email via your email service
    console.log('Sending confirmation email to:', applicationData.email);
    
    const emailContent = {
      to: applicationData.email,
      subject: 'Application Received - Ali Bin Fahad Law Firm',
      body: `
        Dear ${applicationData.fullName},
        
        Thank you for your interest in joining Ali Bin Fahad Law Firm. We have received your application for the position you applied for.
        
        Application ID: ${applicationId}
        Submitted: ${new Date().toLocaleDateString()}
        
        Our HR team will review your application and contact you within 5-7 business days.
        
        Best regards,
        HR Department
        Ali Bin Fahad Law Firm
      `
    };
    
    // Simulate email sending
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  static async notifyHRTeam(applicationData: ApplicationData, applicationId: string) {
    // Notify HR team about new application
    console.log('Notifying HR team about new application:', applicationId);
    
    const hrNotification = {
      to: 'hr@alibinfahad.com',
      subject: `New Job Application - ${applicationData.careerId}`,
      body: `
        New application received:
        
        Position: ${applicationData.careerId}
        Applicant: ${applicationData.fullName}
        Email: ${applicationData.email}
        Phone: ${applicationData.phone}
        Experience: ${applicationData.experience}
        Application ID: ${applicationId}
        
        Please review the application in the HR portal.
      `
    };
    
    return new Promise(resolve => setTimeout(resolve, 500));
  }
}

export default CareerAPI;