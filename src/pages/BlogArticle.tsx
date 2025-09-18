import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Languages, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { blogPosts } from '@/data/blogData';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';

type Language = 'en' | 'ar';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>('en');

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-legal-navy mb-4">
            {language === 'en' ? 'Article Not Found' : 'المقال غير موجود'}
          </h1>
          <p className="text-neutral-600 mb-8 text-lg">
            {language === 'en' 
              ? "The article you're looking for doesn't exist or may have been moved."
              : 'المقال الذي تبحث عنه غير موجود أو ربما تم نقله.'
            }
          </p>
          <Button onClick={() => navigate('/blog')} className="bg-legal-navy text-white px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? date.toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: language === 'en' ? 'Link copied!' : 'تم نسخ الرابط!',
      description: language === 'en' ? 'Article link has been copied to clipboard.' : 'تم نسخ رابط المقال إلى الحافظة.',
    });
  };

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title[language]);
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category[language] === post.category[language])
    .slice(0, 3);

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-legal-navy via-legal-navy/95 to-legal-navy/90 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 border-2 border-accent rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 border-2 border-accent rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-max px-4 relative z-10">
          {/* Navigation and Language Toggle */}
          <div className="flex items-center justify-between mb-12">
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-6 py-3 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
            </Button>
            
            <Button
              onClick={toggleLanguage}
              variant="outline"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-6 py-3 backdrop-blur-sm"
            >
              <Languages className="h-4 w-4 mr-2" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-accent text-white text-base font-bold px-6 py-3 rounded-full shadow-lg mb-8">
              {post.category[language]}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {post.title[language]}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt[language]}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-200 mb-8">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-accent" />
              <span className="font-semibold text-base">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-accent" />
              <span className="text-base">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              <span className="text-base">{post.readTime[language]}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-base font-semibold text-white mr-4">
              {language === 'en' ? 'Share:' : 'مشاركة:'}
            </span>
            <Button
              onClick={() => shareOnSocial('twitter')}
              variant="outline"
              size="sm"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 p-3 backdrop-blur-sm"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => shareOnSocial('facebook')}
              variant="outline"
              size="sm"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 p-3 backdrop-blur-sm"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => shareOnSocial('linkedin')}
              variant="outline"
              size="sm"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 p-3 backdrop-blur-sm"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 p-3 backdrop-blur-sm"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-neutral-200">
                <LazyImage
                  src={post.thumbnail}
                  alt={post.title[language]}
                  className="w-full h-80 md:h-96 object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.3}>
              <div className="prose prose-lg max-w-none">
                <div className={`space-y-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  {/* Introduction */}
                  <p className="text-lg text-neutral-700 leading-relaxed mb-8 text-justify">
                    {language === 'en' 
                      ? "In today's rapidly evolving legal landscape, understanding the complexities of intellectual property protection has become more crucial than ever. As businesses increasingly rely on digital assets and innovative technologies, the need for comprehensive IP strategies has grown exponentially, making it essential for companies to establish robust protection mechanisms."
                      : "في المشهد القانوني المتطور بسرعة اليوم، أصبح فهم تعقيدات حماية الملكية الفكرية أكثر أهمية من أي وقت مضى. مع اعتماد الشركات بشكل متزايد على الأصول الرقمية والتقنيات المبتكرة، نمت الحاجة إلى استراتيجيات شاملة للملكية الفكرية بشكل كبير، مما يجعل من الضروري للشركات إنشاء آليات حماية قوية."
                    }
                  </p>

                  <h2 className="text-3xl font-bold text-legal-navy mb-6 mt-12 leading-tight">
                    {language === 'en' ? 'Key Protection Strategies' : 'استراتيجيات الحماية الأساسية'}
                  </h2>

                  <p className="text-lg text-neutral-600 leading-relaxed mb-8 text-justify">
                    {language === 'en'
                      ? "Effective intellectual property protection requires a multi-layered approach that encompasses various legal mechanisms and strategic considerations. From trademark registration to patent applications, each aspect plays a vital role in safeguarding your business interests and maintaining competitive advantages in the marketplace."
                      : "تتطلب الحماية الفعالة للملكية الفكرية نهجاً متعدد الطبقات يشمل آليات قانونية متنوعة واعتبارات استراتيجية. من تسجيل العلامات التجارية إلى طلبات البراءات، يلعب كل جانب دوراً حيوياً في حماية مصالح عملك والحفاظ على المزايا التنافسية في السوق."
                    }
                  </p>

                  {/* Types of Intellectual Property */}
                  <div className="bg-gradient-to-r from-legal-navy/5 to-accent/5 p-6 rounded-xl my-10">
                    <h3 className="text-2xl font-bold text-legal-navy mb-6">
                      {language === 'en' ? 'Types of Intellectual Property' : 'أنواع الملكية الفكرية'}
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xl font-semibold text-legal-navy mb-3">
                          {language === 'en' ? 'Trademarks' : 'العلامات التجارية'}
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed text-justify">
                          {language === 'en'
                            ? "Trademarks protect brand names, logos, and distinctive signs that identify your business. They serve as powerful tools for brand recognition and customer loyalty, providing exclusive rights to use specific marks in connection with your goods or services."
                            : "تحمي العلامات التجارية أسماء العلامات التجارية والشعارات والعلامات المميزة التي تحدد هوية عملك. إنها تعمل كأدوات قوية لتمييز العلامة التجارية وولاء العملاء، وتوفر حقوقاً حصرية لاستخدام علامات محددة فيما يتعلق بسلعك أو خدماتك."
                          }
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-legal-navy mb-3">
                          {language === 'en' ? 'Patents' : 'براءات الاختراع'}
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed text-justify">
                          {language === 'en'
                            ? "Patents protect inventions and technical innovations for a specific period, typically 20 years from the filing date. They grant inventors exclusive rights to make, use, sell, or distribute their inventions, providing a significant competitive advantage and potential revenue streams through licensing."
                            : "تحمي براءات الاختراع الاختراعات والابتكارات التقنية لفترة محددة، عادة 20 عاماً من تاريخ التقديم. إنها تمنح المخترعين حقوقاً حصرية لصنع واستخدام وبيع أو توزيع اختراعاتهم، مما يوفر ميزة تنافسية كبيرة وتدفقات إيرادات محتملة من خلال الترخيص."
                          }
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-semibold text-legal-navy mb-3">
                          {language === 'en' ? 'Copyrights' : 'حقوق الطبع والنشر'}
                        </h4>
                        <p className="text-base text-neutral-600 leading-relaxed text-justify">
                          {language === 'en'
                            ? "Copyrights protect original works of authorship, including literary, artistic, musical, and certain other intellectual works. In the digital age, copyright protection extends to software, websites, digital content, and multimedia creations, making it essential for content creators and technology companies."
                            : "تحمي حقوق الطبع والنشر الأعمال الأصلية للتأليف، بما في ذلك الأعمال الأدبية والفنية والموسيقية وبعض الأعمال الفكرية الأخرى. في العصر الرقمي، تمتد حماية حقوق الطبع والنشر إلى البرمجيات والمواقع الإلكترونية والمحتوى الرقمي والإبداعات متعددة الوسائط، مما يجعلها ضرورية لمنشئي المحتوى وشركات التكنولوجيا."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-accent bg-accent/10 p-6 my-10 rounded-r-lg">
                    <p className="text-lg italic text-legal-navy font-medium leading-relaxed">
                      {language === 'en'
                        ? "The strength of intellectual property protection directly correlates with business success in the digital age. Companies with robust IP portfolios are better positioned to attract investors, enter new markets, and defend against competitors."
                        : "قوة حماية الملكية الفكرية تترابط مباشرة مع نجاح الأعمال في العصر الرقمي. الشركات التي لديها محافظ ملكية فكرية قوية في وضع أفضل لجذب المستثمرين ودخول أسواق جديدة والدفاع ضد المنافسين."
                      }
                    </p>
                  </blockquote>

                  <h3 className="text-2xl font-bold text-legal-navy mb-6 mt-12">
                    {language === 'en' ? 'Digital Age Considerations' : 'اعتبارات العصر الرقمي'}
                  </h3>

                  <p className="text-lg text-neutral-600 leading-relaxed mb-8 text-justify">
                    {language === 'en'
                      ? "The digital transformation has introduced new challenges and opportunities in intellectual property law. Online brand protection, domain name strategies, and digital content licensing have become essential components of modern IP portfolios. Companies must now consider global digital presence, social media protection, and cybersecurity measures as integral parts of their IP strategy."
                      : "أدخل التحول الرقمي تحديات وفرصاً جديدة في قانون الملكية الفكرية. أصبحت حماية العلامة التجارية عبر الإنترنت واستراتيجيات أسماء النطاقات وترخيص المحتوى الرقمي مكونات أساسية في محافظ الملكية الفكرية الحديثة. يجب على الشركات الآن أن تعتبر الوجود الرقمي العالمي وحماية وسائل التواصل الاجتماعي وتدابير الأمن السيبراني كأجزاء لا يتجزأ من استراتيجية الملكية الفكرية الخاصة بها."
                    }
                  </p>

                  {/* Best Practices Section */}
                  <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-xl my-10">
                    <h3 className="text-2xl font-bold text-legal-navy mb-6">
                      {language === 'en' ? 'Best Practices for IP Protection' : 'أفضل الممارسات لحماية الملكية الفكرية'}
                    </h3>
                    
                    <ul className="space-y-4 text-base text-neutral-600">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">1</span>
                        <span className="leading-relaxed">
                          {language === 'en'
                            ? "Register your IP rights early and monitor for potential infringement to maintain protection. Early registration provides stronger legal standing and broader protection options."
                            : "سجل حقوق الملكية الفكرية الخاصة بك مبكراً وراقب أي انتهاكات محتملة للحفاظ على الحماية. التسجيل المبكر يوفر مكانة قانونية أقوى وخيارات حماية أوسع."
                          }
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">2</span>
                        <span className="leading-relaxed">
                          {language === 'en'
                            ? "Implement comprehensive documentation and record-keeping systems to support your IP claims and demonstrate ownership and development timelines."
                            : "تنفيذ أنظمة توثيق وحفظ سجلات شاملة لدعم مطالبات الملكية الفكرية الخاصة بك وإثبات الملكية والجداول الزمنية للتطوير."
                          }
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">3</span>
                        <span className="leading-relaxed">
                          {language === 'en'
                            ? "Develop a global IP strategy that considers international markets and varying legal requirements across different jurisdictions and territories."
                            : "تطوير استراتيجية ملكية فكرية عالمية تأخذ في الاعتبار الأسواق الدولية والمتطلبات القانونية المتفاوتة عبر الولايات القضائية والأقاليم المختلفة."
                          }
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-lg text-neutral-600 leading-relaxed mb-8 text-justify">
                    {language === 'en'
                      ? "As we move forward in an increasingly digital world, the importance of intellectual property protection will only continue to grow. Companies that invest in comprehensive IP strategies today will be better positioned to thrive in tomorrow's competitive landscape, ensuring their innovations and creative works remain protected and profitable for years to come."
                      : "بينما نتقدم في عالم رقمي متزايد، ستستمر أهمية حماية الملكية الفكرية في النمو فقط. الشركات التي تستثمر في استراتيجيات ملكية فكرية شاملة اليوم ستكون في وضع أفضل للازدهار في المشهد التنافسي للغد، مما يضمن بقاء ابتكاراتها وأعمالها الإبداعية محمية ومربحة لسنوات قادمة."
                    }
                  </p>
                </div>
              </div>
              
              {/* Tags */}
              <div className="border-t border-neutral-200 pt-8 mt-12">
                <h3 className="text-xl font-bold text-legal-navy mb-6">
                  {language === 'en' ? 'Related Topics' : 'المواضيع ذات الصلة'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags[language].map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-2 text-sm px-4 py-2 border-2 border-neutral-300 hover:border-accent hover:text-accent transition-colors duration-300 font-medium">
                      <Tag className="h-4 w-4" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container-max">
            <AnimatedSection delay={0.4}>
              <h2 className="text-3xl sm:text-4xl font-bold text-legal-navy mb-12 text-center">
                {language === 'en' ? 'Related Articles' : 'مقالات ذات صلة'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <AnimatedSection key={relatedPost.id} delay={0.5 + index * 0.1}>
                    <article 
                      onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                      className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden hover:shadow-2xl hover:shadow-legal-navy/10 transition-all duration-500 cursor-pointer group hover:-translate-y-2 h-full flex flex-col"
                    >
                      <div className="relative overflow-hidden h-48">
                        <LazyImage
                          src={relatedPost.thumbnail}
                          alt={relatedPost.title[language]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <Badge className="bg-accent text-white mb-3 w-fit text-sm px-3 py-1">
                          {relatedPost.category[language]}
                        </Badge>
                        <h3 className="font-bold text-legal-navy mb-3 line-clamp-2 text-xl group-hover:text-accent transition-colors duration-300">
                          {relatedPost.title[language]}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2 flex-grow text-lg leading-relaxed">
                          {relatedPost.excerpt[language]}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-neutral-500">{relatedPost.readTime[language]}</span>
                          <div className="text-accent font-medium group-hover:text-legal-navy transition-colors duration-300">
                            {language === 'en' ? 'Read More' : 'اقرأ المزيد'}
                          </div>
                        </div>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogArticle;