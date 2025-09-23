// Types for career application feature

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

// This is a placeholder for the actual API implementation that will be provided by your backend team
// The actual implementation should make HTTP requests to your FastAPI backend
export class CareerAPI {
  // Submit job application
  static async submitApplication(applicationData: ApplicationData): Promise<ApplicationResponse> {
    // This will be implemented by your backend team
    // It should make an HTTP request to your FastAPI backend
    throw new Error('Backend integration required: submitApplication');
  }

  // Get job listings
  static async getJobListings() {
    // This will be implemented by your backend team
    // It should make an HTTP request to your FastAPI backend
    throw new Error('Backend integration required: getJobListings');
  }
}

export default CareerAPI;