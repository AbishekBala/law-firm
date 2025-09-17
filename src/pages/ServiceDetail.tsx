import { ArrowRight, ChevronLeft, Phone, Mail } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Typewriter } from '@/components/ui/typewriter-text';
import { getServiceById } from '@/data/servicesData';
import { useTranslation } from '@/hooks/useLanguage';

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { t } = useTranslation();
  
  if (!serviceId) {
    return <Navigate to="/services" replace />;
  }

  const service = getServiceById(serviceId);
  
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="bg-legal-navy text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-neutral-300 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white">{service.shortTitle}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <Typewriter
              text={service.title}
              speed={50}
              loop={false}
              className="text-inherit"
            />
          </h1>
          <p className="text-lg text-neutral-200 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link 
            to="/services" 
            className="inline-flex items-center text-neutral-600 hover:text-legal-navy"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Services
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Legal Consultation Content */}
          {service.id === 'legal-consultation' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Legal Consultation Areas</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">1. Corporate and Commercial Law</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Establishing companies and ensuring regulatory compliance</li>
                    <li>Guidance on mergers, acquisitions, and joint ventures</li>
                    <li>Contract drafting, review, and negotiation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">2. Dispute Resolution and Litigation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Strategic advice for mediation, arbitration, and court representation</li>
                    <li>Civil, commercial, and contractual dispute resolution</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">3. Intellectual Property Law</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Trademark registration, enforcement, and dispute resolution</li>
                    <li>Licensing, franchising, and IP protection strategies</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">4. Personal Legal Support</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Family law, inheritance disputes, and estate planning</li>
                    <li>Property transactions and real estate dispute advice</li>
                    <li>Criminal defense consultation tailored to individual cases</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Litigation Content */}
          {service.id === 'litigation-representation' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Litigation Expertise</h2>
              <p className="mb-6">We handle a wide range of litigation and legal matters, including:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">1. Civil Litigation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Disputes related to contracts, partnerships, and financial obligations</li>
                    <li>Real estate disputes, including property ownership and tenancy issues</li>
                    <li>Claims for damages, compensation, and breach of agreements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">2. Commercial Litigation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Corporate disputes between shareholders, directors, and partners</li>
                    <li>Enforcement of business contracts and non-compete clauses</li>
                    <li>Commercial fraud cases and breach of trade agreements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">3. Criminal Defense</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Representation in criminal cases, ensuring fair treatment and defense of your rights</li>
                    <li>Legal support for fraud, theft, embezzlement, and other criminal charges</li>
                    <li>Appeals and post-trial advocacy</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">4. Administrative and Labor Disputes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Representation before Saudi labor courts for employer-employee disputes</li>
                    <li>Administrative challenges involving government decisions or licenses</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">5. Arbitration and Alternative Dispute Resolution (ADR)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Mediation, arbitration, and conciliation to resolve disputes efficiently</li>
                    <li>Representation in arbitration panels, ensuring your interests are fully protected</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Company Formation Content */}
          {service.id === 'company-formation' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Why Choose Saudi Arabia for Investment?</h2>
              <p className="mb-4">Saudi Arabia is a global leader in attracting foreign investment, offering a competitive and business-friendly environment. Key advantages include:</p>
              <ul className="list-disc pl-6 space-y-1 mb-8">
                <li>Streamlined legal and administrative procedures for company formation</li>
                <li>Government support for startups and foreign investments</li>
                <li>Strategic location for access to regional and international markets</li>
                <li>Diverse legal structures for all types of businesses</li>
              </ul>
              <p className="mb-8">Saudi Arabia's ongoing reforms and economic vision make it an ideal destination for ambitious investors aiming to succeed in the local and global markets.</p>

              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Comprehensive Company Formation Services</h2>
              <p className="mb-6">At Ali Bin Fahad Law Firm and Legal Consultancy, we provide a full suite of services designed to simplify the process of company formation and ensure your legal compliance. Our services include:</p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">1. Legal Consultation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Expert advice on company formation regulations and legal frameworks in Saudi Arabia</li>
                    <li>Guidance on selecting the appropriate legal structure for your business (LLC, joint stock company, or sole proprietorship)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">2. Drafting and Reviewing Contracts</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Preparing and reviewing Articles of Association and all necessary legal documents</li>
                    <li>Updating and amending company contracts to meet regulatory requirements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">3. Licensing and Commercial Registration</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Securing all required licenses from the Ministry of Investment and Ministry of Commerce</li>
                    <li>Issuing commercial registrations tailored to your business activities</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">4. Entity Transformation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Assisting with transforming companies into institutions or vice versa as per your business needs</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">5. Corporate Governance</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Implementing governance frameworks to enhance your company's compliance and operational efficiency</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">6. Legal Representation and Litigation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Representing your business in all legal matters before relevant authorities</li>
                    <li>Managing disputes and ensuring your rights are fully protected</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">7. Foreign Investor Protection</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Minimizing risks and ensuring compliance with local laws for foreign investors</li>
                    <li>Protecting your business from potential legal challenges</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Bankruptcy Content */}
          {service.id === 'bankruptcy-debt-restructuring' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Expertise in Bankruptcy Applications</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">1. Filing Bankruptcy Applications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Preparing and submitting bankruptcy applications in compliance with Saudi laws</li>
                    <li>Representing clients during bankruptcy court proceedings</li>
                    <li>Ensuring accurate documentation and adherence to legal deadlines</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">2. Debt Restructuring and Settlement</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Negotiating with creditors to restructure debts and reduce financial burdens</li>
                    <li>Crafting repayment plans tailored to your financial situation</li>
                    <li>Advising on alternative solutions to avoid insolvency</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">3. Liquidation and Asset Management</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Assisting in the liquidation of assets for debt repayment</li>
                    <li>Managing creditor claims and ensuring fair asset distribution</li>
                    <li>Providing legal support to safeguard your rights during the process</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">4. Financial Recovery Planning</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Offering strategic advice to help businesses and individuals recover financially</li>
                    <li>Identifying opportunities to rebuild operations and regain stability</li>
                    <li>Providing ongoing legal guidance to ensure long-term compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Estate Liquidation Content */}
          {service.id === 'estate-liquidation' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Expertise in Estate Liquidation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">1. Asset Evaluation and Inventory</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Identifying, assessing, and valuing all estate assets, including real estate, financial holdings, and personal property</li>
                    <li>Creating a detailed inventory to ensure accuracy and transparency</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">2. Debt Settlement and Claims Management</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Addressing outstanding debts, taxes, and liabilities associated with the estate</li>
                    <li>Managing creditor claims to ensure proper distribution of remaining assets</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">3. Legal Representation in Estate Disputes</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Resolving disputes among heirs or beneficiaries through negotiation, mediation, or litigation</li>
                    <li>Protecting your rights and ensuring compliance with Saudi inheritance laws</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">4. Asset Distribution and Transfer</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Facilitating the distribution of assets in accordance with the estate plan or court orders</li>
                    <li>Handling property transfers, title changes, and legal documentation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-3">5. Compliance with Saudi Inheritance Laws</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Ensuring the estate liquidation process adheres to local regulations, including Shariah principles</li>
                    <li>Providing legal guidance to avoid complications or disputes</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Contract Drafting Content */}
          {service.id === 'contract-drafting-notarization' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Comprehensive Services</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. Contract Drafting Services</h3>
                  <p className="mb-4">We draft contracts that protect your rights, reduce risks, and ensure enforceability. Our legal team specializes in creating:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Corporate and Commercial Contracts:</strong> Shareholder agreements, vendor contracts, joint ventures, mergers, and acquisitions.</li>
                    <li><strong>Employment Contracts:</strong> Compliant with Saudi labor laws, including confidentiality, non-compete, and severance agreements.</li>
                    <li><strong>Real Estate Contracts:</strong> Purchase agreements, lease agreements, construction contracts, and property management agreements.</li>
                    <li><strong>Customized Agreements:</strong> Tailored to unique business or personal requirements.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Notarization Services</h3>
                  <p className="mb-4">As an authorized notary public in Saudi Arabia, we certify and validate your legal documents, making them ready for official use. Our services include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Certification of powers of attorney, affidavits, and legal agreements.</li>
                    <li>Corporate notarization for board resolutions and shareholder documents.</li>
                    <li>Real estate notarization, including property deeds and lease agreements.</li>
                    <li>Validation of personal documents like declarations and certifications.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Legalization and Attestation Services</h3>
                  <p className="mb-4">We ensure your documents are recognized locally and internationally by providing:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Document Legalization:</strong> Liaising with Saudi ministries and embassies to legalize official documents.</li>
                    <li><strong>Attestation Services:</strong> Certifying educational, business, and personal documents for global use.</li>
                    <li><strong>International Compliance:</strong> Preparing documents that meet the requirements of international jurisdictions.</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-legal-navy mb-6 mt-12">Common Documents We Handle</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Corporate Documents:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Shareholder agreements</li>
                    <li>Board resolutions</li>
                    <li>Business licenses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Real Estate Documents:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Deeds of sale</li>
                    <li>Lease agreements</li>
                    <li>Construction contracts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Personal Documents:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Powers of attorney</li>
                    <li>Affidavits and declarations</li>
                    <li>Educational certificates</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Debt Collection Content */}
          {service.id === 'debt-collection' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Debt Collection Expertise</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. Commercial Debt Collection</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Recovering overdue payments from corporate clients or business partners.</li>
                    <li>Negotiating repayment plans and settlements to maintain professional relationships.</li>
                    <li>Resolving unpaid invoices, loans, and contractual obligations.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Personal Debt Recovery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Assisting individuals in recovering personal loans or unpaid dues.</li>
                    <li>Handling complex cases involving personal agreements and guarantees.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Pre-Litigation Debt Recovery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Sending legal notices and demand letters to debtors.</li>
                    <li>Negotiating settlements to avoid court proceedings.</li>
                    <li>Conducting thorough assessments to determine the best course of action.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">4. Legal Action for Debt Recovery</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Filing lawsuits against non-compliant debtors in Saudi courts.</li>
                    <li>Representing clients in court proceedings to secure favorable judgments.</li>
                    <li>Enforcing court rulings to ensure the recovery of outstanding debts.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Legal Translation Content */}
          {service.id === 'legal-translation' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Expertise in Legal Translation</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. Certified Translation of Legal Documents</h3>
                  <p className="mb-4">We translate a wide variety of legal documents, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contracts, agreements, and corporate resolutions.</li>
                    <li>Court rulings, petitions, and case files.</li>
                    <li>Powers of attorney, affidavits, and declarations.</li>
                    <li>Regulatory filings, business licenses, and certifications.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Multilingual Legal Translation Services</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Accurate translations in Arabic, English, and other languages commonly used in Saudi Arabia.</li>
                    <li>Seamless communication for cross-border legal transactions and international dealings.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Specialized Legal Translation for Businesses</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Translating business contracts, vendor agreements, and non-disclosure agreements (NDAs).</li>
                    <li>Preparing bilingual corporate documents for compliance with Saudi and international laws.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">4. Translation for Personal Legal Matters</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Translating personal documents like wills, marriage certificates, and inheritance papers.</li>
                    <li>Preparing translated documents for use in legal proceedings or official submissions.</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-legal-navy mb-6 mt-12">Common Documents We Translate</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Corporate Documents:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Contracts and agreements</li>
                    <li>Articles of incorporation</li>
                    <li>Shareholder resolutions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Court and Legal Papers:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Court rulings and case files</li>
                    <li>Arbitration awards</li>
                    <li>Legal notices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Personal Legal Documents:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Marriage certificates</li>
                    <li>Wills and inheritance documents</li>
                    <li>Powers of attorney</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Trademark Services Content */}
          {service.id === 'trademark-services' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Trademark Services</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. Trademark Registration in Saudi Arabia</h3>
                  <p className="mb-4">Registering your trademark is the first step in protecting your brand. We provide end-to-end support for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Conducting trademark searches to ensure availability.</li>
                    <li>Preparing and filing trademark applications with the Saudi Authority for Intellectual Property (SAIP).</li>
                    <li>Handling responses to office actions and other legal hurdles during the registration process.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Trademark Protection and Renewals</h3>
                  <p className="mb-4">Maintaining your trademark is as important as registering it. We assist with:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Renewing trademarks before expiration to maintain legal rights.</li>
                    <li>Monitoring your trademark to detect potential infringements.</li>
                    <li>Advising on strategies to strengthen your trademark portfolio.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Trademark Enforcement</h3>
                  <p className="mb-4">If your trademark rights are violated, we act swiftly to enforce them. Our services include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Filing trademark infringement complaints with SAIP and other relevant authorities.</li>
                    <li>Representing clients in trademark disputes and litigation.</li>
                    <li>Negotiating settlements and pursuing legal remedies to protect your brand.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">4. Trademark Dispute Resolution</h3>
                  <p className="mb-4">When disputes arise, our experienced legal team provides effective solutions, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mediation and arbitration to resolve conflicts.</li>
                    <li>Filing opposition or cancellation actions against conflicting trademarks.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">5. International Trademark Services</h3>
                  <p className="mb-4">Expand your brand protection globally with our international trademark services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Assistance with filing trademarks under the Madrid Protocol for international registration.</li>
                    <li>Managing trademarks across multiple jurisdictions to ensure worldwide protection.</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-legal-navy mb-6 mt-12">Common Types of Trademarks We Handle</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Logos and brand names.</li>
                  <li>Slogans and taglines.</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Product packaging and trade dress.</li>
                  <li>Service marks and collective marks.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Franchising Services Content */}
          {service.id === 'franchising-services' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Expertise in Franchising Services</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. Drafting and Reviewing Franchise Agreements</h3>
                  <p className="mb-4">We create franchise agreements that clearly define the rights, responsibilities, and obligations of both franchisors and franchisees, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Licensing terms and territorial rights.</li>
                    <li>Intellectual property protections for trademarks and brand assets.</li>
                    <li>Financial terms, including fees, royalties, and payments.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Compliance with Saudi Franchise Law</h3>
                  <p className="mb-4">Our team ensures your franchise operations comply with Saudi Arabia's Franchise Law, which governs:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Registration requirements for franchisors.</li>
                    <li>Disclosure obligations to protect franchisees.</li>
                    <li>Termination and renewal clauses for franchise agreements.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Franchise Registration with Relevant Authorities</h3>
                  <p className="mb-4">We assist franchisors in registering their franchise agreements with the Ministry of Commerce, ensuring all legal and procedural requirements are met.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">4. Dispute Resolution and Enforcement</h3>
                  <p className="mb-4">When conflicts arise, we provide legal support to resolve disputes effectively, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Mediation and arbitration for franchisor-franchisee disagreements.</li>
                    <li>Enforcing contractual terms and protecting your rights in Saudi courts.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">5. International Franchising Services</h3>
                  <p className="mb-4">We help global brands enter the Saudi market and local businesses expand internationally by providing:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Legal guidance on cross-border franchising.</li>
                    <li>Compliance with international franchising standards.</li>
                    <li>Assistance with intellectual property protections in foreign jurisdictions.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* E-Store Registration Content */}
          {service.id === 'estore-registration' && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Our Expertise in E-Store Registration and Legal Compliance</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">1. E-Store Registration</h3>
                  <p className="mb-4">We guide you through the entire process of registering your e-store with the Ministry of Commerce and other relevant authorities, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Assisting with the Saudi E-Commerce Platform Registration.</li>
                    <li>Obtaining the necessary licenses for your online business.</li>
                    <li>Ensuring all registration documents are complete and accurate.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">2. Compliance with Saudi E-Commerce Laws</h3>
                  <p className="mb-4">Our legal team ensures that your e-store operates in compliance with the Saudi E-Commerce Law, including:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Drafting and reviewing terms of service, privacy policies, and refund policies.</li>
                    <li>Ensuring compliance with consumer protection regulations.</li>
                    <li>Advising on cross-border e-commerce transactions.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">3. Intellectual Property Protection for E-Stores</h3>
                  <p className="mb-4">Protect your brand and digital assets with our intellectual property services:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Trademark registration for your e-store name and logo.</li>
                    <li>Copyright protection for website content and digital products.</li>
                    <li>Enforcing your IP rights against infringement.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">4. Cybersecurity and Data Protection Compliance</h3>
                  <p className="mb-4">Stay compliant with Saudi cybersecurity and data privacy regulations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Advising on data collection, storage, and processing practices.</li>
                    <li>Drafting data protection policies to comply with the Saudi Personal Data Protection Law (PDPL).</li>
                    <li>Minimizing risks of data breaches and online fraud.</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-legal-navy mb-4">5. Dispute Resolution and Legal Support</h3>
                  <p className="mb-4">When issues arise, we provide:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Representation in disputes with customers, vendors, or service providers.</li>
                    <li>Mediation and arbitration for e-commerce-related conflicts.</li>
                    <li>Legal action to resolve fraud or payment disputes.</li>
                  </ul>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-legal-navy mb-6 mt-12">Common Issues We Address for E-Stores</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Consumer Protection Compliance:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Refund and return disputes.</li>
                    <li>Ensuring clear product descriptions and pricing transparency.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Data Privacy and Cybersecurity:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Compliance with Saudi Personal Data Protection Law (PDPL).</li>
                    <li>Protecting customer data from breaches.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Intellectual Property Infringement:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Resolving disputes over trademarks, copyrights, or digital assets.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-legal-navy mb-3">Cross-Border Transactions:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Navigating international trade and tax regulations for global e-commerce.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Us Section */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-legal-navy mb-6">
              {service.id === 'legal-consultation' 
                ? "Why Choose Us for Legal Consultation?" 
                : service.id === 'litigation-representation'
                ? "Why Choose Our Litigation and Pleading Services?"
                : service.id === 'company-formation'
                ? "Why Partner with Ali Bin Fahad Law Firm?"
                : service.id === 'bankruptcy-debt-restructuring'
                ? "Why Choose Us?"
                : service.id === 'estate-liquidation'
                ? "Why Choose Us for Estate Liquidation?"
                : service.id === 'debt-collection'
                ? "Why Choose Us for Debt Collection?"
                : service.id === 'legal-translation'
                ? "Why Choose Our Legal Translation Services?"
                : service.id === 'trademark-services'
                ? "Why Choose Us for Trademark Services?"
                : service.id === 'franchising-services'
                ? "Why Choose Us for Franchising Services?"
                : service.id === 'estore-registration'
                ? "Why Choose Us for E-Store Legal Services?"
                : `Why Choose Our ${service.shortTitle} Services?`
              }
            </h2>
            {service.id === 'bankruptcy-debt-restructuring' && (
              <p className="mb-6">At Ali Bin Fahad Law Firm, we are dedicated to delivering exceptional legal services during times of financial uncertainty. Here's what sets us apart:</p>
            )}
            <div className="space-y-4">
              {service.benefits.map((benefit, index) => (
                <div key={index}>
                  <p className="leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-legal-navy mb-6">{service.process.title}</h2>
            <div className="space-y-4">
              {service.process.steps.map((step, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-legal-navy mb-2">Step {index + 1}</h3>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          {(service.id === 'legal-consultation' || service.id === 'litigation-representation' || service.id === 'company-formation' || service.id === 'bankruptcy-debt-restructuring' || service.id === 'estate-liquidation' || service.id === 'contract-drafting-notarization' || service.id === 'debt-collection' || service.id === 'legal-translation' || service.id === 'trademark-services' || service.id === 'franchising-services' || service.id === 'estore-registration') && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold text-legal-navy mb-6">Success Stories</h2>
              {service.id === 'legal-consultation' && (
                <p className="leading-relaxed">A multinational company successfully established operations in Saudi Arabia with our guidance on business formation and compliance. Our comprehensive legal consultation helped them navigate complex regulatory requirements, ensuring full compliance while minimizing setup time and costs.</p>
              )}
              {service.id === 'litigation-representation' && (
                <p className="leading-relaxed">Successfully defended a multinational corporation in a commercial dispute, securing a favorable judgment worth SAR 10 million.</p>
              )}
              {service.id === 'company-formation' && (
                <p className="leading-relaxed">At Ali Bin Fahad Law Firm and Legal Consultancy, we have successfully established numerous companies for both local and international investors in Saudi Arabia. Our expertise has enabled our clients to grow their businesses and capitalize on the opportunities in one of the world's most dynamic economies.</p>
              )}
              {service.id === 'bankruptcy-debt-restructuring' && (
                <div className="space-y-4">
                  <p className="leading-relaxed">1. Successfully restructured SAR 20 million in corporate debt for a struggling business, allowing them to resume operations.</p>
                  <p className="leading-relaxed">2. Assisted an individual in negotiating reduced repayment terms, avoiding asset liquidation.</p>
                </div>
              )}
              {service.id === 'estate-liquidation' && (
                <p className="leading-relaxed">Managed the liquidation of a complex estate involving multiple properties and international assets, ensuring fair distribution among heirs.</p>
              )}
              {service.id === 'contract-drafting-notarization' && (
                <p className="leading-relaxed">Successfully drafted and notarized over 500 complex commercial agreements for multinational corporations, ensuring full legal compliance and international recognition. Our streamlined process reduced document processing time by 60% while maintaining the highest standards of legal accuracy.</p>
              )}
              {service.id === 'debt-collection' && (
                <div className="space-y-4">
                  <p className="leading-relaxed">1. Successfully recovered SAR 2 million in unpaid invoices for a corporate client through pre-litigation negotiations.</p>
                  <p className="leading-relaxed">2. Represented an individual in a debt recovery case, securing full repayment and compensation for delays.</p>
                </div>
              )}
              {service.id === 'legal-translation' && (
                <p className="leading-relaxed">Successfully translated and certified over 1,000 complex legal documents for multinational corporations and government entities, ensuring 100% accuracy and legal compliance. Our translations have been accepted by Saudi courts and international organizations without any revisions or challenges.</p>
              )}
              {service.id === 'trademark-services' && (
                <div className="space-y-4">
                  <p className="leading-relaxed">1. Successfully registered a multinational corporation's trademark in Saudi Arabia, ensuring full protection under local and international IP laws.</p>
                  <p className="leading-relaxed">2. Represented a client in a trademark infringement case, securing damages and halting unauthorized use of their brand.</p>
                </div>
              )}
              {service.id === 'franchising-services' && (
                <div className="space-y-4">
                  <p className="leading-relaxed">1. Assisted a global brand in entering the Saudi market by drafting and registering a comprehensive franchise agreement.</p>
                  <p className="leading-relaxed">2. Represented a local entrepreneur in acquiring a franchise, ensuring fair and favorable contractual terms.</p>
                </div>
              )}
              {service.id === 'estore-registration' && (
                <p className="leading-relaxed">Successfully registered and ensured full legal compliance for over 200 e-stores across various industries, helping businesses navigate Saudi e-commerce regulations and achieve 100% compliance with PDPL and consumer protection laws.</p>
              )}
            </div>
          )}

          {/* Simple CTA */}
          <div className="mt-12 pt-8 border-t text-center">
            <h2 className="text-2xl font-bold text-legal-navy mb-4">
              {service.id === 'legal-consultation' 
                ? "Don't Leave Your Legal Matters to Chance" 
                : service.id === 'litigation-representation'
                ? "Facing a Legal Dispute? We're Here to Help"
                : service.id === 'company-formation'
                ? "Start Your Business Journey Today!"
                : service.id === 'bankruptcy-debt-restructuring'
                ? "Don't Navigate Financial Challenges Alone"
                : service.id === 'estate-liquidation'
                ? "Simplify Your Estate Liquidation Process"
                : service.id === 'contract-drafting-notarization'
                ? "Ensure Your Contracts and Documents Are Legally Binding"
                : service.id === 'debt-collection'
                ? "Don't Let Unpaid Debts Disrupt Your Financial Stability"
                : service.id === 'legal-translation'
                ? "Ensure Your Legal Documents Are Translated with Precision"
                : service.id === 'trademark-services'
                ? "Protect Your Brand with Expert Trademark Services"
                : service.id === 'franchising-services'
                ? "Expand Your Business or Acquire a Franchise with Confidence"
                : service.id === 'estore-registration'
                ? "Start Your E-Store with Confidence and Ensure Full Legal Compliance"
                : "Ready to Get Started?"
              }
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {service.id === 'legal-consultation' 
                ? "Schedule a consultation with us today. Our experienced legal consultants are ready to provide the expert advice you need to protect your rights and achieve your goals."
                : service.id === 'litigation-representation'
                ? "If you're facing a legal dispute or require strong representation in Saudi courts, contact us today. Our experienced litigators are ready to protect your rights and deliver the results you need."
                : service.id === 'company-formation'
                ? "If you're planning to establish your company or invest in Saudi Arabia, contact us now. Ali Bin Fahad Law Firm and Legal Consultancy is your trusted partner for all legal and regulatory needs. Get in touch today to ensure a seamless and legally compliant company formation process in Saudi Arabia."
                : service.id === 'bankruptcy-debt-restructuring'
                ? "If you're facing financial difficulties, don't navigate the challenges alone. Contact us today to schedule a consultation and discover how our bankruptcy and debt restructuring services can help you achieve financial stability."
                : service.id === 'estate-liquidation'
                ? "Simplify the estate liquidation process with the help of our experienced legal team. Contact us today to schedule a consultation and ensure your estate is managed and distributed with precision and care."
                : service.id === 'contract-drafting-notarization'
                ? "Ensure your contracts and documents are legally binding, certified, and internationally recognized. Contact us today to get started with our professional contract drafting, notarization, and legalization services in Saudi Arabia."
                : service.id === 'debt-collection'
                ? "Don't let unpaid debts disrupt your financial stability. Contact us today to schedule a consultation and let our experienced legal team help you recover your debts efficiently and professionally."
                : service.id === 'legal-translation'
                ? "Ensure your legal documents are translated with precision and certified for official use. Contact us today for professional legal translation services in Saudi Arabia."
                : service.id === 'trademark-services'
                ? "Protect your brand with expert trademark services tailored to your needs. Contact us today to schedule a consultation and secure your intellectual property rights in Saudi Arabia and beyond."
                : service.id === 'franchising-services'
                ? "Expand your business or acquire a franchise with confidence. Contact us today to schedule a consultation and learn how our franchising services can help you succeed in Saudi Arabia."
                : service.id === 'estore-registration'
                ? "Start your e-store with confidence and ensure full legal compliance. Contact us today for expert guidance and tailored solutions to secure your online business in Saudi Arabia."
                : `Contact our expert legal team today for professional ${service.shortTitle.toLowerCase()} services in Saudi Arabia.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;