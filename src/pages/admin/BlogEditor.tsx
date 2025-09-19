import { useState, useEffect, useMemo } from 'react';
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
  const [content, setContent] = useState(existing?.content || '');
  const [contentAr, setContentAr] = useState<string>(existing?.content_ar || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setTitleAr(existing.title_ar || '');
      setCategory(existing.category || 'general');
      // If content was stored with HTML tags, strip them for editing so the editor shows plain text
      setContent((existing.content || '').replace(/<[^>]+>/g, ''));
      setContentAr((existing.content_ar || '').replace(/<[^>]+>/g, ''));
    }
  }, [id, existing]);

  const slug = useMemo(() => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), [title]);

  const save = () => {
    if (!title) return alert('Title required');
    const sanitized = (content || '').replace(/<[^>]+>/g, '');
    if (existing) {
      BlogService.update(existing.id, { title, title_ar: titleAr, category, content: sanitized, content_ar: contentAr });
    } else {
      BlogService.create({ title, title_ar: titleAr, category, content: sanitized, content_ar: contentAr });
    }
    navigate('/admin/blogs');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Title (English)</label>
          <input className="contact-input mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="contact-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="general">General</option>
                <option value="legal-updates">Legal Updates</option>
                <option value="insights">Insights</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug (auto)</label>
              <div className="contact-input bg-neutral-50">/blog/{slug || 'your-title'}</div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Content (English)</label>
            <textarea rows={12} className="w-full p-4 border border-neutral-200 rounded-lg" value={content} onChange={(e) => setContent(e.target.value)} />
            <div className="mt-2 text-xs text-neutral-500">Use Markdown or paste HTML. Consider a future WYSIWYG editor.</div>
          </div>
        </div>

        <aside className="w-80">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">العنوان (بالعربية)</label>
            <input dir="rtl" className="contact-input text-right" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">المحتوى (بالعربية)</label>
            <textarea dir="rtl" rows={6} className="w-full p-4 border border-neutral-200 rounded-lg text-right" value={contentAr} onChange={(e) => setContentAr(e.target.value)} />
          </div>
        </aside>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default BlogEditor;
