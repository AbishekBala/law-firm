import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogService, BlogPost } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? BlogService.get(id) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [category, setCategory] = useState(existing?.category || 'general');
  const [featuredImage, setFeaturedImage] = useState(existing?.featuredImage || '');
  const [content, setContent] = useState(existing?.content || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setCategory(existing.category || 'general');
      setFeaturedImage(existing.featuredImage || '');
      setContent(existing.content || '');
    }
  }, [id]);

  const save = () => {
    if (!title) return alert('Title required');
    if (existing) {
      BlogService.update(existing.id, { title, category, featuredImage, content });
    } else {
      BlogService.create({ title, category, featuredImage, content });
    }
    navigate('/admin/blogs');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input className="contact-input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input className="contact-input" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Featured Image URL</label>
          <input className="contact-input" value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea rows={12} className="w-full p-4 border border-neutral-200 rounded-lg" value={content} onChange={(e) => setContent(e.target.value)} />
        <div className="mt-2 text-xs text-neutral-500">Simple rich-text is not included; paste HTML or use Markdown.</div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default BlogEditor;
