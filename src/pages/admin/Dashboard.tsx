import React from 'react';
import { BlogService, CareerService, TeamService } from '@/services/storageService';
import { Link } from 'react-router-dom';
import { Users, Briefcase, FileText, User } from 'lucide-react';

const Dashboard: React.FC = () => {
  const blogs = BlogService.list();
  const careers = CareerService.list();
  const team = TeamService.list();

  return (
    <div className="admin-fade-in">
      <div className="grid grid-cols-12 gap-4 items-start mb-6">
        <div className="col-span-12 lg:col-span-4">
          <h1 className="admin-compact-heading font-semibold text-legal-navy">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-1 admin-compact-text">Welcome back, <span className="font-semibold">Ali Bin Fahad</span></p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
            <StatCard label="Total Blogs" value={blogs.length} Icon={FileText} />
            <StatCard label="Open Positions" value={careers.length} Icon={Briefcase} />
            <StatCard label="Team Members" value={team.length} Icon={Users} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl p-4 shadow-sm admin-compact-card">
            <h3 className="text-md font-semibold mb-3">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/admin/blogs"><button className="px-3 py-2 rounded-md bg-legal-gold text-white hover:shadow-sm transition-all admin-compact-text">Manage Blogs</button></Link>
              <Link to="/admin/careers"><button className="px-3 py-2 rounded-md bg-legal-gold text-white hover:shadow-sm transition-all admin-compact-text">Manage Careers</button></Link>
              <Link to="/admin/team"><button className="px-3 py-2 rounded-md bg-legal-gold text-white hover:shadow-sm transition-all admin-compact-text">Manage Team</button></Link>
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm admin-compact-card">
            <div>
              <div className="text-sm text-neutral-400">Admin</div>
              <div className="font-semibold">Ali Bin Fahad</div>
              <div className="text-xs text-neutral-400">Managing Partner</div>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm">
              <User />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

type StatCardProps = {
  label: string;
  value: number;
  Icon: React.ComponentType<any>;
};

function StatCard({ label, value, Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg admin-compact-card shadow-sm w-full sm:w-56 flex items-center justify-between">
      <div className="p-3">
        <div className="text-sm text-neutral-400">{label}</div>
        <div className="text-xl font-bold text-legal-gold mt-1">{value}</div>
      </div>
      <div className="p-3 text-neutral-300"><Icon /></div>
    </div>
  );
}

export default Dashboard;
