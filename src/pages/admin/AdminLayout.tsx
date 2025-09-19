import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/services/adminAuth';
import logo from '@/assets/logo-new.png';
import ensureSeedData from '@/services/seedAdminData';
import avatarPlaceholder from '@/assets/logo.png';
import { Grid, FileText, Briefcase, Users, User } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, signOut } = useAdminAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    ensureSeedData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#071427]">
      {/* Fixed left sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-72 bg-blue-600 text-white flex flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 rounded-lg p-2">
              <img src={logo} alt="logo" className="h-9 w-9 rounded" />
            </div>
            <div>
              <div className="font-semibold text-lg tracking-wide">ABF Legal</div>
              <div className="text-xs text-white/80">Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-2 mt-4">
            <Link to="/admin" className={`admin-sidebar-link ${window.location.pathname === '/admin' ? 'active' : ''}`}><Grid className="inline mr-2 align-middle" /> Dashboard</Link>
            <Link to="/admin/blogs" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/blogs') ? 'active' : ''}`}><FileText className="inline mr-2 align-middle" /> Blogs</Link>
            <Link to="/admin/careers" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/careers') ? 'active' : ''}`}><Briefcase className="inline mr-2 align-middle" /> Careers</Link>
            <Link to="/admin/team" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/team') ? 'active' : ''}`}><Users className="inline mr-2 align-middle" /> Team</Link>
          </nav>
        </div>

        <div>
          <div className="mb-4">
            {isAuthenticated ? (
              <button className="w-full bg-transparent border border-white/20 text-white px-4 py-2 rounded-md hover:bg-white/6" onClick={() => { signOut(); navigate('/'); }}>Sign out</button>
            ) : (
              <Link to="/admin/signin"><button className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md">Sign in</button></Link>
            )}
          </div>

          <div className="mt-6 text-xs text-white/70 border-t border-white/6 pt-4">
            <div>© {new Date().getFullYear()} ABF Legal. All rights reserved.</div>
            <div className="mt-2">Need assistance? Contact support@abf.sa</div>
          </div>
        </div>
      </aside>

      {/* Main content (push right to leave room for sidebar) */}
      <main className="ml-72 p-8">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="font-semibold">Ali Bin Fahad</div>
              <div className="text-xs text-neutral-500">Admin Manager</div>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
              <User />
            </div>
          </div>
        </div>

        <div className="container-max">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
