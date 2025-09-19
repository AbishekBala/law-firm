import { BlogService, CareerService, TeamService } from '@/services/storageService';
import { Link } from 'react-router-dom';
import { Users, Briefcase, FileText, User } from 'lucide-react';

const Dashboard = () => {
  const blogs = BlogService.list();
  const careers = CareerService.list();
  const team = TeamService.list();

  return (
    <div className="admin-fade-in">
      <div className="grid grid-cols-12 gap-6 items-start mb-8">
        {/* Left: Title + greeting */}
        <div className="col-span-12 lg:col-span-4">
          <h1 className="text-3xl md:text-4xl font-bold text-legal-navy">Admin Dashboard</h1>
          <p className="text-neutral-500 mt-2">Welcome back, <span className="font-semibold">Ali Bin Fahad</span></p>
        </div>

        {/* Right: stats */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-full sm:w-64 admin-card flex items-center justify-between border border-neutral-100">
              <div>
                <div className="text-sm text-neutral-500">Total Blogs</div>
                <div className="text-2xl font-bold text-legal-gold mt-2">{blogs.length}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-legal-gold/10 flex items-center justify-center">
                <FileText className="text-legal-gold" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg w-full sm:w-64 admin-card flex items-center justify-between border border-neutral-100">
              <div>
                <div className="text-sm text-neutral-500">Open Positions</div>
                <div className="text-2xl font-bold text-legal-gold mt-2">{careers.length}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center">
                <Briefcase className="text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg w-full sm:w-64 admin-card flex items-center justify-between border border-neutral-100">
              <div>
                <div className="text-sm text-neutral-500">Team Members</div>
                <div className="text-2xl font-bold text-legal-gold mt-2">{team.length}</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Users className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm admin-card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/blogs"><button className="px-4 py-2 rounded-md bg-legal-gold text-white hover:shadow-lg transition-all admin-card">Manage Blogs</button></Link>
              <Link to="/admin/careers"><button className="px-4 py-2 rounded-md bg-legal-gold text-white hover:shadow-lg transition-all admin-card">Manage Careers</button></Link>
              <Link to="/admin/team"><button className="px-4 py-2 rounded-md bg-legal-gold text-white hover:shadow-lg transition-all admin-card">Manage Team</button></Link>
            </div>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm">
            <div>
              <div className="text-sm text-neutral-400">Admin</div>
              <div className="font-semibold">Ali Bin Fahad</div>
              <div className="text-xs text-neutral-400">Managing Partner</div>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              <User />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
