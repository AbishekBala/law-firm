import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, Languages, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
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
  const { language, setLanguage, isRTL } = useLanguage();

  const slugParam = slug ? decodeURIComponent(slug) : '';
  const post = blogPosts.find(p => p.slug === slugParam || String(p.id) === slugParam);

  console.debug('[BlogArticle] slugParam=', slugParam, 'foundPost=', !!post);

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

  // Normalize language to 'en' or 'ar' keys used in blogData
  const lang = language && String(language).toLowerCase().startsWith('ar') ? 'ar' : 'en';

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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
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
  const title = encodeURIComponent(post.title[lang] ?? post.title['en'] ?? '');
    
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
    .filter(p => p.id !== post.id && (p.category?.[lang] ?? p.category?.['en']) === (post.category?.[lang] ?? post.category?.['en']))
    .slice(0, 3);

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
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
              {post.category?.[lang] ?? post.category?.['en']}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              {post.title?.[lang] ?? post.title?.['en']}
            </h1>
            <p className="text-lg md:text-xl text-neutral-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt?.[lang] ?? post.excerpt?.['en']}
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
              <span className="text-base">{post.readTime?.[lang] ?? post.readTime?.['en']}</span>
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
                <div className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {/* Render article content from data (stored as HTML). We sanitize on admin save but data may contain HTML. */}
                  <div dangerouslySetInnerHTML={{ __html: post.content?.[lang] ?? post.content?.['en'] ?? '' }} />
                </div>
              </div>
              
              {/* Tags */}
              <div className="border-t border-neutral-200 pt-8 mt-12">
                <h3 className="text-xl font-bold text-legal-navy mb-6">
                  {language === 'en' ? 'Related Topics' : 'المواضيع ذات الصلة'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {(post.tags?.[lang] ?? post.tags?.['en'] ?? []).map((tag) => (
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