import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/services/adminAuth';
import logo from '@/assets/logo-white.png';
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
      <aside className="fixed left-0 top-0 h-screen w-80 bg-legal-navy text-white flex flex-col justify-between p-6">
        <div>
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="bg-white/5 rounded-lg p-3 w-full flex items-center justify-center">
              {/* Full logo instead of small icon */}
              <img src={logo} alt="Ali Bin Fahad Law Firm" className="h-14 w-auto" />
            </div>
            <div className="text-center mt-2">
              <div className="font-semibold text-lg tracking-wide">Ali Bin Fahad Law Firm</div>
              <div className="text-xs text-white/80">Admin Panel</div>
            </div>
          </div>

          <nav className="space-y-3 mt-6 px-1">
            <Link to="/admin" className={`admin-sidebar-link ${window.location.pathname === '/admin' ? 'active' : ''}`}><Grid className="inline mr-3 align-middle" /> <span className="align-middle">Dashboard</span></Link>
            <Link to="/admin/blogs" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/blogs') ? 'active' : ''}`}><FileText className="inline mr-3 align-middle" /> <span className="align-middle">Blogs</span></Link>
            <Link to="/admin/careers" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/careers') ? 'active' : ''}`}><Briefcase className="inline mr-3 align-middle" /> <span className="align-middle">Careers</span></Link>
            <Link to="/admin/team" className={`admin-sidebar-link ${window.location.pathname.startsWith('/admin/team') ? 'active' : ''}`}><Users className="inline mr-3 align-middle" /> <span className="align-middle">Team</span></Link>
          </nav>
        </div>

        <div>
          <div className="mb-4">
            {isAuthenticated ? (
              <button className="w-full bg-transparent border border-white/12 text-white px-4 py-3 rounded-lg hover:bg-white/6 font-medium" onClick={() => { signOut(); navigate('/'); }}>Sign out</button>
            ) : (
              <Link to="/admin/signin"><button className="w-full bg-legal-gold text-white px-4 py-3 rounded-lg hover:shadow-lg font-medium">Sign in</button></Link>
            )}
          </div>

          <div className="mt-6 text-xs text-white/70 border-t border-white/6 pt-4">
            <div>© {new Date().getFullYear()} Ali Bin Fahad Law Firm. All rights reserved.</div>
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
