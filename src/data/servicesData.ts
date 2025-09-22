export interface ServiceItem {
  id: string;
  titleKey: string;
  pointsKey: string;
  descriptionKey: string;
}

export interface ServicePageData {
  superHeading?: string;
  superDescription?: string;
  services: ServiceItem[];
}

export const servicesData: ServicePageData = {
  services: [
    {
      id: "legal-consultation",
      titleKey: "service_legal-consultation_shortTitle",
      pointsKey: "service_legal-consultation_points",
      descriptionKey: "service_legal-consultation_description"
    },
    {
      id: "litigation-representation",
      titleKey: "service_litigation-representation_shortTitle",
      pointsKey: "service_litigation-representation_points",
      descriptionKey: "service_litigation-representation_description"
    },
    {
      id: "company-formation",
      titleKey: "service_company-formation_shortTitle",
      pointsKey: "service_company-formation_points",
      descriptionKey: "service_company-formation_description"
    },
    {
      id: "bankruptcy-debt-restructuring",
      titleKey: "service_bankruptcy-debt-restructuring_shortTitle",
      pointsKey: "service_bankruptcy-debt-restructuring_points",
      descriptionKey: "service_bankruptcy-debt-restructuring_description"
    },
    {
      id: "estate-liquidation",
      titleKey: "service_estate-liquidation_shortTitle",
      pointsKey: "service_estate-liquidation_points",
      descriptionKey: "service_estate-liquidation_description"
    },
    {
      id: "contract-drafting-notarization",
      titleKey: "service_contract-drafting-notarization_shortTitle",
      pointsKey: "service_contract-drafting-notarization_points",
      descriptionKey: "service_contract-drafting-notarization_description"
    },
    {
      id: "debt-collection",
      titleKey: "service_debt-collection_shortTitle",
      pointsKey: "service_debt-collection_points",
      descriptionKey: "service_debt-collection_description"
    },
    {
      id: "legal-translation",
      titleKey: "service_legal-translation_shortTitle",
      pointsKey: "service_legal-translation_points",
      descriptionKey: "service_legal-translation_description"
    },
    {
      id: "trademark-services",
      titleKey: "service_trademark-services_shortTitle",
      pointsKey: "service_trademark-services_points",
      descriptionKey: "service_trademark-services_description"
    },
    {
      id: "franchising-services",
      titleKey: "service_franchising-services_shortTitle",
      pointsKey: "service_franchising-services_points",
      descriptionKey: "service_franchising-services_description"
    },
    {
      id: "estore-registration",
      titleKey: "service_estore-registration_shortTitle",
      pointsKey: "service_estore-registration_points",
      descriptionKey: "service_estore-registration_description"
    }
  ]
};

export const getServiceById = (id: string): ServiceItem | undefined => {
  return servicesData.services.find(service => service.id === id);
};