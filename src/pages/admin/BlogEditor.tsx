import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogService, BlogPost } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (BlogService.get(id) as BlogPost | undefined) : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [titleAr, setTitleAr] = useState<string>(existing?.title_ar || '');
  const [category, setCategory] = useState(existing?.category || 'general');
  const [featuredImage, setFeaturedImage] = useState(existing?.featuredImage || '');
  const [content, setContent] = useState(existing?.content || '');
  const [contentAr, setContentAr] = useState<string>(existing?.content_ar || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setTitleAr(existing.title_ar || '');
      setCategory(existing.category || 'general');
      setFeaturedImage(existing.featuredImage || '');
      setContent(existing.content || '');
      setContentAr(existing.content_ar || '');
    }
  }, [id, existing]);

  const save = () => {
    if (!title) return alert('Title required');
    if (existing) {
      BlogService.update(existing.id, { title, title_ar: titleAr, category, featuredImage, content, content_ar: contentAr });
    } else {
      BlogService.create({ title, title_ar: titleAr, category, featuredImage, content, content_ar: contentAr });
    }
    navigate('/admin/blogs');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* English column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title (English)</label>
            <input className="contact-input" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <input className="contact-input" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
            <input className="contact-input" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Content (English)</label>
            <textarea rows={12} className="w-full p-4 border border-neutral-200 rounded-lg" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="mt-2 text-xs text-neutral-500">Simple rich-text is not included; paste HTML or use Markdown.</div>
          </div>
        </div>

        {/* Arabic column */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">العنوان (بالعربية)</label>
            <input dir="rtl" className="contact-input text-right" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">صورة مميزة (الرابط)</label>
            <input className="contact-input" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">المحتوى (بالعربية)</label>
            <textarea dir="rtl" rows={12} className="w-full p-4 border border-neutral-200 rounded-lg text-right" value={contentAr} onChange={(e) => setContentAr(e.target.value)} />
            <div className="mt-2 text-xs text-neutral-500">يمكنك لصق HTML أو Markdown هنا.</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default BlogEditor;
