export interface ServiceData {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  features: string[];
  benefits: string[];
  process: {
    title: string;
    steps: string[];
  };
  icon: string;
  heroImage?: string;
}

export const servicesData: ServiceData[] = [
  {
    id: "legal-consultation",
    title: "Legal Consultation Services in Saudi Arabia",
    shortTitle: "Expert Legal Consultation",
    description: "Looking for expert legal advice in Saudi Arabia? At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in providing tailored legal consultation services for businesses and individuals. Whether you need guidance on corporate law, dispute resolution, or personal legal matters, our experienced lawyers are here to help you navigate complex legal challenges with ease.",
    features: [
      "Corporate and Commercial Law",
      "Dispute Resolution and Litigation", 
      "Intellectual Property Law",
      "Personal Legal Support",
      "Regulatory Compliance",
      "Risk Assessment and Mitigation"
    ],
    benefits: [
      "Expertise Across Multiple Areas: Our team of highly qualified lawyers delivers solutions tailored to corporate, commercial, and individual needs",
      "Comprehensive Knowledge: We have a deep understanding of Saudi legal frameworks and international laws, ensuring compliance and risk mitigation",
      "Customized Guidance: Every consultation is personalized to your unique situation, helping you achieve optimal results",
      "Efficient and Reliable: We provide clear, actionable advice to save you time, minimize risks, and maximize outcomes"
    ],
    process: {
      title: "How It Works",
      steps: [
        "Initial Consultation: Share your concerns, and we'll assess your legal needs",
        "Customized Strategy: Receive precise legal advice tailored to your objectives", 
        "Ongoing Support: We offer follow-up services to implement solutions and address additional concerns"
      ]
    },
    icon: "Scale"
  },
  {
    id: "litigation-representation",
    title: "Litigation and Legal Representation Services in Saudi Arabia",
    shortTitle: "Litigation & Representation",
    description: "When legal disputes arise, having experienced and skilled legal representation is crucial. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in litigation and pleading services, providing businesses and individuals with strategic legal advocacy in Saudi Arabia. Our team of seasoned litigators is committed to protecting your rights and achieving the best possible outcomes in every case.",
    features: [
      "Civil Litigation",
      "Commercial Litigation",
      "Criminal Defense",
      "Administrative and Labor Disputes",
      "Arbitration and Alternative Dispute Resolution (ADR)",
      "Strategic Legal Advocacy"
    ],
    benefits: [
      "Extensive Courtroom Experience: Our team has a proven track record of successfully handling complex cases in Saudi courts",
      "Strategic Advocacy: We build compelling arguments and pleadings to present your case effectively",
      "Client-Focused Approach: We prioritize your goals and maintain transparent communication throughout the legal process",
      "Local and International Expertise: We have deep knowledge of Saudi legal frameworks and international standards, ensuring comprehensive representation"
    ],
    process: {
      title: "Our Process",
      steps: [
        "Case Assessment: We begin with a detailed analysis of your case, reviewing all relevant facts, documents, and legal positions",
        "Strategy Development: Based on our assessment, we craft a customized legal strategy aimed at achieving the most favorable outcome",
        "Representation: Our lawyers represent you in court or before arbitration panels, presenting strong pleadings and arguments to protect your interests",
        "Resolution and Follow-Up: We ensure timely resolution of your case and provide any necessary follow-up services, such as enforcing judgments or settling disputes amicably"
      ]
    },
    icon: "Scale"
  },
  {
    id: "company-formation",
    title: "Company Formation and Foreign Investment in Saudi Arabia | Comprehensive Legal Services",
    shortTitle: "Company Formation",
    description: "Looking to establish your business or invest in Saudi Arabia? Ali Bin Fahad Law Firm and Legal Consultancy offers professional, end-to-end legal services to ensure the successful formation and growth of your company in the Saudi market.",
    features: [
      "Legal Consultation",
      "Drafting and Reviewing Contracts",
      "Licensing and Commercial Registration",
      "Entity Transformation",
      "Corporate Governance",
      "Legal Representation and Litigation",
      "Foreign Investor Protection"
    ],
    benefits: [
      "Expertise and Experience: Our team of seasoned lawyers and legal consultants specializes in company formation and foreign investment, delivering tailored solutions that meet your specific needs",
      "Efficiency and Precision: We handle all legal procedures with utmost accuracy, saving you time and effort while ensuring compliance with Saudi regulations",
      "Comprehensive Legal Support: From planning your business setup to managing its daily operations, we provide end-to-end legal services",
      "Up-to-Date Knowledge: We stay informed about the latest legal updates and regulations to provide you with the most relevant advice and services",
      "Transparent Communication: We maintain clear and consistent communication throughout the process, ensuring you're informed every step of the way"
    ],
    process: {
      title: "How We Help You Establish Your Business in Saudi Arabia",
      steps: [
        "Free Initial Consultation: We offer an introductory session to understand your needs and propose the best legal strategy",
        "Document Preparation: We handle the preparation and collection of all necessary documents for company registration",
        "License Applications: We submit license and commercial registration applications to the appropriate authorities and follow up until approval",
        "Business Launch: We ensure you have all required approvals and licenses to start operating smoothly in the Saudi market"
      ]
    },
    icon: "Building"
  },
  {
    id: "bankruptcy-debt-restructuring",
    title: "Bankruptcy Applications and Debt Restructuring Services in Saudi Arabia",
    shortTitle: "Bankruptcy & Debt Restructuring",
    description: "Facing financial difficulties can be overwhelming, but with the right legal guidance, you can navigate bankruptcy and debt challenges effectively. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in bankruptcy applications and debt restructuring services, providing businesses and individuals with the support they need to comply with Saudi Bankruptcy Law and protect their interests.",
    features: [
      "Filing Bankruptcy Applications",
      "Debt Restructuring and Settlement",
      "Liquidation and Asset Management",
      "Financial Recovery Planning",
      "Creditor Negotiations",
      "Court Representation"
    ],
    benefits: [
      "In-Depth Knowledge: Extensive expertise in Saudi Bankruptcy Law and financial restructuring",
      "Tailored Solutions: Personalized strategies designed to meet your unique financial and legal needs",
      "Comprehensive Support: From filing to court representation, we guide you through every step of the bankruptcy process",
      "Proven Track Record: Successful resolution of complex bankruptcy and restructuring cases for clients across various industries"
    ],
    process: {
      title: "How We Help You",
      steps: [
        "Initial Consultation: Assess your financial situation and identify the best course of action",
        "Filing and Documentation: Prepare and file all necessary documents with Saudi bankruptcy courts",
        "Creditor Negotiations: Negotiate with creditors to achieve favorable terms for restructuring or settlement",
        "Representation in Proceedings: Advocate for your interests in court or arbitration panels",
        "Post-Bankruptcy Guidance: Provide ongoing legal support to help you rebuild and achieve financial stability"
      ]
    },
    icon: "DollarSign"
  },
  {
    id: "estate-liquidation",
    title: "Estate Liquidation Services in Saudi Arabia",
    shortTitle: "Estate Liquidation",
    description: "Managing and distributing an estate can be complex and emotionally challenging. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we provide comprehensive estate liquidation services to help individuals and families handle the process with ease, ensuring compliance with Saudi inheritance laws and safeguarding your rights. Our experienced legal team guides you through every step of the estate liquidation process, ensuring transparency, efficiency, and fairness.",
    features: [
      "Asset Evaluation and Inventory",
      "Debt Settlement and Claims Management",
      "Legal Representation in Estate Disputes",
      "Asset Distribution and Transfer",
      "Compliance with Saudi Inheritance Laws",
      "Estate Planning Guidance"
    ],
    benefits: [
      "Extensive Knowledge: Deep expertise in Saudi inheritance laws and estate management",
      "Compassionate Approach: We handle every case with sensitivity and professionalism, understanding the personal nature of estate liquidation",
      "Efficient Processes: Streamlined procedures to minimize delays and ensure a smooth settlement process",
      "Proven Track Record: Successfully managed estate liquidations for clients across various regions in Saudi Arabia"
    ],
    process: {
      title: "How Our Estate Liquidation Services Work",
      steps: [
        "Initial Consultation: We assess the estate, review legal documents, and provide strategic guidance tailored to your needs",
        "Asset Inventory and Valuation: Our team identifies and evaluates all assets, ensuring an accurate and comprehensive inventory",
        "Debt and Claim Resolution: We handle all outstanding debts, creditor claims, and legal obligations tied to the estate",
        "Distribution and Final Settlement: We facilitate the fair and legal distribution of assets, ensuring compliance with all Saudi legal requirements"
      ]
    },
    icon: "FileText"
  },
  {
    id: "contract-drafting-notarization",
    title: "Drafting Contracts, Notarization, and Legalization Services in Saudi Arabia",
    shortTitle: "Contract Drafting & Notarization",
    description: "Looking for professional contract drafting, notarization, or document legalization services in Saudi Arabia? At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we provide comprehensive legal solutions to ensure your documents are accurate, enforceable, and compliant with Saudi and international regulations. Whether you're a business or an individual, our skilled team guarantees precision, efficiency, and legal excellence.",
    features: [
      "Corporate and Commercial Contracts: Shareholder agreements, vendor contracts, joint ventures, mergers, and acquisitions",
      "Employment Contracts: Compliant with Saudi labor laws, including confidentiality, non-compete, and severance agreements",
      "Real Estate Contracts: Purchase agreements, lease agreements, construction contracts, and property management agreements",
      "Customized Agreements: Tailored to unique business or personal requirements",
      "Notarization Services: Certification of powers of attorney, affidavits, and legal agreements",
      "Legalization and Attestation Services: Document legalization and international compliance"
    ],
    benefits: [
      "Expertise Across All Legal Areas: We specialize in drafting, notarizing, and legalizing documents for businesses and individuals",
      "Compliance with Saudi and International Standards: Your documents are prepared and certified with full legal validity",
      "Fast and Reliable Service: Our streamlined process ensures timely delivery, saving you effort and stress",
      "Proven Track Record: Trusted by corporations and individuals for handling sensitive and critical legal documents"
    ],
    process: {
      title: "How Our Process Works",
      steps: [
        "Initial Consultation: Share your needs with our team to determine the most suitable service, whether drafting a contract, notarizing a document, or legalizing it",
        "Drafting or Reviewing Documents: We create or review contracts and documents to ensure they are legally sound and enforceable",
        "Notarization and Validation: Our certified notary public ensures your documents are authenticated and ready for official use in Saudi Arabia",
        "Legalization and Attestation: We liaise with government authorities and embassies to complete the legalization or attestation process for international recognition"
      ]
    },
    icon: "Edit"
  },
  {
    id: "debt-collection",
    title: "Debt Collection Services in Saudi Arabia",
    shortTitle: "Debt Collection",
    description: "Recovering outstanding debts can be challenging, but with the right legal expertise, it's possible to resolve these matters efficiently and professionally. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in debt collection services for businesses and individuals across Saudi Arabia. Our legal team works diligently to recover your debts while ensuring compliance with Saudi laws and protecting your business relationships.",
    features: [
      "Commercial Debt Collection: Recovering overdue payments from corporate clients or business partners",
      "Personal Debt Recovery: Assisting individuals in recovering personal loans or unpaid dues",
      "Pre-Litigation Debt Recovery: Sending legal notices and demand letters to debtors",
      "Legal Action for Debt Recovery: Filing lawsuits against non-compliant debtors in Saudi courts",
      "Settlement Negotiations: Negotiating repayment plans to maintain professional relationships",
      "Court Representation: Representing clients in court proceedings to secure favorable judgments"
    ],
    benefits: [
      "Expert Knowledge: In-depth understanding of Saudi debt collection laws and regulations",
      "Professional Approach: We prioritize maintaining positive relationships between you and your debtors",
      "Comprehensive Solutions: From negotiations to legal action, we handle every aspect of debt recovery",
      "Timely Results: Our streamlined processes ensure that you recover your debts as quickly as possible",
      "Ethical and Legal Compliance: All our actions adhere to Saudi laws, protecting you from potential legal risks"
    ],
    process: {
      title: "How Our Debt Collection Services Work",
      steps: [
        "Initial Assessment: We evaluate your case, reviewing contracts, invoices, and correspondence to determine the best debt recovery strategy",
        "Communication with Debtors: Our team initiates contact with the debtor through formal notices and negotiations to seek amicable resolutions",
        "Pre-Litigation Solutions: If necessary, we escalate the matter by issuing legal notices and preparing for potential legal action",
        "Litigation and Enforcement: If the debt remains unpaid, we represent you in court to secure a favorable judgment and enforce it to recover the amount owed"
      ]
    },
    icon: "CreditCard"
  },
  {
    id: "legal-translation",
    title: "Legal Translation Services in Saudi Arabia",
    shortTitle: "Legal Translation",
    description: "In the legal field, accuracy and precision are critical, especially when translating important documents. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we provide certified legal translation services to ensure your documents are accurate, legally valid, and ready for official use in Saudi Arabia and internationally. Our team of professional legal translators specializes in translating a wide range of legal documents with the utmost precision, maintaining the original meaning and intent while ensuring compliance with Saudi legal standards.",
    features: [
      "Certified Translation of Legal Documents: Contracts, court rulings, powers of attorney, and regulatory filings",
      "Multilingual Legal Translation Services: Accurate translations in Arabic, English, and other languages",
      "Specialized Legal Translation for Businesses: Business contracts, vendor agreements, and corporate documents",
      "Translation for Personal Legal Matters: Wills, marriage certificates, and inheritance papers",
      "Quality Assurance Process: Thorough review to ensure precision and compliance",
      "Fast Turnaround Times: High-quality translations delivered promptly"
    ],
    benefits: [
      "Certified Translators: Our team includes certified legal translators with expertise in Saudi and international legal terminology",
      "Accuracy and Reliability: We ensure every translation is legally valid and faithful to the original document",
      "Fast Turnaround Times: We deliver high-quality translations promptly without compromising on quality",
      "Confidentiality: Your sensitive legal documents are handled with the highest level of security and discretion",
      "Comprehensive Solutions: From translation to notarization, we offer end-to-end support for your legal documentation needs"
    ],
    process: {
      title: "How Our Legal Translation Services Work",
      steps: [
        "Initial Consultation: Share your documents and requirements with our team for a detailed assessment",
        "Translation Process: Our certified translators accurately translate your documents while maintaining the original meaning and intent",
        "Quality Assurance: Every translation undergoes a thorough review process to ensure precision and compliance with legal standards",
        "Delivery of Certified Translations: Receive your translated documents, ready for submission to courts, government authorities, or international organizations"
      ]
    },
    icon: "Globe"
  },
  {
    id: "trademark-services",
    title: "Trademark Services in Saudi Arabia: Registration, Protection, and Enforcement",
    shortTitle: "Trademark Services",
    description: "Protecting your brand is essential in today's competitive market. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in comprehensive trademark services to safeguard your intellectual property in Saudi Arabia. From trademark registration to enforcement and dispute resolution, we ensure your brand's identity and reputation are legally protected under Saudi and international laws.",
    features: [
      "Trademark Registration in Saudi Arabia: Conducting searches, filing applications with SAIP, handling office actions",
      "Trademark Protection and Renewals: Maintaining legal rights, monitoring infringements, strengthening portfolios",
      "Trademark Enforcement: Filing infringement complaints, representing clients in disputes, pursuing legal remedies",
      "Trademark Dispute Resolution: Mediation, arbitration, opposition and cancellation actions",
      "International Trademark Services: Madrid Protocol filings, worldwide protection management",
      "Comprehensive Brand Strategy: End-to-end services from registration to enforcement"
    ],
    benefits: [
      "Expertise in Saudi Trademark Laws: In-depth knowledge of Saudi IP regulations and international standards",
      "Tailored Solutions: Customized trademark strategies that align with your business goals",
      "Comprehensive Support: End-to-end services from registration to enforcement and renewals",
      "Proven Track Record: Successful protection of trademarks for businesses across various industries",
      "Efficient Processes: Streamlined workflows to save you time and ensure timely action"
    ],
    process: {
      title: "How Our Trademark Services Work",
      steps: [
        "Trademark Search and Assessment: We conduct a detailed trademark search to identify any conflicts and provide a strategic assessment of your brand's eligibility for registration",
        "Trademark Application Filing: Our legal team prepares and files your trademark application with SAIP, ensuring accuracy and compliance with Saudi regulations",
        "Monitoring and Protection: Once registered, we help monitor your trademark to detect any potential infringement and provide proactive protection strategies",
        "Enforcement and Resolution: In cases of trademark violations, we take swift legal action to enforce your rights and resolve disputes effectively"
      ]
    },
    icon: "Shield"
  },
  {
    id: "franchising-services",
    title: "Franchising Services in Saudi Arabia: Legal Guidance and Support",
    shortTitle: "Franchising Services",
    description: "Franchising is a powerful business model for expanding brands and seizing new market opportunities. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we specialize in providing comprehensive franchising services in Saudi Arabia. Whether you're an established brand looking to expand or an entrepreneur seeking to acquire a franchise, our experienced legal team ensures your franchising agreements are legally sound, compliant, and structured for success.",
    features: [
      "Drafting and Reviewing Franchise Agreements: Licensing terms, IP protections, financial terms including fees and royalties",
      "Compliance with Saudi Franchise Law: Registration requirements, disclosure obligations, termination and renewal clauses",
      "Franchise Registration with Relevant Authorities: Ministry of Commerce registration and procedural compliance",
      "Dispute Resolution and Enforcement: Mediation, arbitration, and court enforcement of contractual terms",
      "International Franchising Services: Cross-border guidance, international standards compliance, foreign IP protections",
      "End-to-End Legal Support: From registration to ongoing operational challenges and contract enforcement"
    ],
    benefits: [
      "Extensive Knowledge of Franchise Law: In-depth expertise in Saudi and international franchising regulations",
      "Custom Solutions: We tailor franchise agreements and strategies to align with your business objectives",
      "End-to-End Support: From registration to dispute resolution, we handle every aspect of franchising",
      "Protecting Your Interests: Whether you're a franchisor or franchisee, we prioritize your legal and financial protections",
      "Proven Track Record: Successfully assisting businesses across various industries in establishing and managing franchises"
    ],
    process: {
      title: "How Our Franchising Services Work",
      steps: [
        "Initial Consultation: Discuss your franchising goals with our legal experts to identify the best approach for your business",
        "Agreement Drafting and Review: Our team prepares or reviews franchise agreements to ensure they are compliant, enforceable, and clearly defined",
        "Registration and Compliance: We assist in registering franchise agreements with Saudi authorities, ensuring compliance with local regulations",
        "Ongoing Legal Support: We provide continuous support to address any legal or operational challenges, including dispute resolution and contract enforcement"
      ]
    },
    icon: "Building"
  },
  {
    id: "estore-registration",
    title: "E-Store Registration and Legal Compliance Services in Saudi Arabia",
    shortTitle: "E-Store Registration",
    description: "The e-commerce sector in Saudi Arabia is thriving, offering endless opportunities for businesses to reach customers online. At Ali Bin Fahad Law Firm & Intellectual Property & Notary LLC, we provide comprehensive e-store registration and legal compliance services to help businesses establish and operate successful online stores. Our expertise ensures that your e-store complies with Saudi laws, protecting your business and enhancing customer trust.",
    features: [
      "E-Store Registration: Saudi E-Commerce Platform Registration, licensing, and complete documentation",
      "Compliance with Saudi E-Commerce Laws: Terms of service, privacy policies, consumer protection regulations",
      "Intellectual Property Protection for E-Stores: Trademark registration, copyright protection, IP enforcement",
      "Cybersecurity and Data Protection Compliance: PDPL compliance, data protection policies, fraud risk minimization",
      "Dispute Resolution and Legal Support: Customer disputes, mediation, arbitration, fraud resolution",
      "Cross-Border E-Commerce: International trade regulations, tax compliance, global transaction support"
    ],
    benefits: [
      "Expert Knowledge: Extensive experience with Saudi e-commerce laws and regulations",
      "Customized Support: Solutions tailored to the unique needs of your online business",
      "End-to-End Services: From registration to ongoing legal compliance, we handle it all",
      "Proven Track Record: Successfully supporting e-stores in a variety of industries",
      "Protecting Your Interests: Ensuring your online business is secure, compliant, and risk-free"
    ],
    process: {
      title: "How Our E-Store Services Work",
      steps: [
        "Consultation and Strategy: We assess your e-store's legal requirements and create a customized plan for registration and compliance",
        "E-Store Registration: Our team handles the registration process, ensuring accuracy and compliance with Saudi laws",
        "Compliance Review and Documentation: We draft and review essential legal documents, including terms of service, privacy policies, and refund terms",
        "Ongoing Legal Support: We provide ongoing support to ensure your e-store remains compliant and protected as regulations evolve"
      ]
    },
    icon: "ShoppingCart"
  }
];

export const getServiceById = (id: string): ServiceData | undefined => {
  return servicesData.find(service => service.id === id);
};