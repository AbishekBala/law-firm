import { v4 as uuidv4 } from 'uuid';
import { ServiceItem, ServicePageData, initialServiceItem } from '@/types/service';
import { servicesData as defaultServices } from '@/data/servicesData';

const STORAGE_KEY = 'law_firm_services';

// Helper function to get services from localStorage
const getStoredServices = (): ServicePageData => {
  if (typeof window === 'undefined') {
    return { superHeading: { en: '', ar: '' }, superDescription: { en: '', ar: '' }, services: [] };
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Convert string dates back to Date objects
      return {
        ...parsed,
        services: parsed.services.map((service: any) => ({
          ...service,
          createdAt: new Date(service.createdAt),
          updatedAt: new Date(service.updatedAt)
        }))
      };
    } catch (e) {
      console.error('Failed to parse stored services', e);
    }
  }
  
  // Return default structure if nothing is stored
  return { 
    superHeading: { en: 'Our Services', ar: 'خدماتنا' },
    superDescription: { 
      en: 'Comprehensive legal services tailored to your needs',
      ar: 'خدمات قانونية شاملة مصممة خصيصًا لاحتياجاتك'
    },
    services: [] 
  };
};

// Save services to localStorage
const saveServices = (data: ServicePageData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};

export const serviceService = {
  // Get all services
  getAll: (): ServicePageData => {
    const data = getStoredServices();
    console.log('Getting all services:', data);
    
    // If no services found, try to initialize them
    if (!data.services || data.services.length === 0) {
      console.log('No services found, initializing default services...');
      initializeDefaultServices(true);
      return getStoredServices();
    }
    
    return data;
  },

  // Get a single service by ID
  getById: (id: string): ServiceItem | undefined => {
    const { services } = getStoredServices();
    return services.find(service => service.id === id);
  },

  // Create a new service
  create: (service: Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>): ServiceItem => {
    const data = getStoredServices();
    const newService: ServiceItem = {
      ...service,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    data.services.push(newService);
    saveServices(data);
    return newService;
  },

  // Update an existing service
  update: (id: string, updates: Partial<Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>>): ServiceItem | null => {
    const data = getStoredServices();
    const index = data.services.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    const updatedService = {
      ...data.services[index],
      ...updates,
      updatedAt: new Date()
    };
    
    data.services[index] = updatedService;
    saveServices(data);
    return updatedService;
  },

  // Delete a service
  delete: (id: string): boolean => {
    const data = getStoredServices();
    const initialLength = data.services.length;
    data.services = data.services.filter(service => service.id !== id);
    
    if (data.services.length < initialLength) {
      saveServices(data);
      return true;
    }
    return false;
  },

  // Update page metadata
  updatePageData: (updates: Partial<Pick<ServicePageData, 'superHeading' | 'superDescription'>>): ServicePageData => {
    const data = getStoredServices();
    const updatedData = {
      ...data,
      superHeading: { ...data.superHeading, ...updates.superHeading },
      superDescription: { ...data.superDescription, ...updates.superDescription }
    };
    
    saveServices(updatedData);
    return updatedData;
  }
};

// Initialize with default services if none exist
export const initializeDefaultServices = (force = false) => {
  if (typeof window === 'undefined') return;
  
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  // If we already have data and we're not forcing a reinitialization, return early
  if (storedData && !force) {
    try {
      const parsed = JSON.parse(storedData);
      if (parsed.services && parsed.services.length > 0) {
        console.log('Services already initialized with', parsed.services.length, 'services');
        return;
      }
    } catch (e) {
      console.error('Error parsing stored services, will reinitialize', e);
    }
  }
  
  console.log('Initializing default services...');
  
  // Get the default services from the imported data
  const servicesToInitialize = defaultServices.services || [];
  
  const defaultServiceData: ServicePageData = {
    superHeading: { 
      en: 'Our Services', 
      ar: 'خدماتنا' 
    },
    superDescription: { 
      en: 'Comprehensive legal services tailored to your needs',
      ar: 'خدمات قانونية شاملة مصممة خصيصًا لاحتياجاتك'
    },
    services: servicesToInitialize.map(service => {
      // Create a basic service item with English content
      const serviceItem: ServiceItem = {
        id: service.id || uuidv4(),
        en: {
          title: service.title || 'Untitled Service',
          description: service.description || 'No description available',
          points: Array.isArray(service.points) ? service.points : []
        },
        // For Arabic, we'll use the same content as English for now
        // You should add proper Arabic translations later
        ar: {
          title: service.title || 'خدمة بدون عنوان',
          description: service.description || 'لا يوجد وصف متاح',
          points: Array.isArray(service.points) ? service.points.map(p => p) : []
        },
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      console.log('Created service item:', serviceItem);
      return serviceItem;
    })
  };
  
  console.log('Saving default services to localStorage:', defaultServiceData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServiceData));
};

// Initialize on import
initializeDefaultServices();
