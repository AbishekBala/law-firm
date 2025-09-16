import { ArrowRight, Building, Scale, DollarSign, FileText, Edit, CreditCard, Globe, Shield, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useLanguage';

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      icon: Building,
      title: t('companyFormation'),
      description: t('companyFormationDesc'),
      features: [
        'License Registration',
        'Corporate Structure',
        'Compliance Setup'
      ],
      href: '/services/company-formation'
    },
    {
      icon: Scale,
      title: t('litigation'),
      description: t('litigationDesc'),
      features: [
        'Court Representation',
        'Legal Disputes',
        'Arbitration'
      ],
      href: '/services/litigation'
    },
    {
      icon: DollarSign,
      title: t('bankruptcy'),
      description: t('bankruptcyDesc'),
      features: [
        'Debt Restructuring',
        'Bankruptcy Filing',
        'Creditor Negotiation'
      ],
      href: '/services/bankruptcy'
    },
    {
      icon: FileText,
      title: t('estateLiquidation'),
      description: t('estateLiquidationDesc'),
      features: [
        'Asset Distribution',
        'Will Preparation',
        'Estate Planning'
      ],
      href: '/services/estate'
    },
    {
      icon: Edit,
      title: t('drafting'),
      description: t('draftingDesc'),
      features: [
        'Contract Drafting',
        'Legal Documents',
        'Notary Services'
      ],
      href: '/services/drafting'
    },
    {
      icon: CreditCard,
      title: t('debtCollection'),
      description: t('debtCollectionDesc'),
      features: [
        'Payment Recovery',
        'Legal Action',
        'Negotiation'
      ],
      href: '/services/debt-collection'
    },
    {
      icon: Globe,
      title: t('legalTranslation'),
      description: t('legalTranslationDesc'),
      features: [
        'Document Translation',
        'Certified Translation',
        'Legal Interpretation'
      ],
      href: '/services/translation'
    },
    {
      icon: Shield,
      title: t('trademark'),
      description: t('trademarkDesc'),
      features: [
        'Trademark Registration',
        'IP Protection',
        'Brand Defense'
      ],
      href: '/services/trademark'
    },
    {
      icon: ShoppingCart,
      title: t('ecommerce'),
      description: t('ecommerceDesc'),
      features: [
        'E-commerce Setup',
        'Digital Compliance',
        'Online Licensing'
      ],
      href: '/services/ecommerce'
    }
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-legal-navy text-white py-20">
        <div className="container-max text-center px-4">
          <h1 className="heading-lg mb-6">{t('servicesTitle')}</h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto">
            {t('servicesDescription')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-service group cursor-pointer">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold text-legal-navy mb-4">
                  {service.title}
                </h3>
                
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-neutral-600">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="text-accent hover:text-accent hover:bg-accent/10 p-0 h-auto group-hover:translate-x-1 transition-transform"
                >
                  {t('learnMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max text-center">
          <h2 className="heading-md text-legal-navy mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            {t('readyToStartDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary">
              {t('scheduleConsultation')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-outline">
              {t('contactUs')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;