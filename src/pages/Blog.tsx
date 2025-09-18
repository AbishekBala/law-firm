import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Search, ArrowRight, Languages } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/data/blogData';
import { AnimatedSection } from '@/components/AnimatedSection';
import { LazyImage } from '@/components/LazyImage';

type Language = 'en' | 'ar';

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [language, setLanguage] = useState<Language>('en');

  // Get unique categories based on current language
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category[language])))];

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags[language].some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category[language] === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, language]);

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
    setSelectedCategory('All'); // Reset category when switching language
  };

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-legal-navy via-legal-navy/95 to-legal-navy/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-legal-navy/90 to-transparent"></div>
        
        <div className="relative section-padding">
          <div className="container-max text-center">
            {/* Language Toggle */}
            <div className="flex justify-end mb-8">
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="border-2 border-accent bg-accent/10 text-white hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 font-semibold px-6 py-3 text-base backdrop-blur-sm"
              >
                <Languages className="h-4 w-4 mr-2" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-3">
                  <span className="text-accent font-semibold text-lg">
                    {language === 'en' ? 'Legal Insights & Articles' : 'الأفكار والمقالات القانونية'}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                {language === 'en' ? (
                  <>Stay <span className="text-accent">Informed</span> with Expert Legal Insights</>
                ) : (
                  <>ابق <span className="text-accent">مطلعاً</span> مع الأفكار القانونية المتخصصة</>
                )}
              </h1>
              
              <p className="text-xl md:text-2xl text-neutral-200 max-w-3xl mx-auto leading-relaxed mb-12">
                {language === 'en' 
                  ? 'Discover the latest legal developments, expert analysis, and practical guidance from our experienced legal professionals.'
                  : 'اكتشف أحدث التطورات القانونية والتحليلات المتخصصة والإرشادات العملية من محترفينا القانونيين ذوي الخبرة.'
                }
              </p>

              {/* Search and Filter Section */}
              <div className="max-w-5xl mx-auto">
                <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    <div className="relative flex-1">
                      <Search className={`absolute top-1/2 transform -translate-y-1/2 text-white/70 h-6 w-6 ${language === 'ar' ? 'right-6' : 'left-6'}`} />
                      <Input
                        type="text"
                        placeholder={language === 'en' ? 'Search legal articles and insights...' : 'البحث في المقالات والأفكار القانونية...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`h-16 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-accent transition-all duration-300 rounded-2xl ${language === 'ar' ? 'pr-16 text-right' : 'pl-16'}`}
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className={`rounded-full px-6 py-3 text-base font-semibold transition-all duration-300 ${
                          selectedCategory === category 
                            ? 'bg-accent text-white border-accent hover:bg-accent/90 shadow-lg shadow-accent/30' 
                            : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-accent backdrop-blur-sm'
                        }`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Blog Posts Grid */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container-max">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-legal-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-legal-navy/50" />
                </div>
                <h3 className="text-3xl font-bold text-legal-navy mb-4">
                  {language === 'en' ? 'No articles found' : 'لم يتم العثور على مقالات'}
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  {language === 'en' 
                    ? 'Try adjusting your search or filter criteria to find relevant legal articles.'
                    : 'حاول تعديل معايير البحث أو التصفية للعثور على مقالات قانونية ذات صلة.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-legal-navy mb-4">
                  {language === 'en' ? 'Latest Legal Insights' : 'أحدث الأفكار القانونية'}
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                  {language === 'en' 
                    ? 'Expert analysis and practical guidance from our legal professionals'
                    : 'التحليل المتخصص والإرشادات العملية من محترفينا القانونيين'
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {filteredPosts.map((post, index) => (
                  <AnimatedSection key={post.id} delay={index * 0.1}>
                    <article 
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      className="bg-white rounded-3xl shadow-xl border border-neutral-100 overflow-hidden hover:shadow-2xl hover:shadow-legal-navy/5 transition-all duration-500 cursor-pointer group hover:-translate-y-3 h-full flex flex-col"
                    >
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden h-64">
                        <LazyImage
                          src={post.thumbnail}
                          alt={post.title[language]}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-legal-navy/80 via-legal-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className={`absolute top-6 ${language === 'ar' ? 'right-6' : 'left-6'}`}>
                          <Badge className="bg-accent text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                            {post.category[language]}
                          </Badge>
                        </div>

                        {/* Read More Arrow */}
                        <div className={`absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 ${language === 'ar' ? 'left-6' : 'right-6'}`}>
                          <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center shadow-xl">
                            <ArrowRight className={`w-5 h-5 text-white ${language === 'ar' ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-1 flex flex-col">
                        {/* Meta Information */}
                        <div className={`flex items-center text-sm text-neutral-500 mb-4 ${language === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="font-medium">{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="font-medium">{post.readTime[language]}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-legal-navy mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                          {post.title[language]}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-3 text-base flex-grow">
                          {post.excerpt[language]}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags[language].slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs px-3 py-1 border border-neutral-200 hover:border-accent hover:text-accent transition-colors">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-br from-accent to-accent/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-3 shadow-lg">
                              {post.author.charAt(0)}
                            </div>
                            <span className="text-base font-semibold text-legal-navy">{post.author}</span>
                          </div>
                          
                          <div className="text-accent font-semibold text-sm group-hover:text-legal-navy transition-colors duration-300">
                            {language === 'en' ? 'Read More' : 'اقرأ المزيد'}
                          </div>
                        </div>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}

          {/* Load More Button */}
          <div className="text-center mt-16">
            <Button className="bg-gradient-to-r from-legal-navy to-legal-navy/90 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-accent hover:to-accent/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {language === 'en' ? 'Load More Articles' : 'تحميل المزيد من المقالات'}
              <ArrowRight className={`w-5 h-5 ml-3 ${language === 'ar' ? 'rotate-180 ml-0 mr-3' : ''}`} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;