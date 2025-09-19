import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CareerService } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const CareersList = () => {
  const all = CareerService.list();
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(all);
  const navigate = useNavigate();

  const remove = (id: string) => {
    if (!confirm('Delete this position?')) return;
    CareerService.remove(id);
    setItems(CareerService.list());
  };

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter(i => i.title.toLowerCase().includes(query.toLowerCase()) || (i.location || '').toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Careers</h3>
          <div className="text-sm text-neutral-500">Open positions and applicants overview.</div>
        </div>

        <div className="flex items-center gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs..." className="contact-input" />
          <Button className="btn-primary" onClick={() => navigate('/admin/careers/new')}>New Position</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 && <div className="text-neutral-500">No positions match your search</div>}
        {filtered.map((it) => (
          <article key={it.id} className="p-4 bg-white rounded-xl shadow-sm flex items-start gap-4 border border-neutral-100">
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-compact-heading">{it.title}</div>
                  <div className="text-sm text-neutral-500 mt-1">{it.location} • Posted {new Date(it.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-neutral-400">{it.department}</div>
              </div>

              <p className="text-sm text-neutral-600 mt-2 line-clamp-3">{(it.description || '').slice(0, 220)}{(it.description || '').length > 220 ? '…' : ''}</p>

              <div className="mt-3 flex items-center gap-2">
                <Link to={`/admin/careers/${it.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => remove(it.id)}>Delete</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CareersList;
