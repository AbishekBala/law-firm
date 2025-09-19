import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TeamService } from '@/services/storageService';
import { Button } from '@/components/ui/button';

const TeamList = () => {
  const [items, setItems] = useState(TeamService.list());
  const navigate = useNavigate();

  const remove = (id: string) => {
    if (!confirm('Delete this team member?')) return;
    TeamService.remove(id);
    setItems(TeamService.list());
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Team Members</h3>
        <div>
          <Button className="btn-primary" onClick={() => navigate('/admin/team/new')}>New Member</Button>
        </div>
      </div>

      <div className="space-y-4">
        {items.length === 0 && <div className="text-neutral-500">No team members yet</div>}
        {items.map((it) => (
          <div key={it.id} className="p-4 bg-white rounded-xl shadow-sm flex items-center justify-between border border-neutral-100">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-neutral-500">{it.role} • {new Date(it.createdAt).toLocaleString()}</div>
            </div>
            <div className="space-x-2">
              <Link to={`/admin/team/${it.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => remove(it.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
