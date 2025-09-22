import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Tag, Languages } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { blogPosts } from '@/data/blogData';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language: siteLanguage, isRTL } = useLanguage();
  const [articleLanguage, setArticleLanguage] = React.useState(siteLanguage);
  
  const slugParam = slug ? decodeURIComponent(slug) : '';
  const post = React.useMemo(() => 
    blogPosts.find(p => p.slug === slugParam || String(p.id) === slugParam),
    [slugParam, blogPosts]
  );
  
  // Sync with site language when it changes or when the post changes
  React.useEffect(() => {
    setArticleLanguage(siteLanguage);
  }, [siteLanguage, slugParam, post]);

  console.debug('[BlogArticle] slugParam=', slugParam, 'foundPost=', !!post);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-legal-navy mb-4">
            {siteLanguage === 'en' ? 'Article Not Found' : 'المقال غير موجود'}
          </h1>
          <p className="text-neutral-600 mb-8 text-lg">
            {siteLanguage === 'en'
              ? "The article you're looking for doesn't exist or may have been moved."
              : 'المقال الذي تبحث عنه غير موجود أو ربما تم نقله.'
            }
          </p>
          <Button onClick={() => navigate('/blog')} className="bg-legal-navy text-white px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors duration-300 shadow-lg hover:shadow-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {siteLanguage === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
          </Button>
        </div>
      </div>
    );
  }

  // Normalize language to 'en' or 'ar' keys used in blogData
  const lang = articleLanguage && String(articleLanguage).toLowerCase().startsWith('ar') ? 'ar' : 'en';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return lang === 'ar'
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

  const toggleArticleLanguage = () => {
    setArticleLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category?.[lang] ?? p.category?.['en']) === (post.category?.[lang] ?? post.category?.['en']))
    .slice(0, 3);

  return (
    <div className={`min-h-screen ${articleLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
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
          <div className="flex items-center justify-between mb-12 relative">
            {/* Language Toggle - Fixed on the right */}
            <div className="absolute right-0 top-0">
              <Button
                onClick={toggleArticleLanguage}
                variant="outline"
                className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-6 py-3 backdrop-blur-sm min-w-[120px]"
              >
                <span className="flex items-center justify-center">
                  <Languages className="h-4 w-4 mr-2 flex-shrink-0" />
                  {articleLanguage === 'en' ? 'العربية' : 'English'}
                </span>
              </Button>
            </div>
            <Button
              onClick={() => navigate('/blog')}
              variant="outline"
              className="border-2 border-accent bg-accent/20 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-6 py-3 backdrop-blur-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {articleLanguage === 'en' ? 'Back to Blog' : 'العودة للمدونة'}
            </Button>

          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {post.title?.[lang] ?? post.title?.['en']}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt?.[lang] ?? post.excerpt?.['en']}
            </p>
          </div>

          {/* Meta information removed as requested */}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={0.3}>
              <div className="prose prose-lg max-w-none">
                <div className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`} key={`${post.id}-${lang}`}>
                  {Array.isArray(post.content) ? (
                    post.content.map((section, index) => {
                      const content = section.content?.[lang] ?? section.content?.['en'] ?? '';
                      
                      switch (section.type) {
                        case 'heading':
                          const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
                          return React.createElement(
                            HeadingTag, 
                            { 
                              key: index, 
                              className: 'text-legal-navy mt-8 mb-4 font-bold',
                              style: { 
                                fontSize: section.level === 2 ? '1.75rem' : 
                                         section.level === 3 ? '1.5rem' : '1.25rem',
                                lineHeight: '1.2'
                              }
                            },
                            content
                          );
                        case 'image':
                          return (
                            <div key={index} className="my-8 rounded-xl overflow-hidden shadow-lg">
                              <LazyImage
                                src={section.imageUrl}
                                alt={section.imageAlt?.[lang] ?? section.imageAlt?.['en'] ?? ''}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          );
                        case 'paragraph':
                        default:
                          return (
                            <p 
                              key={index} 
                              className="text-neutral-700 leading-relaxed mb-6 text-lg"
                              style={{ lineHeight: '1.8' }}
                            >
                              {content}
                            </p>
                          );
                      }
                    })
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: post.content?.[lang] ?? post.content?.['en'] ?? '' }} />
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="border-t border-neutral-200 pt-8 mt-12">
                <h3 className="text-xl font-bold text-legal-navy mb-6">
                  {siteLanguage === 'en' ? 'Tags' : 'الوسوم'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(post.tags?.[siteLanguage] ?? post.tags?.['en'] ?? []).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-legal-navy border-legal-navy/20 hover:bg-legal-navy/10">
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
                {siteLanguage === 'en' ? 'Related Articles' : 'مقالات ذات صلة'}
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
                          alt={relatedPost.title[siteLanguage]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <Badge className="bg-accent text-white mb-3 w-fit text-sm px-3 py-1">
                          {relatedPost.category[siteLanguage]}
                        </Badge>
                        <h3 className="font-bold text-legal-navy mb-3 line-clamp-2 text-xl group-hover:text-accent transition-colors duration-300">
                          {relatedPost.title[siteLanguage]}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2 flex-grow text-lg leading-relaxed">
                          {relatedPost.excerpt[siteLanguage]}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-sm text-neutral-500">{relatedPost.readTime[siteLanguage]}</span>
                          <div className="text-accent font-medium group-hover:text-legal-navy transition-colors duration-300">
                            {siteLanguage === 'en' ? 'Read More' : 'اقرأ المزيد'}
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