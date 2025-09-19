import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CareerService, CareerItem } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const CareerEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (CareerService.get(id) as CareerItem | undefined) : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [location, setLocation] = useState(existing?.location || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [requirements, setRequirements] = useState(existing?.requirements || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setLocation(existing.location || '');
      setDescription(existing.description || '');
      setRequirements(existing.requirements || '');
    }
  }, [id, existing]);

  const save = () => {
    if (!title) return alert('Title required');
    if (existing) {
      CareerService.update(existing.id, { title, location, description, requirements });
    } else {
      CareerService.create({ title, location, description, requirements });
    }
    navigate('/admin/careers');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <input className="contact-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior Associate - Litigation" />
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input className="contact-input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or Remote" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea rows={6} className="w-full p-4 border border-neutral-200 rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description of role and responsibilities." />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <textarea rows={4} className="w-full p-4 border border-neutral-200 rounded-lg" value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="One per line or comma-separated." />
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-neutral-50 p-4 rounded-lg">
            <div className="text-sm text-neutral-500">Preview</div>
            <div className="mt-3">
              <div className="font-semibold">{title || 'Position title'}</div>
              <div className="text-sm text-neutral-400">{location || 'Location'}</div>
              <p className="text-sm text-neutral-600 mt-3 line-clamp-4">{description || 'Short description will appear here.'}</p>
            </div>

            <div className="mt-4">
              <div className="text-sm text-neutral-400">No external application link</div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/careers')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default CareerEditor;
