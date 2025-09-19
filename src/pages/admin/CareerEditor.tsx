import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CareerService, CareerItem } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const CareerEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (CareerService.get(id) as CareerItem | undefined) : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [titleAr, setTitleAr] = useState<string>(existing?.title_ar || '');
  const [location, setLocation] = useState(existing?.location || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [descriptionAr, setDescriptionAr] = useState<string>(existing?.description_ar || '');
  const [requirements, setRequirements] = useState(existing?.requirements || '');
  const [requirementsAr, setRequirementsAr] = useState<string>(existing?.requirements_ar || '');
  const [applicationLink, setApplicationLink] = useState(existing?.applicationLink || '');

  useEffect(() => {
    if (existing) {
      setTitle(existing.title || '');
      setTitleAr(existing.title_ar || '');
      setLocation(existing.location || '');
      setDescription(existing.description || '');
      setDescriptionAr(existing.description_ar || '');
      setRequirements(existing.requirements || '');
      setRequirementsAr(existing.requirements_ar || '');
      setApplicationLink(existing.applicationLink || '');
    }
  }, [id, existing]);

  const save = () => {
    if (!title) return alert('Title required');
    if (existing) {
      CareerService.update(existing.id, { title, title_ar: titleAr, location, description, description_ar: descriptionAr, requirements, requirements_ar: requirementsAr, applicationLink });
    } else {
      CareerService.create({ title, title_ar: titleAr, location, description, description_ar: descriptionAr, requirements, requirements_ar: requirementsAr, applicationLink });
    }
    navigate('/admin/careers');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Job Title</label>
        <input className="contact-input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <input className="contact-input" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Application Link</label>
          <input className="contact-input" value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea rows={6} className="w-full p-4 border border-neutral-200 rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Requirements</label>
        <textarea rows={4} className="w-full p-4 border border-neutral-200 rounded-lg" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/careers')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default CareerEditor;
