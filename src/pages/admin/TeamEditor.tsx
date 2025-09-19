import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TeamService, TeamMember } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const TeamEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? (TeamService.get(id) as TeamMember | undefined) : undefined;

  const [name, setName] = useState(existing?.name || '');
  const [role, setRole] = useState(existing?.role || '');
  const [bio, setBio] = useState(existing?.bio || '');
  const [socialLinks, setSocialLinks] = useState<{ linkedin?: string; twitter?: string; }>(existing?.social || {} as any);

  useEffect(() => {
    if (existing) {
      setName(existing.name || '');
      setRole(existing.role || '');
      setBio(existing.bio || '');
      setSocialLinks(existing.social || {} as any);
    }
  }, [id, existing]);

  const save = () => {
    if (!name) return alert('Name required');
    if (existing) {
      TeamService.update(existing.id, { name, role, bio, social: socialLinks });
    } else {
      TeamService.create({ name, role, bio, social: socialLinks });
    }
    navigate('/admin/team');
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input className="contact-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input className="contact-input" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea rows={4} className="w-full p-4 border border-neutral-200 rounded-lg" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Social Links</label>
            <div className="grid grid-cols-1 gap-2">
              <input className="contact-input" placeholder="LinkedIn URL" value={socialLinks.linkedin || ''} onChange={(e) => setSocialLinks(s => ({ ...s, linkedin: e.target.value }))} />
              <input className="contact-input" placeholder="Twitter URL" value={socialLinks.twitter || ''} onChange={(e) => setSocialLinks(s => ({ ...s, twitter: e.target.value }))} />
            </div>
          </div>
        </div>

        <aside>
          <div className="text-center">
            <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-3 bg-neutral-100 flex items-center justify-center text-xl font-semibold text-neutral-600">
              {name ? name.split(' ').map(n => n[0]).slice(0,2).join('') : 'NN'}
            </div>
            <div className="font-semibold">{name || 'Full Name'}</div>
            <div className="text-sm text-neutral-500">{role || 'Role'}</div>
            <p className="text-sm text-neutral-600 mt-3 line-clamp-4">{bio || 'Short bio will appear here.'}</p>
            <div className="mt-3 space-y-1 text-sm">
              {socialLinks.linkedin && <a className="text-legal-gold" href={socialLinks.linkedin}>LinkedIn</a>}
              {socialLinks.twitter && <a className="text-legal-gold" href={socialLinks.twitter}>Twitter</a>}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate('/admin/team')}>Cancel</Button>
        <Button className="btn-primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default TeamEditor;
