import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogService, BlogPost } from '@/services/storageService';
import { Button } from '@/components/ui/button';

// Top-level React component for structured content editing
const StructuredContentEditor = ({ lang, rtl = false }) => {
  const [sections, setSections] = React.useState([
    { type: 'heading', value: '', image: '' },
    { type: 'content', value: '', image: '' }
  ]);
  // Handle image upload
  const handleImageUpload = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      updateSection(idx, 'image', e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Localized labels and options
  const labels = {
    heading: lang === 'ar' ? 'العنوان الفرعي' : 'Subheading',
    content: lang === 'ar' ? 'المحتوى' : 'Content',
    image: lang === 'ar' ? 'رابط الصورة' : 'Image URL',
    addHeading: lang === 'ar' ? 'إضافة عنوان فرعي' : 'Add Subheading',
    addContent: lang === 'ar' ? 'إضافة محتوى' : 'Add Content',
    addImage: lang === 'ar' ? 'إضافة صورة' : 'Add Image',
    remove: lang === 'ar' ? 'حذف' : 'Remove',
    selectHeading: lang === 'ar' ? 'عنوان فرعي' : 'Subheading',
    selectContent: lang === 'ar' ? 'محتوى' : 'Content',
    selectImage: lang === 'ar' ? 'صورة' : 'Image',
  };

  const addSection = (type) => {
    setSections([...sections, { type, value: '', image: '' }]);
  };

  const updateSection = (idx, field, value) => {
    setSections(sections.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const removeSection = (idx) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className={`relative flex flex-col gap-3 p-5 rounded-xl shadow-md border border-legal-navy bg-white ${rtl ? 'text-right' : ''}`}
          style={{
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
            border: '1px solid var(--legal-navy)',
          }}
        >
          <div className="flex gap-3 items-center mb-2">
            <select
              className="contact-input w-36 font-semibold bg-white border border-legal-navy rounded-lg shadow-sm focus:ring-2 focus:ring-legal-gold"
              value={section.type}
              onChange={e => updateSection(idx, 'type', e.target.value)}
              dir={rtl ? 'rtl' : 'ltr'}
            >
              <option value="heading">{labels.selectHeading}</option>
              <option value="content">{labels.selectContent}</option>
              <option value="image">{labels.selectImage}</option>
            </select>
            <Button variant="destructive" size="sm" className="rounded px-3 py-1.5 bg-legal-gold text-legal-navy shadow-sm hover:bg-legal-gold-dark transition-colors" onClick={() => removeSection(idx)}>{labels.remove}</Button>
          </div>
          {section.type === 'heading' && (
            <input
              className={`contact-input font-bold text-lg bg-white border border-legal-navy rounded-lg shadow-sm px-4 py-2 ${rtl ? 'text-right' : ''}`}
              placeholder={labels.heading}
              value={section.value}
              onChange={e => updateSection(idx, 'value', e.target.value)}
              dir={rtl ? 'rtl' : 'ltr'}
              style={{ letterSpacing: '0.01em' }}
            />
          )}
          {section.type === 'content' && (
            <textarea
              rows={10}
              className={`contact-input bg-white border border-legal-navy rounded-lg shadow-sm px-4 py-3 text-base ${rtl ? 'text-right' : ''}`}
              placeholder={labels.content}
              value={section.value}
              onChange={e => updateSection(idx, 'value', e.target.value)}
              dir={rtl ? 'rtl' : 'ltr'}
              style={{ minHeight: '220px', resize: 'vertical', fontFamily: 'inherit', lineHeight: '1.7' }}
            />
          )}
          {section.type === 'image' && (
            <div className="flex flex-row gap-5 items-center">
              {section.image && (
                <div className="flex-shrink-0">
                  <img
                    src={section.image}
                    alt={lang === 'ar' ? 'معاينة الصورة' : 'Image preview'}
                    style={{ maxHeight: '160px', maxWidth: '260px', objectFit: 'cover', borderRadius: '12px', border: '2px solid var(--legal-gold)', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-sm font-semibold mb-1 text-legal-navy">{lang === 'ar' ? 'رفع صورة' : 'Upload Image'}</label>
                <input
                  type="file"
                  accept="image/*"
                  className="contact-input bg-white border border-legal-navy rounded-lg shadow-sm"
                  onChange={e => handleImageUpload(idx, e.target.files[0])}
                />
                <div
                  className="border-dashed border-2 border-legal-gold rounded-lg p-2 text-center cursor-pointer text-legal-navy bg-legal-gold-light hover:bg-legal-gold transition-colors"
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleImageUpload(idx, e.dataTransfer.files[0]);
                    }
                  }}
                >
                  {lang === 'ar' ? 'اسحب الصورة هنا' : 'Drag image here'}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-4 mt-4 justify-center">
  <Button size="sm" className="rounded px-5 py-2 bg-legal-navy text-white font-semibold shadow-sm hover:bg-legal-gold hover:text-white transition-colors" onClick={() => addSection('heading')}>{labels.addHeading}</Button>
  <Button size="sm" className="rounded px-5 py-2 bg-legal-navy text-white font-semibold shadow-sm hover:bg-legal-gold hover:text-white transition-colors" onClick={() => addSection('content')}>{labels.addContent}</Button>
  <Button size="sm" className="rounded px-5 py-2 bg-legal-navy text-white font-semibold shadow-sm hover:bg-legal-gold hover:text-white transition-colors" onClick={() => addSection('image')}>{labels.addImage}</Button>
      </div>
    </div>
  );
};

const BlogEditor = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (BlogService.get(id) as BlogPost | undefined) : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [titleAr, setTitleAr] = useState<string>(existing?.title_ar || '');
  const [categories, setCategories] = useState([existing?.category || 'general']);
  const [content, setContent] = useState(existing?.content || '');
  const [contentAr, setContentAr] = useState<string>(existing?.content_ar || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setTitleAr(existing.title_ar || '');
      setCategories([existing.category || 'general']);
      // If content was stored with HTML tags, strip them for editing so the editor shows plain text
      setContent((existing.content || '').replace(/<[^>]+>/g, ''));
      setContentAr((existing.content_ar || '').replace(/<[^>]+>/g, ''));
    }
  }, [id, existing]);

  const slug = useMemo(() => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), [title]);

  const save = () => {
    if (!title) return alert('Title required');
    const sanitized = (content || '').replace(/<[^>]+>/g, '');
    const selectedCategory = categories[0] || 'general';
    if (existing) {
      BlogService.update(existing.id, { title, title_ar: titleAr, category: selectedCategory, content: sanitized, content_ar: contentAr });
    } else {
      BlogService.create({ title, title_ar: titleAr, category: selectedCategory, content: sanitized, content_ar: contentAr });
    }
    navigate('/admin/blogs');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-neutral-100 rounded-full overflow-hidden w-fit border border-neutral-200">
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium focus:outline-none transition-colors min-w-[70px] ${lang === 'en' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'}`}
            onClick={() => setLang('en')}
            style={{ borderRadius: lang === 'en' ? '9999px 0 0 9999px' : '9999px 0 0 9999px' }}
          >
            English
          </button>
          <button
            type="button"
            className={`px-3 py-1.5 text-sm font-medium focus:outline-none transition-colors min-w-[70px] ${lang === 'ar' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500'}`}
            onClick={() => setLang('ar')}
            style={{ borderRadius: lang === 'ar' ? '0 9999px 9999px 0' : '0 9999px 9999px 0' }}
          >
            العربية
          </button>
        </div>
      </div>
      {lang === 'en' ? (
        <div>
          <label className="block text-sm font-medium mb-2">Title (English)</label>
          <input className="contact-input mb-3" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              {categories.map((cat, idx) => {
                // All possible options
                const allOptions = [
                  { value: 'general', label: String(lang) === 'ar' ? 'عام' : 'General' },
                  { value: 'legal-updates', label: String(lang) === 'ar' ? 'تحديثات قانونية' : 'Legal Updates' },
                  { value: 'insights', label: String(lang) === 'ar' ? 'رؤى' : 'Insights' },
                  { value: 'case-studies', label: String(lang) === 'ar' ? 'دراسات حالة' : 'Case Studies' },
                  { value: 'events', label: String(lang) === 'ar' ? 'فعاليات' : 'Events' },
                  { value: 'news', label: String(lang) === 'ar' ? 'أخبار' : 'News' },
                  { value: 'guides', label: String(lang) === 'ar' ? 'أدلة' : 'Guides' },
                ];
                // Remove already selected except for current dropdown
                const used = categories.filter((_, i) => i !== idx);
                const availableOptions = allOptions.filter(opt => !used.includes(opt.value) || opt.value === cat);
                return (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <select
                      className={String(lang) === 'ar' ? "contact-input text-right" : "contact-input"}
                      value={cat}
                      onChange={e => {
                        const newCats = [...categories];
                        newCats[idx] = e.target.value;
                        setCategories(newCats);
                      }}
                    >
                      {availableOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {idx === categories.length - 1 && availableOptions.length > 1 && categories.length < allOptions.length && (
                      <Button size="sm" variant="outline" onClick={() => {
                        // Find first unused option
                        const unused = allOptions.find(opt => !categories.includes(opt.value));
                        if (unused) setCategories([...categories, unused.value]);
                      }}>
                        +
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Content Sections (English)</label>
            <StructuredContentEditor lang="en" />
          </div>
        </div>
      ) : (
        <div dir="rtl">
          <label className="block text-sm font-medium mb-2">العنوان (بالعربية)</label>
          <input dir="rtl" className="contact-input text-right mb-3" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="أدخل عنوان المقال" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">التصنيف</label>
              {categories.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <select
                    className="contact-input text-right"
                    value={cat}
                    onChange={e => {
                      const newCats = [...categories];
                      newCats[idx] = e.target.value;
                      setCategories(newCats);
                    }}
                  >
                    <option value="general">عام</option>
                    <option value="legal-updates">تحديثات قانونية</option>
                    <option value="insights">رؤى</option>
                  </select>
                  {idx === categories.length - 1 && (
                    <Button size="sm" variant="outline" onClick={() => setCategories([...categories, 'general'])}>
                      +
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">أقسام المحتوى (بالعربية)</label>
            <StructuredContentEditor lang="ar" rtl />
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>
          {lang === 'ar' ? 'إلغاء' : 'Cancel'}
        </Button>
        <Button className="btn-primary" onClick={save}>
          {lang === 'ar' ? 'حفظ' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default BlogEditor;
