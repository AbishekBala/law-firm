import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService, TeamMember } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const TeamEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (TeamService.get(id) as TeamMember | undefined) : undefined;

  const [name, setName] = useState(existing?.name || '');
  const [nameAr, setNameAr] = useState<string>(existing?.name_ar || '');
  const [role, setRole] = useState(existing?.role || '');
  const [roleAr, setRoleAr] = useState<string>(existing?.role_ar || '');
  const [photo, setPhoto] = useState(existing?.photo || '');
  const [bio, setBio] = useState(existing?.bio || '');
  const [bioAr, setBioAr] = useState<string>(existing?.bio_ar || '');
  const [social, setSocial] = useState<Record<string,string>>(existing?.social || {});

  useEffect(() => {
    if (existing) {
      setName(existing.name || '');
      setNameAr(existing.name_ar || '');
      setRole(existing.role || '');
      setRoleAr(existing.role_ar || '');
      setPhoto(existing.photo || '');
      setBio(existing.bio || '');
      setBioAr(existing.bio_ar || '');
      setSocial(existing.social || {});
    }
  }, [id, existing]);

  const save = () => {
    if (!name) return alert('Name required');
    if (existing) {
      TeamService.update(existing.id, { name, name_ar: nameAr, role, role_ar: roleAr, photo, bio, bio_ar: bioAr, social });
    } else {
      TeamService.create({ name, name_ar: nameAr, role, role_ar: roleAr, photo, bio, bio_ar: bioAr, social });
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
