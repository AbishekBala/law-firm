interface ServiceData {
  id: string;
  title: string;
  points: string[];
  description: string;
}

interface ServicePageData {
  superHeading?: string;
  superDescription?: string;
  services: ServiceItem[];
}

export const servicesData: { services: ServiceData[] } = {
  services: [
    {
      id: "legal-consultation",
      title: "Expert Legal Consultation",
      points: [
        "Corporate and Commercial Law",
        "Dispute Resolution and Litigation",
        "Intellectual Property Law",
        "Personal Legal Support",
        "Regulatory Compliance",
        "Risk Assessment and Mitigation"
      ],
      description: "Looking for expert legal advice in Saudi Arabia? Our experienced lawyers provide tailored legal consultation services for businesses and individuals, helping you navigate complex legal challenges with ease."
    },
    {
      id: "litigation-representation",
      title: "Litigation & Representation",
      points: [
        "Civil Litigation",
        "Commercial Litigation",
        "Criminal Defense",
        "Administrative and Labor Disputes",
        "Arbitration and Alternative Dispute Resolution",
        "Strategic Legal Advocacy"
      ],
      description: "When legal disputes arise, our seasoned litigators provide strategic legal advocacy in Saudi Arabia, protecting your rights and achieving the best possible outcomes in every case."
    },
    {
      id: "company-formation",
      title: "Company Formation",
      points: [
        "Legal Consultation",
        "Drafting and Reviewing Contracts",
        "Licensing and Commercial Registration",
        "Entity Transformation",
        "Corporate Governance",
        "Legal Representation and Litigation"
      ],
      description: "Professional, end-to-end legal services for establishing your business or investing in Saudi Arabia, ensuring successful formation and growth in the Saudi market."
    },
    {
      id: "bankruptcy-debt-restructuring",
      title: "Bankruptcy & Debt Restructuring",
      points: [
        "Filing Bankruptcy Applications",
        "Debt Restructuring and Settlement",
        "Liquidation and Asset Management",
        "Financial Recovery Planning",
        "Creditor Negotiations",
        "Court Representation"
      ],
      description: "Specialized services for bankruptcy applications and debt restructuring, providing businesses and individuals with the support needed to comply with Saudi Bankruptcy Law."
    },
    {
      id: "estate-liquidation",
      title: "Estate Liquidation",
      points: [
        "Asset Evaluation and Inventory",
        "Debt Settlement and Claims Management",
        "Legal Representation in Estate Disputes",
        "Asset Distribution and Transfer",
        "Compliance with Saudi Inheritance Laws",
        "Estate Planning Guidance"
      ],
      description: "Comprehensive estate liquidation services to help individuals and families handle the process with ease, ensuring compliance with Saudi inheritance laws."
    },
    {
      id: "contract-drafting-notarization",
      title: "Contract Drafting & Notarization",
      points: [
        "Corporate and Commercial Contracts",
        "Employment Contracts",
        "Real Estate Contracts",
        "Customized Agreements",
        "Notarization Services",
        "Legalization and Attestation Services"
      ],
      description: "Professional contract drafting, notarization, and document legalization services ensuring your documents are accurate, enforceable, and compliant with Saudi and international regulations."
    },
    {
      id: "debt-collection",
      title: "Debt Collection",
      points: [
        "Commercial Debt Collection",
        "Personal Debt Recovery",
        "Pre-Litigation Debt Recovery",
        "Legal Action for Debt Recovery",
        "Settlement Negotiations",
        "Court Representation"
      ],
      description: "Specialized debt collection services for businesses and individuals across Saudi Arabia, ensuring compliance with Saudi laws while protecting your business relationships."
    },
    {
      id: "legal-translation",
      title: "Legal Translation",
      points: [
        "Certified Translation of Legal Documents",
        "Multilingual Legal Translation Services",
        "Specialized Legal Translation for Businesses",
        "Translation for Personal Legal Matters",
        "Quality Assurance Process",
        "Fast Turnaround Times"
      ],
      description: "Certified legal translation services ensuring your documents are accurate, legally valid, and ready for official use in Saudi Arabia and internationally."
    },
    {
      id: "trademark-services",
      title: "Trademark Services",
      points: [
        "Trademark Registration in Saudi Arabia",
        "Trademark Protection and Renewals",
        "Trademark Enforcement",
        "Trademark Dispute Resolution",
        "International Trademark Services",
        "Comprehensive Brand Strategy"
      ],
      description: "Comprehensive trademark services to safeguard your intellectual property in Saudi Arabia, from registration to enforcement and dispute resolution."
    },
    {
      id: "franchising-services",
      title: "Franchising Services",
      points: [
        "Drafting and Reviewing Franchise Agreements",
        "Compliance with Saudi Franchise Law",
        "Franchise Registration with Relevant Authorities",
        "Dispute Resolution and Enforcement",
        "International Franchising Services",
        "End-to-End Legal Support"
      ],
      description: "Comprehensive franchising services in Saudi Arabia, providing legal guidance and support for both franchisors and franchisees."
    },
    {
      id: "estore-registration",
      title: "E-Store Registration",
      points: [
        "E-Store Registration",
        "Compliance with Saudi E-Commerce Laws",
        "Intellectual Property Protection for E-Stores",
        "Cybersecurity and Data Protection Compliance",
        "Dispute Resolution and Legal Support",
        "Cross-Border E-Commerce"
      ],
      description: "Comprehensive e-store registration and legal compliance services to help businesses establish and operate successful online stores in Saudi Arabia."
    }
  ]
};

import { ServiceItem } from '@/types/service';

export const getServiceById = (id: string): ServiceItem | undefined => {
  const service = servicesData.services.find(service => service.id === id);
  if (!service) return undefined;

  return {
    id: service.id,
    en: {
      title: service.title,
      description: service.description,
      points: service.points
    },
    ar: {
      title: service.title, // You should add proper Arabic translations
      description: service.description, // You should add proper Arabic translations
      points: service.points // You should add proper Arabic translations
    },
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
};