export interface ServiceContent {
  title: string;
  description: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  en: ServiceContent;
  ar: ServiceContent;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ServicePageData {
  superHeading: {
    en: string;
    ar: string;
  };
  superDescription: {
    en: string;
    ar: string;
  };
  services: ServiceItem[];
}

// Initial empty state
export const initialServiceContent: ServiceContent = {
  title: '',
  description: '',
  points: ['']
};

export const initialServiceItem: Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'> = {
  en: { ...initialServiceContent },
  ar: { ...initialServiceContent },
  tags: []
};
