import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const TeamEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? TeamService.get(id) : null;

  const [name, setName] = useState(existing?.name || '');
  const [role, setRole] = useState(existing?.role || '');
  const [photo, setPhoto] = useState(existing?.photo || '');
  const [bio, setBio] = useState(existing?.bio || '');
  const [social, setSocial] = useState<Record<string,string>>(existing?.social || {});

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setRole(existing.role || '');
      setPhoto(existing.photo || '');
      setBio(existing.bio || '');
      setSocial(existing.social || {});
    }
  }, [id]);

  const save = () => {
    if (!name) return alert('Name required');
    if (existing) {
      TeamService.update(existing.id, { name, role, photo, bio, social });
    } else {
      TeamService.create({ name, role, photo, bio, social });
    }
    navigate('/admin/team');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input className="contact-input" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Role</label>
          <input className="contact-input" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Photo URL</label>
          <input className="contact-input" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Bio</label>
        <textarea rows={4} className="w-full p-4 border border-neutral-200 rounded-lg" value={bio} onChange={(e) => setBio(e.target.value)} />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-2">Social Links (JSON)</label>
        <textarea rows={3} className="w-full p-3 border border-neutral-200 rounded-lg" value={JSON.stringify(social)} onChange={(e) => {
          try { setSocial(JSON.parse(e.target.value)); } catch { /* ignore */ }
        }} />
        <div className="text-xs text-neutral-500 mt-1">Enter JSON like {`{"linkedin":"https://...","twitter":"https://..."}`}</div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/team')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default TeamEditor;
