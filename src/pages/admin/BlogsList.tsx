import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';

const BlogsList = () => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(blogPosts);
  const navigate = useNavigate();

  // Dummy remove for frontend-only demo
  const remove = (id: number) => {
    if (!confirm('Delete this post?')) return;
    setItems(items.filter(post => post.id !== id));
  };

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter(i =>
      i.title.en.toLowerCase().includes(query.toLowerCase()) ||
      i.title.ar.toLowerCase().includes(query.toLowerCase()) ||
      i.excerpt.en.toLowerCase().includes(query.toLowerCase()) ||
      i.excerpt.ar.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Blog Posts</h3>
          <div className="text-sm text-neutral-500">Manage articles and categories.</div>
        </div>

        <div className="flex items-center gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..." className="contact-input" />
          <Button className="btn-primary" onClick={() => navigate('/admin/blogs/new')}>New Post</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 && <div className="text-neutral-500">No posts match your search</div>}
        {filtered.map((it) => (
          <article key={it.id} className="p-4 bg-white rounded-xl shadow-sm flex flex-col gap-3 border border-neutral-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold text-compact-heading">{it.title.en}</div>
                <div className="text-sm text-neutral-500 mt-1">{it.category.en} • {new Date(it.date).toLocaleDateString()}</div>
              </div>
              <div className="text-sm text-neutral-400">{it.tags.en.join(', ')}</div>
            </div>

            <p className="text-sm text-neutral-600 mt-1 line-clamp-3">{it.excerpt.en.slice(0, 200)}{it.excerpt.en.length > 200 ? '…' : ''}</p>

            <div className="mt-2 flex items-center gap-2">
              <Link to={`/admin/blogs/${it.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => remove(it.id)}>Delete</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
